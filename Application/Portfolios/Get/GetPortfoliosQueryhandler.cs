using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Portfolios;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Get;

internal sealed class GetPortfoliosQueryhandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : IQueryHandler<GetPortfoliosQuery, List<PortfolioResponse>>
{
    public async Task<Result<List<PortfolioResponse>>> Handle(GetPortfoliosQuery query, CancellationToken cancellationToken)
    {
        User? user = await context.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);

        if (user is null)
            return Result.Failure<List<PortfolioResponse>>(UserErrors.NotFound(userContext.UserId));

        List<PortfolioResponse> portfolios = await context.Portfolios
            .Include(s => s.Stock)
            .ThenInclude(s => s.Comments)
            .Where(p => p.UserId == user.Id)
            .Select(p => new PortfolioResponse
            {
                Id = p.StockId,
                Symbol = p.Stock.Symbol,
                CompanyName = p.Stock.CompanyName,
                Purchase = p.Stock.Purchase,
                LastDividend = p.Stock.LastDiv,
                Industry = p.Stock.Industry,
                MarketCap = p.Stock.MarketCap,
                Comments = p.Stock.Comments,
            })
            .ToListAsync(cancellationToken);

        if (!portfolios.Any())
            return Result.Failure<List<PortfolioResponse>>(PortfolioErrors.NotFound(user.Id));

        return portfolios;
    }
}

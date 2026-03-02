using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Stocks;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Get;

internal sealed class GetStocksQueryHandler(
    IApplicationDbContext context)
    : IQueryHandler<GetStocksQuery, List<StockResponse>>
{
    public async Task<Result<List<StockResponse>>> Handle(GetStocksQuery query, CancellationToken cancellationToken)
    {
        // TODO: Check user for auth

        List<StockResponse> stocks = await context.Stocks
            .Include(c => c.Comments)
            .ThenInclude(u => u.User)
            .Select(s => new StockResponse
            {
                Id = s.Id,
                Symbol = s.Symbol,
                CompanyName = s.CompanyName,
                Purchase = s.Purchase,
                LastDividend = s.LastDiv,
                Industry = s.Industry,
                MarketCap = s.MarketCap,
                Comments = s.Comments,
                Portfolios = s.Portfolios,
            })
            .ToListAsync(cancellationToken);

        if (!stocks.Any())
        {
            return Result.Failure<List<StockResponse>>(StockErrors.None());
        }

        return stocks;
    }
}

using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Portfolios.Get;
using Domain.Portfolios;
using Domain.Stocks;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Create;

internal sealed class CreatePortfolioCommandHandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : ICommandHandler<CreatePortfolioCommand>
{
    public async Task<Result> Handle(CreatePortfolioCommand command, CancellationToken cancellationToken)
    {
        User? user = await context.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);

        if (user is null)
            return Result.Failure(UserErrors.NotFound(userContext.UserId));

        Stock? stock = await context.Stocks
            .AsNoTracking()
            .SingleOrDefaultAsync(s => s.Symbol == command.Symbol, cancellationToken);

        if (stock is null)
            return Result.Failure(StockErrors.NotFoundBySymbol(command.Symbol));

        Portfolio portfolio = new Portfolio
        {
            StockId = stock.Id,
            UserId = user.Id,
        };

        await context.Portfolios.AddAsync(portfolio, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}

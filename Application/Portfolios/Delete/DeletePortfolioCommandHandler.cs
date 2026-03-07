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

namespace Application.Portfolios.Delete;

internal sealed class DeletePortfolioCommandHandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : ICommandHandler<DeletePortfolioCommand>
{
    public async Task<Result> Handle(DeletePortfolioCommand command, CancellationToken cancellationToken)
    {
        User? user = await context.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);

        if (user is null)
            return Result.Failure(UserErrors.NotFound(userContext.UserId));

        Portfolio? portfolio = await context.Portfolios
            .Include(s => s.Stock)
            .Where(p => p.UserId == user.Id && p.Stock.Symbol == command.Symbol)
            .SingleOrDefaultAsync(cancellationToken);

        if (portfolio is null)
            return Result.Failure(PortfolioErrors.NotFound(user.Id));

        context.Portfolios.Remove(portfolio);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}

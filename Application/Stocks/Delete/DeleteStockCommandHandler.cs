using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Stocks;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Delete;

internal sealed class DeleteStockCommandHandler(
    IApplicationDbContext context,
    IDateTimeProvider dateTimeProvider
    //IUserContext userContext
    )
    : ICommandHandler<DeleteStockCommand>
{
    public async Task<Result> Handle(DeleteStockCommand command, CancellationToken cancellationToken)
    {
        // TODO: Check user context and authorization before deleting

        Stock? stock = await context.Stocks.SingleOrDefaultAsync(s => s.Id == command.StockId, cancellationToken);

        if (stock is null)
        {
            return Result.Failure(StockErrors.NotFound(command.StockId));
        }

        context.Stocks.Remove(stock);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}

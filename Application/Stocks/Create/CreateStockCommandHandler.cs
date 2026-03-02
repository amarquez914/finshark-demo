using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Stocks;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Create;

internal sealed class CreateStockCommandHandler(
    IApplicationDbContext context,
    IDateTimeProvider dateTimeProvider)
    : ICommandHandler<CreateStockCommand, int>
{
    public async Task<Result<int>> Handle(CreateStockCommand command, CancellationToken cancellationToken)
    {
        var stock = new Stock
        {
            Symbol = command.Symbol,
            CompanyName = command.CompanyName,
            Purchase = command.Purchase,
            LastDiv = command.LastDiv,
            Industry = command.Industry,
            MarketCap = command.MarketCap,
        };

        context.Stocks.Add(stock);

        await context.SaveChangesAsync(cancellationToken);

        return stock.Id;
    }
}

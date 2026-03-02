using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Stocks;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.GetBySymbol;

internal sealed class GetStockBySymbolQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetStockBySymbolQuery, StockResponse>
{
    public async Task<Result<StockResponse>> Handle(GetStockBySymbolQuery query, CancellationToken cancellationToken)
    {
        StockResponse? stock = await context.Stocks
            .Where(s => s.Symbol == query.Symbol)
            .Include(c => c.Comments)
            .Include(p => p.Portfolios)
            .Select(s => new StockResponse
            {
                Id = s.Id,
                Symbol = s.Symbol,
                Comments = s.Comments,
                Portfolios = s.Portfolios,
                CompanyName = s.CompanyName,
                Industry = s.Industry,
                LastDividend = s.LastDiv,
                MarketCap = s.MarketCap,
                Purchase = s.Purchase,
            })
            .SingleOrDefaultAsync(cancellationToken);

        if (stock is null)
        {
            return Result.Failure<StockResponse>(StockErrors.NotFoundBySymbol(query.Symbol));
        }

        return stock;
    }
}

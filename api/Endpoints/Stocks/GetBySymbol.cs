using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Stocks.GetBySymbol;
using SharedKernel;
using StocksApi.Endpoints;

namespace api.Endpoints.Stocks;

internal sealed class GetBySymbol : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("stock/{symbol:alpha}", async (
            string symbol,
            IQueryHandler<GetStockBySymbolQuery, StockResponse> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetStockBySymbolQuery(symbol);

            Result<StockResponse> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .WithTags(Tags.Stocks);
    }
}

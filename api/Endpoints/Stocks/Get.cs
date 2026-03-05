using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Stocks.Get;
using SharedKernel;
using StocksApi.Endpoints;

namespace api.Endpoints.Stocks;

internal sealed class Get : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("stock", async (
            IQueryHandler<GetStocksQuery, List<StockResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetStocksQuery(new Guid());

            Result<List<StockResponse>> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .WithTags(Tags.Stocks);
    }
}

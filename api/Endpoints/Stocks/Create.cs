using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Stocks.Create;
using SharedKernel;

namespace StocksApi.Endpoints.Stocks;

internal sealed class Create : IEndpoint
{
    public sealed class CreateRequest
    {
        public string Symbol { get; set; }
        public string CompanyName { get; set; }
        public decimal Purchase { get; set; }
        public decimal LastDiv { get; set; }
        public string Industry { get; set; }
        public long MarketCap { get; set; }
    }

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("stock", async (
            CreateRequest request,
            ICommandHandler<CreateStockCommand, int> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new CreateStockCommand
            {
                Symbol = request.Symbol,
                CompanyName = request.CompanyName,
                Purchase = request.Purchase,
                LastDiv = request.LastDiv,
                Industry = request.Industry,
                MarketCap = request.MarketCap,
            };

            Result<int> results = await handler.Handle(command, cancellationToken);

            return results.Match(Results.NoContent, CustomResults.Problem);
        })
        .WithTags(Tags.Stocks);
    }
}

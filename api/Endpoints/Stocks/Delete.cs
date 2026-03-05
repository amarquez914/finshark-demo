using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Stocks.Delete;
using SharedKernel;

namespace StocksApi.Endpoints.Stocks;

internal sealed class Delete : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("stock/{id:int}", async (
            int Id,
            ICommandHandler<DeleteStockCommand> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new DeleteStockCommand(Id);

            Result results = await handler.Handle(command, cancellationToken);

            return results.Match(Results.NoContent, CustomResults.Problem);
        })
        .WithTags(Tags.Stocks);
    }
}

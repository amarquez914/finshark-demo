using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Portfolios.Delete;
using SharedKernel;

namespace StocksApi.Endpoints.Portfolios;

internal sealed class Delete : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("portfolio", async (
            string symbol,
            ICommandHandler<DeletePortfolioCommand> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new DeletePortfolioCommand(symbol);

            Result result = await handler.Handle(command, cancellationToken);

            return result.Match(Results.NoContent, CustomResults.Problem);
        })
        .WithTags(Tags.Portfolios);
    }
}

using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Portfolios.Create;
using SharedKernel;

namespace StocksApi.Endpoints.Portfolios;

internal sealed class Create : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("portfolio", async (
            string symbol,
            ICommandHandler<CreatePortfolioCommand> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new CreatePortfolioCommand(symbol);

            Result result = await handler.Handle(command, cancellationToken);

            return result.Match(Results.NoContent, CustomResults.Problem);
        })
        .WithTags(Tags.Portfolios);
    }
}

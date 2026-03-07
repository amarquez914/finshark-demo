using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Portfolios.Get;
using SharedKernel;

namespace StocksApi.Endpoints.Portfolios;

internal sealed class Get : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("portfolio", async (
            IQueryHandler<GetPortfoliosQuery, List<PortfolioResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetPortfoliosQuery();

            Result<List<PortfolioResponse>> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);

        })
        .WithTags(Tags.Portfolios);
    }
}

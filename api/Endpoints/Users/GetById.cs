using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Users.GetById;
using SharedKernel;

namespace StocksApi.Endpoints.Users;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("users/{id:guid}", async (
            Guid id,
            IQueryHandler<GetByIdQuery, UserResponse> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetByIdQuery(id);

            Result<UserResponse> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .RequireAuthorization()
        .WithTags(Tags.Users);
    }
}

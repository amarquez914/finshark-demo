using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Users.GetByEmail;
using SharedKernel;

namespace StocksApi.Endpoints.Users;

internal sealed class GetByEmail : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("users/{email}", async (
            string email,
            IQueryHandler<GetByEmailQuery, UserResponse> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetByEmailQuery(email);

            Result<UserResponse> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .RequireAuthorization()
        .WithTags(Tags.Users);
    }
}

using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Comments.Create;
using SharedKernel;

namespace StocksApi.Endpoints.Comments;

internal sealed class Create : IEndpoint
{
    public sealed record CreateRequest(string Title, string Content, string StockSymbol, Guid UserId);
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("comment", async (
            CreateRequest request,
            ICommandHandler<CreateCommentCommand, int> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new CreateCommentCommand(request.Title, request.Content, request.StockSymbol, request.UserId);

            Result<int> result = await handler.Handle(command, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .WithTags(Tags.Comments);
    }
}

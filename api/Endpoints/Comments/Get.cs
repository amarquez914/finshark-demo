using api.Endpoints;
using api.Extensions;
using api.Infrastructure;
using Application.Abstractions.Messaging;
using Application.Comments.Get;
using SharedKernel;

namespace StocksApi.Endpoints.Comments;

internal sealed class Get : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("comment/{symbol:alpha}", async (
            string symbol,
            IQueryHandler<GetCommentsQuery, List<CommentResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetCommentsQuery(symbol);

            Result<List<CommentResponse>> result = await handler.Handle(query, cancellationToken);

            return result.Match(Results.Ok, CustomResults.Problem);
        })
        .WithTags(Tags.Comments);
    }
}

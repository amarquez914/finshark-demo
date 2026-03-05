using Domain.Stocks;
using Domain.Users;

namespace Application.Comments.Get;

public sealed record CommentResponse
{
    public string Title { get; init; }
    public string Content { get; init; }
    public string CreatedBy { get; set; }
}
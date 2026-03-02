using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Comments;

public static class CommentErrors
{
    public static Error NotFound(int CommentId) => Error.NotFound(
        "Comment.NotFound",
        $"The comment with the Id = '{CommentId}' was not found");

    public static Error Unauthorized() => Error.Failure(
        "Comment.Unauthorized",
        "You are not authorized to perform this action.");
}

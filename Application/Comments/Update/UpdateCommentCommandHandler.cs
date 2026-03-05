using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Comments;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;

namespace Application.Comments.Update;

internal sealed class UpdateCommentCommandHandler(
    IApplicationDbContext context,
    IUserContext userContext,
    IDateTimeProvider dateTimeProvider)
    : ICommandHandler<UpdateCommentCommand>
{
    public async Task<Result> Handle(UpdateCommentCommand command, CancellationToken cancellationToken)
    {
        Comment? comment = await context.Comments
            .Where(c => c.Id == command.CommentId)
            .SingleOrDefaultAsync(cancellationToken);

        if (comment is null)
            return Result.Failure(CommentErrors.NotFound(command.CommentId));

        // Check for user or role here
        if (userContext.UserId != comment.UserId)
            return Result.Failure(UserErrors.Unauthorized());

        if (!string.IsNullOrEmpty(command.Title))
            comment.Title = command.Title;

        if (!string.IsNullOrEmpty(command.Content))
            comment.Content = command.Content;

        comment.UpdatedOn = dateTimeProvider.UtcNow;

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}

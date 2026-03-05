using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Comments;
using Domain.Stocks;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;

namespace Application.Comments.Create;

internal sealed class CreateCommentCommandHandler(
    IApplicationDbContext context,
    IUserContext userContext,
    IDateTimeProvider dateTimeProvider)
    : ICommandHandler<CreateCommentCommand, int>
{
    public async Task<Result<int>> Handle(CreateCommentCommand command, CancellationToken cancellationToken)
    {
        //if (command.UserId != userContext.UserId)
        //    return Result.Failure<int>(UserErrors.Unauthorized());


        User? user = await context.Users
            .SingleOrDefaultAsync(u => u.Id == command.UserId, cancellationToken);

        if (user is null)
            return Result.Failure<int>(UserErrors.NotFound(command.UserId));


        Stock? stock = await context.Stocks
            .SingleOrDefaultAsync(s => s.Symbol == command.StockSymbol, cancellationToken);

        if (stock is null)
            return Result.Failure<int>(StockErrors.NotFoundBySymbol(command.StockSymbol));

        Comment comment = new Comment
        {
            Title = command.Title,
            Content = command.Content,
            CreatedOn = dateTimeProvider.UtcNow,
            StockId = stock.Id,
            Stock = stock,
            UserId = user.Id,
            User = user,
        };

        await context.Comments.AddAsync(comment, cancellationToken);
        // TODO: Raise event for comment

        await context.SaveChangesAsync(cancellationToken);

        return comment.Id;
    }
}

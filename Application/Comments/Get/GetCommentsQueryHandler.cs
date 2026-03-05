using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Comments.Get;

internal sealed class GetCommentsQueryHandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : IQueryHandler<GetCommentsQuery, List<CommentResponse>>
{
    public async Task<Result<List<CommentResponse>>> Handle(GetCommentsQuery query, CancellationToken cancellationToken)
    {
        //if (query.UserId != userContext.UserId)
        //    return Result.Failure<List<CommentResponse>>(UserErrors.Unauthorized());

        List<CommentResponse> comments = await context.Comments
            .Include(u => u.User)
            .Include(s => s.Stock)
            .Where(c => c.Stock.Symbol == query.Symbol)
            .Select(c => new CommentResponse
            {
                Title = c.Title,
                Content = c.Content,
                CreatedBy = c.User.UserName
            })
            .ToListAsync(cancellationToken);

        return comments;
    }
}

using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.GetById;

internal sealed class GetByIdQueryHandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : IQueryHandler<GetByIdQuery, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(GetByIdQuery query, CancellationToken cancellationToken)
    {
        // TODO: Check for auth user
        if (query.UserId != userContext.UserId)
            return Result.Failure<UserResponse>(UserErrors.Unauthorized());

        UserResponse? user = await context.Users
            .Where(u => u.Id == query.UserId)
            .Include(p => p.Portfolios)
            .Select(u => new UserResponse
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Portfolios = u.Portfolios,
            }).SingleOrDefaultAsync(cancellationToken);

        if (user is null)
            return Result.Failure<UserResponse>(UserErrors.NotFound(query.UserId));

        return user;
    }
}

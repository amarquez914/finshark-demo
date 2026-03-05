using Application.Abstractions.Authentication;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.GetByEmail;

internal sealed class GetByEmailQueryHandler(
    IApplicationDbContext context,
    IUserContext userContext)
    : IQueryHandler<GetByEmailQuery, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(GetByEmailQuery query, CancellationToken cancellationToken)
    {
        UserResponse? user = await context.Users
            .Where(u => u.Email == query.Email)
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
            return Result.Failure<UserResponse>(UserErrors.NotFoundByUserName);

        //if (user.Id != userContext.UserId)
        //{
        //    return Result.Failure<UserResponse>(UserErrors.Unauthorized());
        //}

        return user;
    }
}

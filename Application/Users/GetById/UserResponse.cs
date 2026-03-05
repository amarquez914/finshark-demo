using Domain.Portfolios;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.GetById;

public sealed record UserResponse
{
    public Guid Id { get; init; }
    public string Email { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public List<Portfolio> Portfolios { get; init; }
}

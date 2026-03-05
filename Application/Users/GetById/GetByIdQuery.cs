using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.GetById;

public sealed record GetByIdQuery(Guid UserId) : IQuery<UserResponse>;

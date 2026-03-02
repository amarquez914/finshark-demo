using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Users;

public sealed record UserRegisteredDomainEvent(Guid UserId) : IDomainEvent;

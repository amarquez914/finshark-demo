using Domain.Users;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.Register;

internal sealed class UserRegisteredDomainEventHandler : IDomainEventHandler<UserRegisteredDomainEvent>
{
    public Task Handle(UserRegisteredDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        // TODO: send email verification link,

        return Task.CompletedTask;
    }
}

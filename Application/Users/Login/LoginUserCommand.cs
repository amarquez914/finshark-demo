using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.Login;

public sealed record LoginUserCommand(string UserName, string Password) : ICommand<LoginResponse>;

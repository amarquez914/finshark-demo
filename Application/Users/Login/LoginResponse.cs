using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Users.Login;

public sealed record LoginResponse(string UserName, string Email, string Token);

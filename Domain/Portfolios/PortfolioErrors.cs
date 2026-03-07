using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Portfolios;

public static class PortfolioErrors
{
    public static Error NotFound(Guid UserId) => Error.NotFound(
        "Portfolio.NotFound",
        $"The Portfolios for user Id = '{UserId}' were not found");

    public static Error Unauthorized() => Error.Failure(
        "Portfolio.Unauthorized",
        "You are not authorized to perform this action.");
}

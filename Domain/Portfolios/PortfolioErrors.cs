using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Portfolios;

public static class PortfolioErrors
{
    public static Error NotFound(Guid UserId, int StockId) => Error.NotFound(
        "Portfolio.NotFound",
        $"The Portfolio for user Id = '{UserId}' and stock id = '{StockId}' was not found");

    public static Error Unauthorized() => Error.Failure(
        "Portfolio.Unauthorized",
        "You are not authorized to perform this action.");
}

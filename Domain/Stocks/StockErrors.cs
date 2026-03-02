using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Stocks;

public static class StockErrors
{
    public static Error NotFound(int StockId) => Error.NotFound(
        "Stock.NotFound",
        $"The stock with the Id = '{StockId}' was not found");

    public static Error None() => Error.NotFound(
        "Stock.None",
        $"No Stocks were found in system.");

    public static Error Unauthorized() => Error.Failure(
        "Stock.Unauthorized",
        "You are not authorized to perform this action.");

    public static Error NotFoundBySymbol(string Symbol) => Error.NotFound(
        "Stock.NotFoundBySymbol",
        $"The stock with the symbol = '{Symbol}' was not found");
}

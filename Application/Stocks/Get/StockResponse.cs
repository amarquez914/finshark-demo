using Domain.Comments;
using Domain.Portfolios;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Get;

public sealed record StockResponse
{
    public int Id { get; init; }
    public string Symbol { get; init; }
    public string CompanyName { get; init; }
    public decimal Purchase { get; init; }
    public decimal LastDividend { get; init; }
    public string Industry { get; init; }
    public long MarketCap { get; init; }

    public List<Comment> Comments { get; init; }
    public List<Portfolio> Portfolios { get; init; }
}

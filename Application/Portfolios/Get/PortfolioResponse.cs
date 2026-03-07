using Domain.Comments;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Get;

public sealed record PortfolioResponse
{
    public int Id { get; set; }
    public string Symbol { get; set; }
    public string CompanyName { get; set; }
    public decimal Purchase { get; set; }
    public decimal LastDividend { get; set; }
    public string Industry { get; set; }
    public decimal MarketCap { get; set; }
    public IEnumerable<Comment> Comments { get; set; }
}

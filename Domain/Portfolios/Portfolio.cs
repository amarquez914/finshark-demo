using Domain.Stocks;
using Domain.Users;

namespace Domain.Portfolios;

//[Table("Portfolios")]
public sealed class Portfolio
{
    public Guid UserId { get; set; }
    public int StockId { get; set; }
    public User User { get; set; }
    public Stock Stock { get; set; }
}
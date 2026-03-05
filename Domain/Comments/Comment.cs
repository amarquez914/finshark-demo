using Domain.Stocks;
using Domain.Users;

namespace Domain.Comments;

//[Table("Comments")]
public sealed class Comment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public DateTime? UpdatedOn { get; set; }
    public int? StockId { get; set; }
    public Stock? Stock { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
}
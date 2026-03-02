using Domain.Comments;
using Domain.Portfolios;
using Domain.Stocks;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Application.Abstractions.Data;

public interface IApplicationDbContext
{
    DbSet<Stock> Stocks { get; }
    DbSet<Comment> Comments { get; }
    DbSet<Portfolio> Portfolios { get; }
    DbSet<User> Users { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

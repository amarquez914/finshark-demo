using Domain.Comments;

namespace api.Helpers;

public static class CommentQueryExtensions
{
    public static IQueryable<Comment> ApplySorting(this IQueryable<Comment> query, CommentSortOption sortOption)
    {
        return sortOption switch
        {
            CommentSortOption.MostComments => query,
            CommentSortOption.MostLiked => query,
            CommentSortOption.MostViews => query,
            CommentSortOption.Ascending => query.OrderBy(c => c.CreatedOn),
            CommentSortOption.Descending => query.OrderByDescending(c => c.CreatedOn),
            _ => query
        };
    }

    public static IQueryable<Comment> ApplySortingDesc(this IQueryable<Comment> query, bool? isDescending = null)
    {
        return isDescending switch
        {
            true => query.OrderByDescending(c => c.CreatedOn),
            //false => query.OrderBy(c => c.CreatedOn),
            _ => query,
        };
    }
}

public enum CommentSortOption
{
    Default = 0,
    Descending,
    Ascending,
    MostComments,
    MostLiked,
    MostViews,
}

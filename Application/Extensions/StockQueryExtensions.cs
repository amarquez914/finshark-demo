using Domain.Stocks;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Extensions;

public static class StockQueryExtensions
{
    public static IQueryable<Stock> FilterBySymbol(this IQueryable<Stock> query, string symbol)
    {
        if (!string.IsNullOrEmpty(symbol))
        {
            query = query.Where(x => x.Symbol.Contains(symbol, StringComparison.OrdinalIgnoreCase));
        }
        return query;
    }

    public static IQueryable<Stock> FilterByCompany(this IQueryable<Stock> query, string companyName)
    {
        if (!string.IsNullOrEmpty(companyName))
        {
            query = query.Where(s => s.CompanyName.Contains(companyName, StringComparison.OrdinalIgnoreCase));
        }
        return query;
    }

    public static IQueryable<Stock> SortBy(this IQueryable<Stock> query, string sortOption, bool descending = false)
    {
        return sortOption switch
        {
            SortOption.Symbol => descending ? query.OrderByDescending(s => s.Symbol) : query.OrderBy(s => s.Symbol),
            SortOption.CompanyName => descending ? query.OrderByDescending(s => s.CompanyName) : query.OrderBy(s => s.CompanyName),
            SortOption.Purchase => descending ? query.OrderByDescending(s => s.Purchase) : query.OrderBy(s => s.Purchase),
            SortOption.MarketCap => descending ? query.OrderByDescending(s => s.MarketCap) : query.OrderBy(s => s.MarketCap),
            _ => query
        };
    }
}


public class SortOption
{
    public const string Symbol = "symbol";
    public const string CompanyName = "companyname";
    public const string Purchase = "purchase";
    public const string MarketCap = "marketcap";
    public const string Default = "default";
}
using Application.Abstractions.Messaging;
using Application.Stocks.GetBySymbol;

namespace Application.Stocks.GetBySymbol;

public sealed record GetStockBySymbolQuery(string Symbol) : IQuery<StockResponse>;

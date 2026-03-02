using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Get;

public sealed record GetStocksQuery(Guid UserId) : IQuery<List<StockResponse>>;

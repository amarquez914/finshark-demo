using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Stocks.Delete;

public sealed record DeleteStockCommand(int StockId) : ICommand;

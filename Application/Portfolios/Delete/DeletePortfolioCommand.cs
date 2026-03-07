using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Delete;

public sealed record DeletePortfolioCommand(string Symbol) : ICommand;

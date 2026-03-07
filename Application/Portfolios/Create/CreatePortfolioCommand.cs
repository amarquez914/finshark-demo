using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Create;

public sealed record CreatePortfolioCommand(string Symbol) : ICommand;

using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Portfolios.Get;

public sealed record GetPortfoliosQuery : IQuery<List<PortfolioResponse>>;

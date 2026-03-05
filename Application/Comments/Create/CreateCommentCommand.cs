using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Comments.Create;

public sealed record CreateCommentCommand(string Title, string Content, string StockSymbol, Guid UserId) : ICommand<int>;

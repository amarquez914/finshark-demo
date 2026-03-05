using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Comments.Get;

public sealed record GetCommentsQuery(string Symbol) : IQuery<List<CommentResponse>>;

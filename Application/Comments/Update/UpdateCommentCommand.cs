using Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Comments.Update;

public sealed record UpdateCommentCommand(int CommentId, string? Title, string? Content) : ICommand;

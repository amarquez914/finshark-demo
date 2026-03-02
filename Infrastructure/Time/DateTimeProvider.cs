using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Time;

internal sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}

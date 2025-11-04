IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'finshark')
BEGIN
    CREATE DATABASE [finshark];
END
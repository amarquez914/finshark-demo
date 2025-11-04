

So things have changed a bit since these answers came out, here's my solution that uses the latest 2022 sql Server image. I also have a few other minor QOL features to this answer

## docker-compose

  my_db_container:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Hey!Don't look here. Bad!"
    ports:
      - "1433:1433"
    networks:
      - dev_network
    volumes:
      - ./db-init/init.sql:/db/init.sql
      - ./db-init/entrypoint.sh:/entrypoint.sh
    entrypoint: ["/bin/bash", "/entrypoint.sh"]

First our docker-compose sets up the db image. The networks: - dev_network is to make it easier to reach my db container from my app container. The volumes' are how my container has access to the scripts it needs to create the db. In my docker-compose project I also need to have the two files specified in volumes (under db-init)

## init.sql

in my case I just need the database created. All my migrations happen in the app code, but everything breaks if the db doesn't exist, so this is all I needed.

```sql
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Jeff')
BEGIN
    CREATE DATABASE [Jeff];
END
```

## entrypoint.sh.

This is the one that I had to fight with, and the one that doesn't work anymore with Linda or Koryakov's solutions (AI was similarly no help because it probably used their answers... I went down a solid rabbit hole). Microsoft change the location of their tools folder, so mssql-tools18 needs to be referenced. If it changes again - just inspect the file system on your docker image and see what they renamed or moved it to this time. I've also used a solution from elsewhere to reduce the lead time for the db creation as much as possible, rather than waiting X seconds, it waits in a loop till it can do a handshake.

```bash
#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait until SQL Server is ready
echo "Waiting for SQL Server to be available..."
until /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C -Q "SELECT 1" > /dev/null 2>&1; do
  sleep 1
  echo "Still Waiting for SQL Server to be available..."
done

# Run your init script
echo "Running init.sql..."
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C -i /db/init.sql
echo "Finished running init.sql."
# Keep container alive
wait

```
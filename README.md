# trial-influxdb

Trial or micro-service unit of [InfluxDB](https://docs.influxdata.com/).

## Service Endpoints

- Database http://localhost:8181

## Default Account

启动数据库后，通过 `http://localhost:8181` 配置 WEB 控制台管理用户名密码等信息，并获取默认 TOKEN。

建议设置如下，其中 ORG、Bucket 若自定义则需要更新 `.env` 文件中的 `INFLUXDB_` 同名变量值：

| Username | Password | ORG     | BUCKET | TOKEN                                                   |
| -------- | -------- | ------- | ------ | ------------------------------------------------------- |
| admin    | 12345678 | default | mydb   | 从 WEB 控制台的 `Data->API Tokens` 获取 "admin's Token" |

## Usage

### Start with [Docker Compose](https://docs.docker.com/compose/)

```bash
# Initiate .env file
cp .env.sample .env
# Start services
docker compose up -d
```

Update existing composed containers with latest images:

```bash
docker compose pull && \
docker compose down && \
docker compose up -d
```

Further operations

```bash
# Enter container and initiate shell
docker exec -it trial-influxdb bash

# Create an admin token
docker exec -it influxdb influxdb3 create token --admin
```

## 参考资料

- [DockerHub: InfluxDB](https://hub.docker.com/_/influxdb)
- https://docs.influxdata.com/influxdb3/core/install/#docker-image
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/write/
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/query/
- https://docs.influxdata.com/influxdb/cloud/write-data/
- https://docs.influxdata.com/influxdb/cloud/query-data/

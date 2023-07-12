# trial-influxdb

InfluxDB 选型/快速试用/微服务 Starter。

## 路径

- [DB&UI@8080](http://localhost:8086)

## 初始账号

启动数据库后，通过 `http://localhost:8086` 配置 WEB 控制台管理用户名密码等。建议设置如下，其中 ORG、Bucket 若自定义则需要更新环境配置文件中的 `INFLUXDB_` 同名变量值：

| 用户名 | 密码     | ORG     | BUCKET | TOKEN                                                   |
| ------ | -------- | ------- | ------ | ------------------------------------------------------- |
| admin  | 12345678 | default | mydb   | 从 WEB 控制台的 `Data->API Tokens` 获取 "admin's Token" |

## 部署

```bash
docker run -p 8086:8086 -d --restart always --name trial-influxdb influxdb

cp .env.sample .env
pnpm i

pnpm start:dev # NODE_ENV=development
pnpm start # NODE_ENV=production
```

## 参考资料

- [InfluxDB](https://hub.docker.com/_/influxdb)
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/write/
- https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/query/
- https://docs.influxdata.com/influxdb/cloud/write-data/
- https://docs.influxdata.com/influxdb/cloud/query-data/

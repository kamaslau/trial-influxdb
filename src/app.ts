import * as dotenv from 'dotenv'
import { InfluxDB, Point } from '@influxdata/influxdb-client'

// 加载环境变量
dotenv.config()

globalThis.isDev = process.env.NODE_ENV !== 'production'

// You can generate an API token from the "API Tokens Tab" in the UI
const org = process.env.INFLUX_ORG ?? ''
const bucket = process.env.INFLUX_BUCKET ?? ''
const client = new InfluxDB({
  url: process.env.INFLUX_URL ?? '',
  token: process.env.INFLUX_TOKEN ?? ''
})

/**
 * Write Data
 */
const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({ host: 'host1' })

const point = new Point('mem').floatField('used_percent', 23.43234543)
writeApi.writePoint(point)

writeApi
  .close()
  .then(() => {
    console.log('Write FINISHED')
  })
  .catch(e => {
    console.error(e)
    console.log('Finished ERROR')
  })

/**
 * Read Data (Execute a Flux query)
 */
const queryApi = client.getQueryApi(org)
const query = `
from(bucket: "${bucket}")
  |> range(start: -1h)
  |> limit(n:10)
  |> filter(fn: (r) => r["_measurement"] == "mem")
  |> filter(fn: (r) => r["_field"] == "used_percent")
`
queryApi.queryRows(query, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(`${o._time as string} ${o._measurement as string}: ${o._field as string}=${o._value as string}`)
  },
  error(error) {
    console.error(error)
    console.log('Finished ERROR')
  },
  complete() {
    console.log('Finished SUCCESS')
  }
})

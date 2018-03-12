// @flow

import * as http from 'http'
import winston from 'winston'
import App from './App'

const app: App = new App()
const server: Object = http.createServer(app.express)

const DEFAULT_PORT: number = 3000

// ErrnoError interface for use in onError
declare interface ErrnoError extends Error {
  errno?: number,
  code?: string,
  path?: string,
  syscall?: string
}

function normalizePort(val: any): number | string {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val

  if (port && Number.isNaN(port)) {
    return port
  }

  if (port >= 0) {
    return port
  }

  return DEFAULT_PORT
}

const port: string | number = normalizePort(process.env.PORT)

function onError(error: ErrnoError): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`

  switch (error.code) {
    case 'EACCES':
      winston.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      winston.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(): void {
  const addr: net$Socket$address = server.address()
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  winston.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

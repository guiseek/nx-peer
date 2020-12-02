import * as io from 'socket.io-client'
import { Injectable, InjectionToken } from '@angular/core'

export interface WebSocketConfig {
  url: string
  options?: any
}

export function WebSocketFactory(config: WebSocketConfig) {
  return new WebSocketAdapter(config)
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<WebSocketConfig>(
  '__SOCKET_IO_CONFIG__'
)

@Injectable()
export class WebSocketAdapter {
  ioSocket: SocketIOClient.Socket
  emptyConfig: WebSocketConfig = {
    url: '',
    options: {},
  }

  constructor(private config: WebSocketConfig) {
    console.log(config)

    if (config === undefined) {
      config = this.emptyConfig
    }
    const url: string = config.url
    const options: any = config.options
    this.ioSocket = io(url, options)
  }

  connect() {
    return this.ioSocket.connect()
  }

  on(eventName: string, callback: Function) {
    this.ioSocket.on(eventName, callback)
  }

  emit(eventName: string, ...args: any[]) {
    return this.ioSocket.emit.apply(this.ioSocket, arguments)
  }

  removeListener(eventName: string, callback?: Function) {
    return this.ioSocket.removeListener.apply(this.ioSocket, arguments)
  }

  removeAllListeners(eventName?: string) {
    return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments)
  }

  disconnect(close?: any) {
    return this.ioSocket.disconnect.apply(this.ioSocket, arguments)
  }
}

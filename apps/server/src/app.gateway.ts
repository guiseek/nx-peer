import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

// @WebSocketGateway(8080, { transports: ['websocket'] })
@WebSocketGateway()
export class AppGateway {
  data = {}

  @WebSocketServer()
  server: Server

  private logger: Logger = new Logger('NxPeer')

  @SubscribeMessage('offer')
  offer(client: Socket, payload: Partial<FormData>) {
    this.data = { ...this.data, ...payload }
    this.logger.log(`offer: ${JSON.stringify(payload)}.`)
    client.broadcast.emit('offer', payload)
  }

  @SubscribeMessage('answer')
  answer(client: Socket, payload: Partial<FormData>) {
    this.data = { ...this.data, ...payload }
    this.logger.log(`answer: ${JSON.stringify(payload)}.`)
    client.broadcast.emit('answer', payload)
  }
}

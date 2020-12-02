import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { NxPeerConfig, NxOfferOptions, NX_PEER_CONFIG, NX_OFFER_OPTIONS } from './nx-peer-config'
import {
  WebSocketAdapter,
  WebSocketConfig,
  WebSocketFactory,
  SOCKET_CONFIG_TOKEN,
} from './adapters/web-socket.adapter'

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: NX_PEER_CONFIG, useClass: NxPeerConfig },
    { provide: NX_OFFER_OPTIONS, useClass: NxOfferOptions },
    {
      provide: SOCKET_CONFIG_TOKEN,
      useValue: {
        url: 'http://localhost:3000',
      },
    },
    {
      provide: WebSocketAdapter,
      useFactory: WebSocketFactory,
      deps: [SOCKET_CONFIG_TOKEN],
    },
  ],
})
export class NxPeerConnectionModule {
  static forRoot(
    nxPeerConfig: NxPeerConfig,
    socketConfig?: WebSocketConfig
  ): ModuleWithProviders<NxPeerConnectionModule> {
    return {
      ngModule: NxPeerConnectionModule,
      providers: [
        {
          provide: NX_PEER_CONFIG,
          useValue: Object.assign(NxPeerConfig, nxPeerConfig),
        },
        { provide: SOCKET_CONFIG_TOKEN, useValue: socketConfig || {} },
        // {
        //   provide: WebSocketAdapter,
        //   useFactory: WebSocketFactory,
        //   deps: [SOCKET_CONFIG_TOKEN],
        // },
      ],
    }
  }
}

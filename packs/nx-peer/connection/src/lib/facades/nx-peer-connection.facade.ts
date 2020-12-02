import {
  NxPeerConfig,
  NX_PEER_CONFIG,
  NxOfferOptions,
  NX_OFFER_OPTIONS,
} from './../nx-peer-config'
import { BehaviorSubject } from 'rxjs'
import { Inject, Injectable } from '@angular/core'
import { WebSocketAdapter } from '../adapters/web-socket.adapter'
import { nxPeerId } from '../utilities'

export interface TopicMessage {
  sdp?: RTCSessionDescription
  ice?: RTCIceCandidate
}

export interface Topic {
  message?: TopicMessage
  sender?: string
}

@Injectable({ providedIn: 'root' })
export class NxPeerConnection extends RTCPeerConnection {
  private offer = new BehaviorSubject<Topic>(null)
  offer$ = this.offer.asObservable()

  private track = new BehaviorSubject<readonly MediaStream[]>(null)
  track$ = this.track.asObservable()

  peer: RTCPeerConnection
  sender: string

  localStream: MediaStream

  constructor(
    private socket: WebSocketAdapter,
    @Inject(NX_PEER_CONFIG) private nxPeerConfig: NxPeerConfig,
    @Inject(NX_OFFER_OPTIONS) private nxOfferOptions: NxOfferOptions
  ) {
    super(nxPeerConfig)
    const sender = nxPeerId()

    this.socket.on('offer', this.offer.next)

    this.addEventListener('icecandidate', ({ candidate }) => {
      this.sendOffer({ sender, message: { ice: candidate } })
    })

    this.addEventListener('track', ({ streams }) => {
      this.track.next(streams)
    })
  }

  sendOffer(topic: Topic) {
    this.socket.emit('offer', topic)
  }
}

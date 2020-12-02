import { InjectionToken } from '@angular/core'

export class NxPeerConfig implements RTCConfiguration {
  iceServers = [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
  ]
}

export class NxOfferOptions implements RTCOfferOptions {
  iceRestart?: false
  offerToReceiveAudio: true
  offerToReceiveVideo: true
}

export const NX_OFFER_OPTIONS = new InjectionToken<NxOfferOptions>(
  'NxOfferOptions'
)
export const NX_PEER_CONFIG = new InjectionToken<NxPeerConfig>('NxPeerConfig')

import { Component, OnInit } from '@angular/core'
import { NxPeerConnection } from '@nx-peer/connection'
import { webSocket } from 'rxjs/webSocket'

@Component({
  selector: 'nx-peer-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  constructor(private connection: NxPeerConnection) {

  }

  ngOnInit(): void {
    // this.connection.

  }
}

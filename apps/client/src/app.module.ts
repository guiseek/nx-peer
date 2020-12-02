import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { NxPeerConnectionModule } from '@nx-peer/connection';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppLocale } from './app.locale'
import { AppComponent } from './app.component'
import { RoomComponent } from './room/room.component'

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
]

@NgModule({
  declarations: [AppComponent, RoomComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NxPeerConnectionModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
  ],
  providers: [AppLocale.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  uuid(): Promise<{ uuid: string }> {
    return this.http.get<{ uuid: string }>('/api/uuid').toPromise()
  }
}

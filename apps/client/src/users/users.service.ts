import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get('/api/users')
  }
  findOne(id: string) {
    return this.http.get('/api/users/' + id)
  }
  create(data) {
    return this.http.post('/api/users', data)
  }
  update(id: string, data) {
    return this.http.put('/api/users/' + id, data)
  }
  delete(id: string) {
    return this.http.delete('/api/users/' + id)
  }
}

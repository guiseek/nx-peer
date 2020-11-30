import { AppService } from './../app.service'
import { UsersService } from './users.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'nx-peer-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form = this.fb.group({
    uuid: ['', [Validators.required]],
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    name: [''],
    email: [''],
    phone: [''],
    photo: [''],
  })
  get uuid() {
    return this.form.get('uuid')
  }
  users$ = this.svc.findAll()
  constructor(
    private fb: FormBuilder,
    private svc: UsersService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.svc.findAll().subscribe(console.log)
  }
  fineOne(id: string) {
    this.svc.findOne(id).subscribe(console.log)
  }
  getUuid(inputEl: HTMLInputElement) {
    this.app.uuid().then((uuid) => {
      this.form.patchValue(uuid)
      setTimeout(() => inputEl.focus())
    })
  }
  async onSubmit(data) {
    await this.svc.create(data).toPromise()
    this.users$ = this.svc.findAll()
  }
}

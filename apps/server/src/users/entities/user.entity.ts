export interface UserEntity {
  uuid: string
  password: string
  nickname: string
  name?: string
  email?: string;
  phone?: string
  photo?: string
  createdAt: Date
  updatedAt: Date
}

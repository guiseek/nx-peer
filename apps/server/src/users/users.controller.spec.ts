import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const catModel = { }

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: catModel
        }
      ],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    usersController = moduleRef.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = Promise.resolve([null, null, null])
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result)

      expect(await usersController.findAll()).toBeDefined()

      expect(await usersController.findAll()).toHaveLength(3)
    })
  })
})

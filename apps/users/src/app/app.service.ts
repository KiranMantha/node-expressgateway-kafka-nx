import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users = [
    {
      userId: 'uid-123',
      name: 'user 1'
    },
    {
      userId: 'uid-456',
      name: 'user 2'
    }
  ];

  getUserById(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectionTokens } from './tokens';

@Injectable()
export class AppService {
  constructor(
    @Inject(InjectionTokens.USERS_SERVICE) private usersClient: ClientKafka
  ) {}

  createInvoice(createInvoiceRequest: {
    userId: string;
    orderId: string;
    price: number;
  }) {
    this.usersClient
      .send('get_user_by_id', { userId: createInvoiceRequest.userId })
      .subscribe((user: { userId: string; name: string }) => {
        console.log('\nuser from users MS: ', user, '\n');
      });
  }
}

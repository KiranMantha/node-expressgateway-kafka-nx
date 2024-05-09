import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateInvoiceRequest } from './app.model';
import { InjectionTokens } from './tokens';

@Injectable()
export class AppService {
  constructor(
    @Inject(InjectionTokens.BILLING_SERVICE) private billingClient: ClientKafka
  ) {}

  createInvoice(createInvoiceRequest: CreateInvoiceRequest) {
    // emit event to billing service to create invoice
    this.billingClient.emit('create_invoice', createInvoiceRequest);
  }
}

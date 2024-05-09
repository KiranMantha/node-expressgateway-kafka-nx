import { Body, Controller, Post } from '@nestjs/common';
import { CreateInvoiceRequest } from './app.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-invoice')
  createInvoice(@Body() createInvoiceRequest: CreateInvoiceRequest) {
    console.log('\napi-gateway:create-invoice ', createInvoiceRequest, '\n');
    this.appService.createInvoice(createInvoiceRequest);
  }
}

import { Controller, Post, Body, UseGuards, Req, Patch, Param, Query, Get, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto, ValidateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @UseGuards(AuthGuard('jwtClient'))
  @Post('create')
  createOrder(@Body() dto: OrderDto) {
    return this.orderService.createOrder(dto);
  }
  @UseGuards(AuthGuard('jwtPro'))
  @Patch('validate/:id')
  validateOrder(@Param('id', ParseIntPipe) orderId: number) {
    console.log(orderId);
    return this.orderService.validateOrder(orderId);
  }
}

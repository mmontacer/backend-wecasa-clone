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

  @UseGuards(AuthGuard('jwtClient'))
  @Get('client-orders-history')
  getClientHistory() {
    return this.orderService.getClientOrdersHistory();
  }

  @UseGuards(AuthGuard('jwtClient'))
  @Get('client-upcoming-orders')
  getClientUpcomingOrders() {
    return this.orderService.getClientUpcomingOrders();
  }

  @UseGuards(AuthGuard('jwtPro'))
  @Get('pro-orders-history')
  getProHistory() {
    return this.orderService.getProHistory();
  }

  @UseGuards(AuthGuard('jwtPro'))
  @Get('pro-orders-history')
  getProUpcomingOrders() {
    return this.orderService.getProUpcomingOrders();
  }

  @UseGuards(AuthGuard('jwtPro'))
  @Patch('pro-cancel/:id')
  proCancelOrder(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.proCancelOrder(orderId);
  }

  @UseGuards(AuthGuard('jwtClient'))
  @Patch('client-cancel/:id')
  clientCancelOrder(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.clientCancelOrder(orderId);
  }

  @UseGuards(AuthGuard('jwtPro'))
  @Patch('validate/:id')
  validateOrder(@Param('id', ParseIntPipe) orderId: number) {
    console.log(orderId);
    return this.orderService.validateOrder(orderId);
  }
}

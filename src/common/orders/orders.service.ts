/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Req, Scope, Inject, ForbiddenException, BadRequestException, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto, ValidateOrderDto } from './dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class OrdersService {
  constructor(@Inject(REQUEST) private request: Request, private prisma: PrismaService) {}

  async createOrder(dto: OrderDto): Promise<any> {
    const clientId = Object.values(this.request.user)[0];
    const clientEmail = Object.values(this.request.user)[1];
    try {
      console.log(clientId);
      const order = await this.prisma.order.create({
        data: {
          orderDate: dto.orderDate,
          price: dto.price,
          clientId,
          selectedProfessionals: dto.selectedProfessionals,
        },
      });
      return order;
    } catch (error) {
      return error;
    }
  }

  async validateOrder(orderId: number): Promise<any> {
    const professionalId = Object.values(this.request.user)[0];
    const professionalEmail = Object.values(this.request.user)[1];
    const professionalIsVerified = Object.values(this.request.user)[2];
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      if (order.selectedProfessionals.indexOf(professionalId) === -1)
        throw new ForbiddenException("Vous ne faites pas partie des professionnels sélectionnés par l'utilisateur.");
      const validatedOrder = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          professionalId,
          selectedProfessionals: [],
          validated: true,
        },
      });
      return validatedOrder;
    } catch (error) {
      return error;
    }

    //const professionalId = this.request.user as string;
  }
}

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
    const clientId = Object.values(this.request.user)[0] as number;
    const clientEmail = Object.values(this.request.user)[1];
    try {
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
    const professionalId = Object.values(this.request.user)[0] as string;
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
          status: 'PRIS',
        },
      });
      return validatedOrder;
    } catch (error) {
      return error;
    }
  }

  async proCancelOrder(orderId: number): Promise<any> {
    const professionalId = Object.values(this.request.user)[0];
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (order.professionalId != professionalId)
        throw new ForbiddenException('Vous ne pouvez pas annuler cette commande');
      const canceledOrder = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'ANNULE',
        },
      });
      return canceledOrder;
    } catch (error) {
      return error;
    }
  }
  async clientCancelOrder(orderId: number): Promise<any> {
    const clientId = Object.values(this.request.user)[0];
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      if (clientId != order.clientId) throw new ForbiddenException('Vous ne pouvez pas annuler cette commande.');
      const canceledOrder = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'ANNULE',
        },
      });
      return canceledOrder;
    } catch (error) {
      return error;
    }
  }

  async getClientOrdersHistory(): Promise<any> {
    const clientId = Object.values(this.request.user)[0];
    try {
      const ordersHistory = await this.prisma.order.findMany({
        where: {
          clientId,
          status: 'FINI',
        },
      });
      return ordersHistory;
    } catch (error) {}
  }

  async getClientUpcomingOrders(): Promise<any> {
    const clientId = Object.values(this.request.user)[0];
    try {
      const ordersHistory = await this.prisma.order.findMany({
        where: {
          clientId,
          status: 'PRIS',
        },
      });
      return ordersHistory;
    } catch (error) {}
  }

  async getProHistory(): Promise<any> {
    const professionalId = Object.values(this.request.user)[0];
    try {
      const ordersHistory = await this.prisma.order.findMany({
        where: {
          professionalId,
          status: 'FINI',
        },
      });
      return ordersHistory;
    } catch (error) {}
  }

  async getProSelectedOrders(): Promise<any> {
    const professionalId = Object.values(this.request.user)[0] as string;
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          selectedProfessionals: {
            has: professionalId,
          },
        },
      });
      return orders;
    } catch (error) {}
  }

  async getProUpcomingOrders(): Promise<any> {
    const professionalId = Object.values(this.request.user)[0];
    try {
      const ordersHistory = await this.prisma.order.findMany({
        where: {
          professionalId,
          status: 'PRIS',
        },
      });
      return ordersHistory;
    } catch (error) {}
  }
}

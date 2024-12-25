import { Injectable } from '@nestjs/common';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { AbstractService } from 'src/commons';
import { ordersRepository } from '../orders/repository/orders.repository';
import {
  startOfMonth,
  endOfMonth,
  isAfter,
  isBefore,
  set,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { UsersService } from '../users/users.service';
import { parse } from 'path';

@Injectable()
export class DashboardService extends AbstractService {
  constructor(private readonly usersService: UsersService) {
    super(ordersRepository);
  }

  async getPerformanceData(currentUser: CurrentUserDto) {
    const whereClause = this.buildWhereClause(currentUser);
    const result = await this.find({
      where: whereClause,
      relations: [
        'order_products',
        'order_products.associate_product',
        'order_products.associate_product.product',
        'user',
      ],
    });
    return await this.calculateEarnings(result, currentUser);
  }

  async getMonthlyOrderNumberStats(currentUser: CurrentUserDto) {
    const whereClause = this.buildWhereClause(currentUser);
    const result = await this.find({
      where: whereClause,
      relations: [
        'order_products',
        'order_products.associate_product',
        'order_products.associate_product.product',
        'user',
      ],
    });

    const today = new Date();

    // Normalize the start and end of last month to midnight UTC
    const startOfLastMonth = set(startOfMonth(today), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const endOfLastMonth = set(endOfMonth(today), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });

    const allDates = eachDayOfInterval({
      start: startOfLastMonth,
      end: endOfLastMonth,
    });

    const dailyOrders = allDates.reduce((acc, date) => {
      acc[format(date, 'yyyy-MM-dd')] = 0;
      return acc;
    }, {});

    result.forEach((order) => {
      const orderDate = new Date(Number(order.created_at));
      const orderDateString = format(orderDate, 'yyyy-MM-dd');

      // Only include orders from the last month range
      if (
        isAfter(orderDate, startOfLastMonth) &&
        isBefore(orderDate, endOfLastMonth)
      ) {
        if (dailyOrders[orderDateString] !== undefined) {
          dailyOrders[orderDateString] += 1; // Increment the order count for the date
        }
      }
    });

    const chartData = this.formatDataForChart(dailyOrders);

    return chartData;
  }

  async getMonthlyEarningsStats(currentUser: CurrentUserDto) {
    const whereClause = this.buildWhereClause(currentUser);
    const result = await this.find({
      where: whereClause,
      relations: [
        'order_products',
        'order_products.associate_product',
        'order_products.associate_product.product',
        'user',
      ],
    });

    const today = new Date();
    const startOfLastMonth = set(startOfMonth(today), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const endOfLastMonth = set(endOfMonth(today), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });
    const allDates = eachDayOfInterval({
      start: startOfLastMonth,
      end: endOfLastMonth,
    });

    const dailyBrutoSum = allDates.reduce((acc, date) => {
      acc[format(date, 'yyyy-MM-dd')] = 0;
      return acc;
    }, {});

    result.forEach((order) => {
      const orderDate = new Date(Number(order.created_at));
      const orderDateString = format(orderDate, 'yyyy-MM-dd');

      if (
        isAfter(orderDate, startOfLastMonth) &&
        isBefore(orderDate, endOfLastMonth)
      ) {
        if (dailyBrutoSum[orderDateString] !== undefined) {
          const brutoEarnings = order.order_products.reduce(
            (sum, orderProduct) => {
              return currentUser.type === 'ADMIN' ? (
                sum +
                parseFloat(orderProduct.associate_product.price || '0') *
                  orderProduct.quantity
              ) : (
                sum +
                ((parseFloat(orderProduct.associate_product.price || '0') *
                  orderProduct.quantity) - parseFloat(orderProduct.associate_product.product.price || '0') *
                  orderProduct.quantity)
              );
            },
            0,
          );

          dailyBrutoSum[orderDateString] += brutoEarnings;
        }
      }
    });

    return this.formatDataForChart(dailyBrutoSum);
  }

  private formatDataForChart(dailyOrders: Record<string, number>) {
    const chartData = Object.entries(dailyOrders).map(([date, count]) => ({
      label: date,
      data: count,
    }));

    return chartData;
  }

  private buildWhereClause(currentUser: CurrentUserDto) {
    const userId = currentUser.id;
    const userRole = currentUser.type;
    const whereClause: any = { status: 'DELIVERED' };
  
    if (userRole === 'ASSOCIATE') {
      whereClause.order_products = {
        associate_product: {
          user_id: userId,
        },
      };
    }
  
    return whereClause;
  }

  private async calculateEarnings(orders: any[], currentUser: CurrentUserDto) {
    const enrichedResult = orders.reduce(
      (acc, order) => {
        const brutoEarnings = order.order_products.reduce(
          (sum, orderProduct) => {
            return (
              sum +
              parseFloat(orderProduct.associate_product.price || '0') *
                orderProduct.quantity
            );
          },
          0,
        );

        const netoEarnings = order.order_products.reduce(
          (sum, orderProduct) => {
            return (
              sum +
              parseFloat(orderProduct.associate_product.product.price || '0') *
                orderProduct.quantity
            );
          },
          0,
        );

        const totalSoldItems = order.order_products.reduce(
          (sum, orderProduct) => {
            return sum + orderProduct.quantity;
          },
          0,
        );

        acc.brutoEarnings += brutoEarnings;
        acc.netoEarnings += netoEarnings;
        acc.totalOrders += 1;
        acc.totalSoldItems += totalSoldItems;

        return acc;
      },
      { brutoEarnings: 0, netoEarnings: 0, totalOrders: 0, totalSoldItems: 0 },
    );

    const user = await this.usersService.findOneById(currentUser.id);
    if(user.type === 'ASSOCIATE'){
      return {
        wallet: user.wallet,
        brutoEarnings: enrichedResult.brutoEarnings.toFixed(2),
        totalOrders: enrichedResult.totalOrders,
        totalSoldItems: enrichedResult.totalSoldItems,
      };
    }else {
      return {
        brutoEarnings: enrichedResult.brutoEarnings.toFixed(2),
        netoEarnings: enrichedResult.netoEarnings.toFixed(2),
        totalOrders: enrichedResult.totalOrders,
        totalSoldItems: enrichedResult.totalSoldItems,
      };
    }
  }
}

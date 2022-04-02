@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {}

@Injectable()
export class PurchaseOrderController {
  constructor(private readonly prisma: PrismaService) {}

  @Post("/api/purchaseOrders/cancel")
  async cancelOrder(
    @Req() request: Request,
    @Query("orderID") orderID: string
  ): Promise<string> {
      const { user as reqUser } = request;
      const order = await this.prisma.purchaseOrder.findUnique({
          where: { id: orderID },
      });
      //null-check order
      if(!order) {
          throw new BadRequestException("Order not found");
      }
      if(order.isCancelled) {
          throw new BadRequestException("Order is not active");
      }
      this.prisma.purchaseOrder.update({
          where: {id: orderID},
          data: {
              isCancelled: true,
              cancelledUserId: reqUser.id,
          },
      });
      return "success";
  }
}

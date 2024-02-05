import { injectable } from "tsyringe";
import { GenericUseCaseType } from "../../types/default-use-case";
import { OrderRepository } from "../../../external/database/repository/order";
import { CreateOrderType } from "../../types/order-create-use-case";
import { UserAddressRepository } from "../../../external/database/repository/user-address";
import { NotFoundError } from "routing-controllers";
import { UserPaymentRepository } from "../../../external/database/repository/user-payment-repository";
import { PaymentRepository } from "../../../external/database/repository/payment-repository";
import { ItemsDetailsUseCase } from "../inventory/items-details-use-case";
import { OrderItemsRepository } from "../../../external/database/repository/order-items-repository";
import { ProductModel } from "../../../external/database/models/product";
import { CreateOrderItemsType } from "../../types/create-order-items-type";

@injectable()
export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly itemsDetailsUseCase: ItemsDetailsUseCase,
        private readonly userAddressRepository: UserAddressRepository,
        private readonly userPaymentRepository: UserPaymentRepository,
        private readonly paymentRepository: PaymentRepository,
        private readonly orderItemsRepository: OrderItemsRepository) { }

    async execute({ data }: GenericUseCaseType<CreateOrderType>) {
        const { orderItems, user, usersPayments } = data
        const products = await this.itemsDetailsUseCase.execute({ data: orderItems })

        const addressData = { id: usersPayments.userAddressId, userId: user.id }
        const address = await this.userAddressRepository.getById({ data: addressData })
        if (!address) {
            throw new NotFoundError(`Address with id ${addressData.id} is not found`)
        }

        const total = products.reduce((total, item) => {
            const qtd = orderItems.find((oi) => oi.productId === item.id)?.quantity as number
            return total + item.price * qtd
        }, 0)

        // should create fake payment
        this.userPaymentRepository.insert({
            data: {
                userId: user.id,
                paymentType: usersPayments.paymentType,
                provider: usersPayments.provider,
                accountNo: usersPayments.accountNo,
                expiry: usersPayments.expiry,
            },
        })

        const payment = await this.paymentRepository.insert({
            data: {
                amount: total,
                provider: usersPayments.provider,
                status: 'Paid'
            }
        })

        const order = await this.orderRepository.insert({
            data: {
                userId: user.id,
                paymentId: payment.id,
                total: total
            }
        })
        this.createProduct(products, orderItems, order.id)

        return this.orderRepository.findById({ id: order.id })
    }


    private async createProduct(products: ProductModel[], orderItems: CreateOrderItemsType[], orderId: string) {
        const items = products.map((product) => {
            const qtd = orderItems.find((oi) => oi.productId === product.id)?.quantity as number
            return ({
                orderId: orderId,
                productId: product.id,
                quantity: qtd,
            })
        })

        await this.orderItemsRepository.insert({ data: items })
        return items
    }

}
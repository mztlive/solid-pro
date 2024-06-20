

declare namespace API {
    export interface BaseResponse<T> {
        meta: {
            code: number
            msg: string
        }
        data: T
    }

    export interface Collection<T> {
        total: number
        items: T[]
    }

    interface BaseEntity {
        identity: string
        created_at: number
        deleted_at: number
        updated_at: number
        version: number
    }

    export interface IdentityRequest {
        identity: string
    }

    export namespace Login {
        export interface Request {
            account: string
            password: string
        }

        export interface Response extends BaseResponse<string> {}
    }

    export namespace Sellers {
        export interface Seller extends BaseEntity {
            agent_id: string
            name: string
            mobile: string
            remark: string
            account: string
            password: string
        }

        export interface SearchSellerResponse extends Collection<Seller> {}

        export interface SearchRequest {
            account?: string
            name?: string
            mobile?: string
            page: number
            page_size: number
        }

        export interface UpsertSellerRequest {
            identity?: string
            name: string
            mobile: string
            account: string
            password: string
        }
    }

    export namespace Orders {
        interface SearchOrderRequest {
            order_no?: string
            member_code?: string
            time_range?: number[]
            order_status?: OrderStatus
            receiver_name?: string
            receiver_mobile?: string
            item_name?: string
            coupon_no?: string
            seller_id?: string
            order_type?: string[]
            page: number
            page_size: number
        }

        interface OrderReceiverInfo {
            province: string
            city: string
            area: string
            address: string
            name: string
            mobile: string
        }

        interface OrderDeliveryInfo {
            delivery_no: string
            waybill_no: string
            delivery_company: string
            delivery_company_code: string
            include_items: OrderItem[]
        }

        enum OrderItemSource {
            GiveAway = 'give_away',
            Shopping = 'shopping'
        }

        interface KeyValue {
            key: string
            value: string
        }

        type KeyValueSlice = KeyValue[]

        enum OrderItemType {
            Product = 'product',
            Recharge = 'recharge'
        }

        enum OrderStatus {
            ALL = '',
            Unsubmit = 'unsubmit',
            Unpaid = 'unpaid',
            Paid = 'paid',
            Making = 'making',
            Delivered = 'delivered',
            PartialDeliver = 'partial_deliver',
            Received = 'received',
            Canceled = 'canceled',
            Refunded = 'refunded',
            Completed = 'completed',
            Closed = 'closed',
            Expired = 'expired',
            Refunding = 'refunding'
        }

        interface OrderItem {
            item_no: string
            item_name: string
            item_price: number // Assuming currency.Cent is represented as a number
            item_quantity: number
            item_type: OrderItemType
            item_image: string
            total_price: number // Assuming currency.Cent is represented as a number
            attributes: KeyValueSlice
            source: OrderItemSource
        }

        enum PaymentType {
            Wechat = 'wechat',
            Wallet = 'wallet',
            Mix = 'mix'
        }

        interface PaymentDetail {
            payment_type: PaymentType
            amount: number // Assuming currency.Cent is represented as a number
        }

        enum DiscountType {
            Coupon = 'coupon',
            BenefitWithDiscount = 'benefit_with_discount'
        }

        interface OrderDiscountDetail {
            discount_type: DiscountType
            amount: number // Assuming currency.Cent is represented as a number
            discount_no?: string // Optional property for coupon code
        }

        interface Order extends BaseEntity {
            order_no: string
            total_fee: number // Assuming currency.Cent is represented as a number
            member_code: string
            pay_at: number
            receiver_info?: OrderReceiverInfo
            deliver_info: OrderDeliveryInfo[]
            order_status: OrderStatus
            items: OrderItem[]
            expired_time: number
            body: string
            postage: number // Assuming currency.Cent is represented as a number
            payment_type: PaymentType
            payment_details: PaymentDetail[]
            discounts: OrderDiscountDetail[]
            prepay_id?: string
            is_settlement: boolean
            agent_id: string
            seller_id: string
            order_type: string
        }

        interface SearchOrderResponse extends Collection<Order> {}
    }

    export namespace Customers {
        interface SearchMemberFilter {
            real_name?: string
            channel?: string
            mobile?: string
            tags?: string[]
            member_codes?: string[]
            enterprise_name?: string
            seller_id?: string
            page: number
            page_size: number
        }

        interface WxInfo {
            open_id: string
            avatar: string
            nick_name: string
            app_id: string
            member_code: string
            union_id: string
        }

        interface Member extends BaseEntity {
            member_code: string
            mobile: string
            real_name: string
            enterprise_name: string
            channel: string
            tags: string[]
            wx_infos?: WxInfo
            seller_id: string
            agent_id: string
            seller_name: string
        }

        interface SearchMemberResponse extends Collection<Member> {}

        interface MongoGeo {
            type: string
            coordinates: number[]
        }

        interface Consumer extends BaseEntity {
            name: string
            address: string
            province: string
            city: string
            district: string
            is_collect: boolean
            location: MongoGeo
        }

        interface SearchConsumerFilter {
            name?: string
            address?: string
            provinces?: string[]
            citys?: string[]
            districts?: string[]
            is_collect?: boolean
            page: number
            page_size: number
        }

        interface SearchConsumerResponse extends Collection<Consumer> {}
    }

    export namespace Info {
        interface Agent extends BaseEntity {
            name: string
            account: string
            password: string
            regions: string[]
            enterprise: string
        }
    }

    export namespace Dashboard {
        interface ConsumerShpppingRankRequest {}

        interface ConsumerShoppingRankResponse {
            // key is consumer name
            rank?: {
                key: string
                value: string
            }[]
        }
    }
}

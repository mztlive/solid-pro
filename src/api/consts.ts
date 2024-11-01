export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10

export enum OrderStatus {
	ALL = "",
	Unsubmit = "unsubmit",
	Unpaid = "unpaid",
	Paid = "paid",
	Making = "making",
	Delivered = "delivered",
	PartialDeliver = "partial_deliver",
	Received = "received",
	Canceled = "canceled",
	Refunded = "refunded",
	Completed = "completed",
	Closed = "closed",
	Expired = "expired",
	Refunding = "refunding",
}

export enum PaymentType {
	Wechat = "wechat",
	Wallet = "wallet",
	Mix = "mix",
}

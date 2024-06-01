export type CreateInvoiceOptions = {
	amount: string;
	currency: string;
	order_id: string;
	network?: string | null;
	url_return?: string | null;
	url_success?: string | null;
	url_callback?: string | null;
	is_payment_multiple?: boolean;
	lifetime?: number;
	to_currency?: string;
	subtract?: number;
	accuracy_payment_percent?: number;
	additional_data?: string | null;
	currencies?: string[];
	except_currencies?: string[] | null;
	course_source?: "Binance" | "BinanceP2P" | "Exmo" | "Kucoin" | "Garantexio";
	from_referral_code?: string | null;
	discount_percent?: number | null;
	is_refresh?: boolean;
};

export type CreateInvoiceResponse = {
	uuid: string;
	order_id: string;
	amount: string;
	payment_amount: string;
	payer_amount: string;
	discount_percent: number;
	discount: string;
	payer_currency: string;
	currency: string;
	merchant_amount: string | null;
	network: string;
	address: string;
	from: string;
	txid: string;
	payment_status: string;
	url: string;
	expired_at: string;
	is_final: boolean;
	additional_data: string | null;
	created_at: string;
	updated_at: string;
};

export type WebhookData = {
	type: "wallet" | "payment";
	uuid: string;
	order_id: string;
	amount: string;
	payment_amount: string;
	payment_amount_usd: string;
	merchant_amount: string;
	commission: string;
	is_final: boolean;
	status:
		| "confirm_check"
		| "paid"
		| "paid_over"
		| "fail"
		| "wrong_amount"
		| "cancel"
		| "system_fail"
		| "refund_process"
		| "refund_fail"
		| "refund_paid";
	from: string;
	wallet_address_uuid: string;
	network: string;
	currency: string;
	payer_currency: string;
	additional_data: string;
	convert?: {
		to_currency: string;
		commission: string;
		rate: string;
		amount: string;
	};
	txid?: string;
	sign: string;
};

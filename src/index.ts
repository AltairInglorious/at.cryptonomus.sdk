import crypto from "node:crypto";
import axios from "axios";
import type {
	CreateInvoiceOptions,
	CreateInvoiceResponse,
	WebhookData,
} from "./types";

export class CryptonomusSDK {
	private http;

	constructor(
		merchantUuid: string,
		private apiToken: string,
	) {
		this.http = axios.create({
			baseURL: "https://api.cryptomus.com/v1/",
			headers: {
				merchant: merchantUuid,
			},
		});
	}

	private async makeRequest(url: string, body: object) {
		const jsonData = JSON.stringify(body);
		const base64Data = Buffer.from(jsonData).toString("base64");
		const sign = crypto
			.createHash("md5")
			.update(base64Data + this.apiToken)
			.digest("hex");

		return this.http
			.post(url, body, {
				headers: {
					sign,
				},
			})
			.then((r) => r.data);
	}

	async createInvoice(
		options: CreateInvoiceOptions,
	): Promise<CreateInvoiceResponse> {
		return this.makeRequest("payment", options);
	}

	checkWebhook(data: WebhookData, apiPaymentKey: string): boolean {
		const sign = data.sign;

		const { sign: _, ...dataWithoutSign } = data;

		const dataString = JSON.stringify(
			dataWithoutSign,
			Object.keys(dataWithoutSign).sort(),
		);

		const hash = crypto
			.createHash("md5")
			.update(
				Buffer.from(dataString, "utf-8").toString("base64") + apiPaymentKey,
			)
			.digest("hex");

		return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(sign));
	}
}

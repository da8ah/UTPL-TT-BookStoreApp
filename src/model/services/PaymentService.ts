import IPago from "../core/ports/IPago";

export default class PaymentService implements IPago {

    private token: string
    private username: string
    private base = 'https://utpl-tt-bookstore.azurewebsites.net'
    private apiURL: string

    constructor(token: string = '', username: string = '') {
        this.token = token
        this.username = username
        this.apiURL = `${this.base}/api/clients/${this.username}/payments`
    }

    public async queryPaymentKey(): Promise<string | undefined> {
        try {
            if (this.token === '' || this.username === '') throw Error('Unauthorized, must signin!')

            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token,
                }
            }
            return await fetch(this.apiURL, httpContent).then(res => {
                const spk = res.headers.get("set-cookie")?.split(";")[0].split("=")[1]
                res.headers.delete("set-cookie")
                return spk
            })

        } catch (error) {
            console.log(error)
            return
        }
    }

    async procesarPago(amount: number): Promise<any> {
        try {
            if (this.token === '' || this.username === '') throw Error('Unauthorized, must signin!')

            const price = amount.toString()
            const checkPaymentFormat = (price: string): boolean => {
                const priceRegEx: RegExp = /^[\d]+[.,]{1}[\d]{2}$/;
                let priceTrim = price.trim();
                return priceRegEx.test(priceTrim);
            };
            if (!checkPaymentFormat(price)) return { codeStatus: ":400", clientSecret: null };
            const priceSplitted = price.split(/[.,]{1}/);
            const priceWithStripeFormat = priceSplitted[0] + priceSplitted[1];
            const bodyContent = JSON.stringify({
                amount: `${priceWithStripeFormat}`,
                paymentMethodType: "card",
            })

            const httpContent = {
                method: "POST",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                },
                body: bodyContent,
            }
            return fetch(this.apiURL, httpContent).then(async (res) => {
                const clientSecret = await res.json().then((obj) => obj.clientSecret);
                return { codeStatus: res.status.toString(), clientSecret }
            })

        } catch (error) {
            console.log(error)
            return
        }
    }
}
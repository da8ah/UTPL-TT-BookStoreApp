import ToBuyBook from "../entities/ToBuyBook";

export default interface IPago {
	procesarPago(toBuyBooks: ToBuyBook[]): Promise<{ codeStatus: string, clientSecret?: string } | undefined>;
}

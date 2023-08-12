import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
	obtenerLibrosVisibles(): Promise<StockBook[]>;
}

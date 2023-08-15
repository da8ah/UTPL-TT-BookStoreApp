import StockBook from "../model/core/entities/StockBook";
import ToBuyBook from "../model/core/entities/ToBuyBook";

export default class ObjectCloner {
    public static stockToBuyBook(stockBook: StockBook) {
        return new ToBuyBook(
            stockBook.getIsbn(),
            stockBook.getImgRef(),
            stockBook.getTitle(),
            stockBook.getAuthor(),
            stockBook.getReleaseDate(),
            stockBook.getGrossPricePerUnit(),
            stockBook.isInOffer(),
            stockBook.getDiscountPercentage(),
            stockBook.itHasIva(),
            0
        );
    }
}

import StockBook from "../model/core/entities/StockBook";

export default class ObjectCloner {
    public static stockBook(stockBook: StockBook) {
        return new StockBook(
            stockBook.getIsbn(),
            stockBook.getImgRef(),
            stockBook.getTitle(),
            stockBook.getAuthor(),
            stockBook.getReleaseDate(),
            stockBook.getCreatedDate(),
            stockBook.getDescription(),
            stockBook.getGrossPricePerUnit(),
            stockBook.isInOffer(),
            stockBook.getDiscountPercentage(),
            stockBook.itHasIva(),
            stockBook.getStock(),
            stockBook.isVisible(),
            stockBook.isRecommended(),
            stockBook.isBestSeller(),
            stockBook.isRecent(),
        );
    }
}

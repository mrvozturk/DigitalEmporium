export const calculateTotal = (
  items: {
    product: { product_price: number | string };
    quantity: number;
  }[]
) => {
  return items.reduce((acc, item) => {
    const priceString = (item.product.product_price ?? '0').toString();
    let cleanedPrice = priceString;

    const lastCommaIndex = priceString.lastIndexOf(',');
    const lastDotIndex = priceString.lastIndexOf('.');

    if (lastCommaIndex > lastDotIndex) {
      cleanedPrice = priceString.replace(/\./g, '');
      cleanedPrice = cleanedPrice.replace(',', '.');
    } else if (lastDotIndex > lastCommaIndex) {
      cleanedPrice = priceString.replace(/,/g, '');
    } else if (lastCommaIndex !== -1) {
      cleanedPrice = priceString.replace(',', '.');
    }

    cleanedPrice = cleanedPrice.replace(/[^\d.-]/g, '');

    const numericPrice = parseFloat(cleanedPrice);
    return acc + (isNaN(numericPrice) ? 0 : numericPrice) * item.quantity;
  }, 0);
};

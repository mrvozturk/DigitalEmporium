export const calculateTotal = (
  items: { price?: string; quantity: number }[]
) => {
  return items.reduce((acc, item) => {
    const cleanedPrice = (item.price ?? '0')
      .replace(/[^\d,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    const numericPrice = parseFloat(cleanedPrice);
    return acc + (isNaN(numericPrice) ? 0 : numericPrice) * item.quantity;
  }, 0);
};
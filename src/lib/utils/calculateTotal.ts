export const calculateTotal = (
  items: { price: string; quantity: number }[]
) => {
  return items.reduce((acc, item) => {
    const cleanedPrice = item.price
      .replace(/[^\d,]/g, '') // Sadece rakamları ve virgülü al
      .replace(/\./g, '') // Noktaları kaldır
      .replace(',', '.'); // Virgülü noktaya çevir

    return acc + parseFloat(cleanedPrice) * item.quantity;
  }, 0);
};

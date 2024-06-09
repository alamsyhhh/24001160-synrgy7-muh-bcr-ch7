const formatRupiah = (amount: number): string => {
  // Format the amount into Indonesian Rupiah format
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export default formatRupiah;

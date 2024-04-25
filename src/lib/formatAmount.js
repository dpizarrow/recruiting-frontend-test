const formatAmount = (amount, currency, usdToClp) => {
  if (currency === "USD") {
    const convertedAmount = (amount * usdToClp).toLocaleString();
    return `$${convertedAmount} CLP ($${amount.toLocaleString()} USD)`;
  } else {
    const convertedAmount = (amount / usdToClp).toLocaleString();
    return `$${amount.toLocaleString()} CLP ($${convertedAmount} USD)`;
  }
};

export default formatAmount;

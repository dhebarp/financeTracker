
export function calculatePayments(principalAmount, rate, years ) {

    const principal = parseFloat(principalAmount);
  const CalculateInterest = parseFloat(rate) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  //Compute monthly Payment

  const x = Math.pow(1 + CalculateInterest, calculatedPayments);
  const monthly = (principal * x * CalculateInterest) / (x - 1);
  const monthlyPayment = monthly.toFixed(2);

  //Compute Interest

  const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);

  //Compute Total Payment

  const totalPayment = (monthly * calculatedPayments).toFixed(2);

  return({monthlyPayment, totalInterest, totalPayment});
  };
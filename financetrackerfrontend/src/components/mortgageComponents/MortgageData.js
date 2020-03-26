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

// annual calculations for table
 const calculatedMonthlyPayment =
CalculateInterest === 0
    ? principal / years / 12
    : (principal * CalculateInterest) /
      (1 - Math.pow(1 / (1 + CalculateInterest), years * 12));

let balance = principal;
let baseline = principal;
let payments = [{balance, baseline }];
let partial;

for (let year = 0; year < years; year++) {
  let interestYearly = 0;
  for (let month = 1; month <= 12; month++) {
    let interestMonth = balance * CalculateInterest;
    interestYearly += interestMonth;
    balance -=
      calculatedMonthlyPayment - interestMonth;
    baseline -= calculatedMonthlyPayment - baseline * CalculateInterest;
    
    if (balance <= 0) {
      balance = 0;
      if (partial === undefined && month !== 12) {
        partial = month;
      }
    }
  }

  payments.push({
    baseline,
    interestYearly,
    balance,
    partial,
  });
  if (partial) partial = 0;
}
return({monthlyPayment, totalInterest, totalPayment, payments});
};

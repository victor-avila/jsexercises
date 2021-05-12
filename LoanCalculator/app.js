document.querySelector('#loan-form').addEventListener('submit', function(e) {
  document.querySelector('#loading').style.display = 'block';
  document.querySelector('#results').style.display = 'none';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults() {
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  document.querySelector('#loading').style.display = 'none';
  if (isFinite(monthly)) {
    document.querySelector('#results').style.display = 'block';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
  }
  else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  const divError = document.createElement('div');
  divError.className = 'alert alert-danger';
  divError.appendChild(document.createTextNode(error));
  document.querySelector('.card').insertBefore(divError, document.querySelector('.heading'));
  setTimeout(function() {
    divError.remove();
  }, 3000);
}
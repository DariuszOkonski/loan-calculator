const loading = document.getElementById('loading');
const results = document.getElementById('results');

function calculateResults() {

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    setTimeout(() => {
      loading.style.display = 'none';
      results.style.display = 'block';
    }, 2000);

  } else {
    showError('Please check your numbers')
    results.style.display = 'none';
    loading.style.display = 'none';
  }
}

function showError(error) {

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}

document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  results.style.display = 'none';
  loading.style.display = 'block';
  calculateResults();

  // setTimeout(() => {
  //   loading.style.display = 'none';
  //   results.style.display = 'block';
  // }, 2000);
});
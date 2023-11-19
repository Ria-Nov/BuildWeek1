// Dati del grafico
const dati = {
    datasets: [{
      data: [30, 70,], // I tuoi dati qui
      backgroundColor: ['#00ffff', '#c2128d']
    }]
  };

  // Opzioni del grafico
  var opzioni = {
    responsive: true,
    maintainAspectRatio: false,
    display: true
};
  

  // Ottieni il riferimento al canvas
  var ctx = document.getElementById('doughnutChart').getContext('2d');

  // Crea il grafico a forma di anello
  var doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: dati,
    options: opzioni
  });
  
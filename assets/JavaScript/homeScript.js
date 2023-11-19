/* Fasi di sviluppo

- dobbiamo checkare la check-box e al check attivare l'ancora del bottone per passare alla pagina successiva
- attivazione bottone con classe disabled */

let proceed = document.querySelector("#proceed");
let casella = document.querySelector("#casella");

let procedi = (casella.onchange = function () {
  if (this.checked) {
    proceed.disabled = false;
  } else {
    proceed.disabled = true;
  }
});

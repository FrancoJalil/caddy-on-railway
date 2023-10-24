

export function refreshUserTokens() {

  let accessTokenX = localStorage.getItem('access');

  const tokensElement = document.getElementById('tokens');
  axios.get('https://api.corailo.com/get-user-tokens/', {
    headers: {
      'Authorization': 'Bearer ' + String(accessTokenX)
    }
  })
    .then(response => {

      let userTokens = response.data.user_tokens
      if (!userTokens) {
        userTokens = 0;
      }

      tokensElement.textContent = userTokens;


    });
}

export function getUserStatus() {

  let accessToken = localStorage.getItem('access');

  const statusElement = document.getElementById('status');

  axios.get('https://api.corailo.com/get-user-status/', {
    headers: {
      'Authorization': 'Bearer ' + String(accessToken)
    }
  })
    .then(response => {

      let userStatus = response.data.user_status;
      statusElement.textContent = userStatus;
      if (userStatus === "member") {
        console.log("f")
        cancelarSuscripcion.style.display = "flex";
      } else if (userStatus === "free") {
        cancelarSuscripcion.style.display = "none";
      }
      return userStatus;

    });
}

export function getNextBillingTime() {

  let accessToken = localStorage.getItem('access');

  axios.get('https://api.corailo.com/payments/paypal/subscription/get-next-billing-time', {
    headers: {
      'Authorization': 'Bearer ' + String(accessToken)
    }
  })
    .then(response => {

      if (response.success) {
      let nextTimeBillingHTML = document.getElementById('nextTimeBilling')
      let nextTimeBilling = response.data.next_billing_time;
      const fecha = new Date(nextTimeBilling);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      const fechaFormateada = `${dia}/${mes}/${año}`;
      nextTimeBillingHTML.textContent = fechaFormateada;
      return
    }
    console.log(response)
      let nextTimeBillingHTML = document.getElementById('nextTimeBilling')
      let nextTimeBilling = '∞/∞/∞'
      nextTimeBillingHTML.textContent = nextTimeBilling
      return


    }).catch(error => {
      console.log(error)
      let nextTimeBillingHTML = document.getElementById('nextTimeBilling')
      let nextTimeBilling = '∞/∞/∞'
      nextTimeBillingHTML.textContent = nextTimeBilling
    });
  // 404 es porq el user está canceled
}
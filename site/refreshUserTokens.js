

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
      let userVerified = response.data.user_verified;
      statusElement.textContent = userStatus;
      if (userStatus === "member") {

        cancelarSuscripcion.style.display = "flex";
      } else if (userStatus === "free") {
        cancelarSuscripcion.style.display = "none";
      }

      if (!userVerified) {
        document.getElementById('verification').style.display = 'block';
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
      if (!response) {
        let nextTimeBillingHTML = document.getElementById('nextTimeBilling')
        let nextTimeBilling = '∞/∞/∞'
        nextTimeBillingHTML.textContent = nextTimeBilling
        return
      }
      else if (response.status === 200 & response.data.sub !== 'cancelled') {

        let nextTimeBillingHTML = document.getElementById('renovacion')
        let nextTimeBilling = response.data.next_billing_time;
        const fecha = new Date(nextTimeBilling);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();

        const fechaFormateada = `${dia}/${mes}/${año}`;
        nextTimeBillingHTML.textContent = "tus tokens se renovarán el " + fechaFormateada;
        return
      } else if (response.data.sub === 'cancelled') {
        document.getElementById('upgrade').style.display = "block";
      }
      //console.log(response)
      let nextTimeBillingHTML = document.getElementById('renovacion')
      let nextTimeBilling = '∞/∞/∞'
      nextTimeBillingHTML.textContent = ""
      return


    }).catch(error => {

      console.log(error)
      let nextTimeBillingHTML = document.getElementById('nextTimeBilling')
      let nextTimeBilling = '∞/∞/∞'
      nextTimeBillingHTML.textContent = nextTimeBilling
      return
    });
  // 404 es porq el user está canceled
}
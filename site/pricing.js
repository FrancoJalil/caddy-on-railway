//import { decodeJWTAndGetUsername } from '../profile.js'

export function decodeJWTAndGetUsername(jwtToken) {
  // In a real application, use the jsonwebtoken library to decode the JWT
  // Replace this with the actual JWT decoding logic for your application
  var decoded = jwtToken.split(".");

  var jwt_decoded = JSON.parse(atob(decoded[1]))

  return jwt_decoded;
}


function ifNotPremium() {
  let access_token = localStorage.getItem('access');
  let refresh_token = localStorage.getItem('refresh');

  if (access_token) {
    const url = 'https://api.corailo.com/api/token/verify/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: access_token,
      })
    }).then(response => {
      if (!response.ok) {
        // Token verification failed, stay on the login page
       
        return Promise.reject("Invalid token");
      }
      return response.json();
    })
      .then(data => {
        let jwt_token = decodeJWTAndGetUsername(refresh_token)

        if (jwt_token.status === 'member') {
          window.location.href = "/";
        }
      })
      .catch(error => {
      
      });
    }
  else {
    window.location.href = "/login?next=pricing";
  }
}

function purchase() {
  
  // api paypal
  axios.get('https://api.corailo.com/payments/paypal/subscription')
    .then(response => {
      // Capturar la respuesta exitosa
      const responseData = response.data;
  

      // Aquí puedes hacer lo que necesites con los datos de la respuesta
    })
    .catch(error => {
      // Capturar los errores
  
      // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}


document.addEventListener('DOMContentLoaded', () => {


  // No tiene que ser premium, si es, redirigirlo al home
  ifNotPremium();

  // manejar el event listener directamente en el .html?
  let purchaseButton = document.getElementById('paypal-button-container-P-7W942775BJ289904GMU7SECA');

  purchaseButton.addEventListener('click', purchase);

});


import { getNextBillingTime, getUserStatus, refreshUserTokens } from "./refreshUserTokens.js";

export function decodeJWTAndGetUsername(jwtToken) {
  // In a real application, use the jsonwebtoken library to decode the JWT
  // Replace this with the actual JWT decoding logic for your application
  var decoded = jwtToken.split(".");

  var jwt_decoded = JSON.parse(atob(decoded[1]))

  return jwt_decoded;
}



document.addEventListener('DOMContentLoaded', () => {

  // extraer data jwt aquí
  const accessToken = localStorage.getItem('refresh');

  // Decodificar el token utilizando jwt-decode
  const decodedToken = decodeJWTAndGetUsername(accessToken);

  //document.getElementById('photo') decodedToken.picture

  // Obtener el elemento de imagen por su id
  const logoutButton = document.getElementById('logoutButton');
  const cancelarSuscripcion = document.getElementById('cancelarSuscripcion');
  const photoElement = document.getElementById('photo');
  const photoElementP = document.getElementById('profilePhoto');
  const emailElement = document.getElementById('email');
  const emailInput = document.getElementById('emailInput');
  const modal = document.getElementById('modal-profile');
  const cancelarBtn = document.getElementById('cancelarBtn');
  const enviarBtn = document.getElementById('enviarBtn');

  getUserStatus();
  getNextBillingTime();
  

  emailElement.textContent = decodedToken.email;
  // Establecer el atributo "src" de la imagen con la URL del campo "picture"
  photoElementP.src = decodedToken.picture;
  photoElement.src = decodedToken.picture;

  logoutButton.addEventListener('click', function () {
    // LOGOUT SER
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    // Redireccionar a otra página
    window.location.href = "/login";
  });

  cancelarSuscripcion.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  cancelarBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  emailInput.addEventListener('input', (e) => {
    let emailUserInput = e.target.value;
    let userEmail = decodedToken.email;
    console.log(emailUserInput);


    if (emailUserInput === userEmail) {
      console.log("OK")
      enviarBtn.classList.add('active-button-profile')
      enviarBtn.classList.remove('disabled-button-profile')

    } else {
      if (enviarBtn.classList.contains('active-button-profile')) {
        enviarBtn.classList.add('disabled-button-profile')
        enviarBtn.classList.remove('active-button-profile')
      }
    }
  })


  enviarBtn.addEventListener('click', function () {
    let access = localStorage.getItem('access');
    // enviar data.subscriptionID al backend
    
    axios.post('https://mikai-production.up.railway.app/payments/paypal/subscription/cancel', {
      subscriptionID: "hola"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(access)
      }
    })
      .then(response => {
        // Capturar la respuesta exitosa
        const responseData = response;
        console.log('Respuesta exitosa:', responseData);

        location.reload(true);

        
        // REFRESCAR TOKENS ASI SE ACTUALIZA EL PERFIL Y EL STATUS Y TODO ESO

        // Aquí puedes hacer lo que necesites con los datos de la respuesta
      })
      .catch(error => {
        // Capturar los errores
        refreshUserTokens();
        console.error('Error en la solicitud:', error);
        // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
      });
      //localStorage.setItem('status', 'free');

      // time out 30s?
      
        
      
      

  })

  //refreshUserTokens(); posible error? quitar coments si es así.

});

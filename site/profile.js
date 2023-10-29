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



    if (emailUserInput === userEmail) {

      enviarBtn.classList.add('active-button-profile')
      enviarBtn.classList.remove('disabled-button-profile')

    } else {
      if (enviarBtn.classList.contains('active-button-profile')) {
        enviarBtn.classList.add('disabled-button-profile')
        enviarBtn.classList.remove('active-button-profile')
      }
    }
  })


  enviarBtn.addEventListener('click', async function () {

    enviarBtn.style.display = 'none';

    let access = localStorage.getItem('access');

    try {
      const response = await axios.post('https://api.corailo.com/payments/paypal/subscription/cancel', {
        subscriptionID: "hola"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(access)
        }
      });

      // Capturar la respuesta exitosa
      const responseData = response;


      location.reload(true);

      // REFRESCAR TOKENS ASÍ SE ACTUALIZA EL PERFIL Y EL STATUS Y TODO ESO
      // Puedes llamar a la función refreshUserTokens() aquí si es necesario.

      //localStorage.setItem('status', 'free');

      // time out 30s?
    } catch (error) {
      // Capturar los errores
      refreshUserTokens();
      console.error('Error en la solicitud:', error);
      // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }

  });






  let alertmsg = document.getElementById('alertmsg');
  let buttonMsgContainer = document.getElementById('buttonMsgContainer');

  function closeButtonContent() {

    let floatButton = document.getElementById('floatButton');
    let content = document.getElementById('contentButton');

    if (content.style.display == 'none') {
      floatButton.classList.add('floatButtonactive')
      document.getElementById('fpc').style.transition = 'opacity 0.2s';
      document.getElementById('fpc').style.opacity = '0.5';
      
      document.getElementById('contentButton').style.display = 'flex';
    } else {
      floatButton.classList.remove('floatButtonactive')
      document.getElementById('fpc').style.transition = 'opacity 0.2s';
      document.getElementById('fpc').style.opacity = '1';
      
      document.getElementById('contentButton').style.display = 'none';
    }
  }

  document.getElementById('floatButton').addEventListener('click', function () {
    closeButtonContent();

  })

  document.getElementById('enviarMensaje').addEventListener('click', async function () {


    // capturar textarea
    let msgToSend = document.getElementById('textA').value;



    if (msgToSend.trim() === '') {
      alert('El campo de texto está vacío. Por favor, introdúzca algún texto.');
      return
    }
    
    //axios
    const access = localStorage.getItem('access');
    const data = {
      msg: msgToSend
    };

    try {
      const response = await axios.post('https://api.corailo.com/contact-me/', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(access)
        }
      });

      // Capturar la respuesta exitosa
      

      if(response) {
        
        buttonMsgContainer.style.display = 'none';
        alertmsg.style.display = 'block';
        setTimeout(() => {
          location.reload(true);
        }, 2000);
      }
      

      // REFRESCAR TOKENS ASÍ SE ACTUALIZA EL PERFIL Y EL STATUS Y TODO ESO
      // Puedes llamar a la función refreshUserTokens() aquí si es necesario.

      //localStorage.setItem('status', 'free');

      // time out 30s?
    } catch (error) {
      // Capturar los errores
      
      console.error('Error en la solicitud:', error);
      buttonMsgContainer.style.display = 'none';
      alertmsg.textContent = 'Error al enviar. Intentalo de nuevo más tarde.'
      alertmsg.style.display = 'block';
      setTimeout(() => {
        location.reload(true);
      }, 2000);
      // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }

  });

    

  


});

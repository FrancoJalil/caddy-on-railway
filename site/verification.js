document.addEventListener('DOMContentLoaded', () => {

    // extraer data jwt aquí
    const accessToken = localStorage.getItem('access');

    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });


    


    //document.getElementById('photo') decodedToken.picture

    // Obtener el elemento de imagen por su id
    const sendSms = document.getElementById('sendSms');
    const sendOtp = document.getElementById('sendOtp');
    var phone;
    var otp;

    document.getElementById('sendSms').addEventListener('click', function () {
        phone = phoneInput.getNumber();
      })

    var inputElementOtp = document.getElementById('otp')
    inputElementOtp.addEventListener('input', function (event) {
        otp = event.target.value;
        console.log(otp);
    })

    sendSms.addEventListener('click', function () {
        axios.post('https://api.corailo.com/send-sms-code/', {
            user_num: phone
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(accessToken)
            }
        })
        .then(response => {
            console.log(response);
            const responseData = response.data;
            console.log(responseData.status);
            if (responseData.status == 200) {
                document.getElementById('otpContainer').style.visibility = "visible";
            } else {
                document.getElementById('errorMsg').textContent = responseData.msg;
            }
        })
        .catch(function (error) {
            console.error('Error en la solicitud:', error);
        });
    });





    sendOtp.addEventListener('click', async function () {

        try {
            const response = await axios.post('https://api.corailo.com/otp-verification/', {
                otp_code: otp
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(accessToken)
                }
            });

            // Capturar la respuesta exitosa
            const responseData = response;

            if (responseData.status == 200) {
                window.location.href = "/";
            }

        } catch (error) {
            // Capturar los errores
            console.error('Error en la solicitud:', error);

        }

    });


});

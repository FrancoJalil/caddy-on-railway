document.addEventListener('DOMContentLoaded', () => {

    // extraer data jwt aquí
    const accessToken = localStorage.getItem('access');


    //document.getElementById('photo') decodedToken.picture

    // Obtener el elemento de imagen por su id
    const sendSms = document.getElementById('sendSms');
    const sendOtp = document.getElementById('sendOtp');
    var num;
    var otp;

    var inputElementNum = document.getElementById('num')
    inputElementNum.addEventListener('input', function (event) {
        num = event.target.value;
        console.log(num);
    })

    var inputElementOtp = document.getElementById('otp')
    inputElementOtp.addEventListener('input', function (event) {
        otp = event.target.value;
        console.log(otp);
    })

    sendSms.addEventListener('click', async function () {

        try {
            const response = await axios.post('https://api.corailo.com/send-sms-code/', {
                user_num: num
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(accessToken)
                }
            });

            // Capturar la respuesta exitosa
            const responseData = response;
            console.log(responseData.status);
            if (responseData.status == 200) {
                document.getElementById('otpContainer').style.visibility = "visible"
            } else {
                document.getElementById('errorMsg').textContent = response.data.msg;
            }

        } catch (error) {
            // Capturar los errores
            console.error('Error en la solicitud:', error);

        }

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

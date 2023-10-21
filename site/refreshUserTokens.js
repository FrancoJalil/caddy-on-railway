

export function refreshUserTokens() {
 
    let accessTokenX = localStorage.getItem('access');

    const tokensElement = document.getElementById('tokens');
    axios.get('https://mikai-production.up.railway.app/get-user-tokens/', {
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

  axios.get('https://mikai-production.up.railway.app/get-user-status/', {
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
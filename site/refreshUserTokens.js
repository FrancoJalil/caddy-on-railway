

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
            tokensElement.textContent = userTokens
        

        });
}


const refreshTokenEndpoint = 'https://api.corailo.com/api/token/refresh/';
let accessToken = localStorage.getItem('access');
let refreshToken = localStorage.getItem('refresh');


async function logoutUser() {
  //localStorage.removeItem('access')
  //localStorage.removeItem('refresh')
  // Redireccionar a otra página
  //window.location.href = "/login";

}

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    try {
      const response = await fetch(refreshTokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      });
  
      if (response.status === 401) {
      
        logoutUser();
        console.log("1")
        
      }
  
      const data = await response.json();

   
  
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
  
      accessToken = data.access;
      refreshToken = data.refresh;
      return data.access;
    } catch (error) {
      console.log("2")
      logoutUser();
    }
  }

// Axios interceptor to handle expired tokens
axios.interceptors.response.use(
    (response) => response,
    (error) => {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return refreshAccessToken().then((token) => {
            
                
                originalRequest.headers.Authorization = `Bearer ${token}`; // + String(token)?

                return axios(originalRequest);
            });
        }

      
        console.log("3", error)
        logoutUser();
    }
);

/* Example usage
async function example() {
    try {
        const response = await axios.get('http://localhost:8080/example_endpoint');
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
}

example();
*/

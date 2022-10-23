class Auth {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated() {
    let authenticated = localStorage.getItem("authenticated");
    console.log(authenticated);
    return authenticated ? true : false;
  }

  storeAuthData( token) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("authenticated", true);
  }

    getAuthData(){
        if(localStorage.getItem("access_token")) 
            return localStorage.getItem("access_token") 
        else return false;
    }

  removeAuthData() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("authenticated");
  }
}

export default new Auth();

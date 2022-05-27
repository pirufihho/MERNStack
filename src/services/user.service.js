

const service = {
    
    login : (userName, password) => {
        return new Promise((resolve, reject) => {
            fetch('/api/users/login/'+userName+'/'+password)
            .then(res => res.json())
            .then(data =>{
                if(data.loggedIn){
                    localStorage.setItem('logedUser', JSON.stringify({loggedIn:data.loggedIn,adminUser:data.adminUser}))
                } else{
                    localStorage.removeItem('logedUser')
                }
                
                resolve(data);
            })
          });
    },

    isUserLoged : () => {
        var getLogged = JSON.parse(localStorage.getItem('logedUser'));

        return localStorage.getItem('logedUser') !== null && getLogged && getLogged.loggedIn
    },

    isAdminUser : () => {
        var getLogged = JSON.parse(localStorage.getItem('logedUser'));

        return localStorage.getItem('logedUser') !== null && getLogged && getLogged.adminUser
    },
    
    logout : () => {
        localStorage.removeItem('logedUser')
    }
}

export default service;
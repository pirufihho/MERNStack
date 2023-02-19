

const service = {
    
    login : (userName, password) => {
        return new Promise((resolve, reject) => {
            fetch('/api/users/login/'+userName+'/'+password)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.loggedIn){
                    localStorage.setItem('logedUser', JSON.stringify({loggedIn:data.loggedIn,
                        adminUser:data.adminUser,
                        userId:data.userId,
                        userName:userName,
                        jwt: data.jwt
                    }))
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

    getUserId : () => {
        var getLogged = JSON.parse(localStorage.getItem('logedUser'));

        return getLogged.userId;
    },

    getUserName : () => {
        var getLogged = JSON.parse(localStorage.getItem('logedUser'));

        return getLogged && getLogged.userName ? getLogged.userName : "";
    },
    
    logout : () => {
        localStorage.removeItem('logedUser')
    },

    getJWT : () => {
        var getLogged = JSON.parse(localStorage.getItem('logedUser'));

        if(getLogged && getLogged.jwt){
            return getLogged.jwt
        } 

        return null
    }
}

export default service;


const service = {
    
    login : (userName, password) => {
        return new Promise((resolve, reject) => {
            fetch('/api/users/login/'+userName+'/'+password)
            .then(res => res.json())
            .then(data =>{
                if(data.loggedIn){
                    localStorage.setItem('logedUser', JSON.stringify(data.loggedIn))
                } else{
                    localStorage.removeItem('logedUser')
                }
                
                resolve(data);
            })
          });
    },

    isUserLoged : () => {
        var getLogged = localStorage.getItem('logedUser');
        return localStorage.getItem('logedUser') !== null && localStorage.getItem('logedUser')
    },
    
    logout : () => {
        localStorage.removeItem('logedUser')
    },
}

export default service;
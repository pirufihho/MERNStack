

const service = {
    
    login : (userName, password) => {
        return new Promise((resolve, reject) => {
            fetch('/api/users/login/'+userName+'/'+password)
            .then(res => res.json())
            .then(data =>{
                resolve(data);
            })
          });
    }
    
}

export default service;
const serverURI = 'http://10.0.0.116:8080'

export const registerReq = async (form) => {
    try {
        fetch(`${serverURI}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStatus) {
                if(data.message) throw new Error(data.message);
                if(data.messages) throw new Error(data.messages);
            }
            if(data.user) localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = `${serverURI}/validation`;
        })
        .catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
}



export const loginReq = async (form) => {
    try {
        fetch(`${serverURI}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStatus) {
                if(data.message) throw new Error(data.message);
                if(data.messages) throw new Error(data.messages);
            }
            if(data.user) localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = `${serverURI}/feed`;
        })
        .catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
}


export const logoutReq = async (form) => {
    try {
        fetch(`${serverURI}/api/logout`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStatus) {
                if(data.message) throw new Error(data.message);
                if(data.messages) throw new Error(data.messages);
            }
            if(data.user) localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = `${serverURI}/feed`;
        })
        .catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
}

export const emailValidationRequest = async (code) => {
    try {
        fetch(`${serverURI}/api/validate-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code}),
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStatus) {
                if(data.message) throw new Error(data.message);
                if(data.messages) throw new Error(data.messages);
            }
            window.location.href = `${serverURI}/feed`;
        })
        .catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
}
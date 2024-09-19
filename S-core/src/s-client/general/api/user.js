const serverURI = 'http://10.0.0.116:8080'

export const updateProfile = async form => {
    console.log(form)
    try {
        fetch(`${serverURI}/user/profile`, {
            method: 'PUT',
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStatus) {
                if(data.message) throw new Error(data.message);
                if(data.messages) throw new Error(data.messages);
            }
            if(data.updatedProfileData) {
                const userData = JSON.parse(localStorage.getItem('user'));
                const newData = {...userData, ...data.updatedProfileData}
                localStorage.setItem('user', JSON.stringify(newData));
                location.reload();
            }
        })
        .catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
}

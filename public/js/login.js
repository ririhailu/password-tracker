const login = document.querySelector('.loginForm');
console.log(login);
login.addEventListener('submit', loginFormHandler);

async function loginFormHandler(event){
    event.preventDefault();

    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    

    if (userName && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Invalid Login Credentials");
        }
    }
};

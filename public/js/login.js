document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);

const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('');
        } else {
            alert('Invalid Login Information!');
        }
    }
};

//TODO: Handle signup form logic

//TODO: 

//TODO:

//TODO:

//TODO:



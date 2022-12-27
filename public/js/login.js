document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);

    document
    .querySelector('.signUpForm')
    .addEventListener('submit', loginFormHandler);

const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Invalid Login Information!');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Invalid field input. Please try again.');
        }
    }
};
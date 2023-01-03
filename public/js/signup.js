const signup = document.querySelector('.signUpForm');
signup.addEventListener('submit', signupFormHandler);

async function signupFormHandler(event){
    event.preventDefault();

    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (userName && password) {
        const response = await fetch('/createuser', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Invalid field input. Please try again.');
        }
    }
};
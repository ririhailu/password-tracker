const addPass = document.querySelector('.newPasswordForm');
console.log(addPass);
addPass.addEventListener('submit', createPassword);

async function createPassword(event) {
    event.preventDefault();

    const title = document.querySelector('#website').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/dashboard/new', {
            method: 'POST',
            body: JSON.stringify({ title, username, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log('Invalid Password Information!');
        }
    }
};
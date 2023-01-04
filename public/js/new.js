// const crypto = require('crypto');

const addPass = document.querySelector('.newPasswordForm');
console.log(addPass);
addPass.addEventListener('submit', createPassword);

async function createPassword(event) {
    event.preventDefault();

    const title = document.querySelector('#website').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const initVector = "test"
    const securityKey = "test"
    const user_id = 1;

    // const algorithm = "aes-256-cbc";

    // // generate 16 bytes of random data
    // const initVector = crypto.randomBytes(16);

    // // protected data
    // const password = document.querySelector('#password').value.trim();

    // // secret key generate 32 bytes of random data
    // const securityKey = crypto.randomBytes(32);

    // // the cipher function
    // const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);

    // // encrypt the message
    // // input encoding
    // // output encoding
    // let encryptedPassword = cipher.update(password, "utf-8", "hex");

    // encryptedPassword += cipher.final("hex");

    // console.log("Encrypted message: " + encryptedPassword);

    // the decipher function
    // const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);

    // let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf-8");

    // decryptedPassword += decipher.final("utf8");

    // console.log("Decrypted message: " + decryptedPassword);

    if (username && password) {
        const response = await fetch('/dashboard/new', {
            method: 'POST',
            body: JSON.stringify({ title, username, password, initVector, securityKey, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log('Invalid Password Information!');
        }
    }
};
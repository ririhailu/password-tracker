const logoutBtn = document.querySelector('#logout');

// const logout = async () => {
//     console.log("hit");
//     const response = await fetch('/api/users/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.replace('/');
//     } else {
//         alert('Logout Failed.')
//     }
// };

logoutBtn.addEventListener('click', logout);

async function logout(){
    console.log("hit");
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Logout Failed.')
    }
};
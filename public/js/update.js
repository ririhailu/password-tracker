const updateBtn = document.querySelector('#update');

async function updatePassword(event) {
    event.preventDefault();
    console.log('update');
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const title = document.querySelector('#title').value.trim();
    
    if (event.target.hasAttribute('data-id')) {
     const id = event.target.getAttribute('data-id');
 
     const response = await fetch(`/api/passwords/${id}`, {
         method: 'UPDATE',
         body: JSON.stringify({ username, password, title }),
         headers: { 'Content-Type': 'application/json'},
     });
 
     if (response.ok) {
         document.location.replace('/');
     } else {
         alert('Failed to update password');
     }
    }
 };
 
 
updateBtn.addEventListener('submit', updatePassword)

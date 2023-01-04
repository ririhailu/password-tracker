const updateBtn = document.querySelector('#Update');
const deleteBtn = document.querySelector('#Delete');
const copyBtn = document.querySelector('#Copy');
updateBtn.addEventListener('click', updatePassword);
deleteBtn.addEventListener('click', deletePassword);
copyBtn.addEventListener('click', copyPassword);

async function updatePassword(event) {
   
};

async function deletePassword(event) {
    if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/passwords/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('profile');
    } else {
        alert('Failed to delete project');
    }
   }
};

async function copyPassword() {

}
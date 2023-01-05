// const updateBtn = document.querySelectorAll('.Update');
const deleteBtn = document.querySelectorAll('.delete');
const copyBtn = document.querySelectorAll('.Copy');
// updateBtn.addEventListener('click', updatePassword);

// async function updatePassword(event) {
   
// };

async function deletePassword(event) {
    console.log('delete');
    
    if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/passwords/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete project');
    }
   }
};

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', deletePassword)
}

async function copyPassword() {
    console.log("hit");
    const copyText = document.getElementById('password');

    navigator.clipboard.writeText(copyText).then(function() {
        alert('Copying to clipboard was successful!');
      }, function(err) {
        alert('Could not copy text. ', err);
      });

};

for (let y = 0; y < copyBtn.length; y++) {
    copyBtn[y].addEventListener('click', copyPassword)
}

const deleteBtn = document.querySelectorAll('.delete');
const copyBtn = document.querySelectorAll('.Copy');

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
            alert('Failed to delete password');
        }
    }
};

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', deletePassword)
}

async function copyPassword(event) {
    console.log("copy");

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/dashboard/copy/${id}`).then((response) => {
            response.json().then((data => {
                navigator.clipboard.writeText(data).then(function () {
                    alert('Copying to clipboard was successful!');
                }, function (err) {
                    alert('Could not copy text. ', err);
                });
            }))
        })
    }
};

for (let y = 0; y < copyBtn.length; y++) {
    copyBtn[y].addEventListener('click', copyPassword)
}
let selectedUsers = null;

async function fetchUsers() {
    const response = await fetch('http://localhost:3000/api/users');
    const users = await response.json();
    displayUsers(users);
}

function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        userList.innerHTML +=
            `<tr>
        <td>${user.id} </td>
        <td>${user.name} </td>
        <td>${user.email} </td>
        <td>${user.phone} </td>
        <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
        </tr>
        `;
    });
}


async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
    });

    fetchUsers();
}


async function deleteUser(id) {
    await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
    })
    fetchUsers();
}


async function editUser(id) {
    selectedUsers = id;
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;

    document.querySelector('button[onclick="createUser()"]').style.display = 'none';
    document.querySelector('button[onclick="updateUser()"]').style.display = 'inline';
}

async function updateUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value; 

    await fetch(`http://localhost:3000/api/users/${selectedUsers}` , {
        method:'PUT',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
    })
    alert(' user updated')
    fetchUsers();
}



fetchUsers();
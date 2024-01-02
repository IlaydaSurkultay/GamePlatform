let users = [];

async function fetchUsers() {
    const response = await fetch('users.json');
    users = await response.json();
}

fetchUsers();

function login() {
    const username = document.getElementById("username").value;
    const userType = document.getElementById("userType").value;

    const userExists = users.find(user => user.userName === username && user.userType === userType);

    if (userExists) {
        alert("Login successful!");
        window.location.href = '/GameCatalog/main.html';
    } else {
        alert("User not found. Please sign up.");
    }
}

function signup() {
    const newUsername = document.getElementById("newUsername").value;
    const newUserType = document.getElementById("newUserType").value;

    const userExists = users.find(user => user.userName === newUsername);

    if (userExists) {
        alert("User already exists. Please log in.");
    } else {
        const newUser = { userName: newUsername, userType: newUserType };
        users.push(newUser);

        updateUsersFile();

        alert("Signup successful! Please log in.");
    }
}

async function updateUsersFile() {
    try {
        const response = await fetch('users.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem updating the users file:', error);
    }
}

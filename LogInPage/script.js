// Load users from JSON file
let users = [];

// Function to fetch users from JSON file
async function fetchUsers() {
    const response = await fetch('users.json');
    users = await response.json();
}

// Call the fetchUsers function to load users when the script starts
fetchUsers();

// Function to handle user login
function login() {
    const username = document.getElementById("username").value;
    const userType = document.getElementById("userType").value;

    // Check if the user exists in the users array
    const userExists = users.find(user => user.userName === username && user.userType === userType);

    if (userExists) {
        alert("Login successful!");
        window.location.href = '/GameCatalog/main.html';
    } else {
        alert("User not found. Please sign up.");
    }
}

// Function to handle user signup
function signup() {
    const newUsername = document.getElementById("newUsername").value;
    const newUserType = document.getElementById("newUserType").value;

    // Check if the user already exists
    const userExists = users.find(user => user.userName === newUsername);

    if (userExists) {
        alert("User already exists. Please log in.");
    } else {
        // Add the new user to the users array and update the JSON file
        const newUser = { userName: newUsername, userType: newUserType };
        users.push(newUser);

        // Update the JSON file with the new user
        updateUsersFile();

        alert("Signup successful! Please log in.");
    }
}

// Function to update the users.json file with the updated users array
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

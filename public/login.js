function validateForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const terms = document.getElementById("terms").checked;
    
    if (!firstName || !lastName || !email || !password || !terms) {
        alert("All fields must be filled and you must agree to the terms.");
        return false;
    }

  
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name, last_name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Use the redirectUrl from the response to redirect the user
            window.location.href = data.redirectUrl;
        } else {
            const errorMessage = await response.text();
            alert('Error: ' + errorMessage);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
});

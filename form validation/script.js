const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateinputs();
});

const seterror = (element, message) => {
    const inputcontrol = element.parentElement;
    const errordisplay = inputcontrol.querySelector('.error');

    errordisplay.innerText = message;
    inputcontrol.classList.add('error');
    inputcontrol.classList.remove('success');
}

const setsuccess = (element) => {
    const inputcontrol = element.parentElement;
    const errordisplay = inputcontrol.querySelector('.error');

    errordisplay.innerText = '';
    inputcontrol.classList.add('success');
    inputcontrol.classList.remove('error');
};

const isvalidemail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateinputs = () => {
    const usernamevalue = username.value.trim();
    const emailvalue = email.value.trim();
    const passwordvalue = password.value.trim();
    const password2value = password2.value.trim();

    if (usernamevalue === '') {
        seterror(username, 'Username is required');
    } else if (usernamevalue.length < 2) {
        seterror(username, 'Username must be at least 2 characters'); 
    } else {
        setsuccess(username);
    }

    if (emailvalue === '') {
        seterror(email, 'Email is required');
    } else if (!isvalidemail(emailvalue)) {
        seterror(email, 'Provide a valid email address');
    } else {
        setsuccess(email);
    }

    if (passwordvalue === '') {
        seterror(password, 'Password is required');
    } else if (passwordvalue.length < 8) {
        seterror(password, 'Password must be at least 8 characters');
    } else {
        setsuccess(password);
    }

    if (password2value === '') {
        seterror(password2, 'Please confirm your password');
    } else if (password2value !== passwordvalue) {
        seterror(password2, "Passwords doesn't match");
    } else {
        setsuccess(password2);
    }


};
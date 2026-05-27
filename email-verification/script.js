document.addEventListener('DOMContentLoaded', () => {
    const emailStep = document.getElementById('emailStep');
    const otpStep = document.getElementById('otpStep');
    const successStep = document.getElementById('successStep');
    
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const displayEmail = document.getElementById('displayEmail');
    
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verifyBtn');
    
    let generatedOTP = "123456"; // In a real app, this comes from the backend

    // 1. Email Format Validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // 2. Handle "Send Code"
    sendCodeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            emailError.style.display = 'none';
            displayEmail.innerText = email;
            
            // Transition to OTP step
            emailStep.classList.add('hidden');
            otpStep.classList.remove('hidden');
            
            // Focus first OTP input
            otpInputs[0].focus();
            console.log(`Verification code sent to ${email}. Mock OTP is ${generatedOTP}`);
        } else {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#ef4444';
        }
    });

    // 3. OTP Input Logic (Auto-focus next & Backspace)
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // 4. Verify OTP
    verifyBtn.addEventListener('click', () => {
        let enteredOTP = "";
        otpInputs.forEach(input => enteredOTP += input.value);

        if (enteredOTP === generatedOTP) {
            otpStep.classList.add('hidden');
            successStep.classList.remove('hidden');
        } else {
            alert("Invalid code. Please try again (Hint: 123456)");
            otpInputs.forEach(input => input.value = "");
            otpInputs[0].focus();
        }
    });
});

// Additional Security Measures to Deter Inspecting the Page
// 1. Fix the lowercase 'document' and add quotes around 'contextmenu'
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
});

// 2. The master keyboard blocker
document.addEventListener('keydown', (e) => {
    // Convert key to uppercase to catch both lowercase 'i' and uppercase 'I'
    const key = e.key.toUpperCase();

    if (
        // Block F12
        e.key === 'F12' ||
        // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
        // Block Ctrl+U (View Source) and Ctrl+S (Save Page)
        (e.ctrlKey && (key === 'U' || key === 'S'))
    ) {
        e.preventDefault();
        alert("Developer actions are restricted on this page.");
    }
});
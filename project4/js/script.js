const dateTime = document.getElementById("date-time");

function showDateTime() {
    if (dateTime) {
        const currentDate = new Date();
        dateTime.textContent = currentDate.toLocaleString();
    }
}

showDateTime();
setInterval(showDateTime, 1000);

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (event) {
        let formIsValid = true;
        let firstInvalidField = null;

        nameError.textContent = "";
        emailError.textContent = "";
        formStatus.textContent = "";

        if (fullName.value.trim() === "") {
            nameError.textContent = "Please enter your full name.";
            formIsValid = false;
            firstInvalidField = fullName;
        }

        if (email.value.trim() === "") {
            emailError.textContent = "Please enter your email address.";
            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField = email;
            }
        } else if (!email.checkValidity()) {
            emailError.textContent = "Please enter a valid email address.";
            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField = email;
            }
        }

        if (!formIsValid) {
            event.preventDefault();
            formStatus.textContent =
                "Please correct the highlighted fields before submitting.";

            firstInvalidField.focus();
        } else {
            formStatus.textContent =
                "Your email application is opening. Select Send to complete your inquiry.";
        }
    });

    fullName.addEventListener("input", function () {
        if (fullName.value.trim() !== "") {
            nameError.textContent = "";
        }
    });

    email.addEventListener("input", function () {
        if (email.checkValidity()) {
            emailError.textContent = "";
        }
    });
}
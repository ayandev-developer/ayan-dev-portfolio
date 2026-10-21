
const form = document.querySelector("#contact-form");

if (form) {
    emailjs.init({
        publicKey: "9OQHoxiqiAgzq6-Q7",
    });

    const status = document.querySelector("#form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const projectType = document.querySelector("#project-type");
    const nameInput = document.querySelector("#name");
    const clearSavedButton = document.querySelector("#clear-saved-details");

    // Restore saved name
    const savedName = localStorage.getItem("savedName");

    if (savedName !== null) {
        nameInput.value = savedName;
    }

    // Restore saved project type
    const savedProjectType = localStorage.getItem("savedProjectType");

    if (savedProjectType !== null) {
        projectType.value = savedProjectType;
    }

    // Save name while the user types
    nameInput.addEventListener("input", function () {
        localStorage.setItem("savedName", nameInput.value);
    });

    // Save selected project type
    projectType.addEventListener("change", function () {
        localStorage.setItem("savedProjectType", projectType.value);
    });

    // Clear saved details
    if (clearSavedButton) {
        clearSavedButton.addEventListener("click", function () {
            localStorage.removeItem("savedName");
            localStorage.removeItem("savedProjectType");

            nameInput.value = "";
            projectType.value = "";

            status.textContent = "Saved details cleared.";
        });
    }

    // Submit the contact form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        status.textContent = "Sending your enquiry...";
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        emailjs
            .sendForm("service_24b6c3i", "template_po9j4wx", form)
            .then(function () {
                status.textContent = "Enquiry sent successfully!";
                form.reset();

                submitButton.disabled = false;
                submitButton.textContent = "Send Enquiry";
            })
            .catch(function (error) {
                console.error("Email sending failed:", error);

                status.textContent =
                    "Sorry, your enquiry could not be sent. Please try again.";

                submitButton.disabled = false;
                submitButton.textContent = "Send Enquiry";
            });
    });
}


/* ========================================
   2. DARK / LIGHT THEME
======================================== */

const themeToggle = document.querySelector("#theme-toggle");

// Restore saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// Update the button label
function updateThemeButton() {
    if (!themeToggle) return;

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeToggle.textContent = "☀️ Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

updateThemeButton();

// Change theme when the button is clicked
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        updateThemeButton();
    });
}

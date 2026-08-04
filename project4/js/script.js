// ------------------------------------
// CURRENT DATE AND TIME
// ------------------------------------

const dateTime = document.getElementById("date-time");

function showDateTime() {
    if (dateTime) {
        const currentDate = new Date();
        dateTime.textContent = currentDate.toLocaleString();
    }
}

showDateTime();
setInterval(showDateTime, 1000);


// ------------------------------------
// CONTACT FORM VALIDATION
// ------------------------------------

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

        fullName.removeAttribute("aria-invalid");
        email.removeAttribute("aria-invalid");

        if (fullName.value.trim() === "") {
            nameError.textContent =
                "Please enter your full name.";

            fullName.setAttribute("aria-invalid", "true");

            formIsValid = false;
            firstInvalidField = fullName;
        }

        if (email.value.trim() === "") {
            emailError.textContent =
                "Please enter your email address.";

            email.setAttribute("aria-invalid", "true");

            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField = email;
            }
        } else if (!email.checkValidity()) {
            emailError.textContent =
                "Please enter a valid email address.";

            email.setAttribute("aria-invalid", "true");

            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField = email;
            }
        }

        if (!formIsValid) {
            event.preventDefault();

            formStatus.textContent =
                "Please correct the required fields before submitting.";

            firstInvalidField.focus();
        } else {
            formStatus.textContent =
                "Your email application is opening. Select Send to complete your inquiry.";
        }
    });

    fullName.addEventListener("input", function () {
        if (fullName.value.trim() !== "") {
            nameError.textContent = "";
            fullName.removeAttribute("aria-invalid");
        }
    });

    email.addEventListener("input", function () {
        if (email.checkValidity()) {
            emailError.textContent = "";
            email.removeAttribute("aria-invalid");
        }
    });
}


// ------------------------------------
// LOCAL WEBSITE SEARCH INFORMATION
// ------------------------------------

const websitePages = [
    {
        title: "Home",
        url: "index.html",
        description:
            "Virtual administrative assistance for entrepreneurs and small business owners.",
        keywords:
            "home virtual assistant administrative support email calendar documents customer follow-up"
    },

    {
        title: "About",
        url: "about.html",
        description:
            "Learn about Underground Virtual Support and its approach to helping business owners.",
        keywords:
            "about business mission virtual assistance organization productivity"
    },

    {
        title: "Services",
        url: "services.html",
        description:
            "Review available virtual administrative support services.",
        keywords:
            "services email organization calendar scheduling document preparation customer follow-up"
    },

    {
        title: "Service Details",
        url: "services-details.html",
        description:
            "Read detailed information about the administrative services offered.",
        keywords:
            "service details inbox email scheduling calendar documents customers support"
    },

    {
        title: "Gallery",
        url: "gallery.html",
        description:
            "View examples representing email, calendar, and document support.",
        keywords:
            "gallery images email calendar documents virtual assistant"
    },

    {
        title: "Resources",
        url: "resources.html",
        description:
            "Business organization and productivity resources for entrepreneurs.",
        keywords:
            "resources business organization productivity time management tools"
    },

    {
        title: "Frequently Asked Questions",
        url: "faq.html",
        description:
            "Find answers to common questions about virtual assistance and support services.",
        keywords:
            "faq frequently asked questions answers pricing communication availability services"
    },

    {
        title: "Contact",
        url: "contact.html",
        description:
            "Submit an inquiry about virtual administrative support.",
        keywords:
            "contact inquiry form name email service request support"
    },

    {
        title: "Testimonials",
        url: "testimonials.html",
        description:
            "Read examples showing how virtual support may help business owners.",
        keywords:
            "testimonials reviews clients business owners virtual support"
    },

    {
        title: "Privacy Policy",
        url: "privacy-policy.html",
        description:
            "Review information about privacy, personal information, cookies, and third-party services.",
        keywords:
            "privacy policy personal information data cookies third parties"
    }
];


// ------------------------------------
// DISPLAY LOCAL SEARCH RESULTS
// ------------------------------------

const searchResults = document.getElementById("search-results");
const searchSummary = document.getElementById("search-summary");

if (searchResults && searchSummary) {
    const searchParameters =
        new URLSearchParams(window.location.search);

    const searchQuery = searchParameters.get("q");

    const searchInput =
        document.getElementById("site-search");

    if (searchQuery && searchQuery.trim() !== "") {
        const originalQuery = searchQuery.trim();
        const cleanedQuery = originalQuery.toLowerCase();

        if (searchInput) {
            searchInput.value = originalQuery;
        }

        const searchWords = cleanedQuery.split(/\s+/);

        const matchingPages = websitePages.filter(
            function (page) {
                const searchableText = (
                    page.title +
                    " " +
                    page.description +
                    " " +
                    page.keywords
                ).toLowerCase();

                return searchWords.every(function (word) {
                    return searchableText.includes(word);
                });
            }
        );

        searchSummary.textContent =
            matchingPages.length +
            " result(s) found for \"" +
            originalQuery +
            "\".";

        if (matchingPages.length === 0) {
            const noResultsMessage =
                document.createElement("p");

            noResultsMessage.textContent =
                "No matching pages were found. Try a different word or phrase.";

            searchResults.appendChild(noResultsMessage);
        } else {
            matchingPages.forEach(function (page) {
                const resultCard =
                    document.createElement("article");

                resultCard.classList.add(
                    "search-result-card"
                );

                const resultHeading =
                    document.createElement("h2");

                const resultLink =
                    document.createElement("a");

                resultLink.href = page.url;
                resultLink.textContent = page.title;

                const resultDescription =
                    document.createElement("p");

                resultDescription.textContent =
                    page.description;

                resultHeading.appendChild(resultLink);
                resultCard.appendChild(resultHeading);
                resultCard.appendChild(
                    resultDescription
                );

                searchResults.appendChild(resultCard);
            });
        }
    }
}
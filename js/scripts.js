document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const consent = form.querySelector('[name="consent"]');
        if (!consent.checked) {
            e.preventDefault();
            alert('Παρακαλώ συμφωνήστε με την Πολιτική Απορρήτου.');
        }
    });
});

// Language switcher functionality
document.addEventListener('DOMContentLoaded', function () {
    const languageSwitcher = document.getElementById('language-switcher');

    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function () {
            const lang = this.value;
            document.documentElement.lang = lang;

            const elements = document.querySelectorAll('[data-lang-el], [data-lang-en]');
            elements.forEach(el => {
                if (lang === 'el' && el.dataset.langEl) {
                    el.textContent = el.dataset.langEl;
                } else if (lang === 'en' && el.dataset.langEn) {
                    el.textContent = el.dataset.langEn;
                }
            });

            // Update service availability labels when language changes
            updateAvailabilityLabels(lang);

            // Save language preference
            localStorage.setItem('preferred-language', lang);
        });

        // Set initial language from localStorage or default to Greek
        const savedLang = localStorage.getItem('preferred-language') || 'el';
        languageSwitcher.value = savedLang;

        // Trigger change event to apply saved language
        const event = new Event('change');
        languageSwitcher.dispatchEvent(event);
    }
});

// Function to update availability labels based on language
function updateAvailabilityLabels(lang) {
    const availabilityElements = document.querySelectorAll('[id^="availability-"]');
    availabilityElements.forEach(el => {
        const textEl = el.querySelector('span');
        if (!textEl) return;

        if (textEl.classList.contains('text-green-600')) {
            const region = textEl.textContent.split(':')[1].trim();
            textEl.textContent = lang === 'el' ?
                `✓ Διαθέσιμο στην περιοχή: ${region}` :
                `✓ Available in: ${region}`;
        } else if (textEl.classList.contains('text-red-600')) {
            textEl.textContent = lang === 'el' ?
                '✗ Μη διαθέσιμο προσωρινά' :
                '✗ Temporarily unavailable';
        }
    });
}

// Price validation for booking form
const priceInput = document.querySelector('input[name="price"]');
if (priceInput) {
    priceInput.addEventListener('change', function () {
        const minPrice = parseInt(this.getAttribute('min') || 10);
        if (parseInt(this.value) < minPrice) {
            const lang = document.documentElement.lang || 'el';
            const alertMessage = lang === 'el' ?
                `Η ελάχιστη τιμή είναι ${minPrice}€` :
                `The minimum price is €${minPrice}`;

            alert(alertMessage);
            this.value = minPrice;
        }
    });
}

// Service selection changes minimum price
const serviceSelect = document.querySelector('select[name="service"]');
if (serviceSelect && priceInput) {
    const servicePrices = {
        'cleaning': 30,
        'plumbing': 50,
        'electrical': 45,
        'gardening': 35,
        'painting': 40,
        'moving': 60,
        'pestcontrol': 55
    };

    serviceSelect.addEventListener('change', function () {
        const minPrice = servicePrices[this.value] || 10;
        priceInput.setAttribute('min', minPrice);

        const lang = document.documentElement.lang || 'el';
        if (lang === 'el') {
            priceInput.setAttribute('placeholder', `Ελάχιστη τιμή: ${minPrice}€`);
        } else {
            priceInput.setAttribute('placeholder', `Minimum price: €${minPrice}`);
        }
    });

    // Set initial price based on default selection
    const initialService = serviceSelect.value;
    const initialPrice = servicePrices[initialService] || 10;
    priceInput.setAttribute('min', initialPrice);
    priceInput.setAttribute('placeholder', `Ελάχιστη τιμή: ${initialPrice}€`);
}

// Toggle professional fields in registration form
const registrationTypeInputs = document.querySelectorAll('input[name="registration_type"]');
const professionalFields = document.getElementById('professional-fields');

if (registrationTypeInputs.length > 0 && professionalFields) {
    function toggleProfessionalFields() {
        const isProf = document.querySelector('input[name="registration_type"]:checked').value === 'professional';
        professionalFields.style.display = isProf ? 'block' : 'none';

        // Make fields required or not based on selection
        const fields = professionalFields.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.required = isProf;
        });
    }

    // Set initial state
    toggleProfessionalFields();

    // Update when selection changes
    registrationTypeInputs.forEach(input => {
        input.addEventListener('change', toggleProfessionalFields);
    });
}

// Cookie Notice
document.addEventListener('DOMContentLoaded', function () {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookie-notice-accepted')) {
        // Create cookie notice element
        const cookieNotice = document.createElement('div');
        cookieNotice.className = 'fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50';

        const container = document.createElement('div');
        container.className = 'container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between';

        const lang = document.documentElement.lang || 'el';
        const textContent = lang === 'el'
            ? 'Χρησιμοποιούμε μόνο απαραίτητα cookies για την επεξεργασία πληρωμών. Περισσότερες πληροφορίες στην <a href="/privacy.html" class="underline">Πολιτική Απορρήτου</a>.'
            : 'We use only essential cookies for payment processing. More information in our <a href="/privacy.html" class="underline">Privacy Policy</a>.';

        const text = document.createElement('p');
        text.className = 'mb-4 sm:mb-0';
        text.innerHTML = textContent;

        const acceptButton = document.createElement('button');
        acceptButton.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded';
        acceptButton.textContent = lang === 'el' ? 'Αποδοχή' : 'Accept';

        acceptButton.addEventListener('click', function () {
            localStorage.setItem('cookie-notice-accepted', 'true');
            cookieNotice.remove();
        });

        container.appendChild(text);
        container.appendChild(acceptButton);
        cookieNotice.appendChild(container);

        document.body.appendChild(cookieNotice);

        // Update text if language changes
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('change', function () {
                const currentLang = this.value;
                text.innerHTML = currentLang === 'el'
                    ? 'Χρησιμοποιούμε μόνο απαραίτητα cookies για την επεξεργασία πληρωμών. Περισσότερες πληροφορίες στην <a href="/privacy.html" class="underline">Πολιτική Απορρήτου</a>.'
                    : 'We use only essential cookies for payment processing. More information in our <a href="/privacy.html" class="underline">Privacy Policy</a>.';

                acceptButton.textContent = currentLang === 'el' ? 'Αποδοχή' : 'Accept';
            });
        }
    }
});
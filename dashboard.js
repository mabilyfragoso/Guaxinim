document.addEventListener('DOMContentLoaded', () => {

    // --- User Dropdown Menu Logic ---
    const userMenuButton = document.querySelector('.user-menu-button');
    const userMenuContainer = document.querySelector('.user-menu-container');

    if (userMenuButton && userMenuContainer) {
        userMenuButton.addEventListener('click', () => {
            userMenuContainer.classList.toggle('active');
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!userMenuContainer.contains(event.target) && !userMenuButton.contains(event.target)) {
                userMenuContainer.classList.remove('active');
            }
        });
    }

    // --- Sidebar Navigation Logic ---
    const menuItems = document.querySelectorAll('.sidebar .menu-item');
    const contentSections = document.querySelectorAll('.content section');

    function showSection(targetId) {
        // Hide all sections first
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none'; // Ensure display is none for hidden ones
        });

        // Show the targeted section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block'; // Make it block before adding active
            setTimeout(() => { // Small delay for opacity transition
                targetSection.classList.add('active');
            }, 10);
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));

            // Add 'active' class to the clicked menu item
            item.classList.add('active');

            // Get the target section ID from data-target attribute
            const targetId = item.dataset.target;
            showSection(targetId);
        });
    });

    // Initialize: show the 'cards' section by default on load
    const initialMenuItem = document.querySelector('.sidebar .menu-item[data-target="cards"]');
    if (initialMenuItem) {
        initialMenuItem.classList.add('active');
        showSection('cards');
    }

    // --- Cards Section Management (Displaying/Hiding Forms) ---
    const addCardBtn = document.getElementById('add-card-btn');
    const backToCardsBtn = document.getElementById('back-to-cards');
    const cardDetailsView = document.getElementById('card-details-view');
    const newCardForm = document.getElementById('new-card-form');

    if (addCardBtn && backToCardsBtn && cardDetailsView && newCardForm) {
        addCardBtn.addEventListener('click', () => {
            cardDetailsView.style.display = 'none';
            newCardForm.style.display = 'block';
        });

        backToCardsBtn.addEventListener('click', () => {
            newCardForm.style.display = 'none';
            cardDetailsView.style.display = 'block';
        });

        // --- Card Input Masking ---
        const cardNumberInput = document.getElementById('card-info');
        const cardExpirationInput = document.getElementById('expiration');
        const cardCpfInput = document.querySelector('.new-card-form #cpf'); // Specific CPF for card form

        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (event) => {
                let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
                value = value.substring(0, 16); // Max 16 digits
                value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space every 4 digits
                event.target.value = value;
            });
        }

        if (cardExpirationInput) {
            cardExpirationInput.addEventListener('input', (event) => {
                let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                event.target.value = value;
            });
        }

        if (cardCpfInput) {
            cardCpfInput.addEventListener('input', (event) => {
                let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
                }
                event.target.value = value;
            });
        }
    }


    // --- Form Edit/Save Logic (for Personal Data & Address) ---
    function setupFormEdit(sectionId, editButtonId, cancelButtonClass) {
        const section = document.getElementById(sectionId);
        const editButton = document.getElementById(editButtonId);
        const cancelButton = section ? section.querySelector(`.${cancelButtonClass}`) : null;
        const formInputs = section ? section.querySelectorAll('input, select') : [];

        let isEditing = false; // Track current state

        if (editButton) {
            editButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent form submission

                if (!isEditing) {
                    // Enter Edit Mode
                    formInputs.forEach(input => {
                        input.readOnly = false;
                        input.disabled = false; // For selects
                        if (input.tagName === 'SELECT' && input.id === 'UF') {
                            // Ensure the specific UF select in the personal data form is enabled for editing
                            input.style.color = ''; // Remove hardcoded color
                        }
                    });
                    editButton.textContent = 'Salvar';
                    editButton.classList.add('save-mode');
                    if (cancelButton) {
                        cancelButton.style.display = 'inline-block'; // Show cancel button
                    }
                } else {
                    // Exit Edit Mode (Save)
                    // Here you would typically send data to a server
                    alert(`Dados de ${sectionId.replace('-', ' ')} salvos! (Funcionalidade de backend não implementada)`);

                    formInputs.forEach(input => {
                        input.readOnly = true;
                        input.disabled = true; // For selects
                        if (input.tagName === 'SELECT' && input.id === 'UF') {
                            input.style.color = '#939495'; // Reapply color for disabled state
                        }
                    });
                    editButton.textContent = 'Editar';
                    editButton.classList.remove('save-mode');
                    if (cancelButton) {
                        cancelButton.style.display = 'none'; // Hide cancel button
                    }
                }
                isEditing = !isEditing; // Toggle state
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent form submission
                // Exit Edit Mode (Cancel) - Revert values if needed, for simplicity we just revert state
                alert('Edição cancelada.');
                formInputs.forEach(input => {
                    input.readOnly = true;
                    input.disabled = true;
                    if (input.tagName === 'SELECT' && input.id === 'UF') {
                        input.style.color = '#939495';
                    }
                    // Optional: Revert input values to original state (requires storing initial values)
                });
                editButton.textContent = 'Editar';
                editButton.classList.remove('save-mode');
                cancelButton.style.display = 'none';
                isEditing = false;
            });
        }
    }

    // Setup Personal Data form edit
    setupFormEdit('personal-data', 'data-edit-button', 'cancel-button');

    // Setup Address form edit
    setupFormEdit('adress', 'adress-save-button', 'cancel-button');

    // --- CEP input mask for the Address section's CEP field
    const addressCepInput = document.querySelector('#adress #cep');
    if (addressCepInput) {
        addressCepInput.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            event.target.value = value;
        });
    }

});
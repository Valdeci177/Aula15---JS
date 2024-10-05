document.addEventListener("DOMContentLoaded", () => {
    const contactsList = document.getElementById("contacts-list");
    const addContactForm = document.getElementById("add-contact-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    let contacts = [];

    // Função para adicionar contato
    function addContact(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !phone || !email) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const newContact = {
            id: Date.now(),
            name: name,
            phone: phone,
            email: email,
        };

        contacts.push(newContact);
        updateContactsList();
        addContactForm.reset();
    }

    // Função para editar contato
    function editContact(id) {
        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            nameInput.value = contact.name;
            phoneInput.value = contact.phone;
            emailInput.value = contact.email;

            // Atualizar o botão do formulário para "Atualizar"
            addContactForm.querySelector("button").textContent = "Atualizar Contato";

            // Remover o contato antigo após editar
            contacts = contacts.filter(contact => contact.id !== id);
            updateContactsList();
        }
    }

    // Função para excluir contato
    function deleteContact(id) {
        contacts = contacts.filter(contact => contact.id !== id);
        updateContactsList();
    }

    // Função para exibir os contatos na lista
    function updateContactsList() {
        contactsList.innerHTML = "";
        contacts.forEach(contact => {
            const contactItem = document.createElement("li");
            contactItem.className = "contact-item";

            contactItem.innerHTML = `
                <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
                <div>
                    <button class="edit" onclick="editContact(${contact.id})">Editar</button>
                    <button class="delete" onclick="deleteContact(${contact.id})">Excluir</button>
                </div>
            `;

            contactsList.appendChild(contactItem);
        });
    }

    // Adicionar contato ao formulário
    addContactForm.addEventListener("submit", addContact);

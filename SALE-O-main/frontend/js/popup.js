
document.querySelector(".selling").addEventListener("click", function() {
  document.querySelector(".popup-selling").classList.add("active");
});
document.querySelector(".popup-selling .close-btn").addEventListener("click", function() {
 document.querySelector(".popup-selling").classList.remove("active");
});

const deleteButton = document.getElementById('deleteButton');
const confirmationPopup = document.getElementById('confirmationPopup');
const confirmDeleteButton = document.getElementById('confirmDelete');
const cancelDeleteButton = document.getElementById('cancelDelete');

deleteButton.addEventListener('click', () => {
confirmationPopup.style.display = 'block';
});

// confirmDeleteButton.addEventListener('click', () => {
// // Perform the delete action here
// // You can add your own logic for deleting the product

// confirmationPopup.style.display = 'none';
// });

cancelDeleteButton.addEventListener('click', () => {
confirmationPopup.style.display = 'none';
});

//edit
// Function to populate the data-container div with data
function populateDataContent() {
  const content = document.getElementById('data-content');
  let markup = '';

  data.forEach(item => {
      markup += generateDataMarkup(item);
  });

  content.innerHTML = markup;
}

// Function to open the edit form
function openEditForm(fieldTitle, fieldValue) {
  const overlay = document.getElementById('overlay');
  const editForm = document.getElementById('edit-form');
  const fieldTitleElement = document.getElementById('edit-field-title');
  const fieldInputElement = document.getElementById('edit-field-input');

  fieldTitleElement.textContent = fieldTitle;
  fieldInputElement.value = fieldValue;

  overlay.style.display = 'flex';
  editForm.style.display = 'block';
}

// Function to close the edit form
function closeEditForm() {
  const overlay = document.getElementById('overlay');
  const editForm = document.getElementById('edit-form');

  overlay.style.display = 'none';
  editForm.style.display = 'none';
}

// Function to save the edited data


// Call the function to populate data when the page loads
window.addEventListener('DOMContentLoaded', populateDataContent);

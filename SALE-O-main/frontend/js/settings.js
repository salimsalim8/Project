// Get the tabs and tab content elements
const tabs = document.querySelectorAll('.tabs h3');
const tabContent = document.querySelectorAll('.tab-content > div');

// Add click event listeners to the tabs
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs and tab content
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContent.forEach(content => content.classList.remove('active'));

    // Add 'active' class to the clicked tab and corresponding tab content
    tab.classList.add('active');
    tabContent[index].classList.add('active');

    // Reset the edit error messages for the active tab
    const activeTabContent = tabContent[index];
    const editErrors = activeTabContent.querySelectorAll(".edit-error")
    editErrors.forEach(error => {
      error.textContent = '';
    });
  });
});

const searchInput = document.querySelector('#search-bar');
const tableRows = document.querySelectorAll('table tbody tr');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Function to filter table rows based on search input
const filterTableRows = () => {
  const searchTerm = searchInput.value.toLowerCase();
  tableRows.forEach((row) => {
    const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const username = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    if (name.includes(searchTerm) || username.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};

// Add event listener to search input
searchInput.addEventListener('input', filterTableRows);

// Function to create table rows from API data
const createTableRows = (data) => {
  const tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';
  data.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Fetch API data and create table rows
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => createTableRows(data))
  .catch((error) => console.error(error));

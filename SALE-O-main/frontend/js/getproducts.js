// Retrieve products and update the table
async function retrieveProducts() {
  const token = localStorage.getItem('access-token');
  try {
     const response = await fetch('https://saleo.scratch.co.tz/api/products?limit=20', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
      },
    });
    const res = await response.json();
    if (res.error != null) {
      console.log(res.error)
    }
    displayProducts(res)
    
  } catch (error) {
    console.error('Error retrieving user products:', error.message);
  }
}

// Function to display products in the table
function displayProducts(products) {
  const tableBody = document.querySelector('.table tbody');
  tableBody.innerHTML = ''; // Clear the existing table rows

  if (!Array.isArray(products.data)) {
    console.error('Invalid product data');
    return;
  }

  if (products.data.length === 0) {
    console.log('No products found');
    return;
  }

  products.data.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.batch_no}</td>
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.buying_price}</td>
      <td>${product.selling_price}</td>
      <td>${product.remaining_products}</td>
      <td>${product.sold}</td>
      <td>${product.current_sales}</td>
      <td>${trimDateTime(product.created_at)}</td>
    `;

    row.addEventListener('click', () => {
      redirectToProductPage(product.id);
    });

    tableBody.appendChild(row); // Add the row to the table
  });
}

// Function to redirect to the individual product page
// Function to redirect to the individual product page
function redirectToProductPage(productId) {
  const productPageUrl = `http://127.0.0.1:5500/frontend/html/infoproduct.html?id=${productId}`;

  // Redirect to the product page
  window.location.href = productPageUrl;
}



function trimDateTime(dateTimeString) {

  var dateObj = new Date(dateTimeString);
  var year = dateObj.getFullYear();
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);

  var hours = ("0" + dateObj.getHours()).slice(-2);
  var minutes = ("0" + dateObj.getMinutes()).slice(-2);
  var seconds = ("0" + dateObj.getSeconds()).slice(-2);

  var trimmedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return trimmedDateTime;
}



// Call the function to retrieve and display products
retrieveProducts();

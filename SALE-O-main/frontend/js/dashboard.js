const token = localStorage.getItem("access-token");

async function GetSummary() {
  const totalSoldProducts = document.getElementById("total-sold-products");
  const totalSales = document.getElementById("total-sales");

  const URL = "https://saleo.scratch.co.tz/api/product/summary";

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    });
    const res = await response.json();
    if (res.error != null) {
      console.log(res.error);
      return;
    }
    totalSoldProducts.textContent = res.data.total_products;
    totalSales.textContent = res.data.total_sales;
  } catch (e) {
    console.error(e);
  }
}

async function GetRemainingProducts() {
  const totalRemainingProducts = document.getElementById("total-remaining-products");
  const URL = "https://saleo.scratch.co.tz/api/remaining/products";

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    });
    const res = await response.json();
    if (res.error != null) {
      console.log(res.error);
      return;
    }
    totalRemainingProducts.textContent = res.data;
  } catch (e) {
    console.error(e);
  }
}

async function GetProducts() {
  try {
    const response = await fetch("https://saleo.scratch.co.tz/api/products?limit=4", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    });
    const res = await response.json();
    if (res.error != null) {
      console.log(res.error);
    }
    displayProducts(res);
  } catch (error) {
    console.error("Error retrieving user products:", error.message);
  }
}

async function GetSales() {
  try {
    const response = await fetch("https://saleo.scratch.co.tz/api/sales?limit=3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    });
    const res = await response.json();
    if (res.error != null) {
      console.log(res.error);
    }
    displaySales(res);
  } catch (error) {
    console.error("Error retrieving sales:", error.message);
  }
}

// Function to display sales in the table
function displaySales(sales) {
  const tableBody = document.querySelector('.sales .table tbody');
  tableBody.innerHTML = ''; // Clear the existing table rows

  if (!Array.isArray(sales.data)) {
    console.error('Invalid sales data');
    return;
  }

  if (sales.data.length === 0) {
    console.log('No sales found');
    return;
  }

  sales.data.forEach((sale) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sale.product_name}</td>
      <td>${sale.quantity}</td>
      <td>${sale.selling_price}</td>
      <td>${trimDateTime(sale.created_at)}</td>
    `;

    tableBody.appendChild(row); // Add the row to the table
  });
}

function displayProducts(products) {
  const tableBody = document.querySelector('.product-list .table tbody');
  tableBody.innerHTML = ''; // Clear the existing table rows

  if (products.data.length === 0) {
    console.log('No products found');
    return;
  }

  products.data.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.selling_price}</td>
      <td>${product.status}</td>
    `;

    tableBody.appendChild(row); // Add the row to the table
  });
}

function checkToken() {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) {
    window.location.href = "../html/index.html";
  }
}

function trimDateTime(dateTime) {
  return dateTime.split("T")[0];
}

checkToken();

GetProducts();
GetRemainingProducts();
GetSummary();
GetSales();

const token = localStorage.getItem('access-token');
async function GetSales() {
  try {
       const response = await fetch('https://saleo.scratch.co.tz/api/sales?limit=20', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
        },
      });
      const res = await response.json();
      if (res.error != null) {
        console.log(res.error)
        return
      }
      displayProducts(res)
      
    } catch (error) {
      console.error('Error retrieving user products:', error.message);
    }
  }
  
  // Function to display products in the table
  function displayProducts(sales) {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = ''; // Clear the existing table rows
  
    if (!Array.isArray(sales.data)) {
      console.error('Invalid sales data');
      return;
    }
  
    if (sales.data.length === 0) {
      console.log('No sales found');
      return;
    }
  
    sales.data.forEach((sales) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sales.product_name}</td>
        <td>${sales.quantity}</td>
        <td>${sales.selling_price}</td>
        <td>${trimDateTime(sales.created_at)}</td>
      `;
  
      tableBody.appendChild(row); // Add the row to the table
    });
  }
  
  
  function trimDateTime(dateTimeString) {
  
    let dateObj = new Date(dateTimeString);
    let year = dateObj.getFullYear();
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let day = ("0" + dateObj.getDate()).slice(-2);
  
    let hours = ("0" + dateObj.getHours()).slice(-2);
    let minutes = ("0" + dateObj.getMinutes()).slice(-2);
    let seconds = ("0" + dateObj.getSeconds()).slice(-2);
  
    let trimmedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return trimmedDateTime;
  }


 async function body (endURL) {
  const URL = 'https://saleo.scratch.co.tz/api/summary/weekly/'+endURL
   try{
     const response = await fetch(URL, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'access-token': token,
       },
     });
     const res = await response.json();
     if (res.error != null) {
       console.log(res.error);
       return
     }
     return res.data
   } catch (error) {
     console.error(error);
   }
 }


  async function GetWeeklySales() {
   const sales = document.getElementById("weekly-sales")
   sales.textContent =  await body("sales")
  }

async function GetWeeklyProductsSold() {
  const products = document.getElementById("weekly-product")
  products.textContent = await body("product")
}


  // Call the function to retrieve and display products
 GetSales()
 GetWeeklySales();
GetWeeklyProductsSold();
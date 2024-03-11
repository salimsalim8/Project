const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const token = localStorage.getItem("access-token");

async function fetchProduct(productId) {
    const URL = `https://saleo.scratch.co.tz/api/product/${productId}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": token
        }
      });
      const res = await response.json();
      if (res.error != null) {
        console.log("Error:", res.error);
        return;
      }
      renderProductData(res.data); // Call the function to render the product data
    } catch (err) {
      console.error(err);
    }
  }
  
  function renderProductData(product) {
    const productContainer = document.getElementById("data-content");
  
    // Clear the previous data
    productContainer.innerHTML = "";
  
    // Create the HTML markup for the product data
    const markup = `
      <div class="data-item">
      <div class="space">
      <p>Batch No</p>
      </div>
      ${product.batch_no}
      <div class="space">
      <p>Name </p>
      <img class="edit-icon" onclick="openEditForm('Name', '${product.name}')" src="../adminpic/edit_icon.svg" alt="Edit">
      </div>
      ${product.name}
      <div class="space">
      <p>Quantity </p>
      <img class="edit-icon" onclick="openEditForm('Quantity', '${product.quantity}')" src="../adminpic/edit_icon.svg" alt="Edit">
      </div>
      ${product.quantity}
      <div class="space">
      <p>Buying Price</p>
      <img class="edit-icon" onclick="openEditForm('Buying Price', '${product.buying_price}')" src="../adminpic/edit_icon.svg" alt="Edit">
      </div>
      ${product.buying_price}
      <div class="space">
      <p>Selling Price </p>
      <img class="edit-icon" onclick="openEditForm('Selling Price', '${product.selling_price}')" src="../adminpic/edit_icon.svg" alt="Edit">
      </div>
      ${product.selling_price}
      <div class="space">
      <p>Remaining Products </p>
      </div>
      ${product.remaining_products}
      <div class="space">
      <p>Sold </p>
      </div>
      ${product.sold}
      <div class="space">
      <p>Expected Profit </p>
      </div>
      ${product.expected_profit}
      <div class="space">
      <p>Current Sales </p>
      </div>
      ${product.current_sales}
      <div class="space">
      <p>Status </p>
      </div>
      ${product.status}
      <div class="space">
      <p>Created At </p>
      </div>
      ${trimDateTime(product.created_at)}
      
      </div>
    `;
  
    // Append the markup to the product container
    productContainer.innerHTML = markup;
  }
  

  if (productId) {
    fetchProduct(productId);
  }
  

async function Delete() {
    const URL = `https://saleo.scratch.co.tz/api/delete/${productId}`;
    const DeleteError = document.getElementById("delete-error")
  
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": token
        }
      });
      const res = await response.json();
      if (res.error != null) {
        DeleteError.textContent = res.error
        return;
      }
      window.location.href="../html/product.html"
    } catch (err) {
      console.error(err);
    }
}

async function Sell () {
    const quantity = parseInt(document.getElementById("sell-quantity").value,10)
    const sellingPrice = parseFloat(document.getElementById("sell-price").value)
    const sellError = document.getElementById("sell-error")


    const URL = `https://saleo.scratch.co.tz/api/product/sell/${productId}`;
    try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
          body:JSON.stringify({quantity:quantity,selling_price:sellingPrice})
        });
        const res = await response.json();
        if (res.error != null) {
          sellError.textContent = res.error
          console.log("Error:", res.error);
          return;
        }
        window.location.href="../html/product.html"
      } catch (err) {
        console.error(err);
      }
}

async function Edit (params) {
  const URL = `https://saleo.scratch.co.tz/api/edit/product/${productId}`
  const ProductEditError = document.getElementById("product-edit-error");

  try {
    const response = await fetch (URL, {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
        "access-token":token
      },
      body:JSON.stringify(params)
    })
    const res = await response.json()
    if (res.error != null) {
      // console.log(res.status,res.error)
      ProductEditError.textContent = res.error;
      return
    }
    window.location.reload();

  }catch (err) {
    console.error(err)
  }
}

function EditQuantity (quantity){
     const params = {
      quantity:quantity
    }
    Edit(params)
}

function EditProductName (name) {
  const params = {
    product_name:name
  }
  Edit(params)
}

function EditBuyingPrice (price) {
  const params = {
    buying_price:price
  }
  Edit(params)
}

function EditSellingPrice (price) {
  const params = {
    selling_price:price
  }
  Edit(params)
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

function saveEditedData() {
  const fieldTitleElement = document.getElementById('edit-field-title');
  const fieldInputElement = document.getElementById('edit-field-input');
  const fieldValue = fieldInputElement.value;

  if (fieldTitleElement.textContent.includes("Quantity")) {

    EditQuantity(parseInt(fieldValue,10))

  } else if (fieldTitleElement.textContent.includes("Buying")) {

    EditBuyingPrice(parseFloat(fieldValue))

  } else if (fieldTitleElement.textContent.includes("Selling")){

    EditSellingPrice(parseFloat(fieldValue))

  }else if (fieldTitleElement.textContent.includes("Name")){

   EditProductName(fieldValue)

  }
  
}
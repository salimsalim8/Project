async function Submit() {
   const name = document.getElementById("product-name").value
   const pQuantity = document.getElementById("product-quantity").value
   const buyingPrice = document.getElementById("buying-price").value
   const sellingPrice = document.getElementById("selling-price").value
   const toserverResponse = document.getElementById("product-response")


   const quantity = parseInt(pQuantity,10)
   const buying_price = parseFloat(buyingPrice)
   const selling_price = parseFloat(sellingPrice)
   
   const url = "https://saleo.scratch.co.tz/api/add/product"
   const token = localStorage.getItem("access-token");

   const requestOptions = {
    method:"POST",
    headers: {
      "Content_Type":"application/json",
      "access-token":token
    },
    body:JSON.stringify({name:name,quantity:quantity,buying_price:buying_price,selling_price:selling_price})
   }


  
   try {
    const response = await fetch(url,requestOptions)
    const res = await response.json()

    if(res.error != null) {
      toserverResponse.style.color = "red";
      toserverResponse.textContent = res.error
      return
    }
    toserverResponse.style.color = "blue";
    toserverResponse.textContent = res.data.message;

   }catch(e) {
    console.error(e)
   }
  }

function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}



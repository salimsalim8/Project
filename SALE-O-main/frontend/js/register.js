const SubmitRegister = async(e) => {
    e.preventDefault();
    const errorMessage = document.getElementById("errorMessage-register")

    const form = document.getElementById('registerForm');
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;
    const businessName = form.elements.businessname.value;
  
    if (username == "") {
      errorMessage.textContent = "username required"
      return
    }

    if (password == "") {
      errorMessage.textContent = "password required"
      return
    }
    
    if (confirmPassword == "") {
      errorMessage.textContent = "confirm password required"
      return
    }

    if (businessName == "") {
      errorMessage.textContent = "business name required"
      return
    }

    if (password != confirmPassword) {
      errorMessage.textContent = "passwords do not match"
      return;
  }

    const url = "https://saleo.scratch.co.tz/api/register";

    const data = {
        username: username,
        password: password,
        business_name: businessName

      };
    
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      const res = await fetch(url,requestOptions)
      const d = await res.json()
      if (d.error != null) {
        errorMessage.textContent = d.error
        return
      }
      window.location.href = '../html/index.html';
      moveSlider();
  }
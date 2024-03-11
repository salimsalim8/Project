const errorMessage = document.getElementById('errorMessage-login');

const SubmitLogin = async (e) => {
    e.preventDefault();
  
    const form = document.getElementById('loginForm');
    const username = form.elements.username.value;
    const password = form.elements.password.value;
  

    if (username == "") {
      errorMessage.textContent = "username required"
      console.log("password user")
      return
    }

    if (password == "") {
      errorMessage.textContent = "password required"
      return
    }

    const url = "https://saleo.scratch.co.tz/api/login";
  
    const data = {
      username: username,
      password: password
    };
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    const res = await fetch(url, requestOptions);
    const d = await res.json();
  
    if (d.error != null) {
        errorMessage.textContent = d.error;
        return;
      }

    
    localStorage.setItem('access-token',d.data.token)

    window.location.href = '../html/admin.html';
  };
  
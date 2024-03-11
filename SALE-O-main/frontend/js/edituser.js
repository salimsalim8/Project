const errorLog = document.querySelector(".edit-error")
async function mainEdit (endUrl,body) {
     const URL = "https://saleo.scratch.co.tz/api"+endUrl
     const token = localStorage.getItem("access-token");
    
    try {
        const response = await fetch (URL, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "access-token" : token
            },
            body:JSON.stringify(body)
         })
         const res = await response.json()
         if (res.error != null) {
            // errorLog.textContent = res.error
            console.log(res.error)
            return
         }
         window.location.reload();
    }catch (e) {
        console.error(e)
    }
}


function EditUsername() {
    const username = document.getElementById("new-username").value
    body = {
        username:username
    }
    console.log(body)
    mainEdit("/edit",body)
}

function EditBusinessName() {
    const businessName = document.getElementById("new-business-name").value
    body = {
        business_name:businessName
    }
    mainEdit("/edit",body)
}
function EditEmail() {
    const email = document.getElementById("new-email").value
    body = {
        email:email
    }
    mainEdit("/edit/email",body)
}

function EditPassword() {
    const currentPassword = document.getElementById("current-password").value
    const newPassword = document.getElementById("new-password").value
    const confirmPassword = document.getElementById("confirm-password").value

    if (newPassword !== confirmPassword) {
        errorLog.textContent = "passwords do not match"
        return
    }

    body = {
        current_password: currentPassword,
        new_password: newPassword
    }
    mainEdit("/edit/password",body)
}
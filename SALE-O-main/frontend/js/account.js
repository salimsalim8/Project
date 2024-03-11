async function getAccount() {
    const username = document.getElementById("current-username")
    const businessName = document.getElementById("current-business-name")
    const email = document.getElementById("email")
    const joined = document.getElementById("joined-on")

    const URL = "https://saleo.scratch.co.tz/api/account"
    const token = localStorage.getItem("access-token")

    try {
        const response = await fetch(URL,{
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "access-token":token
            }
        })
        const res = await response.json()
        if (res.error != null) {
            console.log(res.error);
            return
        }

        username.textContent = res.data.username
        businessName.textContent = res.data.business_name
        email.textContent = res.data.email
        joined.textContent = trimDateTime(res.data.joined_on)


    }catch (e) {
        console.error(e)
    }
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

getAccount()
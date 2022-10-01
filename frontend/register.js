document.getElementById("register-submit").addEventListener("click", function(event){
    event.preventDefault()
});
async function register(username, password){
    console.log(`fn is running with ${username.value} and ${password.value}`);
    const api_url = "http://localhost:8080/";
    const res = await postapi(api_url, {
        username: username.value,
        password: password.value
    });
    if(res.status == "success"){
        alert("User Registered. Redirect to Login Page.");
        window.location.replace("index.html");
    }
}

async function postapi(url, data) {
    console.log(JSON.stringify(data))
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });  
    var res = await response.json();

    return res
}
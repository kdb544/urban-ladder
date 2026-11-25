let loginform=document.getElementById("loginForm");
loginform.addEventListener("submit",function(event){
    event.preventDefault()

    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;

    if(username==="admin" && password==="admin123"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else if(username==="user" && password==="user123"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else if(username==="guest" && password==="guest123"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else if(username==="test" && password==="test123"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else if(username==="demo" && password==="demo123"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else if(username==="Skanditha" && password==="Looks18"){
        alert("Login successful");
        window.location.href="movie.html";
    }
    else{
        alert("Invalid username or password");
    }
});
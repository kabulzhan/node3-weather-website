const p1 = document.querySelector("#message-1");
const p2 = document.querySelector("#message-2");
const p3 = document.querySelector("#message-3");


document.querySelector("form").addEventListener("submit", (event)=>{
    event.preventDefault();
    const location = document.querySelector("input").value;
    p1.style.color = "green";
    p1.textContent = "Loading...";
    p2.innerHTML = "";
    p3.innerHTML = "";

    fetch("/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            p1.textContent = data.error;
            return p1.style.color = "red";
        }
        console.log(data);
        p1.innerHTML = "Location: " + data.location + "<div>Local time: " + data.local_time + "</div>";
        p1.style.color = "black";
        p2.innerHTML = data.description;
        p3.innerHTML = "Humidity: " + data.humidity + "%. <div> Wind speed: " + data.windspeed + "km/h. </div>"; 
    });
})

})


const fetchtovalidateToken = async()=>{
    const promise = await fetch("http://localhost:7200/validatetoken",{
        headers : {
            "Content-type" : "application/json",
            Authorization : sessionStorage.getItem("accesstoken")
        },
        method : "POST"
    })

    const res = await promise.json();
    if (res.msg) {
        window.location.assign("http://127.0.0.1:5500/frontend/main.html")
    }
}
fetchtovalidateToken()
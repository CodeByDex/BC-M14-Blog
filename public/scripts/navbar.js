window.addEventListener("load", (event) => {
    const logout = document.querySelector("#Logout");

    if (!logout) {
        return;
    }
    
    logout.addEventListener("submit", async (event) => {
        event.preventDefault();

        const response = await fetch('/api/user/logout', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Error Logging Out");
        }
    })
});

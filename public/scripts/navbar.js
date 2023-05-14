window.addEventListener("load", (event) => {
    document.querySelector("#Logout").addEventListener("submit", async (event) => {
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

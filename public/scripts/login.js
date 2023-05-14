window.addEventListener("load", (event) => {
    addLoginEvent();
    addNewUserEvent();
});

function addLoginEvent() {
    document.querySelector("#Login").addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Login");
    });
};

function addNewUserEvent() {
    document.querySelector("#Sign-Up").addEventListener("submit", async (event) => {
        event.preventDefault();

        const UserName = document.querySelector("#New-UserName").value
        const Password = document.querySelector("#New-Password").value

        console.log(UserName, Password);

        const response = await fetch('/api/user', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                UserName,
                Password
            })
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Error Loggin In");
        }
    });
};
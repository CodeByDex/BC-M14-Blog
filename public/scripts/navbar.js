window.addEventListener("load", (event) => {
    document.querySelector("#Logout").addEventListener("submit", async (event) => {
        location.replace("/login");
    })
});
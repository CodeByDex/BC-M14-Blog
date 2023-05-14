window.addEventListener("load", (event) => {
    addBlogEvent();
});

function addBlogEvent() {
    document.querySelector("#New-Blog").addEventListener("submit", async (event) => {
        event.preventDefault();

        const Title = document.querySelector("#Blog-Title").value;
        const Content = document.querySelector("#Blog-Content").value;

        const response = await fetch("/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Title,
                Content
            })
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Error Creating Blog");
        }
    });
};
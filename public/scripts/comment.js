window.addEventListener("load", (event) => {
    addBlogEvent();
});

function addBlogEvent() {
    document.querySelector("#New-Comment").addEventListener("submit", async (event) => {
        event.preventDefault();

        const BlogID = document.querySelector("#Comment-BlogID").value;
        const Content = document.querySelector("#Comment-Content").value;

        const response = await fetch(`/api/post/${BlogID}/comment`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
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
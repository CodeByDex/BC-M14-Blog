window.addEventListener("load", (event) => {
    addBlogEvent();
    deleteBlogEvent();
});

function deleteBlogEvent() {
    const deleteForm = document.querySelector("#Delete");

    if (!deleteForm) {
        return;
    }
    
    deleteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const ID = document.querySelector("#Blog-ID").value;

        if (ID) {
            const response = await fetch(`/api/post/${ID}`, {
                method: "delete"
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Error Deleting Record");
            }
        } else {
            console.log("Bad ID");
        }
    })
};

function addBlogEvent() {
    document.querySelector("#New-Blog").addEventListener("submit", async (event) => {
        event.preventDefault();

        const ID = document.querySelector("#Blog-ID").value;
        const Title = document.querySelector("#Blog-Title").value;
        const Content = document.querySelector("#Blog-Content").value;

        const method = ID ? "PUT" : "POST";
        const uriSuffix = ID ? `/${ID}` : "";

        const response = await fetch(`/api/post${uriSuffix}`, {
            method: method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Title,
                Content
            })
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Error Saving Blog");
        }
    });
};
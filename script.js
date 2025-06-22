const statusElement = document.getElementById("status");

(async function () {

    statusElement.textContent = "Processing..."

    const queryString = window.location.search;
    console.log("Query String: " + queryString);
    const parameters = new URLSearchParams(queryString);

console.log("Parameters: " + parameters);

    const codeParameter = parameters?.get("code");
console.log("codeParameter: " + codeParameter)

    if(!codeParameter) {
        statusElement.textContent = "No 'code' parameter found."
        console.log("No 'code' parameter found.");
        return;
    }

    // statusElement.textContent = `Code is: ${codeParameter}`

    try {
        const response = await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({codeParameter})
        });

        if(!response.ok) throw new Error("Network response was not ok")
        console.log(response)
        const data = await response.json();

console.log(data);

        statusElement.textContent = `${data.message} : ${data.longToken}.`

    } catch (error) {
        console.error(error);
        statusElement.textContent = error.message;
    }

    console.log("codeParameter: " + codeParameter);

})()

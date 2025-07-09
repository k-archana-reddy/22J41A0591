const fetch = require('node-fetch');

const url = "http://20.244.56.144/evaluation-service/register";

const details = {
    email: "karchanareddy16@gmail.com",
    name: "k archana reddy",
    mobileNo: "6303762102",
    githubUsername: "k-archana-reddy",
    rollNo: "22J41A0591",
    accessCode: "eeWErx"  
};

fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
})
.then(response => {
    if (!response.ok) {
        console.error("Status:", response.status);
        return response.text().then(text => { throw new Error(text); });
    }
    return response.json();
})
.then(data => {
    console.log("done");
    console.log(data);
})
.catch(error => {
    console.error("Error:", error.message);
});

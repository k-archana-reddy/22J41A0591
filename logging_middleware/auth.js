const fetch = require('node-fetch');

const url = "http://20.244.56.144/evaluation-service/auth";

const details = {
    email: 'karchanareddy16@gmail.com',
    name: 'k archana reddy',
    rollNo: '22j41a0591',
    accessCode: 'eeWErx',
    clientID: 'cf51a998-3c0b-40a2-94de-6c163ff8e25c',
    clientSecret: 'tEkarepVDpUsEQSC'  
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

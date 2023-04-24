const fs = require("fs");

const data = new Date();
console.log(data);

fs.writeFile("./current date-time.txt", `the current time is : ${data} `, () => {
console.log("Completed writing in good.txt")
});
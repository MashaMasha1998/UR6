// const { response } = require('express');
const ex = require('express');
const fs = require('fs')

const application = ex();

// application.get("/stations", (request, response) => {
//     fs.readFile("./stations.json", (err, data) => {
//         if (err) {
//             console.error(err);
//             response.status(500).send("ERROR!");
//         } else {
//             response.json(JSON.parse(data));
//         }
//     }) 
// });

application.get("/stations", (req, res) => {
    const stations = fs.readFileSync('./stations.json')
    res.json(JSON.parse(stations));
})

application.listen(8080, () => {
    console.log("Application in running");
});
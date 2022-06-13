const ex = require('express');
const { path } = require('express/lib/application');
const fs = require('fs.promises')

const application = ex();
application.use(ex.json())

application.get("/stations", (req, res) => {
    fs.readFile("./stations.json").then( fileContent  => {
        res.json(JSON.parse(fileContent));
    })
})

application.post("/stations", (req, res) => {
    const newStation = req.body;
    console.log("newStation",req.body)
    fs.readFile("./stations.json").then( fileContent  => {
        const fileArray = JSON.parse(fileContent);
        fileArray.push(newStation);
        fs.writeFile("./stations.json", JSON.stringify(fileArray)).then(() => {
            res.sendStatus(200);
        })
    }).catch(err => console.error(err));
})


application.delete("/stations/:id", (req, res) => {
    fs.readFile("./stations.json").then( fileContent  => {
        const fileArray = JSON.parse(fileContent).filter(s => s.id != req.params.id);
        fs.writeFile("./stations.json", JSON.stringify(fileArray)).then(() => {
            res.sendStatus(200);
        })
    }).catch(err => console.error(err));
})

application.get("/stations/:id", (req, res) => {
    fs.readFile("./stations.json").then( fileContent  => {
        res.json(JSON.parse(fileContent).filter(s => s.id === req.params.id));
        })
});

application.put("/stations/:id", (req, res) => {
    fs.readFile("./stations.json").then( fileContent  => {
        const parsedData = JSON.parse(fileContent);
        const stationToBeChanged = parsedData.filter(record => record.id === req.params.id)[0];
        stationToBeChanged.status = req.body.status;
        fs.writeFile("./stations.json", JSON.stringify(parsedData)).then(() => {
            res.sendStatus(200);
        })
    }).catch(err => console.error(err));
})

application.listen(8080, () => {
    console.log("Application in running well for you");
});

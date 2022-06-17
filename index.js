const ex = require('express');
const { path } = require('express/lib/application');
const cors = require('cors');
const fs = require('fs.promises')

const application = ex();
application.use(ex.json())

application.use(cors());

application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        let resultArray = JSON.parse(fileContent).map( s => s.id == req.params.id ? {...s, ...req.body} : s);
        fs.writeFile("./stations.json", JSON.stringify(resultArray)).then(() => {
            res.sendStatus(200);
        });
    }).catch(err => console.error(err));
})

application.listen(8080, () => {
    console.log("Application in running well for you");
});

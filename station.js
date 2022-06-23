async function getStation () {
    let response = await fetch("http://localhost:8080/stations")
    let stations = await response.json()
         
    for (let i = 0; i < stations.length; i++) {

        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdAddress = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdDelete = document.createElement("button");
        let tdEdit = document.createElement("button");

        tdId.innerText = stations[i].id
        tdAddress.innerText = stations[i].address
        tdStatus.innerText = stations[i].status
        tdDelete.innerText = "Delete"
        tdDelete.onclick = function() {
            deleteStations(stations[i].id)
        }
        tdEdit.innerText = "Update"
        tdEdit.onclick = function() {
            editStations(stations[i])
        }

        tr.appendChild(tdId)
        tr.appendChild(tdAddress)
        tr.appendChild(tdStatus)
        tr.appendChild(tdDelete)
        tr.appendChild(tdEdit)

        var table = document.getElementById("table");
            table.appendChild(tr);
    }   
}

    function deleteStations(id) {
        let response = fetch('http://localhost:8080/stations/'+ id, {
            method: "Delete",
        })
    }

    function createNewStation(stations) {
        const form = document.getElementById("newStation")
        const formData = new FormData(form);
        let resp = {}
        for (let [key, value] of formData.entries()) { 
            resp[key] = value; 
        }

        fetch("http://localhost:8080/stations", {
            method: "POST",
            
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            body: JSON.stringify(resp)
        })
    }

    function editStations(stations) {
        document.forms["newStation"].elements["id"].value = stations.id
        document.forms["newStation"].elements["address"].value = stations.address
        document.forms["newStation"].elements["status"].value = stations.status
    }
    
    function onUpdate (){
        const form = document.getElementById("newStation")
        const formData = new FormData(form);
        let station = {}
        for (let [key, value] of formData.entries()) { 
            station[key] = value; 
        }
        
        fetch('http://localhost:8080/stations/' + station.id, {
            method: "PUT",
            
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            body: JSON.stringify(station)
        })
    }
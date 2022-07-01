const greeting: string = "Hello wolrd"

console.log("Hello world");

// select station.id, station.address, station.region_id from station;

// select AVG(metric.value), region.title from station inner join region on region.id = station.region_id 
// inner join metric on station.id = metric.station_id group by region.title;
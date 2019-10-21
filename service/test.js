const Dynamo = require("./dynamodb")

let trip = {
  _id: "asdfasfda",
  from: "An Giang",
  to: "Bà Rịa–Vũng Tàu",
  price: 600000,
  date: "20-10-2019",
  time: "9:30",
  quantity: 30
}

Dynamo.createOneTrip(trip)
  .then(data => {
    console.log("create item successful")
    return Dynamo.findTrips(trip.from, trip.to, trip.date)
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })

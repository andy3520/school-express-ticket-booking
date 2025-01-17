const express = require("express")
const router = express.Router()
const Dynamo = require("../service/dynamodb")

// trips
router.get("/create-table", function(req, res) {
  Dynamo.createTripTable()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/drop-table", function(req, res) {
  Dynamo.dropTripTable()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/", function(req, res) {
  Dynamo.findAllTrip()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post("/find-trips", function(req, res) {
  const data = req.body
  Dynamo.findTrips(data.from, data.to, data.date)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post("/", function(req, res) {
  Dynamo.createOneTrip(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put("/", function(req, res) {
  Dynamo.editOneTrip(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete("/:id", function(req, res) {
  Dynamo.deleteOneTrip(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router

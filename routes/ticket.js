const express = require("express")
const router = express.Router()
const Dynamo = require("../service/dynamodb")

// trips
router.get("/create-table", function(req, res) {
  Dynamo.createTicketTable()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/drop-table", function(req, res) {
  Dynamo.dropTicketTable()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/", function(req, res) {
  Dynamo.findAllTicket()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/:code", function(req, res) {
  Dynamo.findTicketByCode(req.params.code)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post("/", function(req, res) {
  Dynamo.createOneTicket(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put("/", function(req, res) {
  Dynamo.editOneTicket(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete("/:id", function(req, res) {
  Dynamo.deleteOneTicket(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router

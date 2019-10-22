require("dotenv").config()

const AWS = require("aws-sdk")
const fs = require("fs")

AWS.config.update({
  region: process.env.REGION,
  sessionToken: process.env.SESSION_TOKEN,
  // endpoint: process.env.END_POINT,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
})

const Dynamo = {
  db: new AWS.DynamoDB(),
  docClient: new AWS.DynamoDB.DocumentClient(),

  createTripTable: function() {
    return new Promise((rs, rj) => {
      var schema = {
        TableName: "Trip",
        KeySchema: [{ AttributeName: "_id", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "_id", AttributeType: "S" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
      this.db.createTable(schema, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  createTicketTable: function(params) {
    return new Promise((rs, rj) => {
      var schema = {
        TableName: "Ticket",
        KeySchema: [{ AttributeName: "_id", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "_id", AttributeType: "S" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
      this.db.createTable(schema, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  dropTripTable: function() {
    return new Promise((rs, rj) => {
      let query = {
        TableName: "Trip"
      }
      this.db.deleteTable(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  dropTicketTable: function() {
    return new Promise((rs, rj) => {
      let query = {
        TableName: "Ticket"
      }
      this.db.deleteTable(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  findAllTrip: function() {
    return new Promise((rs, rj) => {
      let query = {
        TableName: "Trip"
      }
      this.docClient.scan(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  findTrips: function(from, to, date) {
    return new Promise((rs, rj) => {
      let FilterExpression = "",
        ExpressionAttributeNames = {},
        ExpressionAttributeValues = {}
      if (from && from !== "") {
        FilterExpression += "#from = :from"
        ExpressionAttributeNames["#from"] = "from"
        ExpressionAttributeValues[":from"] = from
      }
      if (to && to !== "") {
        FilterExpression += FilterExpression !== "" ? " and " : ""
        FilterExpression += "#to = :to"
        ExpressionAttributeNames["#to"] = "to"
        ExpressionAttributeValues[":to"] = to
      }
      if (date && date !== "") {
        FilterExpression += FilterExpression !== "" ? " and " : ""
        FilterExpression += "#date = :date"
        ExpressionAttributeNames["#date"] = "date"
        ExpressionAttributeValues[":date"] = date
      }

      let query = {
        TableName: "Trip",
        FilterExpression: FilterExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
      }

      this.docClient.scan(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  createOneTrip: function(trip) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Trip",
        Item: trip
      }
      this.docClient.put(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  editOneTrip: function(trip) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Trip",
        Key: {
          _id: trip._id
        },
        UpdateExpression:
          "set from=:from, to=:to, date=:date, time=:time, price=:price, quantity=:quantity",
        ExpressionAttributeValues: {
          ":from": trip.from ? trip.from : "",
          ":to": trip.to ? trip.to : "",
          ":date": trip.date ? trip.date : "",
          ":time": trip.time ? trip.time : "",
          ":price": !isNaN(trip.price) ? Number(trip.price) : 0,
          ":quantity": !isNaN(trip.quantity) ? Number(trip.quantity) : 0
        },
        ReturnValues: "UPDATED_NEW"
      }
      this.docClient.update(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  deleteOneTrip: function(_id) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Trip",
        Key: {
          _id: _id
        }
      }
      this.docClient.update(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  findAllTicket: function() {
    return new Promise((rs, rj) => {
      let query = {
        TableName: "Ticket"
      }
      this.docClient.scan(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  findTicketByCode: function(code) {
    return new Promise((rs, rj) => {
      let query = {
        TableName: "Ticket",
        KeyConditionExpression: "#code=:code",
        ExpressionAttributeNames: {
          "#code": "code"
        },
        ExpressionAttributeValues: {
          ":code": code
        }
      }
      this.docClient.scan(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  createOneTicket: function(ticket) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Ticket",
        Item: ticket
      }
      this.docClient.put(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  editOneTicket: function(ticket) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Ticket",
        Key: {
          _id: ticket._id
        },
        UpdateExpression:
          "set trip.from=:from, trip.to=:to, trip.date=:date, trip.time=:time, trip.price=:price, trip.quantity=:quantity, user.name=:name, user.phone=:phone, user.email=:email, status=:status, code=:code",
        ExpressionAttributeValues: {
          ":from": ticket.trip.from ? ticket.trip.from : "",
          ":to": ticket.trip.to ? ticket.trip.to : "",
          ":date": ticket.trip.date ? ticket.trip.date : "",
          ":time": ticket.trip.time ? ticket.trip.time : "",
          ":price": !isNaN(ticket.trip.price) ? Number(ticket.trip.price) : 0,
          ":quantity": !isNaN(ticket.trip.quantity) ? Number(ticket.trip.quantity) : 0,
          ":name": ticket.user.name ? ticket.user.name : "",
          ":phone": ticket.user.phone ? ticket.user.phone : "",
          ":email": ticket.user.email ? ticket.user.email : "",
          ":status": ticket.status ? ticket.status : "Pending"
          ":status": ticket.code ? ticket.code : "Empty"
        },
        ReturnValues: "UPDATED_NEW"
      }
      this.docClient.update(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  deleteOneTicket: function(_id) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Ticket",
        Key: {
          _id: _id
        }
      }
      this.docClient.update(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  }
}

module.exports = Dynamo

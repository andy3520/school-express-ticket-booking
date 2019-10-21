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

  createTicketTable: function(params) {},

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

  dropTicketTable: function(params) {},

  initTripData: function(params) {},

  initTicketData: function(params) {},

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

      console.log(query)

      this.docClient.scan(query, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  createTrips: function(params) {},

  createOneTrip: function(params) {
    return new Promise((rs, rj) => {
      let item = {
        TableName: "Trip",
        Item: params
      }
      this.docClient.put(item, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  editOneTrip: function(params) {},

  deleteOneTrip: function(params) {},

  deleteAllTrip: function(params) {},

  findAllTicket: function(params) {},

  findTicketById: function(params) {},

  createTickets: function(params) {},

  createOneTicket: function(params) {},

  editOneTicket: function(params) {},

  deleteOneTicket: function(params) {},

  deleteAllTicket: function(params) {}
}

module.exports = Dynamo

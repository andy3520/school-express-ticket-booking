require('dotenv').config()

const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  region: process.env.REGION,
  endpoint: process.env.END_POINT,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
})

const Dynamo = {
  db: new AWS.DynamoDB(),

  // let schema = {
  //   TableName : "Movies",
  //   KeySchema: [
  //       { AttributeName: "year", KeyType: "HASH"},  //Partition key
  //       { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  //   ],
  //   AttributeDefinitions: [
  //       { AttributeName: "year", AttributeType: "N" },
  //       { AttributeName: "title", AttributeType: "S" }
  //   ],
  //   ProvisionedThroughput: {
  //       ReadCapacityUnits: 10,
  //       WriteCapacityUnits: 10
  //   }
  // };
  createTable: function(schema) {
    return new Promise((rs, rj) => {
      this.db.createTable(schema, (err, data) => {
        if (err) return rj(err)
        rs(data)
      })
    })
  },

  createTripTable: function(params) {

  },

  createTicketTable: function(params) {

  },

  dropTripTable: function(params) {

  },

  dropTicketTable: function(params) {

  },

  initTripData: function(params) {

  },

  initTicketData: function(params) {

  },

  findAllTrip: function(params) {

  },

  findTripById: function(params) {

  },

  createTrips: function(params) {

  },

  createOneTrip: function(params) {

  },

  editOneTrip: function(params) {

  },

  deleteOneTrip: function(params) {

  },

  deleteAllTrip: function(params) {

  },

  findAllTicket: function(params) {

  },

  findTicketById: function(params) {

  },

  createTickets: function(params) {

  },

  createOneTicket: function(params) {

  },

  editOneTicket: function(params) {

  },

  deleteOneTicket: function(params) {

  },

  deleteAllTicket: function(params) {

  }
}

module.exports = Dynamo

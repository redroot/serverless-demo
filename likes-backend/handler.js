'use strict';
var uuid = require('uuid');
var extend = require('extend');
var AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

var dynamoDb = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: process.env.DYNAMODB_TABLE,
};

var defaultHeaders =  {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Content-Type": "text/plain"
}

module.exports.create = (event, context, callback) => {
  var timestamp = new Date().getTime();

  // invoke locally needs to work as well, no event.body present, just raw JSON
  var data = event.body && typeof event.body == 'string' ? JSON.parse(event.body) : event;

  if (typeof data.user_id !== 'string' || typeof data.film_id !== 'string') {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the like item. Validation failed.',
    });
    return;
  }

  var toInsert = extend(params, {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      user_id: data.user_id,
      film_id: data.film_id,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  });

  // write the todo to the database
  dynamoDb.put(toInsert, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: defaultHeaders,
        body: 'Couldn\'t create the like entry.' + error.stack,
      });
      return;
    }

    // create a response
    var response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    callback(null, response);
  });
}

// in Lambda product, curl ing the rought with '/likes/?user_id = 1002'
// means it turns up in event.queryStringParameters
// locally, you have to fake this with { queryStringParameters: { user_id: "1002" }}
// would be easy to have a local API gateway

module.exports.list = (event, context, callback) => {
  var search = params;
  var queryParams = event.queryStringParameters;

  // probably a nicer library to extend this query but not the problem im solving
  if (queryParams && queryParams.user_id) {
    search = extend(search, {
      FilterExpression: "#user_id = :user_id",
      ExpressionAttributeNames: {
        "#user_id": "user_id"
      },
      ExpressionAttributeValues: {
        ":user_id": queryParams.user_id
      }
    });
  }

  dynamoDb.scan(search, (error, result) => {
    // handle potential errors
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: defaultHeaders,
        body: "Could not fetch the likes - " + error.stack ,
      });
      return;
    }
    var response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

module.exports.delete = () => {}

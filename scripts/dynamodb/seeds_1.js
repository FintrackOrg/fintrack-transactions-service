const AWS = require("aws-sdk");
console.log("started");
// URI and other properties could be load by ENV Vars or by property file (.env)
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:4569",
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "Transactions",
  KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, console.log);

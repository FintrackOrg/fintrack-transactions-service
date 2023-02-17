#!/bin/bash

echo "########### Creating table with global secondary index ###########"
aws --endpoint-url=http://localhost:4566 \
      dynamodb create-table \
         --table-name transactions \
         --attribute-definitions \
           AttributeName=PK,AttributeType=S \
           AttributeName=SK,AttributeType=S \
           AttributeName=GS1PK,AttributeType=S \
           AttributeName=GS1SK,AttributeType=S \
        --key-schema \
            AttributeName=PK,KeyType=HASH \
            AttributeName=SK,KeyType=RANGE \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --global-secondary-indexes \
                  "[
                      {
                          \"IndexName\": \"GSI1\",
                          \"KeySchema\": [{\"AttributeName\":\"GS1PK\",\"KeyType\":\"HASH\"},
                                            {\"AttributeName\":\"GS1SK\",\"KeyType\":\"RANGE\"}],
                          \"Projection\":{
                              \"ProjectionType\":\"ALL\"
                          },
                          \"ProvisionedThroughput\": {
                              \"ReadCapacityUnits\": 5,
                              \"WriteCapacityUnits\": 5
                          }
                      }
                  ]"

echo "########### Describing a table ###########"
aws --endpoint-url=http://localhost:4566 \
      dynamodb describe-table --table-name transactions --output table


echo "########### Inserting test data into a table ###########"
echo "directory: $(pwd)"
echo "files: $(ls)"
aws --endpoint-url=http://localhost:4566 \
    dynamodb batch-write-item --request-items file://$(pwd)/seeds/transactions-1.seed.json

echo "########### Selecting all data from a table ###########"
aws --endpoint-url=http://localhost:4566 \
        dynamodb scan --table-name transactions
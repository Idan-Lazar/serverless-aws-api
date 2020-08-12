import AWS from "aws-sdk";
import validator from "@middy/validator";
import commonMiddleware from '../lib/commonMiddleware'
import getAuctionsSchema from '../lib/schemas/getAuctionsSchema'
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  const { status } = event.queryStringParameters;
  let auctions;

  try {
    const results = await dynamodb
      .query({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues:{
            ':status': status,
        },
        ExpressionAttributeNames:{
            '#status': 'status'
        },
      })
      .promise();
     auctions = results.Items; 
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ auctions }),
  };
}
export const handler = commonMiddleware(getAuctions)
.use(validator({ inputSchema: getAuctionsSchema , useDefaults: true}))

import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";
import { getAuctionById } from './getAuction'
import placeBidSchema from '../lib/schemas/placeBidSchema'
import validator from "@middy/validator";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;
  const now = new Date().toISOString()

  const auction = await getAuctionById(id);

 /*  //Bad identity validation
  if(email === auction.seller){
    throw new createError.Forbidden(`You cannot bid on your own auctions!`)
  } */

  //Avoid double bidding
  if(email === auction.highestBid.bidder){
    throw new createError.Forbidden(`You are already the highest bidder!`)
  }

  //Auction status validation
  if(auction.status !== 'OPEN'){
      throw new createError.Forbidden(`You cannot bid on closed auctions!`)
  }

  //Auction status validation
  if(auction.endingAt <= now){
      throw new createError.Forbidden(`You cannot bid on closed auctions!`)
  }

  //Bid amount validation
  if(amount <= auction.highestBid.amount){
      throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`)
  }

  let updateAuction;

  try {
    const results = await dynamodb.update({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :bidder',
        ExpressionAttributeValues: {
          ':amount': amount,
          ':bidder': email,
        },
        ReturnValues: 'ALL_NEW',
      }).promise();
    updateAuction = results.Attributes;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify( updateAuction ),
  };
}
export const handler = commonMiddleware(placeBid)
.use(validator({ inputSchema: placeBidSchema , useDefaults: true}))

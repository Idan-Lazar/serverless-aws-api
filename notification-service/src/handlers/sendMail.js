import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "eu-west-1" });

async function sendMail(event, context) {
  const record = event.Records[0]

  const email = JSON.parse(record.body)
  const { subject, body, recipient } = email;

  try {
    const result = await ses.sendEmail({
        Source: "idanlazar8241@gmail.com",
        Destination: {
          ToAddresses: [recipient],
        },
        Message: {
          Body: {
            Text: {
              Data: body,
            },
          },
          Subject: {
            Data: subject,
          },
        },
      })
      .promise();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
export const handler = sendMail;

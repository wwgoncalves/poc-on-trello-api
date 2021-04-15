require("dotenv").config();
const https = require("https");

const {
  TRELLO_API_HOSTNAME,
  TRELLO_API_PORT,
  TRELLO_API_VERSION,
  TRELLO_API_KEY,
  TRELLO_USER_TOKEN,
} = process.env;

let options = {
  hostname: `${TRELLO_API_HOSTNAME}`,
  port: `${TRELLO_API_PORT}`,
  path: `/${TRELLO_API_VERSION}/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_USER_TOKEN}`,
  method: "GET",
};

const request = https.request(options, (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  response.setEncoding("utf8");
  response.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  response.on("end", () => {
    console.log("</RESPONSE-DATA>");
  });
});

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();

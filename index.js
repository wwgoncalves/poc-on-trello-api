require("dotenv").config();
const https = require("https");

const {
  TRELLO_API_HOSTNAME,
  TRELLO_API_PORT,
  TRELLO_API_VERSION,
  TRELLO_API_KEY,
  TRELLO_USER_TOKEN,
} = process.env;

let request;
let data;

const getOptions = (resource, fields) => {
  return {
    hostname: `${TRELLO_API_HOSTNAME}`,
    port: `${TRELLO_API_PORT}`,
    path: `/${TRELLO_API_VERSION}/${resource}?fields=${fields}&key=${TRELLO_API_KEY}&token=${TRELLO_USER_TOKEN}`,
    method: "GET",
  };
};

const putOptions = (resource, data) => {
  return {
    hostname: `${TRELLO_API_HOSTNAME}`,
    port: `${TRELLO_API_PORT}`,
    path: `/${TRELLO_API_VERSION}/${resource}?key=${TRELLO_API_KEY}&token=${TRELLO_USER_TOKEN}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
};

const requestCallbackFn = (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  response.setEncoding("utf8");
  response.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  response.on("end", () => {
    console.log("</RESPONSE-DATA>");
  });
};

// Retrieves own boards
request = https.request(
  getOptions("members/me/boards", "name,url"),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Retrieves board (id: 5f1795cb8ce2ce397a24e8e2) lists
request = https.request(
  getOptions("boards/5f1795cb8ce2ce397a24e8e2/lists", "name,url"),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Retrieves list (id: 5f1795cc2a3d5e692786441c) cards
request = https.request(
  getOptions("lists/5f1795cc2a3d5e692786441c/cards", "name,url"),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Retrieves card (id: 5f1795ccf8eadd0d6128a172) checklists
request = https.request(
  getOptions("cards/5f1795ccf8eadd0d6128a172/checklists", "name"),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Retrieves checklist (id: 5f184a683b228141a924063a) checkitems
request = https.request(
  getOptions("checklists/5f184a683b228141a924063a/checkitems", "name,state"),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Retrieves a checkitem (id: 5f184abf3c51b9277a929f8f) on a checklist (id: 5f184a683b228141a924063a)
request = https.request(
  getOptions(
    "checklists/5f184a683b228141a924063a/checkitems/5f184abf3c51b9277a929f8f",
    "name,state"
  ),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.end();
// ---

// Updates a checkitem (id: 5f184abf3c51b9277a929f8f)
data = JSON.stringify({
  state: "complete",
});
request = https.request(
  putOptions(
    "cards/5f1795ccf8eadd0d6128a172/checkitem/5f184abf3c51b9277a929f8f",
    data
  ),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.write(data);
request.end();
// ---

// Moves a card (id: 5f1795ccf8eadd0d6128a172) to a list (id: 5f1795cc2a3d5e692786441c)
data = JSON.stringify({
  idList: "5f1795cc2a3d5e692786441c",
});
request = https.request(
  putOptions("cards/5f1795ccf8eadd0d6128a172", data),
  requestCallbackFn
);

request.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
});

request.write(data);
request.end();
// ---

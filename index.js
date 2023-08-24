const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an Express application
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const spreadsheetId = "1A-YybFvVcEWuSVAn11ClvUGYR9u-r570POlJgK9fp_Q";

// Define a route that responds with "Hello, World!" when accessed
app.get("/add-to-g-sheet", async (req, res) => {
  console.log({ req });
  const auth = new google.auth.GoogleAuth({
    keyFile: "t-bounty-396905-f4fc0bf1a55e.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["chamara", 50]],
    },
  });

  res.send(getRows.data);
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

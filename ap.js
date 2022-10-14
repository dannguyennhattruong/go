const express = require("express");

const app = express();
const common = require("./common");

let status = "no running";
let issuenumberEntry = 0;
let intervalId = null;

app.listen(3000, () => {
    console.log('oke')
});

app.get("/status", (req, res) => {
  res.send({
    status,
  });
});

app.post("/start", async (req, res) => {
  issuenumberEntry = req.body.issuseNumber;
  status = "running";
  const balance = await common.getBalance();
  intervalId = setInterval(() => {
    issuenumberEntry = issuenumberEntry + 3;
    console.log(issuenumberEntry.toString().slice());
    console.log("go - " + issuenumberEntry);

    common.bet(issuenumberEntry, common.predict(), 9);
  }, 1000 * 55);

  res.send({
    status,
    balance,
  });
});

app.post("/stop", (req, res) => {
  clearInterval(intervalId);
  status = "no running";
  res.send({
    status,
  });
});

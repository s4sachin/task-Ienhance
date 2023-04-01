const { google } = require("googleapis");
const fs = require("fs");

const credentials = require("./credentials.json");

const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: "v3", auth });
gapi.client.request({
  path: "/drive/v3/files/" + theID,
  method: "GET",
  callback: function (theResponseJS, theResponseTXT) {
    var myToken = gapi.auth.getToken();
    var myXHR = new XMLHttpRequest();
    myXHR.open("GET", theResponseJS.downloadUrl, true);
    myXHR.setRequestHeader("Authorization", "Bearer " + myToken.access_token);
    myXHR.onreadystatechange = function (theProgressEvent) {
      if (myXHR.readyState == 4) {
        //          1=connection ok, 2=Request received, 3=running, 4=terminated
        if (myXHR.status == 200) {
          //              200=OK
          console.log(myXHR.response);
        }
      }
    };
    myXHR.send();
  },
});

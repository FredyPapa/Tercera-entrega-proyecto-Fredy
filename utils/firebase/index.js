let admin = require("firebase-admin");

let serviceAccount = require("./config/comision22460-fpapa-firebase-adminsdk-csqns-66cd25763d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {db}
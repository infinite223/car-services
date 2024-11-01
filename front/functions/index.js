// const cors = require("cors")({ origin: true });
// // Funkcja zwracająca statyczne dane
// exports.getData = functions.https.onRequest(
//   { cors: [/localhost\.com$/, "http://localhost.com"] },
//   (req, res) => {
//     res.json({
//       message: "Hello from Firebase Functions!",
//       data: [1, 2, 3, 4, 5],
//     });
//   }
// );

const { onRequest } = require("firebase-functions/v2/https");

exports.sayHello = onRequest(
  { cors: [/localhost\.com$/, "http://localhost.com"] },
  (req, res) => {
    res.json({
      message: "Hello from Firebase Functions!",
      data: [1, 2, 3, 4, 5],
    });
  }
);

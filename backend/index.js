const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    }));
    res.status(200).json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas pobierania użytkowników" });
  }
});

app.post("/api/users", async (req, res) => {
  const { email, password, displayName, phoneNumber } = req.body;
  try {
    const userOptions = {
      email,
      password,
      displayName,
    };

    if (phoneNumber) {
      userOptions.phoneNumber = phoneNumber;
    }

    const user = await admin.auth().createUser(userOptions);

    res.status(201).json({ message: "Użytkownik dodany", user });
  } catch (error) {
    console.error("Błąd dodawania użytkownika:", error);
    res.status(500).send(error.errorInfo.message);
  }
});

app.put("/api/users/:uid", async (req, res) => {
  const { uid } = req.params;
  const { displayName, phoneNumber } = req.body;
  try {
    const user = await admin.auth().updateUser(uid, {
      displayName,
      phoneNumber,
    });
    res.status(200).json({ message: "Użytkownik zaktualizowany", user });
  } catch (error) {
    console.error("Błąd edycji użytkownika:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas edytowania użytkownika" });
  }
});

app.delete("/api/users", async (req, res) => {
  const { uids } = req.body;
  if (!Array.isArray(uids) || uids.length === 0) {
    return res
      .status(400)
      .json({ message: "Brak prawidłowych ID użytkowników do usunięcia." });
  }

  try {
    for (const uid of uids) {
      await admin.auth().deleteUser(uid);
    }
    res.status(200).json({ message: "Użytkownicy usunięci" });
  } catch (error) {
    console.error("Błąd usuwania użytkowników:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas usuwania użytkowników" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

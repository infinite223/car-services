const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./baza.db", (err) => {
  if (err) {
    console.error("Błąd podczas łączenia z bazą danych:", err.message);
  } else {
    console.log("Połączono z bazą danych SQLite");
    db.run(`
      CREATE TABLE IF NOT EXISTS klient (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        imie TEXT NOT NULL,
        nazwisko TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS zamowienie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        klient_id INTEGER NOT NULL,
        produkt TEXT NOT NULL,
        ilosc INTEGER NOT NULL,
        FOREIGN KEY (klient_id) REFERENCES klient(id) ON DELETE CASCADE
      );
    `);
  }
});

app.get("/api/klienci", (req, res) => {
  db.all("SELECT * FROM klient", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/klienci", (req, res) => {
  const { imie, nazwisko, email } = req.body;
  db.run(
    `INSERT INTO klient (imie, nazwisko, email) VALUES (?, ?, ?)`,
    [imie, nazwisko, email],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, imie, nazwisko, email });
      }
    }
  );
});

app.put("/api/klienci/:id", (req, res) => {
  const { id } = req.params;
  const { imie, nazwisko, email } = req.body;
  db.run(
    `UPDATE klient SET imie = ?, nazwisko = ?, email = ? WHERE id = ?`,
    [imie, nazwisko, email, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Klient nie został znaleziony" });
      } else {
        res.json({ message: "Dane klienta zaktualizowane" });
      }
    }
  );
});

app.delete("/api/klienci/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM klient WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Klient nie został znaleziony" });
    } else {
      res.json({ message: "Klient usunięty" });
    }
  });
});

app.get("/api/zamowienia", (req, res) => {
  db.all(`SELECT * FROM zamowienie`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/zamowienia", (req, res) => {
  const { klient_id, produkt, ilosc } = req.body;
  db.run(
    `INSERT INTO zamowienie (klient_id, produkt, ilosc) VALUES (?, ?, ?)`,
    [klient_id, produkt, ilosc],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, klient_id, produkt, ilosc });
      }
    }
  );
});

app.put("/api/zamowienia/:id", (req, res) => {
  const { id } = req.params;
  const { produkt, ilosc } = req.body;
  db.run(
    `UPDATE zamowienie SET produkt = ?, ilosc = ? WHERE id = ?`,
    [produkt, ilosc, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Zamówienie nie zostało znalezione" });
      } else {
        res.json({ message: "Zamówienie zaktualizowane" });
      }
    }
  );
});

app.delete("/api/zamowienia/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM zamowienie WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Zamówienie nie zostało znalezione" });
    } else {
      res.json({ message: "Zamówienie usunięte" });
    }
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

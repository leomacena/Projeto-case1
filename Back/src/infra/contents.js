const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const SERIES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "SERIES" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TITULO" varchar(64),
    "EPISODIOS" INTERGER,
    "TEMPORADAS" INTERGER,
    "STATUS" VARCHAR(64)
  );`;

const ADD_SERIES_DATA = `
INSERT INTO SERIES (TITULO, EPISODIOS, TEMPORADAS, STATUS) VALUES
  ('Lucifer', 6, 93, 'Encerrada'),
  ('The good place', 4, 53, 'Encerrada'),
  ('Game of Thrones', 8, 73, 'Encerrada'),
  ('House of dragon', 1, 7, 'Renovada')
  `

function createTableSeries() {
    db.run(SERIES_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de Séries");
    });
}

function populaTabelaSeries() {
    db.run(ADD_SERIES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela Séries")
    });
}

db.serialize( ()=> {
    createTableSeries();
    populaTabelaSeries();
});
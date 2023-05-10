export const databaseName: string = 'oficina';
export const createSchema: string = `
CREATE TABLE IF NOT EXISTS ordensdeservico (
    ordemdeservicoid TEXT primary key NOT NULL,
    clienteid TEXT NOT NULL,
    veiculo TEXT NOT NULL,
    dataehoraentrega DATETIME NOT NULL,
    dataehoratermino DATETIME,
    dataehoraentrega DATETIME
);

CREATE INDEX IF NOT EXISTS ordensdeservico_index_ordemdeservicoid ON ordensdeservico (ordemdeservicoid);
PRAGMA user_version = 1;
`;
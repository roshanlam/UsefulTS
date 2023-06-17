import { createConnection, Connection, RowDataPacket } from 'mysql2';

async function connectToMySQLDatabase(config: any): Promise<Connection> {
  const connection = createConnection(config);
  await connection.promise().connect();
  return connection;
}

async function executeQuery(connection: Connection, query: string, values?: any[]): Promise<RowDataPacket[]> {
    const [rows, fields] = await connection.promise().execute(query, values);
    return rows as RowDataPacket[];
}

async function insertData(connection: Connection, table: string, data: any): Promise<void> {
    await connection.promise().query(`INSERT INTO ${table} SET ?`, data);
}

async function updateData(connection: Connection, table: string, data: any, whereClause: string, whereValues?: any[]): Promise<void> {
    await connection.promise().query(`UPDATE ${table} SET ? WHERE ${whereClause}`, [data, ...(whereValues || [])]);
}

async function deleteData(connection: Connection, table: string, whereClause: string, whereValues?: any[]): Promise<void> {
    await connection.promise().query(`DELETE FROM ${table} WHERE ${whereClause}`, whereValues);
}

async function selectData(connection: Connection, table: string, whereClause: string, whereValues?: any[]): Promise<RowDataPacket[]> {
    return await executeQuery(connection, `SELECT * FROM ${table} WHERE ${whereClause}`, whereValues);

}

async function selectAllData(connection: Connection, table: string): Promise<RowDataPacket[]> {
    return await executeQuery(connection, `SELECT * FROM ${table}`);
}


export {
    connectToMySQLDatabase,
    executeQuery,
    insertData,
    updateData,
    deleteData,
    selectData,
    selectAllData
};


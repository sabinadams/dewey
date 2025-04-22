/**
 * Prepares connection parameters for testing based on form values and database type
 */
export function prepareConnectionTestParams(values: {
    databaseType?: string;
    sqliteType?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    database?: string;
}) {
    const isFileSqlite = values.databaseType === "sqlite" && values.sqliteType === "file";

    return {
        dbType: values.databaseType || "",
        host: isFileSqlite ? "localhost" : (values.host || ""),
        port: isFileSqlite ? "0" : (values.port || ""),
        username: isFileSqlite ? "" : (values.username || ""),
        password: isFileSqlite ? "" : (values.password || ""),
        database: values.database || ""
    };
} 
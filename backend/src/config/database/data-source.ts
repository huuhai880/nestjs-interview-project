import { DataSourceOptions, DataSource } from "typeorm";


const MIGRATIONS_PATHDIR = 'dist/config/database/migrations/*{.ts,.js}';
const ENTITIES_PATHDIR = 'dist/**/*.entity.js';

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || "nestjs-interview",
    database: process.env.DB_NAME || "interview",
    migrations: [MIGRATIONS_PATHDIR],
    entities: [ENTITIES_PATHDIR],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

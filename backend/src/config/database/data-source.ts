import { DataSourceOptions, DataSource } from "typeorm";


const MIGRATIONS_PATHDIR = 'dist/config/database/migrations/*{.ts,.js}';
const ENTITIES_PATHDIR = 'dist/**/*.entity.js';

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "nestjs-interview",
    database: "interview",
    migrations: [MIGRATIONS_PATHDIR],
    entities: [ENTITIES_PATHDIR],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

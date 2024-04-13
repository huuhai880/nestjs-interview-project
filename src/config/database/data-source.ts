import { DataSourceOptions, DataSource } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "nestjs-interview",
    database: "interview",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/config/database/migrations/*{.ts,.js}'],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

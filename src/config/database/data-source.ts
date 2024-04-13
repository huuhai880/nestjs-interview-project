import { User } from "src/user/entities/user.entity";
import { DataSourceOptions, DataSource } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "nestjs-interview",
    database: "interview",
    migrations: ['dist/config/database/migrations/*{.ts,.js}'],
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    

}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

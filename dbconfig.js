// export POSTGRES_HOST=ep-blue-feather-a4ve7rp2.us-east-1.aws.neon 
// export POSTGRES_USER=default
// export POSTGRES_PASSWORD=xxxxx
// 

import { Sequelize } from "sequelize"

export const config = {
    host :process.env.PGHOST,
    database:process.env.PGDATABASE,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    port:5432,
    ssl: true
};

export const sequelize = new Sequelize(process.env.DB_CONN, {});

import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
import {ModelManager} from '../adapters/persistence/services/ModelManager';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
    }
);

const modelManager = new ModelManager(sequelize);

modelManager.initializeModels();
modelManager.associateModels();

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database authenticated successfully!');

        await sequelize.sync();
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Unable to connect to the database!');
        console.error(error);
        process.exit(1);
    }
}

export {sequelize, modelManager, initializeDatabase};

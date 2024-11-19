import {Sequelize} from 'sequelize';
import models from '../models';

export class ModelManager {
    private readonly sequelize: Sequelize;
    private readonly models: Record<string, any>;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.models = models;
    }

    initializeModels(): void {
        Object.values(this.models).forEach((model) => {
            if (model && typeof model.init === 'function') {
                model.init(this.sequelize);
            }
        });
    }

    associateModels(): void {
        Object.values(this.models).forEach((model) => {
            if (model && typeof model.associate === 'function') {
                model.associate(this.models);
            }
        });
    }
}

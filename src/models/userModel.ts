import { Model, DataTypes } from 'sequelize';
import { sequelizeDB } from '../data-access';

export class UserModel extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;
}

UserModel.init({
    id: {
        type: DataTypes.STRING(40),
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
}, {
    tableName: 'users',
    sequelize: sequelizeDB
});


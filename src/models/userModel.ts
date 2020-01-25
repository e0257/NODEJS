import { Model, DataTypes } from 'sequelize';
import { sequelizeDB } from '../data-access';
import { v4 as uuid } from 'uuid';

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
        type:DataTypes.STRING(32),
        allowNull: true
    },
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
}, {
    tableName: 'users',
    sequelize: sequelizeDB
});



(async () => {
    await sequelizeDB.sync();
    // The first table population
    // await UserModel.create({
    //     id: uuid(),
    //     login: 'user',
    //     password: 'user',
    //     age: 22,
    //     isDeleted: false,
    // });
    // await UserModel.create({
    //     id: uuid(),
    //     login: 'tester',
    //     password: 'tester',
    //     age: 26,
    //     isDeleted: false,
    // });
    // await UserModel.create({
    //     id: uuid(),
    //     login: 'boss',
    //     password: 'boss',
    //     age: 29,
    //     isDeleted: false,
    // });
})();

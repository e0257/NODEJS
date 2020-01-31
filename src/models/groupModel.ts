import { Model, DataTypes } from 'sequelize';
import { sequelizeDB } from '../data-access';
import { Permission } from '../DTO';

export class GroupModel extends Model {
    public id!: string;
    public name!: string;
    public permission!: Permission[];
}

GroupModel.init({
    id: {
        type: DataTypes.STRING(40),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    tableName: 'groups',
    sequelize: sequelizeDB
});

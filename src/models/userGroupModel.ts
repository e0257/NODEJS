import { Model, DataTypes } from 'sequelize';
import { sequelizeDB } from '../data-access';

export class UserGroupModel extends Model {
    public userId!: string;
    public groupId!: string;
}

UserGroupModel.init({
    userId: DataTypes.STRING,
    groupId: DataTypes.STRING
}, {
    tableName: 'user_group',
    sequelize: sequelizeDB
});

import { Model, DataTypes } from 'sequelize';
import { sequelizeDB } from '../data-access';
import { GroupModel } from './groupModel';
import { UserModel } from './userModel';

export class UserGroupModel extends Model {
    public userId!: string;
    public groupId!: string;
}

UserGroupModel.init({
    userId: {
        type: DataTypes.STRING,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.STRING,
        references: {
            model: GroupModel,
            key: 'id'
        }
    },
}, {
    tableName: 'user_group',
    sequelize: sequelizeDB
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userId', otherKey: 'groupId' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupId', otherKey: 'userId' });

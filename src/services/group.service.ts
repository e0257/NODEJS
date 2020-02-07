import { Op } from 'sequelize';
import { sequelizeDB } from '../data-access';
import { GroupModel, UserGroupModel } from '../models';
import { Group } from '../DTO';

class GroupService {
    createGroup(group: Group) {
        return GroupModel.create(group);
    }

    getAllGroups() {
        return GroupModel.findAll();
    }

    getGroupById(id: string) {
        return GroupModel.findOne({ where: { id } });
    }

    updateGroup(group: Group) {
        return GroupModel.update(group, { where: { id: group.id } });
    }

    deleteGroup(id: string) {
        return GroupModel.destroy({ where: { id } });
    }

    addUsersToGroup(groupId: string, userIds: string[]) {
        return sequelizeDB.transaction( async (t) => {
                // userIds.forEach( async (userId) => {
                //         await UserGroupModel.create({ groupId, userId }, { transaction: t })
                // });
                return Promise.all(userIds.map(userId =>
                    UserGroupModel.create({ groupId, userId }, { transaction: t })
                ))
        })
    }

    hasGroup(group: Partial<Group>) {
        return GroupModel.findOne({
            where: {
                [Op.or]: [{
                    name: group.name! || ''
                }, {
                    id: group.id! || ''
                }]
            }
        });
    }
}

export const groupService =  new GroupService();

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

    async addUsersToGroup(groupId: string, userIds: string[]) {
        const t = await sequelizeDB.transaction();
        try {
            await Promise.all(userIds.map(userId =>
                UserGroupModel.create({ groupId, userId }, { transaction: t })
            ));
            await t.commit();
        } catch (e) {
            await t.rollback();
            throw e;
        }
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

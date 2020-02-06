import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { groupService } from '../services';

class GroupController {

    async getAllGroups(req: Request, res: Response) {
        const groups = await groupService.getAllGroups();
        res.json(groups);
    }

    async getGroupById(req: Request, res: Response) {
        const group = await groupService.getGroupById(req.params.id);
        res.json(group);
    }

    async createGroup(req: Request, res: Response) {
        const id = uuid();
        const groupExists = await groupService.hasGroup(req.body);
        if (!groupExists) {
            await groupService.createGroup({ ...req.body, id });
            res.send(`Group was added with id: ${id}`);
        } else {
            res.send(`Group with name: "${req.body.name}" already exists`);
        }
    }

    async updateGroup(req: Request, res: Response) {
        const group = await groupService.hasGroup(req.body);
        if (group) {
            await groupService.updateGroup(req.body);
            res.send('Group was updated');
        } else {
            res.send(`Group is not found`);
        }
    }

    async deleteGroup(req: Request, res: Response) {
        const { id } = req.params;
        const group = await groupService.hasGroup({ id });
        if (group) {
            await groupService.deleteGroup(id);
            res.send('Group was deleted');
        } else {
            res.send('Group is not found');
        }
    }

    async addUsersToGroup(req: Request, res: Response) {
        const { groupId, userIds } = req.body;
        await groupService.addUsersToGroup(groupId, userIds);
        res.send('Users added');
    }
}

export default new GroupController();

import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { groupService } from '../services';
import { controllerLogger, logger } from '../config';

class GroupController {

    async getAllGroups(req: Request, res: Response) {
        try {
            const groups = await groupService.getAllGroups();
            res.json(groups);
        } catch (err) {
            logger.error('', controllerLogger('getAllGroups', err.message));
            res.status(500).send(err.message)
        }
    }

    async getGroupById(req: Request, res: Response) {
        try {
            const group = await groupService.getGroupById(req.params.id);
            res.json(group);
        } catch (err) {
            logger.error('', controllerLogger('getGroupById', err.message, req.params));
            res.status(500).send(err.message)
        }
    }

    async createGroup(req: Request, res: Response) {
        try {
            const id = uuid();
            const groupExists = await groupService.hasGroup(req.body);
            if (!groupExists) {
                await groupService.createGroup({ ...req.body, id });
                res.send(`Group was added with id: ${id}`);
            } else {
                res.send(`Group with name: "${req.body.name}" already exists`);
            }
        } catch (err) {
            logger.error('', controllerLogger('createGroup', err.message, req.body));
            res.status(500).send(err.message)
        }
    }

    async updateGroup(req: Request, res: Response) {
        try {
            const group = await groupService.hasGroup(req.body);
            if (group) {
                await groupService.updateGroup(req.body);
                res.send('Group was updated');
            } else {
                res.send(`Group is not found`);
            }
        } catch (err) {
            logger.error('', controllerLogger('updateGroup', err.message, req.body));
            res.status(500).send(err.message)
        }
    }

    async deleteGroup(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const group = await groupService.hasGroup({ id });
            if (group) {
                await groupService.deleteGroup(id);
                res.send('Group was deleted');
            } else {
                res.send('Group is not found');
            }
        } catch (err) {
            logger.error('', controllerLogger('deleteGroup', err.message, req.params));
            res.status(500).send(err.message)
        }
    }

    async addUsersToGroup(req: Request, res: Response) {
        const {groupId, userIds} = req.body;
        try {
            await groupService.addUsersToGroup(groupId, userIds);
            res.send('Users added');
        } catch (err) {
            logger.error('', controllerLogger('addUsersToGroup', err.message, req.body));
            res.send(err);
        }
    }
}

export default new GroupController();

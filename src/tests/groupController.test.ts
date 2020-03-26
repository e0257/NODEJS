import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import groupController from '../controllers/groupController';
import { GroupModel } from '../models';
import { groupService } from '../services';

describe('Group Controller', () => {
    let req: any;
    let res: any;
    beforeEach(() => {
        req = {
            body: {
                name: faker.name.findName(),
                permission: ['READ']
            },
            params: {
                id: faker.random.uuid()
            }
        };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        };
    });

    it('create group', async () => {
        const stub = sinon.stub(GroupModel, 'create').returns(req.body);
        await groupController.createGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel create').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.send.args[0][0], 'check response').to.include('Group was added with id');
        stub.restore();
    });

    it('create group error response', async () => {
        const stub = sinon.stub(GroupModel, 'create').throws('');
        await groupController.createGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel create').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.status.args[0][0], 'check status').to.be.equal(500);
        stub.restore();
    });

    it('get all groups', async () => {
        const result = [req.body];
        const stub = sinon.stub(GroupModel, 'findAll').returns(result as any);
        await groupController.getAllGroups(req, res);
        expect(stub.calledOnce, 'call GroupModel findAll').to.be.true;
        expect(res.json.calledOnce, 'call json ').to.be.true;
        expect(res.json.args[0][0], 'check response').to.equals(result);
        stub.restore();
    });


    it('get all groups error response', async () => {
        const stub = sinon.stub(GroupModel, 'findAll').throws('error');
        await groupController.getAllGroups(req, res);
        expect(stub.calledOnce, 'call GroupModel findAll').to.be.true;
        expect(res.send.calledOnce, 'call send ').to.be.true;
        expect(res.status.args[0][0], 'check status').to.equals(500);
        stub.restore();
    });

    it('get group by id', async () => {
        const result = req.body;
        const stub = sinon.stub(GroupModel, 'findOne').returns(result as any);
        await groupController.getGroupById(req, res);
        expect(stub.calledOnce, 'call GroupModel findOne').to.be.true;
        expect(res.json.calledOnce, 'call json ').to.be.true;
        expect(res.json.args[0][0], 'check response').to.equals(result);
        stub.restore();
    });

    it('get group by id error response', async () => {
        const stub = sinon.stub(GroupModel, 'findOne').throws('error');
        await groupController.getGroupById(req, res);
        expect(stub.calledOnce, 'call GroupModel findOne').to.be.true;
        expect(res.send.calledOnce, 'call send ').to.be.true;
        expect(res.status.args[0][0], 'check response').to.equals(500);
        stub.restore();
    });

    it('update group', async () => {
        const stub = sinon.stub(GroupModel, 'update').returns(req.body);
        const seviceStub = sinon.stub(groupService, 'hasGroup').returns(req.body);
        await groupController.updateGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel update').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.send.args[0][0], 'check response').to.include('Group was updated');
        seviceStub.restore();
        stub.restore();
    });

    it('update group error response', async () => {
        const stub = sinon.stub(GroupModel, 'update').throws('');
        const seviceStub = sinon.stub(groupService, 'hasGroup').returns(req.body);
        await groupController.updateGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel update').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.status.args[0][0], 'check status').to.be.equal(500);
        seviceStub.restore();
        stub.restore();
    });

    it('delete group', async () => {
        const stub = sinon.stub(GroupModel, 'destroy').returns(req.body);
        const seviceStub = sinon.stub(groupService, 'hasGroup').returns(req.body);
        await groupController.deleteGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel delete').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.send.args[0][0], 'check response').to.include('Group was deleted');
        seviceStub.restore();
        stub.restore();
    });

    it('delete group error response', async () => {
        const stub = sinon.stub(GroupModel, 'destroy').throws('');
        const seviceStub = sinon.stub(groupService, 'hasGroup').returns(req.body);
        await groupController.deleteGroup(req, res);
        expect(stub.calledOnce, 'call GroupModel delete').to.be.true;
        expect(res.send.calledOnce, 'call Send ').to.be.true;
        expect(res.status.args[0][0], 'check status').to.be.equal(500);
        seviceStub.restore();
        stub.restore();
    });
});


const { Task, User, Board, Status } = require('../models');

exports.loadAddTaskData = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: ['name', 'id'] });
        const boards = await Board.findAll({ attributes: ['name', 'id'] });
        const statuses = await Status.findAll({ attributes: ['name', 'id'] });
        res.json({ users, boards, statuses });
    } catch (err) {
        next(err);
    }
};

exports.saveTask = async (req, res, next) => {
    const { taskName, statusId, boardId, userId } = req.body;
    try {
        await Task.create({
            name: taskName,
            ['status_id']: statusId,
            ['board_id']: boardId,
            ['user_id']: userId,
        });
        return res.json({});
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.loadTasks = async (req, res, next) => {
    try {
        let tasks = await Task.findAll({});
        tasks = tasks.map(async (task) => {
            const user = await task.getUser({ attributes: ['name'] });
            const board = await task.getBoard({ attributes: ['name'] });
            const status = await task.getStatus({ attributes: ['name'] });
            return {
                name: task.name,
                user: user.dataValues.name,
                board: board.dataValues.name,
                status: status.dataValues.name,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            };
        });
        tasks = await Promise.all(tasks);
        res.json({ tasks });
    } catch (err) {
        next(err);
    }
};

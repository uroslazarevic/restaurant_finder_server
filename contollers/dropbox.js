const { dropboxApi } = require('../dropbox/index');

exports.authorize = async (req, res, next) => {
    try {
        const authUrl = await dropboxApi.onAuthorize();
        res.json({ authUrl });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        await dropboxApi.onLogout();
        res.json({});
    } catch (err) {
        next(err);
    }
};

exports.requestToken = async (req, res, next) => {
    try {
        const { code, state } = req.body;
        if (state !== dropboxApi.state) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const response = await dropboxApi.onRequestToken(code);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({ token: response });
    } catch (err) {
        next(err);
    }
};

exports.fileRequestList = async (req, res, next) => {
    const { accessToken } = req.body;
    try {
        const response = await dropboxApi.onFileRequestList(accessToken);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({ fileList: response });
    } catch (err) {
        next(err);
    }
};

exports.fileRequestGet = async (req, res, next) => {
    const { accessToken, id } = req.body;
    try {
        const response = await dropboxApi.onFileRequestGet(accessToken, id);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({ fileList: response });
    } catch (err) {
        next(err);
    }
};

exports.filesCreateFolder = async (req, res, next) => {
    const { accessToken, path } = req.body;
    try {
        const response = await dropboxApi.onFilesCreateFolder(accessToken, path);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({});
    } catch (err) {
        next(err);
    }
};

exports.createTaskFolder = async (req, res, next) => {
    const { accessToken, taskFolderPath } = req.body;
    try {
        const response = await dropboxApi.onCreateTaskFolder(accessToken, taskFolderPath);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({ response });
    } catch (err) {
        next(err);
    }
};

exports.filesUpload = async (req, res, next) => {
    const file = req.file;
    console.log('\n \n \n ', req.file, '\n \n \n');
    file.path = file.path.replace(/\\/g, '/');
    const { parentPath, accessToken } = req.body;
    try {
        const response = await dropboxApi.onFilesUpload(accessToken, parentPath, file);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        return res.json({});
    } catch (err) {
        next(err);
    }
};

exports.filesDownload = async (req, res, next) => {
    const { accessToken, path } = req.body;
    try {
        const response = await dropboxApi.onFilesDownload(accessToken, path);
        // If request fails
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }

        res.json({ name: response.name, binaryData: response.binaryData });
    } catch (err) {
        next(err);
    }
};

exports.filesDelete = async (req, res, next) => {
    const { accessToken, path } = req.body;
    try {
        const response = await dropboxApi.onFilesDelete(accessToken, path);
        if (response.code) {
            const error = new Error(response.message);
            error.statusCode = response.code;
            throw error;
        }
        res.json({ fileList: response });
    } catch (err) {
        next(err);
    }
};

const fs = require('fs');
const util = require('util');
const unlinkFileAsync = util.promisify(fs.unlink);

/**
 * Clear file when its uploaded to User Google Drive
 *  @param {string} filePath File path on server
 */

exports.clearFile = async (filePath) => {
    try {
        await unlinkFileAsync(filePath);
        return 'File deleted!';
    } catch (err) {
        return 'File already deleted.';
    }
};

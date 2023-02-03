const fs = require('fs');

/**
 * Tis is used to extract a name file from the given URL. 
 * You can customize it with different js string methods to get the result you want.
 * @param {string} value 
 * @returns file name
 */
const trimUrl = (value) => {
    let result = value.substring(
        (value.indexOf("/", 8) + 1), 
        value.lastIndexOf("/")
    );
    return result;
};

/**
 * It uses file system package to manage creation/removal of the main folders.
 * @param {int} screenshotWidth 
 */
const manageFolders = (screenshotWidth) => {
    if (!fs.existsSync(`./images`)) {
        fs.mkdirSync(`./images`);
    }
    if (fs.existsSync(`./images/${screenshotWidth}`)) {
        fs.rmSync(`./images/${screenshotWidth}`, { recursive: true, force: true });
    } 
    fs.mkdirSync(`./images/${screenshotWidth}`);
};

module.exports = { trimUrl, manageFolders};
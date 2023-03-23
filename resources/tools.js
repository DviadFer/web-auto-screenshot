const fs = require('fs');

/**
 * This function is used to extrect a project name from the first url given.
 * @param {string} value 
 * @returns project name
 */
const getProjectName = (value) => {
    let result = value.substring(
        (value.indexOf("/") + 2), 
        value.indexOf(".")
    );
    return result;
}

/**
 * This is used to extract a name file from the given URL. 
 * You can customize it with different js string methods to get the result you want.
 * @param {string} value 
 * @returns file name
 */
const trimUrl = (value) => {
    let result = value.substring(
        (value.lastIndexOf("/", (value.length - 1)) + 1), 
        value.lastIndexOf("/")
    );
    return result;
};

/**
 * It uses file system package to manage creation/removal of the main folders.
 * @param {int} screenshotWidth 
 */
const manageFolders = (project, screenshotWidth) => {
    if (!fs.existsSync(`./images`)) {
        fs.mkdirSync(`./images`);
    }
    if (!fs.existsSync(`./images/${project}`)) {
        fs.mkdirSync(`./images/${project}`);
    }
    if (fs.existsSync(`./images/${project}/${screenshotWidth}`)) {
        fs.rmSync(`./images/${project}/${screenshotWidth}`, { recursive: true, force: true });
    } 
    fs.mkdirSync(`./images/${project}/${screenshotWidth}`);
};

/**
 * It automates scroll until it reaches the bottom the page.
 * @param {object} page 
 */
 const autoScroll = async function (page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 200;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    window.scroll(0, 0);
                    resolve();
                }
            }, 400);
        });
    });
}

module.exports = { getProjectName, trimUrl, manageFolders, autoScroll};

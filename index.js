const puppeteer = require('puppeteer');
const fs = require('fs');

const resolution = Object.values(require('./resources/resolution.json').resolution);
const url = Object.values(require('./resources/url').url);

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
}

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
}

/**
 * Main function. Executes script.
 * It has hardcoded hints to monitor the whole process while executing it on the console.
 */
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Resolution folder loop
    for (const screenshotWidth of resolution) {
        await page.setViewport({
            width: screenshotWidth,
            height: 850, //This number is just a placeholder since it's required in setViewport and we use fullPage:true in page.screenshot()
        });
        manageFolders(screenshotWidth);
        process.stdout.write('Processing screenshots: [')
        //Screenshot file loop
        for (let [loopCount, value] of url.entries()) {
            let imageName = trimUrl(value);
            await page.goto(value);
            await page.screenshot({path: `./images/${screenshotWidth}/${loopCount + 1}-${(imageName != "/") ? imageName : "inicio"}.png`, fullPage: true});
            process.stdout.write(` ${loopCount + 1}`)
        }
        process.stdout.write(` ] - ¡Resolution ${screenshotWidth} completed!\n`)
    }
    process.stdout.write('¡ALL PROCESSES COMPLETED!')
    browser.close();
}

run();


const puppeteer = require('puppeteer');
const resolution = Object.values(require('./resources/resolution.json').resolution);
const url = Object.values(require('./resources/url').url);
const tools = require('./resources/tools');

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
            height: 850, //If you use fullPage:true in page.screenshot(), this number is just a placeholder since it's required in page.setViewport().
        });
        tools.manageFolders(screenshotWidth);
        process.stdout.write('Processing screenshots: [');
        //Screenshot file loop
        for (let [loopCount, value] of url.entries()) {
            let imageName = tools.trimUrl(value);
            await page.goto(value, {waitUntil: 'networkidle0'});
            await page.screenshot({path: `./images/${screenshotWidth}/${loopCount + 1}-${(imageName != "/") ? imageName : "inicio"}.png`, fullPage: true}); //Remove fullPage:true if you want static screenshots without scroll.
            process.stdout.write(` ${loopCount + 1}`);
        }
        process.stdout.write(` ] - ¡${screenshotWidth} resolution  completed!\n`);
    }
    process.stdout.write('¡ALL PROCESSES COMPLETED!');
    browser.close();
}

run();


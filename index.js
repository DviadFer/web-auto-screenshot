const puppeteer = require('puppeteer');
const fs = require('fs');

const resolution = Object.values(require('./resources/resolution.json').resolution);
const url = Object.values(require('./resources/url').url);

const trimUrl = (value) => {
    let result = value.substring(
        (value.indexOf("/", 8) + 1), 
        value.lastIndexOf("/")
    );

    return result;
}

async function run () {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const screeshotWidth of resolution) {
        await page.setViewport({
            width: screeshotWidth,
            height: 850,
        });

        if (fs.existsSync(`./images/${screeshotWidth}`)) {
            fs.rmSync(`./images/${screeshotWidth}`, { recursive: true, force: true });
        } 
        fs.mkdirSync(`./images/${screeshotWidth}`);
        
        for (let [loopCount, value] of url.entries()) {
            let imageName = trimUrl(value);

            console.log(imageName)
            await page.goto(value);
            await page.screenshot({path: `./images/${screeshotWidth}/${loopCount + 1}-${(imageName != "/") ? imageName : "inicio"}.png`, fullPage: true});
        }
    }
    
    browser.close();
}

run();


# Automated web screenshots

Automated script with NodeJs and Puppeteer that takes full-page screenshots of an entire website. Resolution of images customizable.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)

### Installation

A step by step guide on how to get a development environment running:

1. Clone the repository

```
git clone https://github.com/DviadFer/web-auto-screenshot.git
```

2. Install dependencies

```js
npm install
```

## Usage

Run `node index.js` in the console, pointing at the root directory of the repository. 

You can customize your website links within the array of `url.json` and width resolutions in `resolution.json`.

It will create an `images` folder where it will store all the screenshots in subdirectories named with the specified resolutions. Check the comments in `index.js` and `tool.js` inside resources folder for more information. 

> :heavy_check_mark: Open an issue if you need to raise any doubts or suggestions.

Also, make sure to check [this guide](https://screenshotone.com/blog/how-to-hide-cookie-banners-when-taking-a-screenshot-with-puppeteer/) if you need to implement code in order to **avoid cookies banners** in your screenshots.
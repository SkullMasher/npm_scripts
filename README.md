# npm_scripts
Set of npm_scripts to build and develop small website.

## How to use
```
npm start
```
```
npm run build
```

## Struture
	app
	npm_scripts
		start.js
		build.js
	package.json
 
**app :** This is where your happy app lives and grow. If you are searching for a developper you have 99% chance to find him here. These are the uncompiled source of the application.

**node_scripts :** Just like the node modules but for npm_scripts. This Folder contains all script that can be called by the package.json file. They can be in any langage you like. Curently I mostly NodeJS script to get better with this technology.

**start.js :** The purpose of this file is to start all the necesary action in order to start coding on the app. It usally lunch some kind of live reload server and your favorite browser that auto refresh when you press ctrl+s on your file editor. At eh moment this file also handle SASS file compilation and watch for .js and .html change. You can call this script by running **npm start** or **npm run start** at the root of your app in your terminal.

**build.js :** Prepare a folder or an archive for server ready deployement. Curently minify the css and js files through node-minify. **npm build** or **npm run build** in your terminal to use this file. By the end you will have a build or dist folder placed at the root of your app.

**package.json :** Adding a "scripts" section in this file alwoys you to setup actions to take when instaling or building an application. To know what you can do with it and see the reserved action like prebuild or preinstall are [follow the documentation](https://docs.npmjs.com/misc/scripts).

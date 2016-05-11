'use strict'
let Promise = require('bluebird')
let fs = Promise.promisifyAll(require('fs'))
let chalk = require('chalk')
let dateFormat = require('dateformat')
let sass = require('node-sass')
let bs = require('browser-sync').create()

// console.log for 1337 h4X0r
let log = console.log.bind(console)

// ISO date format to use for debuging
// let now = new Date()

// add a / at the end
let appFolderPath = 'app/'
let cssFolderName = 'css/'
let jsFolderName = 'js/'
let imgFolderName = 'css/'

// Greeting Message
var greetingMessage = function () {
  log(chalk.red('  #####   '))
  log(chalk.red(' #######  '))
  log(chalk.red('#  ###  # ') + chalk.grey(' The mighty Skull is starting your project.'))
  log(chalk.red('#   #   # '))
  log(chalk.red('######### ') + chalk.grey(' Happy coding !'))
  log(chalk.red(' ### ###  '))
  log(chalk.red('  #####   '))
  log(chalk.red('  # # #   ') + chalk.grey(' Play more, care less, be an heartless'))
}

let pathChecker = function () {
  fs.statAsync('app/keke.html').then(function (res) {
    log(res)
  })
  .catch(function (err) {
    log(err)
  })
}

pathChecker()

greetingMessage()

// Reload all browser on HTML change
bs.watch(appFolderPath + '*.html').on('change', function () {
  bs.notify("<span color='green'>HTML Reloaded</span>", 2000)
  bs.reload()
})

// Reload all browser on JS change
bs.watch(appFolderPath + 'js/**.js').on('change', function () {
  bs.notify("<span color='green'>JS Reloaded</span>", 2000)
  bs.reload()
})

// Specific compilation for SASS file
bs.watch(appFolderPath + 'sass/**.scss', function (event, file) {
  if (event === 'change') {
    sass.render({
      file: appFolderPath + 'sass/style.scss',
      outputStyle: 'expanded',
      outFile: appFolderPath + 'css/style.css',
      sourceMap: true
    }, function (error, result) {
      if (error) {
        // Pretty Debug Message on sass error

        let nowFormat = dateFormat(new Date(), 'HH:MM:ss')

        log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.file)
        log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + 'On line ' + chalk.red(error.line) + ' at column ' + chalk.red(error.column))
        log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.message)
      } else {
        // Creating css style files
        fs.writeFile( appFolderPath + 'css/style.css', result.css, function (err) {
          if (!err) {
            // Creating css map file
            fs.writeFile( appFolderPath + 'css/style.map.css', result.map, function (err) {
              if (!err) {
                let nowFormat = dateFormat(new Date(), '[HH:MM:ss]')
                log(nowFormat + chalk.green(' CSS Reloaded'))
                bs.notify("<span color='green'>CSS Reloaded</span>", 2000)
              } else {
                log(err)
              }
            })
          } else {
            log('error there')
            log(err)
          }
        })
        // Injecting the CSS change in BrowserSync
        bs.reload(appFolderPath + 'css/style.css')
      }
    })
  }
})

// Now init the Browsersync server
// bs.init({
//   server: './' + appFolderPath
// })

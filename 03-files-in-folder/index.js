const fs = require('fs')
const path = require('path')

function searchFiles(nameFolder) {
  fs.readdir(nameFolder, (err, data) => {
    if (err) throw err
    for (const file of data) {
      let curPath = path.join(nameFolder, file)
      fs.stat(curPath, (err, stats) => {
        if (!stats.isDirectory()) {
          console.log(
            `${path.basename(curPath, path.extname(curPath))} - ${path.extname(
              curPath
            )} - ${stats.size}b`
          )
        }
      })
    }
  })
}
searchFiles(path.join(__dirname, 'secret-folder'))
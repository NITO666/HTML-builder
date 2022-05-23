const path = require('path')
const fs = require('fs')

async function bundleCss() {
  const EXT_NAME = '.css'
  let arr = []
  fs.readdir(path.join(__dirname, 'styles'), async function (err, data) {
    if (err) throw err
    for (file of data) {
      const CURRENT_FILE_PATH = path.join(__dirname, 'styles', file)
      const CURRENT_FILE_STAT = await fs.promises.stat(CURRENT_FILE_PATH)
      if (
        path.extname(CURRENT_FILE_PATH) === EXT_NAME &&
        CURRENT_FILE_STAT.isFile()
      ) {
        const READ_STREAM = fs.ReadStream(CURRENT_FILE_PATH)
        let tempArr = await new Promise((resolve, reject) => {
          let array = []
          READ_STREAM.on('data', (data) => {
            array.push(data.toString())
          })
          READ_STREAM.on('end', () => {
            resolve(array)
          })
        })
        arr.push(...tempArr)
      }
    }
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      arr.join(''),
      (err) => {
        if (err) throw err
      }
    )
  })
}
bundleCss()
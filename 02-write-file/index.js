const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const rl = readline.createInterface({ input, output })
fs.writeFile(
    path.join(__dirname,'text.txt'),
    '',
    (err)=>{
        if (err) throw err
        console.log('Файл создан, теперь можно вводить текст')
    }
)
rl.on('line', (input) => {
    if (input.trim() === 'exit') {
      output.write('ББ')
      rl.close()
    } else {
      fs.appendFile(path.join(__dirname, 'text.txt'), input, (err) => {
        if (err) throw err
      })
    }
  })
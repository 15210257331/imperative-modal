import  copyDir from 'copy-dir'
/** 将src/doc 目录复制到 dist/doc的目录下 */
copyDir.sync(
  process.cwd() + '/src/doc/',
  process.cwd() + '/dist/doc',
  {
    utimes: true,
    mode: true,
    cover: true
  },
  function (err) {
    if (err) throw err
    console.log('done')
  }
)
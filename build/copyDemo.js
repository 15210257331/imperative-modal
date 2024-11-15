import copyDir from 'copy-dir'
/** 将src/views 目录复制到 dist/views的目录下 */
copyDir.sync(
  process.cwd() + '/src/views/',
  process.cwd() + '/dist/views',
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

const { exec } = require('child_process')
const { Client } = require('ssh2')
const ssh2Client = new Client()
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')

const questions = [
  {
    type: 'list',
    message: '请选择发布环境',
    name: 'env',
    choices: [
      {
        name: '本地环境',
        value: '本地环境'
      },
      {
        name: '正式环境',
        value: '正式环境'
      }
    ]
  },
  {
    type: 'input',
    name: 'username',
    message: '请输入服务器用户名:'
  },
  {
    type: 'password',
    name: 'password',
    message: '服务器密码:',
    mask: '*'
  }
]

inquirer.prompt(questions).then(answer => {
  console.log(`开始构建${answer.env}....`)
  const { evn, username, password } = answer
  if (evn === '本地环境') {
    console.log(chalk.green('敬请期待'))
  } else {
    const deployConfig = {
      projectName: 'vue3-dialog',
      type: 'docker',
      remoteDirectory: '/root/web',
      host: {
        host: '129.211.164.125', // 服务器 host
        port: 22, // 服务器 port
        username: username, // 服务器用户名
        password: password // 服务器密码
      }
    }
    const app = new App(deployConfig)
    app.deploy()
  }
})

class App {
  constructor(config) {
    this.config = config
  }

  async deploy() {
    try {
      await this.executeCommand('npm run build', '前端代码build')
      await this.executeCommand('tar -zcvf assets.tar.gz Dockerfile nginx.conf dist', '前端资源打包')
      await this.uploadProjectFile()
      await this.creatImage()
      await this.removeFile('assets.tar.gz')
    } catch (err) {
      console.log(chalk.red(err))
      process.exit(1)
    }
  }

  /**
   * 执行shell 命令
   * 当执行出错时，并不会触发.on(error) 时间
   * 会触发 exit 事件 但是退出码 为非0
   *  */
  executeCommand(command, description) {
    return new Promise(function (resolve, reject) {
      const childProcess = exec(command, (error, stdout, stderr) => {
        // console.log(`stdout: ${stdout}`)
        // console.error(`stderr: ${stderr}`)
      })
      // 将子进程的stdio 通过管道传递给当前进程，这样就会在控制台看到子进程的stdio信息，console.log 其实就是stdio的实现
      childProcess.stdout.pipe(process.stdout)
      // 监听进程的结束
      childProcess.on('exit', (code, signal) => {
        if (code === 0) {
          console.log(chalk.green(description + '步骤执行成功！'))
          resolve(true)
        } else {
          reject(description + '步骤执行失败！')
        }
      })
    })
  }

  // 上传文件到服务器
  uploadProjectFile() {
    return new Promise((resolve, reject) => {
      ssh2Client
        .on('ready', () => {
          ssh2Client.sftp((err, sftp) => {
            if (err) {
              reject(err)
            }
            sftp.fastPut(
              './assets.tar.gz',
              path.join(this.config.remoteDirectory, 'assets.tar.gz'),
              {},
              (error, result) => {
                if (error) {
                  reject(error)
                }
                console.log(chalk.green('前端资源上传服务器完成!'))
                resolve(true)
              }
            )
          })
        })
        .connect(this.config.host)
    })
  }

  // 构建镜像
  creatImage() {
    const projectName = this.config.projectName
    const shell = `
        cd /root/web
        if [ ! -d ${projectName}  ];then
          mkdir ${projectName}
        else
          rm -rf ./${projectName}/*
        fi
        tar -zxvf assets.tar.gz -C ./${projectName}
        rm -rf assets.tar.gz
        ls
        cd ${projectName}
        sudo docker stop ${projectName} || true
        sudo docker rm  ${projectName} || true
        sudo docker rmi  ${projectName} || true
        sudo docker build -t  ${projectName} .
        sudo docker run -d -p 8888:8888 --name ${projectName} ${projectName}
        docker ps
        exit
      `
    return new Promise((resolve, reject) => {
      ssh2Client.shell((err, stream) => {
        if (err) {
          reject(err)
        }
        stream
          .end(shell)
          .on('data', data => {
            console.log(data.toString())
          })
          .on('close', () => {
            ssh2Client.end()
            console.log(chalk.green('镜像构建完成!'))
            resolve()
          })
      })
    })
  }

  // 删除文件
  removeFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.unlink(fileName, function (error) {
        if (error) {
          reject(error)
        } else {
          console.log(chalk.green('本地压缩包删除成功，部署流程完成'))
          resolve(true)
        }
      })
    })
  }
}

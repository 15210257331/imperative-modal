const { exec } = require('child_process')
const { Client } = require('ssh2')
const ssh2Client = new Client()
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')

const environments = [
  {
    name: '测试环境1:129.211.164.125', // 环境名称
    appName: 'grocery', // 应用名称
    mode: 'docker',
    target: '/root/web',
    host: '129.211.164.125', // 服务器 host
    port: 22 // 服务器 port
  },
  {
    name: '测试环境2:140.143.168.25',
    appName: 'grocery', // 应用名称
    mode: 'docker',
    target: '/root/web',
    host: '140.143.168.25', // 服务器 host
    port: 22 // 服务器 port
  }
]

const question1 = [
  {
    type: 'list',
    message: '请选择发布环境',
    name: 'environment',
    choices: environments.map(item => {
      return {
        name: item.name,
        value: item.name
      }
    })
  }
]

const question2 = [
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

const start = async () => {
  const { environment } = await inquirer.prompt(question1)
  const { username, password } = await inquirer.prompt(question2)
  const config = environments.find(item => item.name === environment)
  const app = new App({ ...config, username, password })
  app.deploy()
}

start()
class App {
  constructor(config) {
    this.config = config
  }

  async deploy() {
    try {
      chalk.green('开始部署。。。')
      await this.executeCommand('npm run build:doc', '前端代码build')
      await this.executeCommand('tar -zcvf assets.tar.gz Dockerfile nginx.conf dist', '前端静态资源打包')
      await this.uploadProjectFile()
      await this.createImage()
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
    const { target, host, port, username, password } = this.config
    return new Promise((resolve, reject) => {
      ssh2Client
        .on('ready', () => {
          ssh2Client.sftp((err, sftp) => {
            if (err) {
              reject(err)
            }
            sftp.fastPut('./assets.tar.gz', path.join(target, 'assets.tar.gz'), {}, (error, result) => {
              if (error) {
                reject(error)
              }
              console.log(chalk.green('前端资源上传服务器完成!'))
              resolve(true)
            })
          })
        })
        .connect({ host, port, username, password })
    })
  }

  // 构建镜像
  createImage() {
    const { appName } = this.config
    const shell = `
        cd /root/web
        if [ ! -d ${appName}  ];then
          mkdir ${appName}
        else
          rm -rf ./${appName}/*
        fi
        tar -zxvf assets.tar.gz -C ./${appName}
        rm -rf assets.tar.gz
        ls
        cd ${appName}
        sudo docker stop ${appName} || true
        sudo docker rm  ${appName} || true
        sudo docker rmi  ${appName} || true
        sudo docker build -t  ${appName} .
        sudo docker run -d -p 8080:80 --name ${appName} ${appName}
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

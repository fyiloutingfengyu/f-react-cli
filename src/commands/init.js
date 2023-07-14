import inquirer from 'inquirer';
import ora from 'ora';
import download from 'download-git-repo';
import path from 'path';
import chalk from 'chalk';

export default (program) => {
  program.command('create <project>')
    .alias('init')
    .description('创建一个新项目')
    .action((project) => {
      inquirer.prompt([
        {
          name: 'author',
          message: '你的名字是：',
          type: 'input'
        },
        {
          name: 'template',
          message: '请选择要使用的项目模板',
          type: 'list',
          choices: [
            'react-cli',
            'react-webpack'
          ]
        }
      ]).then(answer => {
        console.log('answer', answer);

        const spinner = ora().start();
        spinner.text = '模板项目正在下载中...';

        const downloadPath = path.join(process.cwd(), project);
        console.log(downloadPath);

        let repository = 'fyiloutingfengyu/f-react-template';

        if (answer.template === 'react-webpack') {
          repository = 'fyiloutingfengyu/f-react-template-webpack';
        }

        download(repository, downloadPath, (error) => {
          if (!error) {
            spinner.succeed(chalk.green.bold('模板项目下载成功！'));
            console.log(chalk.blue.bold('项目已经准备就绪! 你可以运行：'));
            console.log(chalk.yellow('cd ' + project));
            console.log(chalk.yellow('npm install '));
            console.log(chalk.yellow('npm run dev'));
          } else {
            spinner.fail('模板项目下载失败！');
          }
        });

      });
    });
}

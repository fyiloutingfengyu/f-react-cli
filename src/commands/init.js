import inquirer from 'inquirer';
import ora from 'ora';
import download from 'download-git-repo';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import handlebars from 'handlebars';
import templateConfig from '../config/template.js';
import promptConfig from '../config/prompt.js';

export default (program) => {
  program.command('create <projectName>')
    .alias('init')
    .description('创建一个新项目')
    .action((projectName) => {
      inquirer.prompt(promptConfig).then(async answer => {
        const { author, description, template } = answer;
        const packageOptions = {
          name: projectName,
          author,
          description
        };

        const downloadPath = path.join(process.cwd(), projectName);

        // 判断用户创建的项目文件夹是否已经存在
        if (fs.existsSync(downloadPath)) {
          console.log(logSymbols.info, chalk.blue(`文件夹 ${projectName} 已经存在！`));
          try {
            // 询问用户是否覆盖当前文件夹的内容，yes-覆盖，no-退出
            const { isCover } = await inquirer.prompt([
              {
                name: 'isCover',
                message: '是否要覆盖当前文件夹的内容',
                type: 'confirm'
              }
            ]);

            if (!isCover) {
              return;
            }
          } catch (error) {
            console.log(logSymbols.error, chalk.red('项目初始化失败，已退出!'));
            return;
          }
        }

        const spinner = ora().start();
        spinner.text = '模板项目正在下载中...';

        const repository = templateConfig.repositories[template];

        download(repository, downloadPath, (error) => {
          if (!error) {
            const targetPackageFile = `${projectName}/package.json`;

            if (fs.pathExistsSync(targetPackageFile)) {
              const content = fs.readFileSync(targetPackageFile, 'utf8');
              // 利用 handlebars 将用户输入的部分内容写入模板中
              const result = handlebars.compile(content)(packageOptions);

              fs.writeFileSync(targetPackageFile, result);
            } else {
              console.log(chalk.red(`package.json 文件不存在：${targetPackageFile}`));
            }

            spinner.succeed(chalk.green.bold('模板项目下载成功！'));
            console.log(chalk.blue.bold('项目已经准备就绪! 你可以运行：'));
            console.log(chalk.yellow(`cd ${projectName}`));
            console.log(chalk.yellow('npm install'));
            console.log(chalk.yellow('npm run dev'));
          } else {
            spinner.fail('模板项目下载失败！');
          }
        });

      });
    });
}

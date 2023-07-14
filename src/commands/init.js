import inquirer from 'inquirer';

export default (program) => {
  program.command('create <projectName>')
    .alias('init')
    .description('创建一个新项目')
    .action(() => {
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
      });
    });
}

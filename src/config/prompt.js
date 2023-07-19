import templateConfig from './template.js';

export default [
  {
    name: 'author',
    message: '你的名字是：',
    type: 'input'
  },
  {
    name: 'description',
    message: '项目描述：',
    type: 'input'
  },
  {
    name: 'template',
    message: '请选择要使用的项目模板：',
    type: 'list',
    choices: templateConfig.names
  }
]

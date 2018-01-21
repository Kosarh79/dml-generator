const fs = require('fs');
const cmd = require('commander');
const {prompt} = require('inquirer');
const questions = [
  {
    type: 'input',
    name: 'ticketNumber',
    message:'Enter the ticket number ...'
  },
  {
    type: 'input',
    name: 'dueDate',
    message:'Enter the ticket due date ...'
  },
  {
    type: 'input',
    name: 'username',
    message:'Enter you username ...'
  },
  {
    type: 'input',
    name: 'templatePresId',
    message:'Enter the template presentation id ...'
  },
  {
    type: 'input',
    name: 'newpresId',
    message:'Enter the new presentation id ...'
  },
  {
    type: 'input',
    name: 'newPresName',
    message:'Enter the new presentation name ...'
  },
];
cmd.name('Vega')
  .version('0.0.1')
  .description('Generate DMl, DLP with all the fun you have!');

cmd.command('gen-dml')
  .alias('dml')
  .description('Generate a DML file')
  .action(() => {
    prompt(questions).then((answers) => {
      console.log(answers);
    })
  });
cmd.parse(process.argv);

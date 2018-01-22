const fs = require('fs');
const cmd = require('commander');
const {prompt} = require('inquirer');
const genFileName = function(ticketNumber, newPresName){
  return `1__ABT_MAIN__iss${ticketNumber}__DML__${newPresName}`;
}
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
      let fileName = genFileName(answers.ticketNumber, answers.newPresName);
      let dueDate = answers.dueDate;
      if(!new Date(dueDate)) throw new Error('Due date is not a valid date!');
      let dueYear = new Date(dueDate).getfullYear();
      fs.readFile('./assets/dml.txt', 'utf8', (err, data) => {
        data = data.replace(/{{ticketNumber}}/g, answers.ticketNumber);
        data = data.replace('{{dueDate}}', answers.dueDate);
        data = data.replace('{{dueYear}}', dueYear);
        data = data.replace('{{username}}', answers.username);
        data = data.replace('{{templatePresId}}', answers.templatePresId);
        data = data.replace('{{newpresId}}', answers.newpresId);
        data = data.replace(/{{newPresName}}/g, answers.newPresName);
        data = data.replace('{{fileName}}', fileName);
        fs.writeFile(`${fileName}.sql`, data, (err) => {
          if(err) throw err;
          console.log('Done! go get it.');
        });
      });
    });
  });
cmd.parse(process.argv);

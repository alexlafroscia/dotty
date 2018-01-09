#!/usr/bin/env node

const path = require('path');
const process = require('process');
const fs = require('fs');

const Listr = require('listr');
const yargs = require('yargs');

const Task = require('./lib/task');
const sortTasks = require('./lib/sort-tasks');

function main(taskDirectory) {
  const configDirectory = path.resolve(process.cwd(), taskDirectory);

  const tasks = fs.readdirSync(configDirectory).map(file => {
    const generateConfig = require(path.join(configDirectory, file));
    const Klass = generateConfig(Task);

    return new Klass();
  });
  const sortedTasks = sortTasks(tasks);

  const listrTasks = new Listr(
    sortedTasks.map(task => ({
      title: task.programName,
      task: () => {
        return new Listr(task.toListrTasks());
      }
    }))
  );

  return listrTasks.run();
}

const args = yargs
  .command('$0 <taskDirectory>', 'run configuration tasks', yargs => {
    yargs.positional('taskDirectory', {
      type: 'string',
      describe: 'path to the task directory'
    });
  })
  .help().argv;

main(args.taskDirectory);

module.exports = main;

#!/usr/bin/env node

const path = require('path');
const process = require('process');
const fs = require('fs');

const Listr = require('listr');

const Task = require('./lib/task');
const sortTasks = require('./lib/sort-tasks');

const taskDirectory = process.argv[2] || 'tasks';
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

listrTasks.run();

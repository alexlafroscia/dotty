const { default: DAGMap } = require('dag-map');

function sortTasks(tasks) {
  const sortedTasksMap = new DAGMap();
  const sortedTasks = [];

  for (const task of tasks) {
    sortedTasksMap.add(task.programName, task, [], task.dependencies);
  }

  sortedTasksMap.each((key, val) => {
    sortedTasks.push(val);
  });

  return sortedTasks;
}

module.exports = sortTasks;

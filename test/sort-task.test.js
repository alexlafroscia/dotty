import test from 'ava';
import Task from '../lib/task';
import sortTasks from '../lib/sort-tasks';

test('it can sort tasks based on dependencies (string)', t => {
  class TaskOne extends Task {
    constructor() {
      super();
      this.programName = 'foo';
      this.dependencies = 'bar';
    }
  }

  class TaskTwo extends Task {
    constructor() {
      super();
      this.programName = 'bar';
    }
  }

  const taskOne = new TaskOne();
  const taskTwo = new TaskTwo();
  const sortedTasks = sortTasks([taskOne, taskTwo]);

  t.deepEqual(sortedTasks, [taskTwo, taskOne]);
});

test('it can sort tasks based on dependencies (array)', t => {
  class TaskOne extends Task {
    constructor() {
      super();
      this.programName = 'foo';
      this.dependencies = ['bar'];
    }
  }

  class TaskTwo extends Task {
    constructor() {
      super();
      this.programName = 'bar';
    }
  }

  const taskOne = new TaskOne();
  const taskTwo = new TaskTwo();
  const sortedTasks = sortTasks([taskOne, taskTwo]);

  t.deepEqual(sortedTasks, [taskTwo, taskOne]);
});

import test from 'ava';
import Task from '../../../lib/task';

test('the step is enabled if the `configure` hook is defined', t => {
  class SomeTask extends Task {
    configure() {}
  }

  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  t.truthy(tasks[2].enabled());
});

test('the step is disabled if the `configure` hook is not defined', t => {
  class SomeTask extends Task {}

  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  t.falsy(tasks[2].enabled());
});

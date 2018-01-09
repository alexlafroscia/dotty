import test from 'ava';
import Task from '../../../lib/task';

test('the `update` task is enabled if the hook is defined', t => {
  class SomeTask extends Task {
    update() {}
  }

  const instance = new SomeTask();
  t.truthy(instance.toListrTasks()[2].enabled());
});

test('the `update` task is disabled if the hook is not defined', t => {
  const instance = new Task();
  t.falsy(instance.toListrTasks()[2].enabled());
});

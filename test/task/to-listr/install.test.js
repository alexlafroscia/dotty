import test from 'ava';
import Task from '../../../lib/task';

test('skips the step if `install` is not defined', t => {
  class SomeTask extends Task {}

  const instance = new SomeTask();
  const tasks = instance.toListrTasks();
  const enabled = tasks[0].enabled();

  t.falsy(enabled);
});

test('it skips step if `checkInstallation` returns something truthy', async t => {
  let installCalled = false;

  class SomeTask extends Task {
    checkInstallation() {
      return true;
    }

    install() {
      installCalled = true;
    }
  }

  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  await tasks[0].task({}, { skip() {} });

  t.falsy(installCalled);
});

test('it calls step if `checkInstallation` returns something falsy', async t => {
  let installCalled = false;

  class SomeTask extends Task {
    checkInstallation() {
      return false;
    }

    install() {
      installCalled = true;
    }
  }

  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  await tasks[0].task({}, { skip() {} });

  t.truthy(installCalled);
});

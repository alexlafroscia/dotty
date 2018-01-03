import test from 'ava';
import Task from '../../../lib/task';

test('it skips the step if `afterInstall` is not defiend', async t => {
  class SomeTask extends Task {
    checkInstallation() {
      return false;
    }

    install() {}
  }

  const listerContext = {};
  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  await tasks[0].task(listerContext);

  const postInstallEnabled = await tasks[1].enabled(listerContext);

  t.falsy(postInstallEnabled);
});

test('it skips the step if `install` is not defiend', async t => {
  class SomeTask extends Task {
    checkInstallation() {
      return false;
    }
  }

  const listerContext = {};
  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  const postInstallEnabled = await tasks[1].enabled(listerContext);

  t.falsy(postInstallEnabled);
});

test('it enables the step if installation was performed', async t => {
  class SomeTask extends Task {
    checkInstallation() {
      return false;
    }

    install() {}
    afterInstall() {}
  }

  const listerContext = {};
  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  await tasks[0].task(listerContext);

  const postInstallEnabled = await tasks[1].enabled(listerContext);

  t.truthy(postInstallEnabled);
});

test('it skips the step if installation was skipped', async t => {
  class SomeTask extends Task {
    checkInstallation() {
      return true;
    }

    install() {}
    afterInstall() {}
  }

  const listerContext = {};
  const instance = new SomeTask();
  const tasks = instance.toListrTasks();

  await tasks[0].task(listerContext, { skip() {} });

  const postInstallEnabled = await tasks[1].enabled(listerContext);

  t.falsy(postInstallEnabled);
});

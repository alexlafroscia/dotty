const path = require('path');
const fs = require('fs');
const os = require('os');
const execa = require('execa');

function hookIsDefined(instance, hook) {
  return instance[hook] !== Task.prototype[hook];
}

class Task {
  constructor() {
    const home = os.homedir();
    this.directories = {
      home,
      dotfiles: path.join(home, '.dotfiles')
    };

    this.dependencies = [];

    this.execa = execa;
  }

  /**
   * Generates the structure that Listr will use to run the task
   *
   * @private
   */
  toListrTasks() {
    return [
      {
        title: 'Installing',
        enabled: () => hookIsDefined(this, 'install'),
        task: async (ctx, task) => {
          const alreadyInstalled = await this.checkInstallation();

          if (alreadyInstalled) {
            return task.skip('Program already installed');
          }

          await this.install();

          ctx.installPerformed = true;
        }
      },
      {
        title: 'Configuring',
        enabled: () => hookIsDefined(this, 'configure'),
        task: () => {
          return this.configure();
        }
      },
      {
        title: 'Updating',
        enabled: () => hookIsDefined(this, 'update'),
        task: () => {
          return this.update();
        }
      }
    ];
  }

  /* Utilities */

  /**
   * Run a shell command
   *
   * @param {string} command
   * @return {Promise<string>} the STDOUT from the command
   */
  exec(command) {
    return this.execa.shell(command);
  }

  /**
   * Check if a program exists, giving the location if available
   *
   * @param {string} program the name of the program to find
   * @return {Promise<string>} the location of the program, or `undefined`
   */
  which(program) {
    return this.exec(`which ${program}`)
      .then(({ stdout }) => stdout.trim())
      .catch(() => undefined);
  }

  /**
   * Check if a path exists
   *
   * @param {string} ...parts
   * @return {boolean}
   */
  exists(...parts) {
    const fullPath = path.join(...parts);

    return fs.existsSync(fullPath);
  }

  /* Lifecycle Hooks */

  /**
   * Check if it is necessary to perform installation
   *
   * Should resolve to a truthy value if installation should be skipped
   *
   * @returns {Pronise<boolean>}
   */
  async checkInstallation() {
    return false;
  }

  /**
   * Run installation commands
   *
   * Only called if `checkInstallation` resolved to something falsey
   *
   * @returns {Promise}
   */
  async install() {}

  /**
   * Run update commands
   *
   * Always called, so be mindful of long-running async tasks
   *
   * @returns {Promise}
   */
  async update() {}
}

module.exports = Task;

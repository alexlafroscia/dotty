const path = require('path');
const fs = require('fs');
const execa = require('execa');

class Task {
  constructor() {
    const home = '/Users/alafroscia';
    this.directories = {
      home,
      dotfiles: path.join(home, '.dotfiles')
    };

    this.dependencies = [];

    this.execa = execa;
  }

  toListrTasks() {
    return [
      {
        title: 'Installing',
        enabled: () => this.install,
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
        title: 'Post-Install',
        enabled: ctx => this.afterInstall && ctx.installPerformed,
        task: () => {
          return this.afterInstall();
        }
      },
      {
        title: 'Configuring',
        enabled: () => this.configure,
        task: () => {
          return this.configure();
        }
      }
    ];
  }

  /** Utilities */

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

  /** Lifecycle Hooks */

  checkInstallation() {
    return false;
  }
}

module.exports = Task;

module.exports = function(Task) {
  return class Homebrew extends Task {
    constructor() {
      super();

      this.programName = 'brew';
    }

    checkInstallation() {
      return this.which('brew');
    }

    install() {
      return this.exec(
        '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
      );
    }
  };
};

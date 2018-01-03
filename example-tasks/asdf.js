module.exports = function(Task) {
  return class Homebrew extends Task {
    constructor() {
      super();

      this.programName = 'asdf';
    }

    checkInstallation() {
      return this.which('asdf');
    }

    install() {
      return this.exec(
        `git clone https://github.com/asdf-vm/asdf.git ${
          this.directories.home
        }/.asdf --branch v0.4.1`
      );
    }
  };
};

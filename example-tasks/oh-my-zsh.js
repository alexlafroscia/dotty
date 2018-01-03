module.exports = function(Task) {
  return class Homebrew extends Task {
    constructor() {
      super();

      this.programName = 'oh-my-zsh';
    }

    checkInstallation() {
      return this.exists(this.directories.home, '.oh-my-zsh');
    }

    install() {
      return this.exec('curl -L http://install.ohmyz.sh | sh');
    }

    afterInstall() {
      return this.exec(
        `rm ${this.directories.home}/.oh-my-zsh/themes/pure.zsh-theme`
      );
    }
  };
};

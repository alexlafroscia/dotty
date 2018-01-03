module.exports = function(Strategy) {
  return class Homebrew extends Strategy {
    constructor() {
      super();

      this.programName = 'zsh';
      this.dependencies = ['brew', 'oh-my-zsh'];
    }

    checkInstallation() {
      return this.which('zsh');
    }

    install() {
      return this.exec('brew install zsh');
    }

    /**
     * Copy ZSH config into home directory
     */
    configure() {
      return this.exec(
        `ln -sf ${this.directories.dotfiles}/zsh/zshrc ${
          this.directories.home
        }/.zshrc`
      );
    }
  };
};

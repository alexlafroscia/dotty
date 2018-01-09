# dotty
[![Build Status](https://travis-ci.org/alexlafroscia/dotty.svg?branch=master)](https://travis-ci.org/alexlafroscia/dotty)
[![npm version](https://badge.fury.io/js/%40alexlafroscia%2Fdotty.svg)](https://badge.fury.io/js/%40alexlafroscia%2Fdotty)

A tool for declaratively managing your command line tools and configuration

## The Problem

I had a few computers that I do development work on, and it was a annoying to keep them in sync. I wanted a way to script installing and configuring my tools, but lacked tooling in pure shell scripting with the level of polish I desired. I knew I could build the tool I wanted using Node.js, so... here's `dotty`!

## Installation

On a system that already has Node installed, you can grab `dotty` as an NPM package from `@alexlafroscia/dotty`. If you're setting it up on a new machine, a [`pkg`][pkg]-built binary can be found on the *Releases* tab.

## Usage

### Defining tasks

A `dotty` task looks something like this:

```javascript
// tasks/brew.js
module.exports = function(Task) {
  return class Homebrew extends Task {
    constructor() {
      super();

      // Set the name of the program being installed
      this.programName = 'brew';
    }

    /**
     * Check if the program needs to be installed
     */
    checkInstallation() {
      return this.which('brew');
    }

    /**
     * Install the program
     */
    install() {
      return this.exec(
        '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
      );
    }
  };
};
```

Check out the `example-tasks` directory for more examples that show off the full set of hooks available. The [`Task` source code][task-source] has additional information on the available hooks and how they interact with each other.

### Running tasks

You can invoke `dotty` like so:

```bash
dotty path/to/tasks/directory
```

I recommend keeping your tasks in a location where they can easily be synchronized between all of your machines, such as a `dotfiles` repo, iCloud or Dropbox.  For example, on my machine, synchronizing a new machine looks like:


```bash
dotty $DOTFILES/tasks
```

since `$DOTFILES` is aliased to my dotfiles directory.

[pkg]: https://www.npmjs.com/package/pkg
[task-source]: lib/task.js

# Sports Log

Sports Log is a personal sports log hosted that can be hosted on your [Cozy](https://cozy.io) or [Node.js](https://nodejs.org) server. It gives you a unique place where to store your sports sessions, follow your evolution...

# How to install Sports Log in my Cozy instance?

If you already have a Cozy instance setup, then you ~~can~~ will be able to install Sports Log either
from the Marketplace or by hopping on the machine and running the following
command:

```cozy-monitor install sportslog -r https://github.com/nicodel/sportslog```

# How to install Sports Log on a Node server?

Sports Log can run in a [Node.js](https://nodejs.org) server. To do so, run the following
command:

```git clone https://github.com/nicodel/sportslog
cd sportslog
npm install
npm start
```

## Hack

If you want to hack on Sports Log, be sure to have installed [Mocha](https://mochajs.org) on your
machine. It is used fot testing.

```npm install -g mocha```

(of course, install dependencies for the application)

```npm install```

Then you can start Sports Log this way:

```npm start```

### Can i propose a pull request?

Oh yeah, that'd be awesome! If you think about it, create a branch on your fork
and if you feel like sending a pull request, please propose to merge into the
`incoming` branch (not `master`). Then I'll give it a look and will most
certainly accept it!

## What is Cozy?

![Cozy Logo](https://raw.github.com/cozy/cozy-setup/gh-pages/assets/images/happycloud.png)

[Cozy](https://cozy.io) is a platform that brings all your web services in the
same private space.  With it, your web apps and your devices can share data
easily, providing you with a new experience. You can install Cozy on your own
hardware where no one profiles you.

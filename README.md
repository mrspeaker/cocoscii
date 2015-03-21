# Cocoscii

Javascript (ES2015) version of the incredibly neat-o [ASCIImage](https://github.com/cparnot/ASCIImage) by Charles Parnot!

This version by Mr Speaker. Usage looks like this:

      const closeImg = cocoscii(`
        · · · · 1 1 1 · · · ·
        · · 1 · · · · · 1 · ·
        · 1 · · · · · · · 1 ·
        1 · · 2 · · · 3 · · 1
        1 · · · · · · · · · 1
        1 · · · · · · · · · 1
        1 · · · · · · · · · 1
        1 · · 3 · · · 2 · · 1
        · 1 · · · · · · · 1 ·
        · · 1 · · · · · 1 · ·
        · · · 1 1 1 1 1 · · ·
    `, (idx, style) => {

      if (idx === 0) {
        style.fill = "#000";
      } else {
        style.stroke = "#fff";
      }

    });

Produces images like:

![closeicon](https://cloud.githubusercontent.com/assets/129330/6765643/432159c6-cfc0-11e4-80e5-5c7e2071b0a1.png)
![lockicon](https://cloud.githubusercontent.com/assets/129330/6767176/cd748e3e-cff9-11e4-8ed7-d8b5467a8bfb.png)

## TODO:

* fix stroke overlapping canvas edges
* lock image stoke incorrect
* implement "ASCIIContextShouldClose"
* I just hacked this together in a hour, so... prolly lots more!

## Building

No dependencies, so run in a ES2015-y browser - otherwise, build with `jspm`:

    jspm install

This project uses the `Babel` transpiler, but `Traceur` should work too. The only important file is `src/cocoscii.js`.


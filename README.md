# Cocoscii

This is a javascript (ES2015) version of yesterday's neat-o hack [ASCIImage](http://asciimage.org/) by Charles Parnot. ASCIImage lets you create icons by defining some control points for drawing lines, paths, and circles. You can also style each shape individually. [Read all about the original project](http://cocoamine.net/blog/2015/03/20/replacing-photoshop-with-nsstring/), then come back here.

This is the JavaScript version by Mr Speaker, and creates standard DOM images (see [cocoscii.js](https://github.com/mrspeaker/cocoscii/blob/master/src/cocoscii.js) for the ES6). Usage looks like this:

      const closeImg = cocoscii(`
        · · · · 1 1 1 · · · ·
        · · 1 · · · · · 1 · ·
        · 1 · · · · · · · 1 ·
        1 · · 2 · · · 3 · · 1
        1 · · · # · # · · · 1
        1 · · · · # · · · · 1
        1 · · · # · # · · · 1
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

This produces images like:

![closeicon](https://cloud.githubusercontent.com/assets/129330/6765643/432159c6-cfc0-11e4-80e5-5c7e2071b0a1.png)
![lockicon](https://cloud.githubusercontent.com/assets/129330/6767176/cd748e3e-cff9-11e4-8ed7-d8b5467a8bfb.png)

The format is pretty funny: and a bit complicated to start with - so go read the original docs! The basics are, you fill a grid with the ordered markers `123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz`. Any other characters are ignored.

If the numbers are sequential, they become a path. If you skip a number, then a new path starts. If a number is repeated twice, it becomes a line. If a number is repeated more than twice, it becomes a circle that fits inside the bounding box of all the points.

The callback function is called once per defined shape. You can use that to alter the fillStyle, strokeStyle, and lineWidth for each shape. 

## TODO:

* implement "ASCIIContextShouldClose"
* layers!

## Building

No dependencies, so run in a ES2015-y browser - otherwise, build with `jspm`:

    jspm install

This project uses the `Babel` transpiler, but `Traceur` should work too. The only important file is `src/cocoscii.js`.


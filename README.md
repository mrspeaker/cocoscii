# Cocoscii

Javascript version of https://github.com/cparnot/ASCIImage.
by Mr Speaker

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
    `, (idx, dict) => {

      if (idx === 0) {
        dict.fill = "#000";
      } else {
        dict.stroke = "#fff";
      }

    });
    
Produces images like:

![closeicon](https://cloud.githubusercontent.com/assets/129330/6765643/432159c6-cfc0-11e4-80e5-5c7e2071b0a1.png)
![lockimage](https://cloud.githubusercontent.com/assets/129330/6765644/452c24da-cfc0-11e4-8b56-c6eccb8f2116.png)

## TODO:

* fix stroke overlapping canvas edges
* lock image stoke incorrect
* implement "ASCIIContextShouldClose"
* Do "dots" work?

import cocoscii from "./cocoscii";


const closeImg = cocoscii(`
    · · · 1 1 1 · · · ·
    · · 1 · · · · · 1 · ·
    · 1 · · · · · · · 1 ·
    1 · · 2 · · · 3 · · 1
    1 · · · # · # · · · 1
    1 · · · · # · · · · 1
    1 · · · # · # · · · 1
    1 · · 3 · · · 2 · · 1
    · 1 · · · · · · · 1 ·
    · · 1 · · · · · · · ·
    · · · 1 1 1 1 1 · · ·
`, (idx, style) => {

  if (idx === 0) {
    style.fill = "#000";
  } else {
    style.stroke = "#fff";
  }

});

const lockImg = cocoscii(`
    · · · · · · · · · · · · · · ·
    · · · · 1 · · · · · · 1 · · ·
    · · · · · · · · · · · · · · ·
    · · · · · · · · · · · · · · ·
    · · · · · · · · · · · · · · ·
    · · 3 · 1 · · · · · · 1 · 4 ·
    · · · · · · · · · · · · · · ·
    · · · · · · A · · A · · · · ·
    · · · · 1 · · · · · · 1 · · ·
    · · · · · · · C D · · · · · ·
    · · · · · · A · · A · · · · ·
    · · · · · · · · · · · · · · ·
    · · · · · · · B E · · · · · ·
    · · · · · · · · · · · · · · ·
    · · 6 · · · · · · · · · · 5 ·
`, (idx, style) => {

  if (idx === 0) {
    style.fill = "";
    style.stroke = "#000";
  } else if (idx === 1){
    style.fill = "#000"
    style.stroke = "";
  } else {
    style.fill = "#fff";
  }

});

// Uh oh, we got a problem. Not pixel aligned.
// args = [x + 3 / width, y + 3 / height, 1 / (width + 4), 1 / (height + 4)]
// will fix it: buuut, not generalized.
const gridImg = cocoscii(`
    1 . 3 . 5 . 7
    . 9 . B . D .
    F . H . J . L
    . N . P . R .
    T . V . X . Z
    . b . d . f .
    h . j . l . n
`, (idx, style) => { style.stroke="#000"; }, 8);

document.body.appendChild(closeImg);
document.body.appendChild(lockImg);
document.body.appendChild(gridImg);

export default {};

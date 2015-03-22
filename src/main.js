import cocoscii from "./cocoscii";

const closeImg = cocoscii(`
    . · · · 1 1 1 · · · ·
    · · 1 · · · · · 1 · ·
    · 1 · · · · · · · 1 ·
    1 · · 2 · · · 3 · · 1
    1 · · · # · # · · · 1
    1 · · · · # · · · · 1
    1 · · · # · # · · · 1
    1 · · 3 · · · 2 · · 1
    · 1 · . · . · . · 1 ·
    · · 1 · . · . · . · ·
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

document.body.appendChild(closeImg);
document.body.appendChild(lockImg);

export default {};

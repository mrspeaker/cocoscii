import cocoscii from "./cocoscii";

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
`, (idx, dict) => {

  if (idx === 0) {
    dict.fill = "";
    dict.stroke = "#000";
  } else {
    dict.fill = "#000"
    dict.stroke = "#fff";
  }

});

document.body.appendChild(closeImg);
document.body.appendChild(lockImg);

export default {};
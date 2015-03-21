/*
  rep: A "\n"-seperated ascii representation of the image.
  styles: A function to mutate the style dictionary. (shapeIndex: Number, dictionary: Object) => {}
  scale: Factor to scale the final image by.
*/
function cocoscii (rep, styles = (idx, dict) => {}, scale = 4) {

  styleDict = {
    fill: "#000",
    stroke: "",
    lineWidth: "1"
  };

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let img = new Image();

  const order = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz";

  const lines = rep
    .split("\n")
    .filter(l => l !== "")
    .map(l => l.split("").filter(ch => ch != " "))

  const width = lines.reduce((ac, el) => Math.max(ac, el.length), 0);
  const height = lines.length;

  canvas.width = width * scale;
  canvas.height = height * scale;

  // Get the control points
  const points = lines
    .map((l, y) => l.map((ch, x) => {return {
      idx: order.indexOf(ch),
      ch, x, y
    }}))
    .reduce((flt, ar) => [...flt, ...ar],[]) // Flatten
    .filter(p => p.idx != -1)
    .sort((p1, p2) => p1.idx - p2.idx);

  // Turn them into shapes
  const shapes = makeShapes(points);

  // Draw them!
  ctx.save();
  ctx.scale(scale, scale);

  function getBBox ([{x, y}, ...tailPoints]) {
    return tailPoints.reduce(({min, max}, {x, y}) => {
      if (x < min.x) min.x = x;
      if (x > max.x) max.x = x;
      if (y < min.y) min.y = y;
      if (y > max.y) max.y = y;
      return {min, max};
    }, {min: {x, y}, max: {x, y}});
  }

  shapes.forEach((s, i) => {

    styles(i, styleDict); // Change the styles as needed

    const {type, points} = s;
    const {fill, stroke, lineWidth} = styleDict;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;

    switch (type) {

    case "path":
    case "line":
      const [{x, y}, ...tail] = points;
      ctx.beginPath();
      ctx.moveTo(x, y);
      tail.forEach(({x, y}) => {
        ctx.lineTo(x, y);
      });
      break;

    case "circle":
      // Get "bounding box" of the circle
      const {min, max} = getBBox(points);
      const w = max.x - min.x;
      const h = max.y - min.y;
      const circ = Math.max(w, h);
      // Draw an elipse to fit
      ctx.save();
      ctx.translate(min.x + w / 2, min.y + h / 2);
      ctx.scale(w / circ, h / circ);
      ctx.beginPath();
      ctx.arc(0, 0, circ / 2, 0, Math.PI * 2, false);
      ctx.restore();
      break;
    }
    if (styleDict.fill) ctx.fill();
    if (styleDict.stroke) ctx.stroke();
  })

  ctx.restore();
  img.src = canvas.toDataURL("image/png");

  return img;

}

function makeShapes (points) {

  const shapes = points.reduce((shps, p) => {

    const newShape = p => { return {
      cur: {
        type: "path",
        points: [p]
      },
      all: shps.all
    }};

    // TODO: refactor shape makin'

    let cur = shps.cur;
    if (!cur) {
      // New Shape
      return newShape(p);
    }

    const last = cur.points.slice(-1)[0];

    // Another point in the path, or new shape if circle
    if (p.idx == last.idx + 1) {
      if (cur.type != "path") {
        shps.all.push(cur);
        return newShape(p);
      }
      cur.points.push(p);
      return {
        cur: cur,
        all: shps.all
      }
    }

    // New shape
    if (p.idx > last.idx + 1) {
      shps.all.push(cur);
      return newShape(p);
    }

    // line or circle
    if (p.idx === last.idx) {
      cur.points.push(p);
      return {
        cur: {
          type: cur.points.length < 3 ? "line" : "circle",
          points: cur.points
        },
        all: shps.all
      }
    }

  }, {cur: null, all:[]});

  return [...shapes.all, shapes.cur];

}

export default cocoscii;


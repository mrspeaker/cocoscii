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

    case "dot":
      if (fill) ctx.fillRect(points[0].x, points[0].y, 0.1, 0.1); // errrm, why 0.1?
      if (stroke) ctx.strokeRect(points[0].x, points[0].y, 0.1, 0.1);
      break;

    case "path":
    case "line":
      const [{x, y}, ...tail] = points;
      ctx.beginPath();
      ctx.moveTo(x, y);
      tail.forEach(({x, y}) => {
        ctx.lineTo(x, y);
      });
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
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
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
      break;

    }

  })

  ctx.restore();
  img.src = canvas.toDataURL("image/png");

  return img;

}

function makeShapes (points) {

  const shapes = points.reduce(({cur, shapes}, p) => {

    function newShape (p) {
      return {
        type: "dot",
        points: [p]
      }
    };

    if (!cur) {
      return {
        cur: newShape(p),
        shapes
      }
    }

    const last = cur.points.slice(-1)[0];

    // Another point in the path
    if (p.idx == last.idx + 1 && ["dot", "path"].indexOf(cur.type) >= 0) {
      cur.points.push(p);
      cur.type = "path";
    }
    // line or circle
    else if (p.idx === last.idx) {
      cur.points.push(p);
      cur.type = cur.points.length < 3 ? "line" : "circle"
    }
    // New shape.
    else {
      shapes.push(cur);
      cur = newShape(p);
    }

    return { cur, shapes }

  }, {cur: null, shapes:[]});

  // Don't forget final shape (from .cur)!
  return [...shapes.shapes, shapes.cur];

}

export default cocoscii;


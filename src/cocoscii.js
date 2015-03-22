/*
  rep: A "\n"-seperated ascii representation of the image.
  styles: A function to mutate the style dictionary. (shapeIndex: Number, dictionary: Object) => {}
  scale: Factor to scale the final image by.
*/
function cocoscii (rep, styles = (idx, dict) => {}, scale = 4) {

  const order = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz";

  const rows = rep
    .split("\n")
    .filter(r => r !== "")
    .map(r => r.split("").filter(ch => ch != " "));

  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const height = rows.length;

  // Get the control points
  const points = rows
    .map((r, y) => r.map((ch, x) => { return {
      idx: order.indexOf(ch),
      ch, x, y
    }}))
    .reduce((flt, ar) => [...flt, ...ar], []) // Flatten
    .filter(p => p.idx != -1)
    .sort((p1, p2) => p1.idx - p2.idx);

  // Turn them into shapes
  const shapes = makeShapes(points);

  // ...and draw them
  const canvas = drawShapes(
    shapes,
    styles,
    width,
    height,
    scale);

  // Save to image
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;

}

function makeShapes ([head, ...tail]) {

  function newShape (p) {
    return {
      type: "dot",
      points: [p]
    };
  }

  const shapes = tail.reduce(({cur, shapes}, p) => {

    const prev = cur.points.slice(-1)[0];

    // Another point in the path
    if (p.idx === prev.idx + 1 && ["dot", "path"].indexOf(cur.type) != -1) {
      cur.points.push(p);
      cur.type = "path";
    }
    // line or circle
    else if (p.idx === prev.idx) {
      cur.points.push(p);
      cur.type = cur.points.length < 3 ? "line" : "circle";
    }
    // New shape.
    else {
      shapes.push(cur);
      cur = newShape(p);
    }

    return {cur, shapes};

  }, {cur: newShape(head), shapes:[]});

  // Don't forget final shape!
  return [...shapes.shapes, shapes.cur];

}

function drawShapes (shapes, styles, width, height, scale) {

  let styleDict = {
    fill: "#000",
    stroke: "",
    lineWidth: "1"
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width * scale;
  canvas.height = height * scale;

  function getBBox ([{x, y}, ...tailPoints]) {
    return tailPoints.reduce(({min, max}, {x, y}) => {
      if (x < min.x) min.x = x;
      if (x > max.x) max.x = x;
      if (y < min.y) min.y = y;
      if (y > max.y) max.y = y;
      return {min, max};
    }, {min: {x, y}, max: {x, y}});
  }

  ctx.save();
  ctx.scale(scale, scale);

  shapes.forEach((s, i) => {

    styles(i, styleDict); // Apply styles function to mutate the shape's styles

    const {type, points} = s;
    const [{x, y}, ...tail] = points;
    const {fill, stroke, lineWidth} = styleDict;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;

    switch (type) {

    case "dot":
      const args = [x, y, 1 / width, 1 / height];
      if (fill) ctx.fillRect(...args);
      if (stroke) ctx.strokeRect(...args);
      break;

    case "path":
    case "line":
      ctx.beginPath();
      ctx.moveTo(x, y);
      tail.forEach(({x, y}) => ctx.lineTo(x, y));

      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
      break;

    case "circle":
      // Get "bounding box" of the circle
      const {min, max} = getBBox(points);
      const [w, h] = [max.x - min.x, max.y - min.y];
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

  });

  ctx.restore();

  return canvas;

}

export default cocoscii;

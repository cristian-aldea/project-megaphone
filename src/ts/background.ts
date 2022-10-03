import { bgCanvas } from "./dom";
import { Point } from "./types";

(function () {
  const canvas = bgCanvas;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("background - ERROR - Unable to get 2D context from canvas");
    return;
  }

  // Physics constants
  const speed = 0.02;
  const numPoints = 25;
  const connectThreshold = 0.25;
  const dotSize = 0.01;
  const scrollOffsetRatio = 3;

  // Color constants
  const hue = 0;
  const saturation = 0;
  const lightness = 30;
  const pointColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const lineColor = `hsl(${hue}, ${saturation}%, ${lightness * 0.6}%)`;
  const bgc1 = `hsl(${hue}, ${saturation}%, ${lightness * 0.5}%)`;
  const bgc2 = `hsl(${hue}, ${saturation}%, ${lightness * 0.15}%)`;
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, bgc1);
  bgGradient.addColorStop(0.7, bgc2);

  const points: Point[] = [];
  let time = 0;
  let scroll = 0;
  let offset = 0;
  let lineWidth = 0;
  let radius = 0;

  const onResize = () => {
    resizeCanvas();
  };

  const onScroll = () => {
    const dpi = window.devicePixelRatio;
    const delta = scroll - document.documentElement.scrollTop;
    offset += (delta * dpi) / (canvas.height * scrollOffsetRatio);
    scroll = document.documentElement.scrollTop;
  };

  const resizeCanvas = () => {
    const dpi = window.devicePixelRatio;

    canvas.width = dpi * window.innerWidth;
    canvas.height = dpi * window.innerHeight;

    const size = dotSize * Math.sqrt(canvas.width * canvas.height);
    lineWidth = size;
    radius = size;
  };

  const update = (dt: number) => {
    if (isNaN(dt)) {
      return;
    }

    const offSet = offset;
    points.forEach((p) => {
      p.x += dt * p.dx * speed;
      p.y += dt * p.dy * speed;

      if (offSet !== 0) {
        p.y += offSet;
      }

      if (p.x < 0) {
        p.x += 1;
      } else if (p.x > 1) {
        p.x -= 1;
      }

      if (p.y < 0) {
        p.y += 1;
      } else if (p.y > 1) {
        p.y -= 1;
      }
    });
    offset = 0;
  };

  const draw = (t: number) => {
    const dt = (t - time) / 1000;
    time = t;

    update(dt);

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = lineColor;
    ctx.fillStyle = pointColor;
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const x1 = points[i].x;
        let x2 = points[j].x;
        const y1 = points[i].y;
        let y2 = points[j].y;

        let dx = x1 - x2;
        let dy = y1 - y2;

        let wrapX = 0,
          wrapY = 0;

        if (dx < -0.5) {
          x2 -= 1;
          dx = x1 - x2;
          wrapX = 1;
        } else if (dx > 0.5) {
          x2 += 1;
          dx = x1 - x2;
          wrapX = -1;
        }

        if (dy < -0.5) {
          y2 -= 1;
          dy = y1 - y2;
          wrapY = 1;
        } else if (dy > 0.5) {
          y2 += 1;
          dy = y1 - y2;
          wrapY = -1;
        }

        // optimization before using sqrt, ignore connections which are 100% too long
        if (dx > connectThreshold || dy > connectThreshold) {
          continue;
        }

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > connectThreshold) {
          continue;
        }

        const x = distance / connectThreshold;
        // const strength = 1;
        const strength = 1 - x * x;
        // const strength = 1 - x;
        // const strength = Math.exp(-2 * x) - 0.14 * x;
        // const strength = 1 - Math.sqrt(x);
        // TODO points are repelled by eachother
        // bx += strength * strength * dx * repelStrength;
        // by += strength * strength * dy * repelStrength;

        ctx.lineWidth = lineWidth * strength;
        ctx.beginPath();
        ctx.moveTo(x1 * width, y1 * height);
        ctx.lineTo(x2 * width, y2 * height);

        if (wrapX !== 0 && wrapY !== 0) {
          ctx.moveTo((x1 + wrapX) * width, (y1 + wrapY) * height);
          ctx.lineTo((x2 + wrapX) * width, (y2 + wrapY) * height);
        }
        if (wrapX !== 0) {
          ctx.moveTo((x1 + wrapX) * width, y1 * height);
          ctx.lineTo((x2 + wrapX) * width, y2 * height);
        }
        if (wrapY !== 0) {
          ctx.moveTo(x1 * width, (y1 + wrapY) * height);
          ctx.lineTo(x2 * width, (y2 + wrapY) * height);
        }
        ctx.stroke();
      }
    }

    points.forEach((p) => {
      const x = p.x * width;
      const y = p.y * height;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      let wrapX = 0,
        wrapY = 0;

      if (x + radius >= width) {
        wrapX = -width;
      } else if (x - radius <= 0) {
        wrapX = width;
      }

      if (y + radius >= height) {
        wrapY = -height;
      } else if (y - radius <= 0) {
        wrapY = height;
      }

      if (wrapX !== 0 && wrapX !== 0) {
        ctx.beginPath();
        ctx.arc(x + wrapX, y + wrapY, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
      if (wrapX !== 0) {
        ctx.beginPath();
        ctx.arc(x + wrapX, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
      if (wrapY !== 0) {
        ctx.beginPath();
        ctx.arc(x, y + wrapY, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    window.requestAnimationFrame(draw);
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("touchmove", onResize);
  window.addEventListener("scroll", onScroll);
  resizeCanvas();

  for (let i = 0; i < numPoints; i++) {
    const x = Math.random();
    const y = Math.random();

    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    points.push({ x, y, dx, dy });
  }

  window.requestAnimationFrame(draw);
})();

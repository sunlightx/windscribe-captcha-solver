# Windscribe Slider Captcha Solver

Fast and accurate Windscribe slider captcha solver using OpenCV template matching.

## Installation

```bash
npm install windscribe-slider-captcha
```

## Usage

### With file paths

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

const solver = new PuzzleSolver("./background.png", "./slider.png");

const position = await solver.getPosition();
console.log(`Position: ${position}`);
```

### With base64 strings

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

const backgroundBase64 = "data:image/png;base64,iVBORw0KGgoAAAANS...";
const sliderBase64 = "data:image/png;base64,iVBORw0KGgoAAAANS...";

const solver = new PuzzleSolver(backgroundBase64, sliderBase64);
const position = await solver.getPosition();
console.log(`Position: ${position}`);
```

### With base64 without data URI prefix

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

const backgroundBase64 = "iVBORw0KGgoAAAANS...";
const sliderBase64 = "iVBORw0KGgoAAAANS...";

const solver = new PuzzleSolver(backgroundBase64, sliderBase64);
const position = await solver.getPosition();
```

## API

### `new PuzzleSolver(background, slider)`

Creates a solver instance.

**Parameters:**

- `background` (string | Buffer) - Background image as file path, base64 string (with or without `data:image/...;base64,` prefix), or Buffer
- `slider` (string | Buffer) - Slider image as file path, base64 string (with or without `data:image/...;base64,` prefix), or Buffer

### `getPosition()`

Finds the position of the slider on the background.

**Returns:** `Promise<number>` - X coordinate of the slider position

**Throws:** Error if slider is larger than background or images cannot be loaded

## Examples

### File paths

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

const solver = new PuzzleSolver(
  "./captcha/background.png",
  "./captcha/slider.png"
);

try {
  const position = await solver.getPosition();
  console.log(`Position: ${position}`);
} catch (error) {
  console.error("Error:", error);
}
```

### Base64 from canvas

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

// Get base64 from canvas elements
const backgroundCanvas = document.querySelector("#background-canvas");
const sliderCanvas = document.querySelector("#slider-canvas");

const backgroundBase64 = backgroundCanvas.toDataURL();
const sliderBase64 = sliderCanvas.toDataURL();

const solver = new PuzzleSolver(backgroundBase64, sliderBase64);
const position = await solver.getPosition();
```

### Mixed input types

```javascript
import PuzzleSolver from "windscribe-slider-captcha";

// Background from file, slider from base64
const solver = new PuzzleSolver(
  "./background.png",
  "data:image/png;base64,iVBORw0KGgoAAAANS..."
);

const position = await solver.getPosition();
```

## Requirements

- Node.js >= 14.0.0

## License

MIT

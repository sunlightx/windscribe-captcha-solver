import { cv } from 'opencv-wasm';
import sharp from 'sharp';

class PuzzleSolver {
  constructor(background, slider) {
    this.background = background;
    this.slider = slider;
  }

  async imageToMat(imageInput) {
    let imageBuffer;

    try {
      if (typeof imageInput === 'string') {
        if (imageInput.startsWith('data:image') || imageInput.match(/^[A-Za-z0-9+/=]+$/)) {
          const base64Data = imageInput.includes(',')
            ? imageInput.split(',')[1]
            : imageInput;
          imageBuffer = Buffer.from(base64Data, 'base64');
        } else {
          const sharpInstance = sharp(imageInput);
          const buffer = await sharpInstance
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

          return cv.matFromArray(
            buffer.info.height,
            buffer.info.width,
            cv.CV_8UC4,
            new Uint8Array(buffer.data)
          );
        }
      } else if (Buffer.isBuffer(imageInput)) {
        imageBuffer = imageInput;
      } else {
        throw new Error('Invalid image input. Expected file path, base64 string, or Buffer');
      }

      if (!imageBuffer || imageBuffer.length === 0) {
        throw new Error('Invalid image data: empty buffer');
      }

      const sharpInstance = sharp(imageBuffer);

      const buffer = await sharpInstance
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      return cv.matFromArray(
        buffer.info.height,
        buffer.info.width,
        cv.CV_8UC4,
        new Uint8Array(buffer.data)
      );
    } catch (error) {
      throw error;
    }
  }

  async findPuzzlePosition() {
    const backgroundMat = await this.imageToMat(this.background);
    const sliderMat = await this.imageToMat(this.slider);

    const bgGray = new cv.Mat();
    const sliderGray = new cv.Mat();
    cv.cvtColor(backgroundMat, bgGray, cv.COLOR_BGRA2GRAY);
    cv.cvtColor(sliderMat, sliderGray, cv.COLOR_BGRA2GRAY);

    if (sliderGray.cols > bgGray.cols || sliderGray.rows > bgGray.rows) {
      backgroundMat.delete();
      sliderMat.delete();
      bgGray.delete();
      sliderGray.delete();
      throw new Error('The slider is bigger than the background!');
    }

    const result = new cv.Mat();
    cv.matchTemplate(bgGray, sliderGray, result, cv.TM_CCOEFF_NORMED);
    const maxPoint = cv.minMaxLoc(result).maxLoc;

    backgroundMat.delete();
    sliderMat.delete();
    bgGray.delete();
    sliderGray.delete();
    result.delete();

    return maxPoint.x;
  }

  async getPosition() {
    return this.findPuzzlePosition();
  }
}

export default PuzzleSolver;

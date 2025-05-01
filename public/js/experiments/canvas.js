const canvas = domCanvas => document.querySelector(domCanvas);
const getCtx = canvas => canvas.getContext('2d');
const styles = canvas =>
canvas.setAttribute('style',
    `background-color:red;
    display:block;
    margin: 0 auto;
    width: 100%;
    `);
const log = () => console.log('CANVAS :: ','canvas loaded')
const setupCanvas = R.pipe(canvas, R.tap(styles), R.tap(log));
export {setupCanvas, getCtx};


class Canvas {

  constructor(canvasName) {
    this.name = canvasName;
    // TODO: try/catch
    this.canvas = this.getCanvas();
    this.ctx = this.getCtx()
  }

  // TODO: refactor impure
  getCanvas() {
    return document.querySelector(this.name)
  }
  // TODO: refactor impure
  getCtx() {
    return this.getCanvas().getContext('2d')
  }

}



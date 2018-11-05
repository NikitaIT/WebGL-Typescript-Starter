function getOrCreateCanvasContext(elementId = 'canvas', contextId = 'webgl2') {
  const canvas = document.querySelector(`canvas#${elementId}`) as HTMLCanvasElement
    || (_ => (_.id = elementId, _))(document.createElement('canvas'));
  return canvas.getContext(contextId) as WebGL2RenderingContext;
};
export interface ISceneDrower {
  initScene: (gl: WebGL2RenderingContext) => void,
  drawScene: (gl: WebGL2RenderingContext, time: number) => void
  customRequestAnimationFrame?: (gl: WebGL2RenderingContext) => void;
}
export const startDrowWith = (drower: ISceneDrower) => {
  const gl = getOrCreateCanvasContext('canvas');
  if (!gl) {
    return;
  }
  drower.initScene(gl);
  if (drower.customRequestAnimationFrame) {
    drower.customRequestAnimationFrame(gl);
    return;
  }
  const draw = (time: number) => {
    drower.drawScene(gl, 5 + time * 0.0001);
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
};

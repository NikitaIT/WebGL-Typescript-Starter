import * as twgl from 'twgl.js';
import { ISceneDrower } from './drower';
import { orthographic3dShadersSourceArray } from '../shader/shader';
// const { m4 } = twgl;

// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
function setGeometry(gl: WebGL2RenderingContext) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left column front
      0, 0, 0,
      0, 150, 0,
      30, 0, 0,
      0, 150, 0,
      30, 150, 0,
      30, 0, 0,

      // top rung front
      30, 0, 0,
      30, 30, 0,
      100, 0, 0,
      30, 30, 0,
      100, 30, 0,
      100, 0, 0,

      // middle rung front
      30, 60, 0,
      30, 90, 0,
      67, 60, 0,
      30, 90, 0,
      67, 90, 0,
      67, 60, 0,

      // left column back
      0, 0, 30,
      30, 0, 30,
      0, 150, 30,
      0, 150, 30,
      30, 0, 30,
      30, 150, 30,

      // top rung back
      30, 0, 30,
      100, 0, 30,
      30, 30, 30,
      30, 30, 30,
      100, 0, 30,
      100, 30, 30,

      // middle rung back
      30, 60, 30,
      67, 60, 30,
      30, 90, 30,
      30, 90, 30,
      67, 60, 30,
      67, 90, 30,

      // top
      0, 0, 0,
      100, 0, 0,
      100, 0, 30,
      0, 0, 0,
      100, 0, 30,
      0, 0, 30,

      // top rung right
      100, 0, 0,
      100, 30, 0,
      100, 30, 30,
      100, 0, 0,
      100, 30, 30,
      100, 0, 30,

      // under top rung
      30, 30, 0,
      30, 30, 30,
      100, 30, 30,
      30, 30, 0,
      100, 30, 30,
      100, 30, 0,

      // between top rung and middle
      30, 30, 0,
      30, 60, 30,
      30, 30, 30,
      30, 30, 0,
      30, 60, 0,
      30, 60, 30,

      // top of middle rung
      30, 60, 0,
      67, 60, 30,
      30, 60, 30,
      30, 60, 0,
      67, 60, 0,
      67, 60, 30,

      // right of middle rung
      67, 60, 0,
      67, 90, 30,
      67, 60, 30,
      67, 60, 0,
      67, 90, 0,
      67, 90, 30,

      // bottom of middle rung.
      30, 90, 0,
      30, 90, 30,
      67, 90, 30,
      30, 90, 0,
      67, 90, 30,
      67, 90, 0,

      // right of bottom
      30, 90, 0,
      30, 150, 30,
      30, 90, 30,
      30, 90, 0,
      30, 150, 0,
      30, 150, 30,

      // bottom
      0, 150, 0,
      0, 150, 30,
      30, 150, 30,
      0, 150, 0,
      30, 150, 30,
      30, 150, 0,

      // left side
      0, 0, 0,
      0, 0, 30,
      0, 150, 30,
      0, 0, 0,
      0, 150, 30,
      0, 150, 0,
    ]),
    gl.STATIC_DRAW);
}

// Fill the current ARRAY_BUFFER buffer with colors for the 'F'.
function setColors(gl: WebGL2RenderingContext) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array([
      // left column front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // top rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // middle rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

      // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

      // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

      // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

      // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

      // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

      // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

      // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

      // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

      // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
    ]),
    gl.STATIC_DRAW);
}

const m4 = {

  projection(width: number, height: number, depth: number) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },

  multiply(a: twgl.Mat4, b: twgl.Mat4) {
    const a00 = a[0 * 4 + 0];
    const a01 = a[0 * 4 + 1];
    const a02 = a[0 * 4 + 2];
    const a03 = a[0 * 4 + 3];
    const a10 = a[1 * 4 + 0];
    const a11 = a[1 * 4 + 1];
    const a12 = a[1 * 4 + 2];
    const a13 = a[1 * 4 + 3];
    const a20 = a[2 * 4 + 0];
    const a21 = a[2 * 4 + 1];
    const a22 = a[2 * 4 + 2];
    const a23 = a[2 * 4 + 3];
    const a30 = a[3 * 4 + 0];
    const a31 = a[3 * 4 + 1];
    const a32 = a[3 * 4 + 2];
    const a33 = a[3 * 4 + 3];
    const b00 = b[0 * 4 + 0];
    const b01 = b[0 * 4 + 1];
    const b02 = b[0 * 4 + 2];
    const b03 = b[0 * 4 + 3];
    const b10 = b[1 * 4 + 0];
    const b11 = b[1 * 4 + 1];
    const b12 = b[1 * 4 + 2];
    const b13 = b[1 * 4 + 3];
    const b20 = b[2 * 4 + 0];
    const b21 = b[2 * 4 + 1];
    const b22 = b[2 * 4 + 2];
    const b23 = b[2 * 4 + 3];
    const b30 = b[3 * 4 + 0];
    const b31 = b[3 * 4 + 1];
    const b32 = b[3 * 4 + 2];
    const b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  translation(tx: number, ty: number, tz: number) {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1,
    ];
  },

  xRotation(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  },

  yRotation(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
  },

  zRotation(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  },

  scaling(sx: number, sy: number, sz: number) {
    return [
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ];
  },

  translate(m: twgl.Mat4, tx: number, ty: number, tz: number) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate(m: twgl.Mat4, angleInRadians: number) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate(m: twgl.Mat4, angleInRadians: number) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate(m: twgl.Mat4, angleInRadians: number) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

  scale(m: twgl.Mat4, sx: number, sy: number, sz: number) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },

};

export class Orthographic3d implements ISceneDrower {
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  translation: number[] = [];
  rotation: number[] = [];
  scale: number[] = [];
  // private uniformSetters: any;
  // private objects: {
  //   radius: twgl.Mat4,
  //   xRotation: number,
  //   yRotation: number,
  //   materialUniforms: {
  //     u_colorMult: twgl.Mat4,
  //     u_diffuse: twgl.Mat4,
  //     u_specular: twgl.Mat4,
  //     u_shininess: number,
  //     u_specularFactor: number,
  //   },
  // }[] = [];
  // private buffers: twgl.primitives.SphereBuffers<TBuffers>;
  // private uniformsThatAreComputedForEachObject = {
  //   u_worldViewProjection: m4.identity(),
  //   u_world: m4.identity(),
  //   u_worldInverseTranspose: m4.identity(),
  // };
  // private uniformsThatAreTheSameForAllObjects = {
  //   u_lightWorldPos: [-50, 30, 100],
  //   u_viewInverse: m4.identity(),
  //   u_lightColor: [1, 1, 1, 1],
  // };
  positionAttributeLocation: number;
  colorAttributeLocation: number;
  matrixLocation: WebGLUniformLocation;
  static radToDeg(r: number) {
    return r * 180 / Math.PI;
  }

  static degToRad(d: number) {
    return d * Math.PI / 180;
  }
  initScene = (gl: WebGL2RenderingContext) => {
    this.program = twgl.createProgramFromSources(gl, orthographic3dShadersSourceArray);
// look up where the vertex data needs to go.
    this.positionAttributeLocation = gl.getAttribLocation(this.program, 'a_position');
    this.colorAttributeLocation = gl.getAttribLocation(this.program, 'a_color');

// look up uniform locations
    this.matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');

// Create a buffer
    const positionBuffer = gl.createBuffer();

// Create a vertex array object (attribute state)
    this.vao = gl.createVertexArray();

// and make it the one we're currently working with
    gl.bindVertexArray(this.vao);

// Turn on the attribute
    gl.enableVertexAttribArray(this.positionAttributeLocation);

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// Set Geometry.
    setGeometry(gl);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 3;          // 3 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      this.positionAttributeLocation, size, type, normalize, stride, offset);

// create the color buffer, make it the current ARRAY_BUFFER
// and copy in the color values
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl);

// Turn on the attribute
    gl.enableVertexAttribArray(this.colorAttributeLocation);

// Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    size = 3;          // 3 components per iteration
    type = gl.UNSIGNED_BYTE;   // the data is 8bit unsigned bytes
    normalize = true;  // convert from 0-255 to 0.0-1.0
    stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next color
    offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      this.colorAttributeLocation, size, type, normalize, stride, offset);

// First let's make some variables
// to hold the translation,
    this.translation = [45, 150, 0];
    this.rotation = [Orthographic3d.degToRad(40), Orthographic3d.degToRad(25), Orthographic3d.degToRad(325)];
    this.scale = [1, 1, 1];
  };
  drawScene = (gl: WebGL2RenderingContext, time: number) => {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // turn on depth testing
    gl.enable(gl.DEPTH_TEST);

    // tell webgl to cull faces
    gl.enable(gl.CULL_FACE);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(this.program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(this.vao);

    // Compute the matrix
    let matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = m4.translate(matrix, this.translation[0], this.translation[1], this.translation[2]);
    matrix = m4.xRotate(matrix, this.rotation[0]);
    matrix = m4.yRotate(matrix, this.rotation[1]);
    matrix = m4.zRotate(matrix, this.rotation[2]);
    matrix = m4.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);

    // Set the matrix.
    gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

    // Draw the geometry.
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
  };
  customRequestAnimationFrame = (gl: WebGL2RenderingContext) => {
    console.log('1');
    this.drawScene(gl, 0);
    const updatePosition = (index: any) => {
      return (event: any, ui: any) => {
        this.translation[index] = ui.value;
        this.drawScene(gl, 0);
      };
    }

    const updateRotation = (index: any) => {
      return (event: any, ui: any) => {
        const angleInDegrees = ui.value;
        const angleInRadians = Orthographic3d.degToRad(angleInDegrees);
        this.rotation[index] = angleInRadians;
        this.drawScene(gl, 0);
      };
    }

    const updateScale = (index: any) => {
      return (event: any, ui: any) => {
        this.scale[index] = ui.value;
        this.drawScene(gl, 0);
      };
    }
    console.log('webglLessonsUI');
    // Setup a ui.
    webglLessonsUI.setupSlider('#x', {
      value: this.translation[0], slide: updatePosition(0), max: gl.canvas.width });
    webglLessonsUI.setupSlider('#y', {
      value: this.translation[1], slide: updatePosition(1), max: gl.canvas.height });
    webglLessonsUI.setupSlider('#z', {
      value: this.translation[2], slide: updatePosition(2), max: gl.canvas.height });
    webglLessonsUI.setupSlider('#angleX', {
      value: Orthographic3d.radToDeg(this.rotation[0]),
      slide: updateRotation(0), max: 360,
    });
    webglLessonsUI.setupSlider('#angleY', {
      value: Orthographic3d.radToDeg(this.rotation[1]), slide: updateRotation(1), max: 360 });
    webglLessonsUI.setupSlider('#angleZ', {
      value: Orthographic3d.radToDeg(this.rotation[2]), slide: updateRotation(2), max: 360 });
    webglLessonsUI.setupSlider('#scaleX', {
      value: this.scale[0],
      slide: updateScale(0),
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    });
    webglLessonsUI.setupSlider('#scaleY', {
      value: this.scale[1],
      slide: updateScale(1),
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    });
    webglLessonsUI.setupSlider('#scaleZ', {
      value: this.scale[2],
      slide: updateScale(2),
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    });

  }
}

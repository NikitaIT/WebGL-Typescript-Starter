import * as twgl from 'twgl.js';
import { basicShadersSourceArray } from '../shader/shader';
import * as chroma from 'chroma-js';
import { ISceneDrower } from './drower';
const { m4 } = twgl;
type TBuffers = 'position'|'normal'|'texcoord'|'indices';
export class Basic implements ISceneDrower {
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private uniformSetters: any;
  private objects: {
    radius: twgl.Mat4,
    xRotation: number,
    yRotation: number,
    materialUniforms: {
      u_colorMult: twgl.Mat4,
      u_diffuse: twgl.Mat4,
      u_specular: twgl.Mat4,
      u_shininess: number,
      u_specularFactor: number,
    },
  }[] = [];
  private buffers: twgl.primitives.SphereBuffers<TBuffers>;
  private uniformsThatAreComputedForEachObject = {
    u_worldViewProjection: m4.identity(),
    u_world: m4.identity(),
    u_worldInverseTranspose: m4.identity(),
  };
  private uniformsThatAreTheSameForAllObjects = {
    u_lightWorldPos: [-50, 30, 100],
    u_viewInverse: m4.identity(),
    u_lightColor: [1, 1, 1, 1],
  };
  private fieldOfViewRadians = Basic.degToRad(60);

  private static degToRad(d: number) {
    return d * Math.PI / 180;
  }

  initScene = (gl: WebGL2RenderingContext) => {
    this.buffers = twgl.primitives.createSphereBuffers<TBuffers>(gl, 10, 48, 24);
    this.program = twgl.createProgramFromSources(gl, basicShadersSourceArray);
    this.uniformSetters = twgl.createUniformSetters(gl, this.program);
    const attribSetters = twgl.createAttributeSetters(gl, this.program);

    const attribs = {
      a_position: { buffer: this.buffers.position, numComponents: 3 },
      a_normal: { buffer: this.buffers.normal, numComponents: 3 },
      a_texcoord: { buffer: this.buffers.texcoord, numComponents: 2 },
    };
    this.vao = twgl.createVAOAndSetAttributes(gl, attribSetters, attribs, this.buffers.indices);


    const rand = function (min: number, max?: number) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    };

    const randInt = function (range: number) {
      return Math.floor(Math.random() * range);
    };

    const textures = [
      textureUtils.makeStripeTexture(gl, { color1: '#FFF', color2: '#CCC' }),
      textureUtils.makeCheckerTexture(gl, { color1: '#FFF', color2: '#CCC' }),
      textureUtils.makeCircleTexture(gl, { color1: '#FFF', color2: '#CCC' }),
    ];

    const numObjects = 300;
    const baseColor = rand(240);
    for (let ii = 0; ii < numObjects; ++ii) {
      this.objects.push({
        radius: [0, 0, rand(150)],
        xRotation: rand(Math.PI * 2),
        yRotation: rand(Math.PI),
        materialUniforms: {
          u_colorMult: chroma.hsv(rand(baseColor, baseColor + 120), 0.5, 1).gl(),
          u_diffuse: textures[randInt(textures.length)],
          u_specular: [1, 1, 1, 1],
          u_shininess: rand(500),
          u_specularFactor: rand(1),
        },
      });
    }
  };
  drawScene = (gl: WebGL2RenderingContext, time: number) => {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Compute the projection matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    const cameraPosition = [0, 0, 100];
    const target = [0, 0, 0];
    const up = [0, 1, 0];
    const cameraMatrix = m4.lookAt(cameraPosition, target, up, this.uniformsThatAreTheSameForAllObjects.u_viewInverse);

    // Make a view matrix from the camera matrix.
    const viewMatrix = m4.inverse(cameraMatrix);

    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(this.program);

    // Setup all the needed attributes.
    gl.bindVertexArray(this.vao);

    // Set the uniforms that are the same for all objects.
    twgl.setUniforms(this.uniformSetters, this.uniformsThatAreTheSameForAllObjects);

    // Draw objects
    this.objects.forEach(object => {

      // Compute a position for this object based on the time.
      let worldMatrix = m4.identity();
      worldMatrix = m4.rotateY(worldMatrix, object.yRotation * time);
      worldMatrix = m4.rotateX(worldMatrix, object.xRotation * time);
      worldMatrix = m4.translate(worldMatrix, object.radius, this.uniformsThatAreComputedForEachObject.u_world);

      // Multiply the matrices.
      m4.multiply(viewProjectionMatrix, worldMatrix, this.uniformsThatAreComputedForEachObject.u_worldViewProjection);
      m4.transpose(m4.inverse(worldMatrix), this.uniformsThatAreComputedForEachObject.u_worldInverseTranspose);

      // Set the uniforms we just computed
      twgl.setUniforms(this.uniformSetters, this.uniformsThatAreComputedForEachObject);

      // Set the uniforms that are specific to the this object.
      twgl.setUniforms(this.uniformSetters, object.materialUniforms);

      // Draw the geometry.
      gl.drawElements(gl.TRIANGLES, this.buffers.numElements, gl.UNSIGNED_SHORT, 0);
    });
  };
}

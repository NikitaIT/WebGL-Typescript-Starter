import { MyLibrary } from './MyLibrary';
import * as chroma from "chroma-js";
import * as twgl from "twgl.js";
import {m4} from "twgl.js";
import basic from "./shader/basic/basic";

console.log('See this in your browser console: Typescript Webpack Starter Launched');

const myLibrary = new MyLibrary();
const result = myLibrary.executeDependency();

console.log(`A random number ${result}`);

function main() {
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    var gl = <WebGL2RenderingContext>canvas.getContext("webgl2");
    if (!gl) {
        return;
    }

    var buffers = twgl.primitives.createSphereBuffers(gl, 10, 48, 24);

    // setup GLSL program
    var program = twgl.createProgramFromSources(gl, [basic.vs, basic.fs]);
    var uniformSetters = twgl.createUniformSetters(gl, program);
    var attribSetters  = twgl.createAttributeSetters(gl, program);


    var attribs = {
        a_position: { buffer: buffers.position, numComponents: 3, },
        a_normal:   { buffer: buffers.normal,   numComponents: 3, },
        a_texcoord: { buffer: buffers.texcoord, numComponents: 2, },
    };

    var vao = twgl.createVAOAndSetAttributes(
        gl, attribSetters, attribs, buffers.indices);

    function degToRad(d: number) {
        return d * Math.PI / 180;
    }

    var fieldOfViewRadians = degToRad(60);

    var uniformsThatAreTheSameForAllObjects = {
        u_lightWorldPos:         [-50, 30, 100],
        u_viewInverse:           m4.identity(),
        u_lightColor:            [1, 1, 1, 1],
    };

    var uniformsThatAreComputedForEachObject = {
        u_worldViewProjection:   m4.identity(),
        u_world:                 m4.identity(),
        u_worldInverseTranspose: m4.identity(),
    };

    var rand = function(min: number, max?: number) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return min + Math.random() * (max - min);
    };

    var randInt = function(range: number) {
        return Math.floor(Math.random() * range);
    };

    var textures = [
        textureUtils.makeStripeTexture(gl, { color1: "#FFF", color2: "#CCC", }),
        textureUtils.makeCheckerTexture(gl, { color1: "#FFF", color2: "#CCC", }),
        textureUtils.makeCircleTexture(gl, { color1: "#FFF", color2: "#CCC", }),
    ];

    var objects: any[] = [];
    var numObjects = 300;
    var baseColor = rand(240);
    for (var ii = 0; ii < numObjects; ++ii) {
        objects.push({
            radius: [0,0, rand(150)],
            xRotation: rand(Math.PI * 2),
            yRotation: rand(Math.PI),
            materialUniforms: {
                u_colorMult:             chroma.hsv(rand(baseColor, baseColor + 120), 0.5, 1).gl(),
                u_diffuse:               textures[randInt(textures.length)],
                u_specular:              [1, 1, 1, 1],
                u_shininess:             rand(500),
                u_specularFactor:        rand(1),
            },
        });
    }

    requestAnimationFrame(drawScene);

    // Draw the scene.
    function drawScene(time: number) {
        time = 5 + time * 0.0001;

        twgl.resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // Compute the projection matrix
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var projectionMatrix =
            m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

        // Compute the camera's matrix using look at.
        var cameraPosition = [0, 0, 100];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(cameraPosition, target, up, uniformsThatAreTheSameForAllObjects.u_viewInverse);

        // Make a view matrix from the camera matrix.
        var viewMatrix = m4.inverse(cameraMatrix);

        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

        gl.useProgram(program);

        // Setup all the needed attributes.
        gl.bindVertexArray(vao);

        // Set the uniforms that are the same for all objects.
        twgl.setUniforms(uniformSetters, uniformsThatAreTheSameForAllObjects);

        // Draw objects
        objects.forEach(function(object) {

            // Compute a position for this object based on the time.
            var worldMatrix = m4.identity();
            worldMatrix = m4.rotateY(worldMatrix, object.yRotation * time);
            worldMatrix = m4.rotateX(worldMatrix, object.xRotation * time);
            worldMatrix = m4.translate(worldMatrix, object.radius, uniformsThatAreComputedForEachObject.u_world);

            // Multiply the matrices.
            m4.multiply(viewProjectionMatrix, worldMatrix, uniformsThatAreComputedForEachObject.u_worldViewProjection);
            m4.transpose(m4.inverse(worldMatrix), uniformsThatAreComputedForEachObject.u_worldInverseTranspose);

            // Set the uniforms we just computed
            twgl.setUniforms(uniformSetters, uniformsThatAreComputedForEachObject);

            // Set the uniforms that are specific to the this object.
            twgl.setUniforms(uniformSetters, object.materialUniforms);

            // Draw the geometry.
            gl.drawElements(gl.TRIANGLES, buffers.numElements, gl.UNSIGNED_SHORT, 0);
        });

        requestAnimationFrame(drawScene);
    }
}

main();

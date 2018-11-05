import * as twgl from 'twgl.js';
import { startDrowWith } from './component/drower';
import { Basic } from './component/basic';
import { Orthographic3d } from './component/webgl-3d-orthographic';

const { m4 } = twgl;

startDrowWith(new Orthographic3d());

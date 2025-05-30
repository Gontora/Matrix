import * as THREE from 'three/webgpu'
import Experience from './Experience.js'
import Sizes from "./Utils/Sizes.js"

import { color, uniform } from 'three/tsl'

export default class State {
    static _instance = null

    static getInstance() {
        return State._instance || new State()
    }

    experience = Experience.getInstance()
    renderer = this.experience.renderer.instance
    sizes = Sizes.getInstance()
    postprocessing = true;

    uniforms = {
        resolution: uniform( new THREE.Vector2( this.sizes.width_DPR, this.sizes.height_DPR ) ),

        mainScene: {
            environment: {
                topColor: uniform( color( 0x0487e2 ) ),
                bottomColor: uniform( color( 0x0066ff ) ),

                //fogColor: uniform( new THREE.Color( 0x0487e2 ) ),
                fogColor: uniform( color( 0x000000 ) ),
                fogNear: uniform( 0 ),
                fogFar: uniform( 47.83 ),
            },

            bloomPass: {
                strength: uniform( 0.9 ),
                radius: uniform( 0.3 ),
                threshold: uniform( 0 ),
            }
        }
    }

    unrealBloom = {
        enabled: true,
        strength: 0.9,
        radius: 0.3,
        threshold: 0.0,
    }

    constructor() {
        // Singleton
        if ( State._instance ) {
            return State._instance
        }
        State._instance = this

        this.experience = Experience.getInstance()
        this.renderer = this.experience.renderer.instance
        this.canvas = this.experience.canvas
        this.sizes = Sizes.getInstance()

        this.setLayers()
    }

    setLayers() {
        this.layersConst = {
            BLOOM_SCENE: 1,
            DEFAULT: 0,
        }
        this.bloomLayer = new THREE.Layers();
        this.bloomLayer.set( this.layersConst.BLOOM_SCENE );
    }

    resize() {

    }
}

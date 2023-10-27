
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { ACESFilmicToneMappingShader } from 'three/examples/jsm/shaders/ACESFilmicToneMappingShader.js';
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader.js';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader.js';

import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader.js';
import { BokehShader as BokehShader2, BokehDepthShader } from 'three/examples/jsm/shaders/BokehShader2.js';
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader.js';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader.js';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader.js';
import { ConvolutionShader } from 'three/examples/jsm/shaders/ConvolutionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { DepthLimitedBlurShader, BlurShaderUtils } from 'three/examples/jsm/shaders/DepthLimitedBlurShader.js';
import { DigitalGlitch } from 'three/examples/jsm/shaders/DigitalGlitch.js';
import { DOFMipMapShader } from 'three/examples/jsm/shaders/DOFMipMapShader.js';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader.js';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js';
import { FreiChenShader } from 'three/examples/jsm/shaders/FreiChenShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { GodRaysDepthMaskShader, GodRaysGenerateShader, GodRaysCombineShader, GodRaysFakeSunShader } from 'three/examples/jsm/shaders/GodRaysShader.js';

import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader.js';
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader.js';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader.js';
import { MMDToonShader } from 'three/examples/jsm/shaders/MMDToonShader.js';
import { NormalMapShader } from 'three/examples/jsm/shaders/NormalMapShader.js';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';
import { SAOShader } from 'three/examples/jsm/shaders/SAOShader.js';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader } from 'three/examples/jsm/shaders/SMAAShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { SSAOShader, SSAODepthShader, SSAOBlurShader } from 'three/examples/jsm/shaders/SSAOShader.js';
import { SSRrShader, SSRrDepthShader } from 'three/examples/jsm/shaders/SSRrShader.js';
import { SSRShader, SSRDepthShader, SSRBlurShader } from 'three/examples/jsm/shaders/SSRShader.js';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader.js';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader.js';
import { ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader.js';
import { ToonShader1, ToonShader2, ToonShaderHatching, ToonShaderDotted } from 'three/examples/jsm/shaders/ToonShader.js';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader.js';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader.js';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader.js';




import GUI from "lil-gui";


function init(renderer, scene, camera) {
    console.log('effectInit over')
    let composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera))
    const effect1 = {
        shader: new ShaderPass(DotScreenShader),
        setting: {
            use: false,
            angle: 1.57,
            centerX: 0.5,
            centerY: 0.5,
            scale: 1,
            tSizeX: 256,
            tSizeY: 256,
            //tDiffuse: //value: Texture
        }
    };

    const effect2 = {
        shader: new ShaderPass(RGBShiftShader),
        setting: {
            use: false,
            amount: 0.005,
            angle: 0,
            //tDiffuse: //value: Texture
        }
    };

    const effect3 = {
        shader: new ShaderPass(ACESFilmicToneMappingShader),
        setting: {
            use: false,
            exposure: 1,
            //tDiffuse: //value: Texture
        }
    };

    const effect4 = {
        shader: new ShaderPass(AfterimageShader),
        setting: { use: false, }
    };
    const effect5 = {
        shader: new ShaderPass(BasicShader),
        setting: { use: false, }
    };
    const effect6 = {
        shader: new ShaderPass(BleachBypassShader),
        setting: { use: false, }
    };
    const effect7 = {
        shader: new ShaderPass(BlendShader),
        setting: { use: false, }
    };
    const effect8 = {
        shader: new ShaderPass(BokehShader),
        setting: { use: false, }
    };
    const effect9a = {
        shader: new ShaderPass(BokehDepthShader),
        setting: { use: false, }
    };

    const effect9b = {
        shader: new ShaderPass(BokehShader2),
        setting: { use: false, }
    };

    const effect10 = {
        shader: new ShaderPass(BrightnessContrastShader),
        setting: { use: false, }
    };
    const effect11 = {
        shader: new ShaderPass(ColorCorrectionShader),
        setting: { use: false, }
    };
    const effect12 = {
        shader: new ShaderPass(ColorifyShader),
        setting: {
            use: false,
            colorR: 1,
            colorG: 1,
            colorB: 1,
        }
    };
    const effect13 = {
        shader: new ShaderPass(ConvolutionShader),
        setting: { use: false, }
    };
    const effect14 = {
        shader: new ShaderPass(CopyShader),
        setting: { use: false, }
    };
    const effect15 = {
        shader: new ShaderPass(DepthLimitedBlurShader),
        setting: { use: false, }
    };
    const effect16 = {
        shader: new ShaderPass(DigitalGlitch),
        setting: { use: false, }
    };
    const effect17 = {
        shader: new ShaderPass(DOFMipMapShader),
        setting: { use: false, }
    };
    const effect18 = {
        shader: new ShaderPass(FilmShader),
        setting: {
            use: false,
            grayscale: true,
            nIntensity: 0.5,
            sCount: 4096,
            sIntensity: 0.05,
            time: 0,
            //tDiffuse:Texture,
        }
    };
    const effect19 = {
        shader: new ShaderPass(FocusShader),
        setting: {
            use: false,
            sampleDistance: 0.94,
            screenHeight: 1024,
            screenWidth: 1024,
            waveFactor: 0.00125,
            //tDiffuse:Texture,
        }
    };
    const effect20 = {
        shader: new ShaderPass(FreiChenShader),
        setting: { use: false, }
    };
    const effect21 = {
        shader: new ShaderPass(FXAAShader),
        setting: {
            use: false,
            resolutionX: 0.0009765625,
            resolutionY: 0.001953125,
            //tDiffuse:Texture,
        }
    };
    const effect22 = {
        shader: new ShaderPass(GammaCorrectionShader),
        setting: { use: false, }
    };
    const effect23a = {
        shader: new ShaderPass(GodRaysDepthMaskShader),
        setting: { use: false, }
    };
    const effect23b = {
        shader: new ShaderPass(GodRaysGenerateShader),
        setting: { use: false, }
    };
    const effect23c = {
        shader: new ShaderPass(GodRaysCombineShader),
        setting: { use: false, }
    };
    const effect23d = {
        shader: new ShaderPass(GodRaysFakeSunShader),
        setting: { use: false, }
    };


    const effect24 = {
        shader: new ShaderPass(HalftoneShader),
        setting: { use: false, }
    };
    const effect25 = {
        shader: new ShaderPass(HorizontalBlurShader),
        setting: {
            use: false,
            h: 0.001953125,
            //tDiffuse:Texture,
        }
    };
    const effect26 = {
        shader: new ShaderPass(HorizontalTiltShiftShader),
        setting: {
            use: false,
            h: 0.001953125,
            r: 0.35,
            //tDiffuse:Texture,
        }
    };
    const effect27 = {
        shader: new ShaderPass(HueSaturationShader),
        setting: {
            use: false,
            hue: 0.1,
            saturation: 0.1,
        }
    };
    const effect28 = {
        shader: new ShaderPass(KaleidoShader),
        setting: {
            use: false,
            angle: 0,
            sides: 6,
            //tDiffuse:Texture,
        }
    };
    const effect29 = {
        shader: new ShaderPass(LuminosityHighPassShader),
        setting: { use: false, }
    };
    const effect30 = {
        shader: new ShaderPass(LuminosityShader),
        setting: { use: false, }
    };
    const effect31 = {
        shader: new ShaderPass(MirrorShader),
        setting: { use: false, }
    };
    const effect32 = {
        shader: new ShaderPass(MMDToonShader),
        setting: { use: false, }
    };
    const effect33 = {
        shader: new ShaderPass(NormalMapShader),
        setting: { use: false, }
    };
    const effect34 = {
        shader: new ShaderPass(PixelShader),
        setting: { use: false, }
    };
    const effect35 = {
        shader: new ShaderPass(SAOShader),
        setting: {
            use: false,
        }
    };
    const effect36 = {
        shader: new ShaderPass(SepiaShader),
        setting: {
            use: false,
            amount: 1,
        }
    };
    const effect37a = {
        shader: new ShaderPass(SMAAEdgesShader),
        setting: { use: false, }
    };
    const effect37b = {
        shader: new ShaderPass(SMAAWeightsShader),
        setting: { use: false, }
    };
    const effect37c = {
        shader: new ShaderPass(SMAABlendShader),
        setting: { use: false, }
    };
    const effect38 = {
        shader: new ShaderPass(SobelOperatorShader),
        setting: { use: false, }
    };
    const effect39a = {
        shader: new ShaderPass(SSAOShader),
        setting: { use: false, }
    };
    const effect39b = {
        shader: new ShaderPass(SSAODepthShader),
        setting: { use: false, }
    };
    const effect39c = {
        shader: new ShaderPass(SSAOBlurShader),
        setting: { use: false, }
    };
    const effect40a = {
        shader: new ShaderPass(SSRrShader),
        setting: { use: false, }
    };
    const effect40b = {
        shader: new ShaderPass(SSRrDepthShader),
        setting: { use: false, }
    };
    const effect41a = {
        shader: new ShaderPass(SSRShader),
        setting: { use: false, }
    };
    const effect41b = {
        shader: new ShaderPass(SSRDepthShader),
        setting: { use: false, }
    };
    const effect41c = {
        shader: new ShaderPass(SSRBlurShader),
        setting: { use: false, }
    };
    const effect42 = {
        shader: new ShaderPass(SubsurfaceScatteringShader),
        setting: { use: false, }
    };
    const effect43 = {
        shader: new ShaderPass(TechnicolorShader),
        setting: { use: false, }
    };
    const effect44 = {
        shader: new ShaderPass(ToneMapShader),
        setting: { use: false, }
    };
    const effect45a = {
        shader: new ShaderPass(ToonShader1),
        setting: { use: false, }
    };
    const effect45b = {
        shader: new ShaderPass(ToonShader2),
        setting: { use: false, }
    };
    const effect45c = {
        shader: new ShaderPass(ToonShaderHatching),
        setting: { use: false, }
    };
    const effect45d = {
        shader: new ShaderPass(ToonShaderDotted),
        setting: { use: false, }
    };
    const effect46 = {
        shader: new ShaderPass(TriangleBlurShader),
        setting: { use: false, }
    };
    const effect47 = {
        shader: new ShaderPass(UnpackDepthRGBAShader),
        setting: {
            use: false,
            opacity: 1,
        }
    };
    const effect48 = {
        shader: new ShaderPass(VerticalBlurShader),
        setting: {
            use: false,
            v: 0.001953125,
        }
    };
    const effect49 = {
        shader: new ShaderPass(VerticalTiltShiftShader),
        setting: {
            use: false,
            r: 0.35,
            v: 0.001953125,
            //tDiffuse:Texture,
        }
    };
    const effect50 = {
        shader: new ShaderPass(VignetteShader),
        setting: { use: false, }
    };
    const effect51 = {
        shader: new ShaderPass(VolumeRenderShader1),
        setting: { use: false, }
    };
    const effect52 = {
        shader: new ShaderPass(WaterRefractionShader),
        setting: { use: false, }
    };


    initGUI();
    return composer;

    function initGUI() {
        let gui = new GUI();

        let e1 = gui.addFolder("DotScreenShader");
        e1.close();
        e1.add(effect1.setting, 'use').onChange(() => {
            activeShader(effect1, effect1.setting.use)
        })
        e1.add(effect1.setting, 'scale').onChange(() => {
            effect1.shader.uniforms['scale'].value = effect1.setting.scale;
        });
        e1.add(effect1.setting, 'angle').onChange(() => {
            effect1.shader.uniforms['angle'].value = effect1.setting.angle;
        });
        e1.add(effect1.setting, 'centerX').onChange(() => {
            effect1.shader.uniforms['center'].value = { x: effect1.setting.centerX, y: effect1.setting.centerY };
        });
        e1.add(effect1.setting, 'centerY').onChange(() => {
            effect1.shader.uniforms['center'].value = { x: effect1.setting.centerX, y: effect1.setting.centerY };
        });
        e1.add(effect1.setting, 'tSizeX').onChange(() => {
            effect1.shader.uniforms['tSize'].value = { x: effect1.setting.tSizeX, y: effect1.setting.tSizeY };
        });
        e1.add(effect1.setting, 'tSizeY').onChange(() => {
            effect1.shader.uniforms['tSize'].value = { x: effect1.setting.tSizeX, y: effect1.setting.tSizeY };
        });

        let e2 = gui.addFolder("RGBShiftShader");
        e2.close();
        e2.add(effect2.setting, 'use').onChange(() => {
            activeShader(effect2, effect2.setting.use)
        })
        e2.add(effect2.setting, 'amount').onChange(() => {
            effect2.shader.uniforms['amount'].value = effect2.setting.amount;
        })
        e2.add(effect2.setting, 'angle').onChange(() => {
            effect2.shader.uniforms['angle'].value = effect2.setting.angle;
        })

        let e3 = gui.addFolder("ACESFilmicToneMappingShader");
        e3.close();
        e3.add(effect3.setting, 'use').onChange(() => {
            activeShader(effect3, effect3.setting.use)
        })
        e3.add(effect3.setting, 'exposure').onChange(() => {
            effect3.shader.uniforms['exposure'].value = effect3.setting.exposure;
        })

        let e18 = gui.addFolder("FilmShader");
        e18.close();
        e18.add(effect18.setting, 'use').onChange(() => {
            activeShader(effect18, effect18.setting.use)
        })
        e18.add(effect18.setting, 'grayscale').onChange(() => {
            effect18.shader.uniforms['grayscale'].value = effect18.setting.grayscale;
        })
        e18.add(effect18.setting, 'nIntensity').onChange(() => {
            effect18.shader.uniforms['nIntensity'].value = effect18.setting.nIntensity;
        })
        e18.add(effect18.setting, 'sCount').onChange(() => {
            effect18.shader.uniforms['sCount'].value = effect18.setting.sCount;
        })
        e18.add(effect18.setting, 'sIntensity').onChange(() => {
            effect18.shader.uniforms['sIntensity'].value = effect18.setting.sIntensity;
        })
        e18.add(effect18.setting, 'time').onChange(() => {
            effect18.shader.uniforms['time'].value = effect18.setting.time;
        })

        let e19 = gui.addFolder("FocusShader");
        e19.close();
        e19.add(effect19.setting, 'use').onChange(() => {
            activeShader(effect19, effect19.setting.use)
        })
        e19.add(effect19.setting, 'sampleDistance').onChange(() => {
            effect19.shader.uniforms['sampleDistance'].value = effect19.setting.sampleDistance;
        })
        e19.add(effect19.setting, 'screenHeight').onChange(() => {
            effect19.shader.uniforms['screenHeight'].value = effect19.setting.screenHeight;
        })
        e19.add(effect19.setting, 'screenWidth').onChange(() => {
            effect19.shader.uniforms['screenWidth'].value = effect19.setting.screenWidth;
        })
        e19.add(effect19.setting, 'waveFactor').onChange(() => {
            effect19.shader.uniforms['waveFactor'].value = effect19.setting.waveFactor;
        })

        let e21 = gui.addFolder("FXAAShader(抗锯齿)");
        e21.close();
        e21.add(effect21.setting, 'use').onChange(() => {
            activeShader(effect21, effect21.setting.use)
        })
        e21.add(effect21.setting, 'resolutionX').onChange(() => {
            effect21.shader.uniforms['resolution'].value = { x: effect21.setting.resolutionX, y: effect21.setting.resolutionY };
        })
        e21.add(effect21.setting, 'resolutionY').onChange(() => {
            effect21.shader.uniforms['resolution'].value = { x: effect21.setting.resolutionX, y: effect21.setting.resolutionY };
        })

        let e22 = gui.addFolder("GammaCorrectionShader(伽马校正)");
        e22.close();
        e22.add(effect22.setting, 'use').onChange(() => {
            activeShader(effect22, effect22.setting.use)
        })

        let e25 = gui.addFolder("HorizontalBlurShader");
        e25.close();
        e25.add(effect25.setting, 'use').onChange(() => {
            activeShader(effect25, effect25.setting.use)
        })
        e25.add(effect25.setting, 'h').onChange(() => {
            effect25.shader.uniforms['h'].value = effect25.setting.h;
        })

        let e26 = gui.addFolder("HorizontalTiltShiftShader");
        e26.close();
        e26.add(effect26.setting, 'use').onChange(() => {
            activeShader(effect26, effect26.setting.use)
        })
        e26.add(effect26.setting, 'h').onChange(() => {
            effect26.shader.uniforms['h'].value = effect26.setting.h;
        })
        e26.add(effect26.setting, 'r').onChange(() => {
            effect26.shader.uniforms['r'].value = effect26.setting.r;
        })

        let e28 = gui.addFolder("KaleidoShader(万花筒)");
        e28.close();
        e28.add(effect28.setting, 'use').onChange(() => {
            activeShader(effect28, effect28.setting.use)
        })
        e28.add(effect28.setting, 'angle').onChange(() => {
            effect28.shader.uniforms['angle'].value = effect28.setting.angle;
        })
        e28.add(effect28.setting, 'sides').onChange(() => {
            effect28.shader.uniforms['sides'].value = effect28.setting.sides;
        })

        let e47 = gui.addFolder("UnpackDepthRGBAShader");
        e47.close();
        e47.add(effect47.setting, 'use').onChange(() => {
            activeShader(effect47, effect47.setting.use)
        })
        e47.add(effect47.setting, 'opacity').onChange(() => {
            effect47.shader.uniforms['opacity'].value = effect47.setting.opacity;
        })

        let e48 = gui.addFolder("VerticalBlurShader");
        e48.close();
        e48.add(effect48.setting, 'use').onChange(() => {
            activeShader(effect48, effect48.setting.use)
        })
        e48.add(effect48.setting, 'v').onChange(() => {
            effect48.shader.uniforms['v'].value = effect48.setting.v;
        })

        let e49 = gui.addFolder("VerticalTiltShiftShader");
        e49.close();
        e49.add(effect49.setting, 'use').onChange(() => {
            activeShader(effect49, effect49.setting.use)
        })
        e49.add(effect49.setting, 'v').onChange(() => {
            effect49.shader.uniforms['v'].value = effect49.setting.v;
        })
        e49.add(effect49.setting, 'r').onChange(() => {
            effect49.shader.uniforms['r'].value = effect49.setting.r;
        })

        let e43 = gui.addFolder("TechnicolorShader");
        e43.close();
        e43.add(effect43.setting, 'use').onChange(() => {
            activeShader(effect43, effect43.setting.use)
        })

        let division = gui.addFolder("分割线(以下部分未暴露参数)");
        division.close();

        let e4 = gui.addFolder("AfterimageShader");
        e4.close();
        e4.add(effect4.setting, 'use').onChange(() => {
            activeShader(effect4, effect4.setting.use)
        })

        let e5 = gui.addFolder("BasicShader");
        e5.close();
        e5.add(effect5.setting, 'use').onChange(() => {
            activeShader(effect5, effect5.setting.use)
        })

        let e6 = gui.addFolder("BleachBypassShader");
        e6.close();
        e6.add(effect6.setting, 'use').onChange(() => {
            activeShader(effect6, effect6.setting.use)
        })

        let e7 = gui.addFolder("BlendShader");
        e7.close();
        e7.add(effect7.setting, 'use').onChange(() => {
            activeShader(effect7, effect7.setting.use)
        })

        let e8 = gui.addFolder("BokehShader");
        e8.close();
        e8.add(effect8.setting, 'use').onChange(() => {
            activeShader(effect8, effect8.setting.use)
        })

        let e9a = gui.addFolder("BokehDepthShader");
        e9a.close();
        e9a.add(effect9a.setting, 'use').onChange(() => {
            activeShader(effect9a, effect9a.setting.use)
        })

        let e9b = gui.addFolder("BokehShader2(用不了)");
        e9b.close();
        e9b.add(effect9b.setting, 'use').onChange(() => {
            activeShader(effect9b, effect9b.setting.use)
        })

        let e10 = gui.addFolder("BrightnessContrastShader");
        e10.close();
        e10.add(effect10.setting, 'use').onChange(() => {
            activeShader(effect10, effect10.setting.use)
        })

        let e11 = gui.addFolder("ColorCorrectionShader");
        e11.close();
        e11.add(effect11.setting, 'use').onChange(() => {
            activeShader(effect11, effect11.setting.use)
        })

        let e12 = gui.addFolder("ColorifyShader");
        e12.close();
        e12.add(effect12.setting, 'use').onChange(() => {
            activeShader(effect12, effect12.setting.use)
        })
        e12.add(effect12.setting, 'colorR').onChange(() => {
            effect12.shader.uniforms['color'].value = { r: effect12.setting.colorR, g: effect12.setting.colorG, b: effect12.setting.colorB };
        })
        e12.add(effect12.setting, 'colorG').onChange(() => {
            effect12.shader.uniforms['color'].value = { r: effect12.setting.colorR, g: effect12.setting.colorG, b: effect12.setting.colorB };
        })
        e12.add(effect12.setting, 'colorB').onChange(() => {
            effect12.shader.uniforms['color'].value = { r: effect12.setting.colorR, g: effect12.setting.colorG, b: effect12.setting.colorB };
        })

        let e13 = gui.addFolder("ConvolutionShader(报错)");
        e13.close();
        e13.add(effect13.setting, 'use').onChange(() => {
            activeShader(effect13, effect13.setting.use)
        })

        let e14 = gui.addFolder("CopyShader");
        e14.close();
        e14.add(effect14.setting, 'use').onChange(() => {
            activeShader(effect14, effect14.setting.use)
        })

        let e15 = gui.addFolder("DepthLimitedBlurShader(缺参数报错)");
        e15.close();
        e15.add(effect15.setting, 'use').onChange(() => {
            activeShader(effect15, effect15.setting.use)
        })

        let e16 = gui.addFolder("DigitalGlitch");
        e16.close();
        e16.add(effect16.setting, 'use').onChange(() => {
            activeShader(effect16, effect16.setting.use)
        })

        let e17 = gui.addFolder("DOFMipMapShader");
        e17.close();
        e17.add(effect17.setting, 'use').onChange(() => {
            activeShader(effect17, effect17.setting.use)
        })

        let e20 = gui.addFolder("FreiChenShader(用不了)");
        e20.close();
        e20.add(effect20.setting, 'use').onChange(() => {
            activeShader(effect20, effect20.setting.use)
        })

        let e23a = gui.addFolder("GodRaysDepthMaskShader");
        e23a.close();
        e23a.add(effect23a.setting, 'use').onChange(() => {
            activeShader(effect23a, effect23a.setting.use)
        })
        let e23b = gui.addFolder("GodRaysGenerateShader");
        e23b.close();
        e23b.add(effect23b.setting, 'use').onChange(() => {
            activeShader(effect23b, effect23b.setting.use)
        })
        let e23c = gui.addFolder("GodRaysCombineShader");
        e23c.close();
        e23c.add(effect23c.setting, 'use').onChange(() => {
            activeShader(effect23c, effect23c.setting.use)
        })
        let e23d = gui.addFolder("GodRaysFakeSunShader");
        e23d.close();
        e23d.add(effect23d.setting, 'use').onChange(() => {
            activeShader(effect23d, effect23d.setting.use)
        })

        let e24 = gui.addFolder("HalftoneShader");
        e24.close();
        e24.add(effect24.setting, 'use').onChange(() => {
            activeShader(effect24, effect24.setting.use)
        })

        let e27 = gui.addFolder("HueSaturationShader");
        e27.close();
        e27.add(effect27.setting, 'use').onChange(() => {
            activeShader(effect27, effect27.setting.use)
        })
        e27.add(effect27.setting, 'hue').onChange(() => {
            effect27.shader.uniforms['hue'].value = effect27.setting.hue;
        })
        e27.add(effect27.setting, 'saturation').onChange(() => {
            effect27.shader.uniforms['saturation'].value = effect27.setting.saturation;
        })

        let e29 = gui.addFolder("LuminosityHighPassShader");
        e29.close();
        e29.add(effect29.setting, 'use').onChange(() => {
            activeShader(effect29, effect29.setting.use)
        })

        let e30 = gui.addFolder("LuminosityShader");
        e30.close();
        e30.add(effect30.setting, 'use').onChange(() => {
            activeShader(effect30, effect30.setting.use)
        })

        let e31 = gui.addFolder("MirrorShader");
        e31.close();
        e31.add(effect31.setting, 'use').onChange(() => {
            activeShader(effect31, effect31.setting.use)
        })

        let e32 = gui.addFolder("MMDToonShader(缺参数报错)");
        e32.close();
        e32.add(effect32.setting, 'use').onChange(() => {
            activeShader(effect32, effect32.setting.use)
        })

        let e33 = gui.addFolder("NormalMapShader");
        e33.close();
        e33.add(effect33.setting, 'use').onChange(() => {
            activeShader(effect33, effect33.setting.use)
        })

        let e34 = gui.addFolder("PixelShader(缺参数报错)");
        e34.close();
        e34.add(effect34.setting, 'use').onChange(() => {
            activeShader(effect34, effect34.setting.use)
        })

        let e35 = gui.addFolder("SAOShader");
        e35.close();
        e35.add(effect35.setting, 'use').onChange(() => {
            activeShader(effect35, effect35.setting.use)
        })

        let e36 = gui.addFolder("SepiaShader");
        e36.close();
        e36.add(effect36.setting, 'use').onChange(() => {
            activeShader(effect36, effect36.setting.use)
        })
        e36.add(effect36.setting, 'amount').onChange(() => {
            effect36.shader.uniforms['amount'].value = effect36.setting.amount;
        })

        let e37a = gui.addFolder("SMAAEdgesShader");
        e37a.close();
        e37a.add(effect37a.setting, 'use').onChange(() => {
            activeShader(effect37a, effect37a.setting.use)
        })
        let e37b = gui.addFolder("SMAAWeightsShader");
        e37b.close();
        e37b.add(effect37b.setting, 'use').onChange(() => {
            activeShader(effect37b, effect37b.setting.use)
        })
        let e37c = gui.addFolder("SMAABlendShader");
        e37c.close();
        e37c.add(effect37c.setting, 'use').onChange(() => {
            activeShader(effect37c, effect37c.setting.use)
        })

        let e38 = gui.addFolder("SobelOperatorShader");
        e38.close();
        e38.add(effect38.setting, 'use').onChange(() => {
            activeShader(effect38, effect38.setting.use)
        })

        let e39a = gui.addFolder("SSAOShader(环境光遮蔽)(缺参数报错)");
        e39a.close();
        e39a.add(effect39a.setting, 'use').onChange(() => {
            activeShader(effect39a, effect39a.setting.use)
        })
        let e39b = gui.addFolder("SSAODepthShader");
        e39b.close();
        e39b.add(effect39b.setting, 'use').onChange(() => {
            activeShader(effect39b, effect39b.setting.use)
        })
        let e39c = gui.addFolder("SSAOBlurShader");
        e39c.close();
        e39c.add(effect39c.setting, 'use').onChange(() => {
            activeShader(effect39c, effect39c.setting.use)
        })

        let e40a = gui.addFolder("SSRrShader");
        e40a.close();
        e40a.add(effect40a.setting, 'use').onChange(() => {
            activeShader(effect40a, effect40a.setting.use)
        })
        let e40b = gui.addFolder("SSRrDepthShader");
        e40b.close();
        e40b.add(effect40b.setting, 'use').onChange(() => {
            activeShader(effect40b, effect40b.setting.use)
        })

        let e41a = gui.addFolder("SSRShader");
        e41a.close();
        e41a.add(effect41a.setting, 'use').onChange(() => {
            activeShader(effect41a, effect41a.setting.use)
        })
        let e41b = gui.addFolder("SSRDepthShader");
        e41b.close();
        e41b.add(effect41b.setting, 'use').onChange(() => {
            activeShader(effect41b, effect41b.setting.use)
        })
        let e41c = gui.addFolder("SSRBlurShader");
        e41c.close();
        e41c.add(effect41c.setting, 'use').onChange(() => {
            activeShader(effect41c, effect41c.setting.use)
        })

        let e42 = gui.addFolder("SubsurfaceScatteringShader(缺参数报错)");
        e42.close();
        e42.add(effect42.setting, 'use').onChange(() => {
            activeShader(effect42, effect42.setting.use)
        })

        let e44 = gui.addFolder("ToneMapShader");
        e44.close();
        e44.add(effect44.setting, 'use').onChange(() => {
            activeShader(effect44, effect44.setting.use)
        })

        let e45a = gui.addFolder("ToonShader1");
        e45a.close();
        e45a.add(effect45a.setting, 'use').onChange(() => {
            activeShader(effect45a, effect45a.setting.use)
        })
        let e45b = gui.addFolder("ToonShader2");
        e45b.close();
        e45b.add(effect45b.setting, 'use').onChange(() => {
            activeShader(effect45b, effect45b.setting.use)
        })
        let e45c = gui.addFolder("ToonShaderHatching");
        e45c.close();
        e45c.add(effect45c.setting, 'use').onChange(() => {
            activeShader(effect45c, effect45c.setting.use)
        })
        let e45d = gui.addFolder("ToonShaderDotted");
        e45d.close();
        e45d.add(effect45d.setting, 'use').onChange(() => {
            activeShader(effect45d, effect45d.setting.use)
        })

        let e46 = gui.addFolder("TriangleBlurShader(用不了)");
        e46.close();
        e46.add(effect46.setting, 'use').onChange(() => {
            activeShader(effect46, effect46.setting.use)
        })

        let e50 = gui.addFolder("VignetteShader");
        e50.close();
        e50.add(effect50.setting, 'use').onChange(() => {
            activeShader(effect50, effect50.setting.use)
        })

        let e51 = gui.addFolder("VolumeShader");
        e51.close();
        e51.add(effect51.setting, 'use').onChange(() => {
            activeShader(effect51, effect51.setting.use)
        })

        let e52 = gui.addFolder("WaterRefractionShader(缺参数报错)");
        e52.close();
        e52.add(effect52.setting, 'use').onChange(() => {
            activeShader(effect52, effect52.setting.use)
        })

    }
    function activeShader(effect, isOn) {
        console.log(isOn, effect.shader);
        if (isOn)
            composer.addPass(effect.shader);
        else
            composer.removePass(effect.shader);
    }
}


export { init };
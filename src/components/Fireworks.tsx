import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import {
  Engine,
  IParticlesOptions,
  IRangeValue,
  RangeValue,
  RecursivePartial,
  rgbToHsl,
  setRangeValue,
  stringToRgb,
} from "tsparticles-engine";

const fixRange = (value: IRangeValue, min: number, max: number): RangeValue => {
  const diffSMax = value.max > max ? value.max - max : 0;
  let res = setRangeValue(value);

  if (diffSMax) {
    res = setRangeValue(value.min - diffSMax, max);
  }

  const diffSMin = value.min < min ? value.min : 0;

  if (diffSMin) {
    res = setRangeValue(0, value.max + diffSMin);
  }

  return res;
};
const fireworksOptions: RecursivePartial<IParticlesOptions>[] = [
  "#ff595e",
  "#ffca3a",
  "#8ac926",
  "#1982c4",
  "#6a4c93",
]
  .map((color) => {
    const rgb = stringToRgb(color);

    if (!rgb) {
      return undefined;
    }

    const hsl = rgbToHsl(rgb),
      sRange = fixRange({ min: hsl.s - 20, max: hsl.s + 20 }, 0, 100),
      lRange = fixRange({ min: hsl.l - 20, max: hsl.l + 20 }, 0, 100);

    return {
      color: {
        value: {
          h: hsl.h,
          s: sRange,
          l: lRange,
        },
      },
      stroke: {
        width: 0,
      },
      number: {
        value: 0,
      },
      collisions: {
        enable: false,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 0.7,
          sync: false,
          startValue: "max",
          destroy: "min",
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
        animation: {
          enable: true,
          speed: 5,
          count: 1,
          sync: false,
          startValue: "min",
          destroy: "none",
        },
      },
      life: {
        count: 1,
        duration: {
          value: {
            min: 1,
            max: 2,
          },
        },
      },
      move: {
        decay: 0.05,
        enable: true,
        gravity: {
          enable: true,
          inverse: false,
          acceleration: 5,
        },
        speed: { min: 5, max: 10 },
        direction: "none",
        outModes: "destroy",
      },
    } as RecursivePartial<IParticlesOptions>;
  })
  .filter((t) => t !== undefined) as RecursivePartial<IParticlesOptions>[];

export const Fireworks = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        backgroundMode: { zIndex: -1 },
        background: { color: "#000", opacity: 0 },
        detectRetina: true,
        fpsLimit: 120,
        emitters: {
          direction: "top",
          life: {
            count: 0,
            duration: 0.1,
            delay: 0.1,
          },
          rate: {
            delay: 0.5,
            quantity: 1,
          },
          size: {
            width: 0,
            height: 0,
          },
          position: {
            y: 100,
            x: 50,
          },
        },
        particles: {
          number: {
            value: 0,
          },
          destroy: {
            mode: "split",
            split: {
              count: 1,
              factor: {
                value: 0.333333,
              },
              rate: {
                value: 50,
              },
              particles: fireworksOptions,
            },
          },
          life: {
            count: 1,
          },
          shape: {
            type: "line",
          },
          size: {
            value: {
              min: 0.1,
              max: 50,
            },
            animation: {
              enable: true,
              sync: true,
              speed: 100,
              startValue: "max",
              destroy: "min",
            },
          },
          stroke: {
            color: {
              value: "#ffffff",
            },
            width: 1,
          },
          rotate: {
            path: true,
          },
          move: {
            enable: true,
            gravity: {
              acceleration: 15,
              enable: true,
              inverse: true,
              maxSpeed: 100,
            },
            speed: {
              min: 10,
              max: 20,
            },
            outModes: {
              default: "destroy",
              top: "none",
            },
            trail: {
              fillColor: "#000",
              enable: true,
              length: 10,
            },
          },
        },
      }}
    />
  );
};

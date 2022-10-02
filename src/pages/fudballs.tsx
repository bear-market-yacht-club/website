import type { NextPage } from "next";
import { Game as GameType } from "phaser";
import { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { isProduction } from "../types/generic";

const Fudballs: NextPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [game, setGame] = useState<GameType>();
  const phaserContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: Fudballs } = await import("../scenes/fudballs");
      const { default: PauseMenu } = await import("../scenes/pause-menu");

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        title: "Lava Game",
        parent: "phaser-container",
        backgroundColor: "#000000",
        scale: {
          mode: Phaser.Scale.ScaleModes.ENVELOP,
          width: 280,
          height: 280,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
          zoom: 2,
        },
        physics: {
          default: "arcade",
          arcade: { /*debug:!isProduction,*/ gravity: { x: 0, y: 0 } },
        },
        scene: [Fudballs, PauseMenu],
      });
      setGame(game);
      game.scene.start("lava");
    }
    if (isLoaded) {
      initPhaser();
    }
  }, [isLoaded]);

  return (
    <Layout>
      <Heading>Fudballs</Heading>
      <div className="flex flex-col justify-between">
        <p className="-mt-4 mb-2 text-center">
          Collect the Eth*! Avoid the Fudballs!
        </p>
        {phaserContainerRef.current?.childElementCount === 0 && (
          <p className="text-center">Loading...</p>
        )}
        <div className="">
          <div
            id="phaser-container"
            className="mx-auto max-w-[90%] lg:max-w-[600px] max-height-[50vh]"
            key="phaser-container"
            ref={phaserContainerRef}
          ></div>
        </div>
        <p className="text-center text-xs">
          Obviously not real eth, you dumbass
        </p>
      </div>
    </Layout>
  );
};

export default Fudballs;

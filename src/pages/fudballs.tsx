import type { NextPage } from "next";
import Image from "next/image";
import { Game as GameType } from "phaser";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import dateToString from "../utils/dateToString";
import { trpc } from "../utils/trpc";

const Fudballs: NextPage = () => {
  const [game, setGame] = useState<GameType>();
  const [mute, setMute] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phaserContainerRef = useRef<HTMLDivElement>(null);
  const { refetch: fetchHighscore } = trpc.useQuery([
    "fudballs.getHighscore",
    { twitterHandle },
  ]);
  const { refetch: fetchBestTime } = trpc.useQuery([
    "fudballs.getBestTime",
    { twitterHandle },
  ]);
  const { data: muted } = trpc.useQuery([
    "game_settings.getMuted",
    { twitterHandle },
  ]);
  const { mutate: setHighscore } = trpc.useMutation("fudballs.setHighcore");
  const { mutate: setBestTime } = trpc.useMutation("fudballs.setBestTime");
  const { mutate: startGame } = trpc.useMutation("fudballs.startGame");
  const { mutate: endGame } = trpc.useMutation("fudballs.endGame");
  const { data: scoreLeaderboard } = trpc.useQuery([
    "fudballs.scoreLeaderboards",
  ]);
  const { data: timeLeaderboard } = trpc.useQuery([
    "fudballs.timeLeaderboards",
  ]);
  const { mutate: setMuted } = trpc.useMutation("game_settings.setMuted");

  useEffect(() => {
    const th = localStorage
      .getItem("twitter_handle")
      ?.toLowerCase()
      .trim()
      .replace(/^@+/, "")
      .trim();
    if (th) {
      localStorage.setItem("twitter_handle", th);
      setTwitterHandle(th);
    }
  }, []);

  useEffect(() => {
    const m = async () => {
      if (muted && game) {
        setMute(muted.muted);
        game.sound.mute = muted.muted;
      }
    };
    m();
  }, [game, muted]);

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const {
        default: Fudballs,
        GameoverMenu,
        PauseMenu,
      } = await import("../scenes/fudballs");
      if (
        game ||
        !twitterHandle ||
        !fetchBestTime ||
        !fetchHighscore ||
        !setHighscore ||
        !setBestTime ||
        !startGame ||
        !endGame
      ) {
        return;
      }

      const fudballs = new Phaser.Game({
        type: Phaser.AUTO,
        title: "Lava Game",
        parent: "phaser-container",
        backgroundColor: "#000000",
        scale: {
          mode: Phaser.Scale.ScaleModes.ENVELOP,
          width: 280,
          height: 330,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
          zoom: 2,
        },
        physics: {
          default: "arcade",
          arcade: { /*debug:!isProduction,*/ gravity: { x: 0, y: 0 } },
        },
        dom: {
          createContainer: true,
        },
        scene: [Fudballs, GameoverMenu, PauseMenu],
      });
      setGame(fudballs);
      fudballs.scene.start("fudballs", {
        twitterHandle,
        fetchBestTime,
        fetchHighscore,
        setHighscore,
        setBestTime,
        startGame,
        endGame,
      });
    }
    initPhaser();
    fetchBestTime().then((value) => value.data);
  }, [
    twitterHandle,
    fetchBestTime,
    fetchHighscore,
    setHighscore,
    setBestTime,
    startGame,
    endGame,
    game,
  ]);

  const toggleMute = () => {
    setMute(!mute);
    setMuted({ twitter_handle: twitterHandle, muted: !mute });
    if (game) {
      game.sound.mute = !mute;
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (nameRef.current?.value) {
      setTwitterHandle(nameRef.current.value);
      localStorage.setItem(
        "twitter_handle",
        nameRef.current.value.toLowerCase().trim().replace(/^@+/, "").trim()
      );
    }
  };

  return (
    <Layout>
      <Heading>
        <div className="flex justify-between items-center">
          <p>Fudballs</p>
          <div className="">
            <Image
              src="/images/mute.svg"
              className="cursor-pointer"
              width={50}
              height={50}
              alt="mute button"
              onClick={toggleMute}
            />
          </div>
        </div>
      </Heading>
      <div className="flex flex-col justify-between">
        <p className="-mt-4 mb-2 text-center">
          Collect the Eth*! Avoid the Fudballs!
        </p>
        {phaserContainerRef.current?.childElementCount === 0 && (
          <p className="text-center text-3xl italic text-yellow font-extrabold m-8">
            Loading...
          </p>
        )}
        <div className="">
          {!!twitterHandle ? (
            <div
              id="phaser-container"
              className="mx-auto lg:max-w-[600px] max-height-[50vh]"
              key="phaser-container"
              ref={phaserContainerRef}
            ></div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="space-y-8">
                <p>Enter Twitter handle to start dodging fud</p>
                <div className="flex items-center">
                  <span className="text-yellow text-sm">@</span>
                  <input
                    ref={nameRef}
                    name="twitterHandle"
                    className="text-lg"
                    type="text"
                  />
                </div>
                <Button>Begin!</Button>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-xs mt-4">
          Obviously not real eth, you dumbass
        </p>
        <hr className="my-12" />
        <div className="flex flex-col md:flex-row md:justify-around">
          <div className="flex flex-col items-center">
            <Heading>Score Leaderboard</Heading>
            {scoreLeaderboard && (
              <table className="w-full mb-8">
                <td>
                  {scoreLeaderboard.map((entry, i) => (
                    <tr
                      key={i}
                      style={{
                        fontWeight:
                          twitterHandle === entry.twitter_handle
                            ? "bolder"
                            : "normal",
                        color:
                          twitterHandle === entry.twitter_handle
                            ? "#bfc500"
                            : "white",
                      }}
                    >
                      {entry.twitter_handle}
                    </tr>
                  ))}
                </td>
                <td className="font-bold text-yellow">
                  {scoreLeaderboard.map((entry, i) => (
                    <tr key={i}>{entry.highscore}</tr>
                  ))}
                </td>
              </table>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Heading>Time Leaderboard</Heading>
            {timeLeaderboard && (
              <table className="w-full mb-8">
                <td>
                  {timeLeaderboard.map((entry, i) => (
                    <tr
                      key={i}
                      style={{
                        fontWeight:
                          twitterHandle === entry.twitter_handle
                            ? "bolder"
                            : "normal",
                        color:
                          twitterHandle === entry.twitter_handle
                            ? "#bfc500"
                            : "white",
                      }}
                    >
                      {entry.twitter_handle}
                    </tr>
                  ))}
                </td>
                <td className="font-bold text-yellow">
                  {timeLeaderboard.map((entry, i) => (
                    <tr key={i}>{dateToString(entry.best_time)}</tr>
                  ))}
                </td>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fudballs;

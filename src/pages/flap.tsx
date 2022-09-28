import type { NextPage } from "next";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { wrap } from "../utils/wrap";

const FlappyBear: NextPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHighscore, setIsHighscore] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);

  const { mutate: applyMutation } = trpc.useMutation("flap.setScore");
  const { mutate: startGame } = trpc.useMutation("flap.startGame");
  const { mutate: endGame } = trpc.useMutation("flap.endGame");
  const { refetch: fetchHighscore } = trpc.useQuery([
    "flap.getHighscore",
    { twitterHandle },
  ]);
  const { data: leaderboards } = trpc.useQuery(["flap.leaderboards"]);

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
      setIsLoaded(true);
      if (canvas.current) {
        canvas.current.height = canvas.current.width * 1.5;
      }
    }
  }, [twitterHandle]);

  useEffect(() => {
    if (isLoaded) {
      let gameStarted = false;
      const c: HTMLCanvasElement | null = document.getElementById(
        "canvas"
      ) as HTMLCanvasElement;
      if (c) {
        const ctx = c.getContext("2d")!;
        ctx.font = ctx.font.replace(/\d+px/, "20px");
        const bird = new Image();
        bird.src = "/images/flappy-bear/bear.svg";
        const bg = new Image();
        bg.src = "/images/flappy-bear/bg.png";
        const birdX = 20;
        let birdY = 200;
        let birdDY = 0;
        const gravity = 0.5;
        const birdSize = 50;
        const interval = 24;
        const canvasSizeX = ctx.canvas.width;
        const canvasSizeY = ctx.canvas.height;
        let pipeX = 400;
        const pipeWidth = 50;
        let topPipeBottomY = 50;
        const pipeGap = 130;
        let score = 0;
        let hs = 0;
        fetchHighscore().then((value) => (hs = value.data || 0));
        let scoreGotten = false;
        let bgPos = 0;
        let bg2Pos = 0;
        const bgSize = canvasSizeY * 0.9496666666666667;
        c.onclick = () => {
          if (gameStarted) {
            birdDY = 9;
          } else if (!isHighscore) {
            startGame({ twitterHandle });
            fetchHighscore().then((value) => (hs = value.data || highscore));
            gameStarted = true;
          }
        };
        setInterval(async () => {
          ctx.drawImage(
            bg,
            (bgPos = wrap(bgPos, -1, -bgSize, 0)),
            0,
            bgSize,
            canvasSizeY
          );
          ctx.drawImage(
            bg,
            (bg2Pos = wrap(bgPos + bgSize, -1, 0, bgSize)),
            0,
            bgSize,
            canvasSizeY
          );
          ctx.drawImage(bird, birdX, birdY, birdSize, birdSize);
          if (gameStarted) {
            birdY -= birdDY -= gravity;
            ctx.fillStyle = "firebrick";
            pipeX -= 5;
            if (pipeX < -pipeWidth) {
              pipeX = canvasSizeX;
              topPipeBottomY = pipeGap * Math.random() * 2.5;
              scoreGotten = false;
            }
            ctx.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
            ctx.fillRect(
              pipeX,
              topPipeBottomY + pipeGap,
              pipeWidth,
              canvasSizeY
            );
            if (pipeX < birdSize / 2 && !scoreGotten) {
              ++score;
              scoreGotten = true;
            }
            //on die
            if (
              ((birdY + birdSize / 2 < topPipeBottomY ||
                birdY > topPipeBottomY + pipeGap - birdSize / 2) &&
                pipeX < birdSize) ||
              birdY > canvasSizeY
            ) {
              if (score > hs) {
                hs = score;
                setHighscore(hs);
                setIsHighscore(true);
                applyMutation({
                  twitter_handle: twitterHandle,
                  highscore: hs,
                });
              }
              endGame({ twitterHandle });
              gameStarted = false;
              score = 0;
              birdDY = 0;
              birdY = 200;
              pipeX = canvasSizeX;
              topPipeBottomY = pipeGap * Math.random() * 2.5;
            }
          } else {
            ctx.fillStyle = "black";
            ctx.fillText("Press to start", 100, 230);
          }
          ctx.fillStyle = "black";
          ctx.fillText(score.toString(), 9, 25);
          ctx.fillText(`Best: ${hs}`, canvasSizeX - 100, 25);
        }, interval);
      }
    } else {
    }
  }, [isLoaded]);

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
      <Heading className="-mt-4">Flappy Bear</Heading>

      <div className="">
        <p className="-mt-4 mb-2 text-center">
          Help the bear fly through the FUD!
        </p>
        <div className="flex w-full justify-center">
          {!!twitterHandle ? (
            <>
              <canvas
                id="canvas"
                ref={canvas}
                className="w-full lg:w-1/4"
              ></canvas>
              {isHighscore ? (
                <div className="absolute top-[50%] translate-x-[1.5%] z-10 text-black font-black text-xl bg-white rounded-xl px-2">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=Just scored a highscore of ${highscore} in Flappy Bear!! 🐻 Come flap with us at bmyc.io/flap! @BearMarketYC`}
                    onClick={() => setIsHighscore(false)}
                  >
                    Tweet your achievement!
                  </a>
                  <span
                    className="absolute text-base -top-4 bg-gray-400 rounded-full px-2 cursor-pointer"
                    onClick={() => setIsHighscore(false)}
                  >
                    X
                  </span>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="space-y-8">
                <p>Enter Twitter handle to start flapping</p>
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
        <hr className="my-12" />
        <div className="flex flex-col items-center">
          <Heading>Leaderboard</Heading>
          {leaderboards && (
            <table className="w-[80%] sm:w-1/2 lg:w-1/3 mb-8">
              <td>
                {leaderboards.map((entry, i) => (
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
                {leaderboards.map((entry, i) => (
                  <tr key={i}>{entry.highscore}</tr>
                ))}
              </td>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FlappyBear;

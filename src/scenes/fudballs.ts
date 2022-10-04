import Phaser, { Scene } from "phaser";
import dateToString from "../utils/dateToString";

export class PauseMenu extends Scene {
  private bottomOffset = 0;

  constructor() {
    super("pause-menu");
  }

  create({
    startGame,
    twitterHandle,
  }: {
    startGame: any;
    twitterHandle: string;
  }) {
    this.bottomOffset = this.sys.canvas.height - this.sys.canvas.width;
    this.add
      .text(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height - this.bottomOffset) / 2,
        "Click to start",
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "24px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => {
      startGame({ twitterHandle });
      this.scene.resume("fudballs");
      this.scene.stop();
    });
  }
}

export class GameoverMenu extends Scene {
  private bottomOffset = 0;

  constructor() {
    super("gameover-menu");
  }

  create({
    game,
    startGame,
    twitterHandle,
    highscore,
    bestTime,
  }: {
    game: Phaser.Scenes.ScenePlugin;
    startGame: any;
    twitterHandle: string;
    highscore?: number;
    bestTime?: number;
  }) {
    this.bottomOffset = this.sys.canvas.height - this.sys.canvas.width;
    this.add
      .text(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height - this.bottomOffset) / 2 - 40,
        "Game Over",
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "24px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0.5, 0.5);
    this.add
      .text(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height - this.bottomOffset) / 2,
        "Click to restart",
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0.5, 0.5);

    //share to twitter button
    const html = (value: number, time = false) => `<div class="mx-auto w-[${
      this.sys.canvas.width
    }px]">
            <a rel="noreferrer" target="_blank"
              class="text-lg font-extrabold font-[Montserrat] text-yellow bg-[#00000077] py-2"
              href='https://twitter.com/intent/tweet?text=${
                time
                  ? `I just dodged fudballs for ${dateToString(
                      value
                    )}!! 🐻 Come dodge the fud 👉 bmyc.io/fudballs! @BearMarketYC`
                  : `Just collected ${value}Ξ in Fudballs!! 🐻 Come dodge the fud 👉 bmyc.io/fudballs! @BearMarketYC`
              }'>    Tweet your achievement!    
            </a>
        </div>`;
    if (highscore && highscore > 9) {
      this.add
        .dom(
          this.sys.canvas.width / 2,
          (this.sys.canvas.height - this.bottomOffset) / 2 + 40
        )
        .createFromHTML(html(highscore));
    } else if (bestTime) {
      this.add
        .dom(
          this.sys.canvas.width / 2,
          (this.sys.canvas.height - this.bottomOffset) / 2 + 40
        )
        .createFromHTML(html(bestTime, true));
    }

    this.input.once("pointerdown", () => {
      startGame({ twitterHandle });
      game.restart({ restart: true });
      this.scene.stop();
    });
  }
}

export default class Fudballs extends Scene {
  public score = 0;
  public highScore = 0;
  public elapsedTime = 0;
  public bestTime = 0;
  public fireballCount = 16;

  private bearSpeed = 0.005;
  private fireballSpeed = 70;
  private beatHighscore = false;
  private beatBestTime = false;
  private gameArea?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private spawnAreas?: Phaser.Physics.Arcade.Group;
  private spawnAreasRect: Phaser.GameObjects.Rectangle[] = [];
  private bg?: Phaser.GameObjects.Image;
  private bear?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private coin?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private fireballs?: Phaser.Physics.Arcade.Group;
  private scoreText?: Phaser.GameObjects.Text;
  private highScoreText?: Phaser.GameObjects.Text;
  private timerText?: Phaser.GameObjects.Text;
  private bestTimeText?: Phaser.GameObjects.Text;
  private activeFireballs: boolean[] = [false];
  private bgMusic?: Phaser.Sound.BaseSound;
  private bottomOffset = 0;

  private twitterHandle?: string;
  private startGame?: any;
  private endGame?: any;
  private setHighscore?: any;
  private setBestTime?: any;

  constructor() {
    super("fudballs");
  }

  preload() {
    this.bottomOffset = this.sys.canvas.height - this.sys.canvas.width;

    this.load.image("empty", "/images/empty.png");
    this.load.image("bg", "/images/fudballs/bg.png");
    this.load.spritesheet("coin", "/images/fudballs/coin.png", {
      frameWidth: 26,
    });
    this.load.image("bear-idle", "/images/fudballs/bear-idle.png");
    this.load.image("bear-dead", "/images/fudballs/bear-dead.png");
    this.load.spritesheet("bear-left", "/images/fudballs/bear-left.png", {
      frameWidth: 32,
    });
    this.load.spritesheet("bear-right", "/images/fudballs/bear-right.png", {
      frameWidth: 32,
    });
    this.load.image("fireball", "/images/fudballs/fireball.png");

    this.load.audio("bg", ["/sound/fudballs/bg.m4a"]);
    this.load.audio("highscore", ["/sound/fudballs/highscore.ogg"]);
    this.load.audio("lose", ["/sound/fudballs/lose.m4a"]);
    [...Array(10)].forEach((_, i) =>
      this.load.audio(`coin${i}`, [`/sound/fudballs/coin${i}.wav`])
    );
  }

  async create(
    data:
      | {
          twitterHandle: string;
          fetchBestTime: any;
          fetchHighscore: any;
          setHighscore: any;
          setBestTime: any;
          startGame: any;
          endGame: any;
          restart: boolean;
        }
      | undefined
  ) {
    if (!this.bgMusic || !this.bgMusic.isPlaying) {
      this.bgMusic = this.sound.add("bg");
      this.bgMusic.play({ volume: 1, loop: true });
    }

    this.beatHighscore = false;
    this.beatBestTime = false;
    this.score = 0;
    this.elapsedTime = 0;
    if (data?.twitterHandle) {
      this.twitterHandle = data.twitterHandle;
    }
    if (data?.fetchHighscore) {
      const value: { data: number | undefined } = await data.fetchHighscore();
      this.highScore = value.data || 0;
    }
    if (data?.fetchBestTime) {
      const value: { data: number | undefined } = await data.fetchBestTime();
      this.bestTime = value.data || 0;
    }
    if (data?.setHighscore) {
      this.setHighscore = data.setHighscore;
    }
    if (data?.setBestTime) {
      this.setBestTime = data.setBestTime;
    }
    if (data?.startGame) {
      this.startGame = data.startGame;
    }
    if (data?.endGame) {
      this.endGame = data.endGame;
    }

    // set spawn area
    this.gameArea = this.physics.add
      .image(
        this.sys.canvas.width / 2,
        (this.sys.canvas.height - this.bottomOffset) / 2,
        "empty"
      )
      .setCircle(16)
      .setScale(8, 8);
    const spawnAreaSize = 50;
    const spawnAreaGap = 10;
    //top
    this.spawnAreasRect[0] = new Phaser.GameObjects.Rectangle(
      this,
      -spawnAreaSize - spawnAreaGap,
      -spawnAreaSize - spawnAreaGap,
      this.sys.canvas.width + spawnAreaSize * 2 + spawnAreaGap * 2,
      spawnAreaSize
    );
    //bottom
    this.spawnAreasRect[1] = new Phaser.GameObjects.Rectangle(
      this,
      -spawnAreaSize - spawnAreaGap,
      this.sys.canvas.height + spawnAreaGap,
      this.sys.canvas.width + spawnAreaSize * 2,
      spawnAreaSize
    );
    //left
    this.spawnAreasRect[2] = new Phaser.GameObjects.Rectangle(
      this,
      -spawnAreaSize - spawnAreaGap,
      0,
      spawnAreaSize,
      this.sys.canvas.height
    );
    //right
    this.spawnAreasRect[3] = new Phaser.GameObjects.Rectangle(
      this,
      this.sys.canvas.width + spawnAreaGap,
      0,
      spawnAreaSize,
      this.sys.canvas.height
    );
    this.spawnAreasRect.forEach((rect) => rect.setOrigin(0, 0));
    this.spawnAreas = this.physics.add.group(this.spawnAreasRect);

    // ui
    this.bg = this.add.image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "bg"
    );
    this.scoreText = this.add.text(10, 5, `${this.score.toString()}Ξ`, {
      color: "#bfc500",
      fontFamily: "Montserrat",
      fontSize: "24px",
      fontStyle: "600",
      stroke: "black",
      strokeThickness: 2,
    });
    this.highScoreText = this.add
      .text(
        10,
        this.sys.canvas.height - 10,
        `Best: ${this.highScore.toString()}Ξ`,
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0, 1);
    this.timerText = this.add.text(this.sys.canvas.width - 115, 5, "00:00.00", {
      color: "#bfc500",
      fontFamily: "Montserrat",
      fontSize: "24px",
      fontStyle: "600",
      stroke: "black",
      strokeThickness: 2,
    });
    this.bestTimeText = this.add
      .text(
        this.sys.canvas.width - 125,
        this.sys.canvas.height - 10,
        `Best: ${dateToString(this.bestTime)}`,
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0, 1);
    this.scoreText.depth = 10;
    this.highScoreText.depth = 10;
    this.timerText.depth = 10;
    this.bestTimeText.depth = 10;

    //coin
    const pos = this.randomPos();
    this.coin = this.physics.add.sprite(pos.x, pos.y, "coin");
    this.coin.scale = 0.6;
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.coin.anims.play("spin", true);

    // the bear
    this.bear = this.physics.add.sprite(
      this.sys.canvas.width / 2,
      (this.sys.canvas.height - this.bottomOffset) / 2,
      "bear-idle"
    );
    this.bear.setSize(16, 25);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("bear-left", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("bear-right", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 1,
    });

    // fireball
    this.fireballs = this.physics.add.group({
      setScale: { x: 0.8, y: 0.8 },
    });

    //bear
    this.physics.add.overlap(
      this.bear,
      this.fireballs,
      this.onDie,
      undefined,
      this
    );
    this.physics.add.collider(
      this.bear,
      this.spawnAreas,
      this.onDie,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.bear,
      this.coin,
      this.resetCoin,
      undefined,
      this
    );

    //fireballs
    this.physics.add.overlap(
      this.fireballs,
      this.spawnAreas,
      this.resetFireball,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.fireballs,
      this.gameArea,
      this.enterFireball,
      undefined,
      this
    );

    this.time.addEvent({
      repeat: this.fireballCount,
      delay: 500,
      callback: this.addFireball,
      callbackScope: this,
    });

    if (!data || !data.restart) {
      this.scene.launch("pause-menu", {
        startGame: this.startGame,
        twitterHandle: this.twitterHandle,
      });
      this.scene.pause();
    }
  }

  update(_time: number, delta: number) {
    if (this.bear && this.gameArea) {
      // bear
      if (this.input.activePointer.leftButtonDown()) {
        if (this.input.activePointer.x < this.bear.x) {
          this.bear.anims.play("left", true);
        } else {
          this.bear.anims.play("right", true);
        }

        const board = new Phaser.Geom.Circle(
          this.gameArea.x,
          this.gameArea.y,
          this.gameArea.displayWidth / 2
        );
        const newPos = new Phaser.Math.Vector2(
          Phaser.Math.Interpolation.Linear(
            [this.bear.x, this.input.activePointer.worldX],
            delta * this.bearSpeed
          ),
          Phaser.Math.Interpolation.Linear(
            [
              this.bear.y,
              this.input.mousePointer.worldY || this.input.pointer1.worldY - 70,
            ],
            delta * this.bearSpeed
          )
        );

        // clamp new position to game area
        const distance = new Phaser.Math.Vector2(
          newPos.x - board.x,
          newPos.y - board.y
        );
        const mouseDir = distance.clone().normalize();
        if (distance.length() > board.radius) {
          newPos.x = mouseDir.x * board.radius + board.x;
          newPos.y = mouseDir.y * board.radius + board.y;
        }

        this.bear.setPosition(newPos.x, newPos.y);
      } else {
        this.bear.anims.stopAfterRepeat(0);
      }
    }

    if (this.timerText && this.bestTimeText) {
      this.elapsedTime += delta;
      if (this.elapsedTime > this.bestTime) {
        if (!this.beatBestTime) {
          this.sound.play("highscore", { volume: 0.5 });
          this.beatBestTime = true;
        }
        this.bestTime = this.elapsedTime;
        this.bestTimeText.text = `Best: ${dateToString(this.bestTime)}`;
      }
      this.timerText.text = dateToString(this.elapsedTime);
    }
  }

  private enterFireball(
    _: Phaser.GameObjects.GameObject,
    f: Phaser.GameObjects.GameObject
  ) {
    const fireball = f as Phaser.Physics.Arcade.Sprite;
    this.activeFireballs[fireball.getData("i")] = true;
  }

  private resetFireball(f: Phaser.GameObjects.GameObject) {
    const fireball = f as Phaser.Physics.Arcade.Sprite;
    // if the fireball just spawned, dont do anything
    if (!this.activeFireballs[fireball.getData("i")]) {
      return;
    }

    this.activeFireballs[fireball.getData("i")] = false;
    this.positionFireball(fireball);
  }

  private positionFireball(fireball: Phaser.Physics.Arcade.Sprite) {
    const choice = Phaser.Math.RND.between(0, this.spawnAreasRect.length - 1);
    if (!this.spawnAreasRect[choice]) {
      console.error("no spawn area rect!");
      return;
    }
    fireball.setRandomPosition(
      this.spawnAreasRect[choice]!.x,
      this.spawnAreasRect[choice]!.y,
      this.spawnAreasRect[choice]!.width,
      this.spawnAreasRect[choice]!.height
    );

    // make fireball fly into screen
    const targetPos = this.randomPos();

    // get angle to point
    const angle = Math.atan2(
      targetPos.y - fireball.y,
      targetPos.x - fireball.x
    );

    fireball.body.velocity.copy(
      this.physics.velocityFromRotation(angle, this.fireballSpeed)
    );
  }

  private addFireball() {
    const fireball: Phaser.Physics.Arcade.Sprite = this.fireballs?.create(
      0,
      0,
      "fireball"
    );
    fireball.setSize(10, 10);

    //add fireball to list of active fireballs
    this.activeFireballs.push(false);
    fireball.setData("i", this.activeFireballs.length - 1);

    fireball.setAngularVelocity(-400);

    this.positionFireball(fireball);
  }

  private increaseScore() {
    ++this.score;
    this.sound.play(`coin${Phaser.Math.RND.between(0, 9)}`, { volume: 0.5 });
    if (this.scoreText) {
      this.scoreText.text = `${this.score.toString()}Ξ`;
    }
    if (this.highScoreText) {
      if (this.score > this.highScore) {
        if (!this.beatHighscore) {
          this.sound.play("highscore", { volume: 0.5 });
          this.beatHighscore = true;
        }
        this.highScore = this.score;
        this.highScoreText.text = `Best: ${this.highScore.toString()}Ξ`;
      }
    }
  }

  private randomPos() {
    //choose random pos
    const randAngle = Phaser.Math.Angle.Random();
    const randDistance = (Math.random() * this.gameArea!.displayWidth) / 2;
    return new Phaser.Geom.Point(
      Math.cos(randAngle) * randDistance + this.gameArea!.x,
      Math.sin(randAngle) * randDistance + this.gameArea!.y
    );
  }

  private resetCoin() {
    const pos = this.randomPos();
    this.coin?.setPosition(pos.x, pos.y);
    this.increaseScore();
  }

  private onDie(
    p: Phaser.GameObjects.GameObject,
    f: Phaser.GameObjects.GameObject
  ) {
    if (this.beatHighscore) {
      this.setHighscore({
        twitter_handle: this.twitterHandle,
        highscore: this.highScore,
      });
    }
    if (this.beatBestTime) {
      this.setBestTime({
        twitter_handle: this.twitterHandle,
        best_time: Math.floor(this.bestTime),
      });
    }

    const player = p as Phaser.Physics.Arcade.Sprite;
    player.setTexture("bear-dead");
    this.sound.play("lose", { volume: 0.5 });
    this.scene.pause();

    this.endGame({ twitterHandle: this.twitterHandle });
    this.scene.launch("gameover-menu", {
      game: this.scene,
      startGame: this.startGame,
      twitterHandle: this.twitterHandle,
      highscore: this.beatHighscore ? this.highScore : undefined,
      bestTime: this.beatBestTime ? this.bestTime : undefined,
    });
  }
}

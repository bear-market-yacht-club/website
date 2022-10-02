import Phaser, { Scene } from "phaser";

export default class Fudballs extends Scene {
  public score = 0;
  public highScore = 0;
  public elapsedTime = 0;
  public bestTime = 0;
  public dead = false;
  public fireballCount = 16;

  private bearSpeed = 0.005;
  private fireballSpeed = 70;
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

  constructor() {
    super("fudballs");
  }

  preload() {
    this.load.image("empty", "/images/empty.png");
    this.load.image("bg", "/images/fudballs/bg.png");
    this.load.spritesheet("coin", "/images/fudballs/coin.png", {
      frameWidth: 26,
    });
    this.load.image("bear-idle", "/images/fudballs/bear-idle.png");
    this.load.spritesheet("bear-left", "/images/fudballs/bear-left.png", {
      frameWidth: 32,
    });
    this.load.spritesheet("bear-right", "/images/fudballs/bear-right.png", {
      frameWidth: 32,
    });
    this.load.spritesheet("fireball", "/images/fudballs/fireball.png", {
      frameWidth: 16,
    });
  }

  create() {
    this.dead = false;
    this.score = 0;
    this.elapsedTime = 0;

    // set spawn area
    this.gameArea = this.physics.add
      .image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "empty")
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
        `Best: ${this.dateToString(this.bestTime)}`,
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
      this.sys.canvas.height / 2,
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

    this.scene.launch("pause-menu");
    this.scene.pause();
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
            [this.bear.y, this.input.activePointer.worldY - 20],
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
        this.bestTime = this.elapsedTime;
        this.bestTimeText.text = this.dateToString(this.bestTime);
      }
      this.timerText.text = this.dateToString(this.elapsedTime);
    }
  }

  private dateToString(date: number) {
    const _date = new Date(date);
    return `${_date.getMinutes().toString().padStart(2, "0")}:${_date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${(_date.getMilliseconds() / 10)
      .toFixed(0)
      .toString()
      .padStart(2, "0")}`;
  }

  private enterFireball(
    _: Phaser.GameObjects.GameObject,
    f: Phaser.GameObjects.GameObject
  ) {
    const fireball = f as Phaser.Physics.Arcade.Sprite;
    console.log(this.activeFireballs[fireball.getData("i")]);
    this.activeFireballs[fireball.getData("i")] = true;
  }

  private resetFireball(f: Phaser.GameObjects.GameObject) {
    const fireball = f as Phaser.Physics.Arcade.Sprite;
    // if the fireball just spawned, dont do anything
    if (!this.activeFireballs[fireball.getData("i")]) {
      console.log("spawn");
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
    if (this.scoreText) {
      this.scoreText.text = `${this.score.toString()}Ξ`;
    }
    if (this.highScoreText) {
      if (this.score > this.highScore) {
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
    player: Phaser.GameObjects.GameObject,
    f: Phaser.GameObjects.GameObject
  ) {
    if (!this.dead) {
      this.dead = true;
      // const fireball = f as Phaser.Physics.Arcade.Sprite;
      this.scene.start("pause-menu");
      this.scene.restart();
      this.scene.pause();
    }
  }
}

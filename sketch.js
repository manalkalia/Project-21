var PLAY = 1;
var END = 0;
var gameState = 1;
var treasureCollection=0
function preload() {
    obsImg = loadImage("aster.png")
    goldImg = loadImage("bag.png")
    rocketImg = loadImage("rocket.png")
    spaceImg = loadImage("space.jpg")

}

function setup() {
    createCanvas(400, 600)
    space = createSprite(400, 600);
    space.addImage(spaceImg);
    space.velocityY = 4;

    rocket = createSprite(70, 580, 20, 20);
    rocket.addAnimation("rocketlaunch", rocketImg);
    rocket.scale = 0.2;

    cashG = new Group();
    asteroidsG = new Group();

}

function draw() {
    if (gameState === PLAY) {
        background(0);
        rocket.x = World.mouseX;

        edges = createEdgeSprites();
        rocket.collide(edges);
    }
    if (space.y > 400) {
        space.y = height / 2;
    }

    createCash();
    createAsteroids();

    if (cashG.isTouching(rocket)) {
        cashG.destroyEach();
        treasureCollection = treasureCollection + 50;
    } else {
        if (asteroidsG.isTouching(rocket)) {
            gameState = END;
            cashG.destroyEach();
            asteroidsG.destroyEach();
            cashG.setVelocityYEach(0);
            asteroidsG.setVelocityYEach(0);

        }
    }
        drawSprites();
        textSize(20);
        fill(255);
        text("Treasure: " + treasureCollection, 10, 30);
    }


    function createCash() {
        if (World.frameCount % 200 == 0) {
            var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
            cash.addImage(goldImg);
            cash.scale = 0.12;
            cash.velocityY = 3;
            cash.lifetime = 150;
            cashG.add(cash);
        }
    }

    
    function createAsteroids() {
        if (World.frameCount % 530 == 0) {
            var asteroid = createSprite(Math.round(random(50, 350), 40, 10, 10));
            asteroid.addImage(obsImg);
            asteroid.scale = 0.02;
            asteroid.velocityY = 3;
            asteroid.lifetime = 150;
            asteroidsG.add(asteroid);
        }
    }

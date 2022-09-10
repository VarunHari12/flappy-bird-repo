let obstacles : game.LedSprite[] = []
//  list of "game.LedSprite" objects
let bird = game.createSprite(0, 0)
//  bird sprite
let score = 0
let ticks = 0
//  we increment this on every loop iteration
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    bird.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    //  up and down
    bird.change(LedSpriteProperty.Y, -1)
})
// def on_button_pressed_ab(): # pause
//     game.pause()
// input.on_button_pressed(Button.B, on_button_pressed_ab)
function initialize() {
    let i: number;
    let obstacle: game.LedSprite;
    
    obstacles = []
    let gap = randint(0, 4)
    for (i = 0; i < 5; i++) {
        //  create 5 obstacles
        if (i != gap) {
            obstacles.push(game.createSprite(4, i))
        }
        
    }
    //  create a sprite at x=4, y=i
    for (i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        obstacle.turn(Direction.Left, 180)
    }
}

function moveleft() {
    let i: number;
    let obstacle: game.LedSprite;
    let x: number;
    
    for (i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        obstacle.move(1)
    }
    checkGameOver()
    let onedge = false
    for (i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        x = obstacle.get(LedSpriteProperty.X)
        if (x == 0) {
            onedge = true
            obstacle.set(LedSpriteProperty.Brightness, 0)
        }
        
    }
    if (onedge) {
        initialize()
        return
    }
    
}

function checkGameOver() {
    let obstacle: game.LedSprite;
    
    for (let i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        if (bird.isTouching(obstacle)) {
            game.gameOver()
        }
        
    }
}

//  pause for half a second, so the game doesn't run too fast
basic.forever(function on_forever() {
    //  some microbit thing that lets the game state work in the background
    
    if (obstacles.length <= 0) {
        initialize()
    }
    
    moveleft()
    basic.pause(500)
})

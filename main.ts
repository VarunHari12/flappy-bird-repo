let obstacles : game.LedSprite[] = []
//  list of "game.LedSprite" objects that are obstacles
let bird = game.createSprite(0, 0)
//  bird sprite
//  these are the handlers for the events for the buttons and gesture
//  they check to see if certain buttons are pressed and if so they call certain functions
//  input handler setup for button A
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    bird.change(LedSpriteProperty.Y, -1)
})
//  input handler setup for button B
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    bird.change(LedSpriteProperty.Y, 1)
})
//  input handler setup for button A + B
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    //  pause
    basic.forever(on_forever)
})
//  input handler setup for gesture SHAKE
// input.on_gesture(Gesture.SHAKE, on_gesture_shake)
//  basic.forever keeps looping while also allowing other things to happen at the same time
basic.forever(on_forever)
//  this method is a handler that checks if the user shakes the microbit
//  if there is a shake detected it pauses/unpauses the game
//  def on_gesture_shake():
//  if game.is_paused():
//  game.resume()
//  if game.is_running():
//  game.pause()
//  this method is a handler that checks if the a button was pressed
//  if so it moves the bird sprite up one LED direction
//  this method is a handler that checks if the b button was pressed
//  if so it moves the bird sprite down one LED in the y direction
//  this method is a handler that checks if the a and b button was pressed at the same time
//  if so it restarts the game
//  this method initializes all of the obstacles used in the game
function InitializeObstacles() {
    let obstacle: game.LedSprite;
    
    obstacles = []
    //  creates an empty list of obstacles
    let gap = randint(0, 4)
    //  picks a random y value between 0 and 4 for the gap to be in
    //  creates the lines of LEDs used for the obstacles 
    //  except for the index which is the gap in the obstacle
    for (let i = 0; i < 5; i++) {
        if (i != gap) {
            obstacle = game.createSprite(4, i)
            obstacle.turn(Direction.Left, 180)
            //  sets obstacle movement to left
            obstacles.push(obstacle)
        }
        
    }
}

//  this method moves each LED in the given obstacle one to the left then checks if game is over
//  if the game is not over, and the obstacles are on the edge, it will reset the obstacles in
//  the original position and get a new obstacle to use
function moveleft() {
    let i: number;
    let obstacle: game.LedSprite;
    let x: number;
    
    for (i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        obstacle.move(1)
    }
    //  moves the obstacle one over in the direction of movement assigned
    checkGameOver()
    //  calls a method that checks if the game is over
    //  the following loop checks if the obstacles are on the edge
    //  if on the edge, it will set the onedge boolean to true and it clears the obstacle
    let onedge = false
    for (i = 0; i < obstacles.length; i++) {
        obstacle = obstacles.get(i)
        x = obstacle.get(LedSpriteProperty.X)
        //  gets the obje
        if (x == 0) {
            onedge = true
            obstacle.set(LedSpriteProperty.Brightness, 0)
        }
        
    }
    //  if the obstacles are on the edge, reinitialize the obstacles from the start
    if (onedge) {
        InitializeObstacles()
        return
    }
    
}

//  this method checks if the games is over by checking if the bird is touching the obstacle
function checkGameOver() {
    let obstacle: game.LedSprite;
    
    for (let i = 0; i < obstacles.length; i++) {
        //  goes through each obstacle that has been created
        obstacle = obstacles.get(i)
        if (bird.isTouching(obstacle)) {
            //  checks if the bird is touching the obstacle at index i
            game.gameOver()
        }
        
    }
}

//  this method is a loop that reiterates the movement of the obstacles 
function on_forever() {
    
    if (obstacles.length <= 0) {
        InitializeObstacles()
    }
    
    moveleft()
    basic.pause(500)
}


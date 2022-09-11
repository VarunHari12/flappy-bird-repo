obstacles: List[game.LedSprite] = []  # list of "game.LedSprite" objects that are obstacles
bird: game.LedSprite = game.create_sprite(0, 0) # bird sprite

# these are the handlers for the events for the buttons and gesture
# they check to see if certain buttons are pressed and if so they call certain functions

# input handler setup for button A
input.on_button_pressed(Button.A, on_button_pressed_a)
# input handler setup for button B
input.on_button_pressed(Button.B, on_button_pressed_b)
# input handler setup for button A + B
input.on_button_pressed(Button.AB, on_button_pressed_ab)
# input handler setup for gesture SHAKE
#input.on_gesture(Gesture.SHAKE, on_gesture_shake)



# basic.forever keeps looping while also allowing other things to happen at the same time
basic.forever(on_forever)

# this method is a handler that checks if the user shakes the microbit
# if there is a shake detected it pauses/unpauses the game
# def on_gesture_shake():
    # if game.is_paused():
         # game.resume()
    # if game.is_running():
        # game.pause()

# this method is a handler that checks if the a button was pressed
# if so it moves the bird sprite up one LED direction
def on_button_pressed_a():
    bird.change(LedSpriteProperty.Y, -1)

# this method is a handler that checks if the b button was pressed
# if so it moves the bird sprite down one LED in the y direction
def on_button_pressed_b():      
    bird.change(LedSpriteProperty.Y, 1)

# this method is a handler that checks if the a and b button was pressed at the same time
# if so it restarts the game
def on_button_pressed_ab(): # pause
    basic.forever(on_forever)

# this method initializes all of the obstacles used in the game
def InitializeObstacles():
    global obstacles
    obstacles = [] # creates an empty list of obstacles
    gap = randint(0, 4) # picks a random y value between 0 and 4 for the gap to be in

    # creates the lines of LEDs used for the obstacles 
    # except for the index which is the gap in the obstacle
    for i in range(5):  
            if i != gap:
                obstacle = game.create_sprite(4, i)
                obstacle.turn(Direction.LEFT, 180) # sets obstacle movement to left
                obstacles.append(obstacle)  


# this method moves each LED in the given obstacle one to the left then checks if game is over
# if the game is not over, and the obstacles are on the edge, it will reset the obstacles in
# the original position and get a new obstacle to use
def moveleft():
    global obstacles
    for i in range(obstacles.length):
            obstacle = obstacles.get(i)
            obstacle.move(1) # moves the obstacle one over in the direction of movement assigned

    checkGameOver() # calls a method that checks if the game is over

    # the following loop checks if the obstacles are on the edge
    # if on the edge, it will set the onedge boolean to true and it clears the obstacle
    onedge = False 
    for i in range(obstacles.length):
        obstacle = obstacles.get(i)
        x = obstacle.get(LedSpriteProperty.X) # gets the obje
        if (x == 0):
            onedge = True
            obstacle.set(LedSpriteProperty.BRIGHTNESS, 0)

    # if the obstacles are on the edge, reinitialize the obstacles from the start
    if (onedge):
        InitializeObstacles()
        return
    
# this method checks if the games is over by checking if the bird is touching the obstacle
def checkGameOver():
    global obstacles
    for i in range(obstacles.length): # goes through each obstacle that has been created
            obstacle = obstacles.get(i)
            if bird.is_touching(obstacle): # checks if the bird is touching the obstacle at index i
                game.game_over()

# this method is a loop that reiterates the movement of the obstacles 
def on_forever():     
    global obstacles

    if obstacles.length <= 0:
        InitializeObstacles()

    moveleft()

    basic.pause(500) # pause for half a second, so the game doesn't run too fast


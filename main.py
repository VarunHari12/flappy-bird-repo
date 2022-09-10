obstacles: List[game.LedSprite] = []  # list of "game.LedSprite" objects
bird: game.LedSprite = game.create_sprite(0, 0) # bird sprite
score = 0
ticks = 0 # we increment this on every loop iteration

def on_button_pressed_a():
    bird.change(LedSpriteProperty.Y, 1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():      # up and down
    bird.change(LedSpriteProperty.Y, -1)
input.on_button_pressed(Button.B, on_button_pressed_b)


#def on_button_pressed_ab(): # pause
#    game.pause()
#input.on_button_pressed(Button.B, on_button_pressed_ab)

def initialize():
    global obstacles
    obstacles = []
    gap = randint(0, 4)
    for i in range(5):  # create 5 obstacles
            if i != gap:
                obstacles.append(game.create_sprite(4, i))  # create a sprite at x=4, y=i

    for i in range(obstacles.length):
        obstacle = obstacles.get(i)
        obstacle.turn(Direction.LEFT, 180)

def moveleft():
    global obstacles
    for i in range(obstacles.length):
            obstacle = obstacles.get(i)
            obstacle.move(1)

    checkGameOver()

    onedge = False
    for i in range(obstacles.length):
        obstacle = obstacles.get(i)
        x = obstacle.get(LedSpriteProperty.X)
        if (x == 0):
            onedge = True
            obstacle.set(LedSpriteProperty.BRIGHTNESS, 0)
    if (onedge):
        initialize()
        return       
    

def checkGameOver():
    global obstacles
    for i in range(obstacles.length):
            obstacle = obstacles.get(i)
            if bird.is_touching(obstacle):
                game.game_over()

def on_forever():     # some microbit thing that lets the game state work in the background
    global obstacles 

    if obstacles.length <= 0:
        initialize()

    moveleft()

 
    basic.pause(500) # pause for half a second, so the game doesn't run too fast

basic.forever(on_forever)
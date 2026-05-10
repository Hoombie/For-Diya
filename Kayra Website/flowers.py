from turtle import *

# Setup
screen = Screen()
screen.bgcolor("white")
t = Turtle()
t.speed(0) # Fastest drawing speed
def draw_flower(t, petals, color, size):
    t.color(color)
    t.begin_fill()
    for _ in range(petals):
        t.circle(size, 60)   # Draw arc for one side of petal
        t.left(120)          # Turn to draw other side
        t.circle(size, 60)
        t.left(120 - (360/petals)) # Adjust angle for next petal
    t.end_fill()

def bouquet_flower(x, y, petal_color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    # Draw Stem
    t.color("green")
    t.pensize(3)
    t.setheading(270) # Point down
    t.forward(150)
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    # Draw Flower Head
    draw_flower(t, 6, petal_color, 40)

# Create the bouquet
flower_data = [(-50, 50, "red"), (0, 70, "purple"), (50, 50, "orange")]
for x, y, color in flower_data:
    bouquet_flower(x, y, color)

done()
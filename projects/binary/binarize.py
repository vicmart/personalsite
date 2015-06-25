import numpy as np
import cv2
import random

def randomChar(mix):
    num = int(random.random() * 36)
    
    if(int(random.random() * 10) < mix):
        num = int(random.random() * 10)

    if num >= 10:
        num = num + 7
    return chr(num + 48)

# Load an color image in grayscale
img = cv2.imread('world-map.png',0)
colors = [0, 229]
scale = 8

f = open('map.html','w')
f.write("<html><head><link rel='stylesheet' type='text/css' href='binary.css'><script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script></head><body style='background-color:black; margin: 0px; padding: 0px;' ><div class='world-container'><div class='left-sea'></div><div class='right-sea'></div><div style='font-family: courier' class='center world'>")

prev = -1
f.write('<span>')

for y in range(0, img.shape[0] + 400,int(scale * (1.0 * img.shape[1]/img.shape[0]))):
    for x in range(0, img.shape[1], scale):
        if y > 200 and y < img.shape[0] + 200:
            px = img[y - 200, x]
        else:
            px = 0
        if px > colors[0] - 50 and px < colors[0] + 50:
            if prev != 0:
                f.write("</span><span class='water' style='color:blue'>")
            f.write(randomChar(7))
            prev = 0
        else:
            if prev != 1:
                f.write("</span><span class ='land' style='color:green'>")
            f.write(randomChar(7))
            prev = 1
    f.write("</span></br>")
    if prev == 0:
        f.write("<span class='water' style='color:blue'>"); 
    else:
        f.write("<span class='land' style='color:green'>"); 
        
f.write("</div></div><script src='binary.js'></script></body></html>")
f.close()

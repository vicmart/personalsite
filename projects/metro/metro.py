import sys

central_line = []

def drawLine(line, f):
    global central_line
    data_points = line.split(":")
    if len(data_points) > 1:
        f.write("<div class='center' style='height:" + data_points[len(data_points) - 1][:-1] + "px'>")
    
    color = "background:" + central_line[1]
    css = ""

    if len(data_points) == 4:
        for i in range(0,3):
            if data_points[i] != "":
                central_line[i] = data_points[i]
        color = "background:" + central_line[1]
    elif len(data_points) == 3:
        css = "width:0px; border-left: 12.5px dotted "
    elif len(data_points) == 2 and data_points[0] != "":
        if central_line[1] != "-":
            color = "background: -webkit-linear-gradient( " + central_line[1] + ", " + data_points[0] + "); background: -o-linear-gradient(" + central_line[1] + ", " + data_points[0] + ");background: -moz-linear-gradient(" + central_line[1] + ", " + data_points[0] + ");background: linear-gradient(" + central_line[1] + ", " + data_points[0] + ");"
            central_line[1] = data_points[0]
        else:
            central_line[1] = data_points[0]
            color = "background:" + central_line[1]
    elif len(data_points) == 1:
        central_line[1] = data_points[0]

    if len(data_points) > 1:
        if central_line[2] != '-':
            f.write("<div class='center " + (central_line[2] if len(data_points) != 3 else "") + " rectangle right-line' style='" + (css + central_line[2] if len(data_points) == 3 else "") + "'></div>")
        if central_line[0] != '-':
            f.write("<div class='center " + (central_line[0] if len(data_points) != 3 else "") + " rectangle left-line' style='" + (css + central_line[0] if len(data_points) == 3 else "") + "'></div>")
        f.write("<div class='center rectangle' style='" + css + (color if len(data_points) != 3 else central_line[1]) + "'></div>")
    
        f.write("</div>")

def createDescription(line, junction, f):
    data_points = line.split(":")
    f.write("<div class='right rotated" + ("-junction" if junction else " ")+ "'><p class='vertical-center text'><b>" + data_points[0] + "</b></br>" + (" " if len(data_points) == 1 else data_points[1]) + "</p></div>")

def createStation(line, f):
    f.write("<div class='center " + central_line[1] + " full-circle'><div class='center white mid-circle vertical-center'></div></div>")

def drawJunction(line, f):
    global central_line
    data_points = line.split(":")
    f.write("<div class='center'><div class='center " + ((central_line[2] if data_points[0][0] == '>' else central_line[0]) if len(data_points) == 1 else data_points[0][1:]) + ('-fade' if len(data_points) > 2 and data_points[1]=='fade' else "") + " rectangle rotated-" + ('right' if data_points[0][0] == '>' else 'left') + (" " if len(data_points) < 3 else ("-" + data_points[2][:-1])) + ("" if len(data_points) < 2 else ("-solid" if data_points[1] == 'solid' else "")) + "'></div></div>")
    if (data_points[0][0] == '>' or data_points[0][1:] == central_line[2]) and len(data_points) < 3:
        central_line[2] = '-'
    elif (data_points[0][0] == '<' or data_points[0][1:] == central_line[0]) and len(data_points) < 3:
        central_line[0] = '-'

def createRuler(line, f):
    data_points = line.split(':')
    remainder = float(data_points[1])%1.0
    for i in range(0,int(float(data_points[1]) - float(data_points[0]))):
        f.write("<div class='gray ruler-rectangle' style='width:100px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>" + str(int(float(data_points[0])) + i) + "</p></div></div>")
        f.write("<div class='gray ruler-rectangle' style='width:25px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>Mar</p></div></div>")
        f.write("<div class='gray ruler-rectangle' style='width:50px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>June</p></div></div>")
        f.write("<div class='gray ruler-rectangle' style='width:25px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>Sept</p></div></div>")
    if remainder > 0.0:
        f.write("<div class='gray ruler-rectangle' style='width:100px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>" + str(int(float(data_points[1]))) + "</p></div></div>")
    
    if remainder >= 0.25:
        f.write("<div class='gray ruler-rectangle' style='width:25px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>Mar</p></div></div>")
    
    if remainder >= 0.5:
        f.write("<div class='gray ruler-rectangle' style='width:50px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>June</p></div></div>")
    
    if remainder >= 0.75:
        f.write("<div class='gray ruler-rectangle' style='width:25px;'><div class='right ruler-rotated'><p class='vertical-center text'></br>Sept</p></div></div>")


def error(str):
    print str
    raise SystemExit(0)


#-----------------------#
if len(sys.argv) < 3:
    error("Usage: python metro.py [read file] [write file]")

f = open(sys.argv[2],'w')
f.write("<html><head><link rel='stylesheet' type='text/css' href='Stylesheets/metro.css'></head><body><div class='body center'>")
f.write("<div class='ruler'>")
line_count = 0

for i in range(0,3):
    central_line.append("-")

with open(sys.argv[1], 'r+') as r:
    lines = r.readlines()
    i = 0
    while i<len(lines):
        line = lines[i]
        if line[0] == '#':
            line_count+=1
            if line_count == 1:
                f.write("</div>")
                f.write("<div class='all-lines center content'><div class='left line major-left-line'>")
            elif line_count == 2:
                f.write("</div>")
                f.write("<div class='right line major-right-line'>")
                for j in range(0,3):
                    central_line[j] = "-"
            elif line_count == 3:
                f.write("</div>")
                f.write("<div class='center line' id='central-line'>")
                for j in range(0,3):
                    central_line[j] = "-"    
        elif line[0] == '>' or line[0] == '<':
            drawJunction(line, f)
        elif line[0] == '\"':
            try:
                createDescription(line.split('\"')[1], lines[i+1][0]=='>' or lines[i+2][0]=='>', f)
            except:
                createDescription(line.split('\"')[1], 0, f)
            if lines[i+1][0] == '<' and len(lines[i+1].split(":")) > 2 and lines[i+1].split(":")[2] == 'up\n':
                drawJunction(lines[i+1], f)
                i+=1
            createStation(line, f)
        else:
            if line_count == 0:
                try:
                    createRuler(line, f)
                except:
                    error("Syntax for timeline bounds - [Beginning Year]:[End Year (can be decimal)]")
            else:
                drawLine(line, f)
        i+=1

f.write("</div></div></div>")
f.write("</body></html>")
f.close()
print "Done..."

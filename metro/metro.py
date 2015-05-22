center_line = []
left_line = [];
right_line = [];

def action(f):
    decide = raw_input("Build a new [l]ine, add a new [s]tation, or [f]inish...")
    if decide == 'l':
        new_line(f)
    elif decide == 's':
        new_station(f)
    else:
    	done(f)    

def new_line(f):
	global center_line
	global left_line
	global right_line
	
	print "Building a new line..."
	color = raw_input("Line color? ([red], [blue], [green], [gray], [orange], [black]) ")
	if center_line[0] == "none":
		center_line[0] = color
	else:
		input = raw_input("Extend [left] or [right]? ")
		if input == "left":
			left_line[0] = color
		elif input == "right":
			right_line[0] = color
			
	left_color = raw_input("Left side line color? ([red], [blue], [green], [gray], [orange], [black], or [none]) ")	
	center_line[1] = left_color
	
	right_color = raw_input("Right side line color? ([red], [blue], [green], [gray], [orange], [black], or [none]) ")	
	center_line[2] = right_color
	
	new_station(f)
	
def new_station(f):
	global center_line
	global left_line
	global right_line
	
	print "Building a new station..."
	left_right = raw_input("Remove the left/right side line? ([l]eft, [r]ight, [n]either) ")
	if left_right == "l":
		center_line[1] = "none"
	elif left_right == "r":
		center_line[2] = "none"
		
	length = raw_input("Distance to next station? (in pixels) ")
	header = raw_input("Title for the station? ")
	description = raw_input("Description for the station? ")
	f.write("<div class='center' style='height:"+length+"px'>")
	if center_line[1] != "none":
		f.write("<div class='center "+center_line[1]+" rectangle left-line'></div>")
	if center_line[2] != "none":
		f.write("<div class='center "+center_line[2]+" rectangle right-line'></div>")
	
	f.write("<div class='center "+center_line[0]+" rectangle'></div></div>")
	f.write("<div class='right rotated-junction'><p class='vertical-center text'><b>"+header+"</b></br>"+description+"</p></div><div class='center "+center_line[0]+" full-circle'><div class='center white mid-circle vertical-center'></div>")
	f.write("</div>")
	action(f)

def done(f):
	f.write("</div></div>")
	f.write('</body></html>') 
	f.close()
	print "Done..."
    
#file_name = input("File you want to create...")
for i in range(0,3):
	center_line.append("none")
	left_line.append("none")
	right_line.append("none")

f = open("test.html",'w')
f.write('<html><head><link rel="stylesheet" type="text/css" href="metro.css"></head><body><div class="body center">')
f.write('<div class="left line major-left-line"></div>')
f.write('<div class="right line major-right-line"></div>')
f.write("<div class='center line' id='central-line'>")
action(f)

On a grid defined by dimensions x_max, y_max, a robot can walk from coordinate (1,1) to coordinate (x_max, y_max) by taking discrete steps in the cardinal directions (x+1, x-1, y+1, y-1).

Prompt: Find the number of unique paths that the robot can walk between these coordinates without repeating a step (without crossing over the path already walked).

In essense, this is a qualified permutation problem.  From coordinate (1,1), the available steps are to (1,2) and (2,1).  From (1,2) they are (1,3) and (2,2), but NOT (1,1).  

So there must be a data structure that records the path already walked, but can be different for each unique path.  For this I created the variable path.

var path = [];

For each new coordinate, or step, three values are added in an array (the step) to the path.  

path.push([x,y,z]);

The x and y variables record the coordinate pair of the step taken, and the z dimension records metadata of paths already taken at this point.  This will be explained further below.  

To start walking the path the robot needs to know where it can step.  to do this, check the possible steps at the current position.

check_possible_steps(c_pos)

This function returns in an array the possible steps to take.  From (1,1) the function returns:

[[1,2],[2,1]]

However for this function to work the robot needs to know if this step has been traversed yet.  Because of how JavaScript indexOf() function works, it is helpful to record the walked path in an array of strings, rather than generate this on the fly each time the path must be checked, so a new variable is introduced, 

var coordinates = [];

When a new step is recorded, the step is added as an array to path and as a string to coordinates in the function addStep(new_step)

Then the robot takes the first of the available steps, and continues to walk until it reaches a terminal condition.  Either a successful path is completed, and the robot makes it to (x_max, y_max) or has no available steps.  At this point, if the path is successful, the path is logged in the variable unique_paths, and the robot takes a step back.

Stepping back pops the last element of the path and the coordinates and increases the z-coordinate by 1, telling the robot not to go back down this path.  In the function stepBack the z coordinate is only increased if the path length > 0, so when the robot steps back all the way to (1,1) and cannot take a step, the program finishes executing.  

Now that the robot has stepped back and the current position's z-index has been incremented, the array of available steps is spliced with the coordinates of the paths already travelled.  So if the robot finds himself with three possible paths, he will explore them in turn.  When he walks back up a path, it becomes unavailable to him, and he explores the next.  

When the robot has explored the entire board and logged all of the unique paths in the variable unique_paths, and walks back up to (1,1) with no available steps, the path is popped and it's length is zero, closing the while loop and logging the number of unique paths.

console.log(unique_paths.length);

NOTE: I originally wrote this algorith with a recursive function step(position) that contained most of the code in the while loop at line 19, which I believe may be a more elegant approach to the problem, but quickly found that the call stack would overflow with grids larger than 4x4.  The code was in essence creating a while loop anyway and changing global variables path, coordinates, and unique_paths, so changing a few variable references, the code worked in a while loop as well, with the looping condition being the path's length >0.  This code works for grids of greater size, although I've only waited for a solution up to 6x6.

Solutions [(a,b) returns same solution as (b,a)]:

		x_max: 	1 		2 		3 		4 		5  		6
y_max:

1 				1 		1 		1 		1 		1  		1

2 						2 		4 		8 		16 		32

3 								12 		38 		125 	414

4 										184 	976		5382

5 												8512 	79384

6 														1262816



  
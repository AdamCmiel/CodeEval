var x_max = 6;
var y_max = 6;

var unique_paths = [];


var path = [];
var coordinates = [];

var start = [1,1,0]; //x,y,finished steps

//board[1,1]=true;

addStep(start);
//step(start);

var pos = start;

while(path.length!=0){

	var available_steps = check_possible_steps(pos);

	available_steps.splice(0,pos[2]);

	if(isSuccess(pos)){
		unique_paths.push(path);
		
		stepBack();
	
	} else if(isTerminal(available_steps)){
		stepBack();
		
	} else{
	  
	  //if can take a step
	  var new_pos=[];
	  new_pos[0] = available_steps[0][0];
	  new_pos[1] = available_steps[0][1];
	  new_pos[2] = 0;
	  //path.push(new_pos);
	  addStep(new_pos);
	  //step(new_pos);
	  pos = new_pos;
	}
	//if success or terminal condition
	if (path.length!=0){
	var new_pos = path[path.length-1];
	
	pos = new_pos;
	};
};

function check_possible_steps(c_pos){
	var possible_steps = [];
	var x = c_pos[0];
	var y = c_pos[1];

	//check left
	var x_new = x-1;
	if (x_new>=1 & x_new<=x_max){ //if step left is on the board
	  if(isNotOnPath(x_new,y)){  //and step left hasn't been visited before
	  	possible_steps.push([x_new,y]);
	  };
	};

	//check down
	var y_new = y+1;
	if (y_new>=1 & y_new<=y_max){
	  if(isNotOnPath(x,y_new)){
	    possible_steps.push([x,y_new]);
	  };
	};

	//check right
	var x_new = x+1;
	if (x_new>=1 & x_new<=x_max){ //if step left is on the board
	  if(isNotOnPath(x_new,y)){  //and step right hasn't been visited before
	  	possible_steps.push([x_new,y]);
	  };
	};

	//check up
	var y_new = y-1;
	if (y_new>=1 & y_new<=y_max){
	  if(isNotOnPath(x,y_new)){
	    possible_steps.push([x,y_new]);
	  };
	};
	
	return possible_steps;
};

function isTerminal(possible_steps){
  var num_steps = possible_steps.length;	
  if (num_steps==0){
  	return true;
  } else {
  	return false;
  }
};

function isSuccess(s_pos){
  if (s_pos[0]==x_max & s_pos[1]==y_max){
  	return true;
  }else{
  	return false;
  }
};

function stepBack(){
	path.pop(); 
	coordinates.pop();
	if (path.length!=0){
	path[path.length-1][2]++;
	};
	
};

function isNotOnPath(x,y){

	//PROBLEM IS HERE
	//if [x,y,*] is not in path, return true
	var coordinate_string = ""+x+','+y+"";
	var isOnPath = coordinates.indexOf(coordinate_string);
	if (isOnPath==-1){
	return true;
	} else{
		return false;
	}
};

function addStep(new_step){
    path.push(new_step);
    new_step_string = ""+new_step[0]+','+new_step[1]+"";
    coordinates.push(new_step_string);
}

console.log(unique_paths.length);
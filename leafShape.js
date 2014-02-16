//http://arxiv.org/abs/1004.4388
//http://arxiv.org/pdf/1004.4388v1.pdf

//===`Questions`===
//What is the point of the midrib

//The initial cell array is allowed to expand by a factor of about 1000 to reach a mature shape
//Does this mean I go it 1000 times?
//Or just times by 1000?




//var canvas = $('#canvas');

//Set growth rate and veins
//j(from 0 to N)
//[132, 44, 11, 28, 55]
//slope
//[-1,9,23,55]

//`generateLeaf`
// It generates a leaf
//`N` ->
//`maxT` ->
//`growthY` ->
//`k` ->
function generateLeaf(N, growthY, k, veins, slope){
  var a = 0.1;
  var n = 1;

  //startDist will determine the distance between each point
  var startDist = 0.1;
  
  //Create the two column area
  var leafRight = generateLeafArray(N, startDist);
  
  //Growth algo    
  for(var j = 0; j < N; j++){
    
    var closestVein = getClosestVein(j, veins);
    if(closestVein >= N){
      closestVein = Math.floor(N/8);
    }
    //TODO: Get growth Rate
    var gl = getGrowthLength(j, Math.floor(N/2), N, growthY, k);
    
    gl = gl;//*//growthFactor(a, n, j, closestVein);
    
    var s = 0;//
    var gx = 0;//getXGrowth(gl,s)
    var gy = 0;//getYGrowth(gx,s)
    
    var growthOnLength = 0;
    var growthOnX = 0;
    var growthOnY = 0;
    
    //Assume slope is 0;
    var point = leafRight[0][j];
    leafRight[0][j] = [(1+gl)*point[0], (1+gl)*point[1]];
    
    point = leafRight[1][j];
    leafRight[1][j] = [(1000*(1+gl)*point[0]) - 100, 1000*(1+ 0.1)*point[1]];
  }
  
  return leafRight[1];
}

//`getGrowthLength`
//
//Note: I used Math.abs instead of the lower bound
//Seems to work correctly
//`j` -> The current index
//`jD` -> Point of greatest growth
//`N` -> Max index
//`gL0` -> ???
//See Specs
function getGrowthLength(j, jD, N, gL0, k){
  var gL = 0;
  
  if(j <= jD){
    gL = gL0*Math.abs(1 - Math.pow((jD-j)/(jD-1),k));
  }else{
    gL = gL0*Math.abs(1 - Math.pow((j-jD)/(N-jD),k));
  }
  
  return gL;
  
}

//`growthFactor`
//Calculates the growth factor of a ...
//`a` -> ???
//`n` -> ???
//`j` -> Current index
//`jV` -> Cloest vein
//See Specs
function growthFactor(a, n, j, jV){
  return Math.pow(Math.E, -a*Math.pow(Math.abs(j - jV), n));
}

//`getClosestVein`
//
//`j` -> A integer to check against
//`veins` -> An Array 
function getClosestVein(j, veins){
  return _.reduce(veins, function(memo, num){
    if(Math.abs(num - j) < Math.abs(memo-j)){
     return num; 
    }else{
     return memo; 
    }
  }, 1000000);
}

//`getXGrowth`
//Calculates the amount by which `x` grows
//
function getXGrowth(growthLen, s){
  return growthLen/Math.pow((1 + Math.pow(s,2)),(1/2));
}

//`getYGrowth`
//Calculates the amount by which `y` grows
function getYGrowth(growthX, s){
  return growthX*s;
}

//Helper functions

//`generateLeafArray`
//Generates the leaf array that will be used to "grow"
//`N` -> Number of parts of the leaf
//`startDist` -> 
function generateLeafArray(N, startDist){
  var leafRight = [];
  
  //The Stem
  leafRight[0] = [];
  //The Leaf part
  leafRight[1] = [];
  
  //TODO: Populate with points
  //points are [x, y]
  for(var i = 0; i < N; i++){
    leafRight[0][i]= [0, i*startDist];
    leafRight[1][i]= [startDist, i*(startDist/N)];
  }
  
  //
  return leafRight; 
}

//TODO: Rename
//`mirrorLeaf`
//Take an array that's suppose to contain points
//and returns a mirror of it
//Assumes that arr points are centered at 0
//`arr` -> An arr
function mirrorLeaf(arr){
  return _.map(arr, function(item){
    return [-item[0], item[1]];
  });
}

//`transformPoints`
//Moves around points
//`arr` -> An arr
function transformPoints(arr, offset){
  return _.map(arr, function(item){
    return [item[0]+offset, item[1]];
  });
}

//`drawPoints`
//
//`arr` ->
function drawPoints(arr){
  var canvas =  $('canvas')[0];
  var ctx = canvas.getContext('2d');
  var doIt = 15;
  var doItReset = 15;
  var prevPoint = [0,0];
  _.each(arr,function(point){
    
    ctx.fillRect(Math.floor(point[0]),Math.floor(point[1]),1,1);
  });
}

//`runGen`
//
function runGen(){
  var Tarr = generateLeaf(150,0.45,2,[],[]);
  var leftLeaf = Tarr;
  var rightLeaf = mirrorLeaf(leftLeaf);
  var arr = leftLeaf.concat(rightLeaf);
  arr = transformPoints(arr, 130);
  drawPoints(arr);
  return rightLeaf;
}


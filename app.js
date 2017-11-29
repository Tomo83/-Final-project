var memory_array = ['html.jpg', 'css.jpg', 'bootstrap.jpg', 'js.jpg', 'jquery.jpg', 'sass.jpg', 'html.jpg', 'css.jpg', 'bootstrap.jpg', 'js.jpg', 'jquery.jpg', 'sass.jpg'];
var memory_values = [];
var memory_title_ids = [];
var tiles_flipped = 0;
var turn_counter = 0;

//randomize array
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


//call a new board
function newBoard(){
    tiles_flipped = 0; 
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('board').innerHTML = output;
}

window.addEventListener("load", newBoard);

function memoryFlipTile(tile, val){
    
    if(tile.innerHTML === "" && memory_values.length < 2){
        
        tile.style.backgroundImage = 'url("img/' + val + '")';
        tile.style.backgroundPosition = 'center center';
        
        //check value of first box
        if(memory_values.length === 0){
            memory_values.push(val);
            memory_title_ids.push(tile.id);
            
            //check value of second box
        } else if(memory_values.length === 1){
            memory_values.push(val);
            memory_title_ids.push(tile.id);
            
            //count every second move
            turn_counter++;
            document.getElementById("score").innerHTML = "Turn counter: " + turn_counter;
            
            //compare two boxes
            if(memory_values[0] === memory_values[1]){
                tiles_flipped += 2;
                //clear both arrays
                memory_values = [];
                memory_title_ids = [];
                //check to see if the whole board is cleared
                if(tiles_flipped === memory_array.length){
                    //if win the match after click ok reload the page
                    if(!alert('You win! \nNumber of approaches: ' + turn_counter + '\nClick \"OK\" to play again')){
                        window.location.reload();
                    }
                     
                    document.getElementById("board").innerHTML = "";
                    newBoard();    
                }
            } else {
                function flip2Back(){
                    //flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_title_ids[0]);
                    var tile_2 = document.getElementById(memory_title_ids[1]);
                    
                    tile_1.style.backgroundImage = 'url(img/logo.jpg)';
                    tile_1.style.backgroundPosition = 'center center';
                    tile_1.innerHTML = "";
                    
                    tile_2.style.backgroundImage = 'url(img/logo.jpg)';
                    tile_2.style.backgroundPosition = 'center center';
                    tile_2.innerHTML = "";
                    
                    //clear both arrays
                    memory_values = [];
                    memory_title_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
} 





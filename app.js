const level1 = document.querySelector("#l1"),
      level2 = document.querySelector("#l2"),
      level3 = document.querySelector("#l3");

level1.setAttribute("onclick", "memory.start_game(1)");
level2.setAttribute("onclick", "memory.start_game(2)");
level3.setAttribute("onclick", "memory.start_game(3)");

const reset = document.querySelector("#reset");

reset.setAttribute("onclick", "window.location.reload()");

const memory = (function() {
  const game_level = {
    1: 6,
    2: 8,
    3: 10
  }
  
  const technologies = [
    'tile_1.jpg',
    'tile_2.jpg',
    'tile_3.jpg',
    'tile_4.jpg',
    'tile_5.jpg',
    'tile_6.jpg',
    'tile_7.jpg',
    'tile_8.jpg',
    'tile_9.jpg',
    'tile_10.jpg'
  ];    
    
  let memory_array = [];
  let memory_values = [];
  let memory_title_ids = [];
  let tiles_flipped = 0;
  let turn_counter = 0;       

  function generate_tiles(quantity, tiles_array) {
    const generated_tiles = [];
    for (let i = 0; i < quantity; i++) {
      generated_tiles.push(tiles_array[i], tiles_array[i]);
    }
    return generated_tiles;
  }

  //randomize array
  function memory_tile_shuffle(tiles_array) {
    let tiles_copy = tiles_array.slice();
    let shuffled_tiles = [];
    let index = tiles_array.length;
    let selected_tile;
    while(--index >= 0){
      selected_tile = Math.floor(Math.random() * (index + 1));
      shuffled_tiles.push(tiles_copy[selected_tile]);
      tiles_copy.splice(selected_tile, 1);
    }
    return shuffled_tiles;
  }
  //after win show message
  function win_message() {
    const message = document.getElementById("win-message");
    let turns = document.querySelector("#win-text");

    turns.innerHTML = turns.innerHTML.replace(/%TURNS%/, turn_counter);
    message.style.display = "block";
  };

  function reload_game(){          
    document.getElementById("win-message").style.display = "none";
    document.getElementById("board").innerHTML = "";
    newBoard();
  };
  
  function check_if_same_tiles(tile_1, tile_2, flipped_array) {
    if (memory_values[0] === memory_values[1]) {
      tiles_flipped += 2;
      memory_values = [];
      memory_title_ids = [];
      tile_1.classList.add("disabled-tile");
      tile_2.classList.add("disabled-tile");
    } else {
      setTimeout(() => flip2Back(tile_1, tile_2), 700);
    }
    if(tiles_flipped === memory_array.length){
      setTimeout(() => win_message(reload_game), 700);
    }
  }

  function show_tile(tile, val) {
    tile.style.backgroundImage = 'url("img/' + val + '")';
    tile.classList.add("show-tile");
    tile.innerHTML = "<p></p>";
  }

  function hide_tile(tile) {
    tile.style.backgroundImage = 'url(img/logo.jpg)';
    tile.classList.remove("show-tile");
    tile.innerHTML = "";
  }

  function add_tile_to_flipped(val, tile) {
    memory_values.push(val);
    memory_title_ids.push(tile.id);
  }

  function increase_counter() {
    turn_counter++;
    document.getElementById("score").innerHTML = "Turn counter: " + turn_counter;
  }

  function flip2Back(tile_1, tile_2){
    //flip the 2 tiles back over
    hide_tile(tile_1)
    hide_tile(tile_2)

    //clear both arrays
    memory_values = [];
    memory_title_ids = [];
  }

  function memory_flip_tile(tile, val){
    if(tile.innerHTML === "" && memory_values.length < 2){
        show_tile(tile, val)
        add_tile_to_flipped(val, tile)
    } else {
      return hide_tile;
    }

    if (memory_values.length === 2) {
      //count every second move
      increase_counter();
      //compare two boxes
      check_if_same_tiles(
        document.getElementById(memory_title_ids[0]),
        document.getElementById(memory_title_ids[1]),
        memory_values
      );
    }
  }

  //call a new board
  function newBoard(level){
    let output = '';
    tiles_flipped = 0;
    memory_array = memory_tile_shuffle(generate_tiles(game_level[level], technologies));

    const chooseLevel = document.getElementById("choose_level").style.display = "none";
    const turnCounter = document.getElementById("score").style.display = "block";

    for(var i = 0; i < memory_array.length; i++){
      output += '<div id="tile_' + i + '" onclick="memory.flip_tile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('board').innerHTML = output;
  }
  
  return {
    flip_tile: memory_flip_tile,
    start_game: newBoard
  }
})();
# Trusiaczek fruits rush game
** You can see the project here:** [Trusiaczek fruits rush game]()

## Description
CodersCamp second project focused on JS usage.
Game is made mainly for desktop screens (game area is not responsive).

### Game instructions
Just try to collect all fruits as fast as you can ;)
Use arrows to move Trusiaczek (left, right, up).

### Code information
Game itslef is made in Canvas. Some main features:
* game elements coordinates are stored in JSON and loaded to js by `fetchData()` function,
* game elements are created by means of `createTerrainBoxes(arr)`, `createJumpBoxes(arr)` and `createFruits(arr)`,
* there are two mian objects (`player`, `controller`) which contains crutial position data and movement status,
* collision detection is based on player and game elemenst position comparison (iteration and if statements),
* animation and loop based on `requestAnimationFrame()` method,
* game results are stored in Local Storage (ten best results are presentent in HTML).

## Technologies used
* JavaScript
* CSS
* HTML

## Additional information
Due to collison detection check once an every frame in case of jump and fast player acceleration box elements such as terrain and jumpBoxes should be placed accordingly to `velocity` and `playerImg.height`. This is something that should be improved and I will be working on this in the future.

## Credits
* Fruits, player, jumBox and background images made by [FreeFrogs](https://github.com/freefrogs).
* Basic movement in canvas - [Frank Poth](https://github.com/frankarendpoth/frankarendpoth.github.io/blob/master/content/pop-vlog/javascript/2017/009-control/control.js)

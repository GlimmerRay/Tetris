// /* State Variables */
// staticGrid: -represents the current board except for the falling shape
//             -it's an array of 1s and 0s, 0s indicating empty squares
// shape: -represeents the shape which is currently falling down
//        -see 'shapes.js'
// centerX: -represents the horizontal positioning of 'shape'
// centerY: -represents the vertical positioning of 'shape'
// rotation: -represents the rotation of 'shape'

// -When the component mounts, we call setInterval which will simply
// decrement the position of 'shape' continously, i.e. make it fall
// -The function which handles this, decrementShapePosition(), adds 1
// to the centerY position.  But before it applies this change
// it checks to see whether this will result in a collision, and if it 
// will in fact result in a a collision if calls freezeShape()
// -freezeShape() saves the current position of shape to staticGrid
// and also sets a new shape at the top of the board
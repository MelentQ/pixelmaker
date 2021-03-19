let cContainer = document.querySelector('.canvas-area')
let c = cContainer.querySelector('canvas'),
    $ = c.getContext('2d')

function generateCanvas(){
  // Params
  let shapeNumber = 30 //Shapers per Row
  let shapeWidth = cContainer.clientWidth / shapeNumber
  let shapeAmount = Math.pow(shapeNumber, 2)
  let backColor = 'rgb(255, 255, 255)' //BG Color
  let border = 1
  let borderColor = 'rgba(0,0,0,.2)'

  let W = H = cContainer.clientWidth
  c.setAttribute('width', W)
  c.setAttribute('height', H)

  let x = y = 0
  let squares = []
  let w = h = shapeWidth

  addSquares()


  function Square(x, y) {
    this.x = x
    this.y = y
    this.color = backColor
    this.isSelected = false
  }
  


  function addSquares() {
    for (let i = 0; i < shapeAmount; i++) {
      let square = new Square(x, y)

      x += w

      if (x >= W - w + 0.001) { //0.001 - погрешность
          y += h
          x = 0
      }

      squares.push(square)
    }

    drawSquares()
  }
  




  function drawSquares() {
    $.clearRect(0, 0, W, H)
  
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i]
      $.beginPath()
      $.rect(square.x, square.y, w, h)
      $.fillStyle = square.color
      $.lineWidth = border
      $.strokeStyle = borderColor
      $.fill()
      $.stroke()
    }
  }





  c.onclick = select

  function select(e) {
    let clickX = e.pageX - c.offsetLeft,
        clickY = e.pageY - c.offsetTop

    for (let i = 0; i < squares.length; i++) {
      let square = squares[i]

      if (clickX > square.x && clickX < (square.x + w) && clickY > square.y && clickY < (square.y + h)) {
        if (square.isSelected == false) {
            square.isSelected = true
            square.color = document.querySelector('.shape-color').value

            // ПАРАМЕТЫ ПИКСЕЛЯ
            console.log(square)
            
        } else {
            square.isSelected = false
            square.color = backColor
        }
        
        drawSquares()
      }
    }
  }
}


generateCanvas()
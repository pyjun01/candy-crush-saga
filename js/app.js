(() => {
  const app = document.querySelector('.board');
  const width = 8;
  const squares = [];
  const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue',
  ];
  let score = 0;
  const scoreDisplay = document.querySelector('.score');

  const getRandomColor = () => Math.floor(Math.random() * candyColors.length);
  const addScore = (num) => {
    scoreDisplay.innerHTML = score += num;
  }
  const getInvalidIndexes = (length) => {
    const arr = [];

    for (let i = 1; i <= width; i++) {
      for (let j = 1; j < length; j++) {
        arr.push(i * 8 - j);
      }
    }

    return arr;
  }

  // Create Board
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', `${i}`);
      const randomColor = getRandomColor();
      square.className = candyColors[randomColor];
      app.appendChild(square);
      squares.push(square);
    }
  }

  const addEvent = () => {
    squares.forEach(square => {
      square.ondragstart = dragStart;
      square.ondragend = dragEnd;
      square.ondragover = dragOver;
      square.ondrop = dragDrop;
    });
  }

  let colorBeingDragged = null;
  let colorBeingReplaced = null;
  let squareIdBeingDreagged = null;
  let squareIdBeingReplaced = null;

  const dragStart = (e) => {
    const { target } = e;

    colorBeingDragged = target.className;
    squareIdBeingDreagged = parseInt(target.id);

    console.log(target.id, 'dragStart');
  }
  const dragEnd = (e) => {
    const { target } = e;

    let validMoves = [
      squareIdBeingDreagged - 1,
      squareIdBeingDreagged - width,
      squareIdBeingDreagged + 1,
      squareIdBeingDreagged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squares[squareIdBeingReplaced].className = colorBeingDragged;
      squares[squareIdBeingDreagged].className = colorBeingReplaced;
    }

    console.log(target.id, 'dragEnd');
  }
  const dragOver = (e) => e.preventDefault();
  const dragDrop = (e) => {
    const { target } = e;

    squareIdBeingReplaced = parseInt(target.id);
    colorBeingReplaced = target.className;

    console.log(target.id, 'dragDrop');
  }

  const moveDown = () => {
    squares.forEach((square, idx) => {
      const firstRow = [0,1,2,3,4,5,6,7];
      const isFirstRow = firstRow.includes(idx);

      if (square.className === '') {
        if (isFirstRow) {
          const randomColor = getRandomColor();
          square.className = candyColors[randomColor];
        } else {
          square.className = squares[idx - width].className;
          squares[idx - width].className = '';
        }
      }
    });
  }

  const checkRow = (length) => {
    const invalid = getInvalidIndexes(length);
    let rows = [];

    for (let i = 0; i < width * width - length + 1; i++) {
      rows = Array(length).fill().map((_, idx) => i + idx);
      const deciedColor = squares[i].className;
      const isBlank = deciedColor === '';

      if (invalid.includes(i)) {
        continue;
      }

      if (!isBlank && rows.every(idx => squares[idx].className === deciedColor)) {
        addScore(length);

        rows.forEach(idx => {
          squares[idx].className = '';
        });

        return false;
      }
    }

    return true;
  }
  const checkColumn = (length) => {
    for (let i = 0; i < width * (width - length + 1); i++) {
      const columns = Array(length).fill().map((_, idx) => i + (width * idx));
      const deciedColor = squares[i].className;
      const isBlank = deciedColor === '';

      if (!isBlank && columns.every(idx => squares[idx].className === deciedColor)) {
        addScore(length);

        columns.forEach(idx => {
          squares[idx].className = '';
        });

        return false;
      }
    }

    return true;
  }

  const checkCandies = () => {
    checkRow(4);
    checkColumn(4);
    checkRow(3);
    checkColumn(3);
  }

  window.onload = () => {
    createBoard();
    addEvent();

    setInterval(() => {
      checkCandies();
      moveDown();
    }, 100);
  };
})();
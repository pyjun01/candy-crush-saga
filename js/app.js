(() => {
  const app = document.querySelector('#app');
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

  // Create Board
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', `${i}`);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      app.appendChild(square);
      squares.push(square);
    }
  }

  // Drag candy
  const applyEvent = () => {
    squares.forEach(square => {
      square.ondragstart = dragStart;
      square.ondragend = dragEnd;
      square.ondragover = dragOver;
      square.ondragenter = dragEnter;
      square.ondragLeave = dragLeave;
      square.ondrop = dragDrop;
    });
  }

  let colorBeingDragged = null;
  let colorBeingReplaced = null;
  let squareIdBeingDreagged = null;
  let squareIdBeingReplaced = null;

  const dragStart = (e) => {
    const { target } = e;

    colorBeingDragged = target.style.backgroundColor;
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
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged;
      squares[squareIdBeingDreagged].style.backgroundColor = colorBeingReplaced;
    } else {
      squares[squareIdBeingDreagged].style.backgroundColor = colorBeingDragged;
    }

    console.log(target.id, 'dragEnd');
  }
  const dragOver = (e) => {
    e.preventDefault();
    const { target } = e;


    console.log(target.id, 'dragOver');
  }
  const dragEnter = (e) => {
    e.preventDefault();
    const { target } = e;


    console.log(target.id, 'dragEnter');
  }
  const dragLeave = (e) => {
    const { target } = e;


    console.log(target.id, 'dragLeave');
  }
  const dragDrop = (e) => {
    const { target } = e;

    squareIdBeingReplaced = parseInt(target.id);
    colorBeingReplaced = target.style.backgroundColor;

    squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDreagged].style.backgroundColor = colorBeingReplaced;


    console.log(target.id, 'dragDrop');
  }

  const moveDown = () => {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundColor === '') {
        squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
        squares[i].style.backgroundColor = '';

        const firstRow = [0,1,2,3,4,5,6,7];
        const isFirstRow = firstRow.includes(i);

        if (isFirstRow && squares[i].style.backgroundColor === '') {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundColor = candyColors[randomColor];
        }
      }
    }
  }

  const checkRowForFour = () => {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 4];
      let deciedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];

      if (notValid.includes(i)) {
        continue;
      }

      if (rowOfFour.every(idx => squares[idx].style.backgroundColor === deciedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(idx => {
          squares[idx].style.backgroundColor = '';
        });
      }
    }
  }

  const checkColumnForFour = () => {
    for (let i = 0; i < 35; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let deciedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (columnOfFour.every(idx => squares[idx].style.backgroundColor === deciedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(idx => {
          squares[idx].style.backgroundColor = '';
        });
      }
    }
  }
  const checkRowForThree = () => {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let deciedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

      if (notValid.includes(i)) {
        continue;
      }

      if (rowOfThree.every(idx => squares[idx].style.backgroundColor === deciedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(idx => {
          squares[idx].style.backgroundColor = '';
        });
      }
    }
  }

  const checkColumnForThree = () => {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let deciedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (columnOfThree.every(idx => squares[idx].style.backgroundColor === deciedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(idx => {
          squares[idx].style.backgroundColor = '';
        });
      }
    }
  }

  window.onload = () => {
    createBoard();
    applyEvent();

    setInterval(() => {
      checkRowForFour();
      checkColumnForFour();
      checkRowForThree();
      checkColumnForThree();
      moveDown();
    }, 100);
  };
})();
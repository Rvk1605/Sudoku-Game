var matrix = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9]
];

var unSolvedMatrix = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
];

let x = Math.floor(Math.random() * 10 + 1);
if(x==10){
    x=x-1;
}

function setSudoku(matrix){
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            let id = i.toString()+j.toString();
            document.getElementById(id).value = matrix[i][j].toString();
        }
    }
}



function isValid(matrix,row,col,val){
    for(let i=0;i<9;i++){
        if(matrix[row][i]==val){
            return false;
        }
    }

    for (let i = 0; i <9; i++) {
      if (matrix[i][col] == val) {
        return false;
      }
    }

    let startRow = row-row%3;
    let startCol = col-col%3;
    for(let i=startRow;i<startRow+3;i++){
        for(let j =startCol;j<startCol+3;j++){
            if(matrix[i][j] == val){
                return false
            }
        }
    }

    return true;
}

function solveSudoku(matrix,row,col){
    if(row>=9){
        setSudoku(matrix)
        return;
    }
    let nextCol,nextRow;
    if(col>=9){
        nextCol=0;
        nextRow=row + 1;
    }else{
        nextCol = col+1;
        nextRow = row;
    }
    if(matrix[row][col]==0){
        for (let i = 1; i <= 9; i++) {
          if (isValid(matrix, row, col, i)) {
            matrix[row][col] = i;
            solveSudoku(matrix, nextRow, nextCol);
            matrix[row][col] = 0;
          }
        }
    }else{
        solveSudoku(matrix, nextRow, nextCol);
    }
}


// document.getElementById("checkBtn").onclick = function(){
//     for(let i=0;i<9;i++){
//         for(let j=0;j<9;j++){
//             let id = i.toString() + j.toString();
//             let val = document.getElementById(id).value;
//             if(val == matrix[i][j]){
//                 document.getElementById(id).style.background="green"
//             }
//         }
//     }
// }

document.getElementById("resetBtn").onclick = function(){
    setSudoku(unSolvedMatrix);
}

document.getElementById("solveBtn").onclick = function() {
  solveSudoku(matrix,0,0);
};

// document.getElementById("resetBtn").onclick = setSudoku(matrix);
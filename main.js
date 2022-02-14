const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {

    field = [];

    constructor() {
        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField(row, col, 0.2);
    }


    generateField(height, width, percentage = 0.1) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                if (prob > percentage) {
                    this.field[y][x] = fieldCharacter;
                }
                else {
                    this.field[y][x] = hole;
                }
            }
        }

        //Set character position
        this.field[0][0] = pathCharacter;

        //Set hat position
        this.field[Math.floor(Math.random() * 10 + 1)][Math.floor(Math.random() * 10 + 1)] = hat;

    }  //End of generateField

    
    runGame() {
        let continueGame = true;
        while (continueGame) {
            this.print();
            this.askQuestion();

            if (this.locationX < 0 || this.locationY < 0 || this.locationX >= row || this.locationY >= col) {
                console.log("Out of bounds - Game End!");
                continueGame = false;
            }
            else if (this.field[this.locationY][this.locationX] === hole) {
                console.log("Sorry, you fell down a hole!");
                continueGame = false;
            }
            else if (this.field[this.locationY][this.locationX] === hat) {
                console.log("Congrats, you found your hat!");
                continueGame = false;
            }
            else {
                this.field[this.locationY][this.locationX] = pathCharacter;
            }
        }
    }  //End of runGame


    print() {
        clear();
        const displayString = this.field.map(row => {
                return row.join('');
            }).join('\n');
        console.log(displayString);
    }

    
    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer)
        {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            default:
                console.log("Enter U, D, L or R ");
                this.askQuestion();
        }
    }  //End of askQuestion
    
} //End of Class

const myfield = new Field();
myfield.runGame();
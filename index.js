#!/usr/bin/env node
const readline = require("readline").createInterface(
    process.stdin,
    process.stdout
);
const randomWord = require("./words");
const text = ["1. new game\n", "2. exit\n", "type 1 or 2 to select: \n"];

class Game {
    constructor() {
        this.word;
        this.lives;
        this.result;
        this.output = "";
        this.usedWords;
    }
    newGame() {
        this.word = randomWord();
        this.result = Array(this.word.length).fill("*");
        this.toGuess = this.word.length;
        this.usedWords = [];
        this.lives = 10;
        this.display();
        this.guessLetter();
    }
    guessLetter() {
        let stat = 0;
        console.log(this.centerPad(`Word: ${this.result.join(" ")}\n`));
        console.log(
            this.centerPad(`Used Letters: ${this.usedWords.join(" ")}\n`)
        );
        readline.question(this.centerPad("Enter a letter: \n"), (letter) => {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word.charAt(i) == letter) {
                    if (this.result[i] == letter) {
                        stat = 2;
                    } else {
                        this.result[i] = letter;
                        stat = 1;
                    }
                }
            }
            switch (stat) {
                case 0:
                    let used = false;
                    for (let i = 0; i < this.usedWords.length; i++) {
                        if (this.usedWords[i] == letter.toUpperCase())
                            used = true;
                    }
                    if (!used) {
                        this.lives--;
                        this.output += this.centerPad("Wrong!\n");
                        this.usedWords.push(letter.toUpperCase());
                    } else {
                        this.output += this.centerPad(
                            `Letter ${letter} is already used!\n`
                        );
                    }
                    break;
                case 1:
                    this.output += this.centerPad(`Right!\n`);
                    break;
                case 2:
                    this.output += this.centerPad(
                        `Letter ${letter} is already opened!\n`
                    );
            }

            this.output += this.centerPad(`Lives left: ${this.lives}\n`);
            this.display();
            this.checkStats();
        });
    }
    // Idea taken from https://github.com/hnrch02/tube-panic/blob/master/index.js
    centerPad(text) {
        return (
            " ".repeat((process.stdout.getWindowSize()[0] - text.length) / 2) +
            text
        );
    }

    checkStats() {
        if (this.lives > 0) {
            if (this.result.indexOf("*") == -1) {
                this.output = this.centerPad("You won!\n");
                this.launchMenu();
            } else {
                this.guessLetter();
            }
        } else if (this.lives <= 0) {
            this.output = this.centerPad("You lost\n");
            this.launchMenu();
        }
    }
    launchMenu() {
        this.display();
        let paddedText = text.map((el) => this.centerPad(el));
        readline.question(paddedText.slice(0, 2).join(""), (input) => {
            switch (input) {
                case "1":
                    this.newGame();
                    break;
                case "2":
                    this.display();
                    process.exit(0);
                default:
                    this.display;
                    this.launchMenu();
            }
        });
    }
    display() {
        console.clear();
        console.log(this.output);
        this.output = "";
    }
}

let g = new Game();
g.launchMenu();

const STOP = 'STOP';
const ADD = 'ADD';
const PUSH = 'PUSH';
const MUL = 'MUL';
const SUB = 'SUB';
const DIV = 'DIV';
const JUMP = 'JUMP';
const JUMPI = 'JUMPI';

class Interpreter {
    constructor() {
        this.state = {
            programCounter: 0,
            stack: [],
            code: []
        }
    }

    runCode(code) {
        this.state.code = code;
        while (this.state.programCounter < this.state.code.length) {
            const opcode = this.state.code[this.state.programCounter]

            switch (opcode) {
                case STOP:
                    return this.state.stack[this.state.stack.length - 1];
                case PUSH:
                    this.state.programCounter++;
                    const value = this.state.code[this.state.programCounter];
                    this.state.stack.push(value);
                    break;

                case ADD:
                case SUB:
                case MUL:
                case DIV:

                    const a = this.state.stack.pop();
                    const b = this.state.stack.pop();

                    let result;

                    if (opcode === ADD) result = a + b;
                    if (opcode === SUB) result = a - b;
                    if (opcode === MUL) result = a * b;
                    if (opcode === DIV) result = a / b;

                    this.state.stack.push(result);

                    break;

                case JUMP:
                    this.jump();
                    break;
                case JUMPI:
                    const condition = this.state.stack.pop();
                    if (condition === 1) {
                        this.jump();
                    }
                    break;


            }

            this.state.programCounter++;
        }
    }

    jump() {
        const destination = this.state.stack.pop();
        this.state.programCounter = destination;
        this.state.programCounter--;
    }
};

// ADD
let code = [PUSH, 10, PUSH, 5, ADD, STOP];
let result = new Interpreter().runCode(code);

console.log('Result of x + y = ', result);

// SUB
code = [PUSH, 10, PUSH, 5, SUB, STOP];
result = new Interpreter().runCode(code);

console.log('Result of x - y = ', result);

// MUL
code = [PUSH, 10, PUSH, 5, MUL, STOP];
result = new Interpreter().runCode(code);

console.log('Result of x * y = ', result);

//DIV

code = [PUSH, 5, PUSH, 10, DIV, STOP];
result = new Interpreter().runCode(code);

console.log('Result of x / y = ', result);


//JUMP

code = [PUSH, 6, JUMP, PUSH, 0, JUMP, PUSH, 'jump successful', STOP];
result = new Interpreter().runCode(code);

console.log('Result of JUMP = ', result);

//JUMP

code = [PUSH, 8, PUSH, 1,  JUMPI, PUSH, 0, JUMP, PUSH, 'jump successful', STOP];
result = new Interpreter().runCode(code);

console.log('Result of JUMPI = ', result);


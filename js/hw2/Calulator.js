const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Queue {
    constructor() {
        this.items = [];
    };

    isEmpty() {
        return this.items.length == 0;
    }

	Front() {
		return this.items[0];
	}
    enQueue(element) {
        this.items.push(element);
    }
    
    deQueue() {
        if (this.isEmpty()) 
            console.log('The queue is empty');
        return this.items.shift();
    }

    pop() {
        if (this.isEmpty())
            console.log('The queue is empty!');
        return this.items.pop();
    }

    print() {
        let tmp = '';
        for (let i = 0; i < this.items.length; i++) {
            tmp += this.items[i] + ' ';
        }
        console.log(tmp);
     }
}

class Stack {
    constructor(){
        this.stack = [];
       
    }
    push(element) {
        return this.stack.push(element);
    }
    isEmpty() {
        return this.stack.length === 0;
    }
    pop(){
        if (this.isEmpty()) {
            console.log('The stack is empty');
        } else {
            this.stack.pop();
        }
    }
    peek() {
        return this.stack[this.stack.length - 1];
    }
}

function main() {
    let r = function(){
        rl.question('Please enter your question: ', (answer) => { 
             answer = answer.replace(/\s/g,'');
            if (answer.toLowerCase() == 'quit' || answer.toLowerCase() == 'q') {
                console.log('Quit calculator...Thanks for using...')
                rl.close();
            } else {
                var queue = new Queue();        
                for (let i = 0; i < answer.length; i++) {
                    if (answer[i] === 'P' && answer[i + 1] == 'O' && answer[i+2] == 'W') {
                        queue.enQueue(answer[i] + answer[i+1] + answer[i+2]);
                        i = i + 2;
                    } else if (answer[i] === '.' ){
                        let tmp1 = i - 1;
                        let tmp2 = i + 1;
                        
                        let num1 = '';
                        let num2 = '';
                        while (!isNaN(answer[tmp1])) {
                            num1 += answer[tmp1];
                            tmp1--;
                        }
                        if ((answer[tmp1] == '-') && isNaN(answer[tmp1-1])){
                            num1 += answer[tmp1];
                        }
                        while (!isNaN(answer[tmp2])) {
                            num2 += answer[tmp2];
                            tmp2++;
                        }
                        // remove the number before '.'
                        queue.pop();
                        num1 = reverseString(num1);
                        // console.log('Decimal ' + num1 + answer[i] + num2);
                        queue.enQueue(num1 + answer[i] + num2);
                        i = tmp2 - 1;
                    }else if (answer[i] === '-' && isNaN(answer[i-1])) {
                    /*
                        If negative number is needed for input, uncomment the following code...
                    */
                    //     let iterator = i + 1;
                    //     let number = '';
                    //     number += answer[i];
                    //     while (!isNaN(answer[iterator])) {
                    //         number += answer[iterator];
                    //         iterator++;
                    //     }
                    //     queue.enQueue(number);
                    //     i = iterator - 1;
                    // }else if (!isNaN(answer[i])){
                    //     let iterator = i + 1;
                    //     let number = '';
                    //     number += answer[i];
                    //     while (!isNaN(answer[iterator])) {
                    //         number +=  answer[iterator];
                    //         iterator++;
                    //     }
                    //     queue.enQueue(number);
                    //     // queue.print();
                    //     i = iterator - 1;
                    console.log('negative number input is not allowed');
                    break;
                    } else {
                        queue.enQueue(answer[i]);
                    }
                }
                //queue.print();
                infixToPost(queue);
             }
            r();
        });
    }
    r();
}

function reverseString(item) {
    let tmp = '';
    for (i = item.length - 1; i >= 0; i--) {
        tmp += item[i];
    }
    return tmp;
}

function postToInfix(queue) {
	var stack = new Stack();
	var answer;
	while(!queue.isEmpty()) {
		var tmp = queue.Front();
		queue.deQueue();
		if (!isNaN(tmp)) {
            stack.push(tmp);
            
		} else {
            var topNum = parseFloat(stack.peek());
            // console.log('Top number ' + topNum);
			stack.pop();
            var nextNum = parseFloat(stack.peek());
            // console.log('Next Number ' + nextNum);
			stack.pop();
			switch(tmp) {
				case '+': answer = nextNum + topNum; break;
				case '-': answer = nextNum - topNum; break;
				case '*': answer = nextNum * topNum; break;
                case '/': 
                    if (topNum === 0) {
                        console.log('\nInvalid operation..');
                        break;
                    }else{
                        answer = nextNum / topNum; 
                        break;
                    }
                case 'POW': answer = Math.pow(nextNum,topNum); break;
                case '%': 
                    if (topNum === 0) {
                        console.log('\nInvalid operation..');
                        break;
                    } else {
                        answer = nextNum % topNum; 
                        break;
                    }
                    
            }
            if (answer == undefined){ 
               break;
            } else {
                stack.push(answer);
            }
        }     
    }

    if (stack.peek() == undefined){
        return '';
    }else{
        return stack.peek();
    }
}

function infixToPost(queue) {
    var opstack = [];
    var postQ = new Queue();
    while(!queue.isEmpty()) {
        var tmp = queue.Front();
        queue.deQueue();
        if (!isNaN(tmp)) {
            postQ.enQueue(tmp);
        } else if (opstack.length == 0) {
           opstack.push(tmp);
        } else if (tmp == '(') {
            opstack.push(tmp);
        } else if (tmp == ')') {
            while (opstack[opstack.length - 1] != '(' ) {
                postQ.enQueue(opstack.pop());
            }
            opstack.pop();
        } else {
            while (opstack.length != 0 && opstack[opstack.length - 1] != '(' &&  prec(tmp) <= prec(opstack[opstack.length - 1])) {
                postQ.enQueue(opstack.pop());
            }
            opstack.push(tmp);
        }
    }

    while (opstack.length != 0) {
        postQ.enQueue(opstack.pop());
    }
    postQ.print();
    console.log('\n' + postToInfix(postQ));
}


function prec(operator) {
    switch (operator) 
    { 
    case '+': 
        return 0;
    case '-': 
        return 0; 
    case '*': 
        return 1;
    case '/': 
        return 1; 
    case '%':
        return 1;
    case 'POW': 
        return 2; 
    } 
    return -1; 
}


main();
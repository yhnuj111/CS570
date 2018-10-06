class CircularQueue{
    /*
        Get some help from : https://www.programiz.com/dsa/circular-queue
        set the front and rear start at -1
    */
    constructor(size) {
        this.items = [];
        this.front = -1;
        this.size = size;
        this.rear = -1;
        while (size > 0) {
            this.items.push(null);
            size--;
        }
    };
    /*
        when the start pointer and the end pointer is at the start and the end of the queue OR
        when the rear pointer + 1 will exceed the front pointer, which means a circular situation, the 
        queue is full
    */
    isFull() {
        if ((this.front == 0 && this.rear == this.size - 1) || (this.front == (this.rear + 1))) 
            return true;
        return false;
    }
    /*
        When the front pointer is not moving...
    */
    isEmpty() {
        if (this.front == -1)
            return true;
        return false;
    }

 
	Front() {
		return this.items[this.front];
	}

    /*
        when euqueing, let the new element point to the rear and increase the index of rear.
    */
    enQueue(element) {
        if (this.isFull()) {
            console.log('The queue is completely full..');
        } else {
            // Overflow
            if (this.front == -1) {
                this.front = 0;
            }
            this.rear = (this.rear + 1) % this.size;
            // console.log(this.rear);
            this.items[this.rear] = element;
            console.log('The item ' + element + ' inserted');
        }
    }
    /*
        when dequeing, return the value that front point to, at the same time front circularly increases index...
    */
    deQueue() {
        if (this.isEmpty()) {
            console.log('The queue is empty');
        } else {
            var element = this.items[this.front];
            // this happens when the queue is empty and two pointer meets each other. Simply set two pointers to default...
            if (this.front == this.rear) {
                this.front = -1;
                this.rear = -1;
            } else {
                this.front = (this.front + 1) % this.size;
                //console.log('front ' + this.front);    
            }
            console.log('The item ' + element + ' is deleted');
            return element;
        }
    }
    print() {
        if (this.isEmpty()) {
            console.log('The queue is empty');
        } else {
            var i;
            // this cannot reach the last one though
            for (i = this.front; i != this.rear; i = (i + 1) % this.size) {
                console.log(this.items[i]);
                
            }

            // I can't get the last of the element from items, so I have to write this way...
            if (i == this.rear) {
                console.log(this.items[i]);
            }
        }
    }
}

function main() {
    var queue = new CircularQueue(13);
    queue.deQueue();

    queue.enQueue(3);
    queue.enQueue(4);
    queue.enQueue(2);
    queue.enQueue('/');
    queue.enQueue('+');
    queue.enQueue(5);
	queue.enQueue(3);
	queue.enQueue('*');
	queue.enQueue(6);
	queue.enQueue('-');
	queue.enQueue('*');
	queue.enQueue(8);
	queue.enQueue('-');
    //queue.print();
    //console.log(postToInfix(queue));
    
    var queue2 = new CircularQueue(17);
    queue2.enQueue('(');
    queue2.enQueue(3);
    queue2.enQueue('+');
    queue2.enQueue(4);
    queue2.enQueue('/');
    queue2.enQueue(2);
	queue2.enQueue(')');
	queue2.enQueue('*');
	queue2.enQueue('(');
	queue2.enQueue(5);
	queue2.enQueue('*');
	queue2.enQueue(3);
    queue2.enQueue('-');
    queue2.enQueue(6);
    queue2.enQueue(')');
    queue2.enQueue('-');
    queue2.enQueue(8);
    queue2.print();

    infixToPost(queue2);
}

function postToInfix(queue) {
	var stack = [];
	var answer;
	while(!queue.isEmpty()) {
		var tmp = queue.Front();
		queue.deQueue();
		if (!isNaN(tmp)) {
            stack.push(tmp);
            console.log(stack);
		} else {
            var topNum = stack[stack.length-1];
            console.log('Top number ' + topNum);
			stack.pop();
            var nextNum = stack[stack.length-1];
            console.log('Next Number ' + nextNum);
			stack.pop();
			switch(tmp) {
				case '+': answer = nextNum + topNum; break;
				case '-': answer = nextNum - topNum; break;
				case '*': answer = nextNum * topNum; break;
				case '/': answer = nextNum / topNum; break;
            }
            console.log("Answer each time " + answer);
            stack.push(answer);
            console.log(stack);
        }     
    }
    return stack[stack.length - 1];
}

function infixToPost(queue) {
    var opstack = [];
    var postQ = new CircularQueue(13);
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
    console.log(postToInfix(postQ));
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

    case '^': 
        return 2; 
    } 
    return -1; 
}


main();
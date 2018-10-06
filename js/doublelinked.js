
class Node {
	constructor(value){
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class doubleLinkedList {
	constructor() {
		this.rear = null;
		this.front = null;
		this.length = 0;
	}
	add(value) {
		let node = new Node(value);
		// when empty
		
		if (this.front == null && this.rear == null) {
			this.rear = node;
			this.front = node;
			this.length++;
		} else {
			let tmp = this.rear;	
			
			if (this.rear.next != null && this.rear.prev != this.front) {
				this.front.next = this.rear.next;
			} else {
				this.rear.next = node;
			}
			
			this.rear = node;
			this.rear.next = null;
			this.rear.prev = tmp;
			this.length++;
		}
	}
	
	remove() {
		if (this.rear == null) {
			console.log('The queue is empty');
		} else {
			this.rear = this.rear.prev;
			this.rear.next = null;
			this.length--;
		}
	}

	insertAt(index, value){
		let node = new Node(value);
		if (index > this.length - 1){
			console.log('index out of boundary');
		} else if (index == 0) {
			let second = this.front.next;
			this.front = node;
			this.front.prev = null;
			this.front.next = second;
		} else if (this.length - 1 == index) {
			let lastSecond = this.rear.prev;
			lastSecond.next = node;
			this.rear = node;
			this.rear.next = null;
			this.rear.prev = lastSecond;
		} else {
			let pointer = this.front;
			while (index != 0) {
				pointer = pointer.next;
				index--;
			}
			let previous = pointer.prev;
			let nextOne = pointer.next;
			pointer = node;
			pointer.next = nextOne;
			pointer.prev = previous;
			previous.next = pointer;
			nextOne.prev = pointer;
		}
	}
	swap(i, j) {
		if (i > this.length - 1 || j > this.length - 1) {
			console.log('out of boundary');
		} else if (i == 0 && j == this.length - 1) {
			let second = this.front.next;
			let first = this.front.value;
			let lastSecond = this.rear.prev;
			this.front.value = this.rear.value;
			this.rear.value = first;
		} else if (i == 0) {
			let pointer = this.front;
			while (j != 0) {
				pointer = pointer.next;
				j--;
			}
			let headVal = this.front.value;
			this.front.value = pointer.value;
			pointer.value = headVal;
		} else if (j == this.length - 1) {
			let pointer = this.front;
			while (i != 0) {
				pointer = pointer.next;
				i--;
			}
			let endVal = this.rear.value;
			this.rear.value = pointer.value;
			pointer.value = endVal;
		} else {
			let firstPt = this.front;
			let secondPt = this.front;
			while (i != 0) {
				firstPt = firstPt.next;
				i--;
			}
			while (j != 0) {
				secondPt = secondPt.next;
				j--;
			}
			let firstVal = firstPt.value;
			firstPt.value = secondPt.value;
			secondPt.value = firstVal;
		}
	}
	print() {
		let node = this.front;
		while (node != null) {
			console.log(node.value);
			node = node.next;
		}
	}
}

let list = new doubleLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);
list.add(7);
list.add(8);


// list.insertAt(3, 111);
list.swap(1,7);
list.print();
// console.log(list);

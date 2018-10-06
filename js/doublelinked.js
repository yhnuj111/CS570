
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
	print() {
		let a = this.front;
		while (this.front != null) {
			console.log(this.front.value);
			this.front = this.front.next;
		}
		this.front = a;
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


list.insertAt(3, 111);
list.print();
//console.log(list);

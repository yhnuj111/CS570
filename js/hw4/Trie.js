const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Node{
    constructor(key) {
        this.key = key;
        this.children = {};
		this.endOfWord = false;
    }
}
class Trie{
    constructor() {
		this.root = new Node(null);
		this.partialCorrect = false;
    }
    insert(key) {
        var tmp = this.root;
        for (let i = 0; i < key.length; i++) {
            if (tmp.children[key[i]] == null) {
                tmp.children[key[i]] = new Node(key[i]);

			}			
            tmp = tmp.children[key[i]];
            if (i == key.length - 1) { 
                tmp.endOfWord = true;
            }
        }
    }
	/*
		search for the word, return true if find it else return false;
	*/
	search (key) {
		// start from root
		let tmp = this.root;
		for (let i = 0; i < key.length; i++) {
			if (tmp.children[key[i]] != null) {
				// keep getting deeper
				tmp = tmp.children[key[i]];
			} else {
				this.partialCorrect = false;
				return false;
			}
			if (i == key.length - 1 && !tmp.endOfWord) {
				this.partialCorrect = true;
			}
		}
		
		return tmp.endOfWord;
	}
	getWord(key) {
		let theRoot = this.root;
		let tmp = "";
		for (let i = 0; i < key.length; i++) {
				tmp += key[i];
				theRoot = theRoot.children[key[i]];
				if (i == key.length - 1) {
					while (!theRoot.endOfWord) {
						//console.log('key ' + theRoot.key);
						tmp += theRoot.key;
						theRoot = theRoot.children[theRoot.key];
					}
				}
		}
		
		return tmp;
	}

}

function main() {
    let node = new Trie();
	fs.readFile('companies.dat', 'utf8', (err, data) => {
		if (err) console.log('File does not exist.');
		data = data.split('\n');
		for (let i in data) {
			let tmp = data[i].replace(/\t/g,' ');
			tmp = tmp.replace('\r', '');
			node.insert(tmp);
		}
		
		// onsole.log(node.root.children['A'].children['p'].children['p'].children['l'].children['e'].children[' ']);
	});
	
	// console.log(node.search("Abbott Laboratories"));
	rl.question("Please enter the article you want to read: ", (ans) => {

		fs.readFile(ans, 'utf8', (err, data) => {
			if (err) {console.log('Cannot read');}
			else {
				data = data.split(' ');
				let collection = {};
				let totalWord = data.length;
				for (let i = 0; i < data.length; i++) {
					if (node.search(data[i])) {
						let word = node.getWord(data[i]);
						if (collection[word] == null) {
							collection[word] = 1;
						} else {
							collection[word]++;
						}
						// console.log(word);
					} else if (node.partialCorrect && !node.search(data[i])){

						let word = '';
						let tmp = ' ';
						tmp  = tmp + data[i];
						while (node.partialCorrect && !node.search(tmp)) {
							tmp += ' ' + data[++i];
							tmp = tmp.replace(/^[ ]+|[ ]+$/g,'')
							node.search(tmp);
						}
						if (node.search(tmp)) {
							word = node.getWord(tmp);
							if (collection[word] == null) {
								collection[word] = 1;
							} else {
								collection[word]++;
							}
							// console.log(word);
						} else {
							--i;
						}
					}
				}
				printResult(collection, totalWord);
			}
			rl.close();
		});
	});
	
    //node.insert('hello');
    
}
main();

function printResult(collection, total) {
	console.log('Company                                    Hit Count                 Relevance');
	let totalFound = 0;
	for (let i in collection) {
		totalFound += collection[i];
		let offset = 46 - i.length;
		let space = '';
		for (j = 0; j < offset; j++) {
			space += ' ';
		}
		console.log(i + space + collection[i] + '                         ' + (collection[i] / total).toFixed(2));
	}
	console.log('     Total                                    ' + totalFound + '                         ' + (totalFound / total).toFixed(2));
	console.log('     Total Words                                              ' + total);
}
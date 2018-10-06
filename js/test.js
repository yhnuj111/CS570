
var stack = new Array();
stack.push(92);
stack.push(1);
stack.push(4);
stack.push(2);
stack.push(8);
stack.push(12);
stack.push(22);
stack.push(10);
stack.push(5);
stack.push(89);
stack.push(0);
var end = stack.length;
var start = 0;
function startFromHead(list, n) {
    var swapped = true;
    while (swapped){
        swapped = false;  
        for (var i = n; i < end; i++) {
            if (list[i - 1] > list[i]) {
                var tmp = list[i];
                list[i] = list[i - 1];
                list[i - 1] = tmp;
                swapped = true;
            } 
        }
        // Lock the last sorted one
        end = end - 1; 
        startFromEnd(list, end, start);
		console.log(list);		
    }   
}

function startFromEnd(list, end, start) {
    var swapped = true;
	//console.log(list);
    while (swapped) {
        swapped = false;
        for (var i = end - 1; i > start - 1; i--) {
            
            if (list[i] > list[i + 1]){
                var tmp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tmp;
                swapped = true;
            }
        }
        start += 1;
    }
}

startFromHead(stack, 1);
console.log(stack);

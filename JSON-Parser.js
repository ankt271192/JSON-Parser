var test1 = "3.14,\nabc";

function number(input){
	var token = /[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?/.exec(input)[0];
	return { token: Number(token), rest: input.slice(token.length)};
}

console.log(number(test1));
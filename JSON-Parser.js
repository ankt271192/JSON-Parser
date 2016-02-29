//var test1 = "3.14,\nabc";

function numberParser(input){
	var token;
	input = skipSpace(input);
	if (token = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?/.exec(input))
		return { token: Number(token[0]), rest: input.slice(token[0].length) };
	else
		return null;
}

//console.log(numberParser(test1));

//var test2 = '"abc" 123';

function stringParser(input){
	var token;
	input = skipSpace(input);
	if (token = /^"([^"]*)"/.exec(input))
		return { token: token[1], rest: input.slice(token[0].length) };
	else
		return null;
}

//console.log(stringParser(test2));

//var test3 = "true 123";

function boolParser(input){
	var token;
	input = skipSpace(input);
	if (token = /^true|^false/.exec(input)) {
		if(token[0] == "true")
			return { token: true, rest: input.slice(token[0].length) };
		else
			return { token: false, rest: input.slice(token[0].length) };
	}
	else
		return null;
}

//console.log(boolParser(test3));

//var test4 = "null 123";

function nullParser(input){
	var token;
	input = skipSpace(input);
	if (token = /^null/.exec(input))
		return { token: null, rest: input.slice(token[0].length) };
	else
		return null;
}

//console.log(nullParser(test4));

//var test5 = '[ 1,true,null,"abc" ]';

function arrayParser(input){
	var ar, match;
	input = skipSpace(input);
	if (/^\[/.test(input)){
		ar = [];
		input = input.slice(1);
		//console.log(input);
		while(input[0] != "]"){
			input = skipSpace(input);
			if(input[0] == ",")
				input = input.slice(1);
			match = jsonParser(input);
			//console.log(match);
			ar.push(match.token);
			input = match.rest;
		}
		return { token: ar, rest: input.slice(1) };
	}
	else
		return null;
}

//console.log(arrayParser(test5));

function objectParser(input){
	//parses the object
}

//var test6 = " 123";

function skipSpace(input){
	return input.trim();
}

//console.log(skipSpace(test6));

function jsonParser(input){
	//parses the JSON input and returns the output.
	var match;
	if (match = numberParser(input)){
		return match;
	}
	else if (match = stringParser(input)){
		return match;
	}
	else if (match = boolParser(input)){
		return match;
	}
	else if (match = nullParser(input)){
		return match;
	}
	else if (match = arrayParser(input)){
		return match;
	}
	else if (match = objectParser(input)) {
		return match;
	}
}

console.log(jsonParser('true,'));
console.log(jsonParser('false,'));
console.log(jsonParser('123'));
console.log(jsonParser('1.34'));
console.log(jsonParser('"abc"'));
console.log(jsonParser('null'));
console.log(jsonParser(' []'));
console.log(jsonParser('[1, "abc",  null, true, false, [1,2,3] ]'));

var input = {
	x: 2,
	str: "abc",
	flag: true,
	ar: [1,"str",null,false,1.45,1.8e10,{x:12,y:44},[.2,.4]],
	obj: {
			y: 4,
			st: "cde",
			ar: [7,8,9]
		}
	};
var test = JSON.stringify(input,null,"\t");
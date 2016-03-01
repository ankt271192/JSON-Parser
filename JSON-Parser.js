//var test6 = "\t \n \r    123";

function skipSpace(string){
	var first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

//console.log(skipSpace(test6));

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

//var test5 = '[ 1,true,null,"abc",{ "x": 3.14, "st": "str" } ]';

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
			input = skipSpace(match.rest);
		}
		return { token: ar, rest: input.slice(1) };
	}
	else
		return null;
}

//console.log(arrayParser(test5));

//var test7 = '{ "x": 1, "y": "abc", "a": 3.14, "obj":{ "x": 3.14, "y": "str" }, "ar": [1,2,3,[3.14] ]    }';

function objectParser(input){
	//parses the object
	var obj, key, value;
	input = skipSpace(input);
	if(/^\{/.test(input)){
		obj = {};
		input = input.slice(1);
		//console.log(input);
		while(input[0] != "}"){
			input = skipSpace(input);
			if(input[0] == ",")
				input = input.slice(1);
			key = stringParser(input);
			input = skipSpace(key.rest);
			if(input[0] == ":")
				input = input.slice(1);
			value = jsonParser(input);
			input = skipSpace(value.rest);
			obj[key.token] = value.token;
			//console.log(input);
		}
		return { token: obj, rest: input.slice(1) };
	}
	else
		return null;
}

//console.log(objectParser(test7));

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
	else
		return null;
}
/*
console.log(jsonParser('true,'));
console.log(jsonParser('false,'));
console.log(jsonParser('123'));
console.log(jsonParser('1.34'));
console.log(jsonParser('"abc"'));
console.log(jsonParser('null'));
console.log(jsonParser(' []'));
console.log(jsonParser('[ 1, 3.14,  "abc"  ,null ,true,false , [1,2,3], [4,  5 ,6] ]'));
*/
var input = {
	x: 2,
	str: "abc",
	flag: true,
	ar: [1,"str",null,false,1.45,1.8e10,{x:12,y:44},[0.2,0.4]],
	obj: {
			y: 4,
			st: "cde",
			ar: [7,8,9]
		}
	};
var test = JSON.stringify(input,null,"\t");
console.log(test,jsonParser(test),JSON.parse(test));
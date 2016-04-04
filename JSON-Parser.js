// Reading Data From 'data.txt' 

var fs = require("fs");
var data = fs.readFileSync("data.txt").toString();

// Removes Whitespaces

function skipSpace(string) {
    var first = string.search(/\S/);
    if (first == -1)
        return "";
    return string.slice(first);
}

// Parses A Number

function numberParser(input) {
    var token;
    input = skipSpace(input);
    if (token = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?/.exec(input))
        return { token: Number(token[0]), rest: input.slice(token[0].length) };
    return null;
}

// Parses A String

function stringParser(input) {
    var token;
    input = skipSpace(input);
    if (token = /^"([^"]*)"/.exec(input))
        return { token: token[1], rest: input.slice(token[0].length) };
    return null;
}

// Parses A Boolean

function boolParser(input) {
    var token;
    input = skipSpace(input);
    if (token = /^true|^false/.exec(input)) {
        if(token[0] == "true")
            return { token: true, rest: input.slice(token[0].length) };
        return { token: false, rest: input.slice(token[0].length) };
    }
    return null;
}

// Parses Null

function nullParser(input) {
    var token;
    input = skipSpace(input);
    if (token = /^null/.exec(input))
        return { token: null, rest: input.slice(token[0].length) };
    return null;
}

// Parses An Array

function arrayParser(input) {
    var ar, match;
    input = skipSpace(input);
    if (/^\[/.test(input)) {
        ar = [];
        input = input.slice(1);
        while (input[0] != "]") {
            input = skipSpace(input);
            if (input[0] == ",")
                input = input.slice(1);
            match = jsonParser(input);
            ar.push(match.token);
            input = skipSpace(match.rest);
        }
        return { token: ar, rest: input.slice(1) };
    }
    return null;
}

// Parses An Object

function objectParser(input) {
    var obj, key, value;
    input = skipSpace(input);
    if (/^\{/.test(input)) {
        obj = {};
        input = input.slice(1);
        while (input[0] != "}") {
            input = skipSpace(input);
            if (input[0] == ",")
                input = input.slice(1);
            key = stringParser(input);
            input = skipSpace(key.rest);
            if (input[0] == ":")
                input = input.slice(1);
            value = jsonParser(input);
            input = skipSpace(value.rest);
            obj[key.token] = value.token;
        }
        return { token: obj, rest: input.slice(1) };
    }
    return null;
}

// Parses the JSON Input And Returns the Output

function jsonParser(input) {
    var match;
    if (match = numberParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    if (match = stringParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    if (match = boolParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    if (match = nullParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    if (match = arrayParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    if (match = objectParser(input)) {
        if (match.rest == "")
            return match.token;
        return match;
    }
    return null;
}

// Displaying Parsed Data

console.log(jsonParser(data));
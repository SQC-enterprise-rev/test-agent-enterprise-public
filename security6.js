// security-hotspots.js

// Use of eval
let dynamicCode = "console.log('Hello from dynamic code!')";
eval(dynamicCode);

// Document DOM Modification
document.domain = "example.com";

// localStorage and sensitive data
localStorage.setItem("token", "sensitive-auth-token");

// Wildcards in CORS headers
// (NOTE: This is a hypothetical code, since 'response' isn't defined here)
// response.setHeader("Access-Control-Allow-Origin", "*");

// Opening a new window
const url = "http://example.com";
window.open(url);

// RegExp Denial of Service (ReDoS)
const pattern = /(a+)+b/;
const userInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";
pattern.test(userInput);

// Creating elements from strings
const userContent = "<img src='fake.jpg' onerror='alert(\"Hacked!\")'>";
const newElement = new DOMParser().parseFromString(userContent, "text/html");
document.body.appendChild(newElement.body.firstChild);

// WebSQL Database
// (NOTE: This is a hypothetical example since WebSQL might not be available in all browsers)
// let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

// Dynamic imports
const modulePath = '/module/path'; // Should not come from an untrusted source
import(modulePath);

// Node.js child process
// This needs to be in a Node.js environment
/*
const { exec } = require('child_process');
let userProvidedValue = "user-input"; 
exec(`echo ${userProvidedValue}`);
*/


// security-hotspots.js

// Use of eval
let dynamicCode = "console.log('Hello from dynamic code!')";
eval(dynamicCode);

// Document DOM Modification
document.domain = "example.com";

// localStorage and sensitive data
localStorage.setItem("token", "sensitive-auth-token");

// Wildcards in CORS headers
// (NOTE: This is a hypothetical code, since 'response' isn't defined here)
// response.setHeader("Access-Control-Allow-Origin", "*");

// Opening a new window
const url = "http://example.com";
window.open(url);

// RegExp Denial of Service (ReDoS)
const pattern = /(a+)+b/;
const userInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";
pattern.test(userInput);

// Creating elements from strings
const userContent = "<img src='fake.jpg' onerror='alert(\"Hacked!\")'>";
const newElement = new DOMParser().parseFromString(userContent, "text/html");
document.body.appendChild(newElement.body.firstChild);

// WebSQL Database
// (NOTE: This is a hypothetical example since WebSQL might not be available in all browsers)
// let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

// Dynamic imports
const modulePath = '/module/path'; // Should not come from an untrusted source
import(modulePath);

// Node.js child process
// This needs to be in a Node.js environment
/*
const { exec } = require('child_process');
let userProvidedValue = "user-input"; 
exec(`echo ${userProvidedValue}`);
*/


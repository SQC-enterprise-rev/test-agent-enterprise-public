// problematic-sonar.js

let password = '123456'; // Hardcoded password: Potential security issue

let unusedVariable = 'I\'m not used'; // Unused variable: Code smell for dead code

function add(a, b) {
    return a + b;
}

function add(a, b) { // Duplicate function: Code smell for duplicated blocks
    return a + b;
}

let x; // Variables should be initialized: Code smell for uninitialized variables

for (let i = 0; i < 5; i++) { // Non-compliant use of "==" instead of "===".
    if (x == undefined) {
        console.log('x is not defined');
    }
}

let evalString = 'console.log(\'This is not good.\')'; 
eval(evalString); // Use of eval: Major security issue

setTimeout(() => {
    console.log('This is a delayed log.');
}, '1000'); // Use of string for setTimeout delay: Potential bug

function divide(a, b) {
    return a / b; // Potential division by zero: Possible bug if b is 0
}

function login(user) {
    // Sensitive operations require authentication checks
    // Missing authentication check: Security Hotspot
    deleteUser(user);
}

function deleteUser(user) {
    console.log(`${user} deleted.`);
}

// No use strict: Code smell for potentially problematic constructs
x = 017; // Octal numbers can be confusing: Code smell
eval('const foo = 1');

const division = 1 / 0;

// Opening a new window
const url = 'http://example.com';
window.open(url);

// RegExp Denial of Service (ReDoS)
const pattern = /(a+)+b/;
const userInput = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!';
pattern.test(userInput);

// Creating elements from strings
const userContent = '<img src=\'fake.jpg\' onerror=\'alert("Hacked!")\'>';
const newElement = new DOMParser().parseFromString(userContent, 'text/html');
document.body.appendChild(newElement.body.firstChild);
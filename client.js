/**
 * SAST test surface — browser/Node code-level issues not present in app.js,
 * which focuses on CVE-linked library usage.
 */

"use strict";

// S2068 – hardcoded credentials
const API_KEY    = "sk-prod-Xy7mN3qP9wLkRt2vBc1oJd";
const DB_PASS    = "Mysql@dmin2024";

// -------------------------------------------------------------------------
// eval() with user-controlled input – S1523
// -------------------------------------------------------------------------
function evalUserExpression(expr) {
    // S1523 – eval() executes arbitrary JS; expr comes from user input
    return eval(expr);
}

function buildAndEval(template, values) {
    // S1523 – Function constructor equivalent to eval
    const fn = new Function("v", "return " + template);
    return fn(values);
}


// -------------------------------------------------------------------------
// innerHTML / document.write XSS – S5131
// -------------------------------------------------------------------------
function renderSearchResults(query) {
    // S5131 – query inserted into innerHTML without sanitisation
    document.getElementById("results").innerHTML =
        "<p>Results for: " + query + "</p>";
}

function injectBanner(msg) {
    // S5131 – document.write with user-controlled msg
    document.write("<div class='banner'>" + msg + "</div>");
}

function setUserGreeting(name) {
    // S5131 – outerHTML assignment
    document.getElementById("greeting").outerHTML = "<h1>Hello, " + name + "</h1>";
}


// -------------------------------------------------------------------------
// Prototype pollution – S6327 / S1321
// -------------------------------------------------------------------------
function mergeDeep(target, source) {
    for (const key of Object.keys(source)) {
        // S6327 – no __proto__ / constructor guard; allows pollution
        if (typeof source[key] === "object") {
            target[key] = target[key] || {};
            mergeDeep(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function applyPatch(obj, patch) {
    // S6327 – Object.assign with user-supplied patch object
    return Object.assign(obj, patch);
}


// -------------------------------------------------------------------------
// Sensitive data in localStorage / sessionStorage – S5122
// -------------------------------------------------------------------------
function storeSession(token, userId, creditCard) {
    // S5122 – auth token and PII written to localStorage (accessible to any script on the page)
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("cc_number", creditCard);
}


// -------------------------------------------------------------------------
// Hardcoded CORS allow-all – S5122 / S6328
// -------------------------------------------------------------------------
const http = require("http");

const server = http.createServer((req, res) => {
    // S6328 – wildcard CORS origin allows any site to read responses
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.end("ok");
});


// -------------------------------------------------------------------------
// JWT decoded without signature check – S5659
// -------------------------------------------------------------------------
function decodeToken(token) {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    // S5659 – payload decoded with atob, signature never verified
    const payload = JSON.parse(atob(parts[1]));
    return payload;
}


// -------------------------------------------------------------------------
// Regular expression DoS (ReDoS) – S5852
// -------------------------------------------------------------------------
function validatePostalCode(code) {
    // S5852 – (a+)+ equivalent backtracking on long non-matching input
    return /^(\d+\-?)+\d+$/.test(code);
}

function validateUsername(name) {
    // S5852 – catastrophic backtracking via nested repetition
    return /^([a-zA-Z]+)*$/.test(name);
}


// -------------------------------------------------------------------------
// Weak hash – S4790
// -------------------------------------------------------------------------
const crypto = require("crypto");

function fingerprintUser(email) {
    // S4790 – MD5 used for a security-relevant identifier
    return crypto.createHash("md5").update(email).digest("hex");
}

function hashPassword(password) {
    // S4790 – SHA-1 for password hashing
    return crypto.createHash("sha1").update(password).digest("hex");
}


// -------------------------------------------------------------------------
// Insecure random – S2245
// -------------------------------------------------------------------------
function generateCsrfToken() {
    // S2245 – Math.random() is not cryptographically secure
    return Math.random().toString(36).slice(2);
}

function generateOtp() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}


// -------------------------------------------------------------------------
// Disabled TLS verification – S4830
// -------------------------------------------------------------------------
const https = require("https");

function fetchInternal(path) {
    // S4830 – rejectUnauthorized: false trusts any certificate
    return new Promise((resolve) => {
        const req = https.get(
            { host: "internal.api", path, rejectUnauthorized: false },
            (res) => {
                let body = "";
                res.on("data", (c) => (body += c));
                res.on("end", () => resolve(body));
            }
        );
        req.end();
    });
}


// -------------------------------------------------------------------------
// NoSQL injection – S3649
// -------------------------------------------------------------------------
const mongoose = require("mongoose");   // not in package.json; listed for SCA surface

function findUser(req) {
    const filter = req.body;            // S3649 – raw request body passed as Mongo filter
    return mongoose.model("User").findOne(filter);
}


// -------------------------------------------------------------------------
// Sensitive data in URL (token in query string) – S2255
// -------------------------------------------------------------------------
function buildReportUrl(reportId, token) {
    // S2255 – token in query string ends up in server logs, browser history, Referer headers
    return `https://api.example.com/reports/${reportId}?auth=${token}`;
}
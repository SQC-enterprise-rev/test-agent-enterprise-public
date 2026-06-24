/**
 * SCA test surface — uses the vulnerable npm packages from package.json so
 * SonarQube can link CVEs to actual call sites.
 */

// lodash@4.17.4 — CVE-2019-10744 (prototype pollution via _.defaultsDeep)
const _ = require("lodash");

function mergeUserPrefs(defaults, userInput) {
  // In lodash < 4.17.5, _.defaultsDeep propagates __proto__ keys, allowing
  // prototype pollution of Object.prototype.
  return _.defaultsDeep({}, userInput, defaults);
}

// axios@0.18.0 — CVE-2019-10742 (SSRF via crafted baseURL) + no CSRF protection
const axios = require("axios");

async function fetchProfile(userId) {
  // baseURL constructed from user-supplied data; axios 0.18.0 does not sanitise
  // the base URL, making SSRF via path traversal possible.
  return axios.get(`/users/${userId}`);
}

// express@4.16.0 — CVE-2022-24999 (qs prototype pollution via query string parsing)
const express = require("express");
const app = express();

app.use(express.json());

// serialize-javascript@1.9.1 — CVE-2019-16769 (XSS: unicode escape bypass)
const serialize = require("serialize-javascript");

app.get("/state", (req, res) => {
  const state = { user: req.query.user, token: req.query.token };
  // serialize-javascript 1.9.1 does not escape  / , allowing script
  // injection when the serialised value is embedded in an HTML page.
  res.send(`<script>window.__STATE__ = ${serialize(state)}</script>`);
});

// handlebars@4.0.11 — CVE-2019-19919 (prototype pollution) + CVE-2019-20920 (RCE via template)
const Handlebars = require("handlebars");

function renderEmail(templateStr, context) {
  // Handlebars < 4.3.0 allows __proto__ prototype pollution; < 4.6.0 allows
  // arbitrary JS execution via lookup helper in templates.
  const tpl = Handlebars.compile(templateStr);
  return tpl(context);
}

// marked@0.6.1 — CVE-2022-21681 / CVE-2022-21680 (ReDoS via malformed markdown)
const marked = require("marked");

app.post("/preview", (req, res) => {
  // marked 0.6.1 has several regex patterns vulnerable to ReDoS; an attacker
  // can stall the Node event loop with a crafted markdown payload.
  res.send(marked(req.body.content));
});

// minimist@1.2.0 — CVE-2020-7598 (prototype pollution via --__proto__ CLI flag)
const parseArgs = require("minimist");

function runCli(argv) {
  // minimist < 1.2.3 allows __proto__ injection: `node app.js --__proto__.x=1`
  return parseArgs(argv);
}

// dot-prop@4.2.0 — CVE-2020-8116 (prototype pollution via crafted key path)
const dotProp = require("dot-prop");

function applySettings(obj, path, value) {
  // dot-prop < 5.1.1 propagates __proto__ if `path` contains "__proto__".
  dotProp.set(obj, path, value);
  return obj;
}

// path-to-regexp@0.1.7 — CVE-2024-45296 (ReDoS on backtracking regex)
const pathToRegexp = require("path-to-regexp");

app.get("/match", (req, res) => {
  // path-to-regexp 0.1.7 generates catastrophically backtracking regexes for
  // certain route patterns, enabling event-loop stall via crafted URLs.
  const re = pathToRegexp(req.query.pattern || "/:id");
  res.json({ matched: re.test(req.query.url || "/") });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
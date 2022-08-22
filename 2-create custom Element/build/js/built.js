/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/script */ \"./module/script.js\");\n\r\n// import './module/style.css'\n\n//# sourceURL=webpack://2-create-custom-element/./app.js?");

/***/ }),

/***/ "./module/script.js":
/*!**************************!*\
  !*** ./module/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Rating\": () => (/* binding */ Rating)\n/* harmony export */ });\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ \"./module/index.html\");\n\r\n\r\n// import './style.css'\r\n\r\n\r\nconst template = document.createElement('template')\r\ntemplate.innerHTML = _index_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\nconsole.log(template)\r\n\r\nclass Rating extends HTMLElement {\r\n    static get observedAttributes() {\r\n        return ['rating', 'max-rating'];\r\n    }\r\n\r\n    constructor() {\r\n        super();\r\n        const shadowRoot = this.attachShadow({ mode: 'closed' });\r\n        shadowRoot.appendChild(template.content.cloneNode(true));\r\n    }\r\n\r\n    connectedCallback() {\r\n        console.log('Rating added to DOM');\r\n        console.log('rating maxRatin:', this.rating, this.maxRating)\r\n\r\n        if (!this.rating) {\r\n            this.rating = 0;\r\n\r\n        }\r\n        if (!this.maxRating || this.maxRating < 0) {\r\n            this.maxRating = 5;\r\n        }\r\n    }\r\n\r\n    get maxRating() {\r\n        console.log(\"maxRating get\")\r\n        return this.getAttribute('max-rating');\r\n    }\r\n    set maxRating(value) {\r\n        console.log(\"maxRating set\")\r\n        this.setAttribute('max-rating', value);\r\n    }\r\n\r\n    get rating() {\r\n        console.log(\"rating get func\")\r\n        return this.getAttribute('rating');\r\n    }\r\n    set rating(value) {\r\n        console.log(\"rating set func\")\r\n        this.setAttribute('rating', value);\r\n    }\r\n\r\n    adoptedCallback() {\r\n        console.log('Rating was moved into a new DOM');\r\n    }\r\n    disconnectedCallback() {\r\n        console.log('Rating removed from DOM')\r\n    }\r\n\r\n    attributeChangedCallback(name, oldVal, newVal) {\r\n        if (oldVal !== newVal) {\r\n            console.log(`${name} changed from ${oldVal} to ${newVal}`)\r\n            switch (name) {\r\n                case 'rating': {\r\n                    this.rating = newVal;\r\n                    break;\r\n                }\r\n                case 'max-rating': {\r\n                    this.matRating = newVal;\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nwindow.customElements.define('my-rating', Rating)\n\n//# sourceURL=webpack://2-create-custom-element/./module/script.js?");

/***/ }),

/***/ "./module/index.html":
/*!***************************!*\
  !*** ./module/index.html ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<!-- <style>\\r\\n    @import url('./style.css');\\r\\n</style> -->\\r\\n\\r\\n<!-- <link rel=\\\"stylesheet\\\" href=\\\"./style.css\\\"> -->\\r\\n\\r\\n<style>\\r\\n    .rating-stars {\\r\\n        display: flex;\\r\\n        margin: 10px 30px;\\r\\n        padding: 5px 0;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .rating-star {\\r\\n        width: 100px;\\r\\n        height: 100px;\\r\\n        background-image: url(\\\"../assert/star_on.png\\\");\\r\\n        background-position: center;\\r\\n        background-size: cover;\\r\\n    }\\r\\n</style>\\r\\n<div>\\r\\n    <p>Rating</p>\\r\\n    <div class=\\\"rating-stars\\\">\\r\\n        <div class=\\\"rating-star star-1\\\">1</div>\\r\\n        <div class=\\\"rating-star star-2\\\">2</div>\\r\\n        <div class=\\\"rating-star star-3\\\">3</div>\\r\\n        <div class=\\\"rating-star star-4\\\">4</div>\\r\\n        <div class=\\\"rating-star star-5\\\">5</div>\\r\\n    </div>\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://2-create-custom-element/./module/index.html?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;
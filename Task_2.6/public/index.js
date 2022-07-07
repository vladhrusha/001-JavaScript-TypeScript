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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"form\": () => (/* binding */ form),\n/* harmony export */   \"tableBody\": () => (/* binding */ tableBody)\n/* harmony export */ });\n/* harmony import */ var _tableManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableManipulation */ \"./src/tableManipulation.ts\");\n\r\nconst form = document.querySelector(\".todo__form\");\r\nconst tableBody = document.querySelector(\"tbody\");\r\nconst clearButton = document.querySelector(\".clearButton\");\r\nform.addEventListener('submit', onSubmit);\r\nclearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener('click', _tableManipulation__WEBPACK_IMPORTED_MODULE_0__.onClearTable);\r\nfunction onSubmit(e) {\r\n    e.preventDefault();\r\n    const inputText = form.querySelector('.input').value;\r\n    if ((0,_tableManipulation__WEBPACK_IMPORTED_MODULE_0__.isEmptyOrWhitespaceOnly)(inputText)) {\r\n        return;\r\n    }\r\n    tableBody.innerHTML += (0,_tableManipulation__WEBPACK_IMPORTED_MODULE_0__.composeTableRow)(inputText);\r\n    const trashImages = tableBody.querySelectorAll('.trashImage');\r\n    trashImages.forEach((trashImage) => {\r\n        trashImage.addEventListener('click', _tableManipulation__WEBPACK_IMPORTED_MODULE_0__.clearRow);\r\n    });\r\n    const editImages = tableBody.querySelectorAll('.editImage');\r\n    editImages.forEach((editImage) => {\r\n        editImage.addEventListener('click', _tableManipulation__WEBPACK_IMPORTED_MODULE_0__.editRow);\r\n    });\r\n    form.querySelector('.input').value = '';\r\n}\r\n\r\n\n\n//# sourceURL=webpack://task_2.6/./src/index.ts?");

/***/ }),

/***/ "./src/tableManipulation.ts":
/*!**********************************!*\
  !*** ./src/tableManipulation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearRow\": () => (/* binding */ clearRow),\n/* harmony export */   \"composeTableRow\": () => (/* binding */ composeTableRow),\n/* harmony export */   \"editRow\": () => (/* binding */ editRow),\n/* harmony export */   \"isEmptyOrWhitespaceOnly\": () => (/* binding */ isEmptyOrWhitespaceOnly),\n/* harmony export */   \"onClearTable\": () => (/* binding */ onClearTable)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.ts\");\n\r\nfunction onClearTable() {\r\n    _index__WEBPACK_IMPORTED_MODULE_0__.tableBody.innerHTML = '';\r\n}\r\nfunction composeTableRow(inputText) {\r\n    return `\r\n    <tr class=\"table__row\">\r\n\t<td class=\"outputTd\">${inputText}</td>\r\n\t<td>\r\n\t<img class=\"image editImage\" src=\"../images/notes.png\" />\r\n\t<img class=\"image trashImage\" src=\"../images/trash.png\" />\r\n\t</td>\r\n\t</tr>\r\n    `;\r\n}\r\nfunction clearRow(e) {\r\n    var _a, _b;\r\n    let currentTarget = e.currentTarget;\r\n    (_b = (_a = currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();\r\n}\r\nfunction editRow(e) {\r\n    var _a, _b;\r\n    const inputText = _index__WEBPACK_IMPORTED_MODULE_0__.form.querySelector('.input').value;\r\n    if (isEmptyOrWhitespaceOnly(inputText)) {\r\n        return;\r\n    }\r\n    let td = (_b = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.outputTd');\r\n    td.innerHTML = inputText;\r\n    _index__WEBPACK_IMPORTED_MODULE_0__.form.querySelector('.input').value = '';\r\n}\r\nfunction isEmptyOrWhitespaceOnly(str) {\r\n    if (str == '' || str.trim().length === 0) {\r\n        return true;\r\n    }\r\n    return false;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://task_2.6/./src/tableManipulation.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
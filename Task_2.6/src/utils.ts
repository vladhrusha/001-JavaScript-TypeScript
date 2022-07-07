function isEmptyOrWhitespaceOnly(str : string){
   return str == '' || str.trim().length === 0;
}
export {isEmptyOrWhitespaceOnly};
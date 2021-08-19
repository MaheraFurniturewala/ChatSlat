//also check for leading and trailing white spaces

let isRealString = (str) => {
    //if it is not greater than 0  that means it only has spaces inside of it
    return typeof str === 'string' && str.trim().length>0; 
}

module.exports = {isRealString}

// let isRealString = (str) => {
//     return typeof str === 'string' && str.trim().length > 0;
//   };
  
//   module.exports = {isRealString};
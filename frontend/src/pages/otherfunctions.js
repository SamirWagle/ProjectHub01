export function alphanumericToNumber(code) {
    let result = "";
    for (let i = 0; i < code.length; i++) {
        let charCode = code.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) { // 0-9
            result += charCode - 48;
        } else if (charCode >= 65 && charCode <= 90) { // A-Z
            result += charCode - 55;
        } else if (charCode >= 97 && charCode <= 122) { // a-z
            result += charCode - 61;
        } // ignore other characters
    }
    return parseInt(result, 10);
}

export function selectHobbies(count, seed) {
    // Load the JSON file
    const hobbies = require('./hobby.json');
  
    // Check if count is greater than the number of hobbies in the file
    if (count > hobbies.length) {
      return "Count exceeds the number of hobbies in the file";
    }
  
    // Use the seed value to create a deterministic shuffle
    let shuffledHobbies = hobbies.slice();
    for (let i = shuffledHobbies.length - 1; i > 0; i--) {
      const j = Math.floor((seed + i) % (i + 1));
      [shuffledHobbies[i], shuffledHobbies[j]] = [shuffledHobbies[j], shuffledHobbies[i]];
    }
  
    // Select the first 5 hobbies from the shuffled array
    return shuffledHobbies.slice(0, count).map(obj => obj.hobby);
  }
  


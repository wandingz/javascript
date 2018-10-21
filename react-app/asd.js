function createMetrics(str) {
    let str1 = simplify(str);
    console.log("-->", str1)
    strOnlyLetter = str1.replace(/[^a-z]/g, '');
    console.log("-->", strOnlyLetter)
    let myArray = str1.split(" ");
    var dict = {}; //get word
    // let resultObj = new Object();
    var resultObj = { totalLetters: 0, totalNonLetters: 0, totalWords: myArray.length, uniqueWords: 0, longWords: 0 };
    for (let word of myArray) {
        resultObj.longWords += (word.length >= 6);
        if (word in dict) {
            dict[word]++;
        } else {
            dict[word] = 1;
            resultObj.uniqueWords += 1;
        }
    }
    resultObj.totalLetters = strOnlyLetter.length;
    let tnl = str.lenth - resultObj.totalLetters
    console.log(typeof (str.lenth))
    console.log(typeof (resultObj.totalLetters))
    resultObj.totalNonLetters = tnl;
    resultObj.averageWordLength = 1.0 * resultObj.totalLetters / resultObj.totalWords;
    resultObj.wordOccurrences = dict;
    return resultObj;
}

createMetrics("asd123")
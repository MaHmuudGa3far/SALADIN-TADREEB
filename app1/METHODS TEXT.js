/*************************************************/
/* * * * * METHODS FOR TEXT MANIPULATION * * * * */
/*************************************************/

// CHECK IF A CHARACTER IS A LETTER FOR ARABIC DIACRITICS
function isLetter(character) {
    return /^[\u0600-\u06FF\u0610-\u061A\u064B-\u065F]$/.test(character);
};

// SEPARATES THE WORDS OF A 'SENTENCE'
function separate_words(sentence){
    let wordsArray = sentence.split(/[\s،.؟!؛\n]+/).filter(word => word !== "");
    return wordsArray;
};

// SEPARATES THE WORDS OF A ['SENTENCE', 'SENTENCE',...]
function separate_words2(sentences){
    const result = [];
    sentences.forEach((sentence, index) => {
        // Split the sentence into words using a regular expression that matches Arabic word boundaries
        const words = sentence.split(/\s+/);
        // Add the words to the result array
        result.push(...words);
        /*// Add ' ___ ' after each sentence except the last one
        if (index < sentences.length - 1) {
            result.push('___');
        }*/
    });
    return result;
}

// CHOOSE A LINE RANDOMELY
function choose_line(srt_length){
    return randomNumber = Math.floor(Math.random() * srt_length);
};

// CONVERT ['STRING1', 'STRING2'] TO ['STRING1 STRING2']
function flattenSub(sub){
    let flattened_sub = '';
    for (let i = 0; i < sub.length; i++){
        flattened_sub = flattened_sub + ' ' + sub[i];
    }
    return flattened_sub;
}

// SHUFFLE WORDS: TAKES ['WORD1 WORD2...'] AND RETURNS ['WORD2', 'WORD1', ...]
function shuffle_words(srt_array) {
    srt_array = separate_words2(srt_array);
    for (let i = srt_array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at index i and j
        [srt_array[i], srt_array[j]] = [srt_array[j], srt_array[i]];
    }
    return srt_array;
};

// CHECKS IF TWO ARRAYS ARE EQUAL
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}





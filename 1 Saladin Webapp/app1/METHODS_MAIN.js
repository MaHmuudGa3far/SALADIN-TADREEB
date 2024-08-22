
/******************************************/
/* * * * * METHODS TO LOAD IFRAME * * * * */
/******************************************/
/*
const playlistId = 'PLbPPU8HQD2qqU8OoSFUOmRbZdFmbwvcqb';
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        playerVars: {
            'listType': 'playlist',
            'list': playlistId,
            'controls': 1,'mute': 1,'loop': 1,
            'shuffle': 1,'autoplay': 1,},
        events: {'onReady': onPlayerReady}});}
function onPlayerReady(event) {
    event.target.setShuffle(true); //Start playlist in shuffle mode
    }
*/
// Load the IFrame Player API code asynchronously.
let language = 'en';
let arLevel = "1";

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
    var videoId = getRandomElement(VIDEOS_MAIN);
    console.log('videoId: ',videoId)
    player = new YT.Player('ytplayer', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
        'autoplay': 1, // Autoplay the video
        'mute': 1      // Mute the video
        },
        events: {'onReady': onPlayerReady, /*'onError': onPlayerError*/}});}
function onPlayerReady(event) {
    // Optional: You can start the video here if autoplay didn't work
    event.target.playVideo();
    player.seekTo((Math.floor(Math.random() * 7) + 1)*60,true);}

// function onPlayerError(event){()=>{console.log('uploading another video');player.loadVideoById(getRandomElement(VIDEOS_MAIN))}}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    console.log('randomIndex: ',randomIndex);
    return array[randomIndex];}
/*****************************************/
/* * * * * METHODS TO FIND FILES * * * * */
/*****************************************/


function subtitlesPath(series_name, episode, arabic, translation){
    return `1 Saladin Webapp/subs_js/subs-${series_name}-${episode}${arabic}${translation}.js`;}


function imagePaths(series_name, episode){
    return [`1 Saladin Webapp/images/img-${series_name}-${episode}.webp`,
            `1 Saladin Webapp/images/img-${series_name}-all.webp`,
            `1 Saladin Webapp/images/img-${series_name}-all.jpg`,
            `1 Saladin Webapp/images/img-${series_name}-all.png`,
            `1 Saladin Webapp/images/img-${series_name}-${episode}.jpg`,
            `1 Saladin Webapp/images/img-${series_name}-${episode}.png`];}

function videoPath(series_name, episode, format){
    return `../../${series_name} videos/${series_name}-${episode}.${format}`;}

function loadDynamicScript(scriptName) {
    return new Promise((resolve, reject) => {
        // Get the <script> tag element by its ID
        let scriptElement = document.getElementById('subs_script');
        // Optional: Check if the script is already loaded and reload if needed
        if (scriptElement && scriptElement.hasAttribute('src')) {
            // Remove the existing script
            scriptElement.parentNode.removeChild(scriptElement);}
        // Create a new script element
        scriptElement = document.createElement('script');
        scriptElement.id = 'subs_script';
        scriptElement.src = scriptName;
        // Handle successful script load
        scriptElement.onload = () => {resolve(true);};
        // Handle script load error
        scriptElement.onerror = () => {reject(false);};
        // Append the new script element to the document body
        document.body.appendChild(scriptElement);});}

function checkImageExistence(primarySrc, fallbackSrc) {
    var img = new Image();
    img.onload = function() {
        // Image exists, so create a button with this background
        createButtonWithBackground(primarySrc);};
    img.onerror = function() {
        // Primary image doesn't exist, so check the fallback image
        var fallbackImg = new Image();
        fallbackImg.onload = function() {
            // Fallback image exists, so create a button with this background
            createButtonWithBackground(fallbackSrc);};
        fallbackImg.onerror = function() {
            // Both images don't exist, handle the error (optional)
            console.error('Both primary and fallback images do not exist.');};
        fallbackImg.src = fallbackSrc;};
    img.src = primarySrc;}

function checkImageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;});}

function findExistingImage(imagePaths) {
    return imagePaths.reduce((promise, imagePath) => {
        return promise.then((result) => {
            if (result) {return result;}
            return checkImageExists(imagePath).then((exists) => {
                return exists ? imagePath : false;});});},
        Promise.resolve(false));}

// const imagePaths = [`../images/img-${series_name}-${episode}.png`,
//                     `../images/img-${series_name}-${episode}.jpg`];
// let series_name; let episode;
// let existingImagePath;
//     findExistingImage(imagePath(series_name, episode))
//     .then((result) => {
//         existingImagePath = result;
//         if (existingImagePath) {
//             document.getElementById('result').textContent = `Found existing image: ${existingImagePath}`;
//             console.log(`Found existing image: ${existingImagePath}`);
//         } else {
//             document.getElementById('result').textContent = 'No images found';
//             console.log(`Found existing image: ${existingImagePath}`)
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         document.getElementById('result').textContent = 'An error occurred';
//     });


// // Usage example
// loadDynamicScript('path/to/your/script.js')
//     .then(success => {
//         if (success) {
//             console.log('Script loaded successfully');}})
//     .catch(error => {
//         if (!error) {
//             console.log('Failed to load the script');}});
/*if (typeof window.translated_subs !== 'undefined'){}*/


/**************************************************************************************/

/*****************************************/
/* * * * * METHODS FOR FILTERING * * * * */
/*****************************************/

let existingSubsFiles = []; // LIST OF FOUND TIMECODES FOR SUBTITLES
// VIDEOS ARE PUT IN THESE CATEGORIES ACCORDING TO THEIR FILE NAME
let has_ar_subs = []
let has_en_subs = []
let has_es_subs = []
let has_translation_subs = []
let has_transliteration = []
// THIS CATEGORY IS FORMED ACCORDING TO THE INFORMATION IN 'SERIES INFORMAITON.js'
let is_standard=[];
// THIS CATEGORY IS SET BY SEARCHING FOR DIACRITIC MARKS IN A PORTION OF THE TEXT
let has_diacritics=[];
// FILL THE CATEGORIES FOR THE FILTERING

function mergeUnique(arr1, arr2) {
    // Create a set for elements of arr2
    const set2 = new Set(arr2);

    // Filter arr1 to remove elements present in arr2
    const uniqueToArr1 = arr1.filter(element => !set2.has(element));

    // Combine unique elements of arr1 with arr2
    return [...uniqueToArr1, ...arr2];
}

function findCommonElements(arrays) {
    if (arrays.length === 0) return [];
    // Start with the first array
    let commonElements = new Set(arrays[0]);
    // Iterate over the rest of the arrays
    for (let i = 1; i < arrays.length; i++) {
        commonElements = new Set(arrays[i].filter(item => commonElements.has(item)));}
    return Array.from(commonElements);}
const commonElements = findCommonElements([has_diacritics, has_transliteration]);
console.log(commonElements);

function difference(arr1, arr2) {
    return arr1.filter(element => !arr2.includes(element));}


/*
function disableButtons(filter_class, lang_class) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'allowed';});
    const target_buttons = document.querySelectorAll(`button.${filter_class}.${lang_class}`);
    target_buttons.forEach(target_button => {
        target_button.disabled = false;
        target_button.style.opacity = '0.7';
        target_button.style.cursor = false;})}*/

let filteredSubs;// SUBS THAT WILL BE SHADED
let formValue = 1;
function updateFilter(selectedArLevel, selectedLang) {
    language = selectedLang;
    arLevel = selectedArLevel;
    const labels = ["Arabic subtitles","Standard Arabic", "Diacritics", "Transliteration"];
    const sliderValueLabel = document.getElementById('slider-value');
    sliderValueLabel.textContent = labels[selectedArLevel - 1];
    switch(selectedArLevel){
        case '1': // HAS ARABIC SUBS
            filteredSubs = difference(presentSubsList, has_ar_subs);
            break;
        case '2': // IS IN STANDARD ARABIC
            filteredSubs = difference(presentSubsList, is_standard);
            break;
        case '3': // HAS DIACRITIC MARKS
            filteredSubs = difference(presentSubsList, has_diacritics);
            break;
        case '4': // HAS TRANSLITERATION
            filteredSubs = difference(presentSubsList, has_transliteration);
            break;
        default:
            filteredSubs = [];}
    console.log('filteres subs: ',selectedArLevel,' *************** ',filteredSubs);
    switch(language){
        case 'en':
            filteredSubs = mergeUnique(filteredSubs, difference(presentSubsList, has_en_subs));
            break;
        case 'es':
            filteredSubs = mergeUnique(filteredSubs, difference(presentSubsList, has_es_subs));
            break;}
    console.log('filteres subs: ',selectedArLevel,' *************** ',filteredSubs);
    presentSubsList.forEach(button =>{
        button.style.opacity = '1';
        button.disabled = false;
    })
    filteredSubs.forEach(button =>{
        button.style.opacity = 0.6;
        button.disabled = true;
    })}

// Initialize the label on page load
// document.addEventListener('DOMContentLoaded', () => {
// const slider = document.getElementById('slider');
// updateLabel(slider.value);});



// SEND INFORMATION TO THE FOLLOWING PAGE
function navigateWithQuery(series, episode) {
    // Navigate to the next page with query parameter
    window.location.href = `1 Saladin Webapp/app1/1 Dictation.html?series=${encodeURIComponent(series)}&episode=${encodeURIComponent(episode)}&language=${language}`;};


/***********************************************/
/* * * * * CONTROLS FOR THE CONNECTION * * * * */
/***********************************************/
/*Global variables to which we load the information in
the chosen video's subtitles js file*/
var timeButtonMap = {};
let chosen_lines = [];
let score = 0; let shiftable = 1;
let chosen_ars = [];
let chosen_trans = [];
let chosen_transltr = [];

/*******************************************************************************/
/* * * * * THE EXERCISE STEPS DEPENDING ON WHICH SCRIPTS ARE AVAILABLE * * * * */
/*******************************************************************************/
/*
WHILE AT LEAST THERE IS ONE SUBTITLES SCRIPT THE STEPS PROCESS WILL BE THE FOLLOWING,
FOLLOWING THIS ORDER OF PRECEDENCE: TALKING, THEN TRANSLITERATION SUBS,
THEN ARABIC SUBS, THEN TRANSLATION
FIRST SHOW EMPTY BUTTONS TO THE RIGHT AND THE THE NEXT AVAILABLE SCRIPT IN THE
PRECENDENCE ORDER. WHEN ALL CORRECTLY MATCHED, THE BUTTONS OF THE LEFT WILL BE
SUBSTITUTED WITH THE BUTTONS TO THE RIGHT, AND TO THE RIGHT WILL APPEAR THE NEXT
AVAILABLE SCRIPT IN THE PRECEDENCE LIST, AND SO ON UNTIL THE AVAILABLE SCRIPTS ARE
ALL USED
IN CASE ALL ARE AVAILABLE:
1. MATCH VIDEO CLIP BUTTONS AND TRANSLITERAITON BUTTONS TO THE RIGHT
2. WHILE MATCHING THE MATCHED ONES GET SHADED AND BECOMES NOT CLICKABLE
3. WHEN ALL MATHCED THE TRANSLITERATION BUTTONS APPEAR TO THE RIGHT AND
   THE ARABIC TO THE LEFT
4. AFTER MATCHED, ARABIC TO THE RIGHT AND TRANSLATION TO THE LEFT


ONCE THE USER DOESN'T NEED THE TRANSCRIPT ANYMORE GO TO SERIES_INFORMATION AND
SET A VARIABLE CALLED SKIP_TRANSLITERATION TO TRUE
 */

// CHOOSE A RANDOM SENTENCE AND SHUFFLE IT'S WORDS
function chooseSubs(){
    chosen_lines = [];
    for (i = 0; i < 5; i++){
        let chosen_line = choose_line(time_codes.length);
        chosen_lines.push(chosen_line);
        if(!skip_ar){chosen_ars.push(arabic_subs[chosen_line]);}
        if(!skip_tran){chosen_trans.push(translated_subs[chosen_line]);}}}

// PAIRs OF BUTTONS' CREATION FOR THE SENTENCES CONNECTION EXERCISE
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];}return array;}
let clicked_ar_btn_tag = ''; let clicked_tran_btn_tag = '';

function checkTags(){
    if (clicked_ar_btn_tag != '' && clicked_ar_btn_tag == clicked_tran_btn_tag){return true;}
    else {return false;}}

function createButtonPairs(){
    chooseSubs();
    document.getElementById("ars_div").innerHTML = '';
    document.getElementById("trans_div").innerHTML = '';
    shuffled_list = shuffle(chosen_lines);
    for (let i=0; i < chosen_lines.length; i++){
        const ii = shuffled_list[i];
        const button = document.createElement('button');
        button.style.direction = 'rtl';
        button.textContent = flattenSub(arabic_subs[ii]);
        button.classList.add(`button_connect${ii}`);
        button.classList.add('exr_button');
        button.classList.add('dynamicButton');
        button.style.color = 'white';
        document.getElementById("ars_div").appendChild(button);
        button.addEventListener('click', ()=>{
            const div = document.getElementById('ars_div');
            const buttons = div.querySelectorAll('button');
            button_color = button.style.color;
            buttons.forEach(button => {button.style.color = 'white';});
            if (button_color == 'white'){
                button.style.color = 'black';
                clicked_ar_btn_tag = button.classList[0];}
            else {button.style.color = 'white'; clicked_ar_btn_tag = '';}
            console.log(checkTags());});
        button.addEventListener('dblclick', ()=>{console.log('seek to: ',arabic_subs[ii][0]);play_pause(time_codes[ii][0]-1000, time_codes[ii][1]);});}
    shuffled_list = shuffle(chosen_lines);
    for (let i = 0; i < chosen_lines.length; i++){
        const ii = shuffled_list[i];
        const button = document.createElement('button');
        button.textContent = flattenSub(translated_subs[ii]);
        button.classList.add(`button_connect${ii}`);
        button.classList.add('exr_button');
        button.classList.add('dynamicButton');
        button.style.color = 'white';
        document.getElementById('trans_div').appendChild(button);
        button.addEventListener('click', ()=>{
            const div = document.getElementById('trans_div');
            const buttons = div.querySelectorAll('button');
            button_color = button.style.color;
            buttons.forEach(button => {button.style.color = 'white';});
            if (button_color){
                button.style.color = 'black';
                clicked_tran_btn_tag = button.classList[0];}
            else {button.style.color = 'white'; clicked_tran_btn_tag = '';}
            console.log(checkTags());});}}

function onClickConnectDiv(){
    if (checkTags() == true){
        var buttons = document.querySelectorAll('.'+clicked_ar_btn_tag);
        buttons.forEach(function(button){
            button.classList.add('fade-out');
            button.addEventListener('transitionend', function(){
                button.disabled = true;
                button.style.display = 'none';
                if(checkAllButtonsHidden()){createButtonPairs();if (shiftable==1){score++;}
                if (score >= 3){if(
                    videoElement){stay_from_device=true}else{stay_from_device=false}
                    window.location.href =
                    `1 Dictation.html?series=${encodeURIComponent(series)}&episode=${encodeURIComponent(episode)}&language=${language}&stay_from_device=${encodeURIComponent(stay_from_device)}`;}
                console.log('score: ',score)}})})}}

// CHECK IF ALL BUTTONS HAVE DISSAPEARED
function checkAllButtonsHidden() {
    var buttons = document.getElementById('ars_div').querySelectorAll('button.dynamicButton');
    return Array.from(buttons).every(button => window.getComputedStyle(button).display === 'none');}
function onClickStayInExr(){
    shiftable = shiftable * (-1);
    if (shiftable == -1){document.getElementById("stay_in_exr").style.color = "red";}
    else {document.getElementById("stay_in_exr").style.color = "white";}}





/* * * * * * * * * * * * IMPLEMENTATION OF THE METHODS * * * * * * * * * * * */

/******************************************************/
/* * * * * LOAD SUBTITLES OF THE CHOSEN VIDEO * * * * */
/******************************************************/

// FIRST LOAD THE TIMES CODE SCRIPT
loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, '', '-times'), 'times_script')
.then(success => {if (success) {
    for (var i = 0; i < time_codes.length; i++) {
        timeButtonMap[Math.floor(time_codes[i][0]/1000)*1000] = i;}}})
// THEN LOAD THE THE ARABIC AND THEN THE TRANSLATION SCRIPTS
loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar', ''), 'ar_script')
.then(success => {if (success) {
    loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode,'',`-${language}`), 'subs_script')
    .then(success => {if (success) {
        transcriptBtn();createButtonPairs();
    }})
}})


// Function to dynamically load a script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);});}

// Function to handle the loaded scripts
function handleLoadedScripts(loadedScripts){
    console.log('Scripts loaded:', loadedScripts);
    // SEARCH FOR AVAILABLE TRANSLATION
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${language}`,'')))
        {console.log(`${language} translation script was loaded`);}
    else{skip_tran=true;}
    // SEARCH FOR AVAILABLE TRANSLITERATION
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode, `-transliteration`,'')))
        {if(transliteration.length == arabic_subs.length){
            console.log('the transliteration script was loaded');}
        else{skip_transltr = true;
            console.log('the transliteration is not the same length as the arabic subs');}}
    else{skip_transltr=true;console.log('no transliteration available');}
    // SEARCHING FOR AN ARABIC SCRIPT
    if (loadedScripts.includes(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar','')))
        {}
    else{skip_ar=true; console.log('no arabic subtitles available')}}

// Array of script sources to load
let scriptsToLoad = []; // AUTOMATICALLY GENERATED SUBS FILES PATHS FOR SEARCHING
let presentSubsList = []; // LIST OD SUBS FILES THAT ARE ACTUALLY PRESENT
// POPULATE THE scriptsToLoad
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-times',''));
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar',''));
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${language}`,''));
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-transliteration',''));


// Load all scripts and handle the results
Promise.allSettled(scriptsToLoad.map(loadScript))
    .then(results => {
        const loadedScripts = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        handleLoadedScripts(loadedScripts);})
    .catch(error => {
        console.error('Error loading scripts:', error);});

/*****************************************************/
/* * * * * BUTTONS' ACTIONS AND PAGE SHIFTING* * * * */
/*****************************************************/

document.getElementById("return_to_main").addEventListener('click',()=>{window.location.href = '../../index.html';});
document.getElementById("play_btn").addEventListener("click",()=>{onClickPlay()});
document.getElementById("forward_btn").addEventListener("click", ()=>{seek_forward()});
document.getElementById("backward_btn").addEventListener("click", ()=>{seek_backward()});
document.getElementById("show_transcript").addEventListener("click",()=>{onClickShowTranscript()});
document.getElementById("only_audio").addEventListener("click", ()=>{onClickOnlyAudio()});
document.getElementById('ars_div').addEventListener('click', function(event){onClickConnectDiv()});
document.getElementById('trans_div').addEventListener('click', function(event){onClickConnectDiv()});
document.getElementById("load_local_btn").addEventListener("click", ()=>{onClickLoadLocal()});
if(stay_from_device=='true'){loadLocal=1;onClickLoadLocal()}

// MOVE TO DICTATION EXERCISE  OR STAY IN CURRENT EXERCISE BUTTON
document.getElementById("stay_in_exr").addEventListener("click",
()=>{onClickStayInExr()})



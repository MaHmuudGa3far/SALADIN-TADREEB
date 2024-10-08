

/*********************************************/
/* * * * * METHODS FOR THE DICTATION * * * * */
/*********************************************/

/*
IF THE EPISODE HAS AT LEAST AR SUBS THE EXCERISE WILL RUN

    show shuffled transliterarion buttons exercise
    then, when solved, let the solved transliteration at the top
    then, show shuffled arabic buttons exercise
    and show at the bottom some trnslation lines to choose from

    in their aussence, the transliteration and translation parts
    are skipped
 */



/*Global variables to which we load the information from
the video's subtitles js files*/
let chosen_line;
let i_time;let f_time;
let chosen_ar; let shuffled_ar;
let chosen_transltr; let shuffled_transltr;
let chosen_tran;
// CHOOSE A RANDOM SENTENCE AND SHUFFLE IT'S WORDS
function chooseOneSub(){
    // THE BASIC PART OF THE EXERCISE
    chosen_line = choose_line(time_codes.length);
    //chosen_line = 3;
    chosen_ar = arabic_subs[chosen_line];
    shuffled_ar = shuffle_words(chosen_ar);
    i_time = time_codes[chosen_line][0]-200;
    f_time = time_codes[chosen_line][1]+200;
    // ADD TRANSLATION IF AVAILABLE
    if(!skip_tran){chosen_tran = translated_subs[chosen_line];}
    // ADD TRANSLITERATION IF AVAILABLE
    if(!skip_transltr){
        chosen_transltr = transliteration[chosen_line];
        shuffled_transltr = shuffle_words(chosen_transltr);}
}

const translation_label = document.getElementById("show_tran_subs").innerHTML;
const responses_label = document.getElementById("responses_div").innerHTML;
const choices_label = document.getElementById("choices_div").innerHTML;
// FUNCTION TO REPLAY A CLIP
let first_clip_play = true;
function onClickReplay(){
    if(videoElement){
        videoElement.currentTime = i_time/1000;
        if(first_clip_play){
            choices_responses();
            showTranslation();
            first_clip_play=false};}
    else{
    if(player){play_pause(i_time, f_time)};
    if (first_clip_play){
        showTranslation();
        choices_responses();
        first_clip_play = false;}}}
// FUNCTION TO SHOW A NEW CLIP
function onClickNewClip(){
    document.getElementById("responses_div").innerHTML=responses_label;
    document.getElementById("choices_div").innerHTML=choices_label;
    document.getElementById("check_div").innerHTML='';
    chooseOneSub();
    setTimeout(()=>{
        if(videoElement){
            play_pause(i_time, f_time);
            showTranslation();
            choices_responses();
            first_clip_play = false;}
            else{
                showTranslation();
                choices_responses();
                first_clip_play = false;}
        if(player){play_pause(i_time, f_time);}},500)}


// IN CASE THE SENTENCE IS ONLY ONE OR TWO WORDS LONG
// LET THE PRACTICER WRITE WHAT HE HEARS
function normalizeArabic(text) {
    text = text.normalize('NFKD');
    text = text.replace(/[\u064B-\u065F\u0610-\u061A\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '');
    text = text.replace(/[-.,!؟?«»]/g, '');
    return text;}
function writtingExercise(){
    const inputElement = document.createElement('input');
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'إرسال';
    submitBtn.classList.add("exr_button");
    inputElement.type = 'text';
    inputElement.placeholder = 'اكتُب ما تَسمَعُه';

    document.getElementById('responses_div').appendChild(inputElement);
    document.getElementById('responses_div').appendChild(submitBtn);
    let acceptable = false;

    submitBtn.addEventListener('click', function(){
        enteredValue = separate_words2([inputElement.value]); console.log(enteredValue);
        correctValue = separate_words2(chosen_ar); console.log(correctValue);
        const messageDiv = document.getElementById('check_div');

        normalizedEnteredValue = [];
        normalizedCorrectValue = [];
        enteredValue.forEach(word=>{normalizedEnteredValue.push(normalizeArabic(word))});
        correctValue.forEach(word=>{normalizedCorrectValue.push(normalizeArabic(word))});
        console.log(normalizedEnteredValue);console.log(normalizedCorrectValue);
        if (arraysEqual(normalizedEnteredValue, normalizedCorrectValue)){acceptable = true;}

        if (acceptable==true){
            messageDiv.innerHTML = '<h2>'+chosen_ar+'</h2>';}
        else {messageDiv.innerHTML = '<h2>إجابَة غَير صَحيحَة</h2>'}})}

// A BUTTON'S CREATION FOR DICTATION EXERCISE
function createButton(id, text){
    var button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.style.direction = 'rtl';
    button.classList.add("exr_button");
    document.getElementById('choices_div').appendChild(button);
    button.addEventListener('click', function(){
        if(button.parentElement==document.getElementById("choices_div")){
            document.getElementById('responses_div').appendChild(button)
            check_correct_answer()}
        else {document.getElementById("choices_div").appendChild(button);}});}
// BUTTONS' LOT CREATION FOR A DICTATION EXERCISE
function choices_responses(){
    console.log('choices_responses() started');
    if (separate_words2(chosen_ar).length > 2){
        lables = document.getElementsByClassName('exr_label');
        for (i=0;i<lables.length;i++){lables[i].style.display = ''}
        for (i=0;i<shuffled_ar.length;i++){
            createButton(`b${i}`,shuffled_ar[i])}
    }
    else {
        lables = document.getElementsByClassName('exr_label');
        for (i=0;i<lables.length;i++){lables[i].style.display = 'none'}
        writtingExercise()}
    exr_divs = document.getElementsByClassName('exr_container');
    for(i=0; i<exr_divs.legth;exr++){exr_divs[i].style.direction='rtl'}
}
// SHOW THE TRANSLATION
function showTranslation(){
    if(!skip_tran){
        tran_div = document.getElementById("show_tran_subs");
        tran_div.innerHTML = translation_label;
        for (i=0; i<chosen_tran.length; i++){
            tran_div.innerHTML = tran_div.innerHTML+chosen_tran[i]+"<br>";}}
    else{console.log('no translation subtitles')}}
// CHECK CORRECT ANSWER
function check_correct_answer(){
    var container = document.getElementById('responses_div');
    var buttons = container.getElementsByTagName('button');
    var buttonText = [];
    for (var i = 0; i < buttons.length; i++) {
        buttonText.push(buttons[i].innerHTML);}
    console.log('buttons: ',buttonText);
    console.log('original: ',separate_words2(chosen_ar));
    console.log(arraysEqual(buttonText,separate_words2(chosen_ar)));
    if (arraysEqual(buttonText,separate_words2(chosen_ar))){
        document.getElementById('check_div').innerHTML='<h1>صحيح</h1>';}
    else {document.getElementById('check_div').innerHTML='';}}






/* * * * * * * * * * * * IMPLEMENTATION OF THE METHODS * * * * * * * * * * * */

/******************************************************/
/* * * * * LOAD SUBTITLES OF THE CHOSEN VIDEO * * * * */
/******************************************************/
/*
// Call the function to load the dynamic script
loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, '', '-times'), 'times_script')
.then(success => {if (success) {
    for (var i = 0; i < time_codes.length; i++) {
        timeButtonMap[Math.floor(time_codes[i][0]/1000)*1000] = i;}
    }})
loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar', ''), 'ar_script')
.then(success => {if (success) {
    loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode,'',`-${language}`), 'subs_script')
    .then(success => {if (success) {
        transcriptBtn();chooseOneSub();
    }})
}})
loadDynamicScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, '', '-transliteration'), 'transliteration_script')
.then(success => {if(success){
    console.log('****** ******* ********* ****** ******* has transliteration');
    document.getElementById("transliteration_btn").classList.add('dynamicButton');
    document.getElementById("transliteration_btn").style.opacity = 1;
    document.getElementById("transliteration_btn").style.color = 'red';
}}).catch(error => {if(!error){
    console.log("no transliteration js file for this episode");
    document.getElementById("transliteration_btn").style.display = 'none';
}})*/

// Function to handle the loaded scripts
function handleLoadedScripts(loadedScripts) {
    console.log('Scripts loaded:', loadedScripts);
    // SEARCH FOR AVAILABLE TRANSLATION
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${language}`,'')))
        {console.log(`${language} translation script was loaded`);}
    else{skip_tran=true;}
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode, '-en', ''))){
            langOption = document.createElement('option');
            langOption.value = 'en';
            if(language=='en'){langOption.selected = true;}
            langOption.textContent = 'English';
            document.getElementById('myDropdown').appendChild(langOption);}
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode,'-es',''))){
            langOption = document.createElement('option');
            langOption.value = 'es';
            if(language=='es'){langOption.selected = true;}
            langOption.textContent = 'Castellano';
            document.getElementById('myDropdown').appendChild(langOption);}
    // SEARCH FOR AVAILABLE TRANSLITERATION
    if (loadedScripts.includes(
        subtitlesPath(SERIES_INFORMATION[series].name, episode, `-transliteration`,'')))
        {if(transliteration.length == arabic_subs.length){
            console.log('the transliteration script was loaded');
            document.getElementById("transliteration_btn").classList.add('dynamicButton');
            document.getElementById("transliteration_btn").style.opacity = 1;
            document.getElementById("transliteration_btn").style.color = 'red';}
        else{skip_transltr = true;
            document.getElementById("transliteration_btn").style.display = 'none';
            console.log('the transliteration is not the same length as the arabic subs');}}
    else{skip_transltr=true;console.log('no transliteration available');
        document.getElementById("transliteration_btn").style.display = 'none';}
    // THE BASIC SCRIPTS WITHOUT WHICH THIS EXERCISE IS SKIPPED
    if (loadedScripts.includes(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar',''))) {console.log('arabic and times scripts loaded');
        for (var i = 0; i < time_codes.length; i++) {
            timeButtonMap[Math.floor(time_codes[i][0]/1000)*1000] = i;}
        transcriptBtn();chooseOneSub();}
    else {skip_dictation = true}}

// Array of script sources to load
let scriptsToLoad = []; // AUTOMATICALLY GENERATED SUBS FILES PATHS FOR SEARCHING
let presentSubsList = []; // LIST OD SUBS FILES THAT ARE ACTUALLY PRESENT
// POPULATE THE scriptsToLoad
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-times',''));
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-ar',''));
if(language != 'en'){scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-en',''));}
if(language != 'es'){scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-es',''));}
//scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${language}`,''));
scriptsToLoad.push(subtitlesPath(SERIES_INFORMATION[series].name, episode, '-transliteration',''));


// Load all scripts and handle the results
/*
Promise.allSettled(scriptsToLoad.map(loadScript))
    .then(results => {
        const loadedScripts = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        handleLoadedScripts(loadedScripts);})
    .catch(error => {
        console.error('Error loading scripts:', error);});*/

// Specify the script that should be loaded last
var lastScriptToLoad = subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${language}`,'');

// Function to dynamically load a script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);});}

// Load all scripts except the last one
Promise.allSettled(scriptsToLoad.map(loadScript))
    .then(results => {
        // Filter out and handle successfully loaded scripts
        const loadedScripts = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        // Now load the last script
        return loadScript(lastScriptToLoad).then(lastScript => {
            loadedScripts.push(lastScript); // Add the last script to the list of loaded scripts
            return loadedScripts;});})
    .then(allLoadedScripts => {
        // Handle all loaded scripts including the last one
        handleLoadedScripts(allLoadedScripts); // Custom function to handle all loaded scripts
    })
    .catch(error => {
        console.error('Error loading scripts:', error);
    });

function changeSubs(subsLang){
    loadScript(subtitlesPath(SERIES_INFORMATION[series].name, episode, `-${subsLang}`,''))
    .then(()=>{
        document.getElementById('transcript_div').innerHTML = '';
        for (var i = 0; i < time_codes.length; i++) {
            timeButtonMap[Math.floor(time_codes[i][0]/1000)*1000] = i;}
        language=subsLang;console.log(language,' is the language now')
        transcriptBtn();chosen_tran = translated_subs[chosen_line];showTranslation();
    })}

/************************************/
/* * * * * BUTTONS' ACTIONS * * * * */
/************************************/

document.getElementById("return_to_main").addEventListener('click',()=>{window.location.href = '../../index.html';});
document.getElementById("play_btn").addEventListener("click",()=>{onClickPlay()});
document.getElementById("forward_btn").addEventListener("click", ()=>{seek_forward()});
document.getElementById("backward_btn").addEventListener("click", ()=>{seek_backward()});
document.getElementById("replay_clip_btn").addEventListener("click", ()=>{onClickReplay()});
document.getElementById("new_clip_btn").addEventListener("click", ()=>{onClickNewClip()});
document.getElementById("show_transcript").addEventListener("click",()=>{onClickShowTranscript()});
document.getElementById("only_audio").addEventListener("click", ()=>{onClickOnlyAudio()});
document.getElementById("load_local_btn").addEventListener("click", ()=>{onClickLoadLocal()});
if(stay_from_device=='true'){loadLocal=1;onClickLoadLocal()}


/**********************************************************/
/* * * * * SEND INFORMATION TO THE FOLLOWING PAGE * * * * */
/**********************************************************/

(()=>{// MOVE TO CONNECTION EXERCISE  OR STAY IN CURRENT EXERCISE BUTTON
    let score = 0;
    let shiftable = 1;
    document.getElementById("stay_in_exr").addEventListener("click",
    ()=>{shiftable = shiftable * (-1);
        if (shiftable == -1){document.getElementById("stay_in_exr").style.color = "red";}
        else {document.getElementById("stay_in_exr").style.color = "white";}})
    document.getElementById("new_clip_btn").addEventListener("click",
    ()=>{if(shiftable == 1){score++;};
        if (score >= 5){console.log('surpased 5, ');if(videoElement){stay_from_device=true}else{stay_from_device=false}
            window.location.href = `2 Connection.html?series=${encodeURIComponent(series)}&episode=${encodeURIComponent(episode)}&language=${language}&stay_from_device=${encodeURIComponent(stay_from_device)}`;}
    console.log('score: ',score)});})();



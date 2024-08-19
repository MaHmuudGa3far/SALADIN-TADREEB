
/******************************************************/
/* * * * * Get INFORMATION FROM PREVIOUS PAGE * * * * */
/******************************************************/

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);}
// Retrieve the value from query parameters
let language = getQueryParam('language') || 'en';
const series = getQueryParam('series') || 1;
const episode = getQueryParam('episode') || 1;
let stay_from_device = getQueryParam('stay_from_device');//KEEP PLAYING VIDEO FROM DEVICE
let skip_ar;
let skip_tran;
let skip_transltr=true;
let skip_dictation;
let skip_connection;
console.log(`Retrieved episode: ${series} ${episode},  from query parameters`);

let arabic_subs; let transliteration; let translation;
/****************************************************/
/* * * * * METHODS FOR LOADING LOCAL VIDEOS * * * * */
/****************************************************/

function videoPath(series_name, episode, format){
    return `../../2 ${series_name} videos/${series_name}-${episode}.${format}`;}

let videoElement;
function createVideoElement(videoSources, width = "100%"/*640*/, height = 360) {
    // Check if the video element already exists and do nothing if it does
    if (videoElement) {return;}
    // Create the <video> element
    const video = document.createElement('video');
    // video.style.width = width;
    //video.height = height;
    video.controls = true;
    video.autoplay = true;
    // video.muted = true;
    // Create and append <source> elements for each video format
    videoSources.forEach(src => {
        const source = document.createElement('source');
        source.src = src.url;
        source.type = src.type;
        video.appendChild(source);});
    // Append the <video> to the container
    document.getElementById('vframe').appendChild(video);
    // Assign the video element to a global variable
    videoElement = video;
    setTimeout(()=>{if(videoElement.readyState==0){
        document.getElementById('vframe').innerText = `download the episode with the name
        ${SERIES_INFORMATION[series].name}-${episode}.mp4 or
        ${SERIES_INFORMATION[series].name}-${episode}.webm
        in the '2 ${SERIES_INFORMATION[series].name} videos' folder`;
        document.getElementById('vframe').style.color = 'white';
        console.log('video not found in folder')}},900)
    checkInterval = setInterval(checkVideoTime, 700);}
function deleteVideoElement() {
    // Check if the video element exists
    if (videoElement) {
        document.getElementById('vframe').innerText='';
        // Remove the video element from the DOM
        videoElement.remove();
        // Set the global variable to null
        videoElement = null;}}


let loadLocal = 1;
function onClickLoadLocal(){
    if(loadLocal == 1){ // SWITCH TO LOCAL VIDEO
        document.getElementById('load_local_btn').style.color = 'red';
        document.getElementById('ytplayer').style.display = 'none';
        if(player){player.pauseVideo()}
        document.getElementById('vframe').style.display = '';
        createVideoElement([
            {url: videoPath(SERIES_INFORMATION[series].name, episode, 'mp4'), type: 'video/mp4'},
            {url: videoPath(SERIES_INFORMATION[series].name, episode, 'webm'), type: 'video/webm'}])
        /*
        (()=> {
            var videoPlayer = videoElement;
            var fallbackMessage = document.getElementById("fallbackMessage");

            function checkVideoAvailability() {
                // Check if the video can play any of the provided sources
                var canPlayMp4 = videoPlayer.canPlayType('video/mp4') !== '';
                var canPlayWebm = videoPlayer.canPlayType('video/webm') !== '';

                // Check if the video sources are actually available
                var mp4Source = videoPlayer.querySelector('source[type="video/mp4"]');
                var webmSource = videoPlayer.querySelector('source[type="video/webm"]');

                if (canPlayMp4 && mp4Source && mp4Source.src) {
                    // Test if the mp4 video file is reachable
                    testVideoSource(mp4Source.src, function(isAvailable) {
                        if (!isAvailable && (!canPlayWebm || !webmSource.src)) {
                            showFallbackMessage();}});}
                else if (canPlayWebm && webmSource && webmSource.src) {
                    // Test if the webm video file is reachable
                    testVideoSource(webmSource.src, function(isAvailable) {
                        if (!isAvailable) {showFallbackMessage();}});}
                else {showFallbackMessage();}}
            function testVideoSource(src, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('HEAD', src, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        callback(xhr.status >= 200 && xhr.status < 400);}};
                xhr.send();}
            function showFallbackMessage() {
                fallbackMessage.style.display = 'block';
                videoPlayer.style.display = 'none';}
            checkVideoAvailability();})();*/
        loadLocal = -1;}
    else{ // SWITCH TO YT VIDEO
        document.getElementById('load_local_btn').style.color = 'white';
        document.getElementById('ytplayer').style.display = '';
        deleteVideoElement();
        loadLocal = 1;}}

// CHECK IF THE VIDEO IS AVAILABLE AND DISPLAY A FALLBACK MESSAGE OTHERWISE
// document.addEventListener("DOMContentLoaded", );


/**********************************/
/* * * * * LOAD YT IFRAME * * * * */
/**********************************/

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
    var videoId = SERIES_INFORMATION[series].youtube_ip[episode]
    console.log('videoId: ',videoId)
    console.log('episode: ',episode)
    player = new YT.Player('ytplayer', {
        height: '360',
        width: '100%',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange}});}
function onPlayerReady(event) {}
var checkTimeInterval;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        checkTimeInterval = setInterval(checkVideoTime, 700);}
    else {clearInterval(checkTimeInterval);}}

/*
var intervalId;
let inInterval;
function startCheckingTime() {
    inInterval = true;
    intervalId = setInterval(()=>{checkCurrentTime()}, 500);}
function checkCurrentTime() {
    var currentTime = player.getCurrentTime();
    if (currentTime >= f_time/1000 && inInterval) {
        player.pauseVideo();
        clearInterval(intervalId);  // Stop checking after reaching the target time
        inInterval = false;}}
function play_pause(){
    player.playVideo();
    player.seekTo(i_time/1000, true);
    startCheckingTime();};*/


/*********************************************/
/* * * * * METHODS TO LOAD SUBTITLES * * * * */
/*********************************************/

function loadDynamicScript(scriptName, division) {
    return new Promise((resolve, reject) => {
        // Get the <script> tag element by its ID
        let scriptElement = document.getElementById('division');
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

function subtitlesPath(series_name, episode, arabic, translation){
    return `../subs_js/subs-${series_name}-${episode}${arabic}${translation}.js`;}
/*
function loadScript(scriptPath, variableName) {
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptPath;
        scriptElement.onload = () => {
            // Check if the specified global variable is defined
            if (typeof window[variableName] !== 'undefined') {
                console.log(`Script loaded from ${scriptPath}:`, window[variableName][0]);
                resolve(window[variableName]);
            } else {
                resolve(null); // Resolve even if the variable is not defined
            }
        };
        scriptElement.onerror = () => {
            console.error(`Failed to load script: ${scriptPath}`);
            resolve(null); // Resolve even on error to continue the chain
        };
        document.head.appendChild(scriptElement);
    });
}

function loadScriptsSequentially(scripts) {
    let promise = Promise.resolve();

    scripts.forEach(scriptInfo => {
        promise = promise.then(() => loadScript(scriptInfo.path, scriptInfo.variable).then(variableContent => {
            if (variableContent !== null) {
                // Perform operations with the `variableContent` here if it exists
                console.log(`Processing content of variable ${scriptInfo.variable}:`, variableContent[0]);
                // Example operation
                // processScriptContent(variableContent); // Replace this with your actual processing function
                }
            else {
                console.log(`Script ${scriptInfo.path} did not provide content or failed to load.`);}}));});
    return promise;}*/

/**********************************************/
/* * * * * METHODS FOR VIDEO CONTROLS * * * * */
/**********************************************/
function play_pause(i_t, f_t){
    var start_t = i_t/1000;
    var end_t = f_t/1000;
    if (videoElement){
        videoElement.currentTime = start_t;
        videoElement.play();}
    else{if(player){
        player.playVideo();
        player.seekTo(start_t, true);}}}

function onClickPlay(){
    if(videoElement){
        if(videoElement.paused==true){
            videoElement.play();
            document.getElementById("play_btn").textContent='أيقاف';}
        else{if(videoElement.paused==false){
            videoElement.pause();
            document.getElementById("play_btn").textContent='تشغيل';}}}
    else{if (player){
        if(player.getPlayerState()==YT.PlayerState.PLAYING){
            player.pauseVideo();
            document.getElementById("play_btn").textContent='تشغيل';}
        else {player.playVideo();
            document.getElementById("play_btn").textContent='أيقاف';}}}}
function seek_backward(){
    if(videoElement){videoElement.currentTime = videoElement.currentTime-2;}
    else{if(player){player.seekTo(player.getCurrentTime()-2, true);}}};
function seek_forward(){
    if(videoElement){videoElement.currentTime = videoElement.currentTime+2;}
    else{if(player){player.seekTo(player.getCurrentTime()+2, true);}}};

let show_only_audio = -1;
function onClickOnlyAudio(){
    if(videoElement){
        if(show_only_audio == -1){
            show_only_audio = 1;
            videoElement.height = 0;}
        else {
            show_only_audio = -1;
            videoElement.height = 360;}}
    else{if(player){
        the_video = document.getElementById("ytplayer");
        if (show_only_audio == -1){
            show_only_audio = 1;
            the_video.height = 0;}
        else {show_only_audio = -1;
            the_video.height = 360;}}}
}

/**********************************************/
/* * * * * METHODS FOR THE TRANSCRIPT * * * * */
/**********************************************/

// TRANSCRIT BUTTONS' CREATION
var timeButtonMap = {};
function transcriptBtn(){
    for (let i=0; i<arabic_subs.length; i++){
        let button = document.createElement('p');
        button.id = `transcriptBtn${i}`
        if(!skip_ar){
            button.innerHTML = '<span class="rtl-text">'+flattenSub(arabic_subs[i])+'</span>';}
        if(!skip_transltr){
            button.innerHTML = button.innerHTML+'</span>'+'<span class="ltr-text">'+flattenSub(transliteration[i])+'</span>';
        }
        if(!skip_tran){
            button.innerHTML = button.innerHTML+'</span>'+'<span class="ltr-text">'+flattenSub(translated_subs[i])+'</span>';}
        // button.innerHTML =
        //     '<span class="rtl-text">'+flattenSub(arabic_subs[i])+'</span>'+'<span class="ltr-text">'+flattenSub(translated_subs[i])+'</span>';
        button.addEventListener("dblclick", function(){
            const ii = i; console.log(ii, ': ',time_codes[ii]);
            if (videoElement){videoElement.currentTime = (time_codes[ii][0]-100)/1000}
            else{if(player){player.seekTo((time_codes[ii][0]-100)/1000, true);}}
            showButtonAtTop(ii);});
        button.style.display = "inline-block";
        button.className = "transcript_button"
        document.getElementById('transcript_div').appendChild(button);}}
function checkVideoTime() {
    if(videoElement){
        var currentTime = Math.floor(videoElement.currentTime/1)*1000;
        if (timeButtonMap[currentTime] !== undefined){
            showButtonAtTop(timeButtonMap[currentTime]);}}
    else{if(player){
        var currentTime = Math.floor(player.getCurrentTime()/1)*1000;
        if (timeButtonMap[currentTime] !== undefined){
        showButtonAtTop(timeButtonMap[currentTime]);}}}}

function showButtonAtTop(index) {
    var container = document.getElementById('transcript_div');
    var buttons = container.getElementsByClassName('transcript_button');
    if (buttons[index]) {
        var button = buttons[index];
        container.scrollTop = button.offsetTop - container.offsetTop;}}
document.getElementById("transcript_div").style.display = 'none';
function onClickShowTranscript(){
    // Togles between making the div visible and hidden
    transcript_div = document.getElementById("transcript_div");
    if (transcript_div.style.display == 'none'){
        transcript_div.style.display = 'block';}
    else {transcript_div.style.display = 'none';}}

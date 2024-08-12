
/*I* * * *                 باسم اللّه الرحمن الرحيم               * * * *I*/
/* * * * * **************************************************** * * * * */
/* * * * * INFORMATION ABOUT THE SERIES INCLUDED IN THE PROGRAM * * * * */

/* ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** *

To include more videos to the program:
    1. (neccesary) Add a section in the SERIES_INFORMATION list below,
    1. (necessary) Run the srt_to_js.py tool in the '0 python' folder to create
                   the subtitles files, they will be automatically created in the
                   'Saladin Webapp/js_subs' folder
    2. (optional) Include an image for the thumbnail in the 'Saladin Webapp/images' folder
    3. Include a youtube ip adress for the video in SERIES_INFORMATION,
       or include a video in the corresponding folder if you have it downloaded


FOLLOW THE NAMING CONVENTION:
    - subtitles file example:   subs-saladin-1-ar-en.js     subs-eldaHeeH-1-ar-en.js
    - image for thumbnail example:   img-saladin-1.png     img-eldaHeeH-1.jpg
    - video name example:   '2 saladin videos/saladin-1.mp4'     eldaHeeH-1.mp4

 * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** */

// LIST OF SUBTITLED SERIES THE PROGRAM WILL LOOK FOR
const SERIES_INFORMATION = [
    MohammadMansour = {
        name: 'AHMED MANSOUR', title: 'احمد منصور', dialect: 'standard',
        youtube_ip: {
            1: 'bF8k4cwpIHA', 2: 'AjYYHeA_HfY', 3: 'X2znGZarQm4'}
    },
    eldaHeeH = {
        name: 'eldaHeeH', title: 'الدحيح', dialect: 'egyptian',
        youtube_ip: { // To link a youtube video to a subtitles file.
            // Must have same episode number.
            1: 'YXcg79ZcQc4', 2: '-DVXdsZbcf8', 3: 'Fi5grDvWgew',
            4: 'Y2rFelckA48', 5: '_Eduwcfv2_I', 6: 'nIUTsuHD4-4',
            7: 'Li9bNk1enQw', 8: 'L-AkMLZCiNs',}
    },
    saladin = { // To link a youtube video to a subtitles file.
        // Must have same episode number.
        name: 'saladin', title: 'مسلسل صلاح الدين', dialect: 'standard',
        youtube_ip: {
            1: 'zbXRh_iySiQ', 2: '085PLOXUNow', 3: 'wj0zR_J11Sc', 4: 'xFSbOL5syXE',
            5: 'Ao7P7iP-As0', 6: 'giNFlDcV7eA', 7: 'nLNLvLOiuwQ', 11: 'OSa2DAHccUM',
            12: '_myVAAWK2gg', 13: 'XIFuHUrhzRY', 14: 'ooGLNF4m7Mg', 15: '',
            18: '', 19: 'w4CUTZxUR2E',20: '3Y0PKtMjjjM', 21: '8NmZ-ezbPyA',
            22: 'MxZ7bOwX2A8', 23: '1j6cY9k6ibI', 24: 'hY6gjgq-mt8', 25: '',}
    }
    // ADD MORE SERIES HERE
    // AND FOLLOW THE NAMING CONVENTION SO THAT THE PROGRAM FINDS THE FILES
] /* HERE ENDS THE LIST */

// THE MAXIMUM EPISODE NUMBER THAT WILL BE SEARCHED FOR IN A SERIES
const MAX_EPISODE_N_IN_SERIES = 33; // YOU CAN CHANGE IT


// THE VIDEOS THAT PLAY IN THE MAIN PAGE
/*const VIDEOS_MAIN = ['cnN3FQeqQx8', '1tvkaTbqGvM', '07BXnaely2o', 'UxMoCALQnZ0', 'F_ax-iSymSo', 'EwPnPLgf3ow', '7qfUOCkVccs',
                     'wDQPIos2H3Y', 'XRoXUANcK0k', '9W_mLQYury0', 'BsFAR7V8GM0', 'rziqXTu36qo', 'WTyZC5WPCIU', 'q8pK1RFATo0',
                     '_KJFEV-_AVs']*/
const VIDEOS_MAIN = [
    'GjRUJHXLm7M', 'dO74H5ZufpM', 'mDr-bWrjDS8', 'l4g-F6xAt8U', '7nxlR2RbV8U',
    'X5za9bw0Szw', 'X5za9bw0Szw', 'X5za9bw0Szw', 'OFh64xxYLxs', 'FUQqv-_6mLo',
    'AUc4IL79qxw', 'Kbwg0d619pY', 'pjmZx2fOT50', 'hQ9Q1zg_y5M', 'cnN3FQeqQx8',
    '1tvkaTbqGvM', '07BXnaely2o', 'UxMoCALQnZ0', 'F_ax-iSymSo', 'EwPnPLgf3ow',
    '7qfUOCkVccs', 'wDQPIos2H3Y', 'XRoXUANcK0k', '9W_mLQYury0', 'BsFAR7V8GM0',
    'rziqXTu36qo', 'WTyZC5WPCIU', 'q8pK1RFATo0', '_KJFEV-_AVs']
/* * * * * **************************************************** * * * * */
/* * * * * **************************************************** * * * * */














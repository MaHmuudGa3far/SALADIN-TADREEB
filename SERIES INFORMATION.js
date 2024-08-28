
/*I* * * *                 باسم اللّه الرحمن الرحيم               * * * *I*/
/* * * * * **************************************************** * * * * */
/* * * * * INFORMATION ABOUT THE SERIES INCLUDED IN THE PROGRAM * * * * */

/* ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** *

To include more videos to the program:
    1. (neccesary) Add a section in the SERIES_INFORMATION list below,
    1. (necessary) Run the convert_srt_to_js.py tool in the '0 python' folder to create
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


const DEFAULT_LANGUAGE = 'en';
// options: en, es









// LIST OF SUBTITLED SERIES THE PROGRAM WILL LOOK FOR
const SERIES_INFORMATION = [
    A_Witness_to_the_Century_podcast = {
        name: 'A Witness to the Century podcast', title: 'كواليس شاهد على العصر', dialect: 'standard',
        youtube_ip: {
            01: 'h6lno7wM0lw', 02: 'Bh_AgpASSkg', 03: 'xMbDoTPiHvw',
            04: 'JJQj1ov5Ukc', 05: 'wehRJJ92xYk', 06: 'Fg1IIA_8uSY',
            07: '8bscQpT5DSw',
            20: 'bF8k4cwpIHA', 21: 'AjYYHeA_HfY', 22: 'X2znGZarQm4'}
    },
    A_Memory_and_a_Lesson_se1 = {
        name: 'A Memory and a Lesson se1 Fadel Soliman', title: 'ذكرى وعبرة الموسم الأول', dialect: 'egyptian',
        youtube_ip: {
            01: 'ATdqxKuHC_g', 02: 'hbhUmNVltQo', 03: 'N-O3-dhIgUs', 04: 'eelQEsE9kf4',
            05: 'kS2RRfpar8Q', 06: 'Bubf5R8XZ54', 07: '-YP0pY7twqU', 08: 'HJU5xPf6b_Y',
            09: 'L0YBcl-uCc4', 10: 'VjTGsP-nGSM', 11: 'Pexp4Ydw_74', 12: 'sXEC1s210ZI',
            13: '5aY77Xzp7fg', 14: 'BKYH010QBAg', 15: 'nzwRwHKzzns', 16: 'phZNJvy-O5s',
            17: '6zNrBIfUxAw', 18: 'YV-ZiMU2glg', 19: '4P7fJ83mCJU', 20: 'kcO1fXvXjdU',
            21: '5z59Zt0IAD0', 22: 'QYDlYomPumM', 23: 'goVqvMLX21U', 24: 'rf8QXVZftVY',
            25: 'rpWueLQcI9g', 26: 'W14tTtgK7AU', 27: 'W14tTtgK7AU', 28: '6GPR3pa6aos',
            29: 'lPaPgcrD2jY', 30: 'RObfVozs7rg', 31: '0IWO9c7upmc'
        }
    },
    alseerah_alnabaweiyah = {
        name: 'alseerah alnabaweiyah parts', title: 'السيرة النبوية | مقاطع', dialect: 'standard',
        youtube_ip: {1: 'O80hEczEEkk'}
    },
    alfetnah_alkobraa = {
        name: 'alfetnah alkobraa', title: 'الفتنة الكبرة', dialect: 'standard',
        youtube_ip: {4: 'iuO5S7bcl6U', 5: 'uQo0YkFBOBY', 6: 'AeVpEdbPp58'}
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
            01: 'zbXRh_iySiQ', 02: '085PLOXUNow', 03: 'wj0zR_J11Sc', 04: 'xFSbOL5syXE',
            05: 'Ao7P7iP-As0', 06: 'giNFlDcV7eA', 07: 'nLNLvLOiuwQ', 11: 'OSa2DAHccUM',
            12: '_myVAAWK2gg', 13: 'XIFuHUrhzRY', 14: 'ooGLNF4m7Mg', 15: '4nDBg6Xlkqs',
            19: 'w4CUTZxUR2E', 20: '3Y0PKtMjjjM', 21: '8NmZ-ezbPyA', 22: 'MxZ7bOwX2A8',
            23: '1j6cY9k6ibI', 24: 'hY6gjgq-mt8', 25: '',}
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
    // makkah
    /*'GjRUJHXLm7M', 'dO74H5ZufpM', 'mDr-bWrjDS8', 'l4g-F6xAt8U', '7nxlR2RbV8U',
    'X5za9bw0Szw', 'OFh64xxYLxs', 'FUQqv-_6mLo',
    'AUc4IL79qxw', 'Kbwg0d619pY', 'pjmZx2fOT50', 'hQ9Q1zg_y5M', 'cnN3FQeqQx8',
    '1tvkaTbqGvM', '07BXnaely2o', 'UxMoCALQnZ0', 'F_ax-iSymSo', 'EwPnPLgf3ow',
    '7qfUOCkVccs', 'wDQPIos2H3Y', 'XRoXUANcK0k', '9W_mLQYury0', 'BsFAR7V8GM0',
    'rziqXTu36qo', 'WTyZC5WPCIU', 'q8pK1RFATo0', '_KJFEV-_AVs',*/
    //safartas الشام
    'HE3DGQtegoI', 'rtb2htSjkGA', '6Qn9o-EJwII', 'mPRupNM31Aw', 'mPRupNM31Aw',
    'mPRupNM31Aw', 'mPRupNM31Aw', 'HUKGY8raa4c', 'HUKGY8raa4c', 'iKa0TLU7g9w',
    'iKa0TLU7g9w', 'iKa0TLU7g9w', 'iKa0TLU7g9w', 'anbTT2D7jEI', 'anbTT2D7jEI',
    'anbTT2D7jEI', 'FXB8khR3EE4', 'gnunD9-pf1o', 'IB_SUoiQSGM', 'IB_SUoiQSGM',
    'IB_SUoiQSGM', 'm9NPBsj9Eps', 'm9NPBsj9Eps', 'y819y7WbLag', 'y819y7WbLag',
    'W_NsVhFrjuI', 'xeCni6ivjB0', '-EScpFihqEI', '-EScpFihqEI', '-EScpFihqEI',
    'tH_UCdyt3nI', 'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8',
    '33dLynXSDzM', '33dLynXSDzM', '-EScpFihqEI', '-EScpFihqEI', '-EScpFihqEI',
    'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8',
    'iKa0TLU7g9w', 'iKa0TLU7g9w', 'iKa0TLU7g9w', '_DAziLqIebM', 'o7UgvvG9Vwc',
    'o7UgvvG9Vwc', 'c_CgrZvKX_M', 'c_CgrZvKX_M', '2K_JYnboe2A', '2K_JYnboe2A',
    'mPRupNM31Aw', '5d1kztP9OZE', 'q0Y7eoocVK8', 'q0Y7eoocVK8', 'q0Y7eoocVK8',
    'q0Y7eoocVK8', 'q0Y7eoocVK8', 'IB_SUoiQSGM', 'IB_SUoiQSGM', 'IB_SUoiQSGM',
    'IB_SUoiQSGM', 'IB_SUoiQSGM', 'IB_SUoiQSGM', 'IB_SUoiQSGM', 'IB_SUoiQSGM',
    '-EScpFihqEI', '-EScpFihqEI', '-EScpFihqEI', '-EScpFihqEI', '-EScpFihqEI',
    'tBBIqz-96D4', 'tBBIqz-96D4',
    //mamalik
    /*'TaezBX2nL-A', 'O0IeN86Rr2I', 'cV7jQsiBR6g', '3sbVSWoyRHI', '-ne_WPQ8x5o',
    'ZSq8DcX3yhM', 'oV1_PdCVJvc', 'qqDM9t_W8OI', '_t9dPj8sQR0', 'W0t3UhEQY8A',
    'sVFEKw9wXB8', 'xz5bCB01NgY', 'qC5Mj49lalc', 'dCTeL-ABbT4', 'xqkKvYrtUBc',
    'XkNf2YLygyI', 'm_Zlv1x2lXQ', 'd9cJ6k57bz8', 'JVXWHf_nAgQ', 'vzg2JuvkD5o',
    '96BG1OkaFdk', 'pRjyZoAD2hU', 'GGchDz0fdkE', 'IYtNfxft-x4', '8lA7csu1z-Q',
    'aYGVfTV59bA', 'LgJKxMzcN6Q', 'yxO037RHsrU', '_Q4WR2MyhJM', 'kyyW6gtuOTM',
    'aYGVfTV59bA', 'OEUJBkLaQ6o', 'myHcjJkpDfs', '8ukUET5m3Mg', 'LgJKxMzcN6Q',
    'aRRHaZ6PJy8', 'Wmr4I8zVnSo', 'Nbyy5YKypm8', 'QmGJm-a60aY', '0jUwNvTYFGg',
    'jr4yoF6yOxg', 'T9-OibaktbA', 'nnF60BFSUQE', 'aRRHaZ6PJy8', 'dCXSyZWsDPI',
    'Dat3c82Hmnk', 'gCNLJCQgUTM', '0HBFESlImoY', 'MORnmt1jgQk', 'MORnmt1jgQk',
    '0wQIxJ5hFh4', 'tvEQgEf_l4Q', '8raD93pfiA0', 'HNpgv0ey2DI', 'HNpgv0ey2DI',
    'HNpgv0ey2DI', 'HNpgv0ey2DI', '8HQQE1m7cno', '8HQQE1m7cno', 'tquqFyLdGN8',
    '96BG1OkaFdk', 'o7UgvvG9Vwc', 'NehtygID52Y', 'svbu1Mih198', '4iYcM48ogHo',
    'RFwND7RvxNo', 'SXJv4iUVMyc', '8IZ5BZXlAVI', 'WIzaF_pWsyU', 'LMvYTzaJpMY',
    'LMvYTzaJpMY', 'DlQ1K_TN76M', '4MKsNIQ2Sfg', 'rPQ1iNh33bk', 'Hxog9KE4wek',
    'PAny44THBW8', '9NnMMNWZX_M', '9NnMMNWZX_M', 'Wmr4I8zVnSo', 'HlGDJc5x8iA',
    'HlGDJc5x8iA', 'eDYLsFj-jaM', 'eDYLsFj-jaM', 'eDYLsFj-jaM', '3kHOe8X384o',
    '3kHOe8X384o', '3kHOe8X384o', '3kHOe8X384o', '7unhbHgbw1w', 'qqDM9t_W8OI',
    'WNbgiHT1Bqw', 'WNbgiHT1Bqw', 'd0QPkpSMwpg', '2FBjHXptkcg', 'dJTu74lVDnc',
    'e9fXHBovx0c', 'e9fXHBovx0c', 'CSAybEs2Q3E', 'Z3ARTHSUroI', '9NnMMNWZX_M',
    '9NnMMNWZX_M', 'UodAvU9IKRc', 'UodAvU9IKRc', '2sCMvDfzlww', '2sCMvDfzlww',
    'd16_a26cDjM', 'd16_a26cDjM', 'd16_a26cDjM', 'd16_a26cDjM', 'd16_a26cDjM',
    'cePvKcEsJbA', 'cePvKcEsJbA', 'Vzas_OtggBQ', 'Vzas_OtggBQ', 'Vzas_OtggBQ',
    'URCbkLTsm4g', 'URCbkLTsm4g', 'vPN2fo8w7wE', 'pmtmd6I0rKY', 'xzxzCh8uC6k',
    'AeaBFp30bqg', '3FigLSapaD8', 'e9fXHBovx0c', 'uYV2rc0o_Y0', 'vzg2JuvkD5o',
    'cV7jQsiBR6g', 'ZN3-LeDE8y4', '-ne_WPQ8x5o', 'oV1_PdCVJvc', 'oV1_PdCVJvc',
    'oV1_PdCVJvc', 'oV1_PdCVJvc', 'oV1_PdCVJvc', 'W0t3UhEQY8A', 'W0t3UhEQY8A',
    'W0t3UhEQY8A', 'W0t3UhEQY8A', 'W0t3UhEQY8A'*/
]
/* * * * * **************************************************** * * * * */
/* * * * * **************************************************** * * * * */














$(document).ready(function() {

    o_game = {
        string: {
            title_text: "Trivia Game!",
            start_text: "Start",
            timer_text: "Time Remaining: ",
            seconds_text: "Seconds",
            game_over_text: "All Done!",
            correct_text: "Correct Answers: ",
            incorrect_text: "Incorrect Answers: ",
            unanswered_text: "Unanswered: ",
            question_text: "", //init question text
            choice_text: "", //init choice
        flag: {
            start_screen: true, //init start screen state flag
            game_screen: false, //init game screen flag
            game_over_screen: false, //init game over screen flag
            correct_answer: false }, //init correct answer flag
        counter: {
            correct: 0, //init correct answer counter
            incorrect: 0, //init incorrect answer counter
            unanswered: 0, //init unanswered counter
            questions: 0, }, //init # of questions 
        int: {
            max_questions: 8,
            timer_max_seconds: 30, }
    };

    f_start_screen(); //call start screen

    function f_start_screen() {
    
        $(f_build_html("div", { id: "header_title" }, "<h1>" + o_game.string.title_text + "</h1>")).appendTo("header"); //create header div
        $(f_build_html("button", { id: "start_game" }, o_game.string.start_text)).click(function() { //create start game button, if clicked, start
            $(this).parent().remove(); //remove the button on click
            o_game.flag.start_screen = false; //flag start screen to false
            o_game.flag.game_screen = true; //flag game screen
            f_game() //go to game screen on click
        }).appendTo("main"); 

    };

    function f_game() {
        //init & output questions/answers

        //timer

            //if timer reaches 0
                //get all the user input/info
                //go to game over screen

        console.log("game screen");
    };

        // outputs: <a id="mylink" href="http://devalias.net">Glenn devalias Grant</a>
        /*
        f_build_html("div", "poop", {
            id: "header"
        });
        
        $("#header_title").html( //display o_start_textcreen.header_text
            "<h1>" + o_game.string.header_text + "</h1>" +
            "<h2>" + o_game.string.subtitle_text + "</h2>" 
        );*/

    function f_build_html(tag, attrs, inner_html) { //helper function to build html tags
        var h = '<' + tag; //opening tag       
        for (var attr in attrs) {
            if(attrs[attr] === false) {
                continue;
            };
            h += ' ' + attr + '="' + attrs[attr] + '"';
        };
        return h += inner_html ? '>' + inner_html + '</' + tag + '>' : '/>';
    };
    
}); //end document ready

/*
var thirty_seconds = 30, //init 30 seconds
    display = $('#timer'), //target timer
    

f_start_timer(thirty_seconds, display); //call timer function

function f_start_timer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(seconds);

        if (--timer < 0 ) { //do this if timer reaches 0
            timer = duration;
        }
    }, 1000);
};
*/
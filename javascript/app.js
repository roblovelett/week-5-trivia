$(document).ready(function() {

    f_start_screen(); //call start screen

    function f_start_screen() {

        o_game = { //init game object
            string: {
                title_text: "Trivia Game!",
                start_text: "Start" },
            flag: {
                start_screen: true, //init start screen state flag
                game_init: false, //init game screen flag
                game: false
            },
        };
        
        if (o_game.flag.start_screen) {
            $("header").append(f_build_html("div", { id: "header_title" }, f_build_html("h1", "", o_game.string.title_text))); //create header div
            $("main").append(f_build_html("button", { id: "start_game" }, o_game.string.start_text)); //create start button
            $("#start_game").click(function() { //if start button clicked
                $(this).remove(); //remove the button on click
                o_game.flag.start_screen = false; //flag start screen to false
                o_game.flag.game_init = true; //flag game screen
                f_game() //go to game screen on click
            });
        };
    };

    function f_game() {

        if (o_game.flag.game_init) {

            //init & output questions/answers
            o_game = { //game object
                array: {
                    correct_choices: [] }, //init array of correct choices
                string: {
                    timer_text: "Time Remaining: ",
                    seconds_text: "Seconds",
                    game_over_text: "All Done!",
                    correct_text: "Correct Answers: ",
                    incorrect_text: "Incorrect Answers: ",
                    unanswered_text: "Unanswered: " 
                },
                flag: {      
                    game_over_screen: false, //init game over screen flag
                    correct_answer: false }, //init correct answer flag
                counter: {
                    correct: 0, //init correct answer counter
                    incorrect: 0, //init incorrect answer counter
                    unanswered: 0, //init unanswered counter
                    questions: 0 }, //init # of questions 
                num: {
                    timer_max_seconds: 30 }
            };

            f_question("In what place was Christmas once illegal?", { string: { 01: "England", 02: "France", 03: "Brazil", 04: "Russia" }, flag: 01 } );
            f_question("Question 02?", { string: { 01: "Foo", 02: "Bar", 03: "Boo", 04: "Far" }, flag: 02 } );
            f_question("Question 03?", { string: { 01: "Fooo", 02: "Baar", 03: "Booo", 04: "Faar" }, flag: 03 } );
            f_question("Question 04?", { string: { 01: "Foooo", 02: "Baaar", 03: "Boooo", 04: "Faaar" }, flag: 04 } );
            f_question("Question 05?", { string: { 01: "Fooooo", 02: "Baaaar", 03: "Booooo", 04: "Faaaar" }, flag: 04 } );
            f_question("Question 06?", { string: { 01: "Foooooo", 02: "Baaaaar", 03: "Boooooo", 04: "Faaaaar" }, flag: 03 } );
            f_question("Question 07?", { string: { 01: "Fooooooo", 02: "Baaaaaaar", 03: "Booooooo", 04: "Faaaaaar" }, flag: 02 } );
            f_question("Question 08?", { string: { 01: "Foooooooo", 02: "Baaaaaaaar", 03: "Booooooo", 04: "Faaaaaaaar" }, flag: 01 } );

            o_game.flag.game_init = false; //end game initialization
            o_game.flag.game = true; //start game state

        };

        if (o_game.flag.game) {            
            $("input[class=choice]").click(f_choice);
        };
        
    };

    function f_choice(event) {

        var compare_choice = event.target.id; //get id from click event
        var match = false; //init match state
        
        for (i = 0; i < o_game.counter.questions; i++) {
            if (compare_choice === o_game.array.correct_choices[i]) {
                match = true;
            };
        };

        if (match) { 
            console.log("MATCH");
        } else {
            console.log("WRONG");
        };

    };

    function f_question(question, choices) {

        o_game.counter.questions ++; //add 1 to question counter
        o_game.string["question_" + f_add_zero(o_game.counter.questions)] = question; //add question_# property to global game object
        var question_num = "question_" + f_add_zero(o_game.counter.questions); //set local variable string question with question counter # w/added 0
        var choice_text = _.values(choices.string); //create array of choice values (the choice text)
        var choice_nums = _.keys(choices.string) //create array of choice keys (the choice #s)
        var choice_num = ""; //init string, will be _choice_##
        var choices_num = choice_nums.length; //set # of choices to be the length of choice.string object
        var correct_num = f_add_zero(choices.flag); //get key # of correct choice, if < 10 add 0 to front
        var correct_choice = question_num + "_choice_" + correct_num; //make string to compare correct choice: question_##_choice_##
        o_game.array.correct_choices.push(correct_choice); //push correct choice into array

        $("main").append(f_build_html("div", { id: question_num }, f_build_html("p", '', question))); //create question div with question text in paragraph
        $("div[id=" + question_num + "]").append(f_build_html("form", { id: "form_" + question_num }, "")); //create form for choices

        for (i = 0; i < choices_num; i ++) {
            choice_num = "_choice_" + f_add_zero(choice_nums[i]); //create string for each choice, _choice_##
            question_choice_num = question_num + choice_num; //create/update compare_choice to be question_##_choice_##

            //o_game.string[ question_num + "_choice_" + f_add_zero(choice_nums[i]) ] = choice_text[i]; //set global property string.question_##_choice_## = choice text
            $("form[id=form_" + question_num + "]").append( //create input element with each choice
                f_build_html("input", { type: "radio", name: question_num + "_choice", class: "choice", id: question_choice_num, value: choice_text[i] }, choice_text[i] + "<br/>" //output html for choice button & text
            ));
        };
    };

    function f_build_html (tag, attrs, inner_html) { //helper function to build html tags
        var h = '<' + tag; //opening tag       
        for (var attr in attrs) {
            if(attrs[attr] === false) {
                continue;
            };
            h += ' ' + attr + '="' + attrs[attr] + '"';
        };
        return h += inner_html ? '>' + inner_html + '</' + tag + '>' : '/>';
    };

    function f_add_zero (num) { //helper function if number is less than 10
        return ((num = +num) < 10 ? "0" : "") + num;
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

//timer

            //if timer reaches 0
                //get all the user input/info
                //go to game over screen
        // outputs: <a id="mylink" href="http://devalias.net">Glenn devalias Grant</a>
        /*
        f_build_html("div", "asdfg", {
            id: "header"
        });
        
        $("#header_title").html( //display o_start_textcreen.header_text
            "<h1>" + o_game.string.header_text + "</h1>" +
            "<h2>" + o_game.string.subtitle_text + "</h2>" 
        );*/
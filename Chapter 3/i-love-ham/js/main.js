/**
  * I Love Ham
  * @author: Rocco Augusto
  * @file: js/main.js
**/

var correct = '';
var choice = '';
var resultLength = 0;
var tweets =  [
	['I love ham','Earthquake in Japan'],
	['Android is awesome', 'I just hit an opossum'],
	['Ice cream sandwich','I fell out of my hammock'],
];

function init() {
	window.scrollTo(0, 1);
	
	//reset the correct answer and currentRound array
	correct = '';
	choice = getRandom();
	$('ul, section').removeClass();
	$('ul').empty();
	
	//find out which item has more search results
	for(i=0;i<choice.length;i++){
		var position = i;
		$.getJSON('http://search.twitter.com/search.json?rpp=100&q=' + choice[i].replace(/\s/g,'%20') + '&callback=?', function(data) {
			//check the length of results for each search
			//then set them to the "correct" variable
			correct.push(data.results.length);
		});
	}
	
	// generate the buttons for this round
	buildQuiz();	
}

// this function will grab a random user from
// the tweets array.
function getRandom() {
	var l = tweets.length;	// grab length of tweet array
	var ran = Math.floor(Math.random()*l);	// grab random user
	
	return tweets[ran];
}

function buildQuiz() {
	var h = '';
	
	for(i=0;i<choice.length;i++){
		h += '<li>';
		h += '  <blockquote>' + choice[i] + '</blockquote>';
		h += '</li>';
	}
	
	// write buttons to the page
	$('ul').html(h);	
}

$(function(){
	// run the init() function and start the application
	init();
	
	// check for correct user on user selection
	$('ul li').live('click', function() {
		var id = $(this).index();
		var not = (id == 0) ? 1 : 0;
		var result = '';
		
		// restart the game if game over
		if($('ul').hasClass('gameover')) {
			init();
			$('h2').text('Which one of these fabulous tweets has more search results?!');
		}
		else { 
			if(correct[id] > correct[not]) {
				//congratulate the player
				result = 'Congratulations! you are a total rock star!';
				$('section li:eq('+ id + ')').addClass('win');
			}
			else if(correct[id] == correct[not]) {
				//if it is a tie
				result = 'It is a tie! You\'re a winner by default!';
			}
			else {
				//shame the player into playing again
				result = 'Boo! You failure!';
				$('section li:eq('+ id + ')').addClass('fail');	
			}
			
			// add gameover class to page
			$('ul').addClass('gameover');
			$('h2').text(result + ' Tap a button to play again!');
		}
	});
});
var Schubert = angular.module('Schubert', [
	'ngRoute',
	'twitter.timeline',
	'ngTouch'
]);

Schubert.run(function($rootScope, $location, $window) {
	// $rootScope.routes = {
	// 	events: false,
	// 	about: false,
	// 	schedule: false,
	// 	news: false,
	// 	join: false
	// };

	$rootScope.menu = false;
	$rootScope.style1 = "glyphicon";
	$rootScope.style2 = "glyphicon-chevron-down";
	$rootScope.toggleMenu = function() {
		$rootScope.menu = !$rootScope.menu;
		if($rootScope.style2 == "glyphicon-chevron-up") $rootScope.style2 = "glyphicon-chevron-down";
		else $rootScope.style2 = "glyphicon-chevron-up";
		
	}

	// function _handleRoute(url) {
	// 	for(var key in $rootScope.routes) {
	// 		$rootScope.routes[key] = false;
	// 	}
	// 	switch(url) {
	// 		case "/about":
	// 			$rootScope.routes["about"] = true;
	// 			break;
	// 		case "/events":
	// 			$rootScope.routes["events"] = true;
	// 			break;
	// 		case "/news":
	// 			$rootScope.routes["news"] = true;
	// 			break;
	// 		case "/join":
	// 			$rootScope.routes["join"] = true;
	// 			break;
	// 		case "/schedule":
	// 			$rootScope.routes["schedule"] = true;
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }

	// $rootScope.$on('$routeChangeSuccess', function() {
	// 	_handleRoute($location.url());
	// })
});

Schubert.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'templates/main.html',
			controller: 'SchubertCtrl'
		}).
		when('/events', {
			templateUrl: 'templates/events.html',
			controller: 'SchubertCtrl'
		}).
			when('/events/recording', {
				templateUrl: 'templates/events/recording.html',
				controller: 'SchubertCtrl'
			}).
			when('/events/symposium', {
				templateUrl: 'templates/events/symposium.html',
				controller: 'SchubertCtrl'
			}).
			when('/events/screening', {
				templateUrl: 'templates/events/screening.html',
				controller: 'SchubertCtrl'
			}).
			when('/events/mead', {
				templateUrl: 'templates/events/mead.html',
				controller: 'SchubertCtrl'
			}).
		when('/news', {
			templateUrl: 'templates/news.html',
			controller: 'SchubertCtrl'
		}).
		when('/schedule', {
			templateUrl: 'templates/schedule.html',
			controller: 'SchubertCtrl'
		}).
		when('/join', {
			templateUrl: 'templates/join.html',
			controller: 'SchubertCtrl'
		}).
		when('/about', {
			redirectTo: '/about/project'
		}).
			when('/about/project', {
				templateUrl: 'templates/about.html',
				controller: 'SchubertCtrl'
			}).
			when('/about/people', {
				templateUrl: 'templates/about/people.html',
				controller: 'SchubertCtrl'
			}).
				when('/about/people/:person', {
					templateUrl: 'templates/about/bios.html',
					controller: 'SchubertCtrl'
				}).
		otherwise({
			redirectTo: '/'
		});
});

Schubert.controller('SchubertCtrl', function($scope, $location, $routeParams) {
	/* Bio Page 
	************/
	$scope.people = people;

	/* Individual Bio Pages 
	***********************/
	$scope.person = null;
	if($routeParams.hasOwnProperty('person')) {
		for(var person in people) {
			if(people[person].url == $routeParams.person) {
				$scope.person = people[person];
				break;
			}
		}
	}


	/* Event Pages 
	**************/
	$scope.eventImgs = {
		recording: 'images/events/recording_og.jpg',
		symposium: 'images/events/symposium_og.jpg',
		screening: 'images/events/screening_og.jpg',
		mead: 'images/events/mead_og.jpg'
	};

	/* Google Analytics 
	********************/
	$scope.$on('$viewContentLoaded', function(event) {
		ga('send', 'pageview', { page: $location.path()});
	});
});

/*============*/
/* DIRECTIVES */
/*============*/
Schubert.directive('footer', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/directives/footer.html'
	}
});

Schubert.directive('concerts', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/directives/threeconcerts.html'
	}
});

Schubert.directive('imageSwap', function() {
	return {
		restrict: 'A',
		template: '<a style="padding:0px" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" href="{{url}}"><img style="padding:0px" class="img-responsive" src="{{img}}"></a>',
		scope: {
			url: "@url",
			img: "@img",
			hover: "@hover"
		},
		controller: function($scope) {

		},
		link: function(scope, el, attr) {			
			el.children().on('mouseover', function() {
				el.children().children().attr('src', scope.hover);
			});
			el.children().on('touchstart', function() {
				el.children().children().attr('src', scope.hover);
			});
			el.children().on('mouseout', function() {
				el.children().children().attr('src', scope.img);
			});
			el.children().on('touchend', function() {
				el.children().children().attr('src', scope.img);
			});
		}
	}
});


/*===========*/
/* Variables */
/*===========*/
var people = [
	{
		url: "jenny_kallick",
		name: "Jenny Kallick",
		title: "Professor of Music, Amherst College",
		shortTitle: "Professor of Music, Amherst College",
		superbio: "Professor Kallick has designed this project and received support from the Amherst College FRAP funding and Amherst Art Fund with the goal of supporting the Brentanos first live chamber music recording and supporting audience involvement in this process. In addition, she has assembled lecturers, recitals, musical arrangements, and new works to give context to the long beloved Schubert Cello Quintet.",
		img: "jenny.jpg",
		bio: "Jenny Kallick is currently Professor and regularly chair in the Music Department at Amherst College, where she teaches music and culture courses, opera, and chamber music. Before Amherst, she was on the faculty at Yale, where she founded and guided the first doctorate for performers and composers as well as serving as Director of Academic Affairs at the School of Music. Her degrees are in cello performance and musicology, also from Yale University. Before her current academic positions, she performed with professional orchestras and chamber groups in the US and abroad. She has had occasion to work with opera companies as an educational and dramaturgical adviser, and continues to perform occasionally on movie soundtracks. She is also the co-composer and librettist of an opera, ARCHITECT. A Chamber Opera Inspired by the Life and Work of Louis Kahn (2012) in release by Navonna Records in addition to creating two music dramas: WinterReise (based on Schubert\u0027s song cycle, 2001) for soprano, baritone, string trio, and piano with director Jeffrey Lentz; and The Death of Victor Hartmann (incorporating songs and piano music of Musorgsky, 2003) for bass, violin, clarinet, and cello with director and designer John Conklin. For the Making Opera Project at Amherst College, she has produced Bizet\u0027s Carmen, Mozart\u0027s Cos\xEC fan tutte, La finta giardiniera, and Le Nozze di Figaro. Her scholarly work includes writings on Beethoven\u0027s Sketches for the Ninth Symphony and 20th century Czech opera."
	},
	{
		url: "brentano_string_quartet",
		name: "Brentano String Quartet",
		title: "Mark Steinberg (violin)\nSerena Canin (violin)\nMisha Amory (viola)\nNina Maria Lee (cello)",
		shortTitle: "Mark Steinberg, Serena Canin, Misha Amory, Nina Maria Lee",
		img: "brentanos.jpg",
		superbio: "The current project to record the Schubert Cello Quintet at Amherst College marks the Brentano Quartet's first live recording.",
		bio: 'Within a few years of its formation, the Brentano Quartet garnered critical acclaim for its \"passionate, uninhibited and spellbinding performances.\" Awarded the first Cleveland Quartet Award and the Naumburg Chamber Music Award, in 1996 the Chamber Music Society of Lincoln Center invited them to be the inaugural members of Chamber Music Society Two, a program which was to become a coveted distinction for chamber groups and individuals. The Quartet had its first European tour in 1997, and was honored in the U.K. with the Royal Philharmonic Award for Most Outstanding Debut. In recent seasons the Quartet has traveled widely, appearing all over the United States and Canada, in Europe, Japan and Australia. It has performed in the world\u0027s most prestigious venues, including Carnegie Hall and Alice Tully Hall in New York; the Library of Congress in Washington; the Concertgebouw in Amsterdam; the Konzerthaus in Vienna; Suntory Hall in Tokyo; and the Sydney Opera House. Most recently, they have become the Quartet-in-Residence at the Yale School of Music. An early champion of the Brentano Quartet, Jenny Kallick arranged for their residency at Amherst College as visiting Valentine Professors. Making frequent visits to the college, the Brentano Quartet coached student chamber music groups, performed on honors recitals, and played across the campus as ambassadors for classical music. The quartet has also played numerous times on the Music at Amherst Chamber Series, helping to build a strong and close relationship to the Music Department\u0027s regular concert attendees. This relationship is cherished by the Brentanos as well as our audience, creating the groundwork for the current live recording project.'
	},
	{
		url: "michael_kannen",
		name: "Michael Kannen",
		title: "Director of Chamber Music, Peabody Institute",
		shortTitle: "Director of Chamber Music, Peabody Institute",
		img: "michael.jpg",
		superbio: "Cellist Michael Kannen joins with the Brentano Quartet for the live recording of the Schubert Cello Quintet, a work that he has frequently performed with his colleagues.",
		bio: "Michael, shown in his picture on his visit to the Schubert house in Vienna, has distinguished himself as a musician and educator of uncommon accomplishment who is comfortable in widely diverse situations and venues. He was a founding member of the Brentano String Quartet and for seven years performed with that group on concert stages around the world, on radio and television, and on recordings.  During those years, the Brentano Quartet was awarded the first Cleveland Quartet Award,  the Naumburg Chamber Music Award, a Royal Philharmonic Award  and was the first participant in the Chamber Music Society of Lincoln Center II program.  Mr. Kannen continues to perform chamber music around the country as a member of the Apollo Trio,  on period instruments with the Houston-based group Context and at major music festivals such as Yellow Barn, Chamber Music Northwest, Portland Chamber Music Festival and the International Musicians Seminar in Prussia Cove, England.  Mr. Kannen has collaborated with such artists as Jessye Norman, Phyllis Bryn-Julson, Sergiu Luca, Hilary Hahn, Donald Weilerstein, Pamela Frank, Leon Fleisher, Mitsuko Uchida, Peter Serkin, Paula Robison, Charles Neidich, Steven Isserlis, Gary Hoffman and with jazz artists Michael Formanek and Uri Caine.  His activities range from performances on period instruments to premieres of the music of our time.  He has recorded for the CRI label.  Mr. Kannen has served on the faculties of Dartmouth College and the Purchase College Conservatory.  He is currently the Director of Chamber Music at the Peabody Conservatory of Music, where he holds the Sidney Friedberg Chair in Chamber Music."
	},
	{
		url: "chirstopher_gibbs",
		name: "Christopher H. Gibbs",
		title: "James H. Ottaway Jr. Professor of Music, Bard College",
		shortTitle: "James H. Ottaway Jr. Professor of Music, Bard College",
		img: "christopher.jpg",
		superbio: "Christopher Gibbs, together with John Gingerich, will offer one of our keynote lectures during Saturday\u0027s symposium. Professor Gibbs\u0027s expertise on the late period of Schubert\u0027s career allows him to provide particular context for the period in which the Schubert Cello Quintet was composed.",
		bio: "This lecture follows his presentations at the 2014 Bard Festival, Schubert and His World. He currently serves as the James H. Ottaway Jr. Professor of Music at Bard College, Co-Artistic Director of the Bard Music Festival, and Associate Editor of The Musical Quarterly. He edited The Cambridge Companion to Schubert, co-edited Franz Liszt and His World and Franz Schubert and His World, and is the author of The Life of Schubert. He is the co-author, with Richard Taruskin, of The Oxford History of Western Music, College Edition. Since 2000 he has written the program notes for The Philadelphia Orchestra. Professor Gibbs has served as Musicological Director of the Schubertiade at the 92nd street Y in New York City and Musicological Advisor to the Schubert Festival at Carnegie Hall in 1997. He received his degrees from Haverford College and Columbia University, received a disseration prize from the Austrian Cultural Institute, ASCAP-Deems Taylor Award, and was elected as a fellow of the American Counsel of Learned Societies. He contributed to The New Groves Dictionary of Music and Musicans, and has published in 19th Century Music, Current Musicology, Opera Quarterly, and The Chronicle of Higher Education."
	},
	{
		url: "john_gingerich",
		name: "John M. Gingerich",
		title: "Author of Schubert\u0027s Beethoven Project",
		shortTitle: "Author of Schubert\u0027s Beethoven Project",
		img: "john.jpg",
		superbio: "John Gingerich, together with Christopher Gibbs, will offer one of our keynote lectures during Saturday\u0027s symposium. John\u0027s detailed knowledge on Schubert\u0027s life and work during the years 1824-1828 will guide our understanding of the creation of the Cello Quintet, and its relation to Schubert\u0027s last works.",
		bio: 'This lecture follows his presentation at the 2014 Bard Festival, Schubert and His World. John Gingerich has published articles on Beethoven\u0027s late quartets and the concert series organized by the violinist Ignaz Schuppanzigh, on Schubert\u0027s cello quintet, on his Latin Masses and their reception, and on his "Unfinished" Symphony. His most recent work is a book, Schubert\u0027s Beethoven Project, published in 2014 by Cambridge University Press, and an essay, "\u0027Those of us who found our life in art\u0027: The Second-Generation Romanticism of the Schubert-Schober Circle, 1820-1825," in the volume Schubert and His World published by Princeton University Press in conjunction with the Bard Festival 2014. He is currently working on a book on Ignaz Schuppanzigh. Before embarking on his musicology studies he spent several years playing in the cello section of the Baltimore Symphony Orchestra. In his recent book, Gingerich provides a new understanding of Schubert\u0027s career and his relationship to Beethoven. Placing the genres and string quartet, symphony, and piano sonata within the cultural context of the 1820s, his book examines how Schubert was building on Beethoven\u0027s legacy. The author brings new understandings of how Schubert tried to shape his career to bare on new hermeneutic readings of the works from 1824 to 1828 that share musical and extra-musical preoccupations, centering on the "Death and the Maiden" Quartet and the Cello Quintet, as well as on analyses of Schubert\u0027s A minor Quartet, the Octet, and the great C Major Symphony.'
	},
	{
		url: "eric_wubbels",
		name: "Eric Wubbels \u002701",
		title: "Composer/Pianist",
		shortTitle: "Composer/Pianist",
		img: "eric.jpg",
		superbio: "Eric Wubbels, having recently taught at Amherst College, returns to honor us with an original piano composition reflecting his personal musical take on Schubert, as well as innovative arrangements of Schubert\u0027s Men\u0027s choruses.",
		bio: "Eric Wubbels (b.1980) is a composer, pianist, and Executive Director of the Wet Ink Ensemble, a New York collective devoted to creating, promoting, and organizing adventurous contemporary music. Wubbels\u0027s music has been performed throughout Europe, Asia and the U.S., by groups such as the Wet Ink Ensemble, Kammerensemble Neue Musik Berlin, ICE, Yarn/Wire, Ensemble Linea, Talea Ensemble, Left Coast Chamber Ensemble, and the Mivos Quartet, and featured on festivals including the Zurich Tage f\u00FCr Neue Musik (2013), Metz Festival (2014), and MATA Festival (2012). He has received commissioning grants from Chamber Music America\u0027s Classical Commissioning Program, ISSUE Project Room, the Jerome Foundation, New Music USA, and Yvar Mikhashoff Trust, and has been awarded residencies at the MacDowell Colony and Civitella Ranieri Center (Italy). As a performer, he has given U.S. and world premieres of works by major figures such as Peter Ablinger, Richard Barrett, Michael Finnissy, Beat Furrer, George Lewis, and Mathias Spahlinger. He has recorded for hat[NOW]art, Spektral, Albany Records, Carrier, and Quiet Design. He holds a D.M.A. and M.A. in composition from Columbia University, and a B.A. from Amherst College, and has held teaching positions at Amherst College (2009-11) and Oberlin Conservatory (2012-13). His principal teachers include Lewis Spratlan, Tristan Murail, and Fred Lerdahl."
	},
	{
		url: "jacob_cooper",
		name: "Jacob Cooper \u002702",
		title: "Composer",
		shortTitle: "Composer",
		img: "jacob.jpg",
		superbio: "Jacob Cooper, having recently taught at Amherst College, returns to honor us with an original string quintet composition reflecting his personal musical take on Schubert, as well as innovative arrangements of Schubert Men\u0027s choruses.",
		bio: "Jacob Cooper\u0027s compositions and multimedia works have garnered recognition throughout North America and Europe, appearing at Carnegie Hall, Lincoln Center, the MATA Festival, and the Wordless Music concert series at the Miller Theater. Recent performers of his music include the JACK Quartet, the Calder Quartet, Ensemble ACJW, and the Minnesota Orchestra. Lauded as \"richly talented\" (The New York Times) and \"a maverick electronic song composer\" (New Yorker), Jacob has earned a Charles Ives Scholarship from the American Academy of Arts and Letters and a Morton Gould award from ASCAP, and was the winner of the 2011 Carlsbad Music Festival competition. Also dedicated to teaching and scholarship, Jacob has served on the faculty at Amherst College and recently completed the requirements for his doctorate in composition at the Yale School of Music. His song cycle Silver Threads, written for soprano Mellissa Hughes and electronic track, will be released by Nonesuch records in the spring of 2014."
	},
	{
		url: "wistaria_quartet",
		name: "Wistaria Quartet",
		title: "Sarah Briggs (violin)\nKaila Graef (violin)\nDelores Thayer (viola)\nRebecca Hartka (cello)",
		shortTitle: "Sarah Briggs, Kaila Graef, Delores Thayer, Rebecca Hartka",
		img: "wisteria.jpg",
		superbio: "Wistaria Quartet, joined by cellists Volcy Pelletier (substituting for Rebcca Hartka) and Daniel Ang, will perform George Onslow Cello Quintets, popular in Schubert\u0027s day and known to him but forgotten until recently. Sarah Briggs and Delores Thayer all teach performance in the Music Department at Amherst College. Volcy Pelletier teaches performance in the Music Department at Smith College. They will also perform Jacob Cooper\u0027s quintet inspired by the Schubert Cello Quintet.",
		bio: "The Wistaria String Quartet- a newly formed ensemble affiliated with the Wistaria Chamber Music Society consists of four accomplished professional string players who live in western Massachusetts: Sarah Briggs and Kaila Graef, violins, Delores Thayer, viola, and Rebecca Hartka, cello. Voicy Pelletier and Daniel Ang \u002715 will be joining the Wistaria Quartet for the Onslow Quartets."
	},
	{
		url: "alan_bise",
		name: "Alan Bise",
		title: "Music Producer and Recording Engineer",
		shortTitle: "Music Producer and Recording Engineer",
		img: "alan.jpg",
		superbio: "",
		bio: "Alan Bise is the founder of and producer for Thunderbird Records. He has produced projects for many labels and clients across the world and currently serves as Chief Classical Producer for Azica Records. Known for helping to create exciting and passionate projects, Mr. Bise has produced records that have received Grammy nominations and appeared on the Billboard Classical Chart and Amazon Best Sellers list. He is also committed to new audience development and created and produced “Offbeat,” CIM’s radio show that gives listeners an inside look in the world of classical music in a unique manner. He studies the interests of today’s youth and uses his own love of rock ‘n roll to help create unique and appealing classical projects."
	},
	{
		url: "bruce_egre",
		name: "Bruce Egre",
		title: "Recording Engineer",
		shortTitle: "Recording Engineer",
		img: "bruce.jpg",
		superbio: "",
		bio: "Bruce Egre, Head, Audio Recording Degree Program at the Cleveland Institute of Music. Bachelor of Music Education, Northwestern University, 1982.  Studied classical guitar and audio recording at the Cleveland Institute of Music, 1985-1987. President and Chief Recording Engineer of Azica Records a Cleveland based record company specializing in classical and jazz music.  Lecturer at Case Western Reserve University in audio recording.  Recording Engineer for the Cleveland Orchestra broadcast service at Severance Hall and Blossom Music Center and the Cleveland Museum of Art Department of Musical Arts.  Active freelance recording engineer having done projects for numerous record companies.  Member of the Audio Engineering Society and the National Academy of Recording Arts and Sciences."
	},
	{
		url: "da_camera",
		name: "Da Camera Singers",
		title: "Men of the Da Camera Singers",
		shortTitle: "Men of the Da Camera Singers",
		img: "dacamera.jpg",
		superbio: "",
		bio: "For 39 years, the Da Camera Singers have been making music in the environs of Amherst, Massachusetts. Directed by Sheila Heffernon, they sing music ranging from 15th-century motets to works commissioned from Pioneer Valley composers."
	},
	{
		url: "lucia_yang",
		name: "Lucia Minah Yang \u002715",
		title: "Project Designer",
		shortTitle: "Project Designer",
		img: "minah.jpg",
		superbio: "",
		bio: "Lucia Minah Yang is a rising senior at Amherst College majoring in Music and Mathematics. She has participated as a member of the Choral Society and the Jazz Ensemble at Amherst College, and studies the piano. In the coming school year, she will be working on pieces for the string quartet and solo piano as a part of her composition thesis. She does graphic design as a hobby and is very excited to be a part of the Schubert Project as the Project Designer."
	},
	{
		url: "david_ressler",
		name: "David Ressler \u002714",
		title: "Web Developer",
		shortTitle: "Web Developer",
		img: "david.jpg",
		superbio: "",
		bio: "David Ressler recently graduated summa cum laude from Amherst College with degrees in Music and Operations Research (an interdisciplinary major that he created). At Amherst, he performed in musicals, operas, and thesis projects in addition to directing Whistle A Happy Tune, a community service performance group that he founded in 2012. He performed a staged recital He is currently working as an Associate Web Developer for LinkedIn in Mountain View, CA. He is thrilled to be a part of the Schubert Project...from across the country!"
	},
	{
		url: "ioanida_costache",
		name: "Ioanida Costache \u002712",
		title: "Guest Lecturer, Stanford University",
		shortTitle: "Guest Lecturer, Stanford University",
		img: "ioanida.jpg",
		superbio: "",
		bio: "Ioanida Costache arrives August 5 and will create handouts for all the events as well as crafting the preconcert sessions and postconcert sessions. She is completing a year as a Fulbright scholar, working on the subject: \u0022A Search for the Roots of Lautar Music.\u0022"
	}
];




		// <audio class="col-sm-12" controls>
		// 		  <source src="audio/01 - String Quartet No. 16 in F Major, Op. 135_ I. Allegretto.mp3" type="audio/mpeg">
		// 		Your browser does not support the audio element.
		// 		</audio>

/*****************************/
/** COMPREHENSION QUESTIONS **/
/*****************************/

//FUNCTION TO SHUFFLE THE MULTIPLE CHOICE OPTIONS FOR COMPREHENSION ARRAYS
function shuffle_choices(timelinevar) {
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex  = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
		
			// And swap it with the current element.
			temporaryValue      = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex]  = temporaryValue;
		}
		return array;
	}
	for (i = 0; i < timelinevar.length; i++) {
		var temp = timelinevar[i].compOPT;
		temp = shuffle(temp);
		timelinevar[i].compOPT_rand = shuffle(timelinevar[i].compOPT);
	}
	return timelinevar;
};


var SleepWithMe_array = [
	{
		compQ: "<b>How does the narrator characterize the Cusack family?</b>",
		compOPT: ['Brilliant designers', 'Incompetent designers', 'Brilliant painters', 'Unintelligent carpenters'],
		correctANS: 'Brilliant designers'},
	{
		compQ: "<b>Who is the narrator's favourite Gyllenhaal?</b>",
		compOPT: ['Maggie', 'Jake', 'Tom','Sarah'],
		correctANS: 'Maggie'},
	{
		compQ: "<b>Which celebrity (surname) is not mentioned in this story?</b>",
		compOPT: ['Baldwin', 'Gyllenhaal', 'Bacon','Bridges'],
		correctANS: 'Baldwin'},
	{
		compQ: "<b>What does the narrator say the benefit organized by the Bridges brothers could be called?</b>",
		compOPT: ['Bridges over troubled water', 'Extending a bridge', 'Bridges across America','Bridges benefit'],
		correctANS: 'Bridges over troubled water'},
	{
		compQ: "<b>What is the name of the host of this show?</b>",
		compOPT: ['Scooter', 'Reginald', 'Donald','Bridges'],
		correctANS: 'Scooter'},
	{
		compQ: "<b>What is the name of the guest featured in this story?</b>",
		compOPT: ['Reginald', 'Morpheus', 'Athena','Neo'],
		correctANS: 'Reginald'},
	{
		compQ: "<b>What does the Reginald sell?</b>",
		compOPT: ['Bathing suits', 'Hair product', 'Headphones','Television sets'],
		correctANS: 'Bathing suits'},
	{
		compQ: "<b>What is Scooter's idea of a vacation?</b>",
		compOPT: ['Wearing a swimsuit all day', 'Wearing a swimsuit to bed', 'Wearing a swimsuit to work','Watching a movie on the beach'],
		correctANS: 'Wearing a swimsuit all day'},
	{
		compQ: "<b>Who does the Reginald say acquired his robe shop?</b>",
		compOPT: ['Morpheus', 'Venus', 'Donnie','Kevin'],
		correctANS: 'Morpheus'},
	{
		compQ: "<b>What band is mentioned in this story?</b>",
		compOPT: ['Phish', 'Dish', 'Pond','Baths'],
		correctANS: 'Phish'}
]


var TheBoundsOfComedy_array = [
	{
		compQ: "<b>Where did the narrator's toughest gig take place?</b>",
		compOPT: ["In a lawyer's office", "In a bar", "In a high school", "At a wedding"],
		correctANS: "In a lawyer's office"},
	{
		compQ: "<b>Where was the narrator when he heard about the lawsuit?</b>",
		compOPT: ["On a train to Belfast", "On a train to Dublin", "In his vacation home", "In a grocery store"],
		correctANS: "On a train to Belfast"},
	{
		compQ: "<b>What did the narrator's lawyer think of his joke?</b>",
		compOPT: ["She didn't find it funny", "She thought it was hilarious", "She thought it was crass", "She was offended"],
		correctANS: "She didn't find it funny"},
	{
		compQ: "<b>What advice did the layer give the narrator?</b>",
		compOPT: ["Apologize for his joke", "Fight the lawsuit", "Lie about the joke", "Give up comedy"],
		correctANS: "Apologize for his joke"},
	{
		compQ: "<b>Who did the narrator think the men on the billboards looked like?</b>",
		compOPT: ["George Clooney", "Johnny Depp", "Michael Cera", "Brad Pitt"],
		correctANS: "George Clooney"},
	{
		compQ: "<b>How did the narrator profit from the financial crisis?</b>",
		compOPT: ["He channelled his rage into comedy", "His house went up in value", "He started investing in stocks", "He started a business in providing financial advice"],
		correctANS: "He channelled his rage into comedy"},
	{
		compQ: "<b>Why is the narrator obsessed with checking emails?</b>",
		compOPT: ["Every email might be a job", "He likes receiving fanmail", "He is waiting for an email from an old friend", "He is easily distracted"],
		correctANS: "Every email might be a job"},
	{
		compQ: "<b>Why was the narrator sued?</b>",
		compOPT: ["For making an offensive joke", "For refusing to open a door for someone", "For damaging property", "For disrupting neighbours with loud music"],
		correctANS: "For making an offensive joke"},
	{
		compQ: "<b>What did the narrator initally think was under attack by the lawsuit?</b>",
		compOPT: ["His free speech", "His dignity", "His reputation", "His feelings"],
		correctANS: "His free speech"},
	{
		compQ: "<b>What did the narrator realize about the lawsuit?</b>",
		compOPT: ["He was in the wrong", "He was up against 'the man'", "He was right and shouldn't apologize", "The plaintiff was lying"],
		correctANS: "He was in the wrong"}
]


var SwimmingWithAstronauts_array = [
	{
		compQ: "<b>How did the narrator train for his swim test?</b>",
		compOPT: ['Took his kids to the pool every day', 'Practiced martial arts', 'Signed up for a swim class', 'Swam at the lake every day'],
		correctANS: 'Took his kids to the pool every day'},
	{
		compQ: "<b>How many astronaut candidates reported for duty at the Johnson Space Center?</b>",
		compOPT: ['Forty-four', 'Two', 'One hundred', 'None'],
		correctANS: 'Forty-four'},
	{
		compQ: "<b>What was the final step of the first swim test in the pool?</b>",
		compOPT: ['Tread water with hands above the water','Hold breath for two minutes','Swim three laps of the pool underwater','Perform a water rescue'],
		correctANS: 'Tread water with hands above the water'},
	{
		compQ: "<b>How many astronaut candidates passed the first swim test?</b>",
		compOPT: ['All of them','Two','All but one','None'],
		correctANS: 'All of them'},
	{
		compQ: "<b>Where is the home of naval aviation?</b>",
		compOPT: ['Pensacola','Washington','Los Angeles','Dallas'],
		correctANS: 'Pensacola'},
	{
		compQ: "<b>What were the astronaut candidates trained to do at the naval air station?</b>",
		compOPT: ['Eject out of aircraft and survive in water long enough to be rescued','Fly fighter jets','Withstand the g-force of a rocket launch','Live in space'],
		correctANS: 'Eject out of aircraft and survive in water long enough to be rescued'},
	{
		compQ: "<b>How many times did the astronaut candidates have to complete the final exercise to pass?</b>",
		compOPT: ['Two','Ten','One','Five'],
		correctANS: 'Two'},
	{
		compQ: "<b>What is the narrator afraid of, aside from the water?</b>",
		compOPT: ['Heights','Snakes','Dogs','Loud noises'],
		correctANS: 'Heights'},
	{
		compQ: "<b>What gave the narrator his greatest feeling of accomplishment?</b>",
		compOPT: ['Passing the water survival course','Completing his PhD at MIT','Raising kids','Seeing Earth from space'],
		correctANS: 'Passing the water survival course'},
	{
		compQ: "<b>How often does the narrator swim, now that he is a good swimmer?</b>",
		compOPT: ['Never swam again in his life','Every weekend with his kids','Occasionally at his cottage','Every day at the local pool'],
		correctANS: 'Never swam again in his life'}
];


var NachoChallenge_array = [
	{
		compQ: "<b>Where was the narrator born?</b>",
		compOPT: ["Pakistan", "India", "Canada", "Portugal"],
		correctANS: "Pakistan"},
	{
		compQ: "<b>Where does the narrator now live?</b>",
		compOPT: ["San Francisco", "New York", "Washington DC", "New Orleans"],
		correctANS: "San Francisco"},
	{
		compQ: "<b>What was the narrator challenged to do?</b>",
		compOPT: ["Eat 8 pounds of nachos", "Run 20 km", "Raise 1000 dollars", "Eat 10 pounds of chicken wings"],
		correctANS: "Eat 8 pounds of nachos"},
	{
		compQ: "<b>What is the narrator's mother's profession?</b>",
		compOPT: ["Medical doctor", "Teacher", "Real estate agent", "Engineer"],
		correctANS: "Medical doctor"},
	{
		compQ: "<b>Where did the narrator go to college?</b>",
		compOPT: ["On the east coast of the US", "On the west coast of the US", "In Canada", "In England"],
		correctANS: "On the east coast of the US"},
	{
		compQ: "<b>What was the prize for completing the nacho challenge?</b>",
		compOPT: ["Have your picture put up on the wall", "100 dollars", "Movie tickets", "A complimentary dinner"],
		correctANS: "Have your picture put up on the wall"},
	{
		compQ: "<b>What happened to the mosque in Missouri?</b>",
		compOPT: ["It was burned down", "It was vandalized", "It was demolished", "It was renovated"],
		correctANS: "It was burned down"},
	{
		compQ: "<b>What was the only thing that remained after the fire?</b>",
		compOPT: ["A mailbox", "An amulet", "A coin", "A picture"],
		correctANS: "A mailbox"},
	{
		compQ: "<b>How did the narrator's father react to being denied a haircut?</b>",
		compOPT: ["He didn't speak about it", "He filed a lawsuit", "He got into an argument", "He cut his own hair"],
		correctANS: "He didn't speak about it"},
	{
		compQ: "<b>What does the narrator love most about Missouri?</b>",
		compOPT: ["Kansas City-style barbecue", "The Saint Louis Zoo", "The Botanical Garden", "The Titanic Museum"],
		correctANS: "Kansas City-style barbecue"}
]


var AloneAcrossTheArctic_array = [
	{
		compQ: "<b>What was the objective of the narrator's expedition?</b>",
		compOPT: ['Dogsled across Arctic America', 'Dogsled across Greenland', 'Climb Mount Kanchenjunga', 'Climb Mount Everest'],
		correctANS: 'Dogsled across Arctic America'},
	{
		compQ: "<b>How did the narrator prepare for her expedition?</b>",
		compOPT: ['Trained in Alaska learning how to dogsled', 'Exercised several hours each day', 'Practiced meditation','Practiced living on rations and taking cold showers'],
		correctANS: 'Trained in Alaska learning how to dogsled'},
	{
		compQ: "<b>Which dog on the narrator's dog team never followed instructions?</b>",
		compOPT: ['Robert', 'Douggie-dog', 'Billie', 'Max'],
		correctANS: 'Robert'},
	{
		compQ: "<b>What did the narrator do for leisure while in her tent?</b>",
		compOPT: ['Read', 'Play games on her phone', 'Paint', 'Take photos'],
		correctANS: 'Read'},
	{
		compQ: "<b>How many sponsorships did the narrator receive to support her expedition?</b>",
		compOPT: ['None', 'One', 'Ten','Fifty'],
		correctANS: 'None'},
	{
		compQ: "<b>What is the name of the narrator's neighbour?</b>",
		compOPT: ['Dave', 'Andrew', 'Alan', 'Doug'],
		correctANS: 'Dave'},
	{
		compQ: "<b>How did the narrator's neighbour respond when she told him about her expedition?</b>",
		compOPT: ['He said she was going to fail.', 'He threw her a party.', 'He offered to cover all expenses.', 'He said he was worried about her.'],
		correctANS: 'He said she was going to fail.'},
	{
		compQ: "<b>What were the weather conditions in the Arctic like the winter of the narrator&#39;s expedition?</b>",
		compOPT: ['There were fewer storms than any other winter in recorded history.', 'It was the warmest winter in recorded history.', 'There were more storms than any other winter in recorded history.', 'It was the coldest winter in recorded history.'],
		correctANS: 'There were more storms than any other winter in recorded history.'},
	{
		compQ: "<b>How did the dogs respond when they saw the bears?</b>",
		compOPT: ['Approached them', 'Ran away in shock', 'Barked aggressively', 'Whimpered and submitted'],
		correctANS: 'Approached them'},
	{
		compQ: "<b>How did the narrator's encounter with the polar bears end?</b>",
		compOPT: ['The bears walked back to their den.', 'She shot the bear with her shotgun.', 'The bear killed one of her dogs.', 'Her dogs killed the bear.'],
		correctANS: 'The bears walked back to their den.'}
];


var FamilyTreesCanBeDangerous_array = [
	{
		compQ: "<b>Where did the narrator move to?</b>",
		compOPT: ['New York City', 'New Jersey', 'New Hampshire', 'New Orleans'],
		correctANS: 'New York City'},
	{
		compQ: "<b>What award did the narrator receive?</b>",
		compOPT: ['A Nobel Prize', 'A Pulitzer Prize', 'A Grammy', 'An Oscar'],
		correctANS: 'A Nobel Prize'},
	{
		compQ: "<b>What photographs did the narrator's mother keep by her bed?</b>",
		compOPT: ['Photographs of her four children', 'Photographs of her pets', 'Photographs of her two children', 'Photographs of London'],
		correctANS: 'Photographs of her four children'},
	{
		compQ: "<b>How many children does the narrator have?</b>",
		compOPT: ['Two', 'One', 'None', 'Four'],
		correctANS: 'Two'},
	{
		compQ: "<b>What did the narrator learn as a result of his daughter's school project?</b>",
		compOPT: ['His parents are illegitimate', 'His daughter is gifted', 'He is adopted', 'His parents were having a divorce'],
		correctANS: 'His parents are illegitimate'},
	{
		compQ: "<b>What was the subject of the narrator's daughter's school project?</b>",
		compOPT: ['Family trees', 'Remote control vehicles', 'Board games', 'Documentaries'],
		correctANS: 'Family trees'},
	{
		compQ: "<b>What did the narrator need in order to receive his green card?</b>",
		compOPT: ['A different birth certificate', 'A new name', 'A degree', 'A job'],
		correctANS: 'A different birth certificate'},
	{
		compQ: "<b>Who did the narrator's birth certificate have listed as his mother?</b>",
		compOPT: ['His sister', 'His stepmother', 'His mother', 'His godmother'],
		correctANS: 'His sister'},
	{
		compQ: "<b>What is the narrator's profession?</b>",
		compOPT: ['Geneticist', 'Lawyer', 'Medical doctor', 'Comedian'],
		correctANS: 'Geneticist'},
	{
		compQ: "<b>Where did the narrator's parents retire to?</b>",
		compOPT: ['The country', 'Australia', 'Canada', 'The mountains'],
		correctANS: 'The country'}
]


var Storybooks_StoryC_array = [
	{
		compQ: "<b>What accident do the boys see on the bus?</b>",
		compOPT: ['A car is totalled', 'Someone is hit by a car', 'A biker has a heart attack', 'An elk is hit by a truck'],
		correctANS: 'A car is totalled'},
	{
		compQ: "<b>What is the name used to insult Matt?</b>",
		compOPT: ['Door Matt', 'Mattress', 'Math', 'Bath Matt'],
		correctANS: 'Door Matt'},
	{
		compQ: "<b>What advice does the older councillor give to Brad?</b>",
		compOPT: ["Don't let them get away with anything", "Don't be their friend", "Don't take yourself too seriously", "Don't oversleep"],
		correctANS: "Don't let them get away with anything"},
	{
		compQ: "<b>What is Brad's role at the camp?</b>",
		compOPT: ["Councillor", "Camper", "Teacher", "Nurse"],
		correctANS: "Councillor"},
	{
		compQ: "<b>What is the name of the teacher in the story?</b>",
		compOPT: ["Mr. Longo", "Mr. Borden", "Mr. Leblanc", "Mr. Murphy"],
		correctANS: "Mr. Longo"},
	{
		compQ: "<b>Which kid sneaks out of the cabin while all the others are asleep?</b>",
		compOPT: ["Matt", "Mike", "Billy", "Marc"],
		correctANS: "Matt"},
	{
		compQ: "<b>What does Mr. Longo give to the councillors before leaving them for the night?</b>",
		compOPT: ["Whistles", "Donuts", "Money", "Necklaces"],
		correctANS: "Whistles"},
	{
		compQ: "<b>How does the fight between Matt and Brad end?</b>",
		compOPT: ["Brad falls over the side of the cliff", "Matt and Brad walk bak to the cabin", "Matt is sent to the hospital", "Mr. Longo scolds them for fighting"],
		correctANS: "Brad falls over the side of the cliff"},
	{
		compQ: "<b>What is the name of the camp in the story?</b>",
		compOPT: ["Camp Hope", "Camp Argyle", "Camp Adanack", "Camp Canary"],
		correctANS: "Camp Hope"},
	{
		compQ: "<b>How does Brad fall when looking for Matt?</b>",
		compOPT: ["He trips on his shoelaces", "He gets tired and collapses", "He is pushed", "He runs into a tree and loses consciousness"],
		correctANS: "He trips on his shoelaces"}
]


var Storybooks_StoryF_array = [
	{
		compQ: "<b>How is Ryan's mom feeling on the morning of the lottery win?</b>",
		compOPT: ['Happy', 'Depressed', 'Angry', 'Desperate'],
		correctANS: 'Happy'},
	{
		compQ: "<b>How much money does Ryan's mother win in the lottery?</b>",
		compOPT: ['$1.2 million', '$1000', '$1 billion', '$100 million'],
		correctANS: '$1.2 million'},
	{
		compQ: "<b>How does Ryan react when his mom wins the lottery?</b>",
		compOPT: ['He tells her to be careful', 'He jumps for joy', 'He asks her to buy him a dog', 'He tells her to donate it to charity'],
		correctANS: 'He tells her to be careful'},
	{
		compQ: "<b>Who spreads the news about the lottery win?</b>",
		compOPT: ["Josh", "Ryan", "Ryan's mom", "The neighbor"],
		correctANS: "Josh"},
	{
		compQ: "<b>What is the first thing Ryan's mom buys with the jackpot money?</b>",
		compOPT: ["A pink Jeep", "A horse", "A new house", "A new TV"],
		correctANS: "A pink Jeep"},
	{
		compQ: "<b>Where are Ryan and his mom living at the start of the story?</b>",
		compOPT: ["A motel", "A motorhome", "A car", "Their apartment"],
		correctANS: "A motel"},
	{
		compQ: "<b>What does Ryan's mom always make for Ryan to eat?</b>",
		compOPT: ["Beans and hotdogs", "Macaroni and cheese", "Soup", "Casserole"],
		correctANS: "Beans and hotdogs"},
	{
		compQ: "<b>Where is Ryan's father at the start of the story?</b>",
		compOPT: ["In jail", "At home", "In school", "At work"],
		correctANS: "In jail"},
	{
		compQ: "<b>What does Ryan's mom tell Uncle Fred she wants to do with the jackpot money?</b>",
		compOPT: ["Buy the motel", "Move somewhere tropical", "Retire", "Buy a sports team"],
		correctANS: "Buy the motel"},
	{
		compQ: "<b>Who does Ryan's mom share the jackpot money with?</b>",
		compOPT: ["All her friends", "Nobody", "Only her son", "Only family"],
		correctANS: "All her friends"}
]


SleepWithMe_array               = shuffle_choices(SleepWithMe_array);
TheBoundsOfComedy_array         = shuffle_choices(TheBoundsOfComedy_array);
SwimmingWithAstronauts_array    = shuffle_choices(SwimmingWithAstronauts_array);
NachoChallenge_array            = shuffle_choices(NachoChallenge_array);
AloneAcrossTheArctic_array      = shuffle_choices(AloneAcrossTheArctic_array);
FamilyTreesCanBeDangerous_array = shuffle_choices(FamilyTreesCanBeDangerous_array);
Storybooks_StoryC_array         = shuffle_choices(Storybooks_StoryC_array);
Storybooks_StoryF_array         = shuffle_choices(Storybooks_StoryF_array);







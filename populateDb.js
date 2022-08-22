#! /usr/bin/env node

// console.log(
//   "This script populates some test items and categories to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
// );

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/product");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];

function categoryCreate(name, image, cb) {
  var category = new Category({ name: name, image: image });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, price, stock, image, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
    image: image,
  };
  if (category != false) itemdetail.category = category;

  var item = new Item(itemdetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Accessories",
          "https://images.unsplash.com/photo-1625173925005-0043774fe954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9sZXBsYXlpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Boardgames",
          "https://images.unsplash.com/photo-1610890715986-5654e32615de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Tabletop RPG",
          "https://sm.ign.com/ign_in/feature/w/which-tabl/which-tabletop-rpg-is-right-for-you_geqe.jpg",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Minis",
          "https://s3-eu-west-1.amazonaws.com/images.linnlive.com/cb42c9966d1b6e7c11bf48067f776b6e/14dcbdad-cf0a-4e88-813f-7b969a1a6973.jpg",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Battlemaps",
          "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/05/Untitled-design-44.jpg",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Wargames",
          "https://1.bp.blogspot.com/-E2zCcXTKKr8/X2mq1vxq2dI/AAAAAAAABpI/MnJc2lnQarckKAVTuG3nDoP9YjtUdnCvwCLcBGAsYHQ/s2048/IMGP4293.JPG",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Card Games",
          "https://cdn.vox-cdn.com/thumbor/y-vycAAenG9ziEcA6YvsgFatEos=/0x196:1600x1263/1200x800/filters:focal(0x196:1600x1263)/cdn.vox-cdn.com/uploads/chorus_image/image/48450793/s-l1600.0.0.jpg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Tome of Adventure Design (Revised)",
          "Tome of Adventure Design is a comprehensive, start-to-finish resource for designing fantasy adventures for your favorite tabletop role-playing game. It is system neutral, and can be used with virtually any fantasy game. This book includes random generation tables for almost every step of the design process: locations, villainous plots, designing new monsters, and bizarre environments in strange, unknown planes of existence. Thousands of micro-prompts in the margins add additional brainstorming power to the process, and the book is filled with design advice from award-winning author Matt Finch.",
          categories[2],
          25.99,
          3,
          "https://d1vzi28wh99zvq.cloudfront.net/images/2725/396154.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Savage Worlds Adventure Edition",
          "Savage Worlds is a Fast! Furious! and Fun! rules system for any genre of roleplaying game.\n\nCreate your own setting, convert an existing one, or pick up one of our amazing settings like Deadlands, Rippers, or 50 Fathoms. The rules give players plenty of depth to create their characters and keep bookkeeping to a minimum for the Game Master. If you’re looking for a game that’s fast and easy to set up, run, and play, Savage Worlds is for you!\n\nSavage Worlds handles pulp action, gritty noir, supers, hard scifi, space opera, horror,and anything you can imagine!\n\nSavage Worlds Adventure Edition is the latest version of Savage Worlds. It does not, however, invalidate prior printings of the rules, which you can continue to enjoy.",
          categories[2],
          24.99,
          6,
          "https://d1vzi28wh99zvq.cloudfront.net/images/27/261539.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Call of Cthulhu 7th Edition - Keeper's Rulebook",
          "Call of Cthulhu is Chaosium's tabletop roleplaying game based upon the worlds of H. P. Lovecraft. It is a game of secrets, mysteries, and horror. Playing the role of steadfast investigators, you travel to strange and dangerous places, uncover foul plots, and stand against the terrors of the Cthulhu Mythos. You encounter sanity-blasting entities, monsters, and insane cultists. Within strange and forgotten tomes of lore you discover revelations that man was not meant to know. You and your companions may very well decide the fate of the world.",
          categories[2],
          38.99,
          10,
          "https://d1vzi28wh99zvq.cloudfront.net/images/2/150997.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kingdomino",
          "In the best-selling family classic, you are a king seeking new lands to expand your kingdom. Match tiles, claim crowns and expand your land to build the most impressive Kingdom!\n\nBut be careful, other kings will try and claim the same terrain!\n\nKingdomino was crowned “Game of the Year” in 2017",
          categories[1],
          19.99,
          4,
          "https://i1.wp.com/geekdad.com/wp-content/uploads/2017/03/Kingdomino-cover.jpg?resize=1000%2C1014&ssl=1",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mysterium",
          "Mysterium, by Libellud, is a game of deduction. A group of players work as a team to decipher the true meanings of cryptic ‘visions’ sent from a ghost. Mysterium is highly thematic with gorgeous components, allowing players to be inventive and interact with lots of table discussion.\n\nIn Mysterium, players take on the roles of gifted mediums with the ability to communicate with the undead. One player becomes the ghost whose spirit is doomed to haunt the mansion forever after becoming the victim of a hideous crime. This player attempts to reveal to the others the truth of what actually happened; who murdered them, how they did it and where it took place. Each medium is secretly given a selection of three potential combinations, noted behind the ghost player's cardboard screen. The mediums are working towards their own goals independent of each other. However, they still work as one team. All players win or lose as a group.",
          categories[1],
          38.99,
          6,
          "https://cdn.shopify.com/s/files/1/1138/0520/products/image_fe7709cd-0e9b-43ab-87fa-6ed3e9baa311_1024x1024.jpg?v=1602680301",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Portable Dice Tray",
          "Protect your playing surface and keep your dice organised. This handy dice tray that folds flat for easy storage and travel.",
          categories[0],
          9.99,
          15,
          "https://cdn.shopify.com/s/files/1/0396/7320/0807/products/57195c5680945412aa9fe61d7518bd15_72f81085-cc41-42c3-a708-f45fb2301dd3_720x.jpg?v=1626975722",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Rune Stryders: Fantasy-Mecha RPG",
          "Civil war threatens to engulf the world of Rhun. While the peoples of the Divaros, Myndwar, and Zokili collectively control the northern lands as the Confederated Nations, the scattered lands to the south are held by the Outcast Nations of the Kantarin, Sivatagi, and Draslander. Driven long ago from their homelands into areas then deemed uninhabitable, the Outcast Nations wait impatiently for their chance to strike back at the countries that have enforced their exile for so many years.   Political machinations, roguery, spying, assassination, and secretive military strikes against neighboring countries mean that the Confederated Nations are not nearly as united as their lofty name might suggest. And the Outcast Nations are hardly mere victims and refugees, representing a political, economic, and military force with which to be reckoned, both individually and collectively.   Heroes versed in the magical power of Runes stand against the tide of chaos. For not only is their knowledge of magic great, they can use it to bring Stryders to life. These towering war machines come in many shapes and sizes, some forged from steel, others carved from stone, and still others grown from living plants and giant insects. All are mighty in their own right, highly prized and jealously guarded by their pilots, crews, and patrons.   This is a complete roleplaying game including all the rules needed to create characters, resolve conflicts, cast Runes, and use and design Stryders.",
          categories[2],
          27.99,
          2,
          "https://d1vzi28wh99zvq.cloudfront.net/images/32/12187.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Dwarrowdeep",
          "A new megadungeon from Three Castles Award Winner (2018) and Barrowmaze author Dr. Greg Gillespie!  Gundgathol lies in ruin. Over 250 years ago, an evil host rose from the underdark and pushed the dwarves out of their ancestral mountains. Since that time, orcs and worse have defiled their sacred halls. In recent days, the high dwarven clerics cast their runestones and read the portents: the time has come to retake Gundgathol. Are you brave (or fooloish) enough to enter Dwarrowdeep?  Dwarrowdeep will keep your players on their toes and your campaign going strong for years.  Dwarrowdeep is brought to you by the Old School Renaissance (so don’t forget your 10’ pole).  This project was created through a group of awesome backers from Kickstarter. Without them, this project wouldn't have happened. Thank you for your support!  Check my drivethrurpg profile for all sorts of additional Barrowmaze material.  This megadungeon adventure includes an all-star cast of Ex-TSR artists including Darlene, Larry Elmore, Tim Truman, Jeff Dee, and Diesel. It features 150 unique zipitomes (art that tells a story of iconic adventurers along the bottom of the page) illustrated by Peter Pagano.  Dwarrowdeep is the single largest dwarven themed adventure in the history of role-playing games.",
          categories[2],
          75,
          5,
          "https://d1vzi28wh99zvq.cloudfront.net/images/4249/384269.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Traveller: Exploer's Edition",
          "Traveller is the science fiction roleplaying game of the far future. The Traveller Explorers’ Edition is an introduction to the game for newcomers that provides all of the tools you need to create adventures or even an entire campaign. Create bold scouts and intrepid scientists who travel into the unknown aboard their trusty Type-S Scout/Courier, a rugged exploration ship perfect for the job.  Dock your ship at advanced starports, visit strange worlds, encounter alien beings and animals, and take on the challenges that the galaxy sets before you.  The Explorer’s Edition provides all core game rules for Traveller, plus a universe creation system that allows referees to create new star systems on the fly for their players to visit and explore…  The universe awaits. Welcome to Traveller!",
          categories[2],
          9.99,
          4,
          "https://d1vzi28wh99zvq.cloudfront.net/images/45/380244.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Codenames",
          "Codenames, a party game suitable for 2-8 players, sees you working alongside your teammates and nominated spymaster to find your fellow agents in the field, while also making sure to avoid the innocent bystanders - and the dangerous assassin!  Czech Games Edition's Codenames is a fantastic, easy-to-play word association game. Players split into two teams, each team having a nominated spymaster. Spymasters are given a grid that details the exact location of all their agents in the field. It is up to the spymasters to communicate the locations of the agents to their teammates. However, there is one big catch! The locations are all associated with words, and the only way to communicate these is to give one-word clues.  Once a clue has been given, it's up to the team to work out which words the spymaster is trying to communicate to you. If you select a correct word, well done, you’ve found a fellow agent! Be careful though, select a wrong word and one of three things can happen! You could have mistaken an innocent bystander for an agent, a rather foolish thing to do! You could have found one of the other team's agents, which will simply give them the upper hand! But worst of all, you could find the dangerous assassin. Find him, and it's game over for you my friend!  Work together and find all your agents to be victorious and successfully complete your mission! This game will have you on the edge of your seat. Be careful, because when you think you’ve found the word, you may just start second-guessing yourself!  Codenames is a great party game and one that has grown in popularity massively. It's an essential game for anyone's collection and it’s sure to be a hit with all!",
          categories[1],
          18.95,
          2,
          "https://cdn.shoplightspeed.com/shops/626858/files/23318216/1600x2048x2/cge-codenames-game.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "7 Wonders: Duel",
          "Given its title, 7 Wonders: Duel will come as no surprise to you being a two-player game. This is not an expansion or variant of its popular parent game 7 Wonders (also published by Repos Production), but instead a separate card game all on its own, specifically designed for just you and one other opponent to battle it out to construct man-made wonders of the world.  7 Wonders: Duel does not rely on all players drafting a card and then passing their hand over to their neighbour. Instead, Antoine Bauza has teamed up with fellow French designer Bruno Cathala to create a different way of gaining cards for set collection that’s equally enthralling, if not more so.  Again, 7 Wonders: Duel is played over three rounds. Cards are pre-arranged into a communal pyramid-like display, partially covering each other. The majority of them are face-down, while the lowest level ones are face-up. The categories will be familiar to those who have played 7 Wonders (green science cards, brown/grey resources, red military, and so on). Players may take any card they like from the pyramid to add to their own tableau – but only if it is completely uncovered.  As cards are removed, more cards’ identities are revealed. Therefore, it becomes a case of timing your moves to perfection, trying to force your opponent into removing cards that then allow you to grab the exact card you want!  Unlike regular 7 Wonders, in Duel players can win before the third round has ended. A player could earn a military victory by getting the military pawn to the end of the conflict track (kind of similar to the swing in power that you find in games like Twilight Struggle). Alternatively, they could earn a science victory by collecting each of the six different science symbols. Therefore you’ll have to keep a close eye on what your opponent is taking – you can’t afford to let them get too far ahead! If neither of these victory conditions is met by the end of the third round, then sets are scored to determine a winner.  For some board gamers, player counts can really make or break a game. If you love 7 Wonders but you’re in a position where you play a lot of games with just you and a partner, then 7 Wonders Duel is going to be a great choice for you. With rounds lasting approximately 10 minutes each, games can last about 30 minutes in total. And, considering its high replayability factor, it fits beautifully into that category of ‘go on then, one more game…’",
          categories[1],
          24.99,
          5,
          "",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Adeptus Custodes Custodian Guard",
          "This multi-part plastic kit contains the components necessary to assemble a set of 5 Adeptus Custodes Custodian Guard. The kit can be used to build 1 of 2 different",
          categories[3],
          36.0,
          4,
          "https://cdn.shopify.com/s/files/1/0800/4331/products/AdeptusCustodesCustodianGuard_800x.jpg?v=1659007977",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kromlech - Sindari - Grim Havesters Team (3)",
          "Grim Harvesters are the elite warriors coven founded among the Sindari. Due to their unmatchable combat experience they were entrusted with powerful heavy launchers. Equipped with such deadly weapons and clad in frightening dark armours, they bring death and destruction to every battlefield they set foot on.  This set contains three high quality resin miniatures of Sindari Grim Harvesters. One model may be equipped with heavy launcher. Three 28.5mm plastic bases and elastic resin tubes included. Designed to fit 28mm heroic scale wargames.",
          categories[3],
          21.5,
          5,
          "https://www.firestormgames.co.uk/uploads/images/Product%20Images/Wargames%20%2B%20Miniatures/Kromlech/Shindari/KRM192.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Battlemech: Wolverine Single Mech",
          "Contains 1 pre-built plastic battle mech, Alpha-strike unit card, and pilot card.",
          categories[3],
          7.5,
          6,
          "https://cdn.shopify.com/s/files/1/0800/4331/products/wolverine_400x.jpg?v=1655981882",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kromlech - Sindari – Warsinger",
          "Warsingers are the most respected figures in the Sindari society. Their psychic talents allow them to channel mystic energy the way it helps them in combat. To master those uncanny abilities requires a great deal of willpower and self-discipline as well as decades of learning.  This set contains one high quality resin miniature of Sindari Warsinger with optional weapons - sword, spear and staff. Plastic 32mm base included. Designed to fit 28mm heroic scale wargames.",
          categories[3],
          7.65,
          2,
          "https://www.firestormgames.co.uk/uploads/images/Product%20Images/Wargames%20%2B%20Miniatures/Kromlech/Shindari/KRM198.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "A3 D&D Battle Map Book w/ 1 inch squares ",
          "This dry-erase D&D Battle Map Book contains 24 different settings for your adventures. Find the one best fitting your current setting and let your imagination flow!  The RPG Book is a perfect tool for any GM/DM - it contains 22 detailed landscapes and 2 generic designs to host an adventure in all possible settings.  After opening all pages lay completely flat, and are covered with a dry-erase layer. You can connect several Books to create an even larger area of encounter.",
          categories[4],
          42.99,
          1,
          "https://cdn.shopify.com/s/files/1/0018/1872/2355/products/a3-rpg-book-square-grid_2000x.jpg?v=1648812732",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "The Wilderness Books of Battle Mats",
          "The Wilderness Books of Battle Mats are the third in Loke’s trilogy of fantasy modular map books. Following Towns & Taverns and the ENnie winning Dungeon, The Wilderness is a pair of modular map books that make storytelling easy.  From frozen tundra to arid deserts, through caves, across moorland to stormy coasts & seas, all the essential fantasy biomes are here!  The two books feature modular complimentary maps to allow them to align to create huge maps with many different combinations. Wipe clean and featuring a 1” grid throughout, these maps are durable, beautiful and customisable!  The handy book format allows the maps to be used individually for smaller encounters and tables. The books have 80 map pages, creating maps up to 2x2 foot, in a book that fits in your bag or on your shelf!",
          categories[4],
          38.49,
          2,
          "https://cdn.shopify.com/s/files/1/0282/5774/7047/products/Slip-Cover-Wilderness_1024x1024@2x.jpg?v=1650462957",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Box of Adventure - Coast of Dread",
          "Loke Battle Mats’ Box of Adventure – Coast of Dread –  is the system agnostic kit you have been waiting for. It combines modular maps and tokens of monsters, baddies and NPCs, everything you need to run any fantasy RPG. There are also terrain tokens and building tokens. As a result you can customise the maps and build your encounter areas however you want them.",
          categories[4],
          35,
          2,
          "https://cdn.shopify.com/s/files/1/0282/5774/7047/products/Front-CoverCoastofDread_1024x1024@2x.jpg?v=1659017803",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Infamy, Infamy!",
          "Wargames Rules for large Skirmishes in the Ancient world. 60BC to 100AD.   Comes with a free deck of Infamy, Infamy! cards  ",
          categories[5],
          35.0,
          1,
          "https://www.wargamestore.com/images/P/bp1728.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Age of Sigmar: Season Of War Thondia",
          "As the Era of the Beast rages on, the savage realm of Ghur awakens and the bone-strewn plains of Thondia are consumed by war. A wellspring of primordial energy has burst its banks, spilling out and settling into the souls of mortals. Rival powers fight tooth and claw in the wastes, strange dreams echo with monstrous roars, and outbreaks of animalistic mutation transform common folk into wrathful beasts. Yet all this pales before the rise of a fierce new force in the cosmos: the mystical incarnates. When the dust settles, the Mortal Realms will never be the same again.   Season of War: Thondia is the first in a new series of expansion books for Warhammer Age of Sigmar, containing a mixture of detailed background lore, gripping story, and immersive rules for the conflicts shaping the narrative of the Mortal Realms.   Inside this 112-page hardback book, you'll find:   - An exciting narrative exploring the wild Realm of Beasts, as the Prime Huntress Yndrasta investigates the strange events transforming the land - Detailed maps, history, and lore for Ghur, including a bestiary of the flora, fauna, and factions that make their homes on the alpha-continent of Thondia - Rules for using the Krondspine Incarnate of Ghur, a powerful new unit type available to all factions, plus warscroll battalions and battleplans for recreating the story of Season of War: Thondia - Realm rules for fighting in Thondia, including Realmsphere magic, monstrous denizens, and mysterious terrain, plus an open play battlepack for randomly generating your own Ghurish battleplan - A narrative Path to Glory battlepack for founding your own Thondian outpost to explore the Realm of Beasts, plus Anvil of Apotheosis rules for creating Ghurish heroes - A matched play Strife in Thondia battlepack including core battalions, battle tactics, grand strategies, campaign rules, and battleplans for matched play games.",
          categories[5],
          24.5,
          3,
          "https://www.wargamestore.com/images/P/https___trade.games-workshop.com_assets_2022_04_60040299120_EngAoSSeasonofWarThondiaBook01.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Dragon Rampant Fantasy Wargaming Rules",
          "Whether you're a nameless Dark Lord looking to conquer the known world, a Champion of Light holding out against the forces of evil or a Northern barbarian facing claimants to a stolen throne, Dragon Rampant allows you to bring those battles to the tabletop. Developed from the popular Lion Rampant system, Dragon Rampant is a standalone wargame that recreates the great battles of Fantasy fiction. Scenarios, army lists, and full rules for magic and monsters give players the opportunity to command unruly orc warbands, raise armies of the undead, campaign across an antediluvian world as the warchief of a barbarian tribe, or exploit the power of mighty creatures and extraordinary sorcery. An army usually consists of 6-8 units comprised of 6-12 individually based figures. These small units move and fight independently, assuming that they follow your orders rather than just doing their own thing. Command and control is just as important on the battlefield as the power of a troll chieftain or the magic of an archmage.",
          categories[5],
          10.39,
          1,
          "https://www.wargamestore.com/images/P/9781472815712_4_2_8.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Fighting Sail – Fleet Actions 1775–1815",
          "In the years between 1776 and 1815, grand square-rigged sailing ships dominated warfare on the high seas. Fighting Sail is a tabletop wargame of fleet battles in this age of canvas, cannon, and timbers. Players take on the roles of fleet admirals in battles ranging from the American War of Independence to the Napoleonic Wars and the War of 1812. Each fleet has access to different ships, tactics, and command personalities - each with its own strengths and weaknesses. Offering a unique blend of detail and simplicity, the scenarios included enable the recreation of historic actions or 'what-if' scenarios. Join the battle and experience the adventurous age of the fighting sail!  The author, Ryan Miller started designing games at the age of 11, and hasn’t stopped since. Through a series of fortunate events, coupled with hard work, he found himself working as a brand manager at Wizards of the Coast in 2000, but left in 2001 to found Sabertooth Games – his first professional game design gig. He recently completed a 10-year tour as senior game designer at Wizards of the Coast. ",
          categories[5],
          9.59,
          1,
          "https://www.wargamestore.com/images/P/9781472807700_1_1_2_2_1_1_1_10.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kings of War 3rd Edition Rulebook",
          " Welcome to Kings of War, and prepare to rally your forces to fight epic battles in the best and biggest fantasy mass-battle game. Choose your side and then command an army of Mantic miniatures to represent incredible armies such as the stoic and pious Basileans, or plot your opponent’s downfall with the wicked forces of the Abyss. With a huge variety of models and armies to choose from and many stories to tell, Kings of War is truly an amazing experience.",
          categories[5],
          27.95,
          2,
          "https://www.wargamestore.com/images/P/kow-3.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Dungeons & Dragons: Dungeon Mayhem Card Game ",
          "In this action-packed Dungeons & Dragons card game, you win by being the last adventurer standing.  Play as one of four brave, quirky characters—Barbarian, Paladin, Rogue, or Wizard—battling it out in a dungeon full of treasure! With magic missiles flinging, dual daggers slinging, and spiked shields dinging, it's up to you to prove your adventurer has the guts to bring home the glory!  Illustrations created by Kyle Ferrin in the four decks of cards represent Sutha the Skullcrusher (barbarian), Azzan the Mystic (wizard), Lia the Radiant (paladin), and Oriax the Clever (rogue). Pick one of these characters and play their mighty power cards such as Azzan’s Vampiric Touch to swap hit points with an opponent or Sutha’s Whirling Axes to heal yourself while dealing crushing damage to the rest of the party.",
          categories[6],
          11.99,
          2,
          "https://media.rainpos.com/7382/81crmizkxcl_sl1500__20190111103843.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Unstable Unicorns",
          "Unstable Unicorns is a strategic card game that will destroy your friendships...but in a good way. The game was one of Kickstarter’s top 100 most backed projects of all time and won the 2019 People’s Choice Award for Toy of the Year.  ",
          categories[6],
          19.99,
          2,
          "https://cdn.waterstones.com/override/v1/large/0810/2700/0810270030825.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "P For Pizza Card Game",
          "It's takeaway time! Tuck into this fast paced word game where the aim is to shout out a word that links the letter on one card to the category on another. You’ll end up adding this yummy party game into your top 10 family games.  Get it while it's hot! A food that starts with P? A bald celebrity that begins with B? A string instrument that starts with G? Or C? Or V? You’ll have to be quick to win your slice of the pie in this party game.  Grab a slice of the action! The first player to collect nine pizza cards and build their giant pizza slice - wins!  Crazy colour-coded categories - each category card is coloured green, amber and red for levels of difficulty which affects where you can place your winnings in your pizza pyramid. All the family can enjoy this simple board game for kids and adults.  Easy to learn, quick to play! A delicious family party game for between 2 and 4 players, ages 8+ perfect for some christmas fun, oh and it’s plastic free... it’s almost good enough to eat! (But maybe order a real pizza if you get hungry) ",
          categories[6],
          12.99,
          1,
          "",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Dice Scroll",
          "The Dice Scroll is not only perfect for storing those extra special dice but also act as an excellent dice rolling mat.  Available in a choice of 3 colours, Maroon, Brown and Black, the scroll is made from PU leather, ideal for keeping your precious math rocks safe and sound whilst on the go. ",
          categories[0],
          15.99,
          7,
          "https://i.etsystatic.com/21209935/r/il/ce9bc7/3868302719/il_794xN.3868302719_gm21.jpg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Zip-Close Dice Box & Storage Case with Removable Dice Tray",
          "Store and display up to 6 sets of standard polyhedral dice. The slotted dice tray is removable leaving the bottom section of the case usable as a dice tray. The cover comes embossed with the Forged Dice Co. flaming D20 logo as well as the zipper pulls. Exterior dimensions are 10 inches by 7.5 inches and 1.5 inches deep. Interior is 8.75 x 6.75 inches. Large enough to hold 6 full sets yet compact enough to fit in bags or carry on its own. The perfect travel case for D&D dice. ",
          categories[0],
          22.95,
          4,
          "https://cdn.shopify.com/s/files/1/0396/7320/0807/products/1f0bc46ae0660a0c755e87eaa7a4f8d8_720x.jpg?v=1647556536",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("All items uploaded");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

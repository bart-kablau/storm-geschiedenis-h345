/* content.js: Geschiedenis, Tijd voor Geschiedenis leerjaar 2 (havo 2): 3.5, 4.2, 4.3, 4.4, 4.5 en 5.2.
   Vak-app op de canonieke oefen-engine (tools/oefen-engine). begripVak.

   Bron: 01-input/werkboek-scrape (het werkboek is de maat; jaartallen van het werkboek, fouten niet herhaald)
   en het ontwerp docs/superpowers/specs/2026-10-16-geschiedenis-h3-h5-design.md.
   Opbouw van LEERSTOF (25 onderwerpen):
     formuleren (formuleertraining) · 3.5 (3) · 4.2 (3) · 4.3 (3) · 4.4 (7, hergebruikt uit de app van
     16-09-2026 en aangevuld) · 4.5 (3) · 5.2 (3) · wie-is-wie · tijdlijn.
   Formuleertraining: vraagtype "formuleer" (zelf schrijven, modelantwoord in stappen, checklist);
   zie tools/oefen-engine/CLAUDE.md. Storm haalt R 82 % maar T2 0 % en I 21-33 %: daarom heeft elk
   onderwerp formuleervragen op Zilver en Goud.
   Onderwerpen hebben `extra` (links naar de werkboekfilmpjes, alleen links) en `video` (zie FILMS). */

/* ======================================================================================
   FILMS: HIER VUL JE DE VIDEO-ID'S IN (hoofdbouwer)
   Per onderwerp-id de videoId van de film die dat onderwerp uitlegt (videoId uit het draaiboek
   tools/remotion-leren/films/geschiedenis-*.json). Een lijst mag ook: de eerste film die in
   video/manifest.js staat, wordt de knop "Bekijk de uitleg-video" bij dat onderwerp.
   FILM_TITELS: titel en emoji voor de Films-tegel (VAK.films), op volgorde van kijken.
   Films die (nog) niet in video/manifest.js staan, laat de app vanzelf weg.
   ====================================================================================== */
window.FILM_PER_ONDERWERP = {
  "formuleren":               null,
  "luther-kritiek":           "kerkscheuring-luther",   // 3.5.1
  "reformatie":               "kerkscheuring-luther",   // 3.5.2
  "worms-augsburg":           "kerkscheuring-keizer",   // 3.5.3
  "bourgondiers":             "bourgondiers-huwelijk",   // 4.2.1
  "staatsvorming":            "bourgondiers-centralisatie",   // 4.2.2
  "groot-privilege":          "bourgondiers-centralisatie",   // 4.2.3
  "karel-v":                  "karel-wereldrijk",   // 4.3.1
  "calvinisme":               "karel-geloof",   // 4.3.2
  "bloedplakkaten":           "karel-geloof",   // 4.3.3
  "filips-botst":             "opstand-filips",         // 4.4.1
  "smeekschrift":             "opstand-filips",         // 4.4.1
  "beeldenstorm":             "opstand-beeldenstorm",   // 4.4.2
  "alva":                     "opstand-beeldenstorm",   // 4.4.2
  "opstand-begint":           "opstand-eigen-land",   // 4.4.3
  "republiek":                "opstand-republiek",   // 4.4.3
  "oorzaak-gevolg":           "opstand-beeldenstorm",   // vaardigheid 4.4
  "maurits":                  "strijd-maurits",   // 4.5.1
  "stadhouder-landsadvocaat": "strijd-oldenbarnevelt",   // 4.5.2
  "vrede-munster":            "strijd-oldenbarnevelt",   // 4.5.3
  "amsterdam-handel":         "gouden-eeuw-amsterdam",   // 5.2.1
  "voc":                      ["gouden-eeuw-amsterdam", "gouden-eeuw-voc-wic"],   // 5.2.2
  "wic":                      "gouden-eeuw-voc-wic",   // 5.2.3
  "wie-is-wie":               null,
  "tijdlijn":                 "tijdlijn-rode-draad"    // hier past de tijdlijnfilm
};
window.FILM_TITELS = [
  { id: "tijdlijn-rode-draad", titel: "De rode draad · Twee draden, één knoop", emoji: "🧵", thema: "Alles samen" },
  { id: "kerkscheuring-luther", titel: "3.5 · Eén monnik tegen de paus", emoji: "📜", thema: "3.5 Een kerkelijke scheuring" },
  { id: "kerkscheuring-keizer", titel: "3.5 · Luther tegen de keizer", emoji: "⚖️", thema: "3.5 Een kerkelijke scheuring" },
  { id: "bourgondiers-huwelijk", titel: "4.2 · Eén familie, veel gewesten", emoji: "💍", thema: "4.2 Buitenlandse bemoeienis" },
  { id: "bourgondiers-centralisatie", titel: "4.2 · Touwtrekken om de macht", emoji: "🪢", thema: "4.2 Buitenlandse bemoeienis" },
  { id: "karel-wereldrijk", titel: "4.3 · Karel V: baas van een wereldrijk", emoji: "🌍", thema: "4.3 Keizerlijke Karel" },
  { id: "karel-geloof", titel: "4.3 · Ketters, vuur en een vermoeide keizer", emoji: "🔥", thema: "4.3 Keizerlijke Karel" },
  { id: "opstand-filips", titel: "4.4 · Een nieuwe vorst, drie problemen", emoji: "👑", thema: "4.4 Een onrustige opstand" },
  { id: "opstand-beeldenstorm", titel: "4.4 · Van Beeldenstorm tot opstand", emoji: "🔨", thema: "4.4 Een onrustige opstand" },
  { id: "opstand-eigen-land", titel: "4.4 · Geuzen, Den Briel en Leiden", emoji: "⛵", thema: "4.4 Een onrustige opstand" },
  { id: "opstand-republiek", titel: "4.4 · Een land zonder koning", emoji: "🏛️", thema: "4.4 Een onrustige opstand" },
  { id: "strijd-maurits", titel: "4.5 · Maurits slaat terug", emoji: "🛡️", thema: "4.5 De strijd beslecht" },
  { id: "strijd-oldenbarnevelt", titel: "4.5 · Stadhouder tegen landsadvocaat", emoji: "⚔️", thema: "4.5 De strijd beslecht" },
  { id: "gouden-eeuw-amsterdam", titel: "5.2 · Hoe Amsterdam rijk werd", emoji: "💰", thema: "5.2 Een glorieuze Gouden Eeuw" },
  { id: "gouden-eeuw-voc-wic", titel: "5.2 · VOC en WIC: de wereld rond", emoji: "🌏", thema: "5.2 Een glorieuze Gouden Eeuw" }
];

window.VAK = {
  id: "geschiedenis_h345",
  store: "storm_geschiedenis_h345_v1",
  titel: "Geschiedenis: van Luther tot Gouden Eeuw",
  brand: "Geschiedenis met Storm",
  badge: "GS",
  mascotEmoji: "🛡️",
  doelLabel: "begrip",
  spiekTitel: "Geschiedenis 3.5 tot 5.2: begrippen, jaartallen en regels",
  wiskunde: false,
  begripVak: true,
  spraak: { vraagLang: "nl-NL", antwoordLang: "nl-NL" },
  matching: { stripInfinitief: false, accentTolerant: true, lidwoordTolerant: false },
  masteryHits: 2,
  stapelGrootte: 6,
  proefPerOnderwerp: 1,
  tegels: ["leerstof", "begrippen", "proeftoets", "spiekblad"],
  tegelProef: { em: "📝", h: "Proeftoets", p: "Alle zes paragrafen door elkaar, zoals op de toets" },
  proefTitel: "Proeftoets geschiedenis",
  films: window.FILM_TITELS
};

/* Werkboekfilmpjes per paragraaf ("Extra kijken"): alleen links, er wordt niets gekopieerd. */
window.EXTRA_KIJKEN = {
  "3.5": [
    { titel: "De 95 stellingen van Luther", sub: "SchoolTV, 3 min", url: "https://schooltv.nl/item/95-stellingen-maarten-luther-heeft-kritiek-op-de-kerk" },
    { titel: "Histoclip: Luther en de Hervorming", sub: "SchoolTV, 14 min", url: "https://schooltv.nl/item/histoclips-luther-en-de-hervorming" },
    { titel: "De rijksdag van Worms (bron 6)", sub: "YouTube, kijk van 9:26 tot 11:07", url: "https://www.youtube.com/watch?v=g68tGKm-Ios&t=9m26s" }
  ],
  "4.2": [
    { titel: "Huwelijkspolitiek van Filips de Stoute (bron 6)", sub: "YouTube, 2 min", url: "https://www.youtube.com/watch?v=_JEknP7pVEs" },
    { titel: "Portretten van Maria en Maximiliaan", sub: "YouTube, 1 min", url: "https://www.youtube.com/watch?v=u0gBNiornYs" },
    { titel: "500 jaar Staten-Generaal", sub: "YouTube", url: "https://www.youtube.com/watch?v=ugs3sliLn1o" }
  ],
  "4.3": [
    { titel: "Karel V, keizer van een enorm groot rijk (bron 1)", sub: "SchoolTV, 2,5 min", url: "https://schooltv.nl/video/karel-v-keizer-van-een-enorm-groot-rijk" },
    { titel: "Het Klokhuis: Karel de Vijfde", sub: "SchoolTV", url: "https://schooltv.nl/item/het-klokhuis-canon-karel-de-vijfde" },
    { titel: "Calvijn en het calvinisme in een minuut", sub: "YouTube, 1 min", url: "https://youtu.be/NTZ5YKmI42U" }
  ],
  "4.4": [
    { titel: "De Beeldenstorm: godsdienststrijd in de Nederlanden (bron 3)", sub: "SchoolTV, kijk van 2:14 tot 4:05", url: "https://schooltv.nl/video/de-beeldenstorm-godsdienststrijd-in-de-nederlanden" },
    { titel: "Op 1 april verliest Alva zijn bril", sub: "SchoolTV", url: "https://schooltv.nl/item/vroeger-zo-op-1-april-verliest-alva-zijn-bril" },
    { titel: "De watergeuzen: water als wapen", sub: "SchoolTV, 5 min", url: "https://schooltv.nl/item/de-watergeuzen-water-als-wapen" },
    { titel: "Het Klokhuis: Willem van Oranje", sub: "SchoolTV, 14 min", url: "https://schooltv.nl/item/het-klokhuis-willem-van-oranje" }
  ],
  "4.5": [
    { titel: "De Spaanse Armada: het plan mislukt (bron 7)", sub: "SchoolTV, 2 min", url: "https://schooltv.nl/video/de-spaanse-armada-op-weg-het-plan-mislukt" },
    { titel: "De slag bij Nieuwpoort", sub: "SchoolTV, 3,5 min", url: "https://schooltv.nl/item/de-slag-bij-nieuwpoort-legendarische-slag-tegen-de-spanjaarden" },
    { titel: "Johan van Oldenbarnevelt, politiek leider", sub: "SchoolTV, 7,5 min", url: "https://schooltv.nl/item/johan-van-oldenbarnevelt-politiek-leider-van-de-republiek" },
    { titel: "Machtsstrijd in de Republiek", sub: "SchoolTV, 15 min", url: "https://schooltv.nl/item/dossier-geschiedenis-de-gouden-eeuw-machtsstrijd-in-de-republiek" }
  ],
  "5.2": [
    { titel: "De route van de VOC: een reis vol gevaren (bron 8)", sub: "SchoolTV, 3,5 min", url: "https://schooltv.nl/video/de-route-van-de-voc-een-reis-vol-gevaren" },
    { titel: "Welkom in de Gouden Eeuw", sub: "NTR, 24 min", url: "https://www.ntr.nl/Welkom-in-de-Gouden-Eeuw/82/detail/Welkom-in-de-Gouden-Eeuw/NPS_1239797" },
    { titel: "Hoe de WIC zich op slavenhandel toelegde", sub: "YouTube, 2 min", url: "https://www.youtube.com/watch?v=xJ7Q_SNWMR4" },
    { titel: "Natte grond in de Nederlanden", sub: "YouTube, 2 min", url: "https://youtu.be/VdFUyeucRIg" }
  ]
};

window.AANMOEDIGING = {
  goed: ["Goed zo! 🌟", "Yes, precies!", "Top, Storm!", "Helemaal goed! ⭐", "Lekker bezig!", "Zo, die zat! ⚽"],
  bijna: ["Bijna! Kijk even mee.", "Net niet, geen probleem!", "Oei, bijna goed.", "Dat is een lastige, hè?"],
  levelup: ["Wow, niveau omhoog! 🏅", "Je snapt het, moeilijker mag nu!", "Knap! Op naar het volgende niveau! 🚀"],
  leveldown: ["Geeft niks, we oefenen dit rustig nog een keer. 💛", "Even een stapje terug, dan zit het straks vast.", "Geen stress, we pakken het samen opnieuw."],
  stapelklaar: ["Stapel gehaald! 🎉 Op naar de volgende.", "Alle begrippen gekend, top!", "Yes, stapeltje af! ⭐"]
};

window.LEERSTOF = [];


/* ===== Formuleertraining (alle paragrafen) ===== */
window.LEERSTOF.push(
{
 "id": "formuleren",
 "emoji": "✍️",
 "titel": "Zo schrijf je een antwoord",
 "paragraaf": "alle §",
 "kort": "Je kent de feiten al. Hier oefen je hoe je ze opschrijft, zodat je ook bij T2- en inzichtvragen alle punten haalt.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Storm, je weet al heel veel: bij 3.5 had je bijna alle feitenvragen goed. De punten bleven liggen bij vragen als <b>leg uit</b>, <b>bewijs</b> en <b>bedenk</b>. Niet omdat je het niet wist, maar omdat het antwoord niet compleet op papier stond.",
    "Elke vraag begint met een <b>opdrachtwoord</b>. Dat woord zegt wat je moet doen. <b>Noem</b> = één ding opschrijven, kort. <b>Leg uit</b> = wat er gebeurde én waarom, met een verband (daardoor). <b>Bewijs</b> = iets aanwijzen in de bron. <b>Bedenk</b> = zelf een redelijk antwoord verzinnen dat bij de stof past.",
    "Kijk ook naar het <b>aantal punten</b>. Twee punten betekent meestal: twee dingen opschrijven. Drie punten bij 'leg uit' betekent: drie stappen. Tel ze na voordat je verder gaat.",
    "Een goed antwoord is als een goede pass bij het voetbal: je kijkt eerst waar je medespeler staat (wat vraagt de vraag?), en pas dan speel je de bal (je antwoord)."
   ],
   "regel": "Lees het opdrachtwoord en tel de punten: zoveel dingen moet je opschrijven.",
   "voorbeelden": [
    {
     "en": "Noem de opvolger van Karel V. (1p)",
     "let": "Eén ding, kort: Filips II."
    },
    {
     "en": "Leg uit waarom de Vrede van Augsburg een nederlaag was voor Karel V. (2p)",
     "let": "Twee stappen: wat er afgesproken werd, en daardoor waarom dat slecht was voor Karel."
    }
   ],
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Welk opdrachtwoord vraagt wat van jou?",
     "chips": [
      {
       "t": "Noem de opvolger van Karel V.",
       "bak": "noem",
       "waarom": "'Noem' vraagt alleen het ding zelf, kort. Geen uitleg nodig."
      },
      {
       "t": "Leg uit waarom Luther tegen aflaten was.",
       "bak": "leg",
       "waarom": "'Leg uit' wil wat er gebeurde én waarom: een verband."
      },
      {
       "t": "Bewijs met de bron dat de maker tegen Alva is.",
       "bak": "bewijs",
       "waarom": "'Bewijs' betekent: wijs iets aan wat je in de bron ziet of leest."
      },
      {
       "t": "Bedenk waarom Luther de Bijbel vertaalde.",
       "bak": "bedenk",
       "waarom": "'Bedenk' vraagt een eigen, redelijke verklaring die bij de stof past."
      },
      {
       "t": "Noem het jaar van de Beeldenstorm.",
       "bak": "noem",
       "waarom": "Een jaartal noemen is kort: 1566."
      },
      {
       "t": "Leg uit hoe huwelijkspolitiek tot meer grondgebied leidt.",
       "bak": "leg",
       "waarom": "Je moet de stappen geven: trouwen, erven, groter gebied."
      },
      {
       "t": "Bewijs dat dit schilderij na 1477 gemaakt is.",
       "bak": "bewijs",
       "waarom": "Zoek iets in het schilderij zelf, zoals de wapenschilden."
      }
     ],
     "bakjes": [
      {
       "id": "noem",
       "label": "Noem: kort het ding zelf",
       "som": "één feit"
      },
      {
       "id": "leg",
       "label": "Leg uit: wat + waarom (daardoor)",
       "som": "een verband in stappen"
      },
      {
       "id": "bewijs",
       "label": "Bewijs: iets aanwijzen in de bron",
       "som": "element uit de bron"
      },
      {
       "id": "bedenk",
       "label": "Bedenk: een eigen redelijke verklaring",
       "som": "zelf nadenken"
      }
     ],
     "w": "Het opdrachtwoord bepaalt wat je opschrijft.",
     "meer": "Bij 'noem' verlies je geen punten met een kort antwoord. Bij 'leg uit' wel: daar moet het verband erin."
    },
    {
     "t": "mc",
     "q": "Een vraag zegt: <i>Leg uit waarom de gewesten tegen centralisatie waren. (2p)</i> Hoeveel dingen moet je opschrijven?",
     "o": [
      "twee: wat centralisatie inhield en waarom de gewesten dat niet wilden",
      "één: dat de gewesten tegen waren",
      "drie: het jaartal, de naam van de vorst en de namen van de gewesten",
      "vier: elk gewest apart"
     ],
     "a": "twee: wat centralisatie inhield en waarom de gewesten dat niet wilden",
     "w": "2 punten bij 'leg uit' = twee stappen: wat er was en waarom dat een probleem was.",
     "meer": "Tel altijd de punten. Een antwoord van één zin bij een 2-puntsvraag is bijna altijd maar 1 punt waard.",
     "fout": {
      "één: dat de gewesten tegen waren": "Dat herhaalt alleen de vraag. Bij 'leg uit' moet het <b>waarom</b> erbij.",
      "vier: elk gewest apart": "Je hoeft niet alle gewesten te noemen. Het gaat om het verband tussen centralisatie en privileges.",
      "drie: het jaartal, de naam van de vorst en de namen van de gewesten": "Dat zijn losse feiten zonder verband. Het puntenaantal is 2, en het gaat om een uitleg."
     }
    },
    {
     "t": "mc",
     "q": "Welke zin is een <b>verband</b>, zoals een leg-uit-vraag wil?",
     "o": [
      "Alva kwam in 1567 en daardoor vluchtten veel edelen naar het buitenland.",
      "Alva kwam in 1567. Hij was een Spaanse generaal met een groot en goed bewapend leger.",
      "Alva kwam in 1567 naar de Nederlanden, met een groot leger uit Spanje.",
      "In 1567 was het al een jaar na de Beeldenstorm in de Nederlanden."
     ],
     "a": "Alva kwam in 1567 en daardoor vluchtten veel edelen naar het buitenland.",
     "w": "Het woordje 'daardoor' maakt van twee feiten een verband: het één veroorzaakt het ander.",
     "meer": "Verbandwoorden: daardoor, waardoor, doordat, omdat, dus, het gevolg was. Zet er minstens één in elk leg-uit-antwoord.",
     "fout": {
      "Alva kwam in 1567 naar de Nederlanden, met een groot leger uit Spanje.": "Dit is één feit met extra informatie. Er staat geen gevolg in.",
      "In 1567 was het al een jaar na de Beeldenstorm in de Nederlanden.": "Dat is een tijdsaanduiding, geen oorzaak en gevolg.",
      "Alva kwam in 1567. Hij was een Spaanse generaal met een groot en goed bewapend leger.": "Twee feiten naast elkaar, maar er staat niet wat het één met het ander doet."
     }
    },
    {
     "t": "mc",
     "q": "Een bronvraag zegt: <i>Bewijs met een element uit de bron.</i> Waar haal je je bewijs vandaan?",
     "o": [
      "uit wat je in de afbeelding of tekst zelf ziet",
      "uit het onderschrift onder de bron",
      "uit wat je nog weet uit de les",
      "uit de titel van de paragraaf in je boek of het werkboek"
     ],
     "a": "uit wat je in de afbeelding of tekst zelf ziet",
     "w": "Een element uit de bron = iets wat je in de bron zelf ziet of leest.",
     "meer": "Het onderschrift is uitleg van de maker van het boek, niet de bron. In 4.2 vraagt het werkboek dit letterlijk: 'en dus niet uit het onderschrift bij de bron'.",
     "fout": {
      "uit het onderschrift onder de bron": "Dat is de valkuil. Het onderschrift schreef de maker van het werkboek. Het bewijs moet in de bron zelf zitten.",
      "uit wat je nog weet uit de les": "Je kennis helpt om de bron te snappen, maar als bewijs telt alleen wat je in de bron aanwijst.",
      "uit de titel van de paragraaf in je boek of het werkboek": "De titel zegt iets over de stof, niet over deze ene bron."
     }
    },
    {
     "t": "mc",
     "q": "<i>Noem de oorzaak waarom de monniken verbrand werden. Begin je antwoord met het soort oorzaak.</i> Wat zijn je eerste woorden?",
     "o": [
      "Een religieuze oorzaak:",
      "De monniken werden verbrand omdat",
      "In 1523 gebeurde het volgende:",
      "Ik denk dat het zo zit:"
     ],
     "a": "Een religieuze oorzaak:",
     "w": "De vraag zegt het: begin met het soort. Dus eerst 'religieus', dan pas de oorzaak.",
     "meer": "Hier verloor je bij 3.5 punten: het antwoord was goed, maar het soort stond er niet voorop. Een makkelijk punt dat je nu altijd pakt.",
     "fout": {
      "De monniken werden verbrand omdat": "Een prima begin van een zin, maar de vraag wil dat het <b>soort oorzaak</b> vooraan staat.",
      "In 1523 gebeurde het volgende:": "Het jaartal is niet gevraagd. Begin met het soort oorzaak.",
      "Ik denk dat het zo zit:": "Dat kost woorden en levert niets op. Begin direct met het soort: religieus."
     }
    },
    {
     "t": "mc",
     "q": "<i>Leg uit of je vindt dat Luther zelf sober leefde. Gebruik bron 9 (zijn werkkamer).</i> Hoe begin je?",
     "o": [
      "Met ja of nee, en daarna voorbeelden uit de bron",
      "Met een korte samenvatting van alles wat Luther deed en schreef",
      "Met de jaartallen van Luthers leven",
      "Met wat de paus van Luther vond"
     ],
     "a": "Met ja of nee, en daarna voorbeelden uit de bron",
     "w": "Een 'of'-vraag beantwoord je eerst met ja of nee. Daarna bewijs je het met de bron.",
     "meer": "Het werkboek geeft deze tip zelf bij opdracht 10 van 3.5: 'Antwoord eerst met ja of nee en geef vervolgens verschillende voorbeelden uit bron 9.'",
     "fout": {
      "Met de jaartallen van Luthers leven": "Die zijn hier niet gevraagd. Begin met ja of nee.",
      "Met wat de paus van Luther vond": "Dat is een ander perspectief. Hier gaat het om wat jij in de bron ziet.",
      "Met een korte samenvatting van alles wat Luther deed en schreef": "Dan beantwoord je de vraag niet. Er wordt gevraagd óf hij sober leefde: ja of nee."
     }
    },
    {
     "t": "gap",
     "q": "Bij een leg-uit-vraag van 3 punten schrijf je ___ stappen op, elk op een eigen regel.",
     "a": "3|drie",
     "w": "Drie punten, drie stappen.",
     "meer": "Het werkboek zegt het bij 3.5 opdracht 5b: 'Zet elke stap op een aparte regel om het overzicht te behouden.'"
    },
    {
     "t": "mc",
     "q": "Welk woord hoort er <b>niet</b> bij als je een verband legt?",
     "o": [
      "bovendien",
      "daardoor",
      "waardoor",
      "doordat (dat geeft een oorzaak)"
     ],
     "a": "bovendien",
     "w": "'Bovendien' telt iets op, maar zegt niet dat het één het ander veroorzaakt.",
     "meer": "Bovendien, ook, en, verder: dat zijn optelwoorden. Daardoor, waardoor, doordat, omdat: dat zijn verbandwoorden.",
     "fout": {
      "daardoor": "Daardoor is juist een sterk verbandwoord: het één leidt tot het ander.",
      "waardoor": "Waardoor is een verbandwoord, net als daardoor.",
      "doordat (dat geeft een oorzaak)": "Doordat geeft precies de oorzaak aan. Dat is een verbandwoord."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Nu bouw je het antwoord zelf. Een sterk geschiedenisantwoord heeft altijd dezelfde bouwstenen, in deze volgorde:",
    "<b>1. Soort of begrip voorop.</b> Vraagt de vraag om het soort oorzaak, of om een begrip? Zet dat als eerste neer, met de betekenis erbij. <br><b>2. Wat er gebeurde.</b> Het feit, kort. <br><b>3. Het verband.</b> Met daardoor of waardoor: wat deed dat feit? <br><b>4. De bron.</b> Gaat de vraag over een bron? Citeer met aanhalingstekens, of wijs aan wat je ziet.",
    "Een citaat is een stukje letterlijke tekst uit de bron, tussen aanhalingstekens. Kies het kleinste stukje dat je punt bewijst, niet de hele bron.",
    "Het is net als een outfit samenstellen met je moeder in de winkel: je kiest niet alles uit het rek, maar precies de stukken die bij elkaar passen."
   ],
   "regel": "Soort of begrip voorop, dan wat er gebeurde, dan 'daardoor', dan het bewijs uit de bron.",
   "voorbeelden": [
    {
     "en": "Centralisatie is het streven naar één centraal bestuur met overal dezelfde wetten. Filips II wilde dat voortzetten. Daardoor waren de edelen bang hun privileges te verliezen.",
     "let": "Begrip voorop, wat er gebeurde, daardoor: drie stappen, drie punten."
    }
   ],
   "vragen": [
    {
     "t": "sequence",
     "q": "Zet de stappen van dit antwoord in de goede volgorde. Vraag: <i>Leg uit waarom de paus Luther uit de kerk zette. (3p)</i>",
     "stappen": [
      "Luther schreef 95 stellingen met kritiek op de kerk, onder meer op de aflaathandel.",
      "De paus accepteerde die kritiek niet en stuurde Luther een bul: hij moest zijn kritiek terugnemen.",
      "Luther weigerde en verbrandde de bul samen met het pauselijk wetboek.",
      "Daardoor zette de paus Luther en zijn volgelingen uit de kerk."
     ],
     "w": "Een verklaring in stappen loopt in tijd: eerst de kritiek, dan de reactie, dan de weigering, dan het gevolg.",
     "meer": "Begin bij de oorzaak en eindig bij wat er gevraagd wordt. De laatste regel begint met 'daardoor'."
    },
    {
     "t": "mc",
     "q": "Dit antwoord kreeg 1 van de 2 punten: <i>'Karel V had niet alles alleen voor het zeggen.'</i> De vraag was: <i>Leg uit waarom Karel V Luther niet zomaar kon verbannen.</i> Wat mist er?",
     "o": [
      "dat hij moest overleggen met de Duitse keurvorsten op een rijksdag",
      "het jaartal waarin Luther geboren werd",
      "dat Luther een monnik was uit Wittenberg",
      "dat Karel V ook koning van Spanje en heer van de Nieuwe Wereld was"
     ],
     "a": "dat hij moest overleggen met de Duitse keurvorsten op een rijksdag",
     "w": "De tweede stap: met wíe moest hij overleggen? De keurvorsten, en daarom kwam de rijksdag in Worms (1521).",
     "meer": "Een half antwoord zegt dát er een probleem is. Het hele antwoord zegt ook <b>wat</b> het probleem was.",
     "fout": {
      "het jaartal waarin Luther geboren werd": "Dat staat los van de vraag. Het gaat om waarom Karel niet alleen kon beslissen.",
      "dat Luther een monnik was uit Wittenberg": "Dat klopt wel, maar het verklaart niet waarom Karel hem niet zomaar kon verbannen.",
      "dat Karel V ook koning van Spanje en heer van de Nieuwe Wereld was": "Dat maakt hem juist machtiger. De uitleg zit in de keurvorsten die meebeslisten."
     }
    },
    {
     "t": "mc",
     "q": "Welk citaat uit bron 7 (Luthers verdediging in Worms) bewijst het best dat Luther de kerk wilde hervormen omdat die dwaalde?",
     "bron": {
      "titel": "Bron: Luther in Worms (1521, fragment)",
      "tekst": "\"... want niet de paus en niet de concilies alleen geloof ik, omdat het zeker is dat zij meermalen gedwaald en zichzelf tegengesproken hebben ...\"",
      "onder": "Naar: Luther, tijdens zijn verdediging voor de rijksdag van Worms."
     },
     "o": [
      "\"zij meermalen gedwaald en zichzelf tegengesproken hebben\"",
      "\"niet de paus en niet de concilies alleen geloof ik, omdat het zeker is\"",
      "\"omdat het zeker is\"",
      "\"want niet de paus\""
     ],
     "a": "\"zij meermalen gedwaald en zichzelf tegengesproken hebben\"",
     "w": "Dit stukje zegt precies het argument: de kerk heeft gedwaald en spreekt zichzelf tegen.",
     "meer": "Kies het kleinste stukje dat je punt bewijst. Hier verloor je bij 3.5 opdracht 8a je punt: je schreef je eigen idee op in plaats van het argument uit de bron.",
     "fout": {
      "\"omdat het zeker is\"": "Te kort: hier staat nog geen argument in.",
      "\"want niet de paus\"": "Dit zegt alleen dat hij de paus niet volgt, niet waarom.",
      "\"niet de paus en niet de concilies alleen geloof ik, omdat het zeker is\"": "Hier staat wíe hij niet gelooft, maar niet waarom. Het waarom zit in 'gedwaald'."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron: de werkkamer van Luther",
      "tekst": "Op een foto zie je een kleine kamer met een houten vloer en houten wanden. Er staan een eenvoudige tafel, een stoel en een kachel. Er hangen geen schilderijen, er ligt geen tapijt en er is geen goud of zilver te zien.",
      "onder": "Eigen beschrijving van Luthers werkkamer in de Wartburg."
     },
     "q": "Luther vond dat geestelijken sober moesten leven. Leg met de bron uit of Luther zelf ook zo leefde. (2p)",
     "tip": "Een 'of'-vraag: begin met ja of nee. Geef daarna minstens twee dingen die je in de bron ziet.",
     "model": [
      {
       "label": "Ja of nee",
       "tekst": "Ja, Luther leefde zelf ook sober."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je een kale werkkamer met alleen een eenvoudige tafel, een stoel en een kachel. Er is geen goud, geen schilderij en geen tapijt."
      }
     ],
     "checklist": [
      {
       "t": "Mijn eerste woord is ja of nee.",
       "woorden": [
        "ja",
        "nee"
       ]
      },
      {
       "t": "Ik noem minstens twee dingen die ik in de bron zie.",
       "woorden": [
        "tafel",
        "stoel",
        "kachel",
        "kaal",
        "eenvoudig"
       ]
      },
      {
       "t": "Ik leg de link met sober: geen luxe.",
       "woorden": [
        "sober",
        "luxe",
        "rijk",
        "goud",
        "eenvoudig"
       ]
      }
     ],
     "w": "Ja/nee voorop, daarna bewijs uit de bron zelf.",
     "meer": "Je schreef bij deze vraag in het werkboek alleen 'werkkamer'. Dat gaf 0 punten. Met 'Ja' en twee voorbeelden had je er 2."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg met het begrip 'particularisme' uit waarom er in de middeleeuwen nog geen Nederlandse staat was. (2p)",
     "tip": "Begrip voorop: schrijf eerst wat particularisme betekent. Daarna het verband met 'geen staat'.",
     "model": [
      {
       "label": "Begrip voorop",
       "tekst": "Particularisme is het streven van de gewesten en steden in de Nederlanden om hun zelfstandigheid te behouden."
      },
      {
       "label": "Daardoor",
       "tekst": "Elk gewest had zijn eigen bestuur, wetten, munten en privileges. Daardoor was er nog geen staat waar overal dezelfde wetten en regels golden."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg eerst uit wat particularisme betekent.",
       "woorden": [
        "zelfstandig",
        "eigen"
       ]
      },
      {
       "t": "Ik noem wat elk gewest eigen had (bestuur, wetten, munten, privileges).",
       "woorden": [
        "wetten",
        "bestuur",
        "munt",
        "privilege"
       ]
      },
      {
       "t": "Ik leg het verband met 'geen staat' (niet overal dezelfde wetten).",
       "woorden": [
        "staat",
        "dezelfde",
        "daardoor"
       ]
      }
     ],
     "w": "Particularisme = zelfstandig willen blijven. Daardoor geen één staat.",
     "meer": "Valkuil: particularisme en centralisatie omdraaien. Particularisme is de wens van de gewesten, centralisatie die van de vorst."
    },
    {
     "t": "mc",
     "q": "<i>Bewijs dat het schilderij van Maria van Bourgondië na het Groot Privilege gemaakt is, met een element uit de bron.</i> Welk antwoord telt?",
     "o": [
      "Je ziet om haar heen de wapenschilden van de gewesten die haar trouw beloofden.",
      "In het onderschrift staat dat het rond 1490 gemaakt is, dus na 1477.",
      "Het Groot Privilege was in 1477, dat weet ik uit de tekst van de les.",
      "Maria zit op een paard, en zo werden vorsten na 1477 altijd geschilderd."
     ],
     "a": "Je ziet om haar heen de wapenschilden van de gewesten die haar trouw beloofden.",
     "w": "De wapenschilden zie je in het schilderij zelf: dat is een element uit de bron.",
     "meer": "Het werkboek zei er letterlijk bij: 'en dus niet uit het onderschrift bij de bron'. Het jaartal uit het onderschrift telt dus niet.",
     "fout": {
      "In het onderschrift staat dat het rond 1490 gemaakt is, dus na 1477.": "Logisch, maar verboden: het werkboek wil een element uit de bron zelf, niet uit het onderschrift.",
      "Het Groot Privilege was in 1477, dat weet ik uit de tekst van de les.": "Dat is kennis, geen bewijs uit de bron.",
      "Maria zit op een paard, en zo werden vorsten na 1477 altijd geschilderd.": "Dat klopt niet: ook voor 1477 werden vorsten te paard geschilderd. Het bewijs zit in de wapenschilden."
     }
    },
    {
     "t": "sequence",
     "q": "Zet deze bouwstenen van een goed antwoord in de goede volgorde.",
     "stappen": [
      "het soort oorzaak of het begrip met de betekenis",
      "wat er gebeurde",
      "het verband met daardoor of waardoor",
      "het bewijs uit de bron, met een citaat"
     ],
     "w": "Soort of begrip, wat, daardoor, bewijs.",
     "meer": "Niet elke vraag vraagt alle vier. Maar als ze er staan, is dit de volgorde waarin een nakijker ze het makkelijkst ziet."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij <b>T2</b> en <b>inzicht</b> (I) krijg je vaak een bron die je nog nooit gezien hebt, of moet je een verband leggen over meerdere stappen. Dat is precies waar de meeste punten liggen.",
    "<b>Onbekende bron?</b> Vraag je af: wie maakte hem, wanneer, en wat wil de maker dat je denkt? Bij 'is de maker voor of tegen' zoek je woorden of beelden die iets mooi of lelijk maken: een duivel, een held, 'tiran', 'vader des vaderlands'.",
    "<b>Verband over veel stappen?</b> Begin bij wat de vraag noemt als begin, eindig bij wat de vraag noemt als eind. Zet elke stap op een eigen regel en plak ze aan elkaar met daardoor.",
    "<b>Twee perspectieven?</b> Schrijf twee regels: 'Volgens A...' en 'Volgens B...'. Bij Maurits en Oldenbarnevelt, bij Willem en Filips: ze zagen hetzelfde heel anders."
   ],
   "regel": "Onbekende bron: wie, wanneer, wat wil de maker? Lang verband: begin en eind uit de vraag, stappen ertussen met daardoor.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Bedenk waarom Luther het zo belangrijk vond dat hij de Bijbel in het Duits vertaalde. (2p)",
     "tip": "'Bedenk' = een redelijke verklaring. Vergelijk hoe het vóór en ná de vertaling was.",
     "model": [
      {
       "label": "Ervoor",
       "tekst": "Voor de Lutherbijbel was de Bijbel in het Hebreeuws, Grieks of Latijn. Dat konden gewone Duitsers niet lezen."
      },
      {
       "label": "Daardoor",
       "tekst": "Met de vertaling kon elke Duitser die kon lezen zelf de Bijbel lezen, zonder hulp van geestelijken. Dat vond Luther belangrijk, omdat volgens hem de Bijbel telt en niet wat de paus zegt."
      }
     ],
     "checklist": [
      {
       "t": "Ik zeg hoe het vóór de vertaling was (Latijn, Grieks of Hebreeuws).",
       "woorden": [
        "latijn",
        "grieks",
        "hebreeuw",
        "niet lezen"
       ]
      },
      {
       "t": "Ik zeg wat er daardoor veranderde (mensen konden zelf lezen).",
       "woorden": [
        "zelf",
        "lezen",
        "daardoor"
       ]
      },
      {
       "t": "Ik noem waarom dat voor Luther belangrijk was (geen geestelijken of paus nodig).",
       "woorden": [
        "geestelijk",
        "paus",
        "bijbel"
       ]
      }
     ],
     "w": "Van onleesbaar naar zelf lezen: zo hadden gelovigen de paus niet meer nodig om de Bijbel te begrijpen.",
     "meer": "Bij een inzichtvraag laat je het verschil tussen vóór en ná zien. 'Zodat iedereen de Bijbel kan lezen' is goed, maar zonder het 'ervoor' haal je maar de helft."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "bron": {
      "titel": "Bron: een pamflet uit 1568 (eigen bewerking)",
      "tekst": "\"Ons land wordt geplaagd door vreemde soldaten en een bloedraad die zelfs edelen ter dood brengt. Prins Willem, die zijn goed en bloed voor ons waagt, roept ieder op die de vrijheid liefheeft.\"",
      "onder": "Eigen bewerking, zoals een opstandeling het in 1568 zou kunnen schrijven."
     },
     "q": "Is de maker van deze bron voor of tegen de Opstand? Bewijs je antwoord met twee elementen uit de bron. (3p)",
     "tip": "Eerst je oordeel: voor of tegen. Dan twee citaten, elk met wat het laat zien.",
     "model": [
      {
       "label": "Oordeel",
       "tekst": "De maker is voor de Opstand."
      },
      {
       "label": "Bewijs 1",
       "tekst": "Hij noemt de Raad van Beroerten negatief een \"bloedraad die zelfs edelen ter dood brengt\"."
      },
      {
       "label": "Bewijs 2",
       "tekst": "Hij prijst Willem van Oranje, \"die zijn goed en bloed voor ons waagt\", en roept mensen op om mee te doen."
      }
     ],
     "checklist": [
      {
       "t": "Ik geef eerst mijn oordeel: voor.",
       "woorden": [
        "voor"
       ]
      },
      {
       "t": "Ik citeer een negatief stukje over Alva of zijn bestuur.",
       "woorden": [
        "bloedraad",
        "vreemde soldaten",
        "geplaagd"
       ]
      },
      {
       "t": "Ik citeer een positief stukje over Willem of de vrijheid.",
       "woorden": [
        "willem",
        "vrijheid",
        "waagt"
       ]
      },
      {
       "t": "Mijn citaten staan tussen aanhalingstekens.",
       "woorden": []
      }
     ],
     "w": "Negatieve woorden over de tegenstander en lof voor de eigen leider: de maker is voor de Opstand.",
     "meer": "Let bij elke bron op beladen woorden: 'bloedraad', 'plagen', 'vrijheid'. Die verraden aan welke kant de maker staat."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Maurits en Johan van Oldenbarnevelt dachten anders over een wapenstilstand met Spanje. Geef van allebei het standpunt en een reden. (2p)",
     "tip": "Twee perspectieven = twee regels: 'Volgens Maurits...' en 'Volgens Van Oldenbarnevelt...'. Elk met een reden (omdat...).",
     "model": [
      {
       "label": "Volgens Van Oldenbarnevelt",
       "tekst": "Van Oldenbarnevelt was voor een wapenstilstand, omdat de oorlog de handel van Holland veel schade toebracht."
      },
      {
       "label": "Volgens Maurits",
       "tekst": "Maurits was tegen, omdat hij als legeraanvoerder de Spanjaarden verder wilde verslaan."
      }
     ],
     "checklist": [
      {
       "t": "Ik geef het standpunt van Van Oldenbarnevelt (voor de wapenstilstand).",
       "woorden": [
        "oldenbarnevelt"
       ]
      },
      {
       "t": "Met een reden: de handel van Holland.",
       "woorden": [
        "handel",
        "holland"
       ]
      },
      {
       "t": "Ik geef het standpunt van Maurits (tegen).",
       "woorden": [
        "maurits",
        "tegen"
       ]
      },
      {
       "t": "Met een reden (hij wilde doorvechten).",
       "woorden": [
        "vecht",
        "leger",
        "oorlog",
        "verslaan"
       ]
      }
     ],
     "w": "Van Oldenbarnevelt: voor, voor de handel. Maurits: tegen, voor de overwinning.",
     "meer": "Het Twaalfjarig Bestand kwam er toch, in 1609. Na dat verlies ging Maurits zich meer met de politiek bemoeien."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Onbekende bron: een gevelsteen",
      "tekst": "Boven de deur van een groot grachtenhuis in Amsterdam zit een steen uit 1663 met een schip, balen tabak en een koffievat erop.",
      "onder": "Eigen beschrijving."
     },
     "q": "Wat vertelt deze bron het meest waarschijnlijk over de eigenaar van het huis?",
     "o": [
      "hij verdiende zijn geld met de handel in plantageproducten",
      "hij was een boer die zelf tabak en koffie verbouwde op zijn land in Holland",
      "hij was de bouwer van het grachtenhuis",
      "hij was een predikant van de calvinistische kerk"
     ],
     "a": "hij verdiende zijn geld met de handel in plantageproducten",
     "w": "Tabak en koffie kwamen van plantages. Wie dat op zijn gevel zette, was er rijk mee geworden.",
     "meer": "Zulke gevels zijn nog steeds een spoor van de driehoekshandel en het slavernijverleden (5.2).",
     "fout": {
      "hij was de bouwer van het grachtenhuis": "Op de steen staan handelswaar en een schip, geen bouwgereedschap.",
      "hij was een predikant van de calvinistische kerk": "Een predikant zet geen tabak en koffie op zijn gevel. Het gaat over handel.",
      "hij was een boer die zelf tabak en koffie verbouwde op zijn land in Holland": "Een boer woonde niet aan de Amsterdamse gracht. Tabak en koffie kwamen van plantages overzee."
     }
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg uit hoe de kritiek van Luther (1517) uiteindelijk een oorzaak was van de Beeldenstorm in de Nederlanden (1566). Begin bij Luther en eindig bij de Beeldenstorm. (4p)",
     "tip": "Een lange keten: vier stappen, elk op een eigen regel, met daardoor ertussen.",
     "model": [
      {
       "label": "Stap 1",
       "tekst": "Luther had kritiek op de kerk en werd met zijn volgelingen uit de kerk gezet. Daardoor scheurde de kerk in een katholiek en een protestants deel (Reformatie)."
      },
      {
       "label": "Stap 2",
       "tekst": "De ideeën van de Reformatie bereikten ook de Nederlanden. Daar kregen vooral de calvinisten veel aanhang."
      },
      {
       "label": "Stap 3",
       "tekst": "Karel V en daarna Filips II vervolgden de protestanten met bloedplakkaten en de inquisitie. Daardoor moesten de calvinisten in het open veld preken."
      },
      {
       "label": "Stap 4",
       "tekst": "Tijdens die hagenpreken werden de katholieke kerken veroordeeld, en daardoor vielen calvinisten in 1566 de kerken binnen: de Beeldenstorm."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin bij Luther en de splitsing van de kerk.",
       "woorden": [
        "luther",
        "reformatie",
        "splits"
       ]
      },
      {
       "t": "Ik noem de calvinisten in de Nederlanden.",
       "woorden": [
        "calvin"
       ]
      },
      {
       "t": "Ik noem de vervolging (bloedplakkaten of inquisitie).",
       "woorden": [
        "plakkaat",
        "inquisitie",
        "vervolg"
       ]
      },
      {
       "t": "Ik eindig bij hagenpreken en de Beeldenstorm.",
       "woorden": [
        "hagenpre",
        "beeldenstorm"
       ]
      },
      {
       "t": "De stappen zijn verbonden met daardoor of waardoor.",
       "woorden": [
        "daardoor",
        "waardoor"
       ]
      }
     ],
     "w": "De rode draad: Luther breekt de kerk, het calvinisme groeit, de vervolging maakt het erger, in 1566 ontploft het.",
     "meer": "Dit is de rode draad van het hele pakket. Wie deze keten kan opschrijven, kan bijna elke inzichtvraag over 3.5 en 4.3-4.4 aan."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Vroeger en nu bestaat er een Staten-Generaal. Leg uit wat er toen (in de Bourgondische tijd) mee bedoeld werd, en laat het verschil met nu zien. (2p)",
     "tip": "Toen-en-nu: twee regels, 'Toen...' en 'Nu...'. Gebruik het verschil in wie erin zit.",
     "model": [
      {
       "label": "Toen",
       "tekst": "Toen was de Staten-Generaal de gezamenlijke vergadering van de Statenvergaderingen van de verschillende gewesten (voor het eerst in 1464)."
      },
      {
       "label": "Nu",
       "tekst": "Nu is de Staten-Generaal het parlement van Nederland: de Eerste en de Tweede Kamer, gekozen door de burgers."
      }
     ],
     "checklist": [
      {
       "t": "Ik zeg wat het toen was: een vergadering van de gewesten.",
       "woorden": [
        "gewest",
        "staten"
       ]
      },
      {
       "t": "Ik zeg wat het nu is: de Eerste en Tweede Kamer.",
       "woorden": [
        "kamer",
        "parlement"
       ]
      },
      {
       "t": "Ik maak het verschil duidelijk (toen gewesten, nu gekozen parlement).",
       "woorden": [
        "toen",
        "nu",
        "verschil",
        "gekozen"
       ]
      }
     ],
     "w": "Zelfde naam, andere inhoud: toen de gewesten samen, nu het gekozen parlement.",
     "meer": "Valkuil uit 4.2: de Staten-Generaal van toen gelijkstellen aan die van nu. In 1464 waren er geen verkiezingen."
    },
    {
     "t": "mc",
     "q": "Een vraag zegt: <i>Bedenk een sociaal gevolg voor de mensen rond de verbrande monniken.</i> Welk antwoord past het best bij 'sociaal'?",
     "o": [
      "mensen werden bang en durfden niet meer te zeggen wat ze geloofden",
      "de stad moest het brandhout voor de brandstapel betalen, en dat kostte veel geld",
      "de keizer voerde daarna nieuwe wetten in tegen ketters",
      "de kerk kreeg daarna meer geld binnen van de aflaten"
     ],
     "a": "mensen werden bang en durfden niet meer te zeggen wat ze geloofden",
     "w": "Sociaal = hoe mensen in een samenleving met elkaar omgaan: angst, zwijgen, elkaar niet meer vertrouwen.",
     "meer": "Zoek bij 'sociaal' altijd naar gevoelens en gedrag van mensen onderling, niet naar geld (economisch) of wetten (politiek).",
     "fout": {
      "de keizer voerde daarna nieuwe wetten in tegen ketters": "Wetten zijn bestuur: dat is politiek.",
      "de kerk kreeg daarna meer geld binnen van de aflaten": "Geld is economisch, en dit volgt niet uit de terechtstelling.",
      "de stad moest het brandhout voor de brandstapel betalen, en dat kostte veel geld": "Dat gaat over geld: economisch, en het is ook niet het belangrijkste gevolg."
     }
    }
   ]
  }
 ]
}
);


/* ===== §3.5 Een kerkelijke scheuring ===== */
window.LEERSTOF.push(
{
 "id": "luther-kritiek",
 "emoji": "⛪",
 "titel": "3.5.1 · Ontevredenheid over de christelijke kerk",
 "paragraaf": "§3.5",
 "kort": "De paus is machtig, maar monnik Maarten Luther schrikt in Rome. In 1517 schrijft hij zijn kritiek op: aflaten, rijkdom, het straffen van ketters en een wetboek dat niet in de Bijbel staat.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Rond 1500 hoort bijna iedereen in West-Europa bij dezelfde kerk: de christelijke kerk, met het <b>katholieke</b> geloof. De hoogste baas is de <b>paus</b> in Rome: de leider van de katholieke (christelijke) kerk. Alle <b>geestelijken</b> (iedereen met een functie in de kerk) horen bij de eerste stand, dus naar hen wordt opgekeken. Daardoor heeft de paus heel veel macht.",
    "<b>Maarten Luther</b> (1483-1546) is een <b>monnik</b>: een geestelijke die in een klooster woont en zijn leven wijdt aan God. Hij is ook leraar in het Duitse <b>Wittenberg</b>. Hij maakt een <b>reis naar Rome</b> en schrikt van wat hij daar ziet. Die reis is de <b>aanleiding</b> voor zijn kritiek. In <b>1517</b> schrijft hij die op.",
    "Zijn kritiek in vier punten:<br><b>1. Aflaten.</b> Paus <b>Julius II</b> maakt in 1506 bekend dat hij de <b>Sint-Pieterbasiliek</b> in Rome wil verfraaien. Dat moet betaald worden met <b>aflaten</b>: documenten die je kon kopen voor kwijtschelding van zonden. Luther noemt dat uitbuiting van arme en goedgelovige mensen: alleen God kan zonden vergeven.<br><b>2. Rijkdom.</b> Geestelijken leven niet volgens de Bijbel. <b>Bisschoppen</b> wonen in rijk versierde huizen in plaats van sober te leven, zoals Jezus deed.<br><b>3. Ketters.</b> <b>Ketters</b> (mensen die zich niet aan de officiële katholieke leer houden) worden door de kerk aangegeven en door de overheid gemarteld en streng gestraft.<br><b>4. Het wetboek.</b> De paus heeft een eigen wetboek met regels die niet in de Bijbel staan.",
    "Over de aflaten is Luther het meest boos. Aflaatpredikers zoals de Duitser <b>Johann Tetzel</b> trekken rond en roepen mensen op een aflaat te kopen, om zo een plekje in de hemel te regelen. Het geld gaat naar de Sint-Pieter, die pas in <b>1626</b> helemaal af is.",
    "Let goed op de namen. <b>Julius II</b> hoort bij de Sint-Pieter en de aflaten (1506). De paus die later op Luther reageert met een bul, is een ander: <b>Leo X</b>. Twee pausen, twee rollen."
   ],
   "regel": "Luther botst met de kerk over vier dingen: aflaten, rijkdom, het straffen van ketters en een wetboek dat niet in de Bijbel staat.",
   "voorbeelden": [
    {
     "en": "Julius II: Sint-Pieter en aflaten (1506). Leo X: de bul tegen Luther (1520).",
     "let": "Deze twee pausen worden vaak verwisseld. Koppel elke naam aan één ding."
    },
    {
     "en": "Aanleiding: de reis naar Rome. Oorzaken: aflaten, rijkdom, ketters, wetboek.",
     "let": "Een aanleiding is het moment waarop het begint, de oorzaken zijn de echte redenen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Waarom had de paus in de zestiende eeuw zo veel macht?",
     "o": [
      "bijna iedereen in West-Europa hoorde bij zijn kerk",
      "hij was ook keizer van het Heilige Roomse Rijk en had een leger",
      "hij werd door alle koningen van Europa samen gekozen",
      "hij bezat het grootste deel van de grond in Duitsland"
     ],
     "a": "bijna iedereen in West-Europa hoorde bij zijn kerk",
     "w": "De paus was de hoogste leider van de kerk waar bijna elke gelovige in West-Europa bij hoorde. En naar geestelijken werd opgekeken, want ze hoorden bij de eerste stand.",
     "meer": "In de toets kun je dit met twee citaten uitleggen: 'De paus in Rome was de hoogste leider van deze kerk' en 'Tegen alle geestelijken werd opgekeken, omdat geestelijken leden van de eerste stand waren.'",
     "fout": {
      "hij was ook keizer van het Heilige Roomse Rijk en had een leger": "De keizer was iemand anders: <b>Karel V</b>. Paus en keizer zijn twee verschillende mensen, de een leidt de kerk, de ander het rijk.",
      "hij werd door alle koningen van Europa samen gekozen": "Dat staat niet in de stof. Je denkt misschien aan de <b>keurvorsten</b>: die kozen de <b>keizer</b>, niet de paus.",
      "hij bezat het grootste deel van de grond in Duitsland": "Zijn macht kwam niet uit grond in Duitsland. Hij zat in Rome en was machtig omdat bijna iedereen bij zijn kerk hoorde."
     }
    },
    {
     "t": "mc",
     "q": "Welke gebeurtenis was de <b>aanleiding</b> voor Luthers kritiek op de kerk?",
     "o": [
      "zijn reis naar Rome",
      "de bul die paus Leo X hem in 1520 stuurde",
      "de rijksdag in Worms waar hij moest verschijnen",
      "zijn vertaling van de Bijbel op de Wartburg"
     ],
     "a": "zijn reis naar Rome",
     "w": "In Rome zag Luther hoe de kerk met geld, aflaten en rijkdom omging. Daarna schreef hij in 1517 zijn kritiek op.",
     "meer": "Een aanleiding is het moment dat iets in gang zet. De rest van de opties gebeurde allemaal <b>later</b>, als gevolg van zijn kritiek.",
     "fout": {
      "de bul die paus Leo X hem in 1520 stuurde": "De bul kwam pas in 1520, als <b>reactie</b> op zijn kritiek. Een reactie kan nooit de aanleiding zijn.",
      "de rijksdag in Worms waar hij moest verschijnen": "De rijksdag was in 1521, vier jaar na zijn kritiek. Daar moest hij die kritiek juist intrekken.",
      "zijn vertaling van de Bijbel op de Wartburg": "Op de Wartburg zat hij pas na 1521, toen hij vogelvrij was. Dat is een gevolg, geen aanleiding."
     }
    },
    {
     "t": "gap",
     "q": "Een ___ is een document dat gekocht kon worden voor kwijtschelding van zonden.",
     "a": "aflaat|een aflaat|aflaten",
     "w": "Een aflaat: je betaalde, en volgens de kerk werden je zonden dan kwijtgescholden.",
     "meer": "Luther vond dat onzin: alleen God kan zonden vergeven, geen stuk papier dat je koopt. Bovendien ging het geld naar de verbouwing van de Sint-Pieter."
    },
    {
     "t": "mc",
     "q": "Welke paus wilde de Sint-Pieterbasiliek laten verfraaien en dat betalen met aflaten?",
     "o": [
      "Julius II",
      "Leo X",
      "Franciscus",
      "Frederik III"
     ],
     "a": "Julius II",
     "w": "Paus Julius II maakte in 1506 bekend dat hij de Sint-Pieter wilde verfraaien. Aflaten moesten het geld opbrengen.",
     "meer": "Ezelsbruggetje: <b>J</b>ulius II komt eerst, in het alfabet en in de tijd (1506). <b>L</b>eo X komt later, met de bul (1520).",
     "fout": {
      "Leo X": "Dit is de bekendste verwisseling van deze paragraaf. Leo X is de paus die Luther later een <b>bul</b> stuurde. De Sint-Pieter en de aflaten horen bij <b>Julius II</b>.",
      "Franciscus": "Franciscus leefde in onze tijd: hij was paus van 2013 tot 2025. Met de Sint-Pieter van 1506 had hij niets te maken.",
      "Frederik III": "Frederik III was geen paus maar een Duitse <b>keurvorst</b>, van Saksen. Hij beschermde later juist Luther."
     }
    },
    {
     "t": "gap",
     "q": "Luther was een ___: een geestelijke die in een klooster woont en zijn leven wijdt aan God.",
     "a": "monnik|een monnik",
     "w": "Luther was monnik en daarnaast leraar in Wittenberg.",
     "meer": "Dat maakt zijn kritiek extra opvallend: hij was zelf een geestelijke, iemand van binnen de kerk."
    },
    {
     "t": "sleep",
     "opgave": "Bij welk kritiekpunt van Luther hoort elk voorbeeld?",
     "chips": [
      {
       "t": "Tetzel trekt rond om aflaten te verkopen",
       "bak": "aflaat",
       "waarom": "Tetzel was een aflaatprediker: hij verkocht aflaten voor de Sint-Pieter."
      },
      {
       "t": "Alleen God kan zonden vergeven, geen papiertje",
       "bak": "aflaat",
       "waarom": "Dit is Luthers argument tegen aflaten: een gekocht document kan geen zonden wegnemen."
      },
      {
       "t": "Bisschoppen wonen in rijk versierde huizen",
       "bak": "rijk",
       "waarom": "Dit gaat over de levenswijze van geestelijken: rijkdom in plaats van soberheid."
      },
      {
       "t": "Geestelijken leven niet sober zoals Jezus",
       "bak": "rijk",
       "waarom": "Luther wilde dat geestelijken het sobere voorbeeld van Jezus volgden."
      },
      {
       "t": "Mensen die anders geloven worden gemarteld",
       "bak": "ketter",
       "waarom": "Wie zich niet aan de katholieke leer hield, was een ketter en werd streng gestraft."
      },
      {
       "t": "De kerk geeft ketters aan, de overheid straft ze",
       "bak": "ketter",
       "waarom": "Zo werkte de vervolging: de kerk wees aan, de overheid strafte."
      },
      {
       "t": "De paus maakt regels die niet in de Bijbel staan",
       "bak": "wet",
       "waarom": "Dit is de kritiek op het pauselijk wetboek."
      }
     ],
     "bakjes": [
      {
       "id": "aflaat",
       "label": "aflaten",
       "som": "geld voor vergeving van zonden"
      },
      {
       "id": "rijk",
       "label": "rijkdom",
       "som": "geestelijken leven niet sober"
      },
      {
       "id": "ketter",
       "label": "ketters",
       "som": "andersgelovigen streng gestraft"
      },
      {
       "id": "wet",
       "label": "wetboek",
       "som": "regels die niet in de Bijbel staan"
      }
     ],
     "w": "Vier kritiekpunten: aflaten, rijkdom, ketters en het wetboek van de paus.",
     "meer": "Kun je ze alle vier noemen zonder te spieken? Dan heb je de oorzaken van de Reformatie te pakken, en dat is een leerdoel."
    },
    {
     "t": "mc",
     "q": "Wat is een <b>ketter</b>?",
     "o": [
      "iemand die zich niet houdt aan de officiële katholieke leer",
      "een geestelijke die leiding geeft aan een kerkelijk gebied",
      "iemand die namens de paus aflaten verkoopt aan gelovigen",
      "een monnik die zonder toestemming zijn klooster verlaat"
     ],
     "a": "iemand die zich niet houdt aan de officiële katholieke leer",
     "w": "Een ketter wijkt af van wat de kerk officieel leert. Ketters werden zwaar gestraft.",
     "meer": "Luther vond dat martelen van ketters verkeerd. Ironisch genoeg werd hij zelf later door de kerk als ketter gezien.",
     "fout": {
      "een geestelijke die leiding geeft aan een kerkelijk gebied": "Dat is een <b>bisschop</b>: hij leidt een bisdom.",
      "iemand die namens de paus aflaten verkoopt aan gelovigen": "Dat is een <b>aflaatprediker</b>, zoals Johann Tetzel.",
      "een monnik die zonder toestemming zijn klooster verlaat": "Dat is geen begrip uit deze paragraaf. Een ketter gaat over wat je <b>gelooft</b>, niet over waar je woont."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "1483: Maarten Luther wordt geboren",
      "1506: Julius II maakt zijn plan voor de Sint-Pieter bekend",
      "1517: Luther schrijft zijn kritiek op de kerk op",
      "1546: Luther sterft",
      "1626: de Sint-Pieterbasiliek is helemaal af"
     ],
     "w": "Luther leeft van 1483 tot 1546. De Sint-Pieter wordt pas lang na zijn dood afgebouwd.",
     "meer": "Valt je iets op? Aan de Sint-Pieter werd 120 jaar gebouwd. Zo veel geld was er dus nodig, en daarom werden er zo veel aflaten verkocht."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "In de toets krijg je vaak: <i>Haal uit de bron een argument.</i> Dan wil de docent twee dingen zien: <b>wat je in de bron ziet of leest</b>, en <b>waarom Luther dat fout vond</b>. Alleen 'Luther was tegen aflaten' is te kort: dat weet je uit je hoofd, niet uit de bron.",
    "Voorbeeld met de prent van de aflaathandel: <i>In de bron zie je mensen geld op tafel leggen voor een aflaat.</i> (wat je ziet) <i>Luther vond dat uitbuiting van arme en goedgelovige mensen, want alleen God kan zonden vergeven.</i> (waarom het fout is). Twee halve stappen, samen één punt per bron.",
    "<b>Citeren</b> = letterlijk overnemen, tussen aanhalingstekens. Vraagt de opdracht 'met citaten uit de tekst', zet dan echt een hele zin uit de tekst tussen aanhalingstekens. Bij de vraag over de macht van de paus schreef je 'hoogste leider' en 'veel macht': goede woorden! Maak er nu een hele zin van, met de reden erbij.",
    "Welke <b>soort oorzaak</b> is Luthers kritiek? Vooral <b>religieus</b> (geloof: wie vergeeft zonden, wat staat er in de Bijbel?). Maar er zit ook <b>geld</b> in (economisch: aflaten betalen een kerk) en <b>macht</b> (politiek: de paus maakt eigen wetten, de overheid straft ketters)."
   ],
   "regel": "Argument uit een bron = wat je in de bron ziet of leest + waarom Luther dat fout vond.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat kun je uit deze bron afleiden over de aflaathandel?",
     "bron": {
      "titel": "Bron A: een gedrukte aflaatbrief",
      "tekst": "Op een vel papier is de tekst van een aflaat al helemaal gedrukt. Alleen de naam van de koper en de datum zijn open gelaten: die schrijft de verkoper er met de hand bij. Onderaan is plek voor een zegel.",
      "onder": "Naar: gedrukte aflaatbrieven uit het begin van de zestiende eeuw (eigen beschrijving)"
     },
     "o": [
      "aflaten werden in grote aantallen verkocht",
      "elke aflaat werd persoonlijk door de paus geschreven en ondertekend",
      "alleen geestelijken mochten zelf een aflaat kopen bij de kerk",
      "arme mensen kregen hun aflaat gratis van de aflaatprediker"
     ],
     "a": "aflaten werden in grote aantallen verkocht",
     "w": "Als je de tekst vooraf drukt en alleen de naam openlaat, ben je van plan er heel veel te verkopen. Dat zie je aan de bron zelf.",
     "meer": "Zo haal je iets uit een bron: kijk naar wat je echt ziet (een voorgedrukt formulier met een open plek) en vraag je af wat dat betekent (massaverkoop).",
     "fout": {
      "elke aflaat werd persoonlijk door de paus geschreven en ondertekend": "Kijk naar de bron: de tekst is <b>gedrukt</b>, de naam wordt er door de <b>verkoper</b> bij geschreven. De paus zat niet elke brief te schrijven.",
      "alleen geestelijken mochten zelf een aflaat kopen bij de kerk": "Juist gewone gelovigen kochten aflaten. Daarom vond Luther het uitbuiting van arme en goedgelovige mensen.",
      "arme mensen kregen hun aflaat gratis van de aflaatprediker": "Een aflaat kostte geld, dat was nu juist het punt. Dat geld ging naar de Sint-Pieter."
     }
    },
    {
     "t": "mc",
     "q": "Welk kritiekpunt van Luther zie je in deze bron terug?",
     "bron": {
      "titel": "Bron B: een boer in 1517",
      "tekst": "'Ik heb mijn laatste geld aan een aflaat gegeven, voor de ziel van mijn overleden moeder. De prediker zei dat ze dan sneller in de hemel komt. Nu heb ik geen geld meer voor zaaigoed.'",
      "onder": "Eigen bewerking, zoals een arme Duitse boer het in 1517 zou kunnen zeggen"
     },
     "o": [
      "aflaten buiten arme, goedgelovige mensen uit",
      "de paus maakt een wetboek met regels die niet in de Bijbel staan",
      "ketters worden door de kerk aangegeven en door de overheid gemarteld",
      "bisschoppen wonen in rijk versierde huizen en leven niet sober"
     ],
     "a": "aflaten buiten arme, goedgelovige mensen uit",
     "w": "De boer is arm, gelooft de prediker en geeft zijn laatste geld uit. Precies dat noemde Luther uitbuiting.",
     "meer": "Bewijs uit de bron: 'Ik heb mijn laatste geld aan een aflaat gegeven' (arm) en 'De prediker zei dat ze dan sneller in de hemel komt' (goedgelovig).",
     "fout": {
      "de paus maakt een wetboek met regels die niet in de Bijbel staan": "Het wetboek komt in deze bron niet voor. Zoek altijd naar wat er <b>echt in de bron</b> staat: hier gaat het over geld en een aflaat.",
      "ketters worden door de kerk aangegeven en door de overheid gemarteld": "Niemand wordt hier gestraft. De boer is gewoon een gelovige die een aflaat koopt.",
      "bisschoppen wonen in rijk versierde huizen en leven niet sober": "Er komt geen bisschop of huis in de bron voor. Het gaat om de <b>koper</b> van een aflaat."
     }
    },
    {
     "t": "sleep",
     "opgave": "Welke soort kritiek is dit vooral?",
     "chips": [
      {
       "t": "Alleen God kan zonden vergeven",
       "bak": "rel",
       "waarom": "Dit gaat over het geloof: wie mag zonden vergeven? Dus religieus."
      },
      {
       "t": "Geestelijken leven niet volgens de Bijbel",
       "bak": "rel",
       "waarom": "Leven volgens de Bijbel is een geloofskwestie: religieus."
      },
      {
       "t": "Het geld van arme mensen gaat naar een dure kerk",
       "bak": "eco",
       "waarom": "Het gaat om geld en wie dat betaalt: economisch."
      },
      {
       "t": "Aflaten brengen de kerk veel geld op",
       "bak": "eco",
       "waarom": "Inkomsten en geld: economisch."
      },
      {
       "t": "De paus maakt zijn eigen wetten",
       "bak": "pol",
       "waarom": "Wie de wetten maakt, gaat over macht en bestuur: politiek."
      },
      {
       "t": "De overheid straft ketters op aanwijzing van de kerk",
       "bak": "pol",
       "waarom": "Straffen door de overheid is een kwestie van macht en bestuur: politiek."
      }
     ],
     "bakjes": [
      {
       "id": "rel",
       "label": "religieus (geloof)",
       "som": "over God, zonden en de Bijbel"
      },
      {
       "id": "eco",
       "label": "economisch (geld)",
       "som": "over geld, kosten en inkomsten"
      },
      {
       "id": "pol",
       "label": "politiek (macht en bestuur)",
       "som": "over wetten, straffen en wie de baas is"
      }
     ],
     "w": "Geloof is religieus, geld is economisch, macht en wetten zijn politiek.",
     "meer": "Twijfel je? Vraag je af: gaat het over God (religieus), over geld (economisch) of over wie de baas is (politiek)?"
    },
    {
     "t": "mc",
     "q": "Opdracht: <i>Leg met een citaat uit de tekst uit waarom de paus zo machtig was.</i> Welk antwoord levert de meeste punten op?",
     "o": [
      "'De paus in Rome was de hoogste leider van deze kerk.' Bijna iedereen hoorde bij die kerk.",
      "De paus had veel macht en was de hoogste leider, dat weet iedereen wel.",
      "Hoogste leider, veel macht, eerste stand, rijk, Rome, aflaten.",
      "De paus was machtig omdat hij heel veel geld verdiende met de aflaten."
     ],
     "a": "'De paus in Rome was de hoogste leider van deze kerk.' Bijna iedereen hoorde bij die kerk.",
     "w": "Dit antwoord citeert echt een zin uit de tekst, tussen aanhalingstekens, en legt er de reden bij uit.",
     "meer": "Losse woorden zijn geen citaat. Een citaat is een <b>hele zin</b> uit de tekst, letterlijk en tussen aanhalingstekens.",
     "fout": {
      "De paus had veel macht en was de hoogste leider, dat weet iedereen wel.": "Er staat geen citaat in (geen aanhalingstekens) en 'dat weet iedereen' is geen uitleg.",
      "Hoogste leider, veel macht, eerste stand, rijk, Rome, aflaten.": "Een rijtje losse woorden is geen antwoord. De docent wil een hele zin uit de tekst plus de reden.",
      "De paus was machtig omdat hij heel veel geld verdiende met de aflaten.": "Dat staat niet in de tekst als reden voor zijn macht, en er is geen citaat."
     }
    },
    {
     "t": "mc",
     "q": "<b>Toen en nu.</b> Wat is van de tijd van Luther tot nu <b>hetzelfde gebleven</b>?",
     "o": [
      "de rooms-katholieke kerk heeft een paus in Rome",
      "de kerk verkoopt aflaten om nieuwe kerken van te bouwen",
      "bijna iedereen in West-Europa hoort bij de katholieke kerk",
      "ketters worden door de overheid gemarteld en gestraft"
     ],
     "a": "de rooms-katholieke kerk heeft een paus in Rome",
     "w": "Er is nog altijd een paus in Rome. Franciscus was paus van 2013 tot 2025, sinds 2025 is dat Leo XIV.",
     "meer": "Dat iets blijft, heet <b>continuïteit</b>. Wat anders werd, heet <b>verandering</b>: de andere drie opties zijn allemaal veranderd.",
     "fout": {
      "de kerk verkoopt aflaten om nieuwe kerken van te bouwen": "Aflaten verkopen voor geld doet de kerk niet meer. Dat is dus veranderd.",
      "bijna iedereen in West-Europa hoort bij de katholieke kerk": "Juist door Luther kwam daar een einde aan: sindsdien zijn er ook protestanten. Veranderd dus.",
      "ketters worden door de overheid gemarteld en gestraft": "In Nederland mag iedereen nu geloven wat hij wil. Ook veranderd."
     }
    },
    {
     "t": "mc",
     "q": "Je gaat met je moeder winkelen. Een verkoper zegt: 'Koop dit jasje, dan krijg je thuis nooit meer straf.' Op welk begrip uit deze paragraaf lijkt dat?",
     "o": [
      "een aflaat",
      "een bul",
      "een edict",
      "een stelling"
     ],
     "a": "een aflaat",
     "w": "Bij een aflaat betaal je geld en krijg je in ruil de belofte dat je straf voor je zonden verdwijnt. Precies zo'n verkooppraatje.",
     "meer": "Daarom vond Luther het uitbuiting: mensen betalen voor een belofte die volgens hem alleen God kan waarmaken.",
     "fout": {
      "een bul": "Een bul is een brief van de paus, zoals die van Leo X aan Luther. Daar koop je niets mee.",
      "een edict": "Een edict is een bevel van een vorst, zoals het Edict van Worms van de keizer. Ook dat koop je niet.",
      "een stelling": "Een stelling is een bewering, zoals Luthers 95 stellingen. Daar betaal je niet voor."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg met bron C uit waarom Luther tegen de aflaathandel was. Haal je argument uit de bron. (2p)",
     "bron": {
      "titel": "Bron C: een rijmpje van de aflaatpredikers",
      "tekst": "'Zodra het geld in het kistje klinkt, springt de ziel uit het vagevuur.'<br><br>(Het <i>vagevuur</i> is volgens de kerk de plek waar zielen na de dood voor hun zonden boeten, voordat ze naar de hemel mogen.)",
      "onder": "Naar: een Duits rijmpje dat van oudsher aan aflaatprediker Johann Tetzel wordt toegeschreven (rond 1517), vrij vertaald"
     },
     "tip": "Twee stappen: eerst wat er in de bron staat (citeer het), dan waarom Luther dat fout vond. Zet elke stap op een eigen regel.",
     "model": [
      {
       "label": "Wat de bron zegt",
       "tekst": "In de bron staat: \"Zodra het geld in het kistje klinkt, springt de ziel uit het vagevuur.\" De predikers beloven dus dat je met geld een ziel naar de hemel kunt helpen."
      },
      {
       "label": "Waarom Luther dat fout vond",
       "tekst": "Luther vond dat alleen God zonden kan vergeven. Met geld kun je dat niet kopen, dus de predikers maakten misbruik van arme en goedgelovige mensen."
      }
     ],
     "checklist": [
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": [
        "kistje",
        "klinkt",
        "vagevuur"
       ]
      },
      {
       "t": "Ik leg uit wat de predikers beloven (geld = hemel).",
       "woorden": [
        "geld",
        "hemel"
       ]
      },
      {
       "t": "Ik noem Luthers argument: alleen God kan zonden vergeven.",
       "woorden": [
        "god",
        "vergev"
       ]
      },
      {
       "t": "Ik gebruik het woord uitbuiting of misbruik van arme mensen.",
       "woorden": [
        "uitbuit",
        "misbruik",
        "arm"
       ]
      }
     ],
     "w": "Een goed antwoord laat zien wat er in de bron staat en verbindt dat met Luthers mening.",
     "meer": "Veelgemaakte fout: alleen schrijven 'Luther was tegen aflaten'. Dat staat nergens in de bron en levert geen punt op. Laat zien dát je de bron gebruikt."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij Goud krijg je bronnen die je nog nooit gezien hebt. De vraag is dan vaak: <b>is de maker voor of tegen</b>? Begin je antwoord met je keuze. Bewijs het daarna met iets wat je <b>in de bron zelf</b> ziet of leest. Het onderschrift (wie het maakte, wanneer) is géén bewijs: dat vertelt niets over wat de maker vindt.",
    "Let ook op de woorden die een maker kiest. Wie iets 'uitbuiting' noemt, is tegen. Wie het 'de grootste genade' noemt, is voor. Bij een prent kijk je naar wie er goed en wie er slecht uitziet, en wie er tegenover wie staat.",
    "Een <b>inzichtvraag</b> vraagt: waarom was dit zo belangrijk? Denk dan een stap verder. Luther zei: alleen God vergeeft zonden. Wat betekent dat voor de kerk? Dan heb je geen aflaat meer nodig, dus verliest de kerk geld. En je hebt de geestelijken minder nodig, dus verliest de kerk macht. Zo maak je van één feit een redenering in stappen."
   ],
   "regel": "Voor of tegen: eerst je keuze, dan bewijs uit de bron zelf, nooit uit het onderschrift.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Is de maker van deze prenten voor of tegen de paus? Bewijs je antwoord met iets wat je in de prenten ziet. (2p)",
     "bron": {
      "titel": "Bron D: twee prenten naast elkaar",
      "tekst": "<b>Linkerprent:</b> Jezus jaagt met een zweep handelaars en geldwisselaars de tempel uit. Hun tafels vallen om, munten rollen over de grond.<br><b>Rechterprent:</b> de paus zit op een troon achter een tafel vol geld. Mensen leggen munten neer en krijgen een brief met een zegel terug.",
      "onder": "Naar: twee houtsneden uit een prentenboekje van Lucas Cranach de Oude (1521)"
     },
     "tip": "Begin met 'voor' of 'tegen'. Kijk daarna wat de maker naast elkaar zet en wat dat vergelijk betekent. Het onderschrift is geen bewijs.",
     "model": [
      {
       "label": "Keuze",
       "tekst": "De maker is tegen de paus."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "Op de linkerprent jaagt Jezus de geldhandel de tempel uit. Op de rechterprent doet de paus juist geldhandel: hij verkoopt brieven met zegels, dus aflaten."
      },
      {
       "label": "Wat de maker daarmee zegt",
       "tekst": "Door die twee naast elkaar te zetten, laat de maker zien dat de paus het tegenovergestelde doet van Jezus. Daardoor ziet de paus er slecht uit."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met mijn keuze: tegen.",
       "woorden": [
        "tegen"
       ]
      },
      {
       "t": "Ik beschrijf wat Jezus doet op de linkerprent.",
       "woorden": [
        "jezus",
        "tempel",
        "zweep"
       ]
      },
      {
       "t": "Ik beschrijf wat de paus doet op de rechterprent.",
       "woorden": [
        "paus",
        "geld",
        "aflaat",
        "brief"
       ]
      },
      {
       "t": "Ik leg uit wat de vergelijking betekent (tegenovergesteld).",
       "woorden": [
        "tegenover",
        "anders",
        "omgekeerd"
       ]
      }
     ],
     "w": "Het bewijs zit in de vergelijking: Jezus tegen geldhandel, de paus vol geldhandel. Dan is de maker tegen de paus.",
     "meer": "Veelgemaakte fout: 'Cranach was een vriend van Luther, dus hij is tegen.' Dat haal je niet uit de prent. Gebruik wat je ziet."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Luther zei: 'Alleen God kan zonden vergeven.' Leg uit waarom dat idee gevaarlijk was voor de kerk. (2p)",
     "tip": "Denk een stap verder dan het idee zelf: als mensen dit geloven, wat verliest de kerk dan? Zet elke stap op een eigen regel.",
     "model": [
      {
       "label": "Wat Luther zegt",
       "tekst": "Als alleen God zonden kan vergeven, dan heeft een aflaat geen zin."
      },
      {
       "label": "Gevolg voor het geld",
       "tekst": "Daardoor kopen mensen geen aflaten meer en verliest de kerk veel geld, bijvoorbeeld voor de Sint-Pieter."
      },
      {
       "label": "Gevolg voor de macht",
       "tekst": "Ook hebben gelovigen de geestelijken en de paus minder nodig. Daardoor verliest de kerk macht over de mensen."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg uit dat een aflaat dan geen zin meer heeft.",
       "woorden": [
        "aflaat"
       ]
      },
      {
       "t": "Ik noem het verlies van geld.",
       "woorden": [
        "geld",
        "inkomst"
       ]
      },
      {
       "t": "Ik noem het verlies van macht of gezag.",
       "woorden": [
        "macht",
        "gezag",
        "nodig"
       ]
      },
      {
       "t": "Ik gebruik 'daardoor' of 'dus' om de stappen te verbinden.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "Het idee raakt de kerk op twee plekken: in haar geld (geen aflaten meer) en in haar macht (geestelijken minder nodig).",
     "meer": "Bij een inzichtvraag is 'omdat Luther het niet eens was' te kort. Laat zien wat er daardoor verandert, in stappen."
    },
    {
     "t": "mc",
     "q": "Bij een prent staat: <i>Aflaathandel, prent uit ca. 1520.</i> Welk antwoord gebruikt bewijs uit de <b>bron zelf</b>?",
     "o": [
      "In de prent zie je een man achter een geldkist die brieven met zegels uitdeelt.",
      "Onder de prent staat 'Aflaathandel', dus deze prent gaat duidelijk over het kopen van aflaten.",
      "De prent komt uit 1520, dus uit de tijd van Luther, dus het gaat vast over Luthers kritiek op de kerk.",
      "Luther was tegen aflaten, dat weet ik uit de tekst, dus deze prent laat de slechte kant van de kerk zien."
     ],
     "a": "In de prent zie je een man achter een geldkist die brieven met zegels uitdeelt.",
     "w": "Dit beschrijft wat er echt op de prent te zien is. Dat telt als bewijs uit de bron.",
     "meer": "Het onderschrift is uitleg van iemand anders. De docent wil zien dat je zelf <b>kijkt</b>.",
     "fout": {
      "Onder de prent staat 'Aflaathandel', dus deze prent gaat duidelijk over het kopen van aflaten.": "Dit haal je uit het <b>onderschrift</b>, niet uit de prent. Dat is precies wat het werkboek niet goed rekent.",
      "De prent komt uit 1520, dus uit de tijd van Luther, dus het gaat vast over Luthers kritiek op de kerk.": "Ook het jaartal staat in het onderschrift. Een jaartal bewijst niet wat er op de prent gebeurt.",
      "Luther was tegen aflaten, dat weet ik uit de tekst, dus deze prent laat de slechte kant van de kerk zien.": "Dit is kennis uit je hoofd, geen bewijs uit de bron. Je hebt nog niet naar de prent gekeken."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom werd Luther zo boos over de aflaten?",
     "stappen": [
      "Julius II wil de Sint-Pieter in Rome verfraaien",
      "Daar is heel veel geld voor nodig",
      "Predikers als Tetzel verkopen aflaten aan gewone gelovigen",
      "Arme, goedgelovige mensen geven hun geld uit aan een aflaat",
      "Luther noemt dat uitbuiting: alleen God kan zonden vergeven"
     ],
     "w": "Een verklaring in stappen: plan, geld nodig, verkoop, slachtoffers, kritiek.",
     "meer": "Zo schrijf je een T2-antwoord: elke stap een eigen regel, verbonden met 'daardoor' of 'dus'. Jaartal erbij? Julius II maakte zijn plan in 1506, Luther schreef zijn kritiek in 1517."
    },
    {
     "t": "mc",
     "q": "Hoe zou een aflaatprediker als Tetzel zijn werk verdedigen tegenover Luther?",
     "o": [
      "een aflaat helpt een ziel naar de hemel en bouwt een kerk",
      "aflaten zijn eigenlijk onzin, maar de kerk heeft het geld hard nodig",
      "alleen God kan zonden vergeven, dus een aflaat is maar een cadeautje",
      "de paus heeft hem gedwongen, hij is het zelf eigenlijk met Luther eens"
     ],
     "a": "een aflaat helpt een ziel naar de hemel en bouwt een kerk",
     "w": "Vanuit de kerk gezien was een aflaat iets goeds: boetedoening voor zonden, en het geld ging naar een heilig gebouw.",
     "meer": "Dit heet <b>perspectief</b>: dezelfde aflaat is voor Luther uitbuiting en voor de kerk een genade. Je moet beide kanten kunnen uitleggen.",
     "fout": {
      "aflaten zijn eigenlijk onzin, maar de kerk heeft het geld hard nodig": "Een prediker die zelf zegt dat het onzin is, verkoopt niets. Vanuit zijn kant geloofde de kerk juist dat een aflaat werkte.",
      "alleen God kan zonden vergeven, dus een aflaat is maar een cadeautje": "'Alleen God kan zonden vergeven' is het argument van <b>Luther</b>, niet van de kerk.",
      "de paus heeft hem gedwongen, hij is het zelf eigenlijk met Luther eens": "Daar is geen bewijs voor. Tetzel was juist een fel aflaatprediker, en Luther was vooral boos op hem."
     }
    },
    {
     "t": "mc",
     "q": "Luther was zelf monnik en leraar. Waarom maakte dat zijn kritiek extra opvallend?",
     "o": [
      "de kritiek kwam van binnen de kerk zelf",
      "monniken mochten volgens de wet helemaal niets schrijven",
      "hij was daardoor de baas van alle bisschoppen in Duitsland",
      "leraren werden in die tijd door niemand serieus genomen"
     ],
     "a": "de kritiek kwam van binnen de kerk zelf",
     "w": "Luther hoorde bij de geestelijken, de eerste stand waar men tegen opkeek. Als zo iemand kritiek heeft, luisteren mensen.",
     "meer": "Inzicht: het maakt uit wíe iets zegt. Kritiek van een geestelijke klonk geloofwaardiger dan kritiek van een buitenstaander.",
     "fout": {
      "monniken mochten volgens de wet helemaal niets schrijven": "Dat klopt niet: monniken schreven juist veel, ze konden lezen en schrijven.",
      "hij was daardoor de baas van alle bisschoppen in Duitsland": "Een monnik staat juist lager dan een bisschop. Luther was geen baas van wie dan ook.",
      "leraren werden in die tijd door niemand serieus genomen": "Dan zou zijn kritiek juist minder opvallen. En het klopt ook niet: hij was leraar aan een universiteit."
     }
    },
    {
     "t": "mc",
     "q": "Wie had het meeste <b>voordeel</b> van de aflaathandel?",
     "o": [
      "de kerk in Rome",
      "de arme gelovigen, die er rijker van werden",
      "keizer Karel V, die er zijn oorlogen van betaalde",
      "Luther, die er zijn Bijbelvertaling van liet drukken"
     ],
     "a": "de kerk in Rome",
     "w": "Het geld van de aflaten ging naar de kerk, onder andere voor de Sint-Pieterbasiliek.",
     "meer": "Als je weet wie voordeel heeft, snap je ook waarom de kerk Luthers kritiek niet wilde horen: die kostte haar geld.",
     "fout": {
      "de arme gelovigen, die er rijker van werden": "Juist niet: zij betaalden. Daarom sprak Luther van uitbuiting.",
      "keizer Karel V, die er zijn oorlogen van betaalde": "Dat staat niet in de stof. Het aflaatgeld ging naar de kerk en de Sint-Pieter.",
      "Luther, die er zijn Bijbelvertaling van liet drukken": "Luther was juist tégen aflaten. Hij verdiende er niets aan."
     }
    }
   ]
  }
 ]
},
{
 "id": "reformatie",
 "emoji": "📜",
 "titel": "3.5.2 · De Reformatie",
 "paragraaf": "§3.5",
 "kort": "Luther zet zijn kritiek in 95 stellingen. Paus Leo X stuurt een bul, Luther verbrandt hem en wordt uit de kerk gezet. Het gevolg: één kerk wordt er twee, katholiek en protestants.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Luther schrijft zijn kritiek in <b>1517</b> op in <b>95 stellingen</b>: een puntsgewijs overzicht van alles wat hij fout vindt aan de kerk. Zijn doel: de kerk <b>veranderen</b> (hervormen). Hij wil eerst helemaal geen nieuwe kerk. Volgens een bekend verhaal timmerde hij ze op 31 oktober aan een kerkdeur in Wittenberg, maar of dat echt zo ging, is niet zeker.",
    "Dankzij de <b>boekdrukkunst</b> worden de stellingen razendsnel verspreid. Zo krijgt Luther aanhangers: de <b>protestanten</b>, aanhangers van de christelijke richting die zich afscheidt van de katholieke kerk.",
    "Paus <b>Leo X</b> (1475-1521) accepteert de kritiek niet. In <b>1520</b> stuurt hij Luther een <b>bul</b>: een brief van de paus waarin staat dat Luther moet terugkomen op zijn kritiek. Luther weigert en <b>verbrandt de bul</b>, samen met het pauselijk wetboek. De paus is woedend en zet in <b>1521</b> Luther en al zijn volgelingen <b>uit de kerk</b>. Onthoud: de bul komt van de <b>paus</b>.",
    "Daarmee is de eenheid van het christendom in West-Europa voorbij. Er is nu een <b>rooms-katholiek</b> en een <b>protestants</b> christendom. Dat heet de <b>Reformatie</b> (of Hervorming): 'De splitsing in de christelijke kerk in een rooms-katholiek en een protestants deel als gevolg van het optreden van Luther en andere kerkhervormers in de 16e eeuw.'",
    "Het <b>kenmerkend aspect</b> van deze paragraaf: <i>de protestantse Reformatie had de splitsing van de christelijke kerk in West-Europa tot gevolg.</i> Overeenkomst tussen de twee: allebei christelijk. Verschil: <b>katholieken</b> volgen de paus, protestanten niet."
   ],
   "regel": "95 stellingen (1517), bul van Leo X (1520), Luther verbrandt hem, uit de kerk gezet (1521), splitsing: katholiek en protestants.",
   "voorbeelden": [
    {
     "en": "Overeenkomst: allebei christelijk. Verschil: katholieken volgen de paus, protestanten niet.",
     "let": "Bij een vraag naar overeenkomst én verschil moet je allebei noemen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wat wilde Luther bereiken met zijn 95 stellingen?",
     "o": [
      "de kerk veranderen",
      "een eigen nieuwe kerk oprichten met hemzelf als paus",
      "keizer Karel V afzetten en zelf gaan regeren",
      "geld verdienen met het verkopen van zijn boekjes"
     ],
     "a": "de kerk veranderen",
     "w": "Luther wilde de kerk hervormen: van binnenuit verbeteren.",
     "meer": "De splitsing was dus niet zijn plan. Dat werd het pas toen de paus hem uit de kerk zette.",
     "fout": {
      "een eigen nieuwe kerk oprichten met hemzelf als paus": "Nee, hij wilde de bestaande kerk verbeteren. Protestanten erkennen bovendien helemaal geen paus.",
      "keizer Karel V afzetten en zelf gaan regeren": "Luther was een monnik, geen vorst. Het ging hem om het geloof, niet om de macht in het rijk.",
      "geld verdienen met het verkopen van zijn boekjes": "Hij had juist kritiek op geld in de kerk. Zijn doel was het geloof, niet de verkoop."
     }
    },
    {
     "t": "mc",
     "q": "Van wie kwam de <b>bul</b> die Luther verbrandde?",
     "o": [
      "van paus Leo X",
      "van keizer Karel V",
      "van paus Julius II",
      "van keurvorst Frederik III"
     ],
     "a": "van paus Leo X",
     "w": "Een bul is een pauselijk officieel document: een brief van de paus. Leo X stuurde hem in 1520 om Luther te dwingen zijn kritiek in te trekken.",
     "meer": "Bul = paus = uit de kerk. Edict = keizer = uit het rijk. Die twee worden heel vaak verwisseld.",
     "fout": {
      "van keizer Karel V": "De keizer stuurde geen bul. Karel V kwam later met het <b>Edict van Worms</b> (1521), een bevel van de keizer.",
      "van paus Julius II": "Julius II hoort bij de Sint-Pieter en de aflaten (1506). Hij leefde in 1520 al niet meer: hij stierf in 1513.",
      "van keurvorst Frederik III": "Frederik III stond juist aan de kant van Luther en beschermde hem."
     }
    },
    {
     "t": "gap",
     "q": "Luther verbrandde de bul samen met het pauselijk ___.",
     "a": "wetboek",
     "w": "Hij verbrandde de bul én het pauselijk wetboek: zo liet hij zien dat hij het gezag van de paus niet meer erkende.",
     "meer": "Weet je nog? Op dat wetboek had hij al kritiek: het bevatte regels die niet in de Bijbel stonden."
    },
    {
     "t": "gap",
     "q": "De aanhangers van Luther, die zich afscheidden van de katholieke kerk, werden ___ genoemd.",
     "a": "protestanten|de protestanten",
     "w": "Protestanten: aanhangers van de christelijke richting die zich afscheidt van de katholieke kerk.",
     "meer": "Tegenover hen staan de katholieken: aanhangers van de (rooms-)katholieke godsdienst, die de paus volgen."
    },
    {
     "t": "mc",
     "q": "Wat betekent <b>Reformatie</b>?",
     "o": [
      "de splitsing van de kerk in een katholiek en een protestants deel",
      "de verbouwing van de Sint-Pieterbasiliek met het geld van de aflaten",
      "de vrede waarin elke Duitse vorst het geloof in zijn gebied mocht bepalen",
      "het keizerlijke bevel waarmee Luther in het hele rijk vogelvrij werd verklaard"
     ],
     "a": "de splitsing van de kerk in een katholiek en een protestants deel",
     "w": "Reformatie (of Hervorming) is de splitsing van de christelijke kerk door het optreden van Luther en andere kerkhervormers in de 16e eeuw.",
     "meer": "Werkboekdefinitie: 'De splitsing in de christelijke kerk in een rooms-katholiek en een protestants deel als gevolg van het optreden van Luther en andere kerkhervormers in de 16e eeuw.'",
     "fout": {
      "de verbouwing van de Sint-Pieterbasiliek met het geld van de aflaten": "Die verbouwing was een <b>oorzaak</b> van Luthers kritiek, niet de Reformatie zelf.",
      "de vrede waarin elke Duitse vorst het geloof in zijn gebied mocht bepalen": "Dat is de <b>Vrede van Augsburg</b> (1555).",
      "het keizerlijke bevel waarmee Luther in het hele rijk vogelvrij werd verklaard": "Dat is het <b>Edict van Worms</b> (1521)."
     }
    },
    {
     "t": "mc",
     "q": "Welk <b>verschil</b> tussen katholieken en protestanten klopt?",
     "o": [
      "katholieken volgen de paus, protestanten niet",
      "katholieken zijn christelijk, protestanten hebben een heel ander geloof",
      "protestanten wonen alleen in Duitsland, katholieken alleen in Rome",
      "protestanten volgen de paus, katholieken volgen Luther als leider"
     ],
     "a": "katholieken volgen de paus, protestanten niet",
     "w": "Het grote verschil is de paus: katholieken zien hem als leider, protestanten niet.",
     "meer": "En de overeenkomst? Allebei horen ze bij het christendom.",
     "fout": {
      "katholieken zijn christelijk, protestanten hebben een heel ander geloof": "Protestanten zijn óók christenen. Dat is juist de <b>overeenkomst</b>.",
      "protestanten wonen alleen in Duitsland, katholieken alleen in Rome": "Het verschil zit in het geloof, niet in waar je woont. Er woonden overal in Europa katholieken.",
      "protestanten volgen de paus, katholieken volgen Luther als leider": "Precies andersom. Katholieken volgen de paus. Luther werd juist door de paus uit de kerk gezet."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "1517: Luther schrijft zijn 95 stellingen",
      "De stellingen worden verspreid met de boekdrukkunst",
      "1520: paus Leo X stuurt Luther een bul",
      "Luther verbrandt de bul en het pauselijk wetboek",
      "1521: de paus zet Luther en zijn volgelingen uit de kerk"
     ],
     "w": "Kritiek, verspreiding, bul, verbranding, uit de kerk gezet. Daarna is de kerk gesplitst.",
     "meer": "Elke stap is een reactie op de vorige. Daarom kun je de volgorde ook zonder jaartallen beredeneren."
    },
    {
     "t": "mc",
     "q": "Hoe konden de 95 stellingen zo snel overal bekend worden?",
     "o": [
      "door de boekdrukkunst",
      "doordat de paus ze in alle kerken liet voorlezen",
      "doordat keizer Karel V ze in zijn hele rijk liet ophangen",
      "doordat Luther zelf naar elke Duitse stad reisde"
     ],
     "a": "door de boekdrukkunst",
     "w": "Met de drukpers konden de stellingen in grote aantallen worden gedrukt en verspreid.",
     "meer": "Zonder de boekdrukkunst was Luthers kritiek misschien in Wittenberg blijven hangen.",
     "fout": {
      "doordat de paus ze in alle kerken liet voorlezen": "De paus was het juist niet eens met Luther. Hij wilde de stellingen niet verspreiden.",
      "doordat keizer Karel V ze in zijn hele rijk liet ophangen": "Karel V was strenggelovig katholiek en wilde Luther juist uit zijn rijk verbannen.",
      "doordat Luther zelf naar elke Duitse stad reisde": "Dat was in die tijd onmogelijk. Het drukken deed het werk."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Op de <b>waardenlijn</b> zet je twistpunten tussen Luther aan de ene kant en de rooms-katholieke kerk aan de andere kant. Vraag je bij elk punt af: wie zou dit verdedigen? De kerk verdedigt de paus, de aflaten, de prachtige kerken en het straffen van ketters. Luther kiest voor de Bijbel, een sobere levenswijze en vergeving door God alleen.",
    "Bij elk twistpunt geef je een <b>argument</b>: <i>Dit hoort bij de kerk, want ...</i> of <i>Dit hoort bij Luther, want ...</i>. Een plek op de lijn zonder 'want' levert geen punten op.",
    "Een <b>argument uit een bron</b> halen: lees wat de maker zelf zegt en zeg het in je eigen woorden. Schrijf niet op wat jij ervan vindt, en draai het niet om.",
    "Een verklaring in stappen (zoals 'waarom leidde dit tot een splitsing?'): begin bij Luther, eindig bij de splitsing, en zet elke stap op een eigen regel. Vaak zijn het er drie: Luther eruit, zijn volgelingen ook, dus twee richtingen."
   ],
   "regel": "Waardenlijn: bij elk twistpunt 'dit hoort bij ..., want ...'. Zonder 'want' geen punt.",
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Waardenlijn: wie verdedigt dit twistpunt, Luther of de rooms-katholieke kerk?",
     "chips": [
      {
       "t": "De handel in aflaten",
       "bak": "kerk",
       "waarom": "De kerk verkocht aflaten als boetedoening voor zonden. Luther was daar juist fel tegen."
      },
      {
       "t": "De paus als leider van de kerk",
       "bak": "kerk",
       "waarom": "Katholieken volgen de paus. Luther erkende zijn gezag niet meer en verbrandde zijn bul."
      },
      {
       "t": "Ketters vervolgen en streng straffen",
       "bak": "kerk",
       "waarom": "De kerk gaf ketters aan. Luther had kritiek op het martelen van ketters."
      },
      {
       "t": "Grote, prachtige kerken zoals de Sint-Pieter",
       "bak": "kerk",
       "waarom": "De kerk bouwde de Sint-Pieter met aflaatgeld. Luther vond dat geld beter besteed kon worden."
      },
      {
       "t": "De Bijbel als belangrijkste bron van het geloof",
       "bak": "luther",
       "waarom": "Luther liet zich alleen door de Bijbel overtuigen, niet door de paus of het wetboek."
      },
      {
       "t": "Een sobere stijl en levenswijze",
       "bak": "luther",
       "waarom": "Luther wilde dat geestelijken sober leefden, zoals Jezus."
      },
      {
       "t": "Alleen God kan zonden vergeven",
       "bak": "luther",
       "waarom": "Dit was Luthers argument tegen aflaten."
      },
      {
       "t": "Gelovigen lezen zelf de Bijbel in hun eigen taal",
       "bak": "luther",
       "waarom": "Daarom vertaalde Luther de Bijbel naar het Duits."
      }
     ],
     "bakjes": [
      {
       "id": "luther",
       "label": "Luther",
       "som": "Bijbel, soberheid, God vergeeft"
      },
      {
       "id": "kerk",
       "label": "de rooms-katholieke kerk",
       "som": "paus, aflaten, pracht, ketters straffen"
      }
     ],
     "w": "De kerk: paus, aflaten, pracht en ketters straffen. Luther: de Bijbel, soberheid en God die vergeeft.",
     "meer": "In de toets moet je ook uitleggen wáárom. Oefen met de zin: 'Dit hoort bij ..., want ...'."
    },
    {
     "t": "mc",
     "q": "Een leerling zet 'een sobere stijl en levenswijze' op de waardenlijn bij Luther. Welk argument levert een punt op?",
     "o": [
      "want Luther vond dat geestelijken sober moesten leven, zoals Jezus",
      "want Luther was protestant",
      "want dat staat aan de kant van Luther op de waardenlijn in het werkboek",
      "want de katholieke kerk was rijker dan Luther zelf"
     ],
     "a": "want Luther vond dat geestelijken sober moesten leven, zoals Jezus",
     "w": "Dit argument noemt Luthers mening en de reden erbij.",
     "meer": "Een goed argument gaat over de <b>inhoud</b>: wat vond Luther, en waarom?",
     "fout": {
      "want Luther was protestant": "Dat zegt niets over soberheid. Het is geen argument, het is een etiket.",
      "want dat staat aan de kant van Luther op de waardenlijn in het werkboek": "Dat is geen argument, dat herhaalt alleen waar je hem neerzette.",
      "want de katholieke kerk was rijker dan Luther zelf": "Dat is een vergelijking van rijkdom, niet Luthers mening over hoe geestelijken moeten leven."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Haal uit elke stelling in bron A een argument waarom Luther tegen aflaten was. (2p)",
     "bron": {
      "titel": "Bron A: twee van de 95 stellingen",
      "tekst": "<b>Stelling 36:</b> 'Iedere christen die echt spijt heeft, krijgt volledige vergeving van straf en schuld, ook zonder aflaatbrief.'<br><b>Stelling 43:</b> 'Men moet christenen leren dat wie iets geeft aan een arme, beter doet dan wie aflaten koopt.'",
      "onder": "Naar: Luther, stelling 36 en 43 uit de 95 stellingen (1517), vrij vertaald"
     },
     "tip": "Per stelling één regel: wat staat er (in je eigen woorden), en wat betekent dat voor aflaten?",
     "model": [
      {
       "label": "Stelling 36",
       "tekst": "In stelling 36 staat dat je vergeving krijgt als je echt spijt hebt, \"ook zonder aflaatbrief\". Een aflaat is dus overbodig."
      },
      {
       "label": "Stelling 43",
       "tekst": "In stelling 43 staat dat geven aan een arme beter is dan een aflaat kopen. Het geld kan dus beter aan arme mensen besteed worden."
      }
     ],
     "checklist": [
      {
       "t": "Ik behandel stelling 36 en stelling 43 apart.",
       "woorden": [
        "36",
        "43"
       ]
      },
      {
       "t": "Bij 36: echte spijt is genoeg, een aflaat is overbodig.",
       "woorden": [
        "spijt",
        "overbodig",
        "zonder"
       ]
      },
      {
       "t": "Bij 43: het geld kan beter naar de armen.",
       "woorden": [
        "arm"
       ]
      },
      {
       "t": "Ik schrijf wat er in de bron staat, niet alleen 'Luther was tegen'.",
       "woorden": []
      }
     ],
     "w": "Twee stellingen, twee argumenten: spijt is genoeg, en geef liever aan de armen.",
     "meer": "Veelgemaakte fout: twee keer hetzelfde argument geven. De docent wil per bron een ander argument zien."
    },
    {
     "t": "mc",
     "q": "Luther verbrandde in 1520 de bul. Waarom maakte juist dát de paus zo woedend?",
     "o": [
      "Luther liet zien dat hij het gezag van de paus niet meer erkende",
      "Luther had de bul gestolen uit het paleis van de paus in Rome",
      "Luther wilde zelf paus worden in de plaats van Leo X",
      "het vuur verwoestte ook een deel van de Sint-Pieterbasiliek"
     ],
     "a": "Luther liet zien dat hij het gezag van de paus niet meer erkende",
     "w": "Een bul van de paus verbranden is in het openbaar zeggen: jij hebt mij niets te vertellen.",
     "meer": "Daarna had de paus maar één middel over: Luther en zijn volgelingen uit de kerk zetten.",
     "fout": {
      "Luther had de bul gestolen uit het paleis van de paus in Rome": "De bul was aan Luther <b>gestuurd</b>. Hij hoefde niets te stelen.",
      "Luther wilde zelf paus worden in de plaats van Leo X": "Luther wilde helemaal geen paus zijn. Protestanten erkennen geen paus.",
      "het vuur verwoestte ook een deel van de Sint-Pieterbasiliek": "Luther verbrandde de bul in Duitsland, niet in Rome. De Sint-Pieter bleef heel."
     }
    },
    {
     "t": "mc",
     "q": "De splitsing van de christelijke kerk is vooral een ... gevolg.",
     "o": [
      "religieus",
      "economisch",
      "sociaal"
     ],
     "a": "religieus",
     "w": "Het gaat over geloof: één kerk wordt twee christelijke richtingen.",
     "meer": "Later kreeg de splitsing ook politieke gevolgen (vorsten kozen kant), maar de splitsing zelf is een geloofskwestie.",
     "fout": {
      "economisch": "Economisch gaat over geld. De splitsing gaat over welk geloof je hebt en of je de paus volgt.",
      "sociaal": "Sociaal gaat over hoe mensen samenleven en over arm en rijk. De splitsing gaat over het geloof zelf."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom leidde Luthers ban tot een splitsing van de kerk?",
     "stappen": [
      "De paus zet Luther uit de kerk",
      "Ook zijn volgelingen, de protestanten, worden eruit gezet",
      "De protestanten gaan apart verder, zonder de paus",
      "Er zijn nu twee christelijke richtingen: katholiek en protestants",
      "De kerk in West-Europa is gescheurd"
     ],
     "w": "Begin bij Luther, eindig bij de scheuring. Elke stap volgt uit de vorige.",
     "meer": "Bij deze vraag in het werkboek had je bijna alles: 'Luther, aanhangers, uit kerk gezet, protestanten, splitsing'. Maak er nu hele zinnen van, één per regel, dan heb je alle drie de punten."
    },
    {
     "t": "mc",
     "q": "<b>Toen en nu.</b> Op 31 oktober vieren protestanten nog steeds Hervormingsdag. Wat herdenken ze dan?",
     "o": [
      "dat Luther in 1517 zijn 95 stellingen bekendmaakte",
      "dat Luther in 1521 voor de rijksdag in Worms verscheen",
      "dat in 1555 de Vrede van Augsburg werd gesloten",
      "dat Luther in 1534 zijn vertaling van de Bijbel af had"
     ],
     "a": "dat Luther in 1517 zijn 95 stellingen bekendmaakte",
     "w": "Hervormingsdag herinnert aan het begin van de Reformatie: de 95 stellingen van 1517.",
     "meer": "Dit is <b>continuïteit</b>: na ruim 500 jaar wordt het nog steeds gevierd.",
     "fout": {
      "dat Luther in 1521 voor de rijksdag in Worms verscheen": "Worms was belangrijk, maar het begin van de Reformatie ligt eerder: bij de stellingen van 1517.",
      "dat in 1555 de Vrede van Augsburg werd gesloten": "Augsburg is het einde van het gevecht met de keizer, niet het begin van de Reformatie.",
      "dat Luther in 1534 zijn vertaling van de Bijbel af had": "De Lutherbijbel is een mijlpaal, maar Hervormingsdag gaat over de stellingen."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Een <b>T2-verklaring</b> vraagt veel stappen. Maak eerst een kladje met pijlen: stellingen, verspreid, bul, verbrand, uit de kerk, splitsing. Schrijf daarna elke pijl als een hele zin. Verbind ze met 'daardoor', 'dus' of 'waardoor'. Zit er een bron bij, citeer dan uit die bron bij de stap waar hij past.",
    "<b>Perspectief</b>: dezelfde gebeurtenis zag er voor beide kanten anders uit. Voor de paus was de bulverbranding een misdaad tegen Gods kerk. Voor een protestant was het moed: Luther bleef staan achter wat hij in de Bijbel las. Bij een perspectiefvraag leg je beide kanten uit, elk met een reden.",
    "<b>Bedoeld of onbedoeld</b>: Luther wilde de kerk verbeteren. De splitsing was een <b>onbedoeld</b> gevolg: het gebeurde wel, maar het was niet zijn plan."
   ],
   "regel": "Een verklaring in stappen begint bij de oorzaak en eindigt bij het gevolg, elke stap een eigen zin.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg uit hoe Luthers 95 stellingen uiteindelijk leidden tot de splitsing van de kerk. Begin bij de stellingen, eindig bij de splitsing, en gebruik bron B. (4p)",
     "bron": {
      "titel": "Bron B: een brief uit Wittenberg",
      "tekst": "'Vanochtend stonden we met honderden mensen bij de stadspoort. Doctor Luther gooide de brief van de paus in het vuur, en daarna ook het wetboek van de paus. Niemand had gedacht dat hij dat zou durven. Nu is er geen weg terug.'",
      "onder": "Eigen bewerking, zoals een student in Wittenberg het in december 1520 zou kunnen schrijven"
     },
     "tip": "Vier punten is vier stappen. Begin bij de stellingen, citeer de bron bij de stap van de verbranding, en eindig bij de twee richtingen.",
     "model": [
      {
       "label": "De stellingen",
       "tekst": "Luther schreef in 1517 zijn kritiek in 95 stellingen. Door de boekdrukkunst werden die snel verspreid en kreeg hij aanhangers: de protestanten."
      },
      {
       "label": "De bul",
       "tekst": "Paus Leo X accepteerde de kritiek niet en stuurde Luther in 1520 een bul: hij moest terugkomen op zijn kritiek."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "Luther weigerde. In de bron staat: \"Doctor Luther gooide de brief van de paus in het vuur.\" Daarmee liet hij zien dat hij het gezag van de paus niet meer erkende."
      },
      {
       "label": "Daardoor: de splitsing",
       "tekst": "Daardoor zette de paus Luther en zijn volgelingen uit de kerk. Zo ontstonden er twee richtingen: een rooms-katholieke en een protestantse."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin bij de 95 stellingen en de verspreiding.",
       "woorden": [
        "stelling",
        "druk"
       ]
      },
      {
       "t": "Ik noem de bul van de paus (Leo X).",
       "woorden": [
        "bul",
        "leo"
       ]
      },
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": [
        "vuur"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      },
      {
       "t": "Ik eindig bij twee richtingen: katholiek en protestants.",
       "woorden": [
        "katholiek",
        "protestant"
       ]
      }
     ],
     "w": "Vier stappen: stellingen en aanhangers, de bul, de verbranding (met citaat), uit de kerk en dus de splitsing.",
     "meer": "Veelgemaakte fout: losse trefwoorden onder elkaar zetten. 'Luther, bul, splitsing' is geen verklaring. Elke stap moet een hele zin zijn die uitlegt hoe hij uit de vorige volgt."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Bekijk de bulverbranding vanuit twee kanten. Leg uit waarom een aanhanger van de paus het een misdaad vond, en waarom een protestant het moedig vond. (2p)",
     "tip": "Twee kanten, twee regels. Begin elke regel met wie er kijkt, en geef een reden met 'want'.",
     "model": [
      {
       "label": "De kant van de paus",
       "tekst": "Een aanhanger van de paus vond het een misdaad, want de paus was de leider van de kerk. Wie zijn bul verbrandt, verzet zich tegen het gezag van de kerk en is dus een ketter."
      },
      {
       "label": "De kant van de protestanten",
       "tekst": "Een protestant vond het moedig, want Luther bleef trouw aan wat hij in de Bijbel las, ook al kon hij daarvoor gestraft worden."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg de kant van de paus uit.",
       "woorden": [
        "paus",
        "katholiek"
       ]
      },
      {
       "t": "Ik leg de kant van de protestanten uit.",
       "woorden": [
        "protestant"
       ]
      },
      {
       "t": "Bij elke kant geef ik een reden met 'want'.",
       "woorden": [
        "want",
        "omdat"
       ]
      },
      {
       "t": "Ik gebruik een begrip zoals ketter, gezag of Bijbel.",
       "woorden": [
        "ketter",
        "gezag",
        "bijbel"
       ]
      }
     ],
     "w": "Eén gebeurtenis, twee perspectieven: verzet tegen Gods kerk, of trouw aan de Bijbel.",
     "meer": "Veelgemaakte fout: alleen je eigen mening geven. Bij perspectief kruip je in het hoofd van iemand uit die tijd, van beide kanten."
    },
    {
     "t": "mc",
     "q": "Is de maker van deze bron voor of tegen Luther, en waaraan zie je dat in de bron?",
     "bron": {
      "titel": "Bron C: een waarschuwing",
      "tekst": "'Deze opstandige monnik zet het volk op tegen de heilige vader in Rome. Wie zijn boekjes leest, brengt zijn ziel in gevaar.'",
      "onder": "Eigen bewerking, zoals een katholieke schrijver het in 1521 zou kunnen zeggen"
     },
     "o": [
      "tegen: hij noemt het lezen van Luthers boekjes gevaarlijk voor je ziel",
      "voor: hij noemt Luther een monnik, en een monnik is iemand van de kerk die je kunt vertrouwen",
      "tegen: dat zie je aan het onderschrift, want daar staat dat het een katholieke schrijver is",
      "voor: hij schrijft dat het volk naar Luther luistert, dus hij vindt Luther belangrijk en goed"
     ],
     "a": "tegen: hij noemt het lezen van Luthers boekjes gevaarlijk voor je ziel",
     "w": "Het bewijs staat in de bron zelf: 'opstandige monnik' en 'brengt zijn ziel in gevaar' zijn negatieve woorden over Luther.",
     "meer": "Kijk naar de woordkeus. Iemand die 'opstandig' en 'gevaar' gebruikt, is tegen.",
     "fout": {
      "voor: hij noemt Luther een monnik, en een monnik is iemand van de kerk die je kunt vertrouwen": "Hij noemt hem een <b>opstandige</b> monnik. Dat bijvoeglijk naamwoord maakt het negatief.",
      "tegen: dat zie je aan het onderschrift, want daar staat dat het een katholieke schrijver is": "De keuze klopt, maar het bewijs niet: het <b>onderschrift</b> telt niet. Gebruik wat er in de bron staat.",
      "voor: hij schrijft dat het volk naar Luther luistert, dus hij vindt Luther belangrijk en goed": "Hij zegt dat Luther het volk <b>opzet tegen</b> de paus. Dat is een beschuldiging, geen compliment."
     }
    },
    {
     "t": "mc",
     "q": "Luther wilde de kerk verbeteren, niet splitsen. Wat was de splitsing dan voor hem?",
     "o": [
      "een onbedoeld gevolg van zijn kritiek",
      "een bedoeld gevolg, want hij wilde vanaf het begin een eigen kerk",
      "een economische oorzaak van zijn 95 stellingen in 1517",
      "een direct gevolg van de Vrede van Augsburg in 1555"
     ],
     "a": "een onbedoeld gevolg van zijn kritiek",
     "w": "Het gebeurde door zijn kritiek, maar het was niet zijn plan. Dat heet onbedoeld.",
     "meer": "Bedoeld = wat iemand wilde bereiken. Onbedoeld = wat er óók gebeurde, zonder dat het de bedoeling was.",
     "fout": {
      "een bedoeld gevolg, want hij wilde vanaf het begin een eigen kerk": "Hij wilde de kerk juist <b>veranderen</b>, van binnenuit. Een eigen kerk was niet het plan.",
      "een economische oorzaak van zijn 95 stellingen in 1517": "De splitsing kwam ná de stellingen, dus kan het geen oorzaak ervan zijn.",
      "een direct gevolg van de Vrede van Augsburg in 1555": "De splitsing begon al in 1521, toen Luther uit de kerk werd gezet. Augsburg kwam veel later."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wat wilde Luther bereiken (bedoeld), en wat gebeurde er zonder dat hij het wilde (onbedoeld)?",
     "chips": [
      {
       "t": "Gelovigen gaan nadenken over aflaten",
       "bak": "bed",
       "waarom": "Dat was precies zijn doel met de stellingen: mensen laten zien dat aflaten niet werken."
      },
      {
       "t": "De kritiek op rijke geestelijken wordt overal bekend",
       "bak": "bed",
       "waarom": "Luther wilde dat mensen zagen dat geestelijken niet sober leefden."
      },
      {
       "t": "Veel mensen worden het met Luther eens",
       "bak": "bed",
       "waarom": "Hij wilde mensen overtuigen, en dat lukte."
      },
      {
       "t": "Luther wordt door de paus uit de kerk gezet",
       "bak": "onb",
       "waarom": "Hij wilde in de kerk blijven en haar verbeteren, niet eruit gezet worden."
      },
      {
       "t": "De eenheid van het christendom is voorbij",
       "bak": "onb",
       "waarom": "Luther wilde één verbeterde kerk, geen twee kerken."
      },
      {
       "t": "Er ontstaan twee christelijke richtingen",
       "bak": "onb",
       "waarom": "De splitsing was niet zijn plan: hij wilde hervormen, niet scheuren."
      }
     ],
     "bakjes": [
      {
       "id": "bed",
       "label": "bedoeld",
       "som": "wat Luther wilde bereiken"
      },
      {
       "id": "onb",
       "label": "onbedoeld",
       "som": "wat gebeurde, maar niet zijn plan was"
      }
     ],
     "w": "Bedoeld: mensen overtuigen en de kerk verbeteren. Onbedoeld: de ban en de splitsing.",
     "meer": "Check bij elk gevolg: zou Luther dit in 1517 op zijn verlanglijstje hebben gezet?"
    },
    {
     "t": "mc",
     "q": "Waarom was de boekdrukkunst zo belangrijk voor de Reformatie?",
     "o": [
      "zonder drukpers waren Luthers ideeën in Wittenberg gebleven",
      "de drukpers was een uitvinding van Luther zelf, en daar was hij erg trots op",
      "de paus liet de stellingen drukken om te laten zien hoe fout Luther was",
      "met de drukpers kon de kerk meer aflaten maken en dat maakte Luther boos"
     ],
     "a": "zonder drukpers waren Luthers ideeën in Wittenberg gebleven",
     "w": "Door het drukken kregen duizenden mensen zijn ideeën te lezen, en zo kreeg hij aanhangers.",
     "meer": "Inzicht: zonder aanhangers geen protestanten, en zonder protestanten geen splitsing. De drukpers is een belangrijke schakel.",
     "fout": {
      "de drukpers was een uitvinding van Luther zelf, en daar was hij erg trots op": "De boekdrukkunst bestond al vóór Luther. Hij maakte er wel slim gebruik van.",
      "de paus liet de stellingen drukken om te laten zien hoe fout Luther was": "De paus wilde Luthers ideeën juist <b>niet</b> verspreiden.",
      "met de drukpers kon de kerk meer aflaten maken en dat maakte Luther boos": "Er werden wel aflaten gedrukt, maar voor de <b>Reformatie</b> was het belangrijk dat Luthers ideeën verspreid werden."
     }
    },
    {
     "t": "mc",
     "q": "Welke bron past het best bij het kenmerkend aspect: <i>de protestantse Reformatie had de splitsing van de christelijke kerk in West-Europa tot gevolg</i>?",
     "o": [
      "een kaart met katholieke en protestantse gebieden rond 1600",
      "een schilderij van de pas afgebouwde Sint-Pieterbasiliek in Rome uit 1626",
      "een portret van de jonge keizer Karel V in zijn harnas op een paard",
      "een prent van een arme boer die zijn laatste geld aan een aflaat geeft"
     ],
     "a": "een kaart met katholieke en protestantse gebieden rond 1600",
     "w": "Op zo'n kaart zie je de splitsing letterlijk: Europa in twee kleuren, katholiek en protestants.",
     "meer": "Een bron past bij een kenmerkend aspect als hij precies dát laat zien: hier de <b>splitsing</b> als <b>gevolg</b>.",
     "fout": {
      "een schilderij van de pas afgebouwde Sint-Pieterbasiliek in Rome uit 1626": "De Sint-Pieter hoort bij de <b>oorzaken</b> (aflaten), niet bij de splitsing.",
      "een portret van de jonge keizer Karel V in zijn harnas op een paard": "Een portret van de keizer laat geen splitsing van de kerk zien.",
      "een prent van een arme boer die zijn laatste geld aan een aflaat geeft": "Dat laat de aflaathandel zien: een <b>oorzaak</b> van de Reformatie, niet het gevolg."
     }
    }
   ]
  }
 ]
},
{
 "id": "worms-augsburg",
 "emoji": "🏰",
 "titel": "3.5.3 · In discussie met Karel V",
 "paragraaf": "§3.5",
 "kort": "Keizer Karel V wil Luther weg, maar moet overleggen met de vorsten. Op de rijksdag van Worms (1521) herroept Luther niets en wordt vogelvrij. Op de Wartburg vertaalt hij de Bijbel. In 1555 mag elke vorst het geloof van zijn gebied kiezen.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<b>Karel V</b> is keizer van het <b>Heilige Roomse Rijk</b>: een Duits rijk dat ontstaat in de Middeleeuwen en bestaat tot 1806. Maar hij is niet de enige baas. Het rijk bestaat uit veel gebieden, bestuurd door <b>keurvorsten</b>, hertogen en graven. Een keurvorst is een Duitse vorst die het recht heeft om met zes andere keurvorsten de keizer te kiezen.",
    "Karel V is strenggelovig katholiek en wil Luther uit zijn rijk verbannen. Niet alle vorsten zijn het daarmee eens. Sommigen kiezen openlijk de kant van Luther, zoals <b>Frederik III de Wijze</b>, keurvorst van Saksen. Daarom kan Karel niet zomaar beslissen: hij moet overleggen.",
    "In <b>1521</b> roept Karel een <b>rijksdag</b> bijeen in de stad <b>Worms</b>: een vergadering van alle vorsten van het Heilige Roomse Rijk. Daar zitten de drie standen: de <b>geestelijkheid</b> (bisschoppen en prelaten), de <b>adel</b> (vorsten, graven en de keizer zelf) en de <b>burgerij</b> (vertegenwoordigers van de rijkssteden). Luther krijgt een <b>vrijgeleide</b>: hij mag veilig komen en gaan. Het is zijn laatste kans om zijn kritiek in te trekken. Hij weigert: alleen de Bijbel kan hem overtuigen, want paus en concilies hebben zich vaak vergist.",
    "Karel is woedend en vaardigt het <b>Edict van Worms</b> uit: het keizerlijk bevel tot wereldlijke verbanning van Luther. Luther wordt <b>vogelvrij</b>: hij staat buiten de wet en verliest alle rechtsbescherming. Let op: de <b>bul</b> kwam van de <b>paus</b> en zette Luther uit de <b>kerk</b>. Het <b>Edict</b> komt van de <b>keizer</b> en zet hem buiten de <b>wet</b>.",
    "Frederik III laat Luther 'ontvoeren' naar <b>kasteel Wartburg</b>, voor zijn veiligheid. Daar vertaalt Luther de Bijbel uit het Hebreeuws en Grieks naar het <b>Duits</b>. In 1534 is die <b>Lutherbijbel</b> af. Nu kunnen meer mensen de Bijbel lezen zonder hulp van geestelijken.",
    "Steeds meer vorsten verzetten zich tegen Karels geloofsbeleid. In <b>1555</b> moet hij de <b>Vrede van Augsburg</b> accepteren: de vorst mag het geloof in zijn gebied bepalen, en dus ook dat van zijn onderdanen. Let op: dat is <b>geen</b> godsdienstvrijheid voor iedereen. Alleen de vorst kiest. Voor Karel is het een grote nederlaag, religieus én politiek."
   ],
   "regel": "Worms 1521: Luther herroept niet, het Edict van de keizer maakt hem vogelvrij. Augsburg 1555: de vorst kiest het geloof, niet de gewone mens.",
   "voorbeelden": [
    {
     "en": "Bul = paus = uit de kerk (1520). Edict = keizer = buiten de wet (1521).",
     "let": "Twee straffen van twee verschillende bazen. Vraag je steeds af: kerk of rijk?"
    },
    {
     "en": "Augsburg: de vorst kiest, de onderdanen volgen.",
     "let": "Godsdienstvrijheid voor de vorsten, niet voor de gewone mensen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wat was het <b>Edict van Worms</b>?",
     "o": [
      "het keizerlijk bevel tot wereldlijke verbanning van Luther",
      "de brief van paus Leo X waarin Luther moest terugkomen op zijn kritiek",
      "het besluit van de paus om Luther en zijn volgelingen uit de kerk te zetten",
      "de vrede waarin elke Duitse vorst zijn eigen geloof mocht kiezen"
     ],
     "a": "het keizerlijk bevel tot wereldlijke verbanning van Luther",
     "w": "Het Edict kwam van keizer Karel V, na de rijksdag in Worms in 1521. Luther werd vogelvrij.",
     "meer": "'Wereldlijk' betekent: niet van de kerk, maar van het bestuur in de wereld. Daarom is een edict van de keizer.",
     "fout": {
      "de brief van paus Leo X waarin Luther moest terugkomen op zijn kritiek": "Dat is de <b>bul</b> (1520), van de paus. Het Edict komt van de <b>keizer</b>.",
      "het besluit van de paus om Luther en zijn volgelingen uit de kerk te zetten": "Uit de kerk zetten deed de <b>paus</b>. Het Edict zette Luther buiten de <b>wet</b> van het rijk.",
      "de vrede waarin elke Duitse vorst zijn eigen geloof mocht kiezen": "Dat is de <b>Vrede van Augsburg</b> (1555)."
     }
    },
    {
     "t": "gap",
     "q": "Door het Edict van Worms werd Luther ___ verklaard: hij stond buiten de wet en verloor alle rechtsbescherming.",
     "a": "vogelvrij",
     "w": "Vogelvrij: iedereen mocht Luther oppakken of zelfs doden zonder straf.",
     "meer": "Daarom liet Frederik III hem 'ontvoeren' naar de Wartburg: daar was hij veilig."
    },
    {
     "t": "mc",
     "q": "Waarom kon Karel V Luther niet zomaar uit zijn rijk verbannen?",
     "o": [
      "hij moest overleggen met de Duitse vorsten",
      "de paus had hem verboden iets tegen Luther te doen",
      "Luther woonde buiten het Heilige Roomse Rijk, in Rome",
      "Karel V was zelf protestant en eigenlijk een vriend van Luther"
     ],
     "a": "hij moest overleggen met de Duitse vorsten",
     "w": "Het rijk bestond uit veel gebieden met eigen vorsten. Karel had niet alles alleen voor het zeggen, dus riep hij een rijksdag bijeen.",
     "meer": "Twee stappen voor de toets: 1. Karel had niet alles alleen voor het zeggen. 2. Hij moest overleggen met de keurvorsten, daarom de rijksdag van Worms (1521).",
     "fout": {
      "de paus had hem verboden iets tegen Luther te doen": "De paus wilde Luther juist ook weg. Hij had hem al uit de kerk gezet.",
      "Luther woonde buiten het Heilige Roomse Rijk, in Rome": "Luther woonde in Wittenberg, in Duitsland. Rome bezocht hij alleen.",
      "Karel V was zelf protestant en eigenlijk een vriend van Luther": "Karel was strenggelovig <b>katholiek</b> en wilde Luther weg."
     }
    },
    {
     "t": "gap",
     "q": "Luther vertaalde de Bijbel naar het Duits in kasteel ___.",
     "a": "Wartburg|de Wartburg",
     "w": "Op de Wartburg, een kasteel van Frederik III, zat Luther veilig.",
     "meer": "Hij vertaalde uit het Hebreeuws en Grieks. In 1534 was de Lutherbijbel af, gedrukt in Wittenberg."
    },
    {
     "t": "mc",
     "q": "Wat bepaalde de <b>Vrede van Augsburg</b> (1555)?",
     "o": [
      "de vorst mocht het geloof in zijn gebied bepalen",
      "iedere inwoner mocht voortaan zelf kiezen welk geloof hij had",
      "alle Duitsers moesten weer katholiek worden, zoals Karel V wilde",
      "Luther mocht terug in de kerk als hij zijn stellingen introk"
     ],
     "a": "de vorst mocht het geloof in zijn gebied bepalen",
     "w": "De vorst koos katholiek of protestants, en zijn onderdanen moesten dat volgen.",
     "meer": "Werkboekdefinitie: 'Vrede uit 1555 tussen de katholieke Duitse keizer Karel V en enkele protestantse Duitse vorsten waarin werd bepaald dat de vorst het geloof in zijn gebied mocht bepalen.'",
     "fout": {
      "iedere inwoner mocht voortaan zelf kiezen welk geloof hij had": "Dit is de grote valkuil. Niet iedere inwoner koos, alleen de <b>vorst</b>. Godsdienstvrijheid voor iedereen was het dus niet.",
      "alle Duitsers moesten weer katholiek worden, zoals Karel V wilde": "Dan had Karel gewonnen. Augsburg was juist een <b>nederlaag</b> voor hem.",
      "Luther mocht terug in de kerk als hij zijn stellingen introk": "Luther was in 1555 al overleden (1546). En de vrede ging over de vorsten, niet over Luther zelf."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wie is wie? Sleep elke daad naar de juiste persoon.",
     "chips": [
      {
       "t": "Wil de Sint-Pieter verfraaien met aflaatgeld (1506)",
       "bak": "julius",
       "waarom": "Dat is paus Julius II, de eerste van de twee pausen."
      },
      {
       "t": "Stuurt Luther een bul (1520)",
       "bak": "leo",
       "waarom": "De bul komt van paus Leo X."
      },
      {
       "t": "Zet Luther en zijn volgelingen uit de kerk",
       "bak": "leo",
       "waarom": "Uit de kerk zetten kan alleen de paus: Leo X."
      },
      {
       "t": "Roept de rijksdag van Worms bijeen (1521)",
       "bak": "karel",
       "waarom": "De keizer roept de rijksdag bijeen: Karel V."
      },
      {
       "t": "Verklaart Luther vogelvrij met een edict",
       "bak": "karel",
       "waarom": "Het Edict van Worms komt van de keizer, niet van de paus."
      },
      {
       "t": "Moet in 1555 de Vrede van Augsburg accepteren",
       "bak": "karel",
       "waarom": "Augsburg was een nederlaag voor keizer Karel V."
      },
      {
       "t": "Laat Luther 'ontvoeren' naar de Wartburg",
       "bak": "frederik",
       "waarom": "Frederik III bracht Luther in veiligheid op zijn kasteel."
      },
      {
       "t": "Is keurvorst van Saksen en kiest de kant van Luther",
       "bak": "frederik",
       "waarom": "Frederik III de Wijze was een voorstander van de Reformatie."
      }
     ],
     "bakjes": [
      {
       "id": "julius",
       "label": "paus Julius II",
       "som": "Sint-Pieter en aflaten"
      },
      {
       "id": "leo",
       "label": "paus Leo X",
       "som": "bul en ban uit de kerk"
      },
      {
       "id": "karel",
       "label": "keizer Karel V",
       "som": "rijksdag, Edict, Augsburg"
      },
      {
       "id": "frederik",
       "label": "keurvorst Frederik III",
       "som": "beschermer van Luther"
      }
     ],
     "w": "Julius: Sint-Pieter. Leo: bul en ban. Karel: Worms, Edict en Augsburg. Frederik: de Wartburg.",
     "meer": "Personen uit elkaar houden is een vaste vraag in de toets. Koppel elke persoon aan zijn rol: twee pausen, één keizer, één beschermer."
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "1517: Luther schrijft zijn 95 stellingen",
      "1520: Luther verbrandt de bul van Leo X",
      "1521: Luther weigert te herroepen op de rijksdag in Worms",
      "1534: de Lutherbijbel is af",
      "1555: de Vrede van Augsburg"
     ],
     "w": "Stellingen, bul, Worms, Bijbel, Augsburg. Van kritiek naar een gesplitst rijk.",
     "meer": "Het rijtje 1517, 1520, 1521, 1555 is de ruggengraat van deze paragraaf. Ken het uit je hoofd."
    },
    {
     "t": "mc",
     "q": "Wat is een <b>rijksdag</b>?",
     "o": [
      "een vergadering van alle vorsten van het Heilige Roomse Rijk",
      "een feestdag in het hele rijk waarop iedereen de verjaardag van de keizer viert",
      "een rechtszaak van de paus in Rome tegen ketters uit het hele rijk",
      "de dag waarop de zeven keurvorsten samen een nieuwe keizer kiezen"
     ],
     "a": "een vergadering van alle vorsten van het Heilige Roomse Rijk",
     "w": "Op een rijksdag vergaderde de keizer met de bestuurders van alle Duitse gebieden, zoals in Worms in 1521.",
     "meer": "Daar waren alle drie de standen: geestelijkheid, adel en burgerij.",
     "fout": {
      "een feestdag in het hele rijk waarop iedereen de verjaardag van de keizer viert": "'Dag' klinkt als een feestdag, maar een rijksdag is een <b>vergadering</b>.",
      "een rechtszaak van de paus in Rome tegen ketters uit het hele rijk": "De rijksdag was van de <b>keizer</b>, niet van de paus, en hij vond plaats in Duitsland (Worms).",
      "de dag waarop de zeven keurvorsten samen een nieuwe keizer kiezen": "De keurvorsten kozen wel de keizer, maar een rijksdag is een vergadering van <b>alle</b> vorsten over allerlei zaken."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Op de rijksdag zaten de drie <b>standen</b> uit de Middeleeuwen bij elkaar. <b>Geestelijkheid</b>: bisschoppen en prelaten (bisschoppen of priesters met bestuursmacht). <b>Adel</b>: vorsten, graven, en ook de keizer zelf, want de keizer is de hoogste edelman, geen burger. <b>Burgerij</b>: de vertegenwoordigers van de rijkssteden.",
    "Een <b>argument uit een bron</b>: lees heel precies wat de maker zelf zegt. In zijn verdediging zei Luther dat hij niet 'de paus en de concilies alleen' geloofde, omdat zij 'meermalen gedwaald' hadden. Hij zegt dus: de paus vergist zich, de Bijbel niet. Draai dat niet om!",
    "Bij een <b>ja of nee</b>-vraag begin je met ja of nee. Daarna bewijs je het met iets wat je in de bron <b>ziet</b>: een kale kamer, een eenvoudige tafel. Niet met wat je vindt of wat je al weet.",
    "Bij Augsburg vragen ze vaak: kreeg iedereen godsdienstvrijheid? Nee. Alleen de vorst koos. De gewone mensen moesten het geloof van hun vorst volgen."
   ],
   "regel": "Ja of nee eerst, dan bewijs uit de bron zelf. En draai de mening van de maker nooit om.",
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Op de rijksdag van Worms zaten de drie standen. Sleep elke aanwezige naar zijn stand.",
     "chips": [
      {
       "t": "50 bisschoppen",
       "bak": "geest",
       "waarom": "Bisschoppen zijn geestelijken: zij leiden een bisdom."
      },
      {
       "t": "83 prelaten (bisschoppen of priesters met bestuursmacht)",
       "bak": "geest",
       "waarom": "Prelaten zijn geestelijken met bestuursmacht."
      },
      {
       "t": "145 graven",
       "bak": "adel",
       "waarom": "Graven zijn edelen die een graafschap besturen."
      },
      {
       "t": "31 vorsten",
       "bak": "adel",
       "waarom": "Vorsten zijn edelen die een gebied besturen."
      },
      {
       "t": "keizer Karel V",
       "bak": "adel",
       "waarom": "Let op: de keizer is geen burger. Hij is de hoogste edelman van het rijk, dus adel."
      },
      {
       "t": "keurvorst Frederik III",
       "bak": "adel",
       "waarom": "Een keurvorst is een Duitse vorst, dus adel."
      },
      {
       "t": "vertegenwoordigers van de rijkssteden",
       "bak": "burg",
       "waarom": "Steden worden vertegenwoordigd door burgers: dat is de burgerij."
      }
     ],
     "bakjes": [
      {
       "id": "geest",
       "label": "geestelijkheid",
       "som": "eerste stand: mensen van de kerk"
      },
      {
       "id": "adel",
       "label": "adel",
       "som": "tweede stand: edelen, ook de keizer"
      },
      {
       "id": "burg",
       "label": "burgerij",
       "som": "derde stand: mensen uit de steden"
      }
     ],
     "w": "Geestelijkheid: bisschoppen en prelaten. Adel: vorsten, graven en de keizer. Burgerij: de rijkssteden.",
     "meer": "De valkuil is de keizer. Hij is geen burger maar de hoogste edelman, dus hoort hij bij de adel."
    },
    {
     "t": "mc",
     "q": "Welk argument geeft Luther in deze zin?",
     "bron": {
      "titel": "Bron A: uit Luthers verdediging in Worms (1521)",
      "tekst": "'... want niet de paus en niet de concilies alleen geloof ik, omdat het zeker is dat zij meermalen gedwaald en zichzelf tegengesproken hebben ...'<br>(Een <i>concilie</i> is een vergadering van kerkelijke leiders.)",
      "onder": "Naar: Luther, tijdens zijn verdediging op de rijksdag van Worms (1521)"
     },
     "o": [
      "de paus en de concilies hebben zich vaak vergist",
      "de paus is belangrijker dan de Bijbel, dus moet je hem gehoorzamen",
      "de keizer heeft meer gezag dan de paus en de concilies bij elkaar",
      "concilies zijn beter dan de paus, omdat daar veel mensen samen beslissen"
     ],
     "a": "de paus en de concilies hebben zich vaak vergist",
     "w": "'Meermalen gedwaald en zichzelf tegengesproken' betekent: ze hebben zich vaak vergist en zeiden de ene keer iets anders dan de andere keer.",
     "meer": "Daarom wilde Luther de kerk hervormen: de kerk dwaalde. Alleen de Bijbel kon hem overtuigen.",
     "fout": {
      "de paus is belangrijker dan de Bijbel, dus moet je hem gehoorzamen": "Precies andersom! Luther zegt dat hij de paus <b>niet</b> gelooft, omdat die zich vergist. Voor Luther is de <b>Bijbel</b> het belangrijkst. Dit is de fout die je in het werkboek maakte: let op het woordje 'niet'.",
      "de keizer heeft meer gezag dan de paus en de concilies bij elkaar": "De keizer komt in deze zin niet voor. Luther stelt de <b>Bijbel</b> boven paus en concilies.",
      "concilies zijn beter dan de paus, omdat daar veel mensen samen beslissen": "Luther gelooft de concilies óók niet: 'niet de paus en niet de concilies'. Allebei hebben zich vergist."
     }
    },
    {
     "t": "mc",
     "q": "Hoe kun je bewijzen dat Karel V het <b>niet</b> eens was met Luthers verdediging?",
     "o": [
      "hij vaardigde het Edict van Worms uit",
      "hij stuurde Luther een bul en zette hem daarmee uit de kerk",
      "hij liet Luther naar de Wartburg brengen voor zijn veiligheid",
      "hij sloot in 1521 de Vrede van Augsburg met Luther en de vorsten"
     ],
     "a": "hij vaardigde het Edict van Worms uit",
     "w": "Na Luthers verdediging verklaarde Karel hem met het Edict van Worms vogelvrij. Dat doe je niet als je het met iemand eens bent.",
     "meer": "Antwoord in twee stappen: 1. Nee, Karel V was het niet eens met Luther. 2. Want hij vaardigde het Edict van Worms uit, waardoor Luther vogelvrij werd.",
     "fout": {
      "hij stuurde Luther een bul en zette hem daarmee uit de kerk": "Een bul komt van de <b>paus</b> (Leo X), niet van de keizer.",
      "hij liet Luther naar de Wartburg brengen voor zijn veiligheid": "Dat deed <b>Frederik III</b>, om Luther te beschermen. Karel wilde hem juist weg.",
      "hij sloot in 1521 de Vrede van Augsburg met Luther en de vorsten": "De Vrede van Augsburg was in <b>1555</b>, met de vorsten. Luther was toen al dood."
     }
    },
    {
     "t": "mc",
     "q": "Leefde Luther zelf ook sober? Welk antwoord is het beste?",
     "bron": {
      "titel": "Bron B: Luthers werkkamer op de Wartburg",
      "tekst": "Op een foto zie je een klein kamertje met houten wanden. Er staat een eenvoudige houten tafel met een stoel, en in de hoek een grote kachel. Schilderijen, goud of versieringen zie je niet.",
      "onder": "Eigen beschrijving van de werkkamer van Luther op de Wartburg, die sinds zijn tijd bijna niet veranderd is"
     },
     "o": [
      "Ja. In de kamer staan alleen een eenvoudige tafel, een stoel en een kachel.",
      "Ja. Luther vond dat geestelijken sober moesten leven, dus deed hij dat zelf natuurlijk ook.",
      "Ja. Het onderschrift zegt dat de kamer sinds Luthers tijd bijna niet veranderd is, dus hij leefde zo.",
      "Nee. Hij woonde in een kasteel, en kastelen waren in die tijd altijd rijk en luxe ingericht."
     ],
     "a": "Ja. In de kamer staan alleen een eenvoudige tafel, een stoel en een kachel.",
     "w": "Eerst 'ja', dan bewijs uit wat je in de bron ziet: een kale kamer met een paar eenvoudige meubels.",
     "meer": "Zo haal je bij zo'n vraag twee punten: 1. Ja, Luther leefde sober. 2. Want je ziet een kale werkkamer met alleen een eenvoudige tafel, een stoel en een kachel.",
     "fout": {
      "Ja. Luther vond dat geestelijken sober moesten leven, dus deed hij dat zelf natuurlijk ook.": "Wat iemand vindt, bewijst niet hoe hij leefde. Gebruik wat je in de <b>bron</b> ziet.",
      "Ja. Het onderschrift zegt dat de kamer sinds Luthers tijd bijna niet veranderd is, dus hij leefde zo.": "Dat komt uit het <b>onderschrift</b>, en het zegt niets over sober of luxe. Kijk naar de kamer zelf.",
      "Nee. Hij woonde in een kasteel, en kastelen waren in die tijd altijd rijk en luxe ingericht.": "Kijk naar de bron: geen goud, geen versiering. Een kasteel kan best een kale kamer hebben."
     }
    },
    {
     "t": "mc",
     "q": "Wat bepaalde na 1555 of een gewone boer in Duitsland katholiek of protestants was?",
     "o": [
      "het geloof van de vorst van zijn gebied",
      "zijn eigen keuze, want er was nu godsdienstvrijheid voor iedereen",
      "de paus in Rome, die per dorp besliste wie katholiek moest blijven",
      "keizer Karel V, die voor het hele rijk één geloof koos"
     ],
     "a": "het geloof van de vorst van zijn gebied",
     "w": "Na Augsburg koos de vorst, en zijn onderdanen volgden.",
     "meer": "Woonde de boer in een protestants vorstendom, dan werd hij protestant. Verhuisde hij naar een katholiek gebied, dan moest hij katholiek zijn.",
     "fout": {
      "zijn eigen keuze, want er was nu godsdienstvrijheid voor iedereen": "Dit is dé valkuil van Augsburg. De vrijheid was voor de <b>vorsten</b>, niet voor gewone mensen.",
      "de paus in Rome, die per dorp besliste wie katholiek moest blijven": "De paus had hier geen zeggenschap over. Augsburg legde de keuze bij de vorst.",
      "keizer Karel V, die voor het hele rijk één geloof koos": "Dat wilde Karel wel, maar dat lukte hem juist niet. Daarom was Augsburg een nederlaag voor hem."
     }
    },
    {
     "t": "mc",
     "q": "Vóór de Lutherbijbel was de Bijbel meestal in het Latijn, het Grieks of het Hebreeuws. Wat betekende dat voor een gewone Duitser?",
     "o": [
      "hij had een geestelijke nodig om te weten wat erin stond",
      "hij kon de Bijbel thuis gewoon lezen, want iedereen sprak toen Latijn",
      "hij mocht van de keizer helemaal niet naar de kerk gaan",
      "hij kon in de kerk een vertaling kopen, net als een aflaat"
     ],
     "a": "hij had een geestelijke nodig om te weten wat erin stond",
     "w": "Gewone mensen konden die talen niet lezen. Ze waren afhankelijk van de uitleg van geestelijken.",
     "meer": "Met de Lutherbijbel kon elke Duitser die kon lezen zelf de Bijbel lezen. Dat vond Luther belangrijk: de Bijbel was voor hem de belangrijkste bron van het geloof.",
     "fout": {
      "hij kon de Bijbel thuis gewoon lezen, want iedereen sprak toen Latijn": "Gewone mensen spraken Duits. Latijn was de taal van geleerden en geestelijken.",
      "hij mocht van de keizer helemaal niet naar de kerk gaan": "Naar de kerk gaan mocht juist wel. Het ging erom dat hij de Bijbel zelf niet kon <b>lezen</b>.",
      "hij kon in de kerk een vertaling kopen, net als een aflaat": "Een Duitse vertaling bestond nog nauwelijks. Daarom was het werk van Luther zo bijzonder."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Gaf de Vrede van Augsburg godsdienstvrijheid aan alle inwoners van het Heilige Roomse Rijk? Leg je antwoord uit met bron C. (2p)",
     "bron": {
      "titel": "Bron C: de Vrede van Augsburg in vier woorden",
      "tekst": "<i>Cuius regio, eius religio.</i><br>Vertaald: 'Wiens gebied, diens godsdienst.'",
      "onder": "Naar: een korte Latijnse samenvatting van de Vrede van Augsburg (1555), die later bekend werd"
     },
     "tip": "Begin met ja of nee. Leg daarna met de woorden uit de bron uit wie er kiest, en wat dat betekent voor de gewone mensen.",
     "model": [
      {
       "label": "Ja of nee",
       "tekst": "Nee, niet alle inwoners kregen godsdienstvrijheid."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat: \"Wiens gebied, diens godsdienst.\" Het geloof hoort dus bij het gebied van de vorst: de vorst bepaalde het."
      },
      {
       "label": "Wat dat betekent",
       "tekst": "Daardoor moesten de onderdanen het geloof van hun vorst volgen. Alleen de vorsten kregen dus vrijheid."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met 'nee'.",
       "woorden": [
        "nee"
       ]
      },
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": [
        "wiens",
        "gebied",
        "regio"
       ]
      },
      {
       "t": "Ik noem dat de vorst het geloof bepaalde.",
       "woorden": [
        "vorst"
       ]
      },
      {
       "t": "Ik leg uit wat dat voor de onderdanen betekende.",
       "woorden": [
        "onderdan",
        "inwoner",
        "volgen",
        "gewone"
       ]
      }
     ],
     "w": "Nee: de vorst koos, de inwoners volgden. Vrijheid voor de vorsten, niet voor iedereen.",
     "meer": "Veelgemaakte fout: 'Ja, ze mochten hun geloof kiezen.' Wie is 'ze'? Alleen de vorsten. Noem altijd wie er kiest."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij een onbekende bron vraag je je eerst af: <b>wie heeft dit gemaakt</b>, de kerk of het rijk? De paus kan iemand uit de <b>kerk</b> zetten. De keizer kan iemand buiten de <b>wet</b> zetten: geen onderdak, geen bescherming, gevangennemen. Lees wat er in de bron staat en je weet van wie hij komt.",
    "Bij <b>winnaar of verliezer</b> kijk je naar wat iemand wilde, en wat hij kreeg. Karel V wilde één katholiek rijk, zonder Luther. Hij kreeg een rijk met katholieke én protestantse gebieden, en vorsten die zelf kozen. <b>Religieus</b> verloor hij: de eenheid van het geloof kwam niet terug. <b>Politiek</b> verloor hij: de vorsten kregen meer macht, de keizer minder.",
    "Een inzichtvraag over de <b>Lutherbijbel</b>: als gewone mensen zelf de Bijbel lezen, hebben ze de uitleg van geestelijken minder nodig. Dat raakt de macht van de kerk."
   ],
   "regel": "Wilde Karel V één katholiek rijk? Dan is Augsburg een nederlaag: religieus (geen eenheid) en politiek (sterkere vorsten).",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Komt deze bron van de paus of van de keizer? Leg uit en bewijs je antwoord met iets wat in de bron staat. (2p)",
     "bron": {
      "titel": "Bron D: een bevel uit 1521",
      "tekst": "'Niemand mag Luther onderdak, eten of drinken geven. Wie hem vindt, moet hem gevangennemen en uitleveren. Zijn boeken moeten verbrand worden.'",
      "onder": "Naar: een bevel uit mei 1521, vrij samengevat"
     },
     "tip": "Kies eerst: paus of keizer. Bewijs het dan met wat er in de bron staat: gaat het om de kerk, of om straffen in de wereld?",
     "model": [
      {
       "label": "Keuze",
       "tekst": "De bron komt van de keizer, Karel V. Het is het Edict van Worms."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat: \"Wie hem vindt, moet hem gevangennemen en uitleveren.\" Dat is een wereldlijke straf: Luther wordt buiten de wet gezet, hij is vogelvrij."
      },
      {
       "label": "Waarom niet de paus",
       "tekst": "De paus kon Luther alleen uit de kerk zetten, met een bul. Gevangennemen en onderdak verbieden kon alleen de keizer."
      }
     ],
     "checklist": [
      {
       "t": "Ik kies de keizer (Karel V).",
       "woorden": [
        "keizer",
        "karel"
       ]
      },
      {
       "t": "Ik noem het Edict van Worms.",
       "woorden": [
        "edict",
        "worms"
       ]
      },
      {
       "t": "Ik citeer een zin uit de bron.",
       "woorden": [
        "gevangen",
        "onderdak",
        "uitlever"
       ]
      },
      {
       "t": "Ik leg uit waarom het niet de paus (de bul) is.",
       "woorden": [
        "paus",
        "bul",
        "kerk"
       ]
      }
     ],
     "w": "Gevangennemen, uitleveren, geen onderdak: dat zijn straffen van het rijk. Dus de keizer, met het Edict van Worms.",
     "meer": "Dit is de grote valkuil van 3.5: bul en Edict verwisselen. Bul = paus = uit de kerk. Edict = keizer = buiten de wet."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg uit waarom de Vrede van Augsburg voor Karel V een nederlaag was, op religieus én op politiek gebied. (3p)",
     "tip": "Begin met wat Karel wilde. Leg daarna per gebied (religieus, politiek) uit wat hij kreeg. Elke stap een eigen regel.",
     "model": [
      {
       "label": "Wat Karel wilde",
       "tekst": "Karel V was strenggelovig katholiek en wilde één katholiek rijk, zonder Luther en zijn volgelingen."
      },
      {
       "label": "Religieus",
       "tekst": "Een religieuze nederlaag: door Augsburg mochten protestantse gebieden blijven bestaan. De eenheid van het geloof in zijn rijk kwam niet meer terug."
      },
      {
       "label": "Politiek",
       "tekst": "Een politieke nederlaag: de vorsten bepaalden voortaan het geloof, niet de keizer. Daardoor kregen de vorsten meer macht en werd de keizer zwakker."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem wat Karel V wilde (één katholiek rijk).",
       "woorden": [
        "katholiek",
        "wilde"
       ]
      },
      {
       "t": "Ik leg de religieuze nederlaag uit.",
       "woorden": [
        "religie",
        "geloof",
        "protestant"
       ]
      },
      {
       "t": "Ik leg de politieke nederlaag uit.",
       "woorden": [
        "politiek",
        "macht",
        "vorst"
       ]
      },
      {
       "t": "Ik verbind met 'daardoor' of 'dus'.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "Wilde: één katholiek rijk. Kreeg: twee geloven naast elkaar (religieus verlies) en machtiger vorsten (politiek verlies).",
     "meer": "Veelgemaakte fout: alleen 'hij verloor' schrijven. De vraag vraagt twee soorten: religieus én politiek. Noem ze allebei, met dat woord erbij."
    },
    {
     "t": "mc",
     "q": "Hoe keken Frederik III en Karel V verschillend naar Luther?",
     "o": [
      "Frederik wilde hem beschermen, Karel zag hem als ketter",
      "Frederik wilde hem straffen, Karel wilde hem juist laten ontsnappen naar de Wartburg",
      "allebei steunden ze Luther, maar Karel durfde dat niet openlijk te zeggen",
      "allebei wilden ze Luther weg, maar Frederik wilde hem liever naar Rome sturen"
     ],
     "a": "Frederik wilde hem beschermen, Karel zag hem als ketter",
     "w": "Frederik III was een voorstander van de Reformatie en bracht Luther in veiligheid. Karel V was strenggelovig katholiek en verklaarde hem vogelvrij.",
     "meer": "Dit is <b>perspectief</b>: twee machtige mannen in hetzelfde rijk, met een tegenovergestelde blik op dezelfde monnik.",
     "fout": {
      "Frederik wilde hem straffen, Karel wilde hem juist laten ontsnappen naar de Wartburg": "Precies omgedraaid. Frederik bracht hem naar de Wartburg, Karel maakte hem vogelvrij.",
      "allebei steunden ze Luther, maar Karel durfde dat niet openlijk te zeggen": "Karel was juist woedend op Luther en vaardigde het Edict van Worms uit.",
      "allebei wilden ze Luther weg, maar Frederik wilde hem liever naar Rome sturen": "Frederik koos openlijk de kant van Luther en beschermde hem."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was de Lutherbijbel een bedreiging voor de macht van de geestelijken?",
     "o": [
      "gelovigen konden zelf lezen en hadden de uitleg minder nodig",
      "de Lutherbijbel was zo duur dat de kerk geen aflaten meer kon verkopen aan de mensen",
      "in de Lutherbijbel stond dat alle geestelijken direct moesten stoppen met hun werk",
      "de keizer gebruikte de Lutherbijbel als wetboek in plaats van het pauselijk wetboek"
     ],
     "a": "gelovigen konden zelf lezen en hadden de uitleg minder nodig",
     "w": "Wie zelf de Bijbel leest, kan zelf nagaan wat erin staat. Dan ben je minder afhankelijk van wat de priester zegt.",
     "meer": "Inzicht: kennis is macht. Zolang alleen geestelijken de Bijbel konden lezen, bepaalden zij wat mensen geloofden.",
     "fout": {
      "de Lutherbijbel was zo duur dat de kerk geen aflaten meer kon verkopen aan de mensen": "Dat verband bestaat niet. Het ging erom dat mensen de Bijbel zelf konden <b>lezen</b>.",
      "in de Lutherbijbel stond dat alle geestelijken direct moesten stoppen met hun werk": "Het was een vertaling van de Bijbel, geen bevel. De inhoud was dezelfde, alleen de taal was anders.",
      "de keizer gebruikte de Lutherbijbel als wetboek in plaats van het pauselijk wetboek": "Karel V was katholiek en tegen Luther. Hij gebruikte Luthers Bijbel zeker niet."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe kwam Luther op de Wartburg terecht?",
     "stappen": [
      "Luther weigert in Worms zijn kritiek in te trekken",
      "Karel V vaardigt het Edict van Worms uit",
      "Luther is vogelvrij en zijn leven is in gevaar",
      "Frederik III laat hem 'ontvoeren' naar de Wartburg",
      "Daar vertaalt Luther de Bijbel naar het Duits"
     ],
     "w": "Weigering, Edict, gevaar, ontvoering, vertaling. Elke stap is een gevolg van de vorige.",
     "meer": "Zo'n ketting is precies wat een T2-vraag wil. Jaartallen: Worms en het Edict in 1521, de Lutherbijbel af in 1534."
    },
    {
     "t": "sleep",
     "opgave": "Wat verloor Karel V bij de Vrede van Augsburg: is dit een religieus of een politiek verlies?",
     "chips": [
      {
       "t": "Er blijven katholieke en protestantse gebieden naast elkaar bestaan",
       "bak": "rel",
       "waarom": "Dit gaat over het geloof: twee richtingen in plaats van één."
      },
      {
       "t": "De eenheid van de kerk in zijn rijk komt niet terug",
       "bak": "rel",
       "waarom": "Eén kerk was een geloofsdoel van Karel: religieus."
      },
      {
       "t": "Luthers ideeën kan hij niet meer uitroeien",
       "bak": "rel",
       "waarom": "Het gaat om een geloofsleer die blijft: religieus."
      },
      {
       "t": "De vorsten krijgen meer macht tegenover de keizer",
       "bak": "pol",
       "waarom": "Wie de macht heeft, is politiek."
      },
      {
       "t": "De keizer kan niet meer voor het hele rijk beslissen",
       "bak": "pol",
       "waarom": "Het gaat om bestuur en zeggenschap: politiek."
      },
      {
       "t": "Karel moet toegeven aan het verzet van de vorsten",
       "bak": "pol",
       "waarom": "Een machtsstrijd die hij verliest: politiek."
      }
     ],
     "bakjes": [
      {
       "id": "rel",
       "label": "religieus verlies",
       "som": "over het geloof"
      },
      {
       "id": "pol",
       "label": "politiek verlies",
       "som": "over macht en bestuur"
      }
     ],
     "w": "Religieus: het geloof blijft gesplitst. Politiek: de vorsten winnen macht van de keizer.",
     "meer": "Het werkboek noemt Augsburg 'een grote nederlaag, zowel op religieus als op politiek gebied'. Kun je van beide een voorbeeld geven?"
    },
    {
     "t": "mc",
     "q": "<b>Toen en nu.</b> In Duitsland is het zuiden (zoals Beieren) nog steeds vooral katholiek en zijn grote delen van het noorden en oosten van oudsher protestants. Hoe komt dat?",
     "o": [
      "door Augsburg koos elke vorst het geloof van zijn gebied",
      "door Augsburg mocht iedere inwoner kiezen, en de mensen in het noorden kozen protestants",
      "Karel V verdeelde in het Edict van Worms het rijk in een katholiek en een protestants deel",
      "de paus stuurde in 1520 een bul waarin stond welke streken katholiek moesten blijven"
     ],
     "a": "door Augsburg koos elke vorst het geloof van zijn gebied",
     "w": "De keuzes van vorsten in de zestiende eeuw zie je nu nog terug op de kaart. Dat is een lang <b>gevolg</b> van Augsburg.",
     "meer": "Dit is <b>continuïteit</b>: een besluit van 1555 werkt eeuwen later nog door.",
     "fout": {
      "door Augsburg mocht iedere inwoner kiezen, en de mensen in het noorden kozen protestants": "Weer de valkuil: niet de inwoners maar de <b>vorsten</b> kozen.",
      "Karel V verdeelde in het Edict van Worms het rijk in een katholiek en een protestants deel": "Het Edict ging over Luther: het maakte hem vogelvrij. Het verdeelde het rijk niet.",
      "de paus stuurde in 1520 een bul waarin stond welke streken katholiek moesten blijven": "De bul van 1520 was gericht aan Luther zelf, om hem zijn kritiek te laten intrekken."
     }
    }
   ]
  }
 ]
}
);


/* ===== §4.2 Buitenlandse bemoeienis ===== */
window.LEERSTOF.push(
{
 "id": "bourgondiers",
 "emoji": "🦁",
 "titel": "4.2.1 · Bourgondisch Nederland",
 "paragraaf": "§4.2",
 "kort": "Losse, eigenwijze gewesten met elk hun eigen privileges, en een Franse hertog die ze een voor een verzamelt: met erfenissen, huwelijken, geld en geweld.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>In de middeleeuwen is Nederland nog geen land. Het is een lappendeken van <b>gewesten</b> (een gewest is een <i>bestuurlijke eenheid van een land</i>), zoals Holland, Zeeland, Brabant en Vlaanderen. Elk gewest heeft een eigen bestuur, eigen wetten en regels en zelfs eigen munten.</p>",
    "<p>Elk gewest heeft ook eigen <b>privileges</b>: <i>bijzondere rechten die door de 'heer' van een gewest worden verleend</i>. Die rechten willen de gewesten heel graag houden. Dat heet <b>particularisme</b>: <i>het streven van de gewesten en steden in de Nederlanden om hun zelfstandigheid te behouden</i>. Daarom is er nog geen <b>nationale staat</b>, een <i>staat waar overal dezelfde wetten en regels gelden</i>.</p>",
    "<p>Dan komt er een Franse hoge edelman in beeld: de <b>hertog van Bourgondië</b>. In 1363 krijgt de Franse prins <b>Filips de Stoute</b> het hertogdom Bourgondië in leen van de Franse koning. Hij en zijn opvolgers maken hun gebied steeds groter op <b>vier manieren</b>: door <b>erfenissen</b>, door <b>huwelijkspolitiek</b>, door <b>aankoop</b> en door <b>verovering</b>. Huwelijkspolitiek is <i>het regelen van een huwelijk om zo familiebezit en macht uit te kunnen breiden</i>.</p>",
    "<p>Filips de Stoute trouwt met <b>Margaretha van Male</b>, de dochter van de graaf van Vlaanderen. Als zijn schoonvader sterft, krijgt hij in <b>1384</b> Vlaanderen: in die tijd het rijkste gebied van Europa, door de handel in graan, wijn en laken. Ook zijn kinderen koppelt hij slim: in een dubbelhuwelijk trouwen zijn zoon Jan zonder Vrees en zijn dochter Margaretha met kinderen van de hertog van Beieren, de familie die Holland en Zeeland bestuurt. Een probleem heeft hij wel: Bourgondië ligt midden in Frankrijk, zo'n 500 kilometer van Vlaanderen. Hij moet dus veel reizen om alles te besturen.</p>",
    "<p>Filips de Stoute en zijn opvolgers regeren ongeveer honderd jaar over grote delen van de Nederlanden. Dat heet de <b>Bourgondische tijd</b>: <i>de periode waarin de Nederlandse gewesten onder leiding staan van de Bourgondische hertogen</i>. Vergelijk je de kaart van 1404 (dood van Filips de Stoute) met die van 1467 (dood van zijn kleinzoon <b>Filips de Goede</b>), dan zie je dat het gebied in 63 jaar enorm gegroeid is. Let op de Filipsen: <b>Filips de Stoute</b> begint (1384, Vlaanderen), <b>Filips de Goede</b> is zijn kleinzoon (de centralisatie, zie 4.2.2).</p>"
   ],
   "regel": "Particularisme = de gewesten willen zelfstandig blijven; de Bourgondiërs breiden uit door erfenis, huwelijk, aankoop en verovering (1384: Filips de Stoute krijgt Vlaanderen).",
   "voorbeelden": [
    {
     "en": "Filips de Stoute (opa, 1384 Vlaanderen) → Jan zonder Vrees → Filips de Goede (kleinzoon, centralisatie).",
     "let": "Stoute = de starter, Goede = de grote baas die alles één wil maken."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wat betekent particularisme?",
     "o": [
      "het streven van gewesten en steden om zelfstandig te blijven",
      "het streven van een vorst naar één bestuur met overal dezelfde regels",
      "het regelen van huwelijken om meer land en macht te krijgen",
      "een bijzonder recht dat de heer aan een stad of gewest geeft"
     ],
     "a": "het streven van gewesten en steden om zelfstandig te blijven",
     "w": "Particularisme komt van 'particulier': apart, eigen. Elk gewest wil het zelf regelen.",
     "meer": "Het tegenovergestelde is centralisatie: de vorst die alles vanuit één centrum wil besturen. Die twee draai je makkelijk om, dus onthoud: <b>particularisme = de gewesten</b>, <b>centralisatie = de vorst</b>.",
     "fout": {
      "het streven van een vorst naar één bestuur met overal dezelfde regels": "Dit is precies andersom: dit is <b>centralisatie</b>. Bij particularisme willen juist de gewesten zelf de baas blijven.",
      "het regelen van huwelijken om meer land en macht te krijgen": "Dat is <b>huwelijkspolitiek</b>, een manier waarop de Bourgondiërs hun gebied groter maakten.",
      "een bijzonder recht dat de heer aan een stad of gewest geeft": "Dat is een <b>privilege</b>. Particularisme is het streven om die privileges en de zelfstandigheid te houden."
     }
    },
    {
     "t": "mc",
     "q": "Welke Bourgondische hertog kreeg in 1384 het gewest Vlaanderen in handen?",
     "o": [
      "Filips de Stoute",
      "Filips de Goede",
      "Filips de Schone",
      "Filips II"
     ],
     "a": "Filips de Stoute",
     "w": "Filips de Stoute is de eerste Bourgondische hertog in de Nederlanden. Door zijn huwelijk met Margaretha van Male kreeg hij in 1384 Vlaanderen.",
     "meer": "Er zijn veel Filipsen in dit hoofdstuk. Hier gaat het om de eerste twee: <b>Stoute</b> (de starter, 1384) en <b>Goede</b> (zijn kleinzoon, de centralisatie).",
     "fout": {
      "Filips de Goede": "Filips de Goede is de <b>kleinzoon</b> van Filips de Stoute. Hij is bekend van de centralisatie en de Staten-Generaal van 1464, niet van 1384.",
      "Filips de Schone": "Filips de Schone leeft pas veel later (hij is de zoon van Maria van Bourgondië en Maximiliaan). In 1384 is hij er nog lang niet.",
      "Filips II": "Filips II is de koning van Spanje uit de Opstand (rond 1566), bijna twee eeuwen later. Niet verwarren!"
     }
    },
    {
     "t": "gap",
     "q": "In het jaar ___ kreeg Filips de Stoute het gewest Vlaanderen in handen.",
     "a": "1384|in 1384",
     "w": "1384 is het startjaar van de Bourgondiërs in de Nederlanden.",
     "meer": "Ezelsbruggetje: 1363 krijgt Filips Bourgondië in leen, 21 jaar later (1384) komt Vlaanderen erbij."
    },
    {
     "t": "mc",
     "q": "Hoe kreeg Filips de Stoute het rijke Vlaanderen in handen?",
     "o": [
      "via zijn huwelijk met de dochter van de graaf",
      "hij veroverde Vlaanderen met een groot leger op de Franse koning",
      "hij kocht Vlaanderen met het geld van het hertogdom Bourgondië",
      "hij kreeg Vlaanderen in leen van de Franse koning, net als Bourgondië"
     ],
     "a": "via zijn huwelijk met de dochter van de graaf",
     "w": "Dat is huwelijkspolitiek: door met Margaretha van Male te trouwen viel Vlaanderen hem toe toen zijn schoonvader stierf.",
     "meer": "Let op het verschil: <b>Bourgondië</b> kreeg hij <i>in leen</i> van de Franse koning (1363), <b>Vlaanderen</b> kreeg hij <i>via zijn huwelijk</i> (1384).",
     "fout": {
      "hij veroverde Vlaanderen met een groot leger op de Franse koning": "Verovering is wel een van de vier manieren, maar Vlaanderen kreeg hij zonder oorlog: via zijn vrouw.",
      "hij kocht Vlaanderen met het geld van het hertogdom Bourgondië": "Aankoop is ook een van de vier manieren, maar niet bij Vlaanderen. Hier ging het om een huwelijk.",
      "hij kreeg Vlaanderen in leen van de Franse koning, net als Bourgondië": "In leen kreeg hij alleen <b>Bourgondië</b>. Vlaanderen kwam via zijn huwelijk met Margaretha van Male."
     }
    },
    {
     "t": "sleep",
     "opgave": "Op welke van de vier manieren kwam elk gebied (of elke situatie) bij de Bourgondiërs?",
     "bron": {
      "titel": "Bron A: Zo groeide Bourgondisch Nederland",
      "tekst": "1384: Vlaanderen komt via de vrouw van Filips de Stoute.<br>1421: Filips de Goede betaalt de graaf van Namen, die geld nodig heeft, voor zijn graafschap.<br>1430: de hertog van Brabant, een neef van Filips de Goede, sterft zonder kinderen; Brabant gaat naar de familie.<br>1428: na jaren oorlog moet Jacoba van Beieren Holland en Zeeland aan Filips de Goede afstaan.",
      "onder": "Naar: de uitbreiding van de Bourgondische Nederlanden (eigen bewerking)"
     },
     "chips": [
      {
       "t": "Vlaanderen (1384)",
       "bak": "huwelijk",
       "waarom": "Filips de Stoute trouwde met Margaretha van Male, de erfdochter van Vlaanderen."
      },
      {
       "t": "Namen (1421)",
       "bak": "aankoop",
       "waarom": "Filips de Goede betaalde de graaf van Namen voor zijn gebied: dat is kopen."
      },
      {
       "t": "Brabant (1430)",
       "bak": "erfenis",
       "waarom": "Een familielid stierf zonder kinderen, dus het gebied ging naar de naaste familie: een erfenis."
      },
      {
       "t": "Holland en Zeeland (1428)",
       "bak": "verovering",
       "waarom": "Daar ging jaren oorlog aan vooraf: Filips de Goede dwong Jacoba van Beieren met geweld."
      },
      {
       "t": "Een zoon trouwt met de enige dochter van een buurvorst",
       "bak": "huwelijk",
       "waarom": "Als die dochter later alles erft, komt haar land via het huwelijk in de familie."
      },
      {
       "t": "Een leger neemt de steden van een buurman in",
       "bak": "verovering",
       "waarom": "Met geweld land innemen heet verovering."
      },
      {
       "t": "Een oom laat zijn land na aan zijn neef",
       "bak": "erfenis",
       "waarom": "Land dat je na iemands dood krijgt, is een erfenis."
      },
      {
       "t": "Een graaf met schulden verkoopt zijn graafschap",
       "bak": "aankoop",
       "waarom": "Er wordt betaald voor het land, dus het is een aankoop."
      }
     ],
     "bakjes": [
      {
       "id": "erfenis",
       "label": "erfenis",
       "som": "land krijgen na de dood van een familielid"
      },
      {
       "id": "huwelijk",
       "label": "huwelijkspolitiek",
       "som": "trouwen om land en macht te krijgen"
      },
      {
       "id": "aankoop",
       "label": "aankoop",
       "som": "betalen voor een gebied"
      },
      {
       "id": "verovering",
       "label": "verovering",
       "som": "met geweld innemen"
      }
     ],
     "w": "Erfenis, huwelijk, aankoop en verovering: met die vier manieren werd het Bourgondische gebied steeds groter.",
     "meer": "Huwelijk en erfenis lijken op elkaar. Het verschil: bij huwelijkspolitiek is het huwelijk <b>bewust geregeld</b> om later land te krijgen. Bij een gewone erfenis krijg je land omdat een familielid sterft."
    },
    {
     "t": "gap",
     "q": "Een bestuurlijke eenheid van een land, zoals Holland of Brabant, heet een ___.",
     "a": "gewest|een gewest",
     "w": "Holland, Zeeland, Brabant en Vlaanderen waren gewesten, elk met eigen bestuur, wetten en munten.",
     "meer": "Tegenwoordig zou je bijna 'provincie' zeggen, maar een gewest was veel zelfstandiger: met eigen munten en eigen wetten."
    },
    {
     "t": "mc",
     "q": "Wat zijn privileges?",
     "o": [
      "bijzondere rechten die de heer van een gewest heeft verleend",
      "belastingen die de gewesten elk jaar aan de hertog betalen",
      "huwelijken tussen twee adellijke families uit verschillende gewesten",
      "regels die een vorst voor alle gewesten tegelijk invoert"
     ],
     "a": "bijzondere rechten die de heer van een gewest heeft verleend",
     "w": "Een privilege is een voorrecht: een stad of gewest mocht bijvoorbeeld zelf rechtspreken of zelf beslissen over belasting.",
     "meer": "Juist omdat elk gewest andere privileges had, was er geen nationale staat met overal dezelfde regels.",
     "fout": {
      "belastingen die de gewesten elk jaar aan de hertog betalen": "Belasting is geen recht maar een plicht. Een privilege kon juist zijn dat een gewest zelf over belasting mocht meebeslissen.",
      "huwelijken tussen twee adellijke families uit verschillende gewesten": "Dat heeft met huwelijkspolitiek te maken, niet met privileges.",
      "regels die een vorst voor alle gewesten tegelijk invoert": "Regels voor iedereen tegelijk horen bij <b>centralisatie</b>. Privileges zijn juist rechten die per gewest verschillen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was er in de middeleeuwen nog geen Nederlandse staat?",
     "o": [
      "elk gewest had eigen wetten en privileges en wilde die houden",
      "de Franse koning verbood de gewesten om samen te werken",
      "de gewesten spraken allemaal een andere taal dan het Nederlands",
      "er woonden in de Nederlanden toen nog veel te weinig mensen"
     ],
     "a": "elk gewest had eigen wetten en privileges en wilde die houden",
     "w": "Een nationale staat is een staat met overal dezelfde wetten en regels. Door het particularisme had elk gewest juist zijn eigen regels.",
     "meer": "Zo schrijf je dit op: noem eerst het begrip (particularisme betekent ...), en leg dan het verband: 'daardoor golden er niet overal dezelfde regels, dus was er geen staat'.",
     "fout": {
      "de Franse koning verbood de gewesten om samen te werken": "Dat staat nergens in de stof. Het lag aan de gewesten zelf: ze wilden hun eigen zelfstandigheid houden.",
      "de gewesten spraken allemaal een andere taal dan het Nederlands": "Taal was niet de reden. Het ging om bestuur: eigen wetten, eigen munten, eigen privileges.",
      "er woonden in de Nederlanden toen nog veel te weinig mensen": "Integendeel: Vlaanderen was een van de drukste en rijkste gebieden van Europa. Het aantal mensen was het probleem niet."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Nu ga je de stof <b>toepassen op bronnen</b>. Bij een kaart vergelijk je altijd twee dingen: welk jaar staat erbij, en wat is er veranderd? Zo zie je op een kaart van 1404 alleen Bourgondië, Franche-Comté en Vlaanderen. Op de kaart van 1467 horen ook Holland, Zeeland, Brabant en Limburg erbij. Het verschil in jaren reken je uit met de jaartallen van de kaarten zelf (1467 - 1404 = 63), niet met een ander jaartal uit de tekst.</p>",
    "<p>Bij een vraag als <b>'Bewijs dat begrip X bij deze bron past'</b> doe je altijd twee stappen. Stap 1: je legt het begrip uit (wat betekent het?). Stap 2: je wijst iets aan in de bron dat daarbij past ('In de bron zie je ...'). Wie stap 1 vergeet, verliest de helft van de punten.</p>",
    "<p>Bij een <b>wapenschild</b> kijk je naar wat er op staat. Elk gebied had zijn eigen wapen: Vlaanderen een zwarte leeuw op goud. Staan er wapens van verschillende gebieden samen bij een vorst, dan laat de maker zien: die gebieden zijn van hem. Gebruik als bewijs wat je <b>in</b> de bron ziet, niet wat er in het onderschrift staat.</p>"
   ],
   "regel": "Bewijs dat een begrip past = eerst het begrip uitleggen, dan iets uit de bron aanwijzen.",
   "vragen": [
    {
     "t": "mc",
     "q": "Welk bestuurlijk probleem had Filips de Stoute volgens deze bron?",
     "bron": {
      "titel": "Bron B: Twee gebieden, ver uit elkaar",
      "tekst": "Bourgondië lag midden in Frankrijk. Vlaanderen lag aan de Noordzee. Daartussen zat zo'n vijfhonderd kilometer, met andere vorstendommen ertussen. Een hertog die in Dijon woonde, was weken onderweg om in Gent of Brugge te kunnen regeren.",
      "onder": "Naar: Historisch Nieuwsblad over Filips de Stoute (eigen bewerking)"
     },
     "o": [
      "zijn gebieden lagen ver uit elkaar",
      "Vlaanderen was te arm om een hertog te kunnen betalen",
      "de Franse koning wilde Vlaanderen van hem terugpakken",
      "zijn kinderen trouwden met mensen uit de verkeerde gewesten"
     ],
     "a": "zijn gebieden lagen ver uit elkaar",
     "w": "In de bron staat dat er vijfhonderd kilometer en andere vorstendommen tussen Bourgondië en Vlaanderen lagen. Dus: veel reizen om te kunnen besturen.",
     "meer": "Dit probleem verklaart ook waarom zijn kleinzoon later stadhouders aanstelt: plaatsvervangers die regeren als de hertog er niet is.",
     "fout": {
      "Vlaanderen was te arm om een hertog te kunnen betalen": "Andersom: Vlaanderen was het rijkste gebied van Europa. Daarom wilde Filips het juist zo graag.",
      "de Franse koning wilde Vlaanderen van hem terugpakken": "Daar staat niets over in de bron. Lees wat er wél staat: de afstand tussen de gebieden.",
      "zijn kinderen trouwden met mensen uit de verkeerde gewesten": "Zijn huwelijkspolitiek was juist slim. De bron gaat over afstand, niet over huwelijken."
     }
    },
    {
     "t": "mc",
     "q": "Je vergelijkt de kaart van het hertogdom Bourgondië in 1404 met die in 1467. Binnen hoeveel jaar is het gebied zo gegroeid?",
     "o": [
      "63 jaar",
      "83 jaar",
      "100 jaar",
      "41 jaar"
     ],
     "a": "63 jaar",
     "w": "Je rekent met de jaartallen van de twee kaarten: 1467 - 1404 = 63 jaar.",
     "meer": "Bij een vraag 'met behulp van beide bronnen' gebruik je de gegevens van <b>die bronnen</b>. Schrijf ook op waar je het ziet: 'bron 2 toont 1404, bron 3 toont 1467'.",
     "fout": {
      "83 jaar": "Dan reken je vanaf 1384 (Vlaanderen). Maar de kaarten gaan over 1404 en 1467, dus reken je met die twee jaartallen.",
      "100 jaar": "Honderd jaar is ongeveer de lengte van de hele Bourgondische tijd, niet het verschil tussen deze twee kaarten.",
      "41 jaar": "Dat is 1404 - 1363: de tijd dat Filips de Stoute hertog was. De vraag gaat over de twee kaarten (1404 en 1467)."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Bewijs dat het begrip 'huwelijkspolitiek' bij deze bron past. Leg eerst het begrip uit en verwijs daarna naar de bron. (2p)",
     "bron": {
      "titel": "Bron C: Een dubbele bruiloft",
      "tekst": "In 1385 vierde Filips de Stoute in de stad Kamerijk een groot feest met twee bruiloften tegelijk. Zijn zoon Jan trouwde met Margaretha van Beieren. Zijn dochter Margaretha trouwde met Willem van Beieren, de erfgenaam van Holland, Zeeland en Henegouwen.",
      "onder": "Naar: de dubbele bruiloft van Kamerijk, 1385 (eigen bewerking)"
     },
     "tip": "Twee stappen, elk een eigen zin. Stap 1: wat betekent huwelijkspolitiek? Stap 2: 'In de bron zie je dat ...' en noem iets concreets uit de bron.",
     "model": [
      {
       "label": "Begrip uitleggen",
       "tekst": "Huwelijkspolitiek is het regelen van een huwelijk om zo familiebezit en macht uit te breiden."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat de dochter van Filips trouwde met \"de erfgenaam van Holland, Zeeland en Henegouwen\". Daardoor kon de familie van Filips later deze gewesten in handen krijgen."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg eerst uit wat huwelijkspolitiek betekent.",
       "woorden": [
        "huwelijk",
        "macht",
        "bezit"
       ]
      },
      {
       "t": "Ik verwijs naar de bron ('in de bron staat / zie je').",
       "woorden": [
        "bron"
       ]
      },
      {
       "t": "Ik noem iets concreets: met wie werd getrouwd en welk land dat kon opleveren.",
       "woorden": [
        "erfgenaam",
        "holland",
        "beieren"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'zo'.",
       "woorden": [
        "daardoor",
        "zo kon",
        "waardoor"
       ]
      }
     ],
     "w": "Een 'bewijs dat dit begrip past'-vraag heeft altijd twee delen: het begrip uitleggen, en dan iets in de bron aanwijzen.",
     "meer": "De veelgemaakte fout: alleen beschrijven wat je ziet ('hij liet zijn kinderen trouwen') zonder eerst het begrip uit te leggen. Dan krijg je maar de helft van de punten."
    },
    {
     "t": "mc",
     "q": "Welk element UIT de bron bewijst dat deze hertog ook Vlaanderen in bezit had?",
     "bron": {
      "titel": "Bron D: Een hertogelijk zegel",
      "tekst": "Op een rond zegel van was staat een schild in vier vakken. Twee vakken tonen gouden lelies op blauw, twee vakken tonen schuine strepen: de wapens van Bourgondië. Precies in het midden ligt een klein schildje met een zwarte leeuw op een gouden veld.",
      "onder": "Onderschrift: Zegel van hertog Filips de Goede, rond 1430. (Eigen beschrijving van het wapen van de Bourgondische hertogen na 1384)"
     },
     "o": [
      "het kleine schildje met de zwarte leeuw op goud in het midden",
      "het onderschrift, want daar staat dat het zegel van Filips de Goede is",
      "de gouden lelies op blauw in twee van de vier vakken van het schild",
      "het jaartal rond 1430, want toen hoorde Vlaanderen al bij Bourgondië"
     ],
     "a": "het kleine schildje met de zwarte leeuw op goud in het midden",
     "w": "De zwarte leeuw op goud is het wapen van Vlaanderen. Dat schildje zit midden in het wapen van de hertog: hij laat zien dat Vlaanderen van hem is.",
     "meer": "Bij 'bewijs met een element uit de bron' mag je het onderschrift <b>niet</b> gebruiken. Je wijst iets aan wat je ín het beeld ziet: hier het schildje met de leeuw.",
     "fout": {
      "het onderschrift, want daar staat dat het zegel van Filips de Goede is": "Het onderschrift is geen element uit de bron zelf, en de naam van de hertog bewijst nog niet dat hij Vlaanderen had. Kijk naar het beeld.",
      "de gouden lelies op blauw in twee van de vier vakken van het schild": "De lelies horen bij Bourgondië (en het Franse koningshuis), niet bij Vlaanderen.",
      "het jaartal rond 1430, want toen hoorde Vlaanderen al bij Bourgondië": "Het jaartal staat in het onderschrift, en het is jouw voorkennis, geen element uit de bron."
     }
    },
    {
     "t": "mc",
     "q": "De stad Brugge weigert in 1440 de nieuwe munt van de hertog te gebruiken: 'Wij betalen met onze eigen Vlaamse munt, zoals we altijd hebben gedaan.' Bij welk begrip past dit?",
     "bron": {
      "titel": "Bron E: Brugge en de munt",
      "tekst": "\"Wij betalen met onze eigen Vlaamse munt, zoals we altijd hebben gedaan.\"",
      "onder": "Eigen bewerking: zo zou een Brugse schepen het rond 1440 kunnen zeggen"
     },
     "o": [
      "particularisme",
      "centralisatie",
      "huwelijkspolitiek",
      "Bourgondische tijd"
     ],
     "a": "particularisme",
     "w": "De stad wil haar eigen munt houden: ze wil zelfstandig blijven. Dat is particularisme.",
     "meer": "Truc: <b>wie</b> wil iets? Wil een stad of gewest iets eigens houden, dan is het particularisme. Wil de vorst alles gelijk maken, dan is het centralisatie.",
     "fout": {
      "centralisatie": "Omgedraaid! De <b>hertog</b> met zijn nieuwe munt voor iedereen doet aan centralisatie. Brugge verzet zich daartegen: dat is particularisme.",
      "huwelijkspolitiek": "Er wordt hier niet getrouwd. Het gaat om wie de baas is over het geld.",
      "Bourgondische tijd": "Het gebeurt wel in de Bourgondische tijd, maar dat is een periode, geen verklaring van wat Brugge wil."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Filips de Stoute krijgt Bourgondië in leen van de Franse koning (1363)",
      "Filips de Stoute krijgt Vlaanderen via zijn huwelijk (1384)",
      "Filips de Stoute sterft; zijn gebied is nog klein (1404)",
      "Filips de Goede roept de eerste Staten-Generaal bijeen (1464)",
      "Filips de Goede sterft; het gebied is enorm gegroeid (1467)"
     ],
     "w": "1363, 1384, 1404, 1464, 1467: van leen naar Vlaanderen, en van een klein naar een groot rijk.",
     "meer": "Let op 1464 en 1467: die liggen dicht bij elkaar en horen allebei bij Filips de Goede. De Staten-Generaal komt in 4.2.2."
    },
    {
     "t": "mc",
     "q": "Welk citaat uit de tekst laat zien hoe Filips de Stoute het hertogdom Bourgondië zelf kreeg?",
     "o": [
      "\"Hij kreeg het hertogdom Bourgondië in leen van de Franse koning.\"",
      "\"Door zijn huwelijk met de Vlaamse Margaretha kon hij zich verheugen op het bezit van Vlaanderen.\"",
      "\"Zijn gebieden lagen bepaald niet naast elkaar.\"",
      "\"Filips de Stoute wijdde zich met overgave aan de uitbreiding van zijn bezit.\""
     ],
     "a": "\"Hij kreeg het hertogdom Bourgondië in leen van de Franse koning.\"",
     "w": "Bourgondië kreeg hij in leen: de Franse koning gaf het hem in bruikleen in ruil voor trouw.",
     "meer": "Bij een citeervraag kies je de zin die <b>precies</b> antwoord geeft, niet een zin die er alleen in de buurt komt. Zet hem tussen aanhalingstekens.",
     "fout": {
      "\"Door zijn huwelijk met de Vlaamse Margaretha kon hij zich verheugen op het bezit van Vlaanderen.\"": "Dit citaat gaat over <b>Vlaanderen</b>, niet over Bourgondië. Lees de vraag goed: welk gebied?",
      "\"Zijn gebieden lagen bepaald niet naast elkaar.\"": "Dit gaat over zijn bestuurlijke probleem (de afstand), niet over hoe hij Bourgondië kreeg.",
      "\"Filips de Stoute wijdde zich met overgave aan de uitbreiding van zijn bezit.\"": "Dit zegt dat hij wilde uitbreiden, maar niet hoe hij Bourgondië kreeg."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was Vlaanderen voor Filips de Stoute zo'n aantrekkelijk gebied?",
     "o": [
      "het was rijk en vol steden door de handel in graan, wijn en laken",
      "het lag vlak naast Bourgondië, dus hij hoefde nauwelijks te reizen",
      "de Vlamingen waren gewend om zonder eigen privileges te leven",
      "het was een rustig boerengebied, ver van de drukke handelsroutes"
     ],
     "a": "het was rijk en vol steden door de handel in graan, wijn en laken",
     "w": "Vlaanderen was in die tijd het rijkste gebied van Europa, met grote steden als Gent en Brugge.",
     "meer": "Dit is een <b>economische</b> reden: rijke steden betekenen veel belastinggeld voor de hertog.",
     "fout": {
      "het lag vlak naast Bourgondië, dus hij hoefde nauwelijks te reizen": "Juist niet: er lag zo'n 500 kilometer tussen. Dat was zijn grote probleem.",
      "de Vlamingen waren gewend om zonder eigen privileges te leven": "Andersom: de Vlaamse steden hadden veel privileges en wilden die graag houden.",
      "het was een rustig boerengebied, ver van de drukke handelsroutes": "Vlaanderen was sterk verstedelijkt en lag midden in de handel met Engeland, Frankrijk en Italië."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Op goudniveau ga je verder dan de feiten. Je legt <b>verbanden</b> en kijkt door de ogen van mensen uit die tijd. Een Vlaamse koopman kreeg in 1384 een nieuwe heer, maar zijn stad hield haar eigen privileges. Voor hem veranderde er dus minder dan je zou denken: dat heet <b>continuïteit</b> (wat blijft) naast <b>verandering</b> (wat nieuw is).</p>",
    "<p>Een <b>verklaring in stappen</b> schrijf je als een ketting: elke schakel een eigen zin, en tussen de schakels woorden als <i>daardoor</i>, <i>waardoor</i> en <i>dus</i>. Begin met het begrip, dan wat er gebeurde, dan het gevolg.</p>",
    "<p>Het grote verband van 4.2: de Bourgondiërs <b>verzamelen</b> heel veel gewesten, maar die gewesten blijven elk hun eigen privileges houden (particularisme). Een groot gebied is dus nog geen staat. Precies daarom gaat Filips de Goede in 4.2.2 centraliseren.</p>"
   ],
   "regel": "Een groot gebied is nog geen staat: zolang elk gewest eigen privileges houdt, is er particularisme.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg met behulp van de wapenschilden uit hoe je de huwelijkspolitiek van Filips de Stoute in deze bron terugziet. (2p)",
     "bron": {
      "titel": "Bron F: Een raam in de kerk",
      "tekst": "Op een glas-in-loodraam knielen een hertog en een hertogin. Achter de hertog hangt het wapen van Bourgondië. Achter de hertogin hangt het wapen van Vlaanderen: een zwarte leeuw op goud. Boven hen hangt een derde schild, waarin de twee wapens samen in één schild zijn gezet.",
      "onder": "Onderschrift: Filips de Stoute en Margaretha van Male. (Eigen beschrijving van een bedacht raam, zoals die rond 1400 in kerken hingen)"
     },
     "tip": "Gebruik wat je IN het raam ziet (de wapens), niet de namen uit het onderschrift. Leg dan uit wat die wapens over het huwelijk zeggen.",
     "model": [
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je het wapen van Bourgondië bij de hertog en het wapen van Vlaanderen bij de hertogin, en daarboven één schild waarin ze samen staan."
      },
      {
       "label": "Daardoor / huwelijkspolitiek",
       "tekst": "Dat laat zien dat Bourgondië en Vlaanderen door het huwelijk bij elkaar zijn gekomen: dankzij huwelijkspolitiek kreeg Filips de Stoute Vlaanderen erbij."
      }
     ],
     "checklist": [
      {
       "t": "Ik beschrijf de wapens die ik in de bron zie.",
       "woorden": [
        "wapen",
        "schild",
        "leeuw"
       ]
      },
      {
       "t": "Ik noem dat de wapens samen in één schild staan.",
       "woorden": [
        "samen",
        "een schild",
        "één schild"
       ]
      },
      {
       "t": "Ik leg uit dat Vlaanderen door het huwelijk bij Bourgondië kwam.",
       "woorden": [
        "huwelijk",
        "vlaanderen"
       ]
      },
      {
       "t": "Ik gebruik het onderschrift niet als bewijs.",
       "woorden": []
      }
     ],
     "w": "De twee wapens die samen in één schild komen, zijn het beeld van het huwelijk: twee gebieden worden één bezit.",
     "meer": "Veelgemaakte fout: 'In het onderschrift staat Filips en Margaretha.' Dat is geen bewijs uit de bron. Het bewijs zit in de wapens zelf."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "In 1467 hadden de Bourgondische hertogen een enorm gebied in de Nederlanden. Toch was er nog geen Nederlandse staat. Leg in stappen uit hoe dat kan. (3p)",
     "tip": "Schrijf een ketting van drie zinnen: hoe het gebied groeide, waarom dat nog geen staat was (begrip!), en wat de hertog daardoor wilde.",
     "model": [
      {
       "label": "Hoe het gebied groeide",
       "tekst": "De Bourgondiërs breidden hun gebied uit door erfenissen, huwelijkspolitiek, aankoop en verovering."
      },
      {
       "label": "Begrip: particularisme",
       "tekst": "Maar elk gewest hield zijn eigen bestuur, wetten, munten en privileges. Dat streven naar zelfstandigheid heet particularisme. Daardoor golden er niet overal dezelfde wetten, dus was het geen nationale staat."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor was het gebied moeilijk te besturen, en wilde Filips de Goede centraliseren: één bestuur met overal dezelfde regels."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem minstens twee manieren waarop het gebied groeide.",
       "woorden": [
        "huwelijk",
        "erf",
        "aankoop",
        "verover"
       ]
      },
      {
       "t": "Ik gebruik het begrip particularisme en leg het uit.",
       "woorden": [
        "particularis"
       ]
      },
      {
       "t": "Ik leg uit wat een staat is (overal dezelfde wetten).",
       "woorden": [
        "dezelfde wetten",
        "dezelfde regels",
        "staat"
       ]
      },
      {
       "t": "Ik verbind de stappen met 'daardoor' of 'dus'.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "Groot is niet hetzelfde als één: de gewesten hoorden bij dezelfde heer, maar hielden hun eigen regels.",
     "meer": "Veelgemaakte fout: alleen schrijven 'ze wilden hun eigen rechten houden'. Noem het begrip, leg uit wat een staat is, en maak de stap naar centralisatie."
    },
    {
     "t": "mc",
     "q": "Een Vlaamse koopman krijgt in 1384 een nieuwe heer: Filips de Stoute. Wat is hier vooral continuïteit (wat blijft hetzelfde)?",
     "o": [
      "de stad Gent houdt haar eigen privileges en haar eigen bestuur",
      "Vlaanderen krijgt een Franse hertog als nieuwe heer en landsheer",
      "Vlaanderen hoort voortaan bij hetzelfde bezit als Bourgondië",
      "de hertog van Bourgondië wordt veel rijker en machtiger"
     ],
     "a": "de stad Gent houdt haar eigen privileges en haar eigen bestuur",
     "w": "De heer is nieuw, maar de privileges van de stad blijven: dat is continuïteit.",
     "meer": "Bij continuïteit en verandering zoek je naar twee kanten: wat is <b>nieuw</b> en wat <b>blijft</b>? Hier verandert de baas, maar de manier van besturen in de stad blijft.",
     "fout": {
      "Vlaanderen krijgt een Franse hertog als nieuwe heer en landsheer": "Een nieuwe heer is juist een <b>verandering</b>.",
      "Vlaanderen hoort voortaan bij hetzelfde bezit als Bourgondië": "Dat is ook nieuw, dus een verandering.",
      "de hertog van Bourgondië wordt veel rijker en machtiger": "Ook dat is een verandering (een gevolg), geen iets wat hetzelfde blijft."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was huwelijkspolitiek voor een hertog vaak slimmer dan verovering?",
     "o": [
      "je kreeg land zonder dure oorlog te voeren",
      "een huwelijk zorgde ervoor dat het gewest zijn privileges meteen kwijtraakte",
      "de Franse koning verbood de hertogen om gebieden met een leger te veroveren",
      "door een huwelijk verdwenen de grenzen tussen de gewesten vanzelf voorgoed"
     ],
     "a": "je kreeg land zonder dure oorlog te voeren",
     "w": "Een oorlog kost geld en mensenlevens. Een huwelijk levert land op zonder te vechten, en een erfgenaam is een 'echte' heer.",
     "meer": "Dit is een inzichtvraag: je bedenkt zelf de voordelen. Zet ze tegenover elkaar: wat kost oorlog, wat kost een bruiloft?",
     "fout": {
      "een huwelijk zorgde ervoor dat het gewest zijn privileges meteen kwijtraakte": "Nee, de gewesten hielden hun privileges. Daarom bleef het particularisme bestaan.",
      "de Franse koning verbood de hertogen om gebieden met een leger te veroveren": "Er was geen verbod: Filips de Goede veroverde Holland en Zeeland juist na een oorlog.",
      "door een huwelijk verdwenen de grenzen tussen de gewesten vanzelf voorgoed": "De gewesten bleven apart, met eigen wetten en munten. Eén heer maakt nog geen staat."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe werd Filips de Stoute zo machtig?",
     "stappen": [
      "Filips de Stoute trouwt met Margaretha van Male, de erfdochter van Vlaanderen",
      "Zijn schoonvader, de graaf van Vlaanderen, sterft",
      "Daardoor krijgt Filips in 1384 het gewest Vlaanderen",
      "Het rijke Vlaanderen levert de hertog veel geld op",
      "Daardoor kan hij zijn familie nog meer gebieden laten verwerven"
     ],
     "w": "Huwelijk, dan de dood van de schoonvader, dan Vlaanderen, dan geld, dan nog meer macht: elke stap volgt uit de vorige.",
     "meer": "Zo schrijf je ook een verklaring op: elke schakel een eigen zin, met 'daardoor' ertussen."
    },
    {
     "t": "mc",
     "q": "Is de maker van deze uitspraak voor of tegen particularisme?",
     "bron": {
      "titel": "Bron G: Een Gentse koopman",
      "tekst": "\"Het maakt ons weinig uit welke hertog onze heer is, zolang Gent zijn eigen rechten houdt en wij zelf over onze belastingen beslissen.\"",
      "onder": "Eigen bewerking: zo zou een Gentse koopman het rond 1390 kunnen zeggen"
     },
     "o": [
      "voor, want Gent moet zijn eigen rechten houden",
      "tegen, want hij vindt het niet belangrijk wie de hertog is",
      "voor, want hij wil graag één hertog voor alle gewesten samen",
      "tegen, want hij wil dat de hertog over de belasting beslist"
     ],
     "a": "voor, want Gent moet zijn eigen rechten houden",
     "w": "Hij wil dat zijn stad zelfstandig blijft. Dat is precies particularisme.",
     "meer": "Bij 'voor of tegen' antwoord je eerst met voor of tegen, en bewijs je het met een stukje uit de bron: \"zolang Gent zijn eigen rechten houdt\".",
     "fout": {
      "tegen, want hij vindt het niet belangrijk wie de hertog is": "Wie de hertog is maakt hem niet uit, maar de eigen rechten van Gent wel. Dat maakt hem juist vóór particularisme.",
      "voor, want hij wil graag één hertog voor alle gewesten samen": "De conclusie 'voor' klopt, maar de reden niet: één heer voor iedereen past bij centralisatie, en daar heeft hij het niet over.",
      "tegen, want hij wil dat de hertog over de belasting beslist": "Omgedraaid: hij wil dat Gent <b>zelf</b> over de belasting beslist."
     }
    },
    {
     "t": "mc",
     "q": "Een klasgenoot zegt: 'Filips de Stoute was de vader van Maria van Bourgondië.' Wat is de juiste familievolgorde?",
     "o": [
      "Filips de Stoute, Jan zonder Vrees, Filips de Goede, Karel de Stoute, Maria",
      "Filips de Goede, Filips de Stoute, Karel de Stoute, Maria",
      "Filips de Stoute, Karel de Stoute, Filips de Goede, Maria",
      "Karel de Stoute, Filips de Stoute, Filips de Goede, Maria"
     ],
     "a": "Filips de Stoute, Jan zonder Vrees, Filips de Goede, Karel de Stoute, Maria",
     "w": "Vijf generaties: opa's opa Filips de Stoute, dan Jan zonder Vrees, dan Filips de Goede, dan Karel de Stoute, en dan Maria.",
     "meer": "Filips de Goede is de <b>kleinzoon</b> van Filips de Stoute, en Maria is de <b>kleindochter</b> van Filips de Goede. Haar vader is Karel de Stoute (niet Filips!).",
     "fout": {
      "Filips de Goede, Filips de Stoute, Karel de Stoute, Maria": "Filips de Goede komt na Filips de Stoute: hij is zijn kleinzoon.",
      "Filips de Stoute, Karel de Stoute, Filips de Goede, Maria": "Karel de Stoute is de zoon van Filips de Goede, dus hij komt erna, niet ervoor. Let op: Stoute en Stoute zijn twee verschillende mensen (Filips en Karel).",
      "Karel de Stoute, Filips de Stoute, Filips de Goede, Maria": "Karel de Stoute is de vader van Maria, de laatste hertog vóór haar. Hij hoort vlak voor Maria."
     }
    }
   ]
  }
 ]
},
{
 "id": "staatsvorming",
 "emoji": "🏛️",
 "titel": "4.2.2 · Nederlandse staatsvorming",
 "paragraaf": "§4.2",
 "kort": "Filips de Goede wil van al die eigenwijze gewesten één geheel maken: stadhouders, de Staten-Generaal van 1464, Brussel als hoofdstad en Frans als bestuurstaal. De adel ziet het met lede ogen aan.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>Al die verschillende gewesten zijn lastig te besturen: elk gewest heeft andere regels, en de hertog kan niet overal tegelijk zijn. Daarom wil <b>Filips de Goede</b>, de kleinzoon van Filips de Stoute, <b>centralisatie</b>: <i>het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels</i>. Zo wil hij meer invloed krijgen en het particularisme verminderen.</p>",
    "<p>Hij doet dat op verschillende manieren. <b>1. Stadhouders.</b> Een stadhouder is een <i>plaatsvervanger van de heer binnen een gewest</i>. Is de hertog er zelf niet, dan regelt de stadhouder het namens hem. <b>2. De Staten-Generaal.</b> Elk gewest had een <b>Statenvergadering</b>: een <i>vergadering van het bestuur van een gewest</i>. Filips de Goede brengt al die Statenvergaderingen samen in één vergadering: de <b>Staten-Generaal</b>, die in <b>1464</b> voor het eerst bijeenkomt.</p>",
    "<p>In de Staten-Generaal overlegt de landsheer over het beleid voor alle gewesten samen. Hij doet er ook een <b>bede</b>: <i>een officieel verzoek om geld of om belasting te mogen heffen</i>. <b>3. Brussel en Frans.</b> Brussel wordt de hoofdstad van zijn Nederlanden, en het bestuur moet in het <b>Frans</b>.</p>",
    "<p>De Nederlandse <b>adel</b> verliest hierbij. Het eigen hof van het gewest verdwijnt, en in de nieuwe raden en rekenkamers kom je alleen nog op basis van je kwaliteiten, niet omdat je van adel bent. Edelen uit de Nederlandstalige gewesten komen er nauwelijks nog tussen. Voor de vorst heeft dat voordelen: hij hoeft minder te reizen, en met overal dezelfde regels is het bestuur veel overzichtelijker.</p>",
    "<p>Let op het woord <b>Staten-Generaal</b>! Tussen 1464 en 1796 is dat <i>de gezamenlijke vergadering van de verschillende Statenvergaderingen van de verschillende gewesten</i>. Sinds 1814 is het de naam van het Nederlandse parlement: de <b>Eerste en Tweede Kamer</b>. Zelfde naam, andere betekenis.</p>"
   ],
   "regel": "Centralisatie = de vorst wil één bestuur met overal dezelfde regels: stadhouders, Staten-Generaal (1464), Brussel en Frans.",
   "voorbeelden": [
    {
     "en": "Statenvergadering = één gewest. Staten-Generaal = alle Statenvergaderingen samen.",
     "let": "Generaal betekent hier 'algemeen, van iedereen samen'."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wat betekent centralisatie?",
     "o": [
      "het streven van vorsten naar één bestuur met dezelfde regels",
      "het streven van de gewesten en steden om hun zelfstandigheid te houden",
      "een officieel verzoek van de vorst om geld of belasting te heffen",
      "de vergadering van het bestuur van één enkel gewest in de Nederlanden"
     ],
     "a": "het streven van vorsten naar één bestuur met dezelfde regels",
     "w": "Centraal = vanuit het midden. De vorst wil alles vanuit één punt besturen, met dezelfde regels voor iedereen.",
     "meer": "Centralisatie (de vorst) en particularisme (de gewesten) zijn elkaars tegenpolen. Dat paar komt terug in 4.3 en 4.4.",
     "fout": {
      "het streven van de gewesten en steden om hun zelfstandigheid te houden": "Omgedraaid! Dit is <b>particularisme</b>. Centralisatie is wat de vorst wil.",
      "een officieel verzoek van de vorst om geld of belasting te heffen": "Dat is een <b>bede</b>.",
      "de vergadering van het bestuur van één enkel gewest in de Nederlanden": "Dat is een <b>Statenvergadering</b>."
     }
    },
    {
     "t": "gap",
     "q": "De Staten-Generaal kwam voor het eerst bijeen in het jaar ___.",
     "a": "1464|in 1464",
     "w": "In 1464 riep Filips de Goede de Statenvergaderingen samen bijeen.",
     "meer": "Drie jaar later, in 1467, sterft Filips de Goede. 1464 en 1467 liggen dus dicht bij elkaar."
    },
    {
     "t": "mc",
     "q": "Wat is een stadhouder in de tijd van Filips de Goede?",
     "o": [
      "een plaatsvervanger van de heer binnen een gewest",
      "de plaatsvervanger van de vorst in alle gewesten samen",
      "een burgemeester die door de inwoners van de stad gekozen wordt",
      "de voorzitter van de vergadering van de Staten-Generaal"
     ],
     "a": "een plaatsvervanger van de heer binnen een gewest",
     "w": "Een stadhouder 'houdt de stede' (de plaats) voor de heer: hij bestuurt één gewest namens hem.",
     "meer": "Let op: een stadhouder gaat over <b>één gewest</b>. Later (4.3) komt er ook een landvoogd: die gaat over <b>alle gewesten</b>.",
     "fout": {
      "de plaatsvervanger van de vorst in alle gewesten samen": "Dat is later een <b>landvoogd</b> (4.3). Een stadhouder gaat over één gewest.",
      "een burgemeester die door de inwoners van de stad gekozen wordt": "Een stadhouder wordt niet gekozen door de inwoners, maar aangesteld door de hertog.",
      "de voorzitter van de vergadering van de Staten-Generaal": "Dat klopt niet: het is de landsheer zelf die in de Staten-Generaal overlegt en zijn bede doet."
     }
    },
    {
     "t": "mc",
     "q": "Wat is een bede?",
     "o": [
      "een officieel verzoek om geld of om belasting te mogen heffen",
      "een gebed dat de hertog uitspreekt aan het begin van de vergadering",
      "een bijzonder recht dat een gewest van zijn heer gekregen heeft",
      "een bevel van de hertog dat alle gewesten moeten gehoorzamen"
     ],
     "a": "een officieel verzoek om geld of om belasting te mogen heffen",
     "w": "Bede komt van 'bidden' in de betekenis van vragen: de vorst vraagt de gewesten om geld.",
     "meer": "Een bede is een <b>verzoek</b>, geen bevel. Daardoor hielden de gewesten macht: ze konden ja of nee zeggen.",
     "fout": {
      "een gebed dat de hertog uitspreekt aan het begin van de vergadering": "Het woord lijkt op bidden, maar het gaat om geld vragen, niet om een gebed.",
      "een bijzonder recht dat een gewest van zijn heer gekregen heeft": "Dat is een <b>privilege</b>.",
      "een bevel van de hertog dat alle gewesten moeten gehoorzamen": "Een bede is juist een <b>verzoek</b>. De hertog moest om het geld vragen."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de Staten-Generaal in de Bourgondische tijd?",
     "o": [
      "alle Statenvergaderingen van de gewesten samen",
      "het Nederlandse parlement, bestaande uit de Eerste en Tweede Kamer",
      "de vergadering van het bestuur van één gewest, zoals Holland",
      "de raad van Franse edelen die de hertog in Brussel adviseerde"
     ],
     "a": "alle Statenvergaderingen van de gewesten samen",
     "w": "Filips de Goede bracht alle Statenvergaderingen samen in één vergadering: de Staten-Generaal.",
     "meer": "Toen (1464-1796): alle Statenvergaderingen samen. Nu (sinds 1814): de Eerste en Tweede Kamer.",
     "fout": {
      "het Nederlandse parlement, bestaande uit de Eerste en Tweede Kamer": "Dat is de Staten-Generaal van <b>nu</b> (sinds 1814). In 1464 bestonden de Eerste en Tweede Kamer nog niet.",
      "de vergadering van het bestuur van één gewest, zoals Holland": "Dat is een <b>Statenvergadering</b>. De Staten-Generaal is ze allemaal samen.",
      "de raad van Franse edelen die de hertog in Brussel adviseerde": "Nee, in de Staten-Generaal zaten de afgevaardigden van de gewesten, niet een groepje Franse edelen."
     }
    },
    {
     "t": "gap",
     "q": "Filips de Goede maakte ___ de hoofdstad van zijn Nederlanden.",
     "a": "Brussel",
     "w": "Brussel werd de hoofdstad, en het bestuur moest er in het Frans.",
     "meer": "Eén hoofdstad en één bestuurstaal: allebei voorbeelden van centralisatie."
    },
    {
     "t": "mc",
     "q": "Welke hertog voerde de stadhouders, de Staten-Generaal en het Frans als bestuurstaal in?",
     "o": [
      "Filips de Goede",
      "Filips de Stoute",
      "Filips II",
      "Filips de Schone"
     ],
     "a": "Filips de Goede",
     "w": "Filips de Goede, de kleinzoon van Filips de Stoute, is de grote centralisator van de Bourgondiërs.",
     "meer": "Ezelsbrug: Filips de <b>Goede</b> wilde het bestuur 'goed' regelen, met overal dezelfde regels.",
     "fout": {
      "Filips de Stoute": "Filips de Stoute is zijn opa: die kreeg Vlaanderen in 1384. De centralisatie komt van zijn kleinzoon.",
      "Filips II": "Filips II centraliseert later óók (rond 1555, in 4.4), maar de Staten-Generaal van 1464 is van Filips de Goede.",
      "Filips de Schone": "Filips de Schone is de zoon van Maria van Bourgondië en Maximiliaan. Hij komt pas na 1482."
     }
    },
    {
     "t": "mc",
     "q": "Waarom raakte de Nederlandse adel buiten spel door de centralisatie van Filips de Goede?",
     "o": [
      "het gewestelijk hof verdween en afkomst telde niet meer",
      "de adel moest al zijn land en kastelen afstaan aan de hertog van Bourgondië",
      "de adel mocht van de hertog niet meer meedoen aan de Statenvergaderingen",
      "de edelen werden allemaal naar Bourgondië gestuurd om daar te gaan wonen"
     ],
     "a": "het gewestelijk hof verdween en afkomst telde niet meer",
     "w": "Edelen konden niet meer meebesturen alleen omdat ze van adel waren. En voor edelen uit Nederlandstalige gewesten was het Franse hof ver weg.",
     "meer": "Dit hoort bij het kenmerkend aspect: het conflict in de Nederlanden dat leidde tot een Nederlandse staat. De adel is een van de verliezers.",
     "fout": {
      "de adel moest al zijn land en kastelen afstaan aan de hertog van Bourgondië": "Ze hielden hun land. Wat ze kwijtraakten was hun plek in het <b>bestuur</b>.",
      "de adel mocht van de hertog niet meer meedoen aan de Statenvergaderingen": "Daar staat niets over in de stof. Het ging om het verdwijnen van het gewestelijk hof en de nieuwe raden.",
      "de edelen werden allemaal naar Bourgondië gestuurd om daar te gaan wonen": "Dat is verzonnen. Ze bleven, maar hadden minder te zeggen."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Het belangrijkste paar van dit hoofdstuk is <b>particularisme tegenover centralisatie</b>. Leerlingen draaien die twee vaak om. Stel jezelf daarom steeds één vraag: <b>wie wil het?</b> Wil een gewest of stad iets <i>eigens</i> houden: particularisme. Wil de vorst iets <i>voor iedereen gelijk</i> maken: centralisatie.</p>",
    "<p>Een mooi voorbeeld: een Statenvergadering (één gewest regelt het zelf) hoort bij particularisme. De Staten-Generaal (alle gewesten samen, met de landsheer) hoort bij centralisatie. Zelfde soort woord, tegenovergestelde kant.</p>",
    "<p>Bij een <b>toen-en-nu</b>-vraag over de Staten-Generaal schrijf je twee dingen op: wat het <b>toen</b> was (de vergadering van de Statenvergaderingen van de gewesten), en hoe dat verschilt van <b>nu</b> (het parlement: de Eerste en Tweede Kamer, gekozen door de bevolking).</p>"
   ],
   "regel": "Wie wil het? Gewest wil iets eigens = particularisme. Vorst wil alles gelijk = centralisatie.",
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Hoort dit bij particularisme of bij centralisatie?",
     "chips": [
      {
       "t": "Holland heeft een eigen Statenvergadering",
       "bak": "part",
       "waarom": "Eén gewest regelt zelf zijn zaken: dat is zelfstandigheid, dus particularisme."
      },
      {
       "t": "De Staten-Generaal komt in 1464 bijeen",
       "bak": "centr",
       "waarom": "Alle gewesten worden samengebracht in één vergadering met de landsheer: centralisatie."
      },
      {
       "t": "Elk gewest slaat zijn eigen munten",
       "bak": "part",
       "waarom": "Eigen munten per gewest betekent: geen eenheid. Dat is particularisme."
      },
      {
       "t": "Een stadhouder bestuurt namens de hertog",
       "bak": "centr",
       "waarom": "De stadhouder zorgt dat de wil van de hertog in het gewest wordt uitgevoerd: centralisatie."
      },
      {
       "t": "Het bestuur moet overal in het Frans",
       "bak": "centr",
       "waarom": "Eén taal voor alle gewesten maakt alles gelijk: centralisatie."
      },
      {
       "t": "Een stad beslist zelf over haar belasting",
       "bak": "part",
       "waarom": "De stad wil het zelf regelen: dat is het streven naar zelfstandigheid."
      },
      {
       "t": "Brussel wordt de hoofdstad",
       "bak": "centr",
       "waarom": "Eén centrum voor alle gewesten: het woord centralisatie zegt het al."
      },
      {
       "t": "Alleen inwoners van het gewest krijgen er een ambt",
       "bak": "part",
       "waarom": "Het gewest houdt het bestuur in eigen hand, zonder buitenstaanders: particularisme."
      }
     ],
     "bakjes": [
      {
       "id": "part",
       "label": "particularisme (gewesten willen zelfstandig blijven)",
       "som": "iets eigens houden"
      },
      {
       "id": "centr",
       "label": "centralisatie (vorst wil één bestuur)",
       "som": "alles gelijk maken"
      }
     ],
     "w": "Vraag steeds: wie wil dit? Het gewest (eigen) of de vorst (gelijk)?",
     "meer": "Let op de Statenvergadering en de Staten-Generaal: ze lijken op elkaar, maar staan aan tegenovergestelde kanten."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Tegenwoordig bedoelen we met de Staten-Generaal de Eerste en Tweede Kamer. Leg uit wat de Staten-Generaal in de Bourgondische tijd was, en laat het verschil met nu zien. (2p)",
     "bron": {
      "titel": "Bron H: De eerste Staten-Generaal",
      "tekst": "Op een miniatuur (een kleine schildering in een boek) zit de hertog op een troon. Voor hem staan afgevaardigden uit de verschillende gewesten. Bovenin de zaal hangt een rij wapenschilden van die gewesten.",
      "onder": "Naar: een afbeelding van de eerste Staten-Generaal van 1464 (eigen beschrijving)"
     },
     "tip": "Twee zinnen: één over toen, één over nu. Gebruik het woord Statenvergadering, en zeg dat het toen geen gekozen parlement was.",
     "model": [
      {
       "label": "Toen",
       "tekst": "In de Bourgondische tijd was de Staten-Generaal de gezamenlijke vergadering van de Statenvergaderingen van de verschillende gewesten, waar de landsheer overlegde en om geld vroeg (bede)."
      },
      {
       "label": "Verschil met nu",
       "tekst": "Nu is de Staten-Generaal het gekozen parlement van Nederland: de Eerste en Tweede Kamer. Toen was het dus geen parlement dat door de bevolking gekozen werd."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg uit dat het toen een vergadering van de Statenvergaderingen van de gewesten was.",
       "woorden": [
        "statenvergader",
        "gewest"
       ]
      },
      {
       "t": "Ik noem wat het nu is: de Eerste en Tweede Kamer.",
       "woorden": [
        "kamer",
        "parlement"
       ]
      },
      {
       "t": "Ik maak het verschil duidelijk (toen geen gekozen parlement).",
       "woorden": [
        "gekozen",
        "verschil",
        "toen",
        "nu"
       ]
      }
     ],
     "w": "Zelfde naam, andere betekenis: toen de gewesten samen, nu het gekozen parlement.",
     "meer": "Veelgemaakte fout: alleen 'vertegenwoordigers van de gewesten' schrijven. Maak ook echt het verschil met nu duidelijk, want daar vraagt de opdracht om."
    },
    {
     "t": "mc",
     "q": "In de krant van vandaag staat: 'De Staten-Generaal stemt over de nieuwe begroting.' Wie stemmen er?",
     "o": [
      "de leden van de Eerste en Tweede Kamer",
      "de afgevaardigden van de Statenvergaderingen van de gewesten",
      "de stadhouders van de verschillende provincies van Nederland",
      "de koning en zijn adviseurs in het paleis in Brussel"
     ],
     "a": "de leden van de Eerste en Tweede Kamer",
     "w": "Sinds 1814 is de Staten-Generaal het parlement: de Eerste Kamer en de Tweede Kamer samen.",
     "meer": "In de Tweede Kamer zitten 150 leden, in de Eerste Kamer 75. Die worden (direct of indirect) door de bevolking gekozen.",
     "fout": {
      "de afgevaardigden van de Statenvergaderingen van de gewesten": "Dat was de Staten-Generaal van <b>toen</b> (1464-1796). In een krant van nu gaat het om het parlement.",
      "de stadhouders van de verschillende provincies van Nederland": "Stadhouders bestaan niet meer, en ze zaten nooit in de Staten-Generaal om te stemmen.",
      "de koning en zijn adviseurs in het paleis in Brussel": "Brussel is de hoofdstad van België, en de koning stemt niet in het parlement."
     }
    },
    {
     "t": "mc",
     "q": "Welk zinsdeel uit de bron bewijst het best dat de adel buiten spel werd gezet?",
     "bron": {
      "titel": "Bron I: De adel als verliezers",
      "tekst": "Het gewestelijk hof was verdwenen. In de nieuwe raad- en rekenkamers was voor hen nauwelijks plaats, en als dat nog het geval was, dan niet op basis van overerfbare voorrechten, maar op basis van individuele kwaliteiten.",
      "onder": "Naar: Robert Stein, De hertog en zijn staten"
     },
     "o": [
      "\"In de nieuwe raad- en rekenkamers was voor hen nauwelijks plaats\"",
      "\"de nieuwe raad- en rekenkamers\"",
      "\"niet op basis van overerfbare voorrechten, maar op basis van individuele kwaliteiten\"",
      "\"en als dat nog het geval was\""
     ],
     "a": "\"In de nieuwe raad- en rekenkamers was voor hen nauwelijks plaats\"",
     "w": "Dit zinsdeel zegt precies dat de edelen bijna niet meer mee konden besturen.",
     "meer": "Na het citaat leg je het nog uit in eigen woorden: 'De adel kon dus nauwelijks meer meebesturen.' Citaat plus uitleg = 2 punten.",
     "fout": {
      "\"de nieuwe raad- en rekenkamers\"": "Dit noemt alleen de nieuwe raden, maar niet dat de adel er geen plek had. Het bewijs zit in 'nauwelijks plaats'.",
      "\"niet op basis van overerfbare voorrechten, maar op basis van individuele kwaliteiten\"": "Dit zegt hoe je er wel in kwam, niet dat de adel eruit lag. Het is te weinig als bewijs.",
      "\"en als dat nog het geval was\"": "Dit losse stukje zegt op zichzelf niets. Een citaat moet het antwoord echt dragen."
     }
    },
    {
     "t": "mc",
     "q": "Is de schrijver van deze brief voor of tegen het Frans als bestuurstaal?",
     "bron": {
      "titel": "Bron J: Een brief uit Holland",
      "tekst": "\"De brieven van het hof komen in een taal die onze schepenen niet lezen. Moeten wij nu een tolk betalen om te begrijpen wat onze eigen heer van ons wil?\"",
      "onder": "Eigen bewerking: zo zou een Hollandse stadsbestuurder het rond 1460 kunnen schrijven"
     },
     "o": [
      "tegen, want zijn schepenen lezen geen Frans",
      "voor, want hij wil graag begrijpen wat zijn eigen heer van hem wil",
      "voor, want met een tolk kan het bestuur in Holland gewoon doorgaan",
      "tegen, want hij wil dat de hertog naar Holland komt wonen"
     ],
     "a": "tegen, want zijn schepenen lezen geen Frans",
     "w": "Hij klaagt dat de schepenen de brieven niet lezen en dat ze een tolk moeten betalen. Hij is dus tegen.",
     "meer": "Dit is het standpunt van de gewesten: ze wilden zelf bepalen welke taal er gebruikt werd, en dat was in Holland het Nederlands.",
     "fout": {
      "voor, want hij wil graag begrijpen wat zijn eigen heer van hem wil": "Dat hij het wil begrijpen klopt, maar daarom klaagt hij juist over het Frans. Let op de toon: een klacht.",
      "voor, want met een tolk kan het bestuur in Holland gewoon doorgaan": "Hij noemt de tolk als iets wat hij <b>niet</b> wil betalen. Dat is tegen.",
      "tegen, want hij wil dat de hertog naar Holland komt wonen": "'Tegen' klopt, maar die reden staat niet in de bron. Gebruik wat er echt staat."
     }
    },
    {
     "t": "mc",
     "q": "Waarom past het aanstellen van stadhouders bij centralisatie?",
     "o": [
      "hij laat de regels van de hertog in een gewest gelden",
      "de stadhouder komt op voor de eigen privileges van zijn gewest",
      "de stadhouder wordt door de inwoners van het gewest zelf gekozen",
      "de stadhouder zorgt dat elk gewest zijn eigen munt kan houden"
     ],
     "a": "hij laat de regels van de hertog in een gewest gelden",
     "w": "Bij centralisatie gelden overal dezelfde regels. De stadhouder is de plaatsvervanger die dat in een gewest controleert.",
     "meer": "Twee stappen in je antwoord: (1) wat centralisatie is, (2) wat de stadhouder daarvoor doet.",
     "fout": {
      "de stadhouder komt op voor de eigen privileges van zijn gewest": "Omgedraaid: opkomen voor eigen privileges is particularisme. De stadhouder werkt voor de hertog.",
      "de stadhouder wordt door de inwoners van het gewest zelf gekozen": "Nee, de hertog stelt hem aan. Daardoor is hij er voor de hertog.",
      "de stadhouder zorgt dat elk gewest zijn eigen munt kan houden": "Eigen munten per gewest horen bij particularisme, niet bij wat de stadhouder voor de hertog doet."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom ging Filips de Goede centraliseren?",
     "stappen": [
      "De gewesten hebben elk hun eigen bestuur, wetten en privileges",
      "Daardoor zijn ze moeilijk te besturen, zeker van zo ver weg",
      "Filips de Goede wil één bestuur met overal dezelfde regels",
      "Hij stelt stadhouders aan, roept de Staten-Generaal bijeen en maakt Brussel hoofdstad",
      "De gewesten worden bang dat ze hun privileges kwijtraken"
     ],
     "w": "Probleem (verschillende gewesten), dan het doel (centralisatie), dan de maatregelen, dan de reactie van de gewesten.",
     "meer": "Die laatste stap is de brug naar 4.2.3: de angst van de gewesten leidt in 1477 tot opstanden."
    },
    {
     "t": "mc",
     "q": "Welk voordeel had Filips de Goede van de centralisatie?",
     "o": [
      "minder reizen en een overzichtelijker bestuur",
      "de gewesten konden voortaan zelf beslissen hoeveel belasting ze betaalden",
      "de Nederlandse adel kreeg meer invloed aan het hof in Brussel",
      "elk gewest mocht zijn eigen taal in het bestuur blijven gebruiken"
     ],
     "a": "minder reizen en een overzichtelijker bestuur",
     "w": "Met stadhouders en één bestuur hoefde de hertog niet overal zelf heen, en één set regels is makkelijker dan zeventien.",
     "meer": "Denk terug aan het probleem van Filips de Stoute (500 kilometer reizen). Centralisatie lost dat deels op.",
     "fout": {
      "de gewesten konden voortaan zelf beslissen hoeveel belasting ze betaalden": "Dat is een voordeel voor de <b>gewesten</b> (particularisme), niet voor de vorst.",
      "de Nederlandse adel kreeg meer invloed aan het hof in Brussel": "Andersom: de adel werd juist buiten spel gezet.",
      "elk gewest mocht zijn eigen taal in het bestuur blijven gebruiken": "Nee, het bestuur moest in het Frans. Eigen taal per gewest is het tegenovergestelde van centralisatie."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Bij een <b>perspectiefvraag</b> kruip je in het hoofd van iemand uit die tijd. Wat verliest hij, wat wint hij? Een edelman uit Holland verliest zijn plek in het bestuur. Een goed opgeleide ambtenaar wint juist, want nu tellen kwaliteiten. De hertog wint controle. Zo heeft dezelfde maatregel winnaars én verliezers.</p>",
    "<p>Soms is iets <b>allebei</b>. De Staten-Generaal brengt alle gewesten bij elkaar: centralisatie. Maar de hertog moet er wel om geld <i>vragen</i> (een bede), en de gewesten kunnen nee zeggen. Daar houden ze dus macht. Bij een inzichtvraag laat je beide kanten zien en kies je dan.</p>",
    "<p>Gebruik in een antwoord altijd iets wat <b>in</b> de bron staat of te zien is, met 'In de bron staat: \"...\"' of 'In de bron zie je ...'. Het onderschrift vertelt wie, wat en wanneer, maar is geen bewijs uit de bron zelf.</p>"
   ],
   "regel": "Perspectief = wie wint, wie verliest? En een maatregel kan centralisatie zijn én de gewesten toch macht laten.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg uit waarom de schrijver van deze bron tegen de centralisatie van Filips de Goede is. Gebruik een citaat uit de bron. (2p)",
     "bron": {
      "titel": "Bron K: Een Hollandse edelman klaagt",
      "tekst": "\"Mijn vader zat nog aan tafel bij de graaf en sprak mee over het bestuur van Holland. Nu wordt alles in Brussel beslist, in het Frans, door heren die ik niet ken. Voor mij is daar geen stoel meer.\"",
      "onder": "Eigen bewerking: zo zou een Hollandse edelman het rond 1460 kunnen zeggen"
     },
     "tip": "Begin met wat hij kwijtraakt (en dat dit door de centralisatie komt). Bewijs het met een citaat tussen aanhalingstekens.",
     "model": [
      {
       "label": "Standpunt + begrip",
       "tekst": "De edelman is tegen de centralisatie, omdat hij door het nieuwe centrale bestuur in Brussel niet meer mag meebesturen."
      },
      {
       "label": "Citaat uit de bron",
       "tekst": "In de bron staat: \"Nu wordt alles in Brussel beslist, in het Frans\" en \"Voor mij is daar geen stoel meer.\" Daardoor verliest hij de invloed die zijn familie vroeger had."
      }
     ],
     "checklist": [
      {
       "t": "Ik zeg dat hij tegen is en waarom (hij verliest invloed in het bestuur).",
       "woorden": [
        "tegen",
        "invloed",
        "bestuur",
        "meebestur"
       ]
      },
      {
       "t": "Ik gebruik het begrip centralisatie of 'centraal bestuur'.",
       "woorden": [
        "centra"
       ]
      },
      {
       "t": "Ik citeer letterlijk uit de bron, met aanhalingstekens.",
       "woorden": [
        "\"",
        "brussel",
        "stoel"
       ]
      },
      {
       "t": "Ik leg het citaat uit met 'daardoor' of 'dus'.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "Standpunt, oorzaak (centralisatie), citaat, uitleg: zo haal je beide punten.",
     "meer": "Veelgemaakte fout: alleen een citaat neerzetten zonder uitleg, of alleen uitleg zonder citaat. De vraag vraagt allebei."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Was de Staten-Generaal van 1464 vooral een stap naar centralisatie, of gaf hij de gewesten juist macht? Leg beide kanten uit en geef je conclusie. (3p)",
     "tip": "Drie stappen: kant 1 (centralisatie), kant 2 (macht voor de gewesten, denk aan de bede), en dan je conclusie met 'dus'.",
     "model": [
      {
       "label": "Kant 1: centralisatie",
       "tekst": "De Staten-Generaal was een stap naar centralisatie: alle Statenvergaderingen kwamen samen in één vergadering, waar de landsheer het beleid voor alle gewesten tegelijk besprak."
      },
      {
       "label": "Kant 2: macht voor de gewesten",
       "tekst": "Maar de landsheer deed er een bede: hij moest de gewesten om geld vragen. Daardoor konden de gewesten nee zeggen en hielden ze invloed."
      },
      {
       "label": "Conclusie",
       "tekst": "Dus de Staten-Generaal was bedoeld voor centralisatie, maar gaf de gewesten ook een plek om samen hun stem te laten horen."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg uit waarom het centralisatie is (alle gewesten samen).",
       "woorden": [
        "centralis",
        "samen",
        "alle gewesten"
       ]
      },
      {
       "t": "Ik noem de bede als bron van macht voor de gewesten.",
       "woorden": [
        "bede",
        "geld"
       ]
      },
      {
       "t": "Ik geef een conclusie met 'dus'.",
       "woorden": [
        "dus",
        "conclusie"
       ]
      }
     ],
     "w": "Een inzichtvraag wil beide kanten zien. De bede is de sleutel: wie om geld moet vragen, kan een nee krijgen.",
     "meer": "Veelgemaakte fout: alleen één kant geven. Bij 'of ... of'-vragen laat je beide kanten zien voordat je kiest."
    },
    {
     "t": "mc",
     "q": "Wat veranderde er voor Holland, en wat bleef hetzelfde?",
     "bron": {
      "titel": "Bron L: Wie bestuurt Holland?",
      "tekst": "<b>Rond 1420:</b> de graaf woont zelf in Den Haag en heeft daar zijn eigen hof. De Staten van Holland vergaderen over belasting.<br><b>Rond 1450:</b> de hertog woont meestal in Brussel. In Den Haag bestuurt een stadhouder namens hem. De Staten van Holland vergaderen nog steeds over belasting.",
      "onder": "Eigen bewerking op basis van de leertekst"
     },
     "o": [
      "verandering: een stadhouder regeert namens de hertog; continuïteit: de Staten blijven vergaderen",
      "verandering: de Staten van Holland verdwijnen; continuïteit: de graaf blijft zelf in Den Haag wonen",
      "verandering: Holland krijgt een eigen hof; continuïteit: de stadhouder blijft namens de graaf regeren",
      "verandering: de hertog woont nu in Den Haag; continuïteit: er is nog steeds geen stadhouder"
     ],
     "a": "verandering: een stadhouder regeert namens de hertog; continuïteit: de Staten blijven vergaderen",
     "w": "De heer en zijn plaatsvervanger zijn nieuw, maar de Statenvergadering van Holland bestaat nog steeds.",
     "meer": "Bij continuïteit en verandering zet je de twee momenten naast elkaar en kijk je per onderdeel: anders of hetzelfde?",
     "fout": {
      "verandering: de Staten van Holland verdwijnen; continuïteit: de graaf blijft zelf in Den Haag wonen": "In de bron vergaderen de Staten in 1450 nog steeds, en de graaf woont er dan juist niet meer.",
      "verandering: Holland krijgt een eigen hof; continuïteit: de stadhouder blijft namens de graaf regeren": "Andersom: het eigen hof verdwijnt, en de stadhouder is nieuw in 1450.",
      "verandering: de hertog woont nu in Den Haag; continuïteit: er is nog steeds geen stadhouder": "De hertog woont in Brussel, en er is in 1450 juist wél een stadhouder."
     }
    },
    {
     "t": "mc",
     "q": "Welk element UIT de bron laat zien dat het om een vergadering van alle gewesten samen gaat?",
     "bron": {
      "titel": "Bron M: Een vergadering met de hertog",
      "tekst": "Een hertog zit hoog op een troon onder een baldakijn. Voor hem staan in rijen mannen in lange mantels. Boven in de zaal hangt een lange rij wapenschilden, allemaal verschillend: een leeuw, een adelaar, strepen, lelies.",
      "onder": "Onderschrift: De eerste Staten-Generaal in Brugge, 1464. (Eigen beschrijving, naar een afbeelding van de vergadering)"
     },
     "o": [
      "de rij wapenschilden boven in de zaal",
      "de woorden 'eerste Staten-Generaal' in het onderschrift",
      "de troon met het baldakijn waarop de hertog hoog zit",
      "het jaartal 1464, het jaar van de eerste Staten-Generaal"
     ],
     "a": "de rij wapenschilden boven in de zaal",
     "w": "Elk wapenschild staat voor een gewest. Veel verschillende wapens samen betekent: veel gewesten in één vergadering.",
     "meer": "Woorden in het onderschrift (en het jaartal) mag je niet gebruiken als 'element uit de bron'. Zoek iets in het beeld.",
     "fout": {
      "de woorden 'eerste Staten-Generaal' in het onderschrift": "Dat staat in het onderschrift, niet in de bron zelf. Dat telt niet als bewijs.",
      "de troon met het baldakijn waarop de hertog hoog zit": "De troon laat zien dat de hertog de baas is, niet dat er veel gewesten zijn.",
      "het jaartal 1464, het jaar van de eerste Staten-Generaal": "Het jaartal komt uit het onderschrift en uit je voorkennis, niet uit het beeld."
     }
    },
    {
     "t": "mc",
     "q": "Waarom koos Filips de Goede voor het Frans als bestuurstaal?",
     "o": [
      "het hof was Frans, en één taal maakte alles gelijk",
      "de meeste mensen in Holland, Zeeland en Brabant spraken al Frans als moedertaal",
      "de gewesten hadden in hun Statenvergaderingen zelf om het Frans gevraagd",
      "de paus had bepaald dat alle bestuur in Europa voortaan in het Frans moest"
     ],
     "a": "het hof was Frans, en één taal maakte alles gelijk",
     "w": "De hertogen kwamen uit een Franse familie, en één bestuurstaal past bij centralisatie: overal hetzelfde.",
     "meer": "Voor de Nederlandstalige gewesten was dit juist een nadeel. Bij het Groot Privilege (4.2.3) eisen ze het Nederlands terug.",
     "fout": {
      "de meeste mensen in Holland, Zeeland en Brabant spraken al Frans als moedertaal": "Nee, daar sprak men Nederlands (Diets). Daarom waren de gewesten er juist tegen.",
      "de gewesten hadden in hun Statenvergaderingen zelf om het Frans gevraagd": "Andersom: de gewesten wilden zelf hun taal kiezen. Het Frans werd ze opgelegd.",
      "de paus had bepaald dat alle bestuur in Europa voortaan in het Frans moest": "De paus ging niet over de bestuurstaal. En de kerk gebruikte Latijn, geen Frans."
     }
    },
    {
     "t": "mc",
     "q": "Een klasgenoot schrijft: 'Filips de Goede was voor particularisme, want hij bracht alle gewesten samen in de Staten-Generaal.' Wat gaat er mis?",
     "o": [
      "ze draait de begrippen om: dit is centralisatie",
      "ze heeft de verkeerde Filips: het was Filips de Stoute die dit deed",
      "het klopt wel, want in de Staten-Generaal zaten de gewesten zelf",
      "het jaartal ontbreekt: de Staten-Generaal kwam pas in 1477 bijeen"
     ],
     "a": "ze draait de begrippen om: dit is centralisatie",
     "w": "Filips de Goede wilde juist het particularisme verminderen. De gewesten samenbrengen onder één landsheer is centralisatie.",
     "meer": "Dit is de klassieke valkuil van 4.2 tot en met 4.4. Vraag jezelf af: wie wil dit, de vorst of het gewest?",
     "fout": {
      "ze heeft de verkeerde Filips: het was Filips de Stoute die dit deed": "De Filips klopt wel: Filips de Goede riep de Staten-Generaal bijeen. Het probleem zit in het begrip.",
      "het klopt wel, want in de Staten-Generaal zaten de gewesten zelf": "De gewesten zaten er wel, maar de vergadering was bedoeld om ze <b>samen</b> te besturen: dat is centralisatie.",
      "het jaartal ontbreekt: de Staten-Generaal kwam pas in 1477 bijeen": "De eerste Staten-Generaal was in 1464. In 1477 komt het Groot Privilege."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wie wint en wie verliest door de centralisatie van Filips de Goede?",
     "chips": [
      {
       "t": "de hertog, die minder hoeft te reizen",
       "waarom": "Met stadhouders en één bestuur heeft hij meer controle met minder moeite.",
       "bak": "win"
      },
      {
       "t": "een edelman uit Holland die vroeger aan het hof meesprak",
       "waarom": "Het gewestelijk hof verdwijnt, en zijn afkomst geeft hem geen plek meer.",
       "bak": "verlies"
      },
      {
       "t": "een goed opgeleide ambtenaar in de rekenkamer",
       "waarom": "In de nieuwe raden tellen kwaliteiten, niet afkomst. Dat is gunstig voor hem.",
       "bak": "win"
      },
      {
       "t": "het eigen hof van het gewest",
       "waarom": "Het gewestelijk hof verdwijnt helemaal.",
       "bak": "verlies"
      },
      {
       "t": "de stad Brussel",
       "waarom": "Brussel wordt de hoofdstad: daar zit nu de macht.",
       "bak": "win"
      },
      {
       "t": "een schepen die alleen Nederlands leest",
       "waarom": "Het bestuur gaat in het Frans; hij kan de brieven van het hof niet meer lezen.",
       "bak": "verlies"
      }
     ],
     "bakjes": [
      {
       "id": "win",
       "label": "wint",
       "som": "meer macht of kansen"
      },
      {
       "id": "verlies",
       "label": "verliest",
       "som": "minder invloed"
      }
     ],
     "w": "De vorst, Brussel en goed opgeleide ambtenaren winnen. De adel, het gewestelijk hof en de Nederlandstaligen verliezen.",
     "meer": "Dit is perspectief: één maatregel ziet er voor iedereen anders uit. In een antwoord noem je wie het is, en wat hij wint of verliest."
    }
   ]
  }
 ]
},
{
 "id": "groot-privilege",
 "emoji": "📜",
 "titel": "4.2.3 · Verder onder Habsburg",
 "paragraaf": "§4.2",
 "kort": "1477: de hertog sneuvelt, zijn dochter Maria staat er alleen voor, en de gewesten grijpen hun kans. Het Groot Privilege geeft ze hun vrijheid terug. Dan trouwt Maria met Maximiliaan, en de Nederlanden worden Habsburgs.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>De gewesten waren helemaal niet blij met de centralisatie van de Bourgondiërs. Ze waren bang hun <b>vrijheid en privileges</b> te verliezen. In <b>1477</b> krijgen ze hun kans. De zoon van Filips de Goede, <b>Karel de Stoute</b>, sneuvelt onverwacht bij een gevecht bij het Franse Nancy. Zijn enige dochter <b>Maria van Bourgondië</b> wordt hertogin, en ze staat er meteen zwak voor.</p>",
    "<p>Overal breken <b>opstanden</b> uit. De gewesten zeggen: we geven je onze trouw en steun alleen als je onze eisen inwilligt. Maria moet wel akkoord gaan. Ze tekent het <b>Groot Privilege</b> (1477). Een paar afspraken daaruit: de hertogin mag zonder toestemming van de Staten niet trouwen, geen oorlog verklaren en geen belasting heffen; alleen inwoners van een gewest mogen daar een ambt krijgen; de Staten mogen vergaderen waar en wanneer ze willen; en in de Nederlandstalige gewesten moeten de brieven van de regering in het Nederlands.</p>",
    "<p>Het Groot Privilege is voordelig voor <b>allebei</b>: de gewesten houden hun vrijheid en invloed, en Maria krijgt de belofte van trouw van de gewesten. Particularisme wint dus even van centralisatie.</p>",
    "<p>Nog in 1477 trouwt Maria met <b>Maximiliaan van Oostenrijk</b>, uit de machtige Habsburgse familie (hij werd later zelf keizer). Met zijn steun neemt Maria een deel van de zelfstandigheid van de gewesten weer terug. Weer huwelijkspolitiek dus! In <b>1482</b> sterft Maria. Haar gebieden komen in handen van Maximiliaan, en vanaf dan heten de gewesten de <b>Habsburgse Nederlanden</b>: <i>benaming voor de Nederlandse gewesten in de Habsburgse tijd</i>.</p>"
   ],
   "regel": "1477: Karel de Stoute sneuvelt, Maria tekent het Groot Privilege en trouwt met Maximiliaan; 1482: de Habsburgse Nederlanden.",
   "voorbeelden": [
    {
     "en": "Het Groot Privilege is een ruil: Maria geeft rechten, de gewesten geven trouw.",
     "let": "Bij 'voordelig voor allebei' noem je dus twee dingen: wat de gewesten krijgen én wat Maria krijgt."
    }
   ],
   "vragen": [
    {
     "t": "gap",
     "q": "Maria van Bourgondië tekende het Groot Privilege in het jaar ___.",
     "a": "1477|in 1477",
     "w": "1477 is een druk jaar: Karel de Stoute sneuvelt, Maria tekent het Groot Privilege en trouwt met Maximiliaan.",
     "meer": "Onthoud de drie in de goede volgorde: sneuvelen, Groot Privilege, huwelijk."
    },
    {
     "t": "mc",
     "q": "Wie tekende het Groot Privilege?",
     "o": [
      "Maria van Bourgondië",
      "Maximiliaan van Oostenrijk",
      "Filips de Goede",
      "Karel de Stoute"
     ],
     "a": "Maria van Bourgondië",
     "w": "Maria moest het Groot Privilege tekenen om de steun van de opstandige gewesten te krijgen.",
     "meer": "Ze deed het niet uit vrije wil: ze stond zwak na de onverwachte dood van haar vader.",
     "fout": {
      "Maximiliaan van Oostenrijk": "Maximiliaan trouwde later in 1477 met Maria. Met zijn steun nam zij juist een deel van de zelfstandigheid weer terug.",
      "Filips de Goede": "Filips de Goede was al in 1467 dood. Hij was juist de centralisator, het tegenovergestelde van het Groot Privilege.",
      "Karel de Stoute": "Karel de Stoute is de vader van Maria. Hij sneuvelde in 1477, en daardoor kwam zij aan de macht."
     }
    },
    {
     "t": "mc",
     "q": "Waarom braken er rond 1477 opstanden uit in de Nederlandse gewesten?",
     "o": [
      "ze vreesden hun privileges kwijt te raken door de centralisatie",
      "de gewesten wilden zelf ook een eigen centraal bestuur in Brussel krijgen",
      "de gewesten waren boos omdat Maria protestant was geworden",
      "de gewesten wilden dat Maximiliaan van Oostenrijk hun nieuwe heer werd"
     ],
     "a": "ze vreesden hun privileges kwijt te raken door de centralisatie",
     "w": "De Bourgondische centralisatie bedreigde de privileges. Toen de hertog sneuvelde, grepen de gewesten hun kans.",
     "meer": "Zo schrijf je het op: gebruik het begrip centralisatie, en zeg wat de gewesten wilden houden (hun privileges en zelfstandigheid).",
     "fout": {
      "de gewesten wilden zelf ook een eigen centraal bestuur in Brussel krijgen": "Omgedraaid: een centraal bestuur is centralisatie, en daar waren ze juist tegen.",
      "de gewesten waren boos omdat Maria protestant was geworden": "Het protestantisme bestaat in 1477 nog niet (Luther komt pas in 1517). Deze opstanden gaan over bestuur, niet over geloof.",
      "de gewesten wilden dat Maximiliaan van Oostenrijk hun nieuwe heer werd": "Dat staat nergens. Ze wilden hun eigen privileges terug, niet een andere heer."
     }
    },
    {
     "t": "mc",
     "q": "Met wie trouwde Maria van Bourgondië in 1477?",
     "o": [
      "Maximiliaan",
      "Filips de Schone",
      "Filips II",
      "Karel V"
     ],
     "a": "Maximiliaan",
     "w": "Maria trouwde met Maximiliaan uit de Habsburgse familie. Zo kwamen de Nederlanden later bij Habsburg.",
     "meer": "Maximiliaan werd pas later keizer. Hun zoon heet Filips de Schone, en die heeft weer een zoon: Karel V (4.3).",
     "fout": {
      "Filips de Schone": "Filips de Schone is de <b>zoon</b> van Maria en Maximiliaan, niet haar man.",
      "Filips II": "Filips II leeft bijna honderd jaar later: hij is de koning uit de Opstand (4.4).",
      "Karel V": "Karel V is de kleinzoon van Maria. Hij wordt pas in 1500 geboren."
     }
    },
    {
     "t": "gap",
     "q": "Na de dood van Maria van Bourgondië in ___ heten de gewesten de Habsburgse Nederlanden.",
     "a": "1482|in 1482",
     "w": "In 1482 sterft Maria, en haar gebieden komen in handen van Maximiliaan: de Habsburgse Nederlanden.",
     "meer": "1384 tot 1482 is ongeveer de honderd jaar van de Bourgondische tijd."
    },
    {
     "t": "mc",
     "q": "Wat betekent 'Habsburgse Nederlanden'?",
     "o": [
      "benaming voor de Nederlandse gewesten in de Habsburgse tijd",
      "de Nederlandse gewesten die in 1477 het Groot Privilege kregen",
      "een nieuwe staat waar overal dezelfde wetten en regels gelden",
      "de gewesten die Maria van Bourgondië zelf had veroverd"
     ],
     "a": "benaming voor de Nederlandse gewesten in de Habsburgse tijd",
     "w": "Na 1482 hoorden de gewesten bij de Habsburgse familie. Daarom heten ze dan de Habsburgse Nederlanden.",
     "meer": "Let op: het is nog steeds geen nationale staat. De gewesten hebben een nieuwe heer, maar houden hun eigen privileges.",
     "fout": {
      "de Nederlandse gewesten die in 1477 het Groot Privilege kregen": "Het Groot Privilege ging over de gewesten, maar de naam 'Habsburgs' komt van de nieuwe familie na 1482.",
      "een nieuwe staat waar overal dezelfde wetten en regels gelden": "Dat is een <b>nationale staat</b>, en die bestaat dan nog niet.",
      "de gewesten die Maria van Bourgondië zelf had veroverd": "Maria veroverde niets: ze had de gewesten geërfd van haar vader."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was het Groot Privilege voordelig voor de gewesten én voor Maria?",
     "o": [
      "de gewesten hielden hun vrijheid, Maria kreeg hun trouw",
      "de gewesten kregen een nieuwe hoofdstad, en Maria kreeg meer belastinggeld",
      "Maria mocht nu zonder toestemming trouwen, en de gewesten kregen Franse brieven",
      "de gewesten werden één staat, en Maria werd koningin van die nieuwe staat"
     ],
     "a": "de gewesten hielden hun vrijheid, Maria kreeg hun trouw",
     "w": "Het was een ruil: rechten voor de gewesten, trouw en steun voor Maria.",
     "meer": "Bij 'voordelig voor allebei' noem je altijd twee voordelen, voor elke partij één.",
     "fout": {
      "de gewesten kregen een nieuwe hoofdstad, en Maria kreeg meer belastinggeld": "Belasting heffen mocht Maria juist niet meer zonder toestemming van de Staten.",
      "Maria mocht nu zonder toestemming trouwen, en de gewesten kregen Franse brieven": "Allebei omgedraaid: ze mocht <b>niet</b> trouwen zonder toestemming, en de brieven moesten in het <b>Nederlands</b>.",
      "de gewesten werden één staat, en Maria werd koningin van die nieuwe staat": "Er ontstond geen staat. De gewesten bleven zelfstandig, dat was juist het punt."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Filips de Goede sterft (1467)",
      "Karel de Stoute sneuvelt bij Nancy (begin 1477)",
      "Maria van Bourgondië tekent het Groot Privilege (1477)",
      "Maria trouwt met Maximiliaan van Oostenrijk (1477)",
      "Maria sterft; de Habsburgse Nederlanden ontstaan (1482)"
     ],
     "w": "Eerst valt de hertog weg, dan moet Maria toegeven, dan zoekt ze steun bij Maximiliaan, en na haar dood worden de Nederlanden Habsburgs.",
     "meer": "Drie dingen in 1477: dat is logisch, want het een volgt uit het ander. Zonder de dood van haar vader geen zwakke Maria, en zonder zwakke Maria geen Groot Privilege."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Bij een vraag als <b>'Geef met behulp van de bron aan hoeveel ...'</b> geef je twee dingen: het antwoord (het getal), en <b>waar je het in de bron ziet</b>. Bij een schilderij met wapenschilden tel je de schilden: elk schild staat voor één gewest. Tel rustig en schrijf erbij: 'Dat zie je aan de ... wapenschilden in de bron.'</p>",
    "<p>Bij <b>bepalingen</b> (afspraken) uit een document vraag je je af: wie mag er nu minder, en wie meer? Elke bepaling van het Groot Privilege maakt de hertogin een beetje zwakker en de gewesten een beetje sterker. Daarmee wordt de <b>centralisatie beperkt</b>: de hertogin kan niet meer alles zelf beslissen.</p>"
   ],
   "regel": "Hoeveel? Getal plus waar je het ziet. Bepaling? Wie mag nu minder, wie meer?",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg met behulp van de bron uit over hoeveel gewesten Maria van Bourgondië volgens de maker de leiding had, en hoe je dat in de bron ziet. (2p)",
     "bron": {
      "titel": "Bron N: Maria te paard",
      "tekst": "Maria rijdt op een wit paard. Boven haar hangen in een boog tien wapenschilden. Links en rechts van haar hangen langs de rand nog eens zeven wapenschilden, elk met een ander dier of patroon.",
      "onder": "Eigen beschrijving van een schilderij van Maria van Bourgondië, gemaakt rond 1490"
     },
     "tip": "Tel alle schilden (boven én langs de rand). Schrijf het getal op, en daarna in een eigen zin waar je het aan ziet.",
     "model": [
      {
       "label": "Antwoord",
       "tekst": "Maria van Bourgondië heeft volgens de maker de leiding over zeventien gewesten."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "Dat zie je aan de wapenschilden: tien boven haar en zeven langs de rand, samen zeventien. Elk wapenschild staat voor een gewest."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem het juiste aantal (zeventien).",
       "woorden": [
        "17",
        "zeventien"
       ]
      },
      {
       "t": "Ik zeg dat ik het aan de wapenschilden zie.",
       "woorden": [
        "wapen",
        "schild"
       ]
      },
      {
       "t": "Ik leg uit dat elk schild voor één gewest staat.",
       "woorden": [
        "gewest"
       ]
      }
     ],
     "w": "Getal plus bewijs: zeventien, en dat zie je aan de zeventien wapenschilden.",
     "meer": "Veelgemaakte fout: alleen een getal opschrijven (en dan ook nog verkeerd geteld). Tel boven én opzij, en vertel waar je het ziet: dat is het tweede punt."
    },
    {
     "t": "mc",
     "q": "Welke bepaling uit het Groot Privilege beschermt vooral de taal van de Nederlandstalige gewesten?",
     "o": [
      "brieven in het Nederlands, niet in het Frans",
      "alleen inwoners van het eigen gewest mogen daar een ambt bekleden",
      "de Staten mogen zelf bepalen waar en wanneer ze vergaderen",
      "de hertogin mag zonder toestemming van de Staten geen oorlog verklaren"
     ],
     "a": "brieven in het Nederlands, niet in het Frans",
     "w": "Dit draait de maatregel van Filips de Goede (Frans als bestuurstaal) terug.",
     "meer": "Zie je de lijn? Filips de Goede: centralisatie met Frans. Groot Privilege: terug naar het Nederlands, dus particularisme.",
     "fout": {
      "alleen inwoners van het eigen gewest mogen daar een ambt bekleden": "Dit beschermt de banen in het bestuur, niet de taal.",
      "de Staten mogen zelf bepalen waar en wanneer ze vergaderen": "Dit gaat over de vrijheid om te vergaderen, niet over taal.",
      "de hertogin mag zonder toestemming van de Staten geen oorlog verklaren": "Dit beperkt de macht van de hertogin over oorlog, niet de bestuurstaal."
     }
    },
    {
     "t": "sleep",
     "opgave": "Hoort deze maatregel bij centralisatie (de vorst) of bij particularisme (de gewesten)?",
     "chips": [
      {
       "t": "Het Groot Privilege wordt getekend (1477)",
       "bak": "part",
       "waarom": "De gewesten krijgen hun vrijheid en invloed terug."
      },
      {
       "t": "Filips de Goede maakt Frans de bestuurstaal",
       "bak": "centr",
       "waarom": "Eén taal voor alle gewesten: de vorst maakt alles gelijk."
      },
      {
       "t": "Regeringsbrieven moeten weer in het Nederlands",
       "bak": "part",
       "waarom": "Het gewest bepaalt zelf zijn taal: zelfstandigheid."
      },
      {
       "t": "Maximiliaan helpt Maria om zelfstandigheid terug te nemen",
       "bak": "centr",
       "waarom": "De macht van de vorst groeit weer ten koste van de gewesten."
      },
      {
       "t": "De Staten vergaderen wanneer ze zelf willen",
       "bak": "part",
       "waarom": "De gewesten organiseren zelf, zonder dat de hertogin het controleert."
      },
      {
       "t": "Filips de Goede stelt stadhouders aan",
       "bak": "centr",
       "waarom": "Plaatsvervangers die namens de hertog in de gewesten regeren."
      },
      {
       "t": "Alleen eigen inwoners krijgen een ambt in het gewest",
       "bak": "part",
       "waarom": "Het gewest houdt het bestuur in eigen hand."
      },
      {
       "t": "De eerste Staten-Generaal (1464)",
       "bak": "centr",
       "waarom": "Alle gewesten samen in één vergadering met de landsheer."
      }
     ],
     "bakjes": [
      {
       "id": "centr",
       "label": "centralisatie (de vorst)",
       "som": "alles gelijk, één bestuur"
      },
      {
       "id": "part",
       "label": "particularisme (de gewesten)",
       "som": "eigen rechten houden"
      }
     ],
     "w": "Filips de Goede en Maximiliaan: centralisatie. Het Groot Privilege en zijn bepalingen: particularisme.",
     "meer": "De geschiedenis slingert heen en weer: centralisatie (Filips de Goede), dan particularisme (1477), dan weer meer centralisatie (Maximiliaan)."
    },
    {
     "t": "mc",
     "q": "Waarom beperkt deze bepaling de centralisatie?",
     "bron": {
      "titel": "Bron O: Nog een bepaling",
      "tekst": "Het Parlement van Mechelen, de hoogste rechtbank van de hertog voor al zijn Nederlandse gewesten samen, wordt opgeheven.",
      "onder": "Naar: een van de bepalingen van het Groot Privilege van 1477 (eigen bewerking)"
     },
     "o": [
      "elk gewest spreekt weer zelf recht",
      "de hertogin krijgt hierdoor één eigen rechtbank voor al haar gewesten samen",
      "de gewesten moeten voortaan al hun rechtszaken in Brussel laten behandelen",
      "Maximiliaan wordt hierdoor de hoogste rechter van de Nederlanden"
     ],
     "a": "elk gewest spreekt weer zelf recht",
     "w": "Eén hoogste rechtbank voor alle gewesten is centralisatie. Die schaffen de gewesten af: elk gewest regelt de rechtspraak weer zelf.",
     "meer": "Dit is een onbekende bepaling, maar je gebruikt dezelfde vraag: wie mag nu minder (de hertogin) en wie meer (de gewesten)?",
     "fout": {
      "de hertogin krijgt hierdoor één eigen rechtbank voor al haar gewesten samen": "Omgedraaid: die centrale rechtbank wordt juist <b>opgeheven</b>.",
      "de gewesten moeten voortaan al hun rechtszaken in Brussel laten behandelen": "Alles naar Brussel zou juist centralisatie zijn. Het Groot Privilege doet het tegenovergestelde.",
      "Maximiliaan wordt hierdoor de hoogste rechter van de Nederlanden": "Daar staat niets over in de bron, en het zou ook geen beperking van de centralisatie zijn."
     }
    },
    {
     "t": "mc",
     "q": "Hoe is er bij het ontstaan van de Habsburgse Nederlanden weer sprake van huwelijkspolitiek?",
     "o": [
      "Maria trouwt met Maximiliaan, dus haar land gaat naar Habsburg",
      "Maria verovert met het leger van Maximiliaan de gewesten die tegen haar in opstand kwamen",
      "Maximiliaan koopt de gewesten van Maria nadat zij het Groot Privilege heeft getekend",
      "Filips de Goede regelt een huwelijk tussen Maria en de koning van Frankrijk"
     ],
     "a": "Maria trouwt met Maximiliaan, dus haar land gaat naar Habsburg",
     "w": "Door het huwelijk gaat het bezit van de Bourgondiërs over naar de Habsburgse familie: precies wat huwelijkspolitiek is.",
     "meer": "Twee stappen in je antwoord: (1) het huwelijk (1477), (2) het gevolg (1482, de gebieden gaan naar Habsburg).",
     "fout": {
      "Maria verovert met het leger van Maximiliaan de gewesten die tegen haar in opstand kwamen": "Verovering is een andere manier van uitbreiden. De vraag gaat over het huwelijk.",
      "Maximiliaan koopt de gewesten van Maria nadat zij het Groot Privilege heeft getekend": "Er werd niets gekocht. De gebieden kwamen via het huwelijk bij Habsburg.",
      "Filips de Goede regelt een huwelijk tussen Maria en de koning van Frankrijk": "Maria trouwde met Maximiliaan van Oostenrijk, niet met de Franse koning. En Filips de Goede was in 1477 al dood."
     }
    },
    {
     "t": "mc",
     "q": "Wat wil de maker van deze uitspraak?",
     "bron": {
      "titel": "Bron P: Een schepen uit Gent",
      "tekst": "\"Wij erkennen Maria als onze vrouwe, zodra zij onze oude rechten erkent.\"",
      "onder": "Eigen bewerking: zo zou een Gentse schepen het in 1477 kunnen zeggen"
     },
     "o": [
      "pas steun als Maria de stadsrechten teruggeeft",
      "hij wil dat Maria juist meer macht krijgt over alle gewesten samen",
      "hij wil Maria helemaal niet als hertogin en kiest een andere heer",
      "hij wil dat Maria snel met Maximiliaan van Oostenrijk trouwt"
     ],
     "a": "pas steun als Maria de stadsrechten teruggeeft",
     "w": "\"Zodra zij onze oude rechten erkent\": eerst de rechten, dan de steun. Dat is precies de ruil van het Groot Privilege.",
     "meer": "Let op het woordje 'zodra': dat is een voorwaarde. Zulke kleine woorden in een bron vertellen je wat de maker wil.",
     "fout": {
      "hij wil dat Maria juist meer macht krijgt over alle gewesten samen": "Meer macht voor Maria is centralisatie. Hij wil juist dat de stad haar eigen rechten houdt.",
      "hij wil Maria helemaal niet als hertogin en kiest een andere heer": "Hij wil haar wel erkennen, alleen onder een voorwaarde.",
      "hij wil dat Maria snel met Maximiliaan van Oostenrijk trouwt": "Over een huwelijk zegt hij niets. Het gaat hem om de oude rechten."
     }
    },
    {
     "t": "gap",
     "q": "De vader van Maria van Bourgondië, die in 1477 sneuvelde bij Nancy, heette ___.",
     "a": "Karel de Stoute|Karel",
     "w": "Karel de Stoute, de zoon van Filips de Goede, sneuvelde onverwacht in 1477.",
     "meer": "Pas op: Karel de Stoute is niet Filips de Stoute! Filips de Stoute is de eerste hertog (1384), Karel de Stoute de laatste vóór Maria."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Op goudniveau leg je uit <b>waarom</b> iets de centralisatie beperkt, met de bron als bewijs. Per bepaling doe je twee stappen: (1) noem de bepaling, (2) leg uit wie daardoor minder mag. 'De hertogin mag zonder toestemming geen belasting heffen. Zij kan dus niet meer alles zelf beslissen, want ze moet het eerst aan de Staten vragen.'</p>",
    "<p>Bij <b>'Bewijs met een element uit de bron (niet uit het onderschrift)'</b> wijs je iets aan wat je in het beeld ziet. Dan leg je uit wat dat betekent, en waarom dat pas na een bepaalde gebeurtenis kon. Het jaartal of de naam onder de afbeelding telt niet.</p>",
    "<p>Het grote patroon: een vorst wil centraliseren, de gewesten verdedigen hun privileges, en zodra de vorst zwak staat, slaan ze toe. Dat patroon zie je in 1477, en je zult het in 4.3 en 4.4 opnieuw tegenkomen.</p>"
   ],
   "regel": "Bepaling + wie mag nu minder = waarom de centralisatie beperkt wordt.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Noem twee bepalingen uit de bron en leg bij elke bepaling uit waarom de centralisatie daarmee beperkt wordt. (4p)",
     "bron": {
      "titel": "Bron Q: Afspraken van 1477",
      "tekst": "1. De hertogin mag niet trouwen, geen oorlog beginnen en geen belasting heffen zonder dat de Staten ermee instemmen.<br>2. Een ambt in een gewest gaat alleen naar iemand die er zelf woont.<br>3. De Staten komen bij elkaar waar en wanneer zij dat zelf willen.<br>4. In de Nederlandstalige gewesten schrijft de regering haar brieven in het Nederlands.",
      "onder": "Naar: enkele bepalingen uit het Groot Privilege van 1477 (eigen bewerking)"
     },
     "tip": "Vier stappen, elk een eigen regel: bepaling 1, uitleg 1, bepaling 2, uitleg 2. Bij elke uitleg: wie mag nu minder, en wat kan zij niet meer zelf?",
     "model": [
      {
       "label": "Bepaling 1",
       "tekst": "De hertogin mag zonder toestemming van de Staten geen belasting heffen of oorlog beginnen."
      },
      {
       "label": "Uitleg 1",
       "tekst": "Daardoor kan zij niet meer alles zelf beslissen: ze moet eerst met de gewesten overleggen. Dat beperkt het centrale bestuur."
      },
      {
       "label": "Bepaling 2",
       "tekst": "De Staten komen bij elkaar waar en wanneer zij dat zelf willen."
      },
      {
       "label": "Uitleg 2",
       "tekst": "De gewesten vergaderen dus zelfstandig. De hertogin kan hun vergaderingen niet meer zelf organiseren en controleren, dus verliest ze greep op de gewesten."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem twee verschillende bepalingen uit de bron.",
       "woorden": [
        "toestemming",
        "ambt",
        "vergader",
        "nederlands"
       ]
      },
      {
       "t": "Ik leg bij elke bepaling uit wat de hertogin nu niet meer zelf kan.",
       "woorden": [
        "niet meer",
        "zelf",
        "kan"
       ]
      },
      {
       "t": "Ik gebruik het begrip centralisatie (of centraal bestuur).",
       "woorden": [
        "centra"
       ]
      },
      {
       "t": "Ik verbind bepaling en uitleg met 'daardoor' of 'dus'.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "Per bepaling: wat staat er, en wie mag daardoor minder? Twee keer twee punten.",
     "meer": "Veelgemaakte fout: de vraag laten liggen omdat hij groot lijkt. Hij is juist makkelijk als je hem opknipt in vier korte zinnen: twee keer bepaling plus uitleg."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Deze prent is gemaakt na het tekenen van het Groot Privilege. Bewijs dat met een element uit de bron (en dus niet uit het onderschrift). (3p)",
     "bron": {
      "titel": "Bron R: De gewesten en hun hertogin",
      "tekst": "Maria zit op een troon. Zij reikt een groot perkament met een zegel eraan aan de mannen voor haar. Voor haar knielen afgevaardigden met de wapens van Vlaanderen, Brabant, Holland en Zeeland op hun mantels. Zij bieden haar de sleutels van hun steden aan.",
      "onder": "Onderschrift: Maria van Bourgondië en de gewesten, 1478. (Eigen beschrijving van een bedachte prent)"
     },
     "tip": "Gebruik niet '1478' uit het onderschrift. Kijk naar wat de mensen in de prent DOEN: wat geeft Maria, en wat geven de gewesten terug? Leg dan uit waarom dat pas na het Groot Privilege kon.",
     "model": [
      {
       "label": "Element uit de bron",
       "tekst": "In de bron zie je dat de afgevaardigden van de gewesten voor Maria knielen en haar de sleutels van hun steden aanbieden, terwijl zij hun een perkament met een zegel geeft."
      },
      {
       "label": "Wat dat betekent",
       "tekst": "Dat laat zien dat de gewesten Maria als hun hertogin erkennen en haar trouw beloven."
      },
      {
       "label": "Daarom na het Groot Privilege",
       "tekst": "Pas nadat Maria het Groot Privilege had getekend, beloofden de gewesten haar trouw. Dus is de prent na het Groot Privilege gemaakt."
      }
     ],
     "checklist": [
      {
       "t": "Ik beschrijf iets wat ik in de prent zie (knielen, sleutels, perkament).",
       "woorden": [
        "kniel",
        "sleutel",
        "perkament",
        "zegel"
       ]
      },
      {
       "t": "Ik leg uit dat de gewesten Maria trouw beloven.",
       "woorden": [
        "trouw",
        "steun",
        "erken"
       ]
      },
      {
       "t": "Ik leg uit dat die trouw pas kwam na het Groot Privilege.",
       "woorden": [
        "groot privilege",
        "pas",
        "na"
       ]
      },
      {
       "t": "Ik gebruik het jaartal uit het onderschrift niet als bewijs.",
       "woorden": []
      }
     ],
     "w": "Element uit het beeld, wat het betekent, en waarom dat pas na 1477 kon: drie stappen, drie punten.",
     "meer": "Veelgemaakte fout: 'De wapenschilden van de gewesten zijn afgebeeld' en dan stoppen. Je moet ook uitleggen wat dat betekent (trouw) en waarom dat pas na het Groot Privilege kon."
    },
    {
     "t": "mc",
     "q": "Waarom ging Maria van Bourgondië akkoord met het Groot Privilege?",
     "o": [
      "ze stond zwak en had de gewesten nodig",
      "ze was het altijd al eens geweest met het particularisme van de gewesten",
      "Maximiliaan van Oostenrijk had haar opgedragen om het te tekenen",
      "ze wilde de gewesten belonen omdat die haar vader in de strijd hadden geholpen"
     ],
     "a": "ze stond zwak en had de gewesten nodig",
     "w": "Haar vader sneuvelde plotseling, er waren opstanden en ze was jong. Zonder de steun van de gewesten kon ze niet regeren.",
     "meer": "De Franse koning viel ook nog gebieden van Bourgondië aan. Maria had dus geld en soldaten nodig, en die kwamen van de gewesten.",
     "fout": {
      "ze was het altijd al eens geweest met het particularisme van de gewesten": "Nee, ze zag zich gedwongen. Later nam ze met hulp van Maximiliaan juist een deel van de zelfstandigheid terug.",
      "Maximiliaan van Oostenrijk had haar opgedragen om het te tekenen": "Het Groot Privilege kwam vóór het huwelijk. En Maximiliaan hielp haar juist om de macht terug te nemen.",
      "ze wilde de gewesten belonen omdat die haar vader in de strijd hadden geholpen": "Het was geen beloning: de gewesten waren in opstand en dwongen haar."
     }
    },
    {
     "t": "mc",
     "q": "Welke beschrijving past het best bij de periode 1384-1482?",
     "o": [
      "centralisatie groeit, in 1477 wint het particularisme, daarna weer centralisatie",
      "eerst groeit het particularisme, in 1477 wint de centralisatie, daarna komt er weer particularisme",
      "de hele periode wint de centralisatie, en in 1482 ontstaat een nationale staat",
      "de hele periode wint het particularisme, de hertogen krijgen nooit iets voor elkaar"
     ],
     "a": "centralisatie groeit, in 1477 wint het particularisme, daarna weer centralisatie",
     "w": "Filips de Goede centraliseert, het Groot Privilege (1477) is een overwinning voor de gewesten, en met Maximiliaan wint de vorst weer terrein.",
     "meer": "Dit heen-en-weer is de rode draad van 4.2 tot en met 4.4. Denk aan een touwtrekwedstrijd tussen de vorst en de gewesten.",
     "fout": {
      "eerst groeit het particularisme, in 1477 wint de centralisatie, daarna komt er weer particularisme": "Precies omgedraaid! 1477 (het Groot Privilege) is juist een overwinning voor de <b>gewesten</b>.",
      "de hele periode wint de centralisatie, en in 1482 ontstaat een nationale staat": "In 1477 verliest de vorst juist, en in 1482 is er nog lang geen nationale staat.",
      "de hele periode wint het particularisme, de hertogen krijgen nooit iets voor elkaar": "Filips de Goede kreeg wél veel voor elkaar: stadhouders, de Staten-Generaal, Brussel."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe kwam het Groot Privilege tot stand?",
     "stappen": [
      "De Bourgondische hertogen voeren centralisatie door",
      "De gewesten worden bang hun privileges te verliezen",
      "Karel de Stoute sneuvelt onverwacht; Maria staat zwak",
      "In de gewesten breken opstanden uit",
      "Maria tekent het Groot Privilege en krijgt de trouw van de gewesten"
     ],
     "w": "Centralisatie, angst, een zwakke vorst, opstand en dan een compromis: een verklaring in vijf schakels.",
     "meer": "Zie je dat de oorzaak (centralisatie) al lang speelde, maar dat de dood van Karel de aanleiding was? Zo'n directe aanleiding laat de bom barsten."
    },
    {
     "t": "mc",
     "q": "Welk begrip past het best bij deze bron?",
     "bron": {
      "titel": "Bron S: Een penning",
      "tekst": "Op een ronde penning staat aan de ene kant het hoofd van Maximiliaan van Oostenrijk, aan de andere kant het hoofd van Maria van Bourgondië.",
      "onder": "Naar: een huwelijkspenning van Maria en Maximiliaan, rond 1477"
     },
     "o": [
      "huwelijkspolitiek",
      "het Groot Privilege",
      "particularisme",
      "centralisatie"
     ],
     "a": "huwelijkspolitiek",
     "w": "Een penning met het bruidspaar viert het huwelijk dat Bourgondië en Habsburg aan elkaar koppelde: huwelijkspolitiek.",
     "meer": "Bij 'welk begrip past bij de bron' leg je in je antwoord eerst het begrip uit en wijs je dan de bron aan: 'Op de penning staan Maria en Maximiliaan samen.'",
     "fout": {
      "het Groot Privilege": "Het Groot Privilege is een document met afspraken. Op deze penning staat een bruidspaar, geen afspraak.",
      "particularisme": "Er staan geen gewesten of privileges op. Het gaat om twee vorsten die trouwen.",
      "centralisatie": "Het huwelijk hielp Maria later wel om te centraliseren, maar de penning zelf toont het huwelijk."
     }
    },
    {
     "t": "mc",
     "q": "Welk patroon uit 1477 zul je later in de geschiedenis van de Nederlanden terugzien?",
     "o": [
      "een vorst centraliseert, de gewesten verdedigen hun privileges",
      "de gewesten willen samen één staat, en de vorst houdt dat met geweld tegen",
      "een vorst trouwt, en daardoor verdwijnen alle privileges van de gewesten",
      "de gewesten geven hun privileges vrijwillig op als de vorst sterk is"
     ],
     "a": "een vorst centraliseert, de gewesten verdedigen hun privileges",
     "w": "Vorst tegen gewesten, centralisatie tegen particularisme: dat gevecht komt in 4.3 en 4.4 terug en loopt uit op de Opstand.",
     "meer": "Als je dit patroon herkent, snap je een groot deel van de toets: elke keer dat een vorst de gewesten gelijk wil maken, groeit het verzet.",
     "fout": {
      "de gewesten willen samen één staat, en de vorst houdt dat met geweld tegen": "Omgedraaid: de <b>vorst</b> wil één geheel, de gewesten willen juist zelfstandig blijven.",
      "een vorst trouwt, en daardoor verdwijnen alle privileges van de gewesten": "Een huwelijk levert land op, maar de privileges blijven. Die moet een vorst er apart af zien te krijgen.",
      "de gewesten geven hun privileges vrijwillig op als de vorst sterk is": "Vrijwillig geven ze niets op. Ze geven hooguit toe, en slaan terug zodra de vorst zwak staat."
     }
    }
   ]
  }
 ]
}
);


/* ===== §4.3 Keizerlijke Karel ===== */
window.LEERSTOF.push(
{
 "id": "karel-v",
 "emoji": "👑",
 "titel": "4.3.1 · Karel V",
 "paragraaf": "§4.3",
 "kort": "Karel V wordt heer van de Nederlanden, koning van Spanje en keizer. Zijn rijk is zo groot dat hij een landvoogdes en drie adviesraden nodig heeft. De gewesten vinden die centralisatie maar niks.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>Karel wordt in 1500 geboren in Gent. In <b>1506</b> sterft zijn vader <b>Filips de Schone</b>, de heer van de Habsburgse Nederlanden. Karel is dan pas zes, maar hij erft de Nederlanden. In <b>1515</b> is hij oud genoeg en gaat hij zelf regeren.</p>",
    "<p>Daarna groeit zijn macht steeds verder. In <b>1516</b> wordt hij <b>koning van Spanje</b>, in <b>1519</b> <b>keizer</b> van het <b>Heilig Roomse Rijk</b> (het Duitse rijk dat in de Middeleeuwen ontstaat en officieel bestaat tot 1806). Bovendien krijgt hij de Spaanse gebieden in <b>de Nieuwe Wereld</b>: de gebieden die vanaf 1492 in Noord-, Midden- en Zuid-Amerika worden ontdekt. Onthoud de vier: <b>Nederlanden, Spanje, het Duitse keizerrijk en de Nieuwe Wereld</b>.</p>",
    "<p>Zo'n rijk bestuur je niet in je eentje. Daarom maakt Karel zijn tante <b>Margaretha van Oostenrijk</b> <b>landvoogdes</b>: <i>plaatsvervangster van de vorst in alle Nederlandse gewesten</i>. Pas op voor de valkuil: een <b>stadhouder</b> is de <i>plaatsvervanger van de heer binnen een gewest</i>. Landvoogd = alle gewesten, stadhouder = één gewest.</p>",
    "<p>Karel wil van al die eigenwijze gewesten één geheel maken. Dat heet <b>centralisatie</b>: <i>het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels</i>. Daarvoor richt hij in <b>1531</b> de <b>Collaterale Raden</b> op: <i>centrale adviesraden, ingesteld door Karel V, ter bevordering van de centralisatie van de Nederlanden</i>. Het zijn er drie:<br>• de <b>Geheime Raad</b>: binnenlandse wetgeving<br>• de <b>Raad van State</b>: buitenlandse zaken en oorlog<br>• de <b>Raad van Financiën</b>: het geld van de gewesten</p>",
    "<p>De gewesten zijn daar niet blij mee. Ze hebben eigen rechten (privileges) en willen zelf beslissen. En Karel voert veel dure oorlogen, dus hij vraagt steeds meer belasting. Dat is het begin van de ruzie die later uitloopt op de Opstand.</p>"
   ],
   "regel": "Karel V: 1506 heer der Nederlanden, 1516 koning van Spanje, 1519 keizer, 1531 drie Collaterale Raden om te centraliseren.",
   "voorbeelden": [
    {
     "en": "Geheim = Gewone wetten binnenshuis, State = Strijd en buitenland, Financiën = Florijnen.",
     "let": "Een ezelsbruggetje om de drie raden aan hun onderwerp te koppelen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Waar werd Karel V in <b>1519</b> de baas over?",
     "o": [
      "over het Heilig Roomse Rijk, als keizer",
      "over Spanje, als koning",
      "over de Nederlanden, als opvolger van zijn vader",
      "over de Nieuwe Wereld, na de ontdekking"
     ],
     "a": "over het Heilig Roomse Rijk, als keizer",
     "w": "In 1519 wordt Karel gekozen tot keizer van het Heilig Roomse Rijk, het Duitse rijk.",
     "meer": "Het rijtje: 1506 Nederlanden, 1516 Spanje, 1519 keizer. De Spaanse gebieden in de Nieuwe Wereld krijgt hij erbij omdat hij koning van Spanje is.",
     "fout": {
      "over Spanje, als koning": "Koning van Spanje werd hij al eerder, in 1516.",
      "over de Nederlanden, als opvolger van zijn vader": "De Nederlanden erfde hij al in 1506, toen zijn vader Filips de Schone stierf.",
      "over de Nieuwe Wereld, na de ontdekking": "De Nieuwe Wereld werd vanaf 1492 ontdekt. Karel kreeg die Spaanse gebieden omdat hij koning van Spanje was, niet in 1519."
     }
    },
    {
     "t": "gap",
     "q": "In ___ werd Karel V koning van Spanje.",
     "a": "1516|in 1516",
     "w": "1516: koning van Spanje. Drie jaar later, in 1519, wordt hij ook keizer.",
     "meer": "Handig om te onthouden: eerst koning (1516), dan keizer (1519). Een keizer staat in rang boven een koning, dus dat komt als laatste."
    },
    {
     "t": "mc",
     "q": "Margaretha van Oostenrijk was <b>landvoogdes</b>. Wat houdt dat in?",
     "o": [
      "ze was plaatsvervangster van de vorst in alle Nederlandse gewesten",
      "ze was plaatsvervangster van de heer binnen één gewest, zoals Holland",
      "ze was de vrouw van de vorst en regeerde daarom gewoon met hem mee",
      "ze was voorzitter van de drie adviesraden en had daar het laatste woord"
     ],
     "a": "ze was plaatsvervangster van de vorst in alle Nederlandse gewesten",
     "w": "Een landvoogd(es) vervangt de vorst in álle Nederlandse gewesten.",
     "meer": "Dit is de valkuil van deze paragraaf: <b>landvoogd = alle gewesten</b>, <b>stadhouder = één gewest</b>. Allebei zijn ze plaatsvervanger.",
     "fout": {
      "ze was plaatsvervangster van de heer binnen één gewest, zoals Holland": "Dat is een <b>stadhouder</b>. Die bestuurt één gewest namens de heer. Margaretha deed alle gewesten tegelijk.",
      "ze was de vrouw van de vorst en regeerde daarom gewoon met hem mee": "Margaretha was Karels <b>tante</b>, niet zijn vrouw. Ze bestuurde omdat hij haar daarvoor aanstelde.",
      "ze was voorzitter van de drie adviesraden en had daar het laatste woord": "De Collaterale Raden gáven advies aan de vorst en de landvoogdes. Landvoogdes zijn betekent: plaatsvervanger van de vorst."
     }
    },
    {
     "t": "sleep",
     "opgave": "Karel krijgt allerlei vragen op zijn bureau. Welke Collaterale Raad geeft hierover advies?",
     "chips": [
      {
       "t": "Een nieuwe wet tegen diefstal op de markten",
       "bak": "geheim",
       "waarom": "Een wet die binnen de gewesten geldt: binnenlandse wetgeving, dus de Geheime Raad."
      },
      {
       "t": "Regels voor de rechtbanken in Brabant en Holland",
       "bak": "geheim",
       "waarom": "Ook dit is binnenlandse wetgeving. Die hoort bij de Geheime Raad."
      },
      {
       "t": "De Franse koning dreigt met oorlog",
       "bak": "state",
       "waarom": "Oorlog en buitenland: dat is het terrein van de Raad van State."
      },
      {
       "t": "Een vredesverdrag met een buurland",
       "bak": "state",
       "waarom": "Afspraken met het buitenland horen bij de Raad van State."
      },
      {
       "t": "Hoeveel belasting moet Vlaanderen dit jaar betalen?",
       "bak": "fin",
       "waarom": "Belasting is geld: de Raad van Financiën."
      },
      {
       "t": "De schatkist is bijna leeg",
       "bak": "fin",
       "waarom": "Over het geld van de gewesten adviseert de Raad van Financiën."
      }
     ],
     "bakjes": [
      {
       "id": "geheim",
       "label": "Geheime Raad",
       "som": "binnenlandse wetgeving"
      },
      {
       "id": "state",
       "label": "Raad van State",
       "som": "buitenland en oorlog"
      },
      {
       "id": "fin",
       "label": "Raad van Financiën",
       "som": "geld en belasting"
      }
     ],
     "w": "Wetten binnen de gewesten: Geheime Raad. Buitenland en oorlog: Raad van State. Geld: Raad van Financiën.",
     "meer": "Twijfel je? Vraag jezelf af: gaat het over regels hier, over het buitenland, of over geld?"
    },
    {
     "t": "gap",
     "q": "De drie adviesraden die Karel V in 1531 instelde, heten samen de ___ Raden.",
     "a": "Collaterale|collaterale",
     "w": "De Collaterale Raden: centrale adviesraden, ingesteld door Karel V, ter bevordering van de centralisatie van de Nederlanden.",
     "meer": "‘Collateraal’ betekent ‘naast’: de raden stonden naast de vorst en de landvoogdes om hen te adviseren."
    },
    {
     "t": "mc",
     "q": "Wat betekent <b>centralisatie</b>?",
     "o": [
      "het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels",
      "het streven van de gewesten om zelf te beslissen en hun eigen rechten te houden",
      "het verplaatsen van de hoofdstad naar het midden van het land",
      "het samenvoegen van alle kerken onder één paus"
     ],
     "a": "het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels",
     "w": "Centralisatie: één bestuur in het midden, overal dezelfde regels.",
     "meer": "Het tegenovergestelde ken je uit 4.2: <b>particularisme</b>, het streven van de gewesten om hun eigen zaken te regelen.",
     "fout": {
      "het streven van de gewesten om zelf te beslissen en hun eigen rechten te houden": "Dat is juist het omgekeerde: <b>particularisme</b>. Die twee draaien veel leerlingen om.",
      "het verplaatsen van de hoofdstad naar het midden van het land": "Het woord ‘centraal’ gaat hier niet over een plek op de kaart, maar over <b>bestuur</b>: één bestuur voor alles.",
      "het samenvoegen van alle kerken onder één paus": "Centralisatie gaat over het bestuur van een land, niet over de kerk."
     }
    },
    {
     "t": "mc",
     "q": "Wie was Margaretha van Oostenrijk voor Karel V?",
     "o": [
      "zijn tante",
      "zijn halfzus",
      "zijn moeder",
      "zijn dochter"
     ],
     "a": "zijn tante",
     "w": "Karel maakte zijn tante Margaretha van Oostenrijk landvoogdes.",
     "meer": "Niet verwarren met <b>Margaretha van Parma</b> uit 4.4: zij is de halfzus van Filips II en wordt later landvoogdes voor hem.",
     "fout": {
      "zijn halfzus": "Dat is de andere Margaretha: Margaretha van Parma, de halfzus van Filips II (4.4).",
      "zijn moeder": "Karels moeder was Johanna van Castilië. Margaretha was de zus van zijn vader, dus zijn tante.",
      "zijn dochter": "Margaretha (geboren 1480) was twintig jaar ouder dan Karel. Ze was zijn tante."
     }
    },
    {
     "t": "gap",
     "q": "In 1506 overleed ___, de vader van Karel V en heer van de Habsburgse Nederlanden.",
     "a": "Filips de Schone|Filips I|Filips I van Castilië",
     "w": "Filips de Schone bestuurde de Nederlanden tot zijn dood in 1506. Daarna erfde zijn zoon Karel ze.",
     "meer": "Let op de Filipsen: Filips de Schone is de vader van Karel V, Filips II is de zoon van Karel V."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Nu ga je de stof <b>toepassen</b>. Een bron lezen doe je in drie stappen: <b>wie</b> maakte het, <b>wanneer</b>, en <b>wat zie je er zelf in</b>. Bewijs haal je altijd uit wat je in de bron ziet of leest, niet uit het onderschrift.</p>",
    "<p>Een veelgevraagde vergelijking: wat hebben een <b>stadhouder</b> en een <b>landvoogd</b> gemeen? Allebei zijn ze <b>plaatsvervanger</b> van de vorst. Het verschil zit in de grootte: één gewest tegenover alle gewesten.</p>",
    "<p>Een groot rijk geeft ook grote problemen. <b>Politiek</b>: Karel heeft overal vijanden (de Franse koning, de Turken, lutherse vorsten in Duitsland) en hij kan niet overal tegelijk zijn. <b>Financieel</b>: al die oorlogen kosten bergen geld, dus hij vraagt steeds meer belasting aan de rijke Nederlanden.</p>",
    "<p>Hoe reageren de gewesten? Een stad als <b>Gent</b> weigert in 1539 mee te betalen aan een nieuwe belasting voor de oorlog tegen Frankrijk. Karel komt in 1540 zelf en straft zijn eigen geboortestad hard. Zo zie je centralisatie en privileges met elkaar botsen.</p>"
   ],
   "regel": "Stadhouder en landvoogd zijn allebei plaatsvervanger; een groot rijk betekent politieke problemen (vijanden) en financiële problemen (dure oorlogen).",
   "vragen": [
    {
     "t": "sequence",
     "q": "Het begin van Karels levenslijn. Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Filips de Schone sterft en Karel erft de Nederlanden",
      "Karel is oud genoeg en gaat de Nederlanden zelf besturen",
      "Karel wordt koning van Spanje",
      "Luther hangt zijn 95 stellingen op",
      "Karel wordt keizer van het Heilig Roomse Rijk"
     ],
     "w": "1506 erven, 1515 zelf regeren, 1516 Spanje, 1517 Luther, 1519 keizer.",
     "meer": "Jaartallen: 1506, 1515, 1516, 1517 (dat is 3.5!), 1519. Luther valt precies tussen koning en keizer in. Dat is geen toeval voor de toets: daarna krijgt Karel als keizer met hem te maken."
    },
    {
     "t": "mc",
     "q": "Wat is de <b>overeenkomst</b> tussen een stadhouder en een landvoogd?",
     "o": [
      "allebei zijn ze plaatsvervanger van de vorst",
      "allebei besturen ze alle Nederlandse gewesten",
      "allebei worden ze door de inwoners van de gewesten gekozen",
      "allebei zijn ze altijd familie van de vorst"
     ],
     "a": "allebei zijn ze plaatsvervanger van de vorst",
     "w": "Ze besturen allebei namens iemand anders: de vorst. Dat is de overeenkomst.",
     "meer": "Het verschil: een stadhouder doet één gewest, een landvoogd alle gewesten. Bij een overeenkomst-vraag noem je wat ze gemeen hebben, niet het verschil.",
     "fout": {
      "allebei besturen ze alle Nederlandse gewesten": "Alleen de landvoogd bestuurt alle gewesten. Een stadhouder doet er één.",
      "allebei worden ze door de inwoners van de gewesten gekozen": "Nee, de vorst stelt ze aan. Daarom heten ze plaatsvervanger.",
      "allebei zijn ze altijd familie van de vorst": "Margaretha was wel familie, maar stadhouders vaak niet (Willem van Oranje werd later stadhouder). Familie zijn hoort niet bij de definitie."
     }
    },
    {
     "t": "mc",
     "q": "Waaraan zie je <b>in de bron zelf</b> dat Karel V een machtig vorst is?",
     "bron": {
      "titel": "Bron A: Karel V te paard",
      "tekst": "Op een groot schilderij zit Karel V op een donker paard dat stapt. Hij draagt een glanzend harnas en houdt een lange lans vast, klaar voor de strijd. Hij kijkt rustig en vastberaden voor zich uit. Achter hem is een donkere lucht met een gouden gloed.",
      "onder": "Naar: Titiaan, ‘Karel V bij Mühlberg’, 1548. Het schilderij is gemaakt na Karels overwinning op lutherse vorsten in 1547."
     },
     "o": [
      "harnas, lans en paard: hij is een veldheer",
      "in het onderschrift staat dat hij een overwinning had behaald",
      "het schilderij is gemaakt door een beroemde schilder",
      "het schilderij is ruim vierhonderd jaar oud"
     ],
     "a": "harnas, lans en paard: hij is een veldheer",
     "w": "Harnas, lans en paard laten een sterke legeraanvoerder zien. Dat zie je in het beeld zelf.",
     "meer": "Bewijs haal je uit wat je ziet, niet uit het onderschrift of uit wie de maker is.",
     "fout": {
      "in het onderschrift staat dat hij een overwinning had behaald": "Dat klopt wel, maar het staat in het <b>onderschrift</b>. De vraag is wat je in de bron zelf ziet.",
      "het schilderij is gemaakt door een beroemde schilder": "Wie het maakte zegt iets over de bron, niet over Karel. Een beroemde schilder kan ook een arme boer schilderen.",
      "het schilderij is ruim vierhonderd jaar oud": "De ouderdom bewijst niets over Karels macht. Kijk naar wat er op het doek staat."
     }
    },
    {
     "t": "sleep",
     "opgave": "Karels enorme rijk gaf hem problemen. Is dit een politiek of een financieel probleem?",
     "chips": [
      {
       "t": "De Franse koning voert steeds oorlog tegen hem",
       "bak": "pol",
       "waarom": "Een vijand die je macht bedreigt: politiek."
      },
      {
       "t": "Het leger moet betaald worden",
       "bak": "fin",
       "waarom": "Soldaten kosten geld: financieel."
      },
      {
       "t": "Hij kan niet in alle landen tegelijk zijn",
       "bak": "pol",
       "waarom": "Het gaat om besturen en gezag: politiek."
      },
      {
       "t": "Hij moet geld lenen bij rijke bankiers",
       "bak": "fin",
       "waarom": "Lenen en schulden gaan over geld: financieel."
      },
      {
       "t": "Lutherse vorsten in Duitsland gehoorzamen hem niet",
       "bak": "pol",
       "waarom": "Ze trekken zich niets van zijn gezag aan: een politiek probleem (met een geloofskant)."
      },
      {
       "t": "Hij vraagt steeds meer belasting",
       "bak": "fin",
       "waarom": "Belasting is geld: financieel."
      }
     ],
     "bakjes": [
      {
       "id": "pol",
       "label": "politiek probleem",
       "som": "macht, bestuur, vijanden"
      },
      {
       "id": "fin",
       "label": "financieel probleem",
       "som": "geld, belasting, schulden"
      }
     ],
     "w": "Gaat het over gezag en vijanden, dan is het politiek. Gaat het over geld, dan is het financieel (economisch).",
     "meer": "Die twee hangen samen: door de politieke problemen (oorlogen) krijgt hij financiële problemen (hij heeft geld nodig)."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg met de bron uit waarom de Nederlandse gewesten ontevreden waren over het bestuur van Karel V. (2p)",
     "bron": {
      "titel": "Bron B: Gent, 1539-1540",
      "tekst": "In 1539 weigert de stad Gent mee te betalen aan een nieuwe belasting die Karel nodig heeft voor zijn oorlog tegen Frankrijk. De Gentenaren zeggen dat hun oude rechten dat niet toestaan. In 1540 komt Karel met soldaten naar de stad. Hij neemt Gent zijn privileges af. Voorname burgers moeten op blote voeten en met een strop om hun nek op hun knieën om vergeving vragen.",
      "onder": "Eigen bewerking naar de gebeurtenissen in Gent, 1539-1540."
     },
     "tip": "Noem de soort oorzaak, zeg wat er gebeurde en bewijs het met iets wat IN de bron staat, tussen aanhalingstekens.",
     "model": [
      {
       "label": "Wat er gebeurde",
       "tekst": "Karel vroeg steeds meer belasting voor zijn oorlogen (een economische oorzaak) en trok de macht naar zich toe (centralisatie)."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat Gent weigert te betalen aan “een nieuwe belasting” voor de oorlog, en dat Karel de stad daarna “zijn privileges” afneemt. De gewesten raakten dus geld én hun eigen rechten kwijt."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de belasting (geld).",
       "woorden": [
        "belasting",
        "geld",
        "betal"
       ]
      },
      {
       "t": "Ik noem de privileges of de centralisatie.",
       "woorden": [
        "privilege",
        "recht",
        "centralis"
       ]
      },
      {
       "t": "Ik citeer iets uit de bron tussen aanhalingstekens.",
       "woorden": []
      },
      {
       "t": "Ik leg het verband met ‘daardoor’ of ‘omdat’.",
       "woorden": [
        "daardoor",
        "omdat",
        "waardoor",
        "doordat"
       ]
      }
     ],
     "w": "Twee punten: wat Karel deed (belasting, privileges afpakken) en het bewijs uit de bron.",
     "meer": "Veelgemaakte fout: alleen schrijven ‘ze waren boos’. Zeg waaróm, en laat met een stukje uit de bron zien dat het klopt."
    },
    {
     "t": "mc",
     "q": "De Gentenaren wilden niet meebetalen aan Karels oorlog. Welke <b>soort oorzaak</b> van ontevredenheid is dat?",
     "o": [
      "economisch",
      "politiek",
      "religieus",
      "sociaal"
     ],
     "a": "economisch",
     "w": "Het gaat om belasting, dus om geld: een economische oorzaak.",
     "meer": "Dat Karel daarna hun privileges afpakt, is wél politiek. In één gebeurtenis kunnen dus twee soorten zitten: kijk goed welk deel de vraag bedoelt.",
     "fout": {
      "politiek": "Het afpakken van de privileges is politiek, maar de vraag gaat over het <b>niet willen betalen</b>. Dat is geld.",
      "religieus": "Er wordt hier niets over geloof gezegd. Religieus gaat over godsdienst.",
      "sociaal": "Sociaal gaat over hoe groepen mensen samenleven, bijvoorbeeld arm en rijk. Hier gaat het om belasting."
     }
    },
    {
     "t": "mc",
     "q": "De <b>Raad van State</b> bestaat in Nederland nog steeds. Wat is hier <b>continuïteit</b> en wat <b>verandering</b>?",
     "o": [
      "naam gebleven, taak veranderd: nu vooral advies over wetten",
      "alles is gebleven: hij adviseert nog steeds de keizer over oorlog",
      "alles is veranderd: er is geen enkel verband met de raad van Karel V",
      "de taak is gebleven, alleen heet hij nu Raad van Financiën"
     ],
     "a": "naam gebleven, taak veranderd: nu vooral advies over wetten",
     "w": "Continuïteit: de naam en het idee van een adviesraad. Verandering: toen buitenland en oorlog, nu vooral advies over wetten.",
     "meer": "Bij toen-en-nu-vragen noem je allebei: wat bleef en wat veranderde.",
     "fout": {
      "alles is gebleven: hij adviseert nog steeds de keizer over oorlog": "Er is geen keizer meer. Nederland heeft een koning, en die heeft weinig macht.",
      "alles is veranderd: er is geen enkel verband met de raad van Karel V": "De naam en het idee van een adviesraad voor het bestuur zijn juist gebleven. Dat is continuïteit.",
      "de taak is gebleven, alleen heet hij nu Raad van Financiën": "De Raad van Financiën was een aparte raad (voor geld). De Raad van State heet nog precies zo."
     }
    },
    {
     "t": "mc",
     "q": "Waarom stelde Karel V eigenlijk een landvoogdes aan?",
     "o": [
      "zijn rijk was te groot voor één man",
      "de gewesten eisten een vrouw als bestuurder",
      "hij was nog te jong om te regeren",
      "de paus had het hem opgedragen"
     ],
     "a": "zijn rijk was te groot voor één man",
     "w": "Spanje, het Duitse rijk, de Nieuwe Wereld en de Nederlanden: één man kan dat niet alleen. Dus een plaatsvervanger.",
     "meer": "Dit is een oorzaak-gevolgketen: groot rijk → niet overal tegelijk → plaatsvervanger (landvoogdes) nodig.",
     "fout": {
      "de gewesten eisten een vrouw als bestuurder": "Dat staat nergens. Het ging om de grootte van het rijk, niet om wie het was.",
      "hij was nog te jong om te regeren": "Als kind werd hij wel bijgestaan, maar ook als volwassen keizer bleef hij een landvoogdes nodig hebben. De reden is de grootte van zijn rijk.",
      "de paus had het hem opgedragen": "De paus ging niet over het bestuur van de Nederlanden. Karel besliste dat zelf."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Bij Goud schrijf je een <b>verklaring in stappen</b>. Een verklaring is een ketting: oorzaak → daardoor → daardoor → gevolg. Elke schakel zet je op een eigen regel, en je verbindt ze met <b>daardoor</b> of <b>waardoor</b>.</p>",
    "<p>Voor Karel V ziet die ketting er zo uit: hij heeft een enorm rijk → hij voert veel oorlogen → hij heeft veel geld nodig → hij vraagt meer belasting aan de rijke Nederlanden en wil met de Collaterale Raden alles centraal regelen → de gewesten raken hun privileges kwijt → ze worden ontevreden.</p>",
    "<p>Denk ook aan het <b>perspectief</b>: Karel vond centralisatie slim en modern, want zo kon hij zijn rijk besturen en betalen. Voor een stadsbestuurder in Holland of Vlaanderen voelde het als diefstal van oude rechten. Allebei hadden ze vanuit hun eigen kant gelijk.</p>",
    "<p>En waarom kwam het onder Karel nog niet tot een opstand? Hij was in Gent geboren en hier opgegroeid. Veel Nederlanders zagen hem als een van hen. Zijn zoon Filips II (4.4) woonde in Spanje en was strenger: toen sloeg de vlam pas echt in de pan.</p>"
   ],
   "regel": "Verklaring in stappen: groot rijk → oorlogen → geld nodig → belasting en centralisatie → privileges weg → ontevreden gewesten.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg in stappen uit waarom de Nederlandse gewesten zo ontevreden raakten over Karel V dat er ruzie ontstond. (3p)",
     "tip": "Begin met de soort oorzaak. Zet elke stap op een eigen regel en verbind ze met ‘daardoor’.",
     "model": [
      {
       "label": "Soort oorzaak",
       "tekst": "Een politieke oorzaak: Karel V wilde centralisatie, één bestuur met overal dezelfde wetten. Daarvoor stelde hij in 1531 de Collaterale Raden in."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor raakten de gewesten hun privileges, hun eigen rechten, kwijt."
      },
      {
       "label": "Ook economisch",
       "tekst": "Bovendien voerde Karel veel dure oorlogen, waardoor hij steeds meer belasting vroeg aan de gewesten. Daarom werden ze ontevreden."
      }
     ],
     "checklist": [
      {
       "t": "Ik gebruik het begrip centralisatie.",
       "woorden": [
        "centralis"
       ]
      },
      {
       "t": "Ik noem de privileges of eigen rechten.",
       "woorden": [
        "privilege",
        "recht"
       ]
      },
      {
       "t": "Ik noem de belasting voor de oorlogen.",
       "woorden": [
        "belasting",
        "oorlog"
       ]
      },
      {
       "t": "Ik verbind de stappen met ‘daardoor’ of ‘waardoor’.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      }
     ],
     "w": "Drie punten: centralisatie (wat Karel deed), privileges kwijt (gevolg), belasting (tweede oorzaak).",
     "meer": "Veelgemaakte fout: één lange zin met ‘en’. Een verklaring heeft schakels; elke schakel levert een punt op."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Lees de bron. Leg uit hoe Karel V over de Collaterale Raden dacht én hoe de schrijver van de bron erover dacht. (2p)",
     "bron": {
      "titel": "Bron C: een klacht uit Holland",
      "tekst": "“Vroeger beslisten wij in Holland zelf over onze wetten en ons geld. Nu moet alles langs de raden in Brussel. Daar zitten heren die onze gewoonten niet kennen en ons alleen vragen om te betalen.”",
      "onder": "Eigen bewerking, zoals een Hollands stadsbestuurder het rond 1535 zou kunnen zeggen."
     },
     "tip": "Twee perspectieven betekent: twee personen, elk met hun eigen reden. Geef de schrijver een bewijs uit de bron.",
     "model": [
      {
       "label": "Karel V",
       "tekst": "Karel vond de raden nuttig: zo kon hij zijn grote rijk centraal besturen, met overal dezelfde regels."
      },
      {
       "label": "De schrijver",
       "tekst": "De schrijver was tegen, want hij verloor de eigen rechten van Holland. In de bron staat: “Vroeger beslisten wij in Holland zelf over onze wetten en ons geld.”"
      }
     ],
     "checklist": [
      {
       "t": "Ik geef Karels kant (centraal besturen).",
       "woorden": [
        "centra",
        "bestu",
        "één"
       ]
      },
      {
       "t": "Ik geef de kant van de schrijver (eigen rechten kwijt).",
       "woorden": [
        "recht",
        "privilege",
        "zelf"
       ]
      },
      {
       "t": "Ik citeer de bron voor de schrijver.",
       "woorden": []
      }
     ],
     "w": "Een perspectiefvraag heeft twee kanten nodig, elk met een reden.",
     "meer": "Veelgemaakte fout: alleen de kant geven die je zelf het meest snapt. Allebei is één punt per kant."
    },
    {
     "t": "mc",
     "q": "Waarom vond Karel V zelf centralisatie <b>nodig</b>?",
     "o": [
      "zo kon hij zijn rijk beter besturen en belasten",
      "hij wilde de gewesten straffen voor het protestantse geloof",
      "de gewesten hadden er zelf om gevraagd",
      "zo kon hij de Nederlanden aan Spanje toevoegen als provincie"
     ],
     "a": "zo kon hij zijn rijk beter besturen en belasten",
     "w": "Eén bestuur met dezelfde regels is voor een vorst met een wereldrijk overzichtelijker, en het helpt om belasting te innen.",
     "meer": "Dit is Karels perspectief. Voor de gewesten voelde hetzelfde als het verlies van hun privileges.",
     "fout": {
      "hij wilde de gewesten straffen voor het protestantse geloof": "Geloof is een ander probleem (4.3.3). Centralisatie gaat over bestuur en geld.",
      "de gewesten hadden er zelf om gevraagd": "Juist niet: de gewesten wilden zelf beslissen. Dat heet particularisme.",
      "zo kon hij de Nederlanden aan Spanje toevoegen als provincie": "De Nederlanden werden nooit een Spaanse provincie. Ze hadden alleen dezelfde vorst."
     }
    },
    {
     "t": "mc",
     "q": "Karel V koos als lijfspreuk ‘Plus Ultra’: ‘Nog verder’. Wat zegt dat over hoe hij zichzelf zag?",
     "bron": {
      "titel": "Bron D: Karels wapen",
      "tekst": "Op Karels wapen staan twee zuilen, met een lint waarop ‘Plus Ultra’ staat. Volgens oude verhalen stonden bij de Straat van Gibraltar twee zuilen met de waarschuwing dat de wereld daar ophield. Karel haalde het woordje ‘niet’ weg.",
      "onder": "Naar: de lijfspreuk van Karel V, vanaf 1516."
     },
     "o": [
      "hij wilde zijn macht steeds verder uitbreiden, ook over zee",
      "hij vond dat zijn rijk al groot genoeg was",
      "hij wilde vooral verder reizen voor zijn plezier",
      "hij beloofde de gewesten verder te helpen met hun privileges"
     ],
     "a": "hij wilde zijn macht steeds verder uitbreiden, ook over zee",
     "w": "‘Nog verder’ dan het einde van de oude wereld: dat past bij een vorst met gebieden in de Nieuwe Wereld.",
     "meer": "Zo lees je een symbool: wat zegt het, en wat past daarbij uit de stof? Hier: de Nieuwe Wereld en zijn steeds grotere rijk.",
     "fout": {
      "hij vond dat zijn rijk al groot genoeg was": "Dan had hij ‘Non plus ultra’ (niet verder) laten staan. Hij haalde dat ‘niet’ juist weg.",
      "hij wilde vooral verder reizen voor zijn plezier": "Een lijfspreuk op een wapen gaat over macht en eer, niet over vakantie.",
      "hij beloofde de gewesten verder te helpen met hun privileges": "Karel pakte privileges eerder af (denk aan Gent). Dit gaat over zijn eigen macht."
     }
    },
    {
     "t": "mc",
     "q": "De landvoogdes twijfelt of ze troepen moet sturen naar de grens met Frankrijk. Welke raad vraagt ze om advies?",
     "o": [
      "de Raad van State",
      "de Raad van Financiën, want soldaten kosten geld",
      "de Geheime Raad, want het moet geheim blijven",
      "de stadhouder van het gewest aan de grens"
     ],
     "a": "de Raad van State",
     "w": "Troepen en een buitenlandse vijand: oorlog en buitenland, dus de Raad van State.",
     "meer": "Koppel een onderwerp aan de raad via de hoofdzaak. Hier is de hoofdzaak oorlog, niet het geld.",
     "fout": {
      "de Raad van Financiën, want soldaten kosten geld": "Slim gedacht, maar de vraag gaat over óf ze troepen stuurt. Dat is een oorlogsvraag: Raad van State.",
      "de Geheime Raad, want het moet geheim blijven": "De naam verraadt je hier. De Geheime Raad ging over <b>binnenlandse wetgeving</b>, niet over geheime oorlogsplannen.",
      "de stadhouder van het gewest aan de grens": "Een stadhouder is geen Collaterale Raad. Hij bestuurt één gewest, maar de vraag is welke raad adviseert."
     }
    },
    {
     "t": "mc",
     "q": "Karel V en zijn zoon Filips II voerden allebei centralisatie door. Toch kwam pas onder Filips de Opstand. Wat is de beste verklaring?",
     "o": [
      "Karel was hier opgegroeid, Filips zat in Spanje en was strenger",
      "Karel stopte halverwege met centraliseren en gaf de privileges terug",
      "onder Karel waren er nog geen protestanten in de Nederlanden",
      "Filips voerde als eerste belastingen in, Karel deed dat nooit"
     ],
     "a": "Karel was hier opgegroeid, Filips zat in Spanje en was strenger",
     "w": "Hetzelfde beleid voelt anders als het van ‘een van ons’ komt dan van een vreemde vorst op afstand.",
     "meer": "Dit is continuïteit (centralisatie bleef) en verandering (de persoon en de hardheid veranderden). Zie 4.4.",
     "fout": {
      "Karel stopte halverwege met centraliseren en gaf de privileges terug": "Nee, zijn plan was ‘maar voor een deel gelukt’, maar hij gaf niets terug. Denk aan Gent.",
      "onder Karel waren er nog geen protestanten in de Nederlanden": "Die waren er wel: lutheranen en calvinisten. Karel vervolgde ze al met het bloedplakkaat van 1550.",
      "Filips voerde als eerste belastingen in, Karel deed dat nooit": "Karel vroeg juist steeds meer belasting voor zijn oorlogen."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom werden de gewesten ontevreden?",
     "stappen": [
      "Karel V heeft een enorm rijk met veel vijanden",
      "Hij voert veel dure oorlogen",
      "Hij heeft daardoor steeds meer geld nodig",
      "Hij vraagt meer belasting en wil met de Collaterale Raden alles centraal regelen",
      "De gewesten raken hun privileges kwijt en worden ontevreden"
     ],
     "w": "Van oorzaak naar gevolg: groot rijk → oorlogen → geld → belasting en centralisatie → ontevreden gewesten.",
     "meer": "Zo'n ketting is precies hoe je een T2-verklaring opschrijft: elke schakel een eigen regel, verbonden met ‘daardoor’."
    }
   ]
  }
 ]
},
{
 "id": "calvinisme",
 "emoji": "📖",
 "titel": "4.3.2 · Reformatie in Nederland",
 "paragraaf": "§4.3",
 "kort": "De ideeën van Luther bereiken de Nederlanden, maar vooral Calvijn krijgt veel volgers. Zijn kerk is sober, draait om de Bijbel en wordt van onderop geleid. De katholieken worden er onrustig van.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>Weet je nog uit 3.5? Luther kreeg kritiek op de kerk en brak met de paus. Dat leidde tot de <b>Reformatie</b>: <i>de splitsing in de christelijke kerk in een rooms-katholiek en een protestants deel als gevolg van het optreden van Luther en andere kerkhervormers in de 16e eeuw</i>.</p>",
    "<p>Zijn ideeën bereiken ook de Nederlanden. Hier krijgt hij veel volgelingen: de <b>lutheranen</b> (<i>volgelingen van Maarten Luther</i>). Maar er komt nog een hervormer bij: de Fransman <b>Johannes Calvijn</b> (1509-1564). Hij werd geïnspireerd door Luther en schreef boeken over zijn eigen ideeën. Zijn aanhangers heten <b>calvinisten</b> (<i>volgelingen van Johannes Calvijn</i>).</p>",
    "<p>De overeenkomst: lutheranen en calvinisten zijn allebei <b>protestanten</b>, <i>aanhangers van de christelijke richting die zich afscheidt van de katholieke kerk</i>.</p>",
    "<p>De <b>drie kernideeën van Calvijn</b>:<br>1. De kerk wordt niet van bovenaf, maar <b>van onderop, door de gelovigen zelf</b> geleid.<br>2. De <b>Bijbel</b> is de kern van de kerk.<br>3. <b>Soberheid en gematigdheid</b>: eenvoudig leven, niet overdrijven.<br>Bij de <b>katholieken</b> is het anders: daar is de <b>paus</b> de hoogste leider, geldt het <b>pauselijk wetboek</b> en leiden geestelijken de dienst in een rijk versierde kerk.</p>",
    "<p>Het calvinisme krijgt in de Nederlanden veel aanhang. Daardoor worden de <b>katholieken</b> onrustig: ze zijn bang een <b>minderheid</b> te worden in hun eigen land.</p>"
   ],
   "regel": "Calvinisme: kerk van onderop, Bijbel centraal, soberheid. Lutheranen en calvinisten zijn allebei protestanten.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat wordt bedoeld met de <b>Reformatie</b>?",
     "o": [
      "de splitsing van de christelijke kerk in een rooms-katholiek en een protestants deel",
      "de verbetering van de katholieke kerk door de paus zelf, zodat iedereen katholiek bleef",
      "de ontdekking van de Nieuwe Wereld door Spaanse ontdekkingsreizigers",
      "het besluit van Karel V om de gewesten centraal te besturen"
     ],
     "a": "de splitsing van de christelijke kerk in een rooms-katholiek en een protestants deel",
     "w": "Reformatie = de kerk splitst door het optreden van Luther en andere hervormers.",
     "meer": "Het kenmerkend aspect bij deze paragraaf zegt het ook: de protestantse Reformatie met splitsing van de kerk als gevolg.",
     "fout": {
      "de verbetering van de katholieke kerk door de paus zelf, zodat iedereen katholiek bleef": "‘Reformatie’ betekent wel hervorming, maar het eindigde juist in een <b>splitsing</b>. Niet iedereen bleef katholiek.",
      "de ontdekking van de Nieuwe Wereld door Spaanse ontdekkingsreizigers": "Dat is de Nieuwe Wereld (vanaf 1492). De Reformatie gaat over geloof.",
      "het besluit van Karel V om de gewesten centraal te besturen": "Dat is centralisatie, een politiek begrip. De Reformatie is religieus."
     }
    },
    {
     "t": "mc",
     "q": "Wat is de <b>overeenkomst</b> tussen lutheranen en calvinisten?",
     "o": [
      "het zijn allebei protestanten",
      "ze volgen allebei Calvijn",
      "ze erkennen allebei de paus als hoogste leider",
      "ze komen allebei uit Frankrijk"
     ],
     "a": "het zijn allebei protestanten",
     "w": "Beide groepen hebben zich afgescheiden van de katholieke kerk: het zijn protestanten.",
     "meer": "Het verschil: lutheranen volgen Luther (een Duitser), calvinisten volgen Calvijn (een Fransman).",
     "fout": {
      "ze volgen allebei Calvijn": "Lutheranen volgen Luther. Alleen calvinisten volgen Calvijn.",
      "ze erkennen allebei de paus als hoogste leider": "Juist niet: allebei braken ze met de paus. Dat doen katholieken wel.",
      "ze komen allebei uit Frankrijk": "Calvijn was een Fransman, Luther een Duitser. En hun volgelingen woonden overal, ook hier."
     }
    },
    {
     "t": "sleep",
     "opgave": "Past dit idee bij Calvijn of niet?",
     "chips": [
      {
       "t": "De gelovigen besturen de kerk zelf, van onderop",
       "bak": "cal",
       "waarom": "Dit is een kernidee van Calvijn: de kerk wordt door de gelovigen geleid."
      },
      {
       "t": "De Bijbel is de kern van de kerk",
       "bak": "cal",
       "waarom": "Voor Calvijn staat de Bijbel centraal."
      },
      {
       "t": "Leef sober en gematigd",
       "bak": "cal",
       "waarom": "Soberheid en gematigdheid: nog een idee van Calvijn."
      },
      {
       "t": "De paus is de hoogste leider",
       "bak": "niet",
       "waarom": "Dat is katholiek. Calvijn erkende de paus niet."
      },
      {
       "t": "Het pauselijk wetboek geldt voor alle gelovigen",
       "bak": "niet",
       "waarom": "Regels van de paus horen bij de katholieke kerk, niet bij Calvijn."
      },
      {
       "t": "Een kerk vol gouden beelden eert God het best",
       "bak": "niet",
       "waarom": "Calvijn wilde juist soberheid. Rijke versiering past bij de katholieke kerk."
      }
     ],
     "bakjes": [
      {
       "id": "cal",
       "label": "past bij Calvijn",
       "som": "onderop, Bijbel, sober"
      },
      {
       "id": "niet",
       "label": "past niet bij Calvijn",
       "som": "paus, pauselijk wetboek, pracht"
      }
     ],
     "w": "Calvijn: onderop, Bijbel, sober. Katholiek: paus, pauselijk wetboek, pracht.",
     "meer": "Een handige check: staat de paus erin? Dan past het niet bij Calvijn."
    },
    {
     "t": "gap",
     "q": "Johannes Calvijn kwam uit ___.",
     "a": "Frankrijk|frankrijk",
     "w": "Calvijn was een Fransman. Hij werkte later vooral in Genève, in Zwitserland.",
     "meer": "Luther kwam uit Duitsland. Twee hervormers, twee landen: niet door elkaar halen."
    },
    {
     "t": "mc",
     "q": "Wie moest volgens Calvijn de kerk leiden?",
     "o": [
      "de gelovigen zelf",
      "de paus in Rome",
      "de keizer",
      "de bisschoppen"
     ],
     "a": "de gelovigen zelf",
     "w": "Calvijn wilde een kerk van onderop: de gemeente zelf leidt de kerk.",
     "meer": "Dat was nieuw en spannend: niet een leider ver weg, maar de gelovigen in je eigen stad bepalen.",
     "fout": {
      "de paus in Rome": "Dat is het katholieke idee: leiding van bovenaf door de paus.",
      "de keizer": "De keizer was een wereldlijk vorst. Calvijn wilde dat de gelovigen zelf de kerk leidden.",
      "de bisschoppen": "Bisschoppen staan bovenaan in de katholieke kerk. Dat is leiding van bovenaf, precies wat Calvijn niet wilde."
     }
    },
    {
     "t": "gap",
     "q": "De aanhangers van Johannes Calvijn heten ___.",
     "a": "calvinisten|de calvinisten",
     "w": "Calvinisten: volgelingen van Johannes Calvijn.",
     "meer": "En volgelingen van Luther heten lutheranen. Samen zijn ze protestanten."
    },
    {
     "t": "mc",
     "q": "Waarom werden de katholieken in de Nederlanden onrustig van het calvinisme?",
     "o": [
      "ze waren bang een minderheid te worden",
      "de calvinisten wilden een nieuwe paus kiezen",
      "Calvijn wilde koning van de Nederlanden worden",
      "de calvinisten weigerden belasting te betalen aan Karel V"
     ],
     "a": "ze waren bang een minderheid te worden",
     "w": "De calvinisten kregen zoveel aanhang dat de katholieken bang werden dat zij straks de kleine groep zouden zijn.",
     "meer": "Die angst is belangrijk voor 4.3.3: Karel V wilde het katholieke geloof beschermen.",
     "fout": {
      "de calvinisten wilden een nieuwe paus kiezen": "Calvinisten wilden helemaal geen paus. Ze wilden een kerk van onderop.",
      "Calvijn wilde koning van de Nederlanden worden": "Calvijn was een geloofshervormer, geen vorst. Hij woonde in Genève.",
      "de calvinisten weigerden belasting te betalen aan Karel V": "Belasting was een ander (economisch) probleem. De onrust bij de katholieken ging over geloof."
     }
    },
    {
     "t": "mc",
     "q": "Welk idee is <b>géén</b> kernidee van Calvijn?",
     "o": [
      "de paus is de hoogste leider van de kerk",
      "de Bijbel is de kern van de kerk",
      "de kerk wordt door de gelovigen zelf geleid",
      "je moet sober en gematigd leven"
     ],
     "a": "de paus is de hoogste leider van de kerk",
     "w": "De paus als hoogste leider is katholiek. De andere drie zijn precies de kernideeën van Calvijn.",
     "meer": "Leer de drie: onderop, Bijbel, sober. Dan herken je de buitenstaander meteen.",
     "fout": {
      "de Bijbel is de kern van de kerk": "Dit is wél een kernidee van Calvijn.",
      "de kerk wordt door de gelovigen zelf geleid": "Dit is wél een kernidee van Calvijn: een kerk van onderop.",
      "je moet sober en gematigd leven": "Dit is wél een kernidee van Calvijn: soberheid en gematigdheid."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Nu ga je de kernideeën van Calvijn <b>terugzien in bronnen</b>. Zo pak je dat aan: lees of bekijk de bron, zoek een <b>element</b> (iets wat je ziet of leest) en koppel het aan een kernidee. Soberheid zie je aan een kale kerk, de Bijbel aan een preekstoel in het midden, ‘van onderop’ aan gelovigen die zelf kiezen.</p>",
    "<p>Een calvinistische gemeente koos zelf <b>ouderlingen</b> en <b>diakenen</b>. Samen met de predikant (dominee) vormden ze de <b>kerkenraad</b>. Zo werd de kerk echt van onderop bestuurd.</p>",
    "<p>Op een kaart van Europa rond 1560 zie je de splitsing: het zuiden blijft vooral katholiek, in het noorden van Duitsland en in Scandinavië wonen vooral lutheranen, en calvinisten vind je onder meer in Zwitserland, Schotland en delen van Frankrijk en de Nederlanden. Dat is een probleem voor Karel V: zijn eigen keizerrijk is in geloof verdeeld.</p>",
    "<p>Toen en nu: mensen noemen Nederlanders soms ‘calvinistisch’ als ze zuinig zijn of niet graag opscheppen. Dat is een overblijfsel van de soberheid van Calvijn. Het kan positief klinken (eerlijk, niet overdreven) of negatief (streng, saai, krenterig).</p>"
   ],
   "regel": "Zoek in de bron een element en koppel het aan een kernidee: kale kerk = sober, preekstoel = Bijbel, zelf kiezen = van onderop.",
   "vragen": [
    {
     "t": "mc",
     "q": "Welk kernidee van Calvijn zie je het duidelijkst terug in deze bron?",
     "bron": {
      "titel": "Bron A: een kerk van binnen",
      "tekst": "Op een schilderij zie je de binnenkant van een grote kerk. De muren en zuilen zijn spierwit en kaal. Er staan geen heiligenbeelden en er hangen geen schilderijen. Een paar mensen lopen rond, een hond snuffelt op de vloer. Tegen een zuil staat een houten preekstoel.",
      "onder": "Naar: Pieter Saenredam, schilderijen van de Sint-Bavokerk in Haarlem, rond 1630-1660, toen die kerk protestants was geworden."
     },
     "o": [
      "soberheid",
      "de paus als hoogste leider",
      "het pauselijk wetboek",
      "de macht van de keizer"
     ],
     "a": "soberheid",
     "w": "Kale witte muren, geen beelden: dit is soberheid in een gebouw.",
     "meer": "Bewijs: ‘de muren en zuilen zijn spierwit en kaal, er staan geen heiligenbeelden’. Dat zie je in de bron zelf.",
     "fout": {
      "de paus als hoogste leider": "Een kerk zonder beelden en versiering past juist niet bij de pracht van de katholieke kerk van de paus.",
      "het pauselijk wetboek": "Dat hoort bij de katholieke kerk. In de bron zie je niets wat met regels van de paus te maken heeft.",
      "de macht van de keizer": "Er staat geen keizer in deze kerk. Het gaat hier om geloof, niet om bestuur."
     }
    },
    {
     "t": "mc",
     "q": "Kijk nog eens naar bron A. Welk <b>element uit de bron</b> past bij het idee dat de Bijbel de kern van de kerk is?",
     "bron": {
      "titel": "Bron A: een kerk van binnen",
      "tekst": "Op een schilderij zie je de binnenkant van een grote kerk. De muren en zuilen zijn spierwit en kaal. Er staan geen heiligenbeelden en er hangen geen schilderijen. Een paar mensen lopen rond, een hond snuffelt op de vloer. Tegen een zuil staat een houten preekstoel.",
      "onder": "Naar: Pieter Saenredam, schilderijen van de Sint-Bavokerk in Haarlem, rond 1630-1660, toen die kerk protestants was geworden."
     },
     "o": [
      "de preekstoel, want vandaar wordt uit de Bijbel gepreekt",
      "het onderschrift, want daarin staat dat de kerk protestants was",
      "de hond op de vloer, want dieren horen bij de schepping uit de Bijbel",
      "de grote hoogte van de kerk, want die laat zien hoe machtig God is"
     ],
     "a": "de preekstoel, want vandaar wordt uit de Bijbel gepreekt",
     "w": "In een calvinistische kerk draait de dienst om de preek over de Bijbel. De preekstoel is daarvan het teken.",
     "meer": "Een element uit de bron is iets wat je op het schilderij zelf ziet. Het onderschrift telt niet als bewijs.",
     "fout": {
      "het onderschrift, want daarin staat dat de kerk protestants was": "Het onderschrift is uitleg bij de bron, geen element <b>uit</b> de bron. Bij deze vraag mag je het niet gebruiken als bewijs.",
      "de hond op de vloer, want dieren horen bij de schepping uit de Bijbel": "Te ver gezocht. Saenredam schilderde gewoon het dagelijks leven in de kerk.",
      "de grote hoogte van de kerk, want die laat zien hoe machtig God is": "De kerk was al zo hoog toen hij nog katholiek was. Dat zegt dus niets over Calvijn."
     }
    },
    {
     "t": "sleep",
     "opgave": "Hoort dit bij Luther, bij Calvijn, of bij allebei?",
     "chips": [
      {
       "t": "Zijn volgelingen heten lutheranen",
       "bak": "luther",
       "waarom": "Lutheranen zijn volgelingen van Maarten Luther."
      },
      {
       "t": "Begon in 1517 met zijn 95 stellingen",
       "bak": "luther",
       "waarom": "Dat deed Luther, in Wittenberg (3.5)."
      },
      {
       "t": "Een Fransman die werkte in Genève",
       "bak": "calvijn",
       "waarom": "Calvijn kwam uit Frankrijk en werkte in Genève."
      },
      {
       "t": "De kerk moet van onderop door de gelovigen geleid worden",
       "bak": "calvijn",
       "waarom": "Dit idee over de organisatie van de kerk is typisch Calvijn."
      },
      {
       "t": "Brak met de paus",
       "bak": "beide",
       "waarom": "Allebei keerden ze zich af van de katholieke kerk: ze zijn protestant."
      },
      {
       "t": "Vond de Bijbel belangrijker dan wat de paus zegt",
       "bak": "beide",
       "waarom": "Allebei zetten ze de Bijbel voorop. Daarom zijn het allebei protestanten."
      }
     ],
     "bakjes": [
      {
       "id": "luther",
       "label": "Luther",
       "som": "Duitser, 1517"
      },
      {
       "id": "calvijn",
       "label": "Calvijn",
       "som": "Fransman, kerk van onderop"
      },
      {
       "id": "beide",
       "label": "allebei",
       "som": "protestant, tegen de paus"
      }
     ],
     "w": "Wat ze gemeen hebben maakt ze protestant. De organisatie van onderop is van Calvijn.",
     "meer": "Bij een vraag naar verschillen en overeenkomsten (leerdoel!) helpt zo'n driedeling: alleen A, alleen B, allebei."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg met de bron uit welk kernidee van Calvijn je hierin terugziet. (2p)",
     "bron": {
      "titel": "Bron B: zo werkt een calvinistische gemeente",
      "tekst": "In een calvinistische gemeente kiezen de gelovigen zelf een aantal ouderlingen en diakenen. Samen met de predikant vormen zij de kerkenraad. De kerkenraad neemt de besluiten over de kerk en let erop dat de leden netjes leven.",
      "onder": "Eigen bewerking naar de kerkorde van calvinistische gemeenten in de 16e eeuw."
     },
     "tip": "Noem eerst het kernidee. Bewijs het daarna met een stukje uit de bron tussen aanhalingstekens.",
     "model": [
      {
       "label": "Kernidee",
       "tekst": "Het kernidee dat de kerk niet van bovenaf, maar van onderop door de gelovigen zelf geleid wordt."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat: “de gelovigen kiezen zelf een aantal ouderlingen en diakenen”. Er komt geen paus of bisschop aan te pas."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem het kernidee: van onderop, door de gelovigen.",
       "woorden": [
        "onderop",
        "gelovigen",
        "zelf"
       ]
      },
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": []
      },
      {
       "t": "Ik leg uit waarom het citaat bij het idee past.",
       "woorden": [
        "omdat",
        "want",
        "geen paus",
        "zelf"
       ]
      }
     ],
     "w": "Eén punt voor het kernidee, één punt voor het bewijs uit de bron.",
     "meer": "Veelgemaakte fout: alleen ‘de kerkenraad’ noemen. Leg uit wat dat met Calvijns idee te maken heeft."
    },
    {
     "t": "mc",
     "q": "Je bent met je moeder kleren aan het kopen en jullie lopen meteen naar het rek met korting. Iemand zegt lachend: ‘Wat calvinistisch!’ Welk idee van Calvijn zit daarachter?",
     "o": [
      "soberheid",
      "de kerk van onderop",
      "de Bijbel als kern",
      "de paus als leider"
     ],
     "a": "soberheid",
     "w": "Zuinig zijn en niet overdrijven: dat noemen mensen nu nog ‘calvinistisch’, naar Calvijns soberheid.",
     "meer": "Toen en nu: het geloofsidee van toen is een gewoonte in de taal van nu geworden. Dat is continuïteit, al is het geloof erachter bij veel mensen weg.",
     "fout": {
      "de kerk van onderop": "Dat gaat over hoe de kerk bestuurd wordt, niet over zuinig winkelen.",
      "de Bijbel als kern": "Dat gaat over wat centraal staat in de kerk. Zuinigheid komt van zijn idee over soberheid.",
      "de paus als leider": "Dat is katholiek en heeft niets met Calvijn te maken."
     }
    },
    {
     "t": "mc",
     "q": "Met welk <b>religieus probleem</b> had Karel V in zijn Heilig Roomse Rijk te maken?",
     "bron": {
      "titel": "Bron C: Europa rond 1560",
      "tekst": "Op een kaart van Europa rond 1560 zijn Spanje, Italië en het grootste deel van Frankrijk gekleurd als katholiek. Noord-Duitsland en Scandinavië zijn gekleurd als luthers. Zwitserland, Schotland en stukken van Frankrijk en de Nederlanden zijn calvinistisch. Engeland is anglicaans.",
      "onder": "Eigen beschrijving van een kaart van de godsdiensten in Europa rond 1560."
     },
     "o": [
      "Noord-Duitsland werd protestants",
      "in zijn rijk woonden bijna alleen anglicanen",
      "de paus weigerde hem keizer te maken",
      "in Spanje werd iedereen calvinist"
     ],
     "a": "Noord-Duitsland werd protestants",
     "w": "Karel wilde één katholiek rijk, maar op de kaart zie je dat Noord-Duitsland luthers is geworden.",
     "meer": "Bewijs uit de kaart: ‘Noord-Duitsland en Scandinavië zijn gekleurd als luthers’. Het Heilig Roomse Rijk is het Duitse rijk.",
     "fout": {
      "in zijn rijk woonden bijna alleen anglicanen": "Anglicanen woonden in Engeland, en dat hoorde niet bij Karels rijk.",
      "de paus weigerde hem keizer te maken": "Karel werd in 1519 gewoon keizer. Het probleem was dat zijn onderdanen van geloof wisselden.",
      "in Spanje werd iedereen calvinist": "Op de kaart is Spanje juist katholiek gekleurd."
     }
    },
    {
     "t": "mc",
     "q": "Een stad wordt calvinistisch. Wat is daar <b>continuïteit</b>?",
     "o": [
      "de mensen blijven christen en lezen de Bijbel",
      "de beelden verdwijnen uit de kerk",
      "de preek wordt het belangrijkste deel van de dienst",
      "de gemeente kiest zelf de kerkenraad"
     ],
     "a": "de mensen blijven christen en lezen de Bijbel",
     "w": "Continuïteit is wat hetzelfde blijft: het blijft een christelijk geloof met de Bijbel.",
     "meer": "De andere drie zijn allemaal verandering: zo werd de kerk anders na de Reformatie.",
     "fout": {
      "de beelden verdwijnen uit de kerk": "Dat is iets wat anders wordt, dus verandering.",
      "de preek wordt het belangrijkste deel van de dienst": "Ook dat is nieuw: een verandering.",
      "de gemeente kiest zelf de kerkenraad": "Vroeger besliste de katholieke kerk van bovenaf. Dit is dus verandering."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Bij Goud ga je <b>argumenteren</b> en kijken door twee brillen. Bij een meningsvraag (‘wat vind jij van het calvinisme?’) begin je met je mening, en daarna geef je twee argumenten, elk met ‘omdat’. Gebruik de kernideeën als argument, dan laat je meteen zien dat je de stof kent.</p>",
    "<p>Perspectief: een calvinist vond zijn kerk zuiver en eerlijk, dichter bij de Bijbel. Een katholiek zag zijn vertrouwde kerk, met de paus, de heiligen en de mooie beelden, aangevallen worden. Hij was bang een minderheid te worden.</p>",
    "<p>Inzicht: waarom was het calvinisme voor Karel V extra gevaarlijk? Een kerk die van onderop bestuurd wordt, luistert niet naar een leider van bovenaf. Wie zelf zijn kerkleiders kiest, gaat zich misschien ook afvragen waarom een vorst ver weg alles mag bepalen. Zo werd een geloofskwestie ook een kwestie van gezag.</p>"
   ],
   "regel": "Mening + twee argumenten met ‘omdat’; en kijk altijd door de bril van allebei: calvinist en katholiek.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Wat vind jij zelf van het calvinisme? Gebruik minstens twee argumenten. (3p)",
     "tip": "Begin met je mening in één zin. Geef dan twee argumenten, elk met ‘omdat’, en gebruik daarin kernideeën van Calvijn.",
     "model": [
      {
       "label": "Mening",
       "tekst": "Ik vind het calvinisme deels goed en deels te streng."
      },
      {
       "label": "Argument 1",
       "tekst": "Goed vind ik dat de gelovigen de kerk zelf van onderop leiden, omdat iedereen dan mee kan praten in plaats van één paus ver weg."
      },
      {
       "label": "Argument 2",
       "tekst": "Te streng vind ik de soberheid, omdat mooie kunst en versiering in een kerk ook iets moois kunnen toevoegen."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met een duidelijke mening.",
       "woorden": [
        "ik vind",
        "vind ik"
       ]
      },
      {
       "t": "Ik geef twee argumenten met ‘omdat’.",
       "woorden": [
        "omdat",
        "want"
       ]
      },
      {
       "t": "Ik gebruik minstens één kernidee (onderop, Bijbel, soberheid).",
       "woorden": [
        "onderop",
        "bijbel",
        "sober"
       ]
      }
     ],
     "w": "Er is geen fout antwoord in je mening, wel in de opbouw: mening, argument, argument.",
     "meer": "Veelgemaakte fout: alleen ‘ik vind het goed’ zonder te zeggen waarom. Een argument zonder ‘omdat’ telt niet."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg met de bron uit waarom deze katholiek bang was voor de groei van het calvinisme. (2p)",
     "bron": {
      "titel": "Bron D: een bezorgde katholiek",
      "tekst": "“Elke week lopen er meer mensen naar de preken van de nieuwe leer. Ze lachen om onze heiligen en zeggen dat de paus niets te zeggen heeft. Als dit zo doorgaat, zijn wij straks de vreemden in onze eigen stad.”",
      "onder": "Eigen bewerking, zoals een katholieke burger in Antwerpen het rond 1560 zou kunnen zeggen."
     },
     "tip": "Zeg eerst waar hij bang voor is. Bewijs het met een citaat uit de bron, niet uit het onderschrift.",
     "model": [
      {
       "label": "Waar hij bang voor was",
       "tekst": "Hij was bang dat de katholieken een minderheid zouden worden, omdat het calvinisme heel snel groeide."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat: “Als dit zo doorgaat, zijn wij straks de vreemden in onze eigen stad.” Ook ziet hij dat de calvinisten de paus en de heiligen afwijzen."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de angst om een minderheid te worden.",
       "woorden": [
        "minderheid",
        "minder",
        "kleine groep"
       ]
      },
      {
       "t": "Ik noem dat het calvinisme snel groeide.",
       "woorden": [
        "groei",
        "meer",
        "aanhang"
       ]
      },
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": []
      }
     ],
     "w": "De angst (minderheid worden) plus het bewijs uit de bron.",
     "meer": "Veelgemaakte fout: je eigen kennis opschrijven zonder de bron te gebruiken. ‘Leg met de bron uit’ betekent: citeer of beschrijf iets uit de bron."
    },
    {
     "t": "mc",
     "q": "Wie zegt dit waarschijnlijk? <i>‘In onze kerk hoeft niemand een paus te gehoorzamen. De gemeente kiest zelf wie de kerk leidt.’</i>",
     "o": [
      "een calvinist",
      "een lutheraan",
      "een katholieke priester",
      "Karel V"
     ],
     "a": "een calvinist",
     "w": "Geen paus én de gemeente kiest zelf: dat tweede is typisch Calvijn.",
     "meer": "Let op het woord ‘kiest’: de kerk van onderop is het verschil tussen calvinisten en lutheranen in deze paragraaf.",
     "fout": {
      "een lutheraan": "Een lutheraan wijst de paus ook af, maar de kerk die de gemeente zelf leidt is het idee van Calvijn.",
      "een katholieke priester": "Een katholiek gehoorzaamt juist de paus.",
      "Karel V": "Karel was katholiek en wilde het katholieke geloof beschermen. Dit zou hij nooit zeggen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was een kerk <b>van onderop</b> voor Karel V extra bedreigend?",
     "o": [
      "wie zelf kiest, gehoorzaamt minder snel van bovenaf",
      "calvinisten wilden Karel V vervangen door Calvijn als keizer",
      "een kerk van onderop kostte Karel veel meer belastinggeld",
      "de gelovigen moesten van Calvijn Spanje aanvallen"
     ],
     "a": "wie zelf kiest, gehoorzaamt minder snel van bovenaf",
     "w": "Het idee ‘wij bepalen het zelf’ botst met een vorst die alles centraal wil regelen.",
     "meer": "Zo komen de twee draden van deze paragraaf samen: geloof (calvinisme) en bestuur (centralisatie). In 1566 ontploft dat (4.4).",
     "fout": {
      "calvinisten wilden Karel V vervangen door Calvijn als keizer": "Calvijn wilde geen keizer worden. Het gevaar zat in het idee, niet in een machtsgreep.",
      "een kerk van onderop kostte Karel veel meer belastinggeld": "Het ging niet om geld. Het ging om gezag: wie heeft het voor het zeggen?",
      "de gelovigen moesten van Calvijn Spanje aanvallen": "Dat staat nergens. Calvijn schreef over geloof en kerkorganisatie."
     }
    },
    {
     "t": "mc",
     "q": "Een calvinist en een katholiek staan in een kerk vol gouden beelden en kleurrijke ramen. Wat zegt de calvinist?",
     "o": [
      "‘Al die pracht leidt af van het woord van God.’",
      "‘Wat mooi, zo eren we de heiligen.’",
      "‘De paus heeft dit goed geregeld.’",
      "‘Hier moet nog meer goud bij.’"
     ],
     "a": "‘Al die pracht leidt af van het woord van God.’",
     "w": "Soberheid en de Bijbel centraal: versiering leidt af van waar het om gaat.",
     "meer": "Perspectief: dezelfde kerk is voor de katholiek een eerbetoon en voor de calvinist een afleiding.",
     "fout": {
      "‘Wat mooi, zo eren we de heiligen.’": "Dat is wat de katholiek zou zeggen. Heiligen vereren hoort bij de katholieke kerk.",
      "‘De paus heeft dit goed geregeld.’": "Een calvinist erkent de paus niet.",
      "‘Hier moet nog meer goud bij.’": "Dat is precies het tegenovergestelde van soberheid."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde: van Luther tot onrust in de Nederlanden.",
     "stappen": [
      "Luther krijgt kritiek op de kerk en breekt met de paus",
      "Zijn ideeën bereiken de Nederlanden: de eerste lutheranen",
      "Calvijn schrijft boeken over een sobere kerk van onderop",
      "Het calvinisme krijgt veel aanhang in de Nederlanden",
      "De katholieken worden bang een minderheid te worden"
     ],
     "w": "Eerst Luther, dan zijn volgelingen hier, dan Calvijn, dan de groei, dan de angst bij de katholieken.",
     "meer": "Luther begint in 1517. Calvijn (geboren 1509) schrijft zijn belangrijkste boek in 1536. Rond 1560 is het calvinisme in de Nederlanden groot."
    },
    {
     "t": "mc",
     "q": "Waarom past de angst van de katholieken goed bij wat Karel V in <b>1550</b> deed?",
     "o": [
      "hij voerde het bloedplakkaat in",
      "hij werd zelf calvinist om de rust te bewaren",
      "hij gaf iedereen godsdienstvrijheid",
      "hij stelde de Collaterale Raden in"
     ],
     "a": "hij voerde het bloedplakkaat in",
     "w": "Karel en de katholieken wilden hetzelfde: het katholieke geloof beschermen. Het bloedplakkaat moest het protestantisme stoppen.",
     "meer": "Dit is de brug naar 4.3.3. Let op de jaartallen: Collaterale Raden 1531, bloedplakkaat 1550.",
     "fout": {
      "hij werd zelf calvinist om de rust te bewaren": "Karel bleef zijn hele leven katholiek.",
      "hij gaf iedereen godsdienstvrijheid": "Integendeel: hij liet protestanten vervolgen. Ook Augsburg (1555) gaf geen vrijheid voor iedereen.",
      "hij stelde de Collaterale Raden in": "Dat was in 1531 en ging over bestuur, niet over geloof."
     }
    }
   ]
  }
 ]
},
{
 "id": "bloedplakkaten",
 "emoji": "🔥",
 "titel": "4.3.3 · Bloedplakkaten",
 "paragraaf": "§4.3",
 "kort": "Karel V laat protestanten vervolgen met het bloedplakkaat van 1550 en de inquisitie. In 1555 sluit hij de godsdienstvrede van Augsburg, treedt af en geeft de Nederlanden aan Filips II.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "<p>Karel V kijkt met zorg naar de groei van het protestantisme, ook naar het calvinisme in de Nederlanden. Daarom stelt hij in <b>1550</b> het <b>bloedplakkaat</b> in: <i>een op een vel papier gedrukte wet, vooral tegen ketters</i>. Zo'n plakkaat werd letterlijk op muren en deuren geplakt, zodat iedereen het kon lezen.</p>",
    "<p>Met het bloedplakkaat worden protestanten <b>vervolgd</b> (<i>proces waarbij personen of groepen worden achtervolgd, opgepakt en gestraft</i>) door de <b>inquisitie</b>: <i>rechtbank van de katholieke kerk voor het opsporen en bestrijden van ketterij</i>. Een ketter is iemand die volgens de kerk het verkeerde geloof heeft.</p>",
    "<p>Veel ketters worden levend verbrand, en dat gebeurt <b>in het openbaar</b>: iedereen moest zien wat er gebeurde als je ketter was. Dat was bedoeld om af te schrikken, maar het leidde tot een <b>schok</b> in de gewesten. Karel liet zo zien dat hij het katholieke geloof ‘te vuur en te zwaard’ wilde beschermen.</p>",
    "<p>In <b>1555</b> sluit Karel de <b>godsdienstvrede van Augsburg</b>, na jaren van onrust over geloof. Afspraak: <b>het staatshoofd bepaalt de religie van zijn land</b>. Let op: dat is géén vrijheid voor iedereen. De vorst kiest, de onderdanen volgen.</p>",
    "<p>Karel is dan een vermoeide oude man. Zijn centralisatie is maar voor een deel gelukt, en het katholieke geloof als enige toegestane godsdienst houden is nog lastiger gebleken. In <b>1555</b> treedt hij af en geeft de Nederlanden aan zijn zoon <b>Filips II</b>, de koning van Spanje. Dat was bijzonder: vorsten regeerden toen meestal tot hun dood.</p>"
   ],
   "regel": "1550 bloedplakkaat + inquisitie vervolgen protestanten; 1555 Augsburg (de vorst kiest het geloof) en Karel treedt af voor Filips II.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat is een <b>bloedplakkaat</b>?",
     "o": [
      "een op een vel papier gedrukte wet, vooral tegen ketters",
      "een vlag met bloedrode kleur die het leger van Karel droeg",
      "een rechtbank van de katholieke kerk die ketters opspoorde",
      "een verdrag waarin de vorst de religie van zijn land kiest"
     ],
     "a": "een op een vel papier gedrukte wet, vooral tegen ketters",
     "w": "Een plakkaat is een gedrukte wet die je ophangt. ‘Bloed’ omdat er veel slachtoffers door vielen.",
     "meer": "Het bloedplakkaat van 1550 bepaalde dat protestanten vervolgd en veroordeeld moesten worden door de inquisitie.",
     "fout": {
      "een vlag met bloedrode kleur die het leger van Karel droeg": "Een plakkaat is geen vlag maar een wet op papier. De naam komt van de vele doden.",
      "een rechtbank van de katholieke kerk die ketters opspoorde": "Dat is de <b>inquisitie</b>. Het plakkaat is de wet, de inquisitie voert hem uit.",
      "een verdrag waarin de vorst de religie van zijn land kiest": "Dat is de godsdienstvrede van <b>Augsburg</b> (1555)."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de <b>inquisitie</b>?",
     "o": [
      "een rechtbank van de katholieke kerk",
      "een rechtbank van de gewesten zelf",
      "het leger van Karel V",
      "een adviesraad van de landvoogdes"
     ],
     "a": "een rechtbank van de katholieke kerk",
     "w": "De inquisitie: rechtbank van de katholieke kerk voor het opsporen en bestrijden van ketterij.",
     "meer": "Leerdoel: de inquisitie spoorde protestanten op en veroordeelde ze als ketters. Het bloedplakkaat gaf daar de wet voor.",
     "fout": {
      "een rechtbank van de gewesten zelf": "De gewesten hadden eigen rechtbanken, maar de inquisitie was van de <b>kerk</b>. Juist daarom voelde het als inbreuk.",
      "het leger van Karel V": "De inquisitie vocht niet, ze sprak recht: ze spoorde ketters op en veroordeelde ze.",
      "een adviesraad van de landvoogdes": "Adviesraden zijn de Collaterale Raden (1531). De inquisitie was een rechtbank."
     }
    },
    {
     "t": "gap",
     "q": "Karel V voerde het bloedplakkaat in in het jaar ___.",
     "a": "1550|in 1550",
     "w": "1550: het bloedplakkaat.",
     "meer": "Op Karels levenslijn: 1531 Collaterale Raden, 1550 bloedplakkaat, 1555 Augsburg en aftreden."
    },
    {
     "t": "mc",
     "q": "Waarom werden ketters <b>in het openbaar</b> terechtgesteld?",
     "o": [
      "om iedereen af te schrikken",
      "omdat er in de gevangenis geen plaats meer was",
      "omdat de ketters dat zelf wilden",
      "zodat de familie afscheid kon nemen"
     ],
     "a": "om iedereen af te schrikken",
     "w": "Afschrikken: kijk, dit gebeurt er met jou als je protestant wordt.",
     "meer": "Dat werkte vaak andersom: veel toeschouwers waren geschokt en kregen medelijden met de slachtoffers.",
     "fout": {
      "omdat er in de gevangenis geen plaats meer was": "Het ging niet om ruimte. Het openbare was juist de bedoeling: afschrikken.",
      "omdat de ketters dat zelf wilden": "Niemand koos daar zelf voor. Het was een straf die de overheid opgelegd had.",
      "zodat de familie afscheid kon nemen": "Het doel was niet vriendelijk. Het was een waarschuwing aan iedereen."
     }
    },
    {
     "t": "mc",
     "q": "Wat werd afgesproken in de godsdienstvrede van <b>Augsburg</b> (1555)?",
     "o": [
      "het staatshoofd bepaalt de religie van zijn land",
      "iedereen mag voortaan zelf zijn geloof kiezen",
      "alleen het katholieke geloof is overal toegestaan",
      "de paus bepaalt in elk land welk geloof geldt"
     ],
     "a": "het staatshoofd bepaalt de religie van zijn land",
     "w": "De vorst kiest, het volk volgt. Zo kwam er na jaren onrust een soort vrede.",
     "meer": "Valkuil uit 3.5: Augsburg gaf géén vrijheid voor iedereen. Een gewone boer mocht niet zelf kiezen.",
     "fout": {
      "iedereen mag voortaan zelf zijn geloof kiezen": "Dit is de bekende valkuil. Alleen de vorst koos. Wie het niet eens was, moest het geloof van zijn vorst volgen of verhuizen.",
      "alleen het katholieke geloof is overal toegestaan": "Dat wilde Karel wel, maar het lukte niet. Lutherse vorsten mochten nu luthers blijven.",
      "de paus bepaalt in elk land welk geloof geldt": "Juist niet de paus, maar de <b>vorst</b> van elk land."
     }
    },
    {
     "t": "gap",
     "q": "De opvolger van Karel V in de Nederlanden was zijn zoon ___.",
     "a": "Filips II|Filips de Tweede|Filips",
     "w": "Filips II, de koning van Spanje, kreeg in 1555 de Nederlanden.",
     "meer": "Pas op met de Filipsen: Filips de Schone is Karels vader, Filips II zijn zoon."
    },
    {
     "t": "gap",
     "q": "Karel V trad af in het jaar ___.",
     "a": "1555|in 1555",
     "w": "1555: Augsburg én het aftreden van Karel V.",
     "meer": "Twee gebeurtenissen in één jaar: dat maakt 1555 makkelijk te onthouden (en lastig als je ze door elkaar haalt)."
    },
    {
     "t": "mc",
     "q": "Waarom was het aftreden van Karel V in die tijd <b>bijzonder</b>?",
     "o": [
      "vorsten bleven toen meestal regeren tot hun dood",
      "het was de eerste keer dat een vorst een zoon had",
      "Karel gaf zijn macht aan de gewesten zelf",
      "hij werd afgezet door de Staten-Generaal"
     ],
     "a": "vorsten bleven toen meestal regeren tot hun dood",
     "w": "Een vorst gaf zijn kroon normaal pas af als hij stierf. Vrijwillig stoppen was uitzonderlijk.",
     "meer": "Karel was moe en zijn plannen waren maar half gelukt. Hij leefde daarna nog tot 1558 in een klooster in Spanje.",
     "fout": {
      "het was de eerste keer dat een vorst een zoon had": "Vorsten hadden altijd al kinderen die opvolgden. Het bijzondere was dat Karel nog leefde.",
      "Karel gaf zijn macht aan de gewesten zelf": "Nee, hij gaf de Nederlanden aan zijn zoon Filips II.",
      "hij werd afgezet door de Staten-Generaal": "Hij trad vrijwillig af. Niemand zette hem af."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "<p>Bij deze deeltekst vraagt het werkboek: <b>is de maker voor of tegen</b>? Zo pak je dat aan. Kijk naar <b>hoe</b> de maker de mensen laat zien. Een slachtoffer dat rustig bidt, huilende omstanders en een wrede beul: de maker heeft medelijden, dus hij is <b>tegen</b>. Rechters die stralen en een ketter met een duivel erbij: de maker is <b>voor</b>. Bewijs met een element uit de afbeelding zelf.</p>",
    "<p>Was Augsburg <b>positief of negatief</b> voor Karel V? Allebei een beetje. Positief: er kwam rust na jaren onrust. Negatief: Karel wilde één katholiek rijk, en nu mochten lutherse vorsten luthers blijven. De eenheid van de kerk was voorgoed weg.</p>",
    "<p>Toen en nu: in <b>1555</b> deed Karel V afstand van de troon voor zijn zoon. In <b>2013</b> deed koningin <b>Beatrix</b> afstand voor haar zoon <b>Willem-Alexander</b>. Overeenkomst: allebei vrijwillig, tijdens hun leven, voor hun zoon. Verschil: Karel was een machtige vorst die echt regeerde; Beatrix was koningin in een land waar de regering en het parlement de macht hebben.</p>"
   ],
   "regel": "Voor of tegen: kijk hoe de maker het slachtoffer en de daders laat zien, en bewijs met een element uit de bron.",
   "vragen": [
    {
     "t": "sequence",
     "q": "Het vervolg van Karels levenslijn. Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Karel wordt keizer van het Heilig Roomse Rijk",
      "Karel laat Luther vogelvrij verklaren in het Edict van Worms",
      "Karel stelt de Collaterale Raden in",
      "Karel voert het bloedplakkaat in",
      "Godsdienstvrede van Augsburg en Karel treedt af"
     ],
     "w": "1519 keizer, 1521 Worms, 1531 raden, 1550 bloedplakkaat, 1555 Augsburg en aftreden.",
     "meer": "Samen met het begin (1506, 1515, 1516, 1517) is dit de hele levenslijn: 1506, 1515, 1516, 1517, 1519, 1521, 1531, 1550, 1555. Het Edict van Worms (1521) ken je uit 3.5: dat was de keizer, de bul kwam van de paus."
    },
    {
     "t": "mc",
     "q": "Is de maker van deze prent <b>voor of tegen</b> de verbranding van ketters?",
     "bron": {
      "titel": "Bron A: een terechtstelling op de markt",
      "tekst": "Op een prent staat een man vastgebonden aan een paal, met takken om zijn voeten. Hij kijkt omhoog en vouwt zijn handen in gebed. Boven hem breekt een stralende lichtbundel door de wolken. Om hem heen staan omstanders: een vrouw slaat haar handen voor haar gezicht, een kind huilt. De beul heeft een grimmig, lelijk gezicht.",
      "onder": "Eigen bewerking, zoals een protestantse prentmaker rond 1560 een verbranding zou kunnen tekenen."
     },
     "o": [
      "tegen: het slachtoffer bidt en omstanders huilen",
      "voor: hij laat zien dat de straf goed is uitgevoerd",
      "tegen: in het onderschrift staat dat de maker protestant is",
      "dat kun je niet zeggen: een prent toont alleen wat er gebeurde"
     ],
     "a": "tegen: het slachtoffer bidt en omstanders huilen",
     "w": "De maker laat het slachtoffer zien als een goed mens bij God en de beul als een boef: hij is tegen.",
     "meer": "Elementen uit de bron: de gevouwen handen, de stralende lichtbundel, de huilende vrouw en het kind, de lelijke beul.",
     "fout": {
      "voor: hij laat zien dat de straf goed is uitgevoerd": "Kijk naar de gevoelens in de prent: huilende omstanders en een lelijke beul. Zo teken je het niet als je het goedkeurt.",
      "tegen: in het onderschrift staat dat de maker protestant is": "Het antwoord ‘tegen’ klopt, maar het bewijs niet. Je moet bewijzen met een element <b>uit de prent zelf</b>, niet uit het onderschrift.",
      "dat kun je niet zeggen: een prent toont alleen wat er gebeurde": "Een maker kiest altijd hoe hij iets laat zien. Die keuzes (licht, gezichten, tranen) verraden zijn mening."
     }
    },
    {
     "t": "mc",
     "q": "En deze maker: <b>voor of tegen</b> de vervolging van ketters?",
     "bron": {
      "titel": "Bron B: een andere prent",
      "tekst": "Op een prent zitten rechters in nette gewaden achter een tafel, met een kruisbeeld boven hen. Een engel zweeft boven hun hoofden. Voor hen staat een ketter met een boos gezicht. Achter zijn rug grijnst een klein duiveltje met hoorns.",
      "onder": "Eigen bewerking, zoals een katholieke prentmaker in de 16e eeuw een proces zou kunnen tekenen."
     },
     "o": [
      "voor: de engel staat bij de rechters en de duivel bij de ketter",
      "tegen: de ketter wordt veroordeeld en dat vindt de maker zielig",
      "voor: het onderschrift zegt dat de maker katholiek is",
      "tegen: de rechters zitten veilig achter een tafel"
     ],
     "a": "voor: de engel staat bij de rechters en de duivel bij de ketter",
     "w": "De maker zet God aan de kant van de rechters en de duivel aan de kant van de ketter. Hij is voor.",
     "meer": "Engelen en duivels zijn in prenten uit deze tijd duidelijke tekens: de engel = goed, de duivel = kwaad.",
     "fout": {
      "tegen: de ketter wordt veroordeeld en dat vindt de maker zielig": "Niets in de prent wijst op medelijden. De ketter kijkt boos en heeft een duiveltje achter zich.",
      "voor: het onderschrift zegt dat de maker katholiek is": "‘Voor’ klopt, maar het bewijs moet uit de prent zelf komen: de engel en het duiveltje.",
      "tegen: de rechters zitten veilig achter een tafel": "Een tafel zegt niets over de mening van de maker. Let op de engel boven de rechters."
     }
    },
    {
     "t": "mc",
     "q": "Wat is een <b>overeenkomst</b> tussen de troonsafstand van Karel V (1555) en die van koningin Beatrix?",
     "o": [
      "allebei vrijwillig, nog in leven, voor hun zoon",
      "allebei waren ze moe omdat hun plannen mislukt waren",
      "allebei moesten ze aftreden van het parlement",
      "allebei traden ze af in het jaar 2015"
     ],
     "a": "allebei vrijwillig, nog in leven, voor hun zoon",
     "w": "Karel gaf de Nederlanden aan Filips II, Beatrix gaf de troon aan Willem-Alexander. Allebei vrijwillig en nog in leven.",
     "meer": "Beatrix deed in 2013 afstand. Willem-Alexander is dus koning sinds 2013 (niet 2015, zoals je soms leest).",
     "fout": {
      "allebei waren ze moe omdat hun plannen mislukt waren": "Dat gold voor Karel, niet voor Beatrix. Zij vond het tijd voor een nieuwe generatie.",
      "allebei moesten ze aftreden van het parlement": "Allebei deden ze het vrijwillig. Niemand dwong hen.",
      "allebei traden ze af in het jaar 2015": "Karel trad af in 1555, Beatrix in <b>2013</b>. Het jaartal 2015 klopt niet, ook al staat het in je werkboek."
     }
    },
    {
     "t": "gap",
     "q": "Willem-Alexander is koning van Nederland sinds ___.",
     "a": "2013|30 april 2013",
     "w": "Op 30 april 2013 deed Beatrix afstand en werd Willem-Alexander koning.",
     "meer": "Let op: je werkboek zegt 2015, maar dat is een fout. Het is 2013."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg uit of de godsdienstvrede van Augsburg positief of negatief was voor Karel V. (3p)",
     "tip": "Kies eerst: positief, negatief of allebei. Geef dan per kant een reden, en leg de link met wat Karel wílde.",
     "model": [
      {
       "label": "Keuze",
       "tekst": "Augsburg was vooral negatief voor Karel V."
      },
      {
       "label": "Wat Karel wilde",
       "tekst": "Karel wilde dat het katholieke geloof het enige toegestane geloof bleef in zijn rijk."
      },
      {
       "label": "Daardoor negatief",
       "tekst": "In Augsburg werd afgesproken dat het staatshoofd de religie bepaalt. Daardoor mochten lutherse vorsten luthers blijven en was de eenheid van de kerk voorgoed weg. Wel positief: er kwam rust na jaren onrust."
      }
     ],
     "checklist": [
      {
       "t": "Ik kies duidelijk positief of negatief.",
       "woorden": [
        "positief",
        "negatief"
       ]
      },
      {
       "t": "Ik noem de afspraak: het staatshoofd bepaalt de religie.",
       "woorden": [
        "staatshoofd",
        "vorst",
        "bepaalt",
        "kiest"
       ]
      },
      {
       "t": "Ik noem wat Karel wilde: één katholiek geloof.",
       "woorden": [
        "katholiek"
       ]
      },
      {
       "t": "Ik leg het verband met ‘daardoor’ of ‘omdat’.",
       "woorden": [
        "daardoor",
        "omdat",
        "waardoor"
       ]
      }
     ],
     "w": "Een goed antwoord vergelijkt wat Karel wilde (één katholiek geloof) met wat Augsburg opleverde (de vorst kiest).",
     "meer": "Veelgemaakte fout: schrijven dat Augsburg ‘vrijheid van godsdienst’ gaf. Dat klopt niet: alleen de vorst koos."
    },
    {
     "t": "mc",
     "q": "Een lutherse boer woont na 1555 in een Duits gebied met een katholieke vorst. Wat betekent Augsburg voor hem?",
     "o": [
      "hij moet het katholieke geloof van zijn vorst volgen of verhuizen",
      "hij mag gewoon luthers blijven, want iedereen is nu vrij",
      "hij mag zelf een nieuwe vorst kiezen die luthers is",
      "hij hoeft niets, want Augsburg gold alleen voor de steden"
     ],
     "a": "hij moet het katholieke geloof van zijn vorst volgen of verhuizen",
     "w": "De vorst kiest het geloof. Een onderdaan die het niet eens is, past zich aan of vertrekt.",
     "meer": "Zo zie je dat Augsburg vrede tussen vorsten bracht, maar geen vrijheid voor gewone mensen.",
     "fout": {
      "hij mag gewoon luthers blijven, want iedereen is nu vrij": "Dit is de valkuil: Augsburg gaf geen godsdienstvrijheid voor iedereen, alleen voor de vorst.",
      "hij mag zelf een nieuwe vorst kiezen die luthers is": "Een boer koos zijn vorst niet. Vorsten erfden hun gebied.",
      "hij hoeft niets, want Augsburg gold alleen voor de steden": "De afspraak ging over de staatshoofden en hun hele land, niet alleen over steden."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wat was een <b>bedoeld</b> en wat een <b>onbedoeld</b> gevolg van het bloedplakkaat?",
     "chips": [
      {
       "t": "Mensen schrikken af en blijven katholiek",
       "bak": "bedoeld",
       "waarom": "Afschrikken was precies het doel van de openbare straffen."
      },
      {
       "t": "Protestanten worden opgespoord en gestraft",
       "bak": "bedoeld",
       "waarom": "Daar was het plakkaat voor: ketters vervolgen via de inquisitie."
      },
      {
       "t": "Het katholieke geloof wordt beschermd",
       "bak": "bedoeld",
       "waarom": "Karel wilde het katholieke geloof ‘te vuur en te zwaard’ beschermen."
      },
      {
       "t": "Omstanders krijgen medelijden met de slachtoffers",
       "bak": "onbedoeld",
       "waarom": "Dat wilde Karel juist niet: de straf maakte de ketters tot slachtoffers."
      },
      {
       "t": "Protestanten gaan in het geheim samenkomen",
       "bak": "onbedoeld",
       "waarom": "Het geloof verdween niet, het ging ondergronds. Dat was niet de bedoeling."
      },
      {
       "t": "Er komt een schok en ontevredenheid in de gewesten",
       "bak": "onbedoeld",
       "waarom": "De schok zorgde voor onvrede over Karels bestuur: een gevolg dat hij niet wilde."
      }
     ],
     "bakjes": [
      {
       "id": "bedoeld",
       "label": "bedoeld gevolg",
       "som": "wat Karel wilde"
      },
      {
       "id": "onbedoeld",
       "label": "onbedoeld gevolg",
       "som": "wat Karel niet wilde"
      }
     ],
     "w": "Bedoeld = wat de maker van de maatregel wilde bereiken. Onbedoeld = wat er ook gebeurde, maar wat hij niet wilde.",
     "meer": "Dit patroon komt in 4.4 steeds terug: hoe harder de vorst optreedt, hoe groter het verzet."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "<p>Bij Goud verklaar je het <b>conflict</b> tussen Karel V en de gewesten met een bron. Zo bouw je het op:<br>1. de <b>soort oorzaak</b> (hier: religieus)<br>2. <b>wat Karel deed</b> (bloedplakkaat, inquisitie)<br>3. <b>daardoor</b> (openbare verbrandingen, schok, onvrede)<br>4. <b>bewijs uit de bron</b>, met aanhalingstekens.</p>",
    "<p>Denk ook vanuit Karel zelf. Voor hem was het zijn plicht als christelijk vorst om het ware geloof te beschermen. Ketters brachten volgens hem zielen in gevaar en zorgden voor onrust. Dat maakt het niet goed, maar het helpt je zijn keuzes te <b>verklaren</b>.</p>",
    "<p>En kijk vooruit: Filips II neemt in 1555 het beleid van zijn vader over. Vervolging en centralisatie blijven (<b>continuïteit</b>), maar Filips is strenger en woont in Spanje (<b>verandering</b>). Het kenmerkend aspect van deze paragraaf, het conflict dat leidt tot een Nederlandse staat, begint hier.</p>"
   ],
   "regel": "Conflict verklaren: soort oorzaak → wat Karel deed → daardoor → bewijs uit de bron.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg met behulp van de bron uit waarom er een conflict ontstond tussen Karel V en de Nederlandse gewesten. (3p)",
     "bron": {
      "titel": "Bron C: Brussel, 1523",
      "tekst": "Op de Grote Markt van Brussel worden in 1523 twee jonge monniken levend verbrand, omdat ze de ideeën van Luther aanhangen. Een grote menigte kijkt toe. Volgens verslagen bleven de twee tot het einde rustig zingen en bidden. Veel toeschouwers gaan geschokt naar huis, en in Duitsland schrijft Luther er een lied over.",
      "onder": "Eigen bewerking naar de verbranding van Hendrik Voes en Johannes van Esschen in Brussel, 1523, de eerste lutherse martelaren."
     },
     "tip": "Begin met de soort oorzaak. Zet elke stap op een eigen regel. Bewijs met iets uit de bron tussen aanhalingstekens.",
     "model": [
      {
       "label": "Soort oorzaak",
       "tekst": "Een religieuze oorzaak: Karel V wilde het katholieke geloof beschermen en liet protestanten vervolgen."
      },
      {
       "label": "Wat er gebeurde",
       "tekst": "Protestanten werden opgepakt en in het openbaar levend verbrand, later met het bloedplakkaat (1550) en de inquisitie."
      },
      {
       "label": "Daardoor + bewijs",
       "tekst": "Daardoor waren veel mensen in de gewesten geschokt en ontevreden over Karel. In de bron staat: “Veel toeschouwers gaan geschokt naar huis.”"
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de soort oorzaak (religieus).",
       "woorden": [
        "religie",
        "geloof",
        "godsdienst"
       ]
      },
      {
       "t": "Ik noem de vervolging, het bloedplakkaat of de inquisitie.",
       "woorden": [
        "vervolg",
        "plakkaat",
        "inquisitie",
        "verbrand"
       ]
      },
      {
       "t": "Ik leg het verband met ‘daardoor’.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      },
      {
       "t": "Ik citeer de bron tussen aanhalingstekens.",
       "woorden": []
      }
     ],
     "w": "Drie stappen: religieuze oorzaak, wat Karel deed, de schok als gevolg met bewijs uit de bron.",
     "meer": "Veelgemaakte fout: alleen beschrijven wat er in de bron staat. De vraag is waarom er een conflict kwam, dus je moet het verband leggen."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Vergelijk de troonsafstand van Karel V met die van koningin Beatrix. Geef één overeenkomst en één verschil. (2p)",
     "bron": {
      "titel": "Bron D: twee troonswisselingen",
      "tekst": "<b>1555, Brussel:</b> een vermoeide Karel V, leunend op de schouder van de jonge Willem van Oranje, draagt de Nederlanden over aan zijn zoon Filips II. Karel regeerde zelf over een wereldrijk.<br><b>2013, Amsterdam:</b> koningin Beatrix tekent in het Paleis op de Dam de akte waarmee ze afstand doet. Haar zoon Willem-Alexander wordt koning. In Nederland hebben de regering en het parlement de macht.",
      "onder": "Eigen samenvatting van de troonsafstand van Karel V (25 oktober 1555) en die van Beatrix (30 april 2013)."
     },
     "tip": "Schrijf twee aparte zinnen: één die begint met ‘Overeenkomst:’ en één met ‘Verschil:’. Haal het verschil uit de bron.",
     "model": [
      {
       "label": "Overeenkomst",
       "tekst": "Allebei deden ze vrijwillig afstand terwijl ze nog leefden, en allebei gaven ze de troon aan hun zoon."
      },
      {
       "label": "Verschil",
       "tekst": "Karel V had echt de macht over een wereldrijk, terwijl Beatrix koningin was in een land waar “de regering en het parlement de macht” hebben."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een overeenkomst (vrijwillig, nog in leven, aan hun zoon).",
       "woorden": [
        "vrijwillig",
        "zoon",
        "leven"
       ]
      },
      {
       "t": "Ik noem een verschil (macht van de vorst).",
       "woorden": [
        "macht",
        "regering",
        "parlement",
        "wereldrijk"
       ]
      },
      {
       "t": "Ik houd overeenkomst en verschil apart.",
       "woorden": [
        "overeenkomst",
        "verschil"
       ]
      }
     ],
     "w": "Een toen-en-nu-vraag: wat is hetzelfde gebleven en wat is anders geworden?",
     "meer": "Let op het jaartal: Beatrix trad af in 2013, dus Willem-Alexander is koning sinds 2013. Je werkboek noemt 2015, dat is fout."
    },
    {
     "t": "mc",
     "q": "Hoe zou Karel V <b>zelf</b> de vervolging van ketters hebben verdedigd?",
     "o": [
      "hij moest als vorst het ware geloof beschermen",
      "hij wilde laten zien dat de gewesten belasting moesten betalen",
      "hij vond dat de protestanten te weinig sober leefden",
      "hij deed het alleen omdat de paus hem anders zou afzetten"
     ],
     "a": "hij moest als vorst het ware geloof beschermen",
     "w": "Karel zag zichzelf als beschermer van het katholieke geloof. Ketterij was voor hem gevaarlijk voor zielen en voor de orde.",
     "meer": "Perspectief betekent niet dat je het ermee eens bent. Je laat zien dat je snapt waarom hij zo dacht.",
     "fout": {
      "hij wilde laten zien dat de gewesten belasting moesten betalen": "Belasting is een economisch probleem. De vervolging had een religieuze reden.",
      "hij vond dat de protestanten te weinig sober leefden": "Andersom: soberheid was juist een calvinistisch idee.",
      "hij deed het alleen omdat de paus hem anders zou afzetten": "De paus kon een keizer niet zomaar afzetten. Karel geloofde er zelf in."
     }
    },
    {
     "t": "mc",
     "q": "Waarom gold de afspraak van Augsburg niet als redding voor de protestanten in de Nederlanden?",
     "o": [
      "hun vorst was Karel V en daarna Filips II, en die kozen katholiek",
      "de Nederlanden lagen buiten Europa en telden niet mee",
      "de protestanten in de Nederlanden wilden zelf katholiek worden",
      "Augsburg gold alleen voor calvinisten, niet voor lutheranen"
     ],
     "a": "hun vorst was Karel V en daarna Filips II, en die kozen katholiek",
     "w": "De vorst bepaalt het geloof. In de Nederlanden was de vorst katholiek, dus bleef vervolging de regel.",
     "meer": "Inzicht: dezelfde afspraak bracht vrede voor lutherse vorsten in Duitsland, maar niets voor protestanten hier.",
     "fout": {
      "de Nederlanden lagen buiten Europa en telden niet mee": "De Nederlanden lagen gewoon in Europa en hoorden bij Karels rijk.",
      "de protestanten in de Nederlanden wilden zelf katholiek worden": "Juist niet: ze werden vervolgd omdat ze protestant wilden blijven.",
      "Augsburg gold alleen voor calvinisten, niet voor lutheranen": "Andersom: in Augsburg werd alleen het lutherse geloof naast het katholieke erkend. Maar ook dat hielp hier niet, want hier koos de vorst katholiek."
     }
    },
    {
     "t": "mc",
     "q": "Wat zette Filips II na 1555 <b>voort</b> van zijn vader (continuïteit)?",
     "o": [
      "de vervolging van protestanten en de centralisatie",
      "het vrijlaten van alle protestanten uit de gevangenis",
      "het wonen in de Nederlanden en het spreken van de taal",
      "het zoeken van vrede met Luther"
     ],
     "a": "de vervolging van protestanten en de centralisatie",
     "w": "Filips nam het beleid van zijn vader over: protestanten vervolgen en de gewesten centraal besturen.",
     "meer": "De verandering zit in de hardheid en in de afstand: Filips was strenger en woonde in Spanje. Dat werk je uit in 4.4.",
     "fout": {
      "het vrijlaten van alle protestanten uit de gevangenis": "Integendeel: Filips trad nog strenger op tegen protestanten.",
      "het wonen in de Nederlanden en het spreken van de taal": "Dat is juist een verandering: Karel was hier opgegroeid, Filips woonde in Spanje.",
      "het zoeken van vrede met Luther": "Luther was in 1546 al overleden, en Filips zocht geen vrede met protestanten."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe groeit het conflict over geloof?",
     "stappen": [
      "Het calvinisme groeit snel in de Nederlanden",
      "Karel V maakt zich zorgen over het katholieke geloof",
      "Hij voert het bloedplakkaat in",
      "De inquisitie spoort protestanten op en veroordeelt ze",
      "Ketters worden in het openbaar verbrand",
      "De gewesten zijn geschokt en ontevreden over Karel"
     ],
     "w": "Groei → zorgen → wet → opsporen → straf in het openbaar → schok en onvrede.",
     "meer": "Het bloedplakkaat is van 1550. Precies deze ketting is je modelantwoord bij een vraag als ‘waarom ontstond er een conflict?’."
    },
    {
     "t": "mc",
     "q": "De openbare verbrandingen moesten mensen afschrikken. Toch werd het verzet groter. Hoe noem je zo'n gevolg?",
     "o": [
      "een onbedoeld gevolg",
      "een bedoeld gevolg",
      "een direct economisch gevolg",
      "continuïteit"
     ],
     "a": "een onbedoeld gevolg",
     "w": "Karel wilde afschrikken, maar kreeg medelijden en verzet. Dat wilde hij niet: onbedoeld.",
     "meer": "Dit is het boemerang-patroon: hoe harder de vorst slaat, hoe harder het terugkomt. In 4.4 zie je het bij Filips II en Alva.",
     "fout": {
      "een bedoeld gevolg": "Bedoeld is wat Karel wilde: afschrikken. Meer verzet wilde hij juist niet.",
      "een direct economisch gevolg": "Het gaat hier niet om geld. En de vraag is of het gevolg gewild was, niet welke soort het is.",
      "continuïteit": "Continuïteit gaat over wat hetzelfde blijft in de tijd, niet over een gevolg van een maatregel."
     }
    }
   ]
  }
 ]
}
);


/* ===== §4.4 Een onrustige opstand (uit de app van 16-09-2026, aangevuld) ===== */
window.LEERSTOF.push(
{
 "id": "filips-botst",
 "emoji": "👑",
 "titel": "4.4.1 · In botsing met een nieuwe vorst",
 "paragraaf": "§4.4",
 "kort": "Filips II volgt Karel V op en maakt zich meteen onbemind: strenger tegen protestanten, hogere belastingen en één centraal bestuur. Drie redenen, drie soorten ruzie.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In 1555 volgt <b>Filips II</b> zijn vader <b>Karel V</b> op. Hij wordt koning van Spanje én heer van de Nederlanden. Let op: de Nederlanden zijn géén deel van Spanje, het is toevallig <i>dezelfde baas</i>.",
    "Filips wordt hier niet met gejuich ontvangen. Daar zijn <b>drie redenen</b> voor, en je kunt ze onthouden als <b>geloof, geld en macht</b>:",
    "<b>1. Geloof</b>: Filips ziet zichzelf als de leider van de strijd tegen het protestantisme. Hij treedt nóg strenger op dan zijn vader.<br><b>2. Geld</b>: hij voert dure oorlogen, dus hij heft <b>hoge belastingen</b>.<br><b>3. Macht</b>: hij wil de <b>centralisatie</b> van zijn vader voortzetten: één bestuur met overal dezelfde wetten. Gewesten en edelen zijn bang hun <b>privileges</b> kwijt te raken.",
    "Filips zelf woont in Spanje. Hij stuurt <b>Spaanse edelen</b> hierheen om te besturen en maakt zijn halfzus <b>Margaretha van Parma</b> <b>landvoogdes</b>: zijn plaatsvervangster in de Nederlanden."
   ],
   "regel": "Drie redenen waarom Filips II meteen botst: geloof (strenger), geld (hoge belastingen) en macht (centralisatie).",
   "vragen": [
    {
     "t": "vb",
     "opgave": "Waarom waren de Nederlandse edelen bang voor de centralisatie van Filips II?",
     "waarom": {
      "q": "Wat raakten de edelen en gewesten kwijt bij centralisatie?",
      "o": [
       "hun privileges",
       "hun geloof",
       "hun land"
      ],
      "a": "hun privileges"
     },
     "fout": {
      "hun geloof": "Dat was een ander probleem (en speelde vooral bij de protestanten). Bij centralisatie gaat het over <b>bestuur</b>: overal dezelfde wetten, dus geen eigen rechten meer. Die eigen rechten heten privileges.",
      "hun land": "Hun grond raakten ze niet kwijt. Wat ze kwijtraakten waren hun <b>privileges</b>: de bijzondere rechten die hun gewest of stad had, zoals zelf over belasting beslissen."
     },
     "stappen": [
      {
       "toon": "Centralisatie = één centraal bestuur, overal dezelfde wetten en regels.",
       "uitleg": "Begin altijd met wat het begrip betekent. Dat vraagt het werkboek ook letterlijk bij opdracht 1c."
      },
      {
       "toon": "Maar de gewesten hadden juist eigen wetten, eigen munten en eigen rechten.",
       "uitleg": "Die bijzondere rechten heten privileges."
      },
      {
       "toon": "→ Eén bestuur voor iedereen betekent: die eigen rechten verdwijnen.",
       "uitleg": "Daarom waren gewesten én edelen tegen. Ze verloren macht en voordelen."
      }
     ],
     "w": "Centralisatie botst met privileges: overal dezelfde regels betekent geen eigen rechten meer.",
     "meer": "Tip voor het SO: begin je antwoord met de betekenis van het begrip, en geef dán pas het voorbeeld."
    },
    {
     "t": "mc",
     "q": "Wat is de beste reden waarom Filips II hoge belastingen ging heffen?",
     "o": [
      "hij voerde dure oorlogen",
      "hij wilde een nieuw paleis bouwen",
      "de Nederlanden waren arm geworden",
      "de kerk eiste meer geld van hem"
     ],
     "a": "hij voerde dure oorlogen",
     "w": "Oorlog kost geld, en Filips voerde er veel. Dat geld moest ergens vandaan komen.",
     "meer": "Dit is de <b>economische</b> reden waarom de Nederlanders ontevreden waren. De andere twee zijn religieus (strenger geloof) en politiek (centralisatie).",
     "fout": {
      "hij wilde een nieuw paleis bouwen": "Dat staat niet in de stof. Het ging om zijn <b>oorlogen</b>: die waren erg duur.",
      "de Nederlanden waren arm geworden": "Juist niet: de Nederlanden waren rijk, en dat maakte ze aantrekkelijk om te belasten.",
      "de kerk eiste meer geld van hem": "Nee. Filips had het geld nodig voor zijn eigen oorlogen, niet voor de kerk."
     }
    },
    {
     "t": "mc",
     "q": "Hoorden de Nederlanden bij Spanje?",
     "o": [
      "nee, maar ze hadden wel dezelfde heer",
      "ja, het was een Spaanse provincie",
      "ja, Spanje had de Nederlanden veroverd",
      "nee, ze hadden niets met Spanje te maken"
     ],
     "a": "nee, maar ze hadden wel dezelfde heer",
     "w": "Filips II was koning van Spanje én heer van de Nederlanden. Twee aparte gebieden, één baas.",
     "meer": "Precies daarom vonden de Nederlanders het zo raar dat er <b>Spaanse</b> edelen in hún bestuur kwamen zitten: dat hoorde er volgens hen helemaal niet bij.",
     "fout": {
      "ja, het was een Spaanse provincie": "Dit is de bekendste denkfout van dit hoofdstuk. De Nederlanden waren een eigen gebied met eigen gewesten, eigen wetten en eigen munten. Filips was toevallig van allebei de baas.",
      "ja, Spanje had de Nederlanden veroverd": "Er is geen verovering geweest. Filips kreeg de Nederlanden gewoon geërfd van zijn vader Karel V.",
      "nee, ze hadden niets met Spanje te maken": "Zó los stond het ook weer niet: ze deelden dezelfde vorst, en die stuurde Spaanse edelen hierheen om te besturen."
     }
    },
    {
     "t": "gap",
     "q": "Filips II stelde zijn halfzus ___ aan als landvoogdes van de Nederlanden.",
     "a": "Margaretha van Parma|Margaretha|Margaretha van Parma.",
     "w": "Margaretha van Parma bestuurde de Nederlanden namens Filips, die zelf in Spanje zat.",
     "meer": "Een <b>landvoogd(es)</b> is de plaatsvervanger van de vorst in alle Nederlandse gewesten. Later wordt Alva landvoogd in haar plaats."
    },
    {
     "t": "sleep",
     "opgave": "Welke reden om ontevreden te zijn over Filips II hoort bij welk soort?",
     "chips": [
      {
       "t": "Hij trad strenger op tegen protestanten",
       "bak": "religieus",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hij trad strenger op tegen protestanten\" hoort bij <b>religieus (geloof)</b>."
      },
      {
       "t": "Hij hief hoge belastingen",
       "bak": "economisch",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hij hief hoge belastingen\" hoort bij <b>economisch (geld)</b>."
      },
      {
       "t": "Hij wilde één centraal bestuur",
       "bak": "politiek",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hij wilde één centraal bestuur\" hoort bij <b>politiek (bestuur)</b>."
      },
      {
       "t": "Hij vervolgde calvinisten met bloedplakkaten",
       "bak": "religieus",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hij vervolgde calvinisten met bloedplakkaten\" hoort bij <b>religieus (geloof)</b>."
      },
      {
       "t": "Hij zette Spaanse edelen in het bestuur",
       "bak": "politiek",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hij zette Spaanse edelen in het bestuur\" hoort bij <b>politiek (bestuur)</b>."
      },
      {
       "t": "Zijn oorlogen kostten veel geld",
       "bak": "economisch",
       "waarom": "Kijk nog eens naar het kernwoord: \"Zijn oorlogen kostten veel geld\" hoort bij <b>economisch (geld)</b>."
      }
     ],
     "bakjes": [
      {
       "id": "religieus",
       "label": "religieus (geloof)",
       "som": ""
      },
      {
       "id": "economisch",
       "label": "economisch (geld)",
       "som": ""
      },
      {
       "id": "politiek",
       "label": "politiek (bestuur)",
       "som": ""
      }
     ],
     "w": "Geloof → religieus. Geld → economisch. Bestuur en macht → politiek. Dit sorteren komt op het SO terug."
    },
    {
     "t": "mc",
     "q": "Wie was de vader van Filips II?",
     "o": [
      "Karel V",
      "Filips de Goede",
      "Maximiliaan I",
      "Willem van Oranje"
     ],
     "a": "Karel V",
     "w": "Filips II volgde in 1555 zijn vader Karel V op.",
     "meer": "Karel V trad in 1555 af en gaf de Nederlanden en Spanje aan zijn zoon.",
     "fout": {
      "Filips de Goede": "Filips de Goede is een Bourgondische hertog uit de 15e eeuw (4.2), meer dan honderd jaar eerder.",
      "Maximiliaan I": "Maximiliaan is de overgrootvader. Hij trouwde in 1477 met Maria van Bourgondië.",
      "Willem van Oranje": "Willem was een Nederlandse edelman en werd juist de leider van de Opstand tegen Filips."
     }
    },
    {
     "t": "gap",
     "q": "Filips II volgde zijn vader op in het jaar ___.",
     "a": "1555|in 1555",
     "w": "1555: Karel V treedt af, Filips II wordt koning van Spanje en heer van de Nederlanden.",
     "meer": "Datzelfde jaar is ook de Vrede van Augsburg (3.5 en 4.3). Twee keer 1555, twee keer Karel V."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Het werkboek vraagt bij opdracht 1a naar <b>continuïteit</b> en <b>verandering</b>. Die twee woorden betekenen:",
    "<b>Continuïteit</b> = iets <i>blijft hetzelfde</i> als Filips II zijn vader opvolgt.<br><b>Verandering</b> = iets wordt <i>anders</i> dan onder Karel V.",
    "<b>Wat bleef hetzelfde:</b> de centralisatiepolitiek, het vervolgen van protestanten met plakkaten en de inquisitie, en het besturen via een landvoogd(es).",
    "<b>Wat veranderde:</b> Filips trad véél strenger op tegen protestanten, hij hief hogere belastingen, hij zette <b>Spaanse</b> edelen in het bestuur, en hij woonde zelf in Spanje, terwijl Karel V hier was opgegroeid en Nederlands sprak."
   ],
   "regel": "Continuïteit = blijft hetzelfde (centralisatie, vervolging). Verandering = wordt anders (strenger, duurder, Spaanser, en een koning op afstand).",
   "vragen": [
    {
     "t": "mc",
     "q": "Welk voorbeeld is <b>continuïteit</b> tussen Karel V en Filips II?",
     "o": [
      "allebei wilden ze centralisatie doorvoeren",
      "Filips hief hogere belastingen dan zijn vader",
      "Filips woonde in Spanje en Karel V hier",
      "Filips zette Spaanse edelen in het bestuur"
     ],
     "a": "allebei wilden ze centralisatie doorvoeren",
     "w": "Centralisatie was al het plan van Karel V; Filips zette het gewoon voort. Dat blijft dus hetzelfde.",
     "meer": "Handige check: staat er in het antwoord een woord als <i>hogere</i>, <i>strenger</i> of <i>anders dan</i>? Dan is het verandering, geen continuïteit.",
     "fout": {
      "Filips hief hogere belastingen dan zijn vader": "Het woordje <i>hogere</i> verraadt het al: dit is juist een <b>verandering</b>.",
      "Filips woonde in Spanje en Karel V hier": "Dat is een duidelijk verschil tussen die twee, dus <b>verandering</b>.",
      "Filips zette Spaanse edelen in het bestuur": "Nieuw onder Filips, dus <b>verandering</b>. Karel V was hier opgegroeid en gebruikte Nederlandse edelen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom viel het de Nederlanders extra op dat Filips II in Spanje woonde?",
     "o": [
      "hij kende de Nederlanden niet en stuurde Spanjaarden om te besturen",
      "hij kwam zelf nooit naar de Nederlanden om belasting op te halen",
      "hij sprak geen enkele taal die hier gesproken werd",
      "hij had de Nederlanden nooit geërfd"
     ],
     "a": "hij kende de Nederlanden niet en stuurde Spanjaarden om te besturen",
     "w": "Een vorst op afstand, met vreemde bestuurders: dat voelde als buitenstaanders die het hier voor het zeggen kregen.",
     "meer": "Het Smeekschrift klaagt daar later letterlijk over: over de vele <i>vreemdelingen in het landsbestuur</i> die alleen op eigen voordeel uit zouden zijn.",
     "fout": {
      "hij sprak geen enkele taal die hier gesproken werd": "Het ging niet om de taal, maar om het <b>bestuur</b>: Spaanse edelen op Nederlandse posten.",
      "hij had de Nederlanden nooit geërfd": "Hij had ze wél geërfd, van Karel V. Dat was juist waarom hij hier de baas was.",
      "hij kwam zelf nooit naar de Nederlanden om belasting op te halen": "Integendeel, de belastingen gingen juist omhoog."
     }
    },
    {
     "t": "mc",
     "q": "Karel V vervolgde ook al protestanten. Wat was er dan anders onder Filips II?",
     "o": [
      "Filips deed het veel strenger en zag het als zijn persoonlijke opdracht",
      "Filips begon er pas mee; zijn vader Karel V liet de protestanten altijd met rust",
      "Filips stopte juist met vervolgen om rust te krijgen",
      "Filips liet het helemaal aan Margaretha over"
     ],
     "a": "Filips deed het veel strenger en zag het als zijn persoonlijke opdracht",
     "w": "De vervolging zelf is continuïteit; de <b>hardheid</b> ervan is de verandering.",
     "meer": "Karel V had de bloedplakkaten al in 1550 ingevoerd. Filips scherpte de uitvoering aan en zag zichzelf als leider van de strijd tegen het protestantisme.",
     "fout": {
      "Filips stopte juist met vervolgen om rust te krijgen": "Dat deed <b>Margaretha van Parma</b> even, op eigen gezag, na het Smeekschrift. Filips was daar woedend over.",
      "Filips liet het helemaal aan Margaretha over": "Zij voerde het uit, maar het strengere beleid kwam van Filips zelf.",
      "Filips begon er pas mee; zijn vader Karel V liet de protestanten altijd met rust": "Nee, Karel V vaardigde de bloedplakkaten al uit. Daarom is vervolging juist een voorbeeld van continuïteit."
     }
    },
    {
     "t": "gap",
     "q": "Bijzondere rechten van een gewest of stad, die bij centralisatie op het spel stonden, heten ___.",
     "a": "privileges|privilege|voorrechten",
     "w": "Privileges: bijzondere rechten die de heer aan een stad of gewest gaf, bijvoorbeeld zelf over belasting beslissen.",
     "meer": "Het streven om die zelfstandigheid te behouden heeft ook een naam: <b>particularisme</b>."
    },
    {
     "t": "sleep",
     "opgave": "Continuïteit of verandering ten opzichte van Karel V?",
     "chips": [
      {
       "t": "Protestanten vervolgen met plakkaten",
       "bak": "continu",
       "waarom": "Kijk nog eens naar het kernwoord: \"Protestanten vervolgen met plakkaten\" hoort bij <b>continuïteit (blijft hetzelfde)</b>."
      },
      {
       "t": "Besturen via een landvoogd(es)",
       "bak": "continu",
       "waarom": "Kijk nog eens naar het kernwoord: \"Besturen via een landvoogd(es)\" hoort bij <b>continuïteit (blijft hetzelfde)</b>."
      },
      {
       "t": "Streven naar centralisatie",
       "bak": "continu",
       "waarom": "Kijk nog eens naar het kernwoord: \"Streven naar centralisatie\" hoort bij <b>continuïteit (blijft hetzelfde)</b>."
      },
      {
       "t": "Spaanse edelen in het bestuur zetten",
       "bak": "verandering",
       "waarom": "Kijk nog eens naar het kernwoord: \"Spaanse edelen in het bestuur zetten\" hoort bij <b>verandering (wordt anders)</b>."
      },
      {
       "t": "Nog hogere belastingen heffen",
       "bak": "verandering",
       "waarom": "Kijk nog eens naar het kernwoord: \"Nog hogere belastingen heffen\" hoort bij <b>verandering (wordt anders)</b>."
      },
      {
       "t": "Een vorst die zelf in Spanje woont",
       "bak": "verandering",
       "waarom": "Kijk nog eens naar het kernwoord: \"Een vorst die zelf in Spanje woont\" hoort bij <b>verandering (wordt anders)</b>."
      }
     ],
     "bakjes": [
      {
       "id": "continu",
       "label": "continuïteit (blijft hetzelfde)",
       "som": ""
      },
      {
       "id": "verandering",
       "label": "verandering (wordt anders)",
       "som": ""
      }
     ],
     "w": "Vraag je steeds af: deed Karel V dit óók al? Ja → continuïteit. Nee, of veel heviger → verandering."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Geef aan de hand van het begrip 'centralisatie' een reden waarom de Nederlandse edelen ontevreden zijn over Filips II. (2p)",
     "tip": "Begin met wat het begrip betekent. Daarna pas het voorbeeld: wat deed Filips, en wat raakten de edelen daardoor kwijt?",
     "model": [
      {
       "label": "Begrip voorop",
       "tekst": "Centralisatie is het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels."
      },
      {
       "label": "Wat er gebeurde",
       "tekst": "Filips II wilde de centralisatie van zijn vader Karel V voortzetten en zette Spaanse edelen in het bestuur."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor waren de Nederlandse edelen bang hun privileges en hun plek in het bestuur kwijt te raken."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg eerst uit wat centralisatie betekent (één bestuur, overal dezelfde wetten).",
       "woorden": [
        "centralis",
        "zelfde",
        "één bestuur",
        "een bestuur"
       ]
      },
      {
       "t": "Ik noem wat Filips II deed.",
       "woorden": [
        "filips"
       ]
      },
      {
       "t": "Ik leg het verband: de edelen verliezen daardoor privileges of macht.",
       "woorden": [
        "privilege",
        "macht",
        "kwijt",
        "verliez"
       ]
      }
     ],
     "w": "Begripsvraag = eerst de betekenis, dan het voorbeeld, dan het gevolg voor de edelen.",
     "meer": "Veel leerlingen schrijven alleen 'ze wilden hun privileges houden'. Dat is maar de helft: je moet het begrip zelf uitleggen, want daar vraagt de vraag om."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Nu de lastigste vraag van deze paragraaf (opdracht 1b in het werkboek): <b>waarom lukte het Filips II niet om het aantal protestanten te verminderen?</b>",
    "Het antwoord is een <b>boemerang</b>. Filips pakte de protestanten hard aan met <b>bloedplakkaten</b> (gedrukte wetten tegen ketters) en de <b>inquisitie</b> (de kerkelijke rechtbank die ketterij opspoorde). Mensen werden opgepakt en soms terechtgesteld.",
    "Maar juist dóór die harde vervolging keerden steeds méér mensen zich af van de katholieke kerk. Wie zag hoe hard er werd opgetreden, kreeg sympathie voor de slachtoffers en een hekel aan de kerk die het deed.",
    "Onthoud dit patroon: <b>harder ingrijpen → groter verzet</b>. Je komt het in deze paragraaf nog drie keer tegen (bij Margaretha, bij Alva, en bij de moord op Willem van Oranje)."
   ],
   "regel": "Hoe harder Filips vervolgde, hoe meer mensen zich van de katholieke kerk afkeerden. Het middel werkte averechts.",
   "vragen": [
    {
     "t": "open",
     "q": "Noem de reden waarom het Filips II niet lukte om het aantal protestanten in de Nederlanden te verminderen.",
     "punten": 2,
     "modelantwoord": "Filips II vervolgde de protestanten heel hard, met bloedplakkaten en de inquisitie. Maar juist door die harde vervolgingen keerden steeds meer mensen zich af van de katholieke kerk. Het aantal protestanten nam daardoor niet af, maar juist toe.",
     "sleutelwoorden": [
      {
       "moet": [
        "hard",
        "streng",
        "vervolg",
        "wreed"
       ],
       "syn": [
        "fel",
        "geweld"
       ]
      },
      {
       "moet": [
        "afkeren",
        "afkeerden",
        "meer",
        "toe",
        "juist",
        "averechts"
       ],
       "syn": [
        "tegenovergestelde",
        "groeide"
       ]
      }
     ],
     "rubric": [
      "Je noemt dat Filips de protestanten hard vervolgde (plakkaten/inquisitie)",
      "Je legt uit dat mensen zich juist dáárdoor van de katholieke kerk afkeerden"
     ],
     "w": "De vervolging werkte averechts: hoe harder het optreden, hoe meer mensen afhaakten bij de katholieke kerk.",
     "meer": "Let op de formulering bij dit soort vragen: noem eerst wat Filips <i>deed</i>, en daarna het <i>effect</i> dat hij niet wilde."
    },
    {
     "t": "mc",
     "q": "Wat is een <b>bloedplakkaat</b>?",
     "o": [
      "een gedrukte wet, vooral gericht tegen ketters",
      "een doodvonnis dat de koning persoonlijk ondertekende",
      "een lijst met namen van protestanten",
      "een belasting op de handel in de Nederlanden"
     ],
     "a": "een gedrukte wet, vooral gericht tegen ketters",
     "w": "Een plakkaat is een wet op een vel papier, opgehangen op openbare plekken zodat iedereen hem kon lezen.",
     "meer": "De strenge bloedplakkaten werden voor het eerst in 1550 door Karel V uitgevaardigd. De naam komt van de harde straffen die erin stonden.",
     "fout": {
      "een doodvonnis dat de koning persoonlijk ondertekende": "Nee, het was een <b>wet</b>, geen vonnis over één persoon. Vonnissen sprak de inquisitie (en later de Raad van Beroerten) uit.",
      "een lijst met namen van protestanten": "Er stonden geen namen op. Er stonden <b>regels</b> op: wat verboden was en welke straf erop stond.",
      "een belasting op de handel in de Nederlanden": "Dat is de <b>Tiende Penning</b>, en die kwam pas later, van Alva."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de <b>inquisitie</b>?",
     "o": [
      "een rechtbank van de katholieke kerk tegen ketterij",
      "het leger dat Filips II naar de Nederlanden stuurde",
      "de vergadering van de Nederlandse gewesten",
      "de belastingdienst van de Spaanse koning"
     ],
     "a": "een rechtbank van de katholieke kerk tegen ketterij",
     "w": "Inquisitie komt van het Latijnse <i>inquisitio</i> = onderzoek. De kerk onderzocht en berechtte mensen die van het geloof afweken.",
     "meer": "Het Smeekschrift noemt de inquisitie een <i>vreemde rechtbank</i>: de Nederlanders vonden dat ze het recht hadden om níet voor zo'n rechtbank gedaagd te worden.",
     "fout": {
      "het leger dat Filips II naar de Nederlanden stuurde": "Dat leger kwam later, met de hertog van Alva. De inquisitie was een rechtbank, geen leger.",
      "de vergadering van de Nederlandse gewesten": "Dat is de Staten-Generaal.",
      "de belastingdienst van de Spaanse koning": "Nee. Bij de inquisitie ging het om <b>geloof</b>, niet om geld."
     }
    },
    {
     "t": "mc",
     "q": "Welke groep protestanten kreeg in de Nederlanden de grootste aanhang?",
     "o": [
      "de calvinisten",
      "de lutheranen",
      "de katholieken",
      "de inquisiteurs"
     ],
     "a": "de calvinisten",
     "w": "Calvinisten zijn volgelingen van Johannes Calvijn. Zij groeiden hier het snelst.",
     "meer": "Lutheranen (volgelingen van Maarten Luther) waren vooral sterk in het Heilige Roomse Rijk en Scandinavië. In de Nederlanden won het calvinisme.",
     "fout": {
      "de lutheranen": "Luther was wel de eerste (de monniken uit bron 1 volgden hém), maar in de Nederlanden werd het <b>calvinisme</b> de grootste protestantse stroming.",
      "de katholieken": "Katholieken zijn geen protestanten, dat was juist het geloof waar de protestanten zich van afsplitsten.",
      "de inquisiteurs": "Dat waren de mensen die de ketters juist opspoorden, namens de katholieke kerk."
     }
    },
    {
     "t": "gap",
     "q": "Vul het patroon aan: hoe harder Filips de protestanten vervolgde, hoe ___ mensen zich van de katholieke kerk afkeerden.",
     "a": "meer|meer mensen",
     "w": "Harder ingrijpen gaf juist een groter verzet. Dat is de boemerang van dit hoofdstuk.",
     "meer": "Ditzelfde patroon komt terug bij Alva (zijn harde hand leidde tot de Opstand) en bij de moord op Willem van Oranje (die maakte hem tot symbool)."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Met de komst van Filips II was er sprake van continuïteit en van verandering ten opzichte van Karel V. Geef van allebei een voorbeeld. (2p)",
     "tip": "Continuïteit = iets blijft hetzelfde. Verandering = iets wordt anders. Schrijf twee aparte regels en begin elke regel met het woord.",
     "model": [
      {
       "label": "Continuïteit",
       "tekst": "Continuïteit: Filips II ging net als Karel V door met de centralisatie en met de vervolging van protestanten."
      },
      {
       "label": "Verandering",
       "tekst": "Verandering: Filips II trad nog veel strenger op dan zijn vader, woonde in Spanje en zette Spaanse edelen in het bestuur."
      }
     ],
     "checklist": [
      {
       "t": "Ik geef een voorbeeld van iets dat hetzelfde bleef.",
       "woorden": [
        "hetzelfde",
        "door",
        "net als",
        "bleef",
        "ook"
       ]
      },
      {
       "t": "Ik geef een voorbeeld van iets dat anders werd.",
       "woorden": [
        "strenger",
        "spanje",
        "spaans",
        "anders",
        "nieuw"
       ]
      },
      {
       "t": "Ik zet ze op twee aparte regels, met het woord ervoor.",
       "woorden": [
        "continu",
        "verander"
       ]
      }
     ],
     "w": "Continuïteit en verandering zijn een paar: je geeft er altijd allebei één.",
     "meer": "Let op: 'strenger' is een verandering in hoe hard hij optrad, terwijl 'vervolgen' zelf bleef. Dat mag je allebei gebruiken, zolang je duidelijk zegt wat bleef en wat veranderde."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: een verbranding in Brussel",
      "tekst": "Op een houtsnede uit 1523 zie je twee monniken op een brandstapel midden op de Grote Markt van Brussel. Rondom staat een grote menigte toe te kijken. Er staan soldaten en een geestelijke vooraan.",
      "onder": "Eigen beschrijving van een prent uit 1523 (de monniken Hendrik Voes en Jan van Essen, aanhangers van Luther)."
     },
     "q": "Waarom werden zulke ketters in het openbaar terechtgesteld, midden op de markt?",
     "o": [
      "om iedereen af te schrikken die ook protestant wilde worden",
      "omdat er in de gevangenis geen plek meer was",
      "omdat de monniken dat zelf hadden gevraagd",
      "omdat de Grote Markt in Brussel bij de kerk van de paus in Rome hoorde"
     ],
     "a": "om iedereen af te schrikken die ook protestant wilde worden",
     "w": "Een openbare straf is een waarschuwing: iedereen ziet wat er gebeurt als je ketter bent.",
     "meer": "Je ziet het in de bron zelf: een <b>grote menigte</b> kijkt toe. Dat is precies het bewijs dat het om afschrikken ging. Gebruik zo'n element uit de bron, niet het onderschrift.",
     "fout": {
      "omdat er in de gevangenis geen plek meer was": "Daar staat niets over. Een terechtstelling op het marktplein met publiek is een bewuste keuze: het moest gezien worden.",
      "omdat de monniken dat zelf hadden gevraagd": "Niemand vraagt om levend verbrand te worden. De overheid koos de plek, om anderen te waarschuwen.",
      "omdat de Grote Markt in Brussel bij de kerk van de paus in Rome hoorde": "De markt is gewoon het drukste plein van de stad. Juist daarom: zoveel mogelijk mensen moesten het zien."
     }
    }
   ]
  }
 ]
},
{
 "id": "smeekschrift",
 "emoji": "📜",
 "titel": "4.4.1 · Het Smeekschrift der edelen",
 "paragraaf": "§4.4",
 "kort": "In 1566 vragen zo'n 200 lage edelen beleefd om mildheid. Margaretha luistert, en juist dáárdoor krijgt het calvinisme de ruimte.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In <b>1566</b> stappen ongeveer <b>200 lage edelen</b> naar landvoogdes Margaretha van Parma met een verzoek: het <b>Smeekschrift der edelen</b>.",
    "Ze vragen of Filips II de <b>plakkaten</b> tegen het protestantisme wil <b>verzachten</b>. Let op het woord <i>smeken</i>: het is een beleefd verzoek, geen dreigement en geen opstand. Tegenwoordig zou je het een <b>petitie</b> noemen.",
    "Margaretha is bang dat de edelen anders in opstand komen. Ze luistert, en voert <b>op eigen gezag</b> versoepelingen door, zonder dat Filips dat heeft goedgekeurd. De vervolging van ketters stopt.",
    "En dan gebeurt het onverwachte: juist door die rust <b>leeft het calvinisme op</b>. Protestanten durven naar buiten te komen. Filips II is daar allesbehalve blij mee."
   ],
   "regel": "Smeekschrift (1566) = ~200 lage edelen vragen beleefd om mildere plakkaten. Margaretha versoepelt op eigen gezag → het calvinisme leeft op.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat vroegen de edelen in het Smeekschrift?",
     "o": [
      "verzachting van de plakkaten tegen het protestantisme",
      "dat Filips II voortaan geen koning en geen heer van de Nederlanden meer zou zijn",
      "meer geld voor de Nederlandse edelen",
      "dat de Beeldenstorm gestraft zou worden"
     ],
     "a": "verzachting van de plakkaten tegen het protestantisme",
     "w": "Ze vroegen om mildheid: de wetten tegen protestanten moesten minder streng worden.",
     "meer": "Het Smeekschrift kwam op tegen de <i>vreemdelingen</i> in het bestuur, tegen de inquisitie als vreemde rechtbank, en tegen de plakkaten en geloofsvervolgingen.",
     "fout": {
      "meer geld voor de Nederlandse edelen": "Het ging niet over geld maar over <b>geloof</b>: de vervolging moest zachter.",
      "dat de Beeldenstorm gestraft zou worden": "De Beeldenstorm kwam ná het Smeekschrift, later in datzelfde jaar 1566.",
      "dat Filips II voortaan geen koning en geen heer van de Nederlanden meer zou zijn": "Dat is het <b>Plakkaat van Verlatinghe</b>, en dat kwam pas in 1581, vijftien jaar later. In 1566 wilden de edelen Filips juist behouden, maar milder."
     }
    },
    {
     "t": "mc",
     "q": "Aan wie boden de edelen het Smeekschrift aan?",
     "o": [
      "Margaretha van Parma",
      "Filips II zelf",
      "de hertog van Alva, die net met zijn leger in Brussel was aangekomen",
      "Willem van Oranje"
     ],
     "a": "Margaretha van Parma",
     "w": "Zij was landvoogdes, dus zij was hier de vertegenwoordiger van de koning.",
     "meer": "De edelen hoopten dat zij invloed had op haar halfbroer Filips II. Ze besprak het met hem, maar hij deed er niets mee.",
     "fout": {
      "Filips II zelf": "Die zat in Spanje. Daarom gingen ze naar zijn plaatsvervangster hier: de landvoogdes.",
      "Willem van Oranje": "Hij was zelf een Nederlandse edelman, geen vertegenwoordiger van de koning.",
      "de hertog van Alva, die net met zijn leger in Brussel was aangekomen": "Alva kwam pas in 1567, ná de Beeldenstorm. In 1566 was hij hier nog niet."
     }
    },
    {
     "t": "gap",
     "q": "Het Smeekschrift der edelen werd aangeboden in het jaar ___.",
     "a": "1566",
     "w": "1566 is hét jaar van deze paragraaf: eerst het Smeekschrift, daarna de Beeldenstorm.",
     "meer": "Onthoud 1566 als 'het jaar dat het knapte'. Twee gebeurtenissen, in die volgorde."
    },
    {
     "t": "mc",
     "q": "Hoeveel edelen boden het Smeekschrift ongeveer aan, en wat voor edelen waren dat?",
     "o": [
      "ongeveer 200 lage edelen",
      "ongeveer 200 hoge edelen",
      "ongeveer 20 lage edelen",
      "alle edelen van de Nederlanden"
     ],
     "a": "ongeveer 200 lage edelen",
     "w": "Ongeveer 200, en het waren <b>lage</b> edelen, niet de hoogste adel.",
     "meer": "Dat de láge adel het deed, is precies waarom Margaretha's adviseur ze minachtend <i>gueux</i> (bedelaars) noemde. Van dat scheldwoord komt het woord <b>geuzen</b>.",
     "fout": {
      "ongeveer 200 hoge edelen": "Het aantal klopt, maar het waren <b>lage</b> edelen. Hoge edelen zoals Willem van Oranje hielden zich er juist afzijdig van.",
      "ongeveer 20 lage edelen": "Het waren er veel meer: ongeveer 200. Dat aantal maakte juist indruk.",
      "alle edelen van de Nederlanden": "Zeker niet. Het was een grote groep lage edelen, maar lang niet iedereen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom luisterde Margaretha van Parma naar het Smeekschrift?",
     "o": [
      "ze was bang voor een opstand van de edelen",
      "Filips II had haar opdracht gegeven te versoepelen",
      "ze was zelf protestants geworden",
      "de inquisitie had erom gevraagd"
     ],
     "a": "ze was bang voor een opstand van de edelen",
     "w": "Angst voor onrust. Daarom versoepelde ze, en wel op eigen gezag.",
     "meer": "Dat 'op eigen gezag' is belangrijk: Filips had het niet goedgekeurd en was er achteraf woedend over.",
     "fout": {
      "Filips II had haar opdracht gegeven te versoepelen": "Juist niet. Ze deed het <b>zelf</b>, zonder zijn toestemming. Filips was er allesbehalve blij mee.",
      "ze was zelf protestants geworden": "Nee, Margaretha bleef katholiek. Het was een politieke keuze uit angst voor onrust.",
      "de inquisitie had erom gevraagd": "De inquisitie wilde juist streng blijven vervolgen."
     }
    },
    {
     "t": "mc",
     "q": "Wat gebeurde er nadat Margaretha de plakkaten versoepelde?",
     "o": [
      "het calvinisme leefde op",
      "de protestanten verlieten het land",
      "Filips II prees haar voor haar besluit",
      "de edelen kwamen meteen in opstand"
     ],
     "a": "het calvinisme leefde op",
     "w": "Door de rust durfden protestanten naar buiten te komen: het calvinisme groeide.",
     "meer": "Dat is een <b>onbedoeld gevolg</b>: Margaretha wilde rust, geen groei van het calvinisme.",
     "fout": {
      "de protestanten verlieten het land": "Juist niet: ze durfden zich nu te laten zien. Vluchten kwam later, toen Alva kwam.",
      "Filips II prees haar voor haar besluit": "Filips was er allesbehalve blij mee. Ze had het op eigen gezag gedaan.",
      "de edelen kwamen meteen in opstand": "De edelen wilden juist mildheid, en die kregen ze. De Opstand begon pas in 1568."
     }
    },
    {
     "t": "mc",
     "q": "Waar komt het woord <b>geus</b> vandaan?",
     "o": [
      "van het Franse gueux, bedelaar",
      "van de naam van de stad Gouda",
      "van het oude woord voor een gezel",
      "van een geuzenleider die Geus heette"
     ],
     "a": "van het Franse gueux, bedelaar",
     "w": "Een adviseur van Margaretha noemde de edelen minachtend gueux: bedelaars.",
     "meer": "De edelen namen het scheldwoord trots over. Zo'n woord heet nog steeds een geuzennaam.",
     "fout": {
      "van de naam van de stad Gouda": "Klinkt een beetje hetzelfde, maar het heeft er niets mee te maken. Het is Frans.",
      "van het oude woord voor een gezel": "Nee, het komt uit het Frans: gueux, bedelaar.",
      "van een geuzenleider die Geus heette": "Er was geen leider met die naam. Het was een scheldwoord dat een erenaam werd."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Het woord <b>geuzen</b> komt hier vandaan. Toen de lage edelen het Smeekschrift kwamen aanbieden, noemde een adviseur van Margaretha hen minachtend <i>gueux</i>, Frans voor <b>bedelaars</b> of schooiers.",
    "De edelen namen dat scheldwoord over als <b>erenaam</b>. Vanaf dat moment noemde iedereen die zich tegen Filips en Alva verzette zich een <b>geus</b>. Later krijg je daarvan de <b>watergeuzen</b>, die vanaf zee vechten.",
    "Zo'n scheldwoord dat je trots overneemt heet daarom nog steeds een <b>geuzennaam</b>.",
    "Kijk ook naar bron 2, de tekst van het Smeekschrift zelf. Daarin staan drie klachten: over de <b>vreemdelingen</b> in het bestuur, over de <b>inquisitie</b> als vreemde rechtbank, en over de <b>plakkaten en geloofsvervolgingen</b>."
   ],
   "regel": "Geus komt van het Franse gueux = bedelaar. Bedoeld als scheldwoord, overgenomen als erenaam.",
   "vragen": [
    {
     "t": "mc",
     "q": "Waar komt het woord <b>geuzen</b> vandaan?",
     "o": [
      "van het Franse gueux, bedelaars, een scheldwoord dat ze overnamen",
      "van de stad Den Briel, waar ze vandaan kwamen",
      "van het Spaanse woord voor een opstandeling die tegen de koning vocht",
      "van de naam van hun aanvoerder"
     ],
     "a": "van het Franse gueux, bedelaars, een scheldwoord dat ze overnamen",
     "w": "Een adviseur van Margaretha noemde de lage edelen zo bij het aanbieden van het Smeekschrift.",
     "meer": "Daarom heet zoiets tegenwoordig een <b>geuzennaam</b>: een scheldwoord dat je trots overneemt.",
     "fout": {
      "van de stad Den Briel, waar ze vandaan kwamen": "Den Briel is de stad die de watergeuzen in 1572 innamen, dat is iets heel anders dan waar de naam vandaan komt.",
      "van de naam van hun aanvoerder": "Hun bekendste leider was Willem van Oranje; daar komt de naam niet vandaan.",
      "van het Spaanse woord voor een opstandeling die tegen de koning vocht": "Het is <b>Frans</b>, niet Spaans: <i>gueux</i> = bedelaars."
     }
    },
    {
     "t": "mc",
     "q": "Welke klacht staat <b>niet</b> in het Smeekschrift (bron 2)?",
     "o": [
      "dat de belastingen te hoog zijn",
      "dat er te veel vreemdelingen in het landsbestuur zitten",
      "dat de inquisitie een vreemde rechtbank is",
      "dat de plakkaten en geloofsvervolgingen in strijd zijn met het recht"
     ],
     "a": "dat de belastingen te hoog zijn",
     "w": "Het Smeekschrift gaat over <b>geloof en bestuur</b>, niet over belasting.",
     "meer": "Hoge belastingen waren wél een reden voor ontevredenheid over Filips, maar ze staan niet in deze bron. Let bij bronvragen dus goed op wat er écht staat.",
     "fout": {
      "dat er te veel vreemdelingen in het landsbestuur zitten": "Dit staat er juist wél: over vreemdelingen die alleen op eigen voordeel uit zouden zijn.",
      "dat de inquisitie een vreemde rechtbank is": "Dit staat er wél: Nederlanders hadden vanouds het recht niet voor een vreemde rechtbank gedaagd te worden.",
      "dat de plakkaten en geloofsvervolgingen in strijd zijn met het recht": "Dit staat er wél, en zelfs in bewogen woorden."
     }
    },
    {
     "t": "mc",
     "q": "Wat deed Filips II toen hij van het Smeekschrift hoorde?",
     "o": [
      "hij ging er niet op in",
      "hij ging meteen akkoord met de verzachting",
      "hij ontsloeg Margaretha onmiddellijk",
      "hij stuurde direct de hertog van Alva"
     ],
     "a": "hij ging er niet op in",
     "w": "Margaretha besprak het met hem, maar hij deed er niets mee.",
     "meer": "Ze had de versoepelingen dus <b>zelf</b> doorgevoerd. Toen kort daarna de Beeldenstorm uitbrak, stuurde Filips wél iemand: Alva.",
     "fout": {
      "hij ging meteen akkoord met de verzachting": "Nee. De versoepeling kwam van Margaretha, op eigen gezag, niet van Filips.",
      "hij ontsloeg Margaretha onmiddellijk": "Ze legde haar functie pas neer toen Alva in 1567 kwam.",
      "hij stuurde direct de hertog van Alva": "Alva kwam pas ná de Beeldenstorm, niet meteen na het Smeekschrift."
     }
    },
    {
     "t": "gap",
     "q": "Een scheldwoord dat een groep trots overneemt als erenaam heet een ___.",
     "a": "geuzennaam|geuzen naam",
     "w": "Zoals de geuzen deden met het Franse gueux (bedelaars).",
     "meer": "Je gebruikt dit woord nog steeds in het Nederlands, juist dankzij deze geschiedenis."
    },
    {
     "t": "sleep",
     "opgave": "Stond deze klacht wél of niet in het Smeekschrift (bron 2)?",
     "chips": [
      {
       "t": "Vreemdelingen in het landsbestuur",
       "bak": "wel",
       "waarom": "Kijk nog eens naar het kernwoord: \"Vreemdelingen in het landsbestuur\" hoort bij <b>staat in het Smeekschrift</b>."
      },
      {
       "t": "De inquisitie als vreemde rechtbank",
       "bak": "wel",
       "waarom": "Kijk nog eens naar het kernwoord: \"De inquisitie als vreemde rechtbank\" hoort bij <b>staat in het Smeekschrift</b>."
      },
      {
       "t": "De plakkaten en geloofsvervolgingen",
       "bak": "wel",
       "waarom": "Kijk nog eens naar het kernwoord: \"De plakkaten en geloofsvervolgingen\" hoort bij <b>staat in het Smeekschrift</b>."
      },
      {
       "t": "De hoogte van de belastingen",
       "bak": "niet",
       "waarom": "Kijk nog eens naar het kernwoord: \"De hoogte van de belastingen\" hoort bij <b>staat er niet in</b>."
      },
      {
       "t": "De vernielingen in de kerken",
       "bak": "niet",
       "waarom": "Kijk nog eens naar het kernwoord: \"De vernielingen in de kerken\" hoort bij <b>staat er niet in</b>."
      },
      {
       "t": "De Tiende Penning van Alva",
       "bak": "niet",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Tiende Penning van Alva\" hoort bij <b>staat er niet in</b>."
      }
     ],
     "bakjes": [
      {
       "id": "wel",
       "label": "staat in het Smeekschrift",
       "som": ""
      },
      {
       "id": "niet",
       "label": "staat er niet in",
       "som": ""
      }
     ],
     "w": "Het Smeekschrift (1566) gaat over geloof en bestuur. Alles van Alva komt pas ná 1567 en kan er dus niet in staan."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Bedenk aan de hand van de titel 'Een onrustige opstand' een indirect gevolg van het Smeekschrift der edelen. Leg uit of dat gevolg bedoeld of onbedoeld was. (3p)",
     "tip": "Indirect = het gebeurt niet meteen, er zit een stap tussen. Schrijf de keten in stappen op, en eindig met 'bedoeld' of 'onbedoeld' plus waarom.",
     "model": [
      {
       "label": "Wat er gebeurde",
       "tekst": "Margaretha versoepelde na het Smeekschrift op eigen gezag de plakkaten."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor leefde het calvinisme op en kwamen er hagenpreken en de Beeldenstorm; daarna stuurde Filips Alva en begon de Opstand. Dat is het indirecte gevolg."
      },
      {
       "label": "Bedoeld of onbedoeld",
       "tekst": "Dit was onbedoeld: de edelen vroegen beleefd om mildheid, niet om een opstand of oorlog."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een gevolg dat pas later kwam (Beeldenstorm, Alva of de Opstand).",
       "woorden": [
        "beeldenstorm",
        "alva",
        "opstand",
        "oorlog"
       ]
      },
      {
       "t": "Ik laat de stap ertussen zien met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      },
      {
       "t": "Ik zeg of het bedoeld of onbedoeld was.",
       "woorden": [
        "bedoeld"
       ]
      },
      {
       "t": "Ik leg uit waarom (de edelen wilden alleen mildheid).",
       "woorden": [
        "mild",
        "beleefd",
        "verzacht",
        "wilden"
       ]
      }
     ],
     "w": "Indirect gevolg = een keten van stappen. Onbedoeld, want de edelen wilden juist rust en mildheid.",
     "meer": "Schrijf de keten op met pijlen in je hoofd: Smeekschrift, versoepeling, calvinisme groeit, Beeldenstorm, Alva, Opstand. Hoe verder in de keten, hoe indirecter."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Nu de <b>keten</b>. Dit is precies het soort redenering waar het SO punten voor geeft, en waar opdracht 3 van het werkboek over gaat.",
    "<b>Smeekschrift</b> (edelen vragen om mildheid) <b>→</b> Margaretha <b>versoepelt</b> <b>→</b> de vervolging stopt <b>→</b> het <b>calvinisme leeft op</b> <b>→</b> protestanten komen naar buiten, o.a. met <b>hagenpreken</b> <b>→</b> uiteindelijk de <b>Beeldenstorm</b>.",
    "Let op hoe raar dat eigenlijk is: de edelen wilden <b>rust</b>, en het resultaat was <b>meer onrust</b>. Dat is een <b>onbedoeld gevolg</b>.",
    "Gebruik bij dit soort antwoorden de signaalwoorden: <i>waardoor</i>, <i>daardoor</i>, <i>dit leidde ertoe dat</i>. Daarmee laat je zien dat je de verbinding snapt, en niet alleen de losse feiten."
   ],
   "regel": "Smeekschrift → versoepeling → opleving van het calvinisme → hagenpreken → Beeldenstorm. De edelen wilden rust en kregen onrust: een onbedoeld gevolg.",
   "vragen": [
    {
     "t": "open",
     "q": "Leg uit hoe het Smeekschrift der edelen uiteindelijk leidde tot méér onrust in de Nederlanden. Gebruik de woorden 'waardoor' of 'daardoor'.",
     "punten": 3,
     "modelantwoord": "De edelen vroegen in het Smeekschrift om een mildere behandeling van protestanten. Margaretha van Parma was bang voor een opstand en versoepelde de plakkaten, waardoor de vervolging van ketters stopte. Daardoor durfden de calvinisten weer naar buiten te komen en leefde het calvinisme op. Dat leidde uiteindelijk tot de hagenpreken en de Beeldenstorm.",
     "sleutelwoorden": [
      {
       "moet": [
        "versoepel",
        "milder",
        "verzacht",
        "stopte"
       ],
       "syn": [
        "soepeler",
        "minder streng"
       ]
      },
      {
       "moet": [
        "calvinis",
        "protestant"
       ],
       "syn": [
        "ketters"
       ]
      },
      {
       "moet": [
        "opleving",
        "opleefde",
        "groeide",
        "meer",
        "durfden",
        "beeldenstorm",
        "hagenpreek"
       ],
       "syn": [
        "toenam",
        "sterker"
       ]
      }
     ],
     "rubric": [
      "Je noemt dat er om verzachting werd gevraagd en dat Margaretha versoepelde",
      "Je legt uit dat het calvinisme daardoor opleefde",
      "Je verbindt dat aan de onrust die volgde (hagenpreken / Beeldenstorm)"
     ],
     "w": "De keten is: vragen om mildheid → versoepeling → opleving calvinisme → hagenpreken → Beeldenstorm.",
     "meer": "Signaalwoorden zoals <i>waardoor</i> en <i>daardoor</i> laten de nakijker zien dat je de oorzaak-gevolgketen begrijpt. Zonder die woorden lijkt het een opsomming van losse feiten."
    },
    {
     "t": "mc",
     "q": "Het Smeekschrift was bedoeld om rust te brengen, maar het leidde tot meer onrust. Hoe noem je zo'n gevolg?",
     "o": [
      "een onbedoeld gevolg",
      "een bedoeld gevolg",
      "een directe oorzaak",
      "een indirecte oorzaak"
     ],
     "a": "een onbedoeld gevolg",
     "w": "Niemand van de edelen wilde dit resultaat, en toch gebeurde het. Dat is per definitie onbedoeld.",
     "meer": "Vuistregel: <b>gevolg</b> = het komt ná de gebeurtenis. <b>Onbedoeld</b> = niemand wilde dit. Samen: onbedoeld gevolg.",
     "fout": {
      "een bedoeld gevolg": "Bedoeld zou betekenen dat de edelen méér onrust wílden. Ze wilden juist het tegenovergestelde: rust en mildheid.",
      "een directe oorzaak": "Een oorzaak komt vóór de gebeurtenis. Hier gaat het over wat er ná het Smeekschrift gebeurde, dus over een gevolg.",
      "een indirecte oorzaak": "Ook een oorzaak, dus ook fout om de tijdsvolgorde. Let op: oorzaak = ervoor, gevolg = erna."
     }
    },
    {
     "t": "mc",
     "q": "Wat is de <b>directe oorzaak</b> (de laatste druppel) voor het schrijven van het Smeekschrift?",
     "o": [
      "de harde vervolging van protestanten met de plakkaten en de inquisitie",
      "de Beeldenstorm van 1566, toen er overal kerken werden vernield",
      "de komst van de hertog van Alva",
      "de invoering van de Tiende Penning"
     ],
     "a": "de harde vervolging van protestanten met de plakkaten en de inquisitie",
     "w": "De edelen schreven het Smeekschrift juist omdat de vervolging zo hard was geworden.",
     "meer": "Check altijd de volgorde in de tijd: een oorzaak moet <b>vóór</b> de gebeurtenis liggen. Alles van Alva ligt erná en kan dus geen oorzaak zijn.",
     "fout": {
      "de komst van de hertog van Alva": "Alva kwam in 1567, dus een jaar later. Onmogelijk als oorzaak.",
      "de invoering van de Tiende Penning": "Die stelde Alva pas in 1569 voor. Ruim ná het Smeekschrift.",
      "de Beeldenstorm van 1566, toen er overal kerken werden vernield": "Die kwam ná het Smeekschrift, later in hetzelfde jaar. Een gebeurtenis die erna komt kan geen oorzaak zijn."
     }
    },
    {
     "t": "mc",
     "q": "Wat is het belangrijkste verschil tussen het Smeekschrift (1566) en het Plakkaat van Verlatinghe (1581)?",
     "o": [
      "het Smeekschrift vraagt de koning om mildheid, het Plakkaat zet hem af",
      "het Smeekschrift is van Filips, het Plakkaat van de edelen",
      "ze zijn hetzelfde, maar met een andere naam",
      "het Smeekschrift gaat alleen over belasting, het Plakkaat alleen over het geloof"
     ],
     "a": "het Smeekschrift vraagt de koning om mildheid, het Plakkaat zet hem af",
     "w": "Vijftien jaar verschil, en een wereld van verschil: eerst beleefd vragen, later de koning afzweren.",
     "meer": "Ezelsbruggetje: <b>S</b>meekschrift = <b>S</b>meken om mildheid. <b>V</b>erlatinghe = de koning <b>V</b>erlaten.",
     "fout": {
      "het Smeekschrift is van Filips, het Plakkaat van de edelen": "Allebei kwamen ze van de Nederlandse kant, niet van Filips. Het Smeekschrift van de lage edelen, het Plakkaat van de Staten-Generaal.",
      "ze zijn hetzelfde, maar met een andere naam": "Dit is een veelgemaakte fout. Ze verschillen totaal: vragen om mildheid tegenover een koning afzetten.",
      "het Smeekschrift gaat alleen over belasting, het Plakkaat alleen over het geloof": "Het Smeekschrift ging juist over geloof en bestuur, en van belasting is in geen van beide de kern."
     }
    },
    {
     "t": "gap",
     "q": "Godsdienstige bijeenkomsten in het open veld, geleid door een calvinistische predikant, heten ___.",
     "a": "hagenpreken|hagenpreek|hagepreken|hagepreek",
     "w": "Hagenpreken: kerkdiensten buiten, omdat protestanten niet meer in een kerk terechtkonden.",
     "meer": "Ze kwamen vooral op ná de versoepeling van 1566. Bron 4 laat er een zien."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron B: uit het Smeekschrift",
      "tekst": "Het Smeekschrift kwam in ronde woorden op tegen de vele vreemdelingen in het landsbestuur, tegen de inquisitie als een 'vreemde' rechtbank, en tegen de plakkaten en de geloofsvervolgingen.",
      "onder": "Eigen samenvatting, naar een historicus over Antwerpen in de tijd van de Reformatie."
     },
     "q": "Haal uit bron B twee klachten van de edelen. Geef bij elke klacht aan welk soort oorzaak het is. (2p)",
     "tip": "Zet per klacht één regel: eerst het soort (politiek, religieus, economisch of sociaal), dan de klacht in je eigen woorden of met een kort citaat.",
     "model": [
      {
       "label": "Klacht 1",
       "tekst": "Politiek: er zaten te veel vreemdelingen (Spanjaarden) in het bestuur van de Nederlanden."
      },
      {
       "label": "Klacht 2",
       "tekst": "Religieus: de plakkaten en de geloofsvervolgingen tegen de protestanten."
      },
      {
       "label": "Ook goed",
       "tekst": "Politiek: de inquisitie was een 'vreemde' rechtbank, terwijl Nederlanders het recht hadden om niet voor een vreemde rechtbank te komen."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem twee verschillende klachten uit de bron.",
       "woorden": [
        "vreemdeling",
        "inquisitie",
        "plakkat",
        "vervolg"
       ]
      },
      {
       "t": "Ik zet bij elke klacht het soort oorzaak.",
       "woorden": [
        "politiek",
        "religieus"
       ]
      },
      {
       "t": "Ik haal het uit de bron (citaat of duidelijk eigen woorden).",
       "woorden": []
      }
     ],
     "w": "Klachten uit een bron halen en sorteren: bestuur = politiek, geloof = religieus.",
     "meer": "De inquisitie is lastig: het is een rechtbank van de kerk (religieus), maar de klacht hier is dat het een vreemde rechtbank is. Dat gaat over bestuur en rechten, dus politiek."
    }
   ]
  }
 ]
},
{
 "id": "beeldenstorm",
 "emoji": "🔥",
 "titel": "4.4.2 · Hagenpreken en de Beeldenstorm",
 "paragraaf": "§4.4",
 "kort": "Protestanten kerken in het open veld en schelden op de rijke katholieke kerk. In 1566 slaat dat om in vernieling: de Beeldenstorm.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Protestanten mochten hun diensten niet meer in een kerk houden. Daarom hielden ze die in de open lucht: <b>hagenpreken</b>, geleid door een calvinistische predikant.",
    "Op die hagenpreken werden Filips II en de katholieken scherp veroordeeld. Twee verwijten kwamen steeds terug: katholieken <b>leefden niet volgens de Bijbel</b>, en ze <b>aanbaden heiligenbeelden</b> in veel te rijk versierde kerken.",
    "In <b>1566</b> sloeg dat om in daden. Groepjes calvinisten vielen doelbewust kerken en kloosters aan en sloegen de versieringen kapot. Omdat vooral <b>heiligenbeelden</b> het moesten ontgelden, heet dit de <b>Beeldenstorm</b>.",
    "Belangrijk: het ging om <b>spullen</b>, niet om mensen. Het was geen veldslag. Binnen een paar maanden trok de Beeldenstorm door het <b>westelijk deel</b> van de Nederlanden."
   ],
   "regel": "Hagenpreek = kerkdienst in het open veld. Beeldenstorm (1566) = calvinisten slaan kerkversieringen en heiligenbeelden kapot.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat gebeurde er tijdens de Beeldenstorm?",
     "o": [
      "kerken en kloosters werden van hun katholieke versieringen ontdaan",
      "protestanten en katholieken vochten een veldslag uit",
      "de Spaanse soldaten van Filips II vernielden overal de protestantse kerken",
      "de koning liet alle beelden uit de kerken halen"
     ],
     "a": "kerken en kloosters werden van hun katholieke versieringen ontdaan",
     "w": "Beelden, altaren, pilaren en raamschilderingen gingen kapot. Het ging om voorwerpen.",
     "meer": "Bron 5 beschrijft het precies zo: tussen augustus en oktober 1566 raken kerkinterieurs vaak onherstelbaar beschadigd.",
     "fout": {
      "protestanten en katholieken vochten een veldslag uit": "Dit is een veelgemaakte fout. De Beeldenstorm was <b>vernieling van spullen</b>, geen gevecht tussen legers. De doden vielen pas daarna, door de Raad van Beroerten van Alva.",
      "de koning liet alle beelden uit de kerken halen": "Filips II was juist woedend over de Beeldenstorm. Hij was zelf overtuigd katholiek.",
      "de Spaanse soldaten van Filips II vernielden overal de protestantse kerken": "Precies andersom: het waren <b>calvinisten</b> die <b>katholieke</b> kerken vernielden."
     }
    },
    {
     "t": "mc",
     "q": "Wat is een <b>hagenpreek</b>?",
     "o": [
      "een godsdienstige bijeenkomst in het open veld",
      "een preek in de kerk waarin de koning en de paus worden geprezen",
      "een rechtszaak tegen ketters",
      "een vergadering van de Nederlandse edelen"
     ],
     "a": "een godsdienstige bijeenkomst in het open veld",
     "w": "Buiten kerken, want protestanten konden nergens anders terecht. Geleid door een calvinistische predikant.",
     "meer": "Waar het woord vandaan komt is niet zeker, misschien van de hagen of heggen waartussen zo'n dienst werd gehouden.",
     "fout": {
      "een rechtszaak tegen ketters": "Dat is de inquisitie (en later de Raad van Beroerten).",
      "een vergadering van de Nederlandse edelen": "Nee, dit was een <b>kerkdienst</b>, voor gewone gelovigen.",
      "een preek in de kerk waarin de koning en de paus worden geprezen": "Integendeel: op hagenpreken werden Filips II en de katholieken juist scherp veroordeeld."
     }
    },
    {
     "t": "gap",
     "q": "De Beeldenstorm vond plaats in het jaar ___.",
     "a": "1566",
     "w": "1566, hetzelfde jaar als het Smeekschrift, maar wel eráchter.",
     "meer": "Volgorde binnen 1566: eerst het Smeekschrift, dan de versoepeling, dan de hagenpreken, dan de Beeldenstorm."
    },
    {
     "t": "mc",
     "q": "Welk verwijt maakten de calvinisten aan de katholieken?",
     "o": [
      "dat ze niet volgens de Bijbel leefden en heiligenbeelden aanbaden",
      "dat ze te weinig belasting betaalden",
      "dat ze in het open veld kerkten",
      "dat ze de koning en zijn landvoogdes niet meer wilden gehoorzamen"
     ],
     "a": "dat ze niet volgens de Bijbel leefden en heiligenbeelden aanbaden",
     "w": "Twee verwijten: niet Bijbels leven, en beelden aanbidden in overdadig versierde kerken.",
     "meer": "Dat tweede verwijt verklaart meteen waaróm juist de <b>beelden</b> het doelwit werden bij de Beeldenstorm.",
     "fout": {
      "dat ze te weinig belasting betaalden": "Het ging om <b>geloof</b>, niet om geld. Wel waren de calvinisten boos over de rijkdom van de kerk.",
      "dat ze in het open veld kerkten": "Dat deden de calvinisten zelf, noodgedwongen, want ze mochten de kerken niet in.",
      "dat ze de koning en zijn landvoogdes niet meer wilden gehoorzamen": "De katholieken waren juist trouw aan de koning. Dat was het probleem niet."
     }
    },
    {
     "t": "sleep",
     "opgave": "Hoort dit bij de calvinisten of bij de katholieken?",
     "chips": [
      {
       "t": "Hagenpreken in het open veld",
       "bak": "calv",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hagenpreken in het open veld\" hoort bij <b>calvinisten (protestant)</b>."
      },
      {
       "t": "Volgelingen van Johannes Calvijn",
       "bak": "calv",
       "waarom": "Kijk nog eens naar het kernwoord: \"Volgelingen van Johannes Calvijn\" hoort bij <b>calvinisten (protestant)</b>."
      },
      {
       "t": "Vernielden kerkversieringen in 1566",
       "bak": "calv",
       "waarom": "Kijk nog eens naar het kernwoord: \"Vernielden kerkversieringen in 1566\" hoort bij <b>calvinisten (protestant)</b>."
      },
      {
       "t": "Heiligenbeelden in de kerk",
       "bak": "kath",
       "waarom": "Kijk nog eens naar het kernwoord: \"Heiligenbeelden in de kerk\" hoort bij <b>katholieken</b>."
      },
      {
       "t": "Rijk versierde kerkgebouwen",
       "bak": "kath",
       "waarom": "Kijk nog eens naar het kernwoord: \"Rijk versierde kerkgebouwen\" hoort bij <b>katholieken</b>."
      },
      {
       "t": "Het geloof van Filips II",
       "bak": "kath",
       "waarom": "Kijk nog eens naar het kernwoord: \"Het geloof van Filips II\" hoort bij <b>katholieken</b>."
      }
     ],
     "bakjes": [
      {
       "id": "calv",
       "label": "calvinisten (protestant)",
       "som": ""
      },
      {
       "id": "kath",
       "label": "katholieken",
       "som": ""
      }
     ],
     "w": "Calvinisten: sober, buiten, tegen beelden. Katholieken: rijke kerken, heiligenbeelden, het geloof van de koning."
    },
    {
     "t": "mc",
     "q": "In welke maanden van 1566 was de Beeldenstorm?",
     "o": [
      "augustus tot oktober",
      "januari tot en met maart",
      "het hele jaar door",
      "alleen op 1 april"
     ],
     "a": "augustus tot oktober",
     "w": "Tussen augustus en oktober 1566 werden veel kerken vernield.",
     "meer": "Binnen een paar maanden raasde hij over vooral het westen van de Nederlanden.",
     "fout": {
      "januari tot en met maart": "In het voorjaar van 1566 kwam eerst het Smeekschrift. De Beeldenstorm begon pas in de zomer.",
      "het hele jaar door": "Nee, hij duurde maar een paar maanden, van augustus tot oktober.",
      "alleen op 1 april": "1 april is Den Briel, in 1572. Dat is een andere gebeurtenis."
     }
    },
    {
     "t": "mc",
     "q": "Waarom moesten de protestanten hun diensten in de open lucht houden?",
     "o": [
      "Filips II had protestants geloven verboden",
      "de kerken in de steden waren veel te klein",
      "in de zomer vonden ze dat gewoon fijner",
      "de paus had dat zo voor hen bepaald"
     ],
     "a": "Filips II had protestants geloven verboden",
     "w": "In de kerk mocht het niet, dus preekten ze in het veld: hagenpreken.",
     "meer": "Dat is de oorzaak van de hagenpreken, en een religieuze oorzaak.",
     "fout": {
      "de kerken in de steden waren veel te klein": "Het ging niet om ruimte. Protestantse diensten waren gewoon verboden.",
      "in de zomer vonden ze dat gewoon fijner": "Het weer was niet de reden. Het was verboden in de kerk.",
      "de paus had dat zo voor hen bepaald": "Het verbod kwam van Filips II met zijn plakkaten, niet van een regel van de paus."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "De Beeldenstorm kwam niet uit de lucht vallen. Er waren <b>meerdere oorzaken</b> tegelijk, dat heet <b>multicausaal</b>, en historici vinden dat juist het interessante eraan.",
    "<b>Religieuze oorzaken:</b> de calvinisten vonden dat katholieken niet volgens de Bijbel leefden en dat het aanbidden van heiligenbeelden niet hoorde. Op de hagenpreken werd die boosheid steeds verder opgestookt.",
    "<b>Economische oorzaak:</b> de calvinisten waren ook boos op de <b>rijkdom</b> van de katholieke kerk, al dat goud en zilver, terwijl gewone mensen het zwaar hadden.",
    "<b>Politieke aanloop:</b> door de versoepeling na het Smeekschrift werd er niet meer vervolgd. Daardoor durfden de calvinisten zich openlijk te laten zien, en uiteindelijk toe te slaan."
   ],
   "regel": "De Beeldenstorm had meerdere oorzaken tegelijk: religieuze (Bijbel, beelden), economische (rijkdom van de kerk) en de ruimte die de versoepeling gaf.",
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Sorteer: is dit een oorzaak of een gevolg van de Beeldenstorm?",
     "chips": [
      {
       "t": "Hagenpreken stoken de boosheid op",
       "bak": "oorzaak",
       "waarom": "Kijk nog eens naar het kernwoord: \"Hagenpreken stoken de boosheid op\" hoort bij <b>oorzaak (kwam ervóór)</b>."
      },
      {
       "t": "Calvinisten zijn boos op de rijkdom van de kerk",
       "bak": "oorzaak",
       "waarom": "Kijk nog eens naar het kernwoord: \"Calvinisten zijn boos op de rijkdom van de kerk\" hoort bij <b>oorzaak (kwam ervóór)</b>."
      },
      {
       "t": "De versoepeling van de plakkaten geeft ruimte",
       "bak": "oorzaak",
       "waarom": "Kijk nog eens naar het kernwoord: \"De versoepeling van de plakkaten geeft ruimte\" hoort bij <b>oorzaak (kwam ervóór)</b>."
      },
      {
       "t": "Filips II stuurt de hertog van Alva",
       "bak": "gevolg",
       "waarom": "Kijk nog eens naar het kernwoord: \"Filips II stuurt de hertog van Alva\" hoort bij <b>gevolg (kwam erná)</b>."
      },
      {
       "t": "De Raad van Beroerten wordt opgericht",
       "bak": "gevolg",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Raad van Beroerten wordt opgericht\" hoort bij <b>gevolg (kwam erná)</b>."
      },
      {
       "t": "Margaretha van Parma legt haar functie neer",
       "bak": "gevolg",
       "waarom": "Kijk nog eens naar het kernwoord: \"Margaretha van Parma legt haar functie neer\" hoort bij <b>gevolg (kwam erná)</b>."
      }
     ],
     "bakjes": [
      {
       "id": "oorzaak",
       "label": "oorzaak (kwam ervóór)",
       "som": ""
      },
      {
       "id": "gevolg",
       "label": "gevolg (kwam erná)",
       "som": ""
      }
     ],
     "w": "Zet alles op de tijdlijn. Wat vóór 1566 speelt is oorzaak; alles wat met Alva te maken heeft komt erna en is dus gevolg."
    },
    {
     "t": "mc",
     "q": "Wat was een <b>economische</b> oorzaak van de Beeldenstorm?",
     "o": [
      "de calvinisten waren boos op de rijkdom van de katholieke kerk",
      "de Tiende Penning maakte alles duurder",
      "de gewesten wilden hun privileges houden en geen centraal bestuur",
      "de hagenpreken werden in het open veld gehouden"
     ],
     "a": "de calvinisten waren boos op de rijkdom van de katholieke kerk",
     "w": "Rijkdom en geld → economisch. De pracht en praal van de kerken stak.",
     "meer": "Let op: dezelfde gebeurtenis kan oorzaken van meerdere soorten hebben. De Beeldenstorm had religieuze én economische oorzaken.",
     "fout": {
      "de Tiende Penning maakte alles duurder": "Wel economisch, maar de Tiende Penning kwam pas in 1569, ná de Beeldenstorm. Een gebeurtenis die later komt kan geen oorzaak zijn.",
      "de hagenpreken werden in het open veld gehouden": "Dat is een <b>religieuze</b> oorzaak, geen economische.",
      "de gewesten wilden hun privileges houden en geen centraal bestuur": "Dat is een <b>politieke</b> kwestie, en het gaat over het conflict met Filips in het algemeen, niet over de Beeldenstorm."
     }
    },
    {
     "t": "mc",
     "q": "Wat was een direct <b>politiek gevolg</b> van de Beeldenstorm?",
     "o": [
      "Margaretha van Parma legde haar functie als landvoogdes neer",
      "de calvinisten kregen daarna nog veel meer aanhang in de steden",
      "de kerken werden opnieuw ingericht",
      "de hagenpreken begonnen"
     ],
     "a": "Margaretha van Parma legde haar functie als landvoogdes neer",
     "w": "Toen Alva kwam, trad zij af. Dat is een verandering in het <b>bestuur</b>, dus politiek.",
     "meer": "Voor haar was dit een <b>onbedoeld gevolg</b>: zij had de versoepeling juist doorgevoerd om onrust te voorkomen, en verloor er uiteindelijk haar functie door.",
     "fout": {
      "de kerken werden opnieuw ingericht": "Dat staat niet in de stof, en het is geen gevolg dat over bestuur gaat.",
      "de hagenpreken begonnen": "Die waren er al vóór de Beeldenstorm, het was juist een van de oorzaken.",
      "de calvinisten kregen daarna nog veel meer aanhang in de steden": "Dat gebeurde vooral vóór en tijdens 1566, en het is bovendien een <b>religieus</b> gevolg, geen politiek."
     }
    },
    {
     "t": "gap",
     "q": "In een paar maanden trok de Beeldenstorm door het ___ deel van de Nederlanden.",
     "a": "westelijk|westelijke|westen|west",
     "w": "Het westelijk deel. De storm begon in het zuiden en trok razendsnel verder.",
     "meer": "De allereerste vernielingen waren op 10 augustus 1566 bij Steenvoorde, in de zuidelijke Nederlanden, na een hagenpreek."
    },
    {
     "t": "mc",
     "q": "Waarom gaf juist de <b>versoepeling</b> van Margaretha ruimte aan de Beeldenstorm?",
     "o": [
      "omdat de vervolging stopte, durfden calvinisten openlijk naar buiten te komen",
      "omdat zij zelf opdracht gaf om alle beelden uit de kerken te laten verwijderen",
      "omdat de calvinisten daardoor katholiek werden",
      "omdat er geen soldaten meer in de Nederlanden waren"
     ],
     "a": "omdat de vervolging stopte, durfden calvinisten openlijk naar buiten te komen",
     "w": "Geen vervolging meer = minder angst = zichtbaarder, groter en brutaler.",
     "meer": "Dit is het tweede voorbeeld van de boemerang in dit hoofdstuk: een maatregel die bedoeld was om rust te brengen, bracht juist onrust.",
     "fout": {
      "omdat de calvinisten daardoor katholiek werden": "Het omgekeerde gebeurde: het calvinisme leefde juist op.",
      "omdat er geen soldaten meer in de Nederlanden waren": "Dat staat niet in de stof. Het ging om het stoppen van de <b>vervolging</b>, niet om het weghalen van een leger.",
      "omdat zij zelf opdracht gaf om alle beelden uit de kerken te laten verwijderen": "Beslist niet. Margaretha was katholiek; de vernielingen kwamen van calvinistische groepen, niet van het bestuur."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron C: een dienst buiten de stad",
      "tekst": "Op een prent zie je honderden mensen in een weiland buiten de stadsmuur. Een man staat op een kar en preekt uit een boek. Aan de rand staan mannen met stokken en geweren op wacht.",
      "onder": "Eigen beschrijving van een prent over 1566."
     },
     "q": "Welk begrip past het best bij bron C?",
     "o": [
      "hagenpreek",
      "Beeldenstorm",
      "Raad van Beroerten",
      "Smeekschrift der edelen"
     ],
     "a": "hagenpreek",
     "w": "Een godsdienstige bijeenkomst in het open veld, geleid door een calvinistische predikant: dat is een hagenpreek.",
     "meer": "Het bewijs zit in de bron zelf: een preek, buiten de stad, in een weiland. De wachters laten zien dat het verboden en gevaarlijk was.",
     "fout": {
      "Beeldenstorm": "Bij de Beeldenstorm worden kerken van binnen vernield. Hier wordt niets kapotgemaakt: er wordt gepreekt, buiten.",
      "Raad van Beroerten": "Dat is de rechtbank van Alva (1567). In de bron zie je geen rechters maar een preek in het veld.",
      "Smeekschrift der edelen": "Het Smeekschrift is een brief die edelen aan Margaretha gaven. Een preek in een weiland is iets anders."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij de bronnen 4 en 5 vraagt het werkboek steeds: <b>welk begrip past het beste bij deze bron?</b> Dat is een vaste vraagvorm, en je scoort er alleen op als je het <b>uitlegt</b>.",
    "De aanpak in drie stappen: <b>1)</b> noem het begrip, <b>2)</b> geef de betekenis, <b>3)</b> wijs aan wát je op de bron ziet waardoor het klopt.",
    "Bron 4 (kerkdienst in de open lucht) → <b>hagenpreek</b>: je ziet mensen buiten in het veld luisteren naar een predikant, en dat is precies wat een hagenpreek is.",
    "Bron 5 (vernieling van een katholieke kerk) → <b>Beeldenstorm</b>: je ziet hoe het interieur van een kerk wordt kapotgeslagen, altaren, beelden en ramen."
   ],
   "regel": "Bronvraag? Noem het begrip, geef de betekenis, en wijs aan wat je op de bron ziet. Alle drie, anders mis je punten.",
   "vragen": [
    {
     "t": "open",
     "q": "Bron 5 laat zien hoe het interieur van een katholieke kerk wordt vernield. Leg uit welk begrip het beste bij deze bron past.",
     "punten": 2,
     "modelantwoord": "Het begrip dat het beste past is de Beeldenstorm. Dat is de uitbarsting van geweld onder het calvinistische volk in 1566, waarbij kerken en kloosters werden ontdaan van hun katholieke versieringen. Op de bron zie je precies dat gebeuren: het kerkinterieur wordt kapotgeslagen, met altaren, heiligenbeelden en raamschilderingen.",
     "sleutelwoorden": [
      {
       "moet": [
        "beeldenstorm"
       ],
       "syn": []
      },
      {
       "moet": [
        "1566",
        "versiering",
        "beelden",
        "kerk",
        "vernield",
        "kapot"
       ],
       "syn": [
        "kloosters",
        "interieur"
       ]
      }
     ],
     "rubric": [
      "Je noemt het begrip Beeldenstorm",
      "Je geeft de betekenis én wijst aan wat je op de bron ziet"
     ],
     "w": "Beeldenstorm: 1566, calvinisten ontdoen kerken en kloosters van katholieke versieringen, precies wat de bron toont.",
     "meer": "Bij 'welk begrip past bij deze bron' is de betekenis geven én het bewijs uit de bron aanwijzen samen goed voor de punten. Alleen het woord noemen levert bijna niets op."
    },
    {
     "t": "mc",
     "q": "Welk <b>onbedoeld gevolg</b> had de Beeldenstorm voor de protestanten zelf?",
     "o": [
      "Filips stuurde Alva, die hen juist harder ging vervolgen",
      "ze mochten voortaan gewoon in de katholieke kerken hun eigen diensten houden",
      "de plakkaten werden verder versoepeld",
      "Margaretha van Parma werd protestant"
     ],
     "a": "Filips stuurde Alva, die hen juist harder ging vervolgen",
     "w": "De protestanten wilden hun onvrede tonen; het resultaat was een landvoogd die genadeloos optrad.",
     "meer": "Bedoeld gevolg voor de protestanten: de katholieke pracht verdween uit die kerken. Onbedoeld gevolg: de Raad van Beroerten en jarenlange vervolging.",
     "fout": {
      "de plakkaten werden verder versoepeld": "De versoepeling was juist voorbij. Na de Beeldenstorm volgde de hardste periode van allemaal.",
      "Margaretha van Parma werd protestant": "Dat gebeurde niet. Ze legde haar functie neer toen Alva kwam.",
      "ze mochten voortaan gewoon in de katholieke kerken hun eigen diensten houden": "Het tegenovergestelde gebeurde. Alva kreeg juist de opdracht het katholieke geloof op te leggen, desnoods met geweld."
     }
    },
    {
     "t": "mc",
     "q": "Waarom kun je zeggen dat de Beeldenstorm de <b>aanleiding</b> was voor de komst van Alva?",
     "o": [
      "het was de laatste druppel waardoor Filips II direct ingreep",
      "het was een oorzaak die al jaren op de achtergrond speelde, sinds Karel V",
      "Alva was al onderweg voordat het gebeurde",
      "Alva kwam om de kerken te herstellen"
     ],
     "a": "het was de laatste druppel waardoor Filips II direct ingreep",
     "w": "Aanleiding = directe oorzaak = de laatste druppel. Filips hoorde het en stuurde meteen zijn beste generaal.",
     "meer": "De <b>indirecte</b> oorzaken speelden al veel langer: de groei van het calvinisme, de belastingen en het conflict over centralisatie.",
     "fout": {
      "Alva was al onderweg voordat het gebeurde": "Nee. Filips stuurde hem juist als reactie op de Beeldenstorm.",
      "Alva kwam om de kerken te herstellen": "Hij kwam met drie andere opdrachten: straffen, het katholieke geloof opleggen en centraal bestuur instellen.",
      "het was een oorzaak die al jaren op de achtergrond speelde, sinds Karel V": "Dat is de omschrijving van een <b>indirecte</b> oorzaak. De Beeldenstorm was juist één concrete gebeurtenis waar Filips meteen op reageerde."
     }
    },
    {
     "t": "gap",
     "q": "Vul in: de Beeldenstorm was de ___ (= directe oorzaak, de laatste druppel) voor de komst van Alva.",
     "a": "aanleiding|directe oorzaak",
     "w": "Aanleiding is een ander woord voor directe oorzaak: de druppel die de emmer doet overlopen.",
     "meer": "Op het SO kun je beide woorden gebruiken, maar wees consequent en leg uit waarom het de laatste druppel was."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "bron": {
      "titel": "Bron D: een vernielde kerk",
      "tekst": "Een prent laat de binnenkant van een kerk zien. Mannen slaan met hamers beelden van hun voetstuk, een raam met gekleurd glas ligt in scherven en een schilderij wordt naar buiten gedragen.",
      "onder": "Eigen beschrijving van een prent over augustus 1566."
     },
     "q": "Geef een bedoeld en een onbedoeld gevolg voor de protestanten van de gebeurtenis in bron D. (2p)",
     "tip": "Bedoeld = wat de beeldenstormers zelf wilden. Onbedoeld = wat ze over zich heen kregen maar nooit wilden. Twee regels, elk met het woord ervoor.",
     "model": [
      {
       "label": "Bedoeld gevolg",
       "tekst": "Bedoeld: de kerken waren ontdaan van de katholieke versieringen en beelden, die volgens de calvinisten niet in een kerk hoorden."
      },
      {
       "label": "Onbedoeld gevolg",
       "tekst": "Onbedoeld: Filips II stuurde de hertog van Alva, die de protestanten met de Raad van Beroerten nog harder ging straffen."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een bedoeld gevolg (beelden en versieringen weg).",
       "woorden": [
        "beeld",
        "versier",
        "weg",
        "kapot"
       ]
      },
      {
       "t": "Ik noem een onbedoeld gevolg (Alva, strengere straffen).",
       "woorden": [
        "alva",
        "straf",
        "beroerten",
        "harder"
       ]
      },
      {
       "t": "Ik zet 'bedoeld' en 'onbedoeld' er duidelijk bij.",
       "woorden": [
        "bedoeld"
       ]
      }
     ],
     "w": "De beeldenstormers wilden een 'zuivere' kerk; ze kregen Alva.",
     "meer": "Dit is de boemerang van 4.4: harder ingrijpen, meer verzet, en omgekeerd. Een onbedoeld gevolg is bijna altijd iets wat de dader zelf schade doet."
    }
   ]
  }
 ]
},
{
 "id": "alva",
 "emoji": "⚔️",
 "titel": "4.4.2 · Alva's harde hand",
 "paragraaf": "§4.4",
 "kort": "Filips stuurt zijn beste generaal met drie opdrachten. Alva straft, dwingt en belast, en maakt het verzet daarmee juist groter.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Filips II was woest over de Beeldenstorm en stuurde in <b>1567</b> zijn beste generaal: de <b>hertog van Alva</b>. Margaretha van Parma legde haar functie neer; Alva werd <b>landvoogd</b> in haar plaats.",
    "Alva mocht zelf weten hoe hij het aanpakte, als hij maar <b>drie opdrachten</b> uitvoerde. Onthoud ze als <b>straffen, geloof, bestuur</b>:",
    "<b>1. De beeldenstormers straffen.</b> Daarvoor richtte hij de <b>Raad van Beroerten</b> op. Door de harde vonnissen kreeg die de bijnaam <b>bloedraad</b>. Ook hoge edelen die de Beeldenstorm niet hadden tegengehouden werden veroordeeld.<br><b>2. Het katholieke geloof opleggen</b>, desnoods met geweld.<br><b>3. Een echt centraal bestuur instellen</b>, zodat de macht van de gewesten gebroken werd.",
    "Om de Nederlanden ook <b>economisch</b> te straffen voerde Alva de <b>Tiende Penning</b> in: 10 procent belasting op de verkoop van goederen en op winst. Daarmee betaalde hij zijn leger."
   ],
   "regel": "Alva's drie opdrachten: straffen (Raad van Beroerten), het katholieke geloof opleggen, en centraal bestuur instellen. Plus geld ophalen met de Tiende Penning.",
   "vragen": [
    {
     "t": "mc",
     "q": "Waarvoor richtte Alva de <b>Raad van Beroerten</b> op?",
     "o": [
      "om de beeldenstormers en de verantwoordelijken te straffen",
      "om de belasting te innen",
      "om de gewesten en hun Statenvergaderingen voortaan te laten meebesturen",
      "om de katholieke kerken te herstellen"
     ],
     "a": "om de beeldenstormers en de verantwoordelijken te straffen",
     "w": "Het was een <b>rechtbank</b>, opgericht om te straffen. 'Beroerten' betekent onlusten of onrust.",
     "meer": "Ook hoge edelen die de Beeldenstorm niet hadden tegengehouden werden veroordeeld. Veel edelen vluchtten daarom naar het buitenland.",
     "fout": {
      "om de belasting te innen": "Dat was de <b>Tiende Penning</b>, een belasting, geen rechtbank. Twee verschillende maatregelen van Alva.",
      "om de katholieke kerken te herstellen": "Zijn opdracht was het katholieke geloof <b>opleggen</b>, niet gebouwen repareren.",
      "om de gewesten en hun Statenvergaderingen voortaan te laten meebesturen": "Precies het tegenovergestelde: Alva moest de macht van de gewesten juist <b>breken</b>."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de <b>Tiende Penning</b>?",
     "o": [
      "een belasting van 10% op verkoop en winst",
      "een boete van tien gulden voor beeldenstormers",
      "het tiende deel van het leger van Alva",
      "een muntstuk dat Alva liet slaan"
     ],
     "a": "een belasting van 10% op verkoop en winst",
     "w": "Tiende Penning = tien procent. Van de opbrengst betaalde Alva zijn leger.",
     "meer": "Het was bedoeld als straf én als inkomstenbron, maar het stuitte op enorm verzet: het raakte iedereen die handel dreef.",
     "fout": {
      "een boete van tien gulden voor beeldenstormers": "Nee, het was een <b>vaste belasting</b> voor iedereen, niet een straf voor een paar daders.",
      "het tiende deel van het leger van Alva": "De naam gaat over geld, niet over soldaten. Wel betaalde hij zijn leger ervan.",
      "een muntstuk dat Alva liet slaan": "Penning klinkt als munt, maar hier betekent het een <b>deel</b>: een tiende, oftewel 10 procent."
     }
    },
    {
     "t": "mc",
     "q": "Wat gebeurde er met Margaretha van Parma toen Alva kwam?",
     "o": [
      "zij legde haar functie als landvoogdes neer",
      "zij werd door Alva gevangengenomen en meegenomen naar Spanje",
      "zij bleef samen met Alva besturen",
      "zij vluchtte naar het buitenland"
     ],
     "a": "zij legde haar functie als landvoogdes neer",
     "w": "Ze trad af; Alva werd landvoogd in haar plaats.",
     "meer": "Voor haar was dit een <b>onbedoeld gevolg</b> van haar eigen versoepeling: die was bedoeld om rust te brengen, en kostte haar uiteindelijk haar functie.",
     "fout": {
      "zij bleef samen met Alva besturen": "Nee, Alva nam haar functie over. Er was één landvoogd tegelijk.",
      "zij vluchtte naar het buitenland": "Dat deden veel Nederlandse <b>edelen</b>, uit angst voor de Raad van Beroerten. Margaretha trad gewoon af.",
      "zij werd door Alva gevangengenomen en meegenomen naar Spanje": "Dat staat niet in de stof. Ze trad zelf af."
     }
    },
    {
     "t": "sleep",
     "opgave": "Bij welke opdracht van Alva hoort deze maatregel?",
     "chips": [
      {
       "t": "De Raad van Beroerten oprichten",
       "bak": "straffen",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Raad van Beroerten oprichten\" hoort bij <b>1 · straffen</b>."
      },
      {
       "t": "Beeldenstormers laten veroordelen",
       "bak": "straffen",
       "waarom": "Kijk nog eens naar het kernwoord: \"Beeldenstormers laten veroordelen\" hoort bij <b>1 · straffen</b>."
      },
      {
       "t": "Het katholieke geloof met geweld opleggen",
       "bak": "geloof",
       "waarom": "Kijk nog eens naar het kernwoord: \"Het katholieke geloof met geweld opleggen\" hoort bij <b>2 · katholiek geloof opleggen</b>."
      },
      {
       "t": "Protestanten blijven vervolgen",
       "bak": "geloof",
       "waarom": "Kijk nog eens naar het kernwoord: \"Protestanten blijven vervolgen\" hoort bij <b>2 · katholiek geloof opleggen</b>."
      },
      {
       "t": "De macht van de gewesten breken",
       "bak": "bestuur",
       "waarom": "Kijk nog eens naar het kernwoord: \"De macht van de gewesten breken\" hoort bij <b>3 · centraal bestuur</b>."
      },
      {
       "t": "Eén centraal bestuur instellen",
       "bak": "bestuur",
       "waarom": "Kijk nog eens naar het kernwoord: \"Eén centraal bestuur instellen\" hoort bij <b>3 · centraal bestuur</b>."
      }
     ],
     "bakjes": [
      {
       "id": "straffen",
       "label": "1 · straffen",
       "som": ""
      },
      {
       "id": "geloof",
       "label": "2 · katholiek geloof opleggen",
       "som": ""
      },
      {
       "id": "bestuur",
       "label": "3 · centraal bestuur",
       "som": ""
      }
     ],
     "w": "Alva's drie opdrachten: straffen, geloof, bestuur. De Tiende Penning hoort er los bij, dat was geld ophalen."
    },
    {
     "t": "mc",
     "q": "Wat waren de drie opdrachten van Alva?",
     "o": [
      "straffen, katholiek geloof opleggen, centraal bestuur",
      "belasting verlagen, vrede sluiten met Willem en zo snel mogelijk terug naar Spanje",
      "Willem helpen, kerken herbouwen, handel stimuleren",
      "Margaretha steunen, edelen belonen, plakkaten weg"
     ],
     "a": "straffen, katholiek geloof opleggen, centraal bestuur",
     "w": "De beeldenstormers straffen, het katholieke geloof opleggen en een centraal bestuur instellen.",
     "meer": "Hoe hij dat deed mocht hij zelf weten: hij had een onbeperkte volmacht.",
     "fout": {
      "Willem helpen, kerken herbouwen, handel stimuleren": "Willem was juist zijn tegenstander en vluchtte voor hem.",
      "Margaretha steunen, edelen belonen, plakkaten weg": "Margaretha trad af toen hij kwam, en edelen werden juist veroordeeld.",
      "belasting verlagen, vrede sluiten met Willem en zo snel mogelijk terug naar Spanje": "Alva verhoogde de belasting juist (Tiende Penning) en kwam om hard op te treden."
     }
    },
    {
     "t": "gap",
     "q": "Alva kwam met een leger naar de Nederlanden in het jaar ___.",
     "a": "1567|in 1567",
     "w": "1567, het jaar na de Beeldenstorm.",
     "meer": "1566 Beeldenstorm, 1567 Alva, 1568 begin van de Opstand: drie jaren op een rij."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Twee maatregelen van Alva worden vaak door elkaar gehaald. Zet ze scherp naast elkaar:",
    "<b>Raad van Beroerten</b> = een <b>rechtbank</b>. Doel: straffen. Slachtoffers: beeldenstormers en edelen. Bijnaam: bloedraad. Soort: <b>politiek/religieus</b>.",
    "<b>Tiende Penning</b> = een <b>belasting</b> van 10%. Doel: geld voor het leger, en de Nederlanden economisch straffen. Slachtoffers: iedereen die handel dreef. Soort: <b>economisch</b>.",
    "Alva kreeg van Filips een <b>onbeperkte volmacht</b>: hij mocht zelf bepalen hoe hij de protestanten aanpakte, zonder eerst toestemming te vragen. Hij gebruikte die door mensen zonder pardon te laten veroordelen, ook zonder eerlijk proces."
   ],
   "regel": "Raad van Beroerten = rechtbank (straffen). Tiende Penning = belasting (geld). Verwar ze niet: de één kost je je leven, de ander je winst.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat hield Alva's <b>onbeperkte volmacht</b> in?",
     "o": [
      "hij mocht zelf bepalen hoe hij optrad, zonder toestemming vooraf",
      "hij mocht onbeperkt belasting heffen, maar niemand straffen zonder de koning",
      "hij mocht alleen handelen als Filips het goedkeurde",
      "hij mocht de gewesten hun privileges teruggeven"
     ],
     "a": "hij mocht zelf bepalen hoe hij optrad, zonder toestemming vooraf",
     "w": "Volmacht = de macht om zelf te beslissen. Onbeperkt = zonder grenzen vooraf.",
     "meer": "Hij gebruikte die volmacht door iedereen die van ketterij of verraad verdacht werd zonder pardon te laten veroordelen door de Raad van Beroerten.",
     "fout": {
      "hij mocht alleen handelen als Filips het goedkeurde": "Dat is het tegenovergestelde van onbeperkt. Juist dát hoefde hij niet.",
      "hij mocht de gewesten hun privileges teruggeven": "Zijn opdracht was juist de macht van de gewesten te <b>breken</b>.",
      "hij mocht onbeperkt belasting heffen, maar niemand straffen zonder de koning": "Andersom zou nog kloppen: straffen was juist zijn eerste opdracht. De volmacht ging over álles."
     }
    },
    {
     "t": "mc",
     "q": "Wat was een <b>economische oorzaak</b> voor de invoering van de Tiende Penning?",
     "o": [
      "Alva had geld nodig om zijn leger te betalen",
      "de gewesten wilden hun privileges houden en geen centraal bestuur",
      "de calvinisten hielden overal in het land nog steeds hagenpreken",
      "Margaretha van Parma was afgetreden"
     ],
     "a": "Alva had geld nodig om zijn leger te betalen",
     "w": "Een leger onderhouden kost veel geld. Daar kwam de belasting vandaan.",
     "meer": "Het <b>economische gevolg</b> was dat iedereen die handel dreef 10% moest afdragen, en dat leidde tot enorm verzet.",
     "fout": {
      "Margaretha van Parma was afgetreden": "Dat is een politiek gevolg van Alva's komst, geen reden om belasting in te voeren.",
      "de gewesten wilden hun privileges houden en geen centraal bestuur": "Dat is een <b>politieke</b> kwestie, geen economische reden voor een belasting.",
      "de calvinisten hielden overal in het land nog steeds hagenpreken": "Dat is <b>religieus</b>, en het heeft niets met de belasting te maken."
     }
    },
    {
     "t": "mc",
     "q": "Waarom vluchtten veel Nederlandse edelen naar het buitenland?",
     "o": [
      "uit angst voor de Raad van Beroerten",
      "omdat ze de Tiende Penning niet konden betalen",
      "omdat hun kerken vernield waren",
      "omdat Filips II hun land had afgepakt"
     ],
     "a": "uit angst voor de Raad van Beroerten",
     "w": "Ook hoge edelen werden veroordeeld, vooral omdat ze de Beeldenstorm niet hadden tegengehouden.",
     "meer": "Wie bleef, werd zonder pardon van verraad beschuldigd. Willem van Oranje week uit naar Duitsland en organiseerde vandaaruit het verzet.",
     "fout": {
      "omdat ze de Tiende Penning niet konden betalen": "De Tiende Penning raakte vooral handelaars, en kwam later (1569). De vlucht van de edelen kwam door de <b>vervolging</b>.",
      "omdat hun kerken vernield waren": "De vernielde kerken waren katholiek en van de kerk, niet van de edelen persoonlijk.",
      "omdat Filips II hun land had afgepakt": "Dat staat niet in de stof. Het ging om het gevaar van <b>veroordeling</b>."
     }
    },
    {
     "t": "sleep",
     "opgave": "Hoort dit bij de Raad van Beroerten of bij de Tiende Penning?",
     "chips": [
      {
       "t": "Een rechtbank",
       "bak": "raad",
       "waarom": "Kijk nog eens naar het kernwoord: \"Een rechtbank\" hoort bij <b>Raad van Beroerten</b>."
      },
      {
       "t": "Bijnaam: bloedraad",
       "bak": "raad",
       "waarom": "Kijk nog eens naar het kernwoord: \"Bijnaam: bloedraad\" hoort bij <b>Raad van Beroerten</b>."
      },
      {
       "t": "10 procent belasting",
       "bak": "penning",
       "waarom": "Kijk nog eens naar het kernwoord: \"10 procent belasting\" hoort bij <b>Tiende Penning</b>."
      },
      {
       "t": "Betaalde het leger van Alva",
       "bak": "penning",
       "waarom": "Kijk nog eens naar het kernwoord: \"Betaalde het leger van Alva\" hoort bij <b>Tiende Penning</b>."
      },
      {
       "t": "Raakte iedereen die handel dreef",
       "bak": "penning",
       "waarom": "Kijk nog eens naar het kernwoord: \"Raakte iedereen die handel dreef\" hoort bij <b>Tiende Penning</b>."
      }
     ],
     "bakjes": [
      {
       "id": "raad",
       "label": "Raad van Beroerten",
       "som": ""
      },
      {
       "id": "penning",
       "label": "Tiende Penning",
       "som": ""
      }
     ],
     "w": "Raad van Beroerten = straffen (rechtbank). Tiende Penning = geld (belasting)."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Alva moet van Filips II een centraal bestuur instellen. Geef aan welk bedoeld gevolg dit voor de Nederlanden heeft. Leg je antwoord uit. (2p)",
     "tip": "Begin met het gevolg zelf, en leg dan uit waarom het 'bedoeld' is: wie wilde het?",
     "model": [
      {
       "label": "Bedoeld gevolg",
       "tekst": "De macht van de gewesten moest gebroken worden: ze verloren hun eigen bestuur en privileges."
      },
      {
       "label": "Uitleg",
       "tekst": "Dat is bedoeld, want Filips II wilde één centraal bestuur met overal dezelfde wetten en regels (centralisatie)."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem het gevolg: de gewesten verliezen macht of privileges.",
       "woorden": [
        "gewest",
        "macht",
        "privilege"
       ]
      },
      {
       "t": "Ik leg uit waarom het bedoeld is (Filips wilde centralisatie).",
       "woorden": [
        "filips",
        "wilde",
        "centralis",
        "bedoeld"
       ]
      }
     ],
     "w": "Bedoeld = het plan van Filips: centralisatie breekt de macht van de gewesten.",
     "meer": "Valkuil: schrijf niet 'de Opstand'. Die kwam ook, maar die was juist onbedoeld."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Alva kwam om de <b>orde te herstellen</b>. Dat was het <b>bedoelde</b> gevolg. Maar wat er echt gebeurde, was het tegenovergestelde: het verzet werd juist groter en er brak een oorlog uit die tachtig jaar zou duren.",
    "Waarom werkte het averechts? Drie dingen tegelijk:",
    "<b>1)</b> De Raad van Beroerten raakte niet alleen beeldenstormers maar ook <b>edelen</b>: daardoor kregen de opstandelingen machtige bondgenoten.<br><b>2)</b> De Tiende Penning raakte <b>iedereen die handel dreef</b>: daardoor kregen ook niet-protestanten een reden om boos te zijn.<br><b>3)</b> Het harde optreden maakte van een <b>geloofsconflict</b> een conflict over <b>vrijheid en bestuur</b>, waar veel meer mensen zich in herkenden.",
    "Dit is de kern van het kenmerkend aspect: een conflict dat groeide en groeide, tot er uiteindelijk een nieuwe staat uit ontstond."
   ],
   "regel": "Alva's harde hand had een bedoeld gevolg (orde herstellen) dat mislukte, en een onbedoeld gevolg (een veel bredere opstand) dat lukte.",
   "vragen": [
    {
     "t": "open",
     "q": "Leg uit waarom het harde optreden van Alva juist leidde tot méér verzet in de Nederlanden. Noem minstens twee redenen.",
     "punten": 3,
     "modelantwoord": "De Raad van Beroerten veroordeelde niet alleen beeldenstormers maar ook hoge edelen, waardoor ook machtige mensen zich tegen Alva keerden en veel edelen vluchtten. Daarnaast raakte de Tiende Penning iedereen die handel dreef, waardoor ook katholieken en niet-protestanten een reden kregen om boos te zijn. Zo werd het conflict veel breder dan alleen een conflict over geloof.",
     "sleutelwoorden": [
      {
       "moet": [
        "edelen",
        "raad van beroerten",
        "bloedraad"
       ],
       "syn": [
        "adel"
       ]
      },
      {
       "moet": [
        "tiende penning",
        "belasting",
        "handel",
        "geld"
       ],
       "syn": [
        "economisch"
       ]
      },
      {
       "moet": [
        "breder",
        "meer mensen",
        "iedereen",
        "ook",
        "groter"
       ],
       "syn": [
        "niet alleen",
        "bredere groep"
       ]
      }
     ],
     "rubric": [
      "Je noemt dat de Raad van Beroerten ook edelen trof",
      "Je noemt dat de Tiende Penning iedereen met handel trof",
      "Je legt uit dat het verzet daardoor breder werd dan alleen geloof"
     ],
     "w": "Twee groepen erbij: edelen (door de bloedraad) en handelaars (door de Tiende Penning). Daardoor werd het verzet veel breder.",
     "meer": "Op het SO is 'noem minstens twee redenen' een instructie om echt twee dingen uit te werken. Eén reden goed uitleggen levert nooit alle punten op."
    },
    {
     "t": "mc",
     "q": "Alva werd gestuurd om orde te herstellen, maar het verzet werd juist groter. Hoe noem je dat?",
     "o": [
      "een onbedoeld gevolg",
      "een bedoeld gevolg, want dat wilde Alva",
      "een aanleiding",
      "continuïteit"
     ],
     "a": "een onbedoeld gevolg",
     "w": "Filips wilde rust, en kreeg oorlog. Precies het tegenovergestelde van de bedoeling.",
     "meer": "Het <b>bedoelde</b> gevolg van Alva's komst was: beeldenstormers straffen en de orde herstellen. Dat eerste lukte; dat tweede juist helemaal niet.",
     "fout": {
      "een aanleiding": "Een aanleiding is een <b>directe oorzaak</b>, dus iets dat ervóór komt. Hier gaat het om wat er ná Alva's optreden gebeurde.",
      "continuïteit": "Dat betekent dat iets hetzelfde blijft. Hier verandert er juist heel veel.",
      "een bedoeld gevolg, want dat wilde Alva": "Dan had Filips een grotere opstand gewild. Dat wilde hij absoluut niet, hij stuurde Alva juist om rust te krijgen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was de Tiende Penning zo slim én zo dom tegelijk van Alva?",
     "o": [
      "slim omdat het geld opleverde, dom omdat het ook katholieken tegen hem opzette",
      "slim omdat het alleen protestanten trof, dom omdat het veel te weinig geld opleverde",
      "slim omdat de edelen het betaalden, dom omdat boeren vrijgesteld waren",
      "slim omdat Filips het wilde, dom omdat het pas in 1588 inging"
     ],
     "a": "slim omdat het geld opleverde, dom omdat het ook katholieken tegen hem opzette",
     "w": "Een belasting op handel raakt iedereen, ook mensen die met het geloofsconflict niets te maken hadden.",
     "meer": "Zo veranderde een conflict over geloof in een conflict waar veel meer mensen een belang bij hadden. Dat is precies hoe een opstand groot wordt.",
     "fout": {
      "slim omdat de edelen het betaalden, dom omdat boeren vrijgesteld waren": "Het ging om verkoop en winst uit ondernemingen, dus vooral handelaars, en niemand was uitgezonderd.",
      "slim omdat Filips het wilde, dom omdat het pas in 1588 inging": "Alva stelde het in 1569 voor, niet in 1588. 1588 is het jaar van de Republiek.",
      "slim omdat het alleen protestanten trof, dom omdat het veel te weinig geld opleverde": "De belasting trof juist <b>iedereen</b>, niet alleen protestanten. Dat was nou net het probleem."
     }
    },
    {
     "t": "mc",
     "q": "Wat is het verschil tussen de <b>bloedplakkaten</b> en de <b>bloedraad</b>?",
     "o": [
      "plakkaten zijn wetten (al van Karel V); de bloedraad is Alva's rechtbank",
      "plakkaten zijn van Alva; de bloedraad is van Karel V",
      "het zijn twee namen voor hetzelfde",
      "plakkaten gingen alleen over belasting en handel, de bloedraad alleen over het geloof"
     ],
     "a": "plakkaten zijn wetten (al van Karel V); de bloedraad is Alva's rechtbank",
     "w": "Wet tegenover rechtbank, en Karel V tegenover Alva. Twee verschillende dingen met een vergelijkbare bijnaam.",
     "meer": "De bloedplakkaten werden in 1550 door Karel V uitgevaardigd. De Raad van Beroerten richtte Alva op in 1567.",
     "fout": {
      "plakkaten zijn van Alva; de bloedraad is van Karel V": "Precies omgedraaid. Karel V maakte de plakkaten; Alva richtte de bloedraad op.",
      "het zijn twee namen voor hetzelfde": "Nee: een plakkaat is een <b>wet op papier</b>, de bloedraad was een <b>rechtbank met rechters</b>.",
      "plakkaten gingen alleen over belasting en handel, de bloedraad alleen over het geloof": "De plakkaten gingen juist over <b>geloof</b> (ketters). Belasting is de Tiende Penning."
     }
    },
    {
     "t": "gap",
     "q": "Alva kreeg van Filips II een ___ volmacht: hij mocht zelf bepalen hoe hij optrad.",
     "a": "onbeperkte|onbeperkt",
     "w": "Onbeperkte volmacht: geen toestemming vooraf nodig, geen grenzen aan zijn optreden.",
     "meer": "Bij opdracht 5b van het werkboek moet je twee dingen doen: uitleggen wát die volmacht inhoudt, én hoe Alva hem gebruikte."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Noem een economische oorzaak en een economisch gevolg van de Tiende Penning. (2p)",
     "tip": "Economisch = geld en arbeid. Oorzaak = waarom kwam de belasting er? Gevolg = wat deed het met handel en mensen?",
     "model": [
      {
       "label": "Economische oorzaak",
       "tekst": "Oorzaak: Alva wilde de Nederlanden ook economisch straffen voor de Beeldenstorm en had geld nodig voor zijn leger."
      },
      {
       "label": "Economisch gevolg",
       "tekst": "Gevolg: alles werd duurder en de handel liep terug, waardoor kooplieden en gewone mensen geld verloren (en bozer werden)."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een oorzaak die met geld te maken heeft.",
       "woorden": [
        "geld",
        "straf",
        "leger",
        "betal"
       ]
      },
      {
       "t": "Ik noem een gevolg dat met geld of handel te maken heeft.",
       "woorden": [
        "duur",
        "handel",
        "geld",
        "winst",
        "prijs"
       ]
      },
      {
       "t": "Ik zet 'oorzaak' en 'gevolg' er duidelijk bij.",
       "woorden": [
        "oorzaak",
        "gevolg"
       ]
      }
     ],
     "w": "De Tiende Penning is 10% belasting op de verkoop van goederen: geld in, geld uit.",
     "meer": "Een oorzaak komt vóór de belasting, een gevolg erna. Een veelgemaakte fout is twee gevolgen geven."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron E: een spotprent",
      "tekst": "Op een prent uit ongeveer 1570 zit Alva op een troon. Aan zijn voeten liggen de zeventien gewesten als vastgebonden vrouwen. Boven zijn hoofd hangt een duivel die hem een kroon aanreikt.",
      "onder": "Eigen beschrijving van een Nederlandse spotprent over Alva."
     },
     "q": "Is de maker van bron E voor of tegen Alva? Wat is het beste bewijs uit de bron?",
     "o": [
      "tegen: de gewesten liggen vastgebonden en een duivel helpt Alva",
      "voor: Alva zit op een troon, dus hij is een echte vorst",
      "tegen: Alva woonde in Spanje en niet in de Nederlanden",
      "voor: de maker laat zien dat Alva alle zeventien gewesten bestuurt"
     ],
     "a": "tegen: de gewesten liggen vastgebonden en een duivel helpt Alva",
     "w": "Een duivel en vastgebonden gewesten maken Alva tot een boze onderdrukker: de maker is tegen hem.",
     "meer": "Bewijs altijd met iets wat je <b>in</b> de prent ziet. 'Alva woonde in Spanje' staat niet in de bron, dus dat telt niet als bewijs.",
     "fout": {
      "voor: Alva zit op een troon, dus hij is een echte vorst": "Kijk naar het hele beeld. Een troon met een duivel erboven en vastgebonden gewesten eronder is spot, geen eerbetoon.",
      "tegen: Alva woonde in Spanje en niet in de Nederlanden": "Het oordeel 'tegen' klopt, maar het bewijs komt niet uit de bron. De vraag vraagt om een element uit de prent zelf.",
      "voor: de maker laat zien dat Alva alle zeventien gewesten bestuurt": "Ze liggen vastgebonden aan zijn voeten. Dat laat onderdrukking zien, en de maker keurt dat af."
     }
    }
   ]
  }
 ]
},
{
 "id": "opstand-begint",
 "emoji": "🛡️",
 "titel": "4.4.3 · De Opstand begint",
 "paragraaf": "§4.4",
 "kort": "Geuzen vanuit Duitsland en vanaf zee, Willem van Oranje aan het hoofd, en op 1 april 1572 een toevalstreffer die alles omdraait.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Alva's maatregelen leidden tot veel onvrede. Een grote groep vluchtelingen, de <b>geuzen</b>, ging vanuit <b>Duitsland</b> en vanaf <b>zee</b> gewapend de strijd aan.",
    "<b>Willem van Oranje</b>, een van de hoogste edelen van de Nederlanden, nam de leiding. Vanuit Duitsland organiseerde hij het verzet tegen de Spaanse legers.",
    "In <b>1568</b> viel hij met zijn leger de Nederlanden binnen. Dat is het begin van de <b>Nederlandse Opstand</b>, ook wel de <b>Tachtigjarige Oorlog</b> (1568–1648). In datzelfde jaar won hij de <b>slag bij Heiligerlee</b>: de eerste overwinning.",
    "Daarna bleken Alva's legers sterker. Tot <b>1 april 1572</b>: de <b>watergeuzen</b> werden door de wind afgedreven, kwamen bij <b>Den Briel</b> aan land, zagen dat er maar een handjevol Spanjaarden lag en namen de stad in. Puur toeval, met enorme gevolgen."
   ],
   "regel": "1568 = begin van de Opstand (slag bij Heiligerlee). 1 april 1572 = watergeuzen nemen Den Briel in.",
   "vragen": [
    {
     "t": "mc",
     "q": "In welk jaar begon de Nederlandse Opstand?",
     "o": [
      "1568",
      "1566",
      "1572",
      "1581"
     ],
     "a": "1568",
     "w": "1568: Willem van Oranje valt binnen en wint de slag bij Heiligerlee.",
     "meer": "De Opstand duurde van 1568 tot 1648, vandaar de naam Tachtigjarige Oorlog.",
     "fout": {
      "1566": "Dat is het jaar van het Smeekschrift en de Beeldenstorm. Belangrijk, maar nog geen oorlog.",
      "1572": "Dat is de inname van Den Briel, het kantelpunt, maar de Opstand liep toen al vier jaar.",
      "1581": "Dat is het Plakkaat van Verlatinghe, waarin Filips II werd afgezworen."
     }
    },
    {
     "t": "mc",
     "q": "Wie nam de leiding over de geuzen?",
     "o": [
      "Willem van Oranje",
      "de hertog van Alva",
      "Margaretha van Parma",
      "Balthasar Gerards"
     ],
     "a": "Willem van Oranje",
     "w": "Een van de hoogste edelen van de Nederlanden, die het verzet vanuit Duitsland organiseerde.",
     "meer": "Hij werd later bekend als 'Vader des Vaderlands'. In 1584 werd hij vermoord.",
     "fout": {
      "de hertog van Alva": "Dat was juist hun tegenstander: de Spaanse landvoogd die ze bevochten.",
      "Margaretha van Parma": "Zij was landvoogdes namens Filips en trad af toen Alva kwam.",
      "Balthasar Gerards": "Dat is de man die Willem van Oranje in 1584 vermoordde."
     }
    },
    {
     "t": "gap",
     "q": "Op 1 april 1572 namen de watergeuzen de stad ___ in.",
     "a": "Den Briel|Brielle|den briel",
     "w": "Den Briel, in Holland. Bij toeval, doordat de wind hen die kant op blies.",
     "meer": "Ezelsbruggetje uit die tijd: 'Op 1 april verloor Alva zijn bril', Den Briel klinkt als 'bril'."
    },
    {
     "t": "mc",
     "q": "Hoe kwamen de watergeuzen bij Den Briel terecht?",
     "o": [
      "bij toeval: ze waren door de wind afgedreven",
      "het was een lang voorbereide aanval",
      "Willem van Oranje gaf het bevel de stad in te nemen",
      "de inwoners hadden hen om hulp gevraagd"
     ],
     "a": "bij toeval: ze waren door de wind afgedreven",
     "w": "Geen plan, maar toeval. Ze zagen dat er nauwelijks Spanjaarden waren en sloegen toe.",
     "meer": "Juist omdat het toeval was, is het zo'n mooi voorbeeld van hoe één kleine gebeurtenis een oorlog kan laten kantelen.",
     "fout": {
      "het was een lang voorbereide aanval": "Nee. De bron zegt duidelijk dat ze door de wind bij toeval aan land kwamen.",
      "Willem van Oranje gaf het bevel de stad in te nemen": "Hij leidde het verzet in het algemeen, maar deze inname was niet gepland.",
      "de inwoners hadden hen om hulp gevraagd": "De stad werd ingenomen omdat er maar een handvol Spanjaarden lag, niet op verzoek."
     }
    },
    {
     "t": "mc",
     "q": "Wat is een <b>watergeus</b>?",
     "o": [
      "een opstandeling die vanaf het water vecht",
      "een Spaanse soldaat die op een oorlogsschip van de koning diende",
      "een visser uit Den Briel",
      "een bestuurder van een waterschap"
     ],
     "a": "een opstandeling die vanaf het water vecht",
     "w": "Geus = opstandeling. Watergeus = geus die vanaf zee opereert.",
     "meer": "De naam geus komt van het Franse <i>gueux</i> (bedelaars), het scheldwoord van bij het Smeekschrift.",
     "fout": {
      "een visser uit Den Briel": "Den Briel is de stad die ze innamen, niet waar ze vandaan kwamen.",
      "een bestuurder van een waterschap": "Dat heeft niets met deze tijd te maken.",
      "een Spaanse soldaat die op een oorlogsschip van de koning diende": "Precies andersom: watergeuzen vochten juist tégen de Spanjaarden."
     }
    },
    {
     "t": "mc",
     "q": "Welke slag won Willem van Oranje in 1568?",
     "o": [
      "de slag bij Heiligerlee",
      "de slag bij Nieuwpoort, aan de kust van Vlaanderen",
      "het beleg van Leiden",
      "de inname van Breda"
     ],
     "a": "de slag bij Heiligerlee",
     "w": "Heiligerlee (Groningen), 1568: de eerste overwinning van de Opstand.",
     "meer": "Daarna bleken de legers van Alva nog lang sterker, tot Den Briel in 1572.",
     "fout": {
      "het beleg van Leiden": "Leiden werd in 1573-1574 belegerd en in 1574 ontzet. Dat was geen slag van Willem in 1568.",
      "de inname van Breda": "Breda werd in 1590 door Maurits ingenomen met het turfschip (4.5).",
      "de slag bij Nieuwpoort, aan de kust van Vlaanderen": "Nieuwpoort is in 1600, met Maurits (4.5)."
     }
    },
    {
     "t": "mc",
     "q": "Hoe werd Leiden in 1574 ontzet?",
     "o": [
      "de geuzen staken dijken door",
      "de Spanjaarden hadden geen geld meer",
      "Willem kocht de stad vrij van Spanje",
      "de Leidenaren wonnen een veldslag"
     ],
     "a": "de geuzen staken dijken door",
     "w": "Het water deed het werk: de belegeraars moesten weg, en op 3 oktober kwamen haring en wittebrood.",
     "meer": "Willem gaf Leiden als beloning een universiteit. Leidens Ontzet wordt elke 3 oktober nog gevierd.",
     "fout": {
      "de Spanjaarden hadden geen geld meer": "Geldgebrek en muiterij speelden wel vaker, maar Leiden werd ontzet door het doorsteken van de dijken.",
      "Willem kocht de stad vrij van Spanje": "Er werd niets gekocht. Het zeewater verdreef de Spanjaarden.",
      "de Leidenaren wonnen een veldslag": "De Leidenaren waren uitgehongerd en wilden zich bijna overgeven. Het water redde hen."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Den Briel heet een <b>kantelpunt</b>: een moment waarna de situatie duidelijk anders is. Bij zo'n vraag moet je altijd twee dingen beschrijven: <b>hoe het was vóór</b> en <b>hoe het werd ná</b>.",
    "<b>Vóór 1572:</b> na Heiligerlee bleken Alva's legers sterker. De opstandelingen verloren vrijwel overal en steden durfden geen partij te kiezen.",
    "<b>Ná 1572:</b> de opstandelingen hadden succes geboekt. Daardoor durfden <b>meer steden</b> de kant van de opstand te kiezen. Van een verloren zaak werd het een echte oorlog.",
    "Alva reageerde door steden <b>één voor één te belegeren</b> tot ze zich overgaven. Bij het <b>beleg van Leiden</b> leidde dat tot grote sterfte onder de bevolking. En toen het Spaanse leger ook nog ging <b>muiten</b> (in opstand komen tegen de eigen leiding) en plunderen, zagen de gewesten in dat ze moesten gaan <b>samenwerken</b>."
   ],
   "regel": "Kantelpunt = beschrijf de situatie vóór én ná. Vóór Den Briel won Alva bijna overal; erna durfden steeds meer steden partij te kiezen.",
   "vragen": [
    {
     "t": "open",
     "q": "Leg uit waarom je de verovering van Den Briel kunt zien als een kantelpunt in de Nederlandse Opstand. Begin met de situatie vóór en sluit af met wat erna veranderde.",
     "punten": 3,
     "modelantwoord": "Vóór de verovering van Den Briel waren de legers van Alva sterker: na de slag bij Heiligerlee verloren de opstandelingen bijna overal en durfden steden geen partij te kiezen. Na de inname van Den Briel in 1572 hadden de opstandelingen eindelijk weer succes. Daardoor durfden meer steden de kant van de opstand te kiezen, waardoor de opstand veel groter werd.",
     "sleutelwoorden": [
      {
       "moet": [
        "voor",
        "vóór",
        "eerst",
        "daarvoor"
       ],
       "syn": [
        "hiervoor"
       ]
      },
      {
       "moet": [
        "alva",
        "sterker",
        "verloren",
        "spanjaarden"
       ],
       "syn": [
        "spaanse legers"
       ]
      },
      {
       "moet": [
        "meer steden",
        "steden",
        "kant kozen",
        "sloten zich aan"
       ],
       "syn": [
        "aansloten",
        "partij"
       ]
      }
     ],
     "rubric": [
      "Je beschrijft de situatie vóór: Alva's legers waren sterker, de opstand verloor",
      "Je beschrijft de situatie ná: meer steden kozen de kant van de opstand",
      "Je verbindt die twee met het succes bij Den Briel"
     ],
     "w": "Vóór: de opstand verloor. Ná: steden durfden mee te doen. Dát maakt het een kantelpunt.",
     "meer": "Bij een kantelpuntvraag krijg je alleen alle punten als je écht twee situaties beschrijft. Alleen zeggen 'het was belangrijk' is niet genoeg."
    },
    {
     "t": "mc",
     "q": "Wat betekent <b>muiterij</b>?",
     "o": [
      "een opstand binnen een leger of scheepsbemanning tegen de eigen leiding",
      "een opstand van gewone burgers in een stad tegen hun koning of landvoogd",
      "het plunderen van een stad door de vijand",
      "het weigeren van belasting te betalen"
     ],
     "a": "een opstand binnen een leger of scheepsbemanning tegen de eigen leiding",
     "w": "Muiten doe je tégen je eigen bazen, van binnenuit.",
     "meer": "De Spaanse soldaten muitten omdat ze niet betaald werden. Daarna gingen ze plunderen, en juist dát overtuigde de gewesten om samen te werken.",
     "fout": {
      "het plunderen van een stad door de vijand": "Plunderen was wat er gebeurde ná de muiterij, maar het is niet de betekenis van het woord.",
      "het weigeren van belasting te betalen": "Dat gebeurde bij de Tiende Penning, maar dat heet geen muiterij.",
      "een opstand van gewone burgers in een stad tegen hun koning of landvoogd": "Dat is precies de <b>Nederlandse Opstand</b> zelf. Muiterij zit in een leger of op een schip."
     }
    },
    {
     "t": "mc",
     "q": "Wat was Alva's tactiek nadat meer steden de kant van de opstand kozen?",
     "o": [
      "steden één voor één belegeren tot ze zich overgaven",
      "alle steden tegelijk aanvallen",
      "onderhandelen met Willem van Oranje over godsdienstvrijheid voor de protestanten",
      "zich terugtrekken naar Spanje"
     ],
     "a": "steden één voor één belegeren tot ze zich overgaven",
     "w": "Beleg na beleg. Bij Leiden leidde dat tot grote sterfte onder de bevolking.",
     "meer": "Het werkte niet zoals hij hoopte: de belegeringen en de plunderende, muitende soldaten dreven de gewesten juist naar elkaar toe.",
     "fout": {
      "alle steden tegelijk aanvallen": "Daar had hij het leger niet voor. Hij pakte ze stuk voor stuk aan.",
      "zich terugtrekken naar Spanje": "Alva bleef; hij werd later opgevolgd door Alexander Farnese.",
      "onderhandelen met Willem van Oranje over godsdienstvrijheid voor de protestanten": "Dat was juist het tegenovergestelde van zijn opdracht: hij moest het katholieke geloof opleggen."
     }
    },
    {
     "t": "gap",
     "q": "Bij het beleg van ___ leidde Alva's tactiek tot grote sterfte onder de bevolking.",
     "a": "Leiden|leiden",
     "w": "Het beleg van Leiden. De stad werd uitgehongerd.",
     "meer": "Leidens Ontzet (de bevrijding van de stad) wordt in Leiden nog elk jaar op 3 oktober gevierd."
    },
    {
     "t": "sleep",
     "opgave": "Gebeurde dit vóór of ná de inname van Den Briel (1572)?",
     "chips": [
      {
       "t": "De slag bij Heiligerlee",
       "bak": "voor",
       "waarom": "Kijk nog eens naar het kernwoord: \"De slag bij Heiligerlee\" hoort bij <b>vóór 1572</b>."
      },
      {
       "t": "De Beeldenstorm",
       "bak": "voor",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Beeldenstorm\" hoort bij <b>vóór 1572</b>."
      },
      {
       "t": "De komst van Alva",
       "bak": "voor",
       "waarom": "Kijk nog eens naar het kernwoord: \"De komst van Alva\" hoort bij <b>vóór 1572</b>."
      },
      {
       "t": "Steeds meer steden kiezen de kant van de opstand",
       "bak": "na",
       "waarom": "Kijk nog eens naar het kernwoord: \"Steeds meer steden kiezen de kant van de opstand\" hoort bij <b>ná 1572</b>."
      },
      {
       "t": "Het beleg van Leiden",
       "bak": "na",
       "waarom": "Kijk nog eens naar het kernwoord: \"Het beleg van Leiden\" hoort bij <b>ná 1572</b>."
      },
      {
       "t": "De gewesten sluiten een verdrag (1576)",
       "bak": "na",
       "waarom": "Kijk nog eens naar het kernwoord: \"De gewesten sluiten een verdrag (1576)\" hoort bij <b>ná 1572</b>."
      }
     ],
     "bakjes": [
      {
       "id": "voor",
       "label": "vóór 1572",
       "som": ""
      },
      {
       "id": "na",
       "label": "ná 1572",
       "som": ""
      }
     ],
     "w": "Den Briel (1572) is het scharnier van deze paragraaf. Alles van 1566–1568 komt ervoor, alles vanaf 1576 erna."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg uit waarom je de inname van Den Briel (1572) kunt zien als een kantelpunt in de Nederlandse Opstand. (2p)",
     "tip": "Een kantelpunt is een moment waarna het de andere kant op gaat. Schrijf op hoe het ervóór ging en hoe het erna ging.",
     "model": [
      {
       "label": "Ervoor",
       "tekst": "Na de slag bij Heiligerlee (1568) waren de legers van Alva sterker en had de Opstand weinig succes."
      },
      {
       "label": "Wat er gebeurde",
       "tekst": "Op 1 april 1572 namen de watergeuzen bij toeval Den Briel in."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor durfden meer steden de kant van de opstandelingen te kiezen. Vanaf toen ging het beter met de Opstand."
      }
     ],
     "checklist": [
      {
       "t": "Ik zeg hoe het ervóór ging (weinig succes).",
       "woorden": [
        "weinig",
        "sterker",
        "verloren",
        "heiligerlee",
        "eerst"
       ]
      },
      {
       "t": "Ik noem wat er in 1572 gebeurde (watergeuzen, Den Briel).",
       "woorden": [
        "briel",
        "watergeu",
        "1572"
       ]
      },
      {
       "t": "Ik leg uit wat er daarna veranderde (meer steden kozen hun kant).",
       "woorden": [
        "steden",
        "kant",
        "daardoor",
        "daarna"
       ]
      }
     ],
     "w": "Kantelpunt = voor en na vergelijken: eerst verliezen, daarna kiezen steden voor de Opstand.",
     "meer": "Het woord 'kantelpunt' vraagt om een verandering. Wie alleen vertelt wat er in Den Briel gebeurde, mist de helft van de punten."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Nu de rol van <b>Willem van Oranje</b> zelf. Dat is leerdoel 4 van het werkboek, en er wordt vaak naar gevraagd.",
    "Wat hij deed: hij was een <b>hoge edelman</b> in de Nederlanden, week uit naar <b>Duitsland</b>, <b>organiseerde daar het verzet</b>, nam de <b>leiding over de geuzen</b>, viel in <b>1568</b> binnen (slag bij Heiligerlee) en werd het gezicht van de samenwerking tussen de gewesten.",
    "Belangrijk en vaak fout begrepen: Willem wilde in het begin <b>geen eigen land</b>. In het <b>Wilhelmus</b> zegt hij letterlijk dat hij <i>den koning van Hispanje heb ik altijd geëerd</i>. Hij vocht tegen de <b>tirannie</b> (het wrede bestuur van Alva), niet tegen de koning zelf. Pas in 1581 werd Filips echt afgezworen.",
    "In het <b>zesde couplet</b> zie je hoe gelovig hij was: God is zijn <i>schild ende betrouwen</i>, op God wil hij <i>bouwen</i>, en hij noemt zich Gods <i>dienaar</i>."
   ],
   "regel": "Willem van Oranje: hoge edelman → vlucht naar Duitsland → leider van de geuzen → inval 1568. Hij vocht tegen de tirannie, niet (in het begin) tegen de koning.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat blijkt uit de regel 'den koning van Hispanje heb ik altijd geëerd' in het Wilhelmus?",
     "o": [
      "Willem zag zichzelf niet als vijand van Filips II",
      "Willem was eigenlijk een Spanjaard",
      "Willem wilde zelf koning van Spanje en van alle Nederlanden worden",
      "Willem had spijt van de opstand"
     ],
     "a": "Willem zag zichzelf niet als vijand van Filips II",
     "w": "Hij zegt de koning altijd geëerd te hebben. Hij vocht tegen de tirannie, niet tegen de persoon van de koning.",
     "meer": "Filips zag dat heel anders: voor hém was Willem juist de grote vijand, met een prijs op zijn hoofd. Dat verschil in perspectief is precies wat opdracht 11a vraagt.",
     "fout": {
      "Willem was eigenlijk een Spanjaard": "Nee, in het eerste couplet staat juist 'van Duitsen bloed'. Hij was een Nederlandse edelman met Duitse wortels.",
      "Willem had spijt van de opstand": "Daar zegt het lied niets over. Hij verdedigt juist zijn keuze.",
      "Willem wilde zelf koning van Spanje en van alle Nederlanden worden": "Dat staat er nergens. Hij streed tegen het wrede bestuur hier, niet om de Spaanse troon."
     }
    },
    {
     "t": "mc",
     "q": "Een leerling zegt: 'Willem van Oranje wilde vanaf het begin een onafhankelijk Nederland.' Wat klopt daar niet aan?",
     "o": [
      "in het begin vocht hij tegen de tirannie; Filips werd pas in 1581 afgezworen",
      "hij wilde juist dat de Nederlanden Spaans bleven",
      "hij heeft nooit tegen de Spanjaarden gevochten",
      "hij raakte pas na 1584 bij de opstand betrokken, toen alles al beslist was"
     ],
     "a": "in het begin vocht hij tegen de tirannie; Filips werd pas in 1581 afgezworen",
     "w": "Het doel veranderde gaandeweg. Onafhankelijkheid was het eindpunt, niet het beginpunt.",
     "meer": "Dat is trouwens hoe veel opstanden gaan: ze beginnen met 'het moet anders' en eindigen pas veel later met 'we gaan alleen verder'.",
     "fout": {
      "hij wilde juist dat de Nederlanden Spaans bleven": "De Nederlanden wáren niet Spaans, ze hadden alleen dezelfde heer. En Willem vocht juist tegen het bestuur van Alva.",
      "hij heeft nooit tegen de Spanjaarden gevochten": "Hij viel in 1568 binnen en won de slag bij Heiligerlee.",
      "hij raakte pas na 1584 bij de opstand betrokken, toen alles al beslist was": "In 1584 werd hij vermoord. Hij was er juist vanaf het begin bij."
     }
    },
    {
     "t": "mc",
     "q": "Waaruit blijkt in het zesde couplet dat Willem van Oranje een gelovig man was?",
     "o": [
      "hij noemt God zijn schild, wil op God bouwen en noemt zich Gods dienaar",
      "hij zegt dat hij van Duitsen bloed is",
      "hij zegt dat hij de koning van Spanje altijd geëerd heeft, en dat is geloof",
      "hij noemt zichzelf een prinse van Oranje"
     ],
     "a": "hij noemt God zijn schild, wil op God bouwen en noemt zich Gods dienaar",
     "w": "Drie bewijzen in één couplet. Bij opdracht 11b moet je er precies drie noemen.",
     "meer": "Let op: 'mijn schild ende betrouwen zijt Gij, o God mijn Heer', 'op U zo wil ik bouwen', en 'Uw dienaar t' aller stond'.",
     "fout": {
      "hij zegt dat hij van Duitsen bloed is": "Dat staat in het <b>eerste</b> couplet en gaat over zijn afkomst, niet over zijn geloof.",
      "hij noemt zichzelf een prinse van Oranje": "Eerste couplet, en dat gaat over zijn titel.",
      "hij zegt dat hij de koning van Spanje altijd geëerd heeft, en dat is geloof": "Ook eerste couplet, en dat gaat over zijn houding tegenover Filips."
     }
    },
    {
     "t": "open",
     "q": "Beschrijf in het kort de rol van Willem van Oranje in de Nederlandse Opstand. Noem minstens drie dingen die hij deed.",
     "punten": 3,
     "modelantwoord": "Willem van Oranje was een van de hoogste edelen in de Nederlanden. Hij week uit naar Duitsland en organiseerde daar het verzet tegen de Spaanse legers van Alva. Hij nam de leiding over de geuzen en viel in 1568 met een leger de Nederlanden binnen, waarmee de Nederlandse Opstand begon. Hij won dat jaar de slag bij Heiligerlee en werd later de leider onder wie de gewesten gingen samenwerken.",
     "sleutelwoorden": [
      {
       "moet": [
        "edel",
        "edelman",
        "adel"
       ],
       "syn": [
        "hoge edelman"
       ]
      },
      {
       "moet": [
        "duitsland",
        "verzet",
        "organiseer",
        "leiding",
        "geuzen"
       ],
       "syn": [
        "leidde"
       ]
      },
      {
       "moet": [
        "1568",
        "binnenviel",
        "inval",
        "heiligerlee",
        "opstand"
       ],
       "syn": [
        "begon"
       ]
      }
     ],
     "rubric": [
      "Je noemt dat hij een hoge edelman was",
      "Je noemt dat hij vanuit Duitsland het verzet organiseerde en de geuzen leidde",
      "Je noemt de inval van 1568 en/of de slag bij Heiligerlee"
     ],
     "w": "Edelman → uitgeweken naar Duitsland → verzet organiseren → leiding geuzen → inval 1568 → Heiligerlee.",
     "meer": "Tip uit het werkboek (opdracht 8c): noem bij elk voorbeeld steeds de naam van Willem van Oranje, anders is niet duidelijk over wie je het hebt."
    },
    {
     "t": "gap",
     "q": "In 1568 won Willem van Oranje de slag bij ___, de eerste overwinning van de opstand.",
     "a": "Heiligerlee|heiligerlee",
     "w": "De slag bij Heiligerlee, 1568. De eerste overwinning op het slagveld.",
     "meer": "Daarna bleken Alva's legers sterker, tot de inname van Den Briel in 1572."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron F: het Wilhelmus, eerste couplet (fragment)",
      "tekst": "<i>Een prinse van Oranje<br>ben ik, vrij, onverveerd,<br>den koning van Hispanje<br>heb ik altijd geëerd.</i>",
      "onder": "Naar: het Wilhelmus (rond 1570)."
     },
     "q": "Filips II zag Willem van Oranje als zijn grote vijand. Leg met bron F uit dat Willem de relatie met Filips heel anders zag. (2p)",
     "tip": "Twee perspectieven: zet eerst hoe Filips het zag, dan hoe Willem het zag, en bewijs dat met een citaat uit de bron.",
     "model": [
      {
       "label": "Perspectief Filips",
       "tekst": "Filips II zag Willem als vijand en verklaarde hem later vogelvrij."
      },
      {
       "label": "Perspectief Willem + citaat",
       "tekst": "Willem zegt in het Wilhelmus: \"den koning van Hispanje heb ik altijd geëerd\". Hij zag zichzelf dus niet als vijand van de koning."
      },
      {
       "label": "Uitleg",
       "tekst": "Willem vocht volgens zichzelf tegen het harde bestuur van Alva, niet tegen de koning zelf."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem hoe Filips Willem zag (vijand).",
       "woorden": [
        "vijand",
        "filips"
       ]
      },
      {
       "t": "Ik citeer uit het Wilhelmus met aanhalingstekens.",
       "woorden": [
        "geëerd",
        "geeerd",
        "hispanje",
        "koning"
       ]
      },
      {
       "t": "Ik leg uit dat Willem zich geen vijand van de koning voelde.",
       "woorden": [
        "geen vijand",
        "niet",
        "eerde",
        "trouw"
       ]
      }
     ],
     "w": "Twee kanten: Filips zag een vijand, Willem zag zichzelf als trouwe onderdaan die de koning 'altijd geëerd' had.",
     "meer": "Bij een perspectiefvraag noem je altijd allebei de kanten. En 'met de bron' betekent: citeer, met aanhalingstekens."
    }
   ]
  }
 ]
},
{
 "id": "republiek",
 "emoji": "🇳🇱",
 "titel": "4.4.3 · Naar een eigen staat",
 "paragraaf": "§4.4",
 "kort": "Samenwerken (1576), uit elkaar (1579), de koning afzweren (1581) en verdergaan zonder vorst (1588). Vier jaartallen, één nieuwe staat.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Het laatste stuk van deze paragraaf is een rijtje van <b>vier jaartallen</b>. Leer ze als een verhaal, niet als losse getallen:",
    "<b>1576, samen.</b> Na de belegeringen en de muitende, plunderende Spaanse soldaten beseffen de gewesten dat ze moeten samenwerken. Ze sluiten een verdrag: elk gewest mag <b>zijn eigen godsdienst</b> bepalen en de Spaanse troepen moeten het land uit.",
    "<b>1579, uit elkaar.</b> De samenwerking houdt niet lang stand, want er komt tóch ruzie over godsdienst. <b>Alexander Farnese</b> volgt Alva op en krijgt de <b>zuidelijke</b>, vooral katholieke gewesten aan zijn kant. De <b>noordelijke</b> gewesten gaan alleen verder.",
    "<b>1581, de koning eraf.</b> De noordelijke gewesten erkennen Filips II niet langer als heer: het <b>Plakkaat van Verlatinghe</b>.<br><b>1588, zonder vorst verder.</b> Ze wijzen geen nieuwe vorst aan en gaan verder als <b>Republiek der Zeven Verenigde Nederlanden</b>."
   ],
   "regel": "1576 samen · 1579 uit elkaar (noord/zuid) · 1581 Filips afgezworen · 1588 Republiek.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat spraken de gewesten af in het verdrag van 1576?",
     "o": [
      "elk gewest mag zijn eigen godsdienst bepalen en de Spaanse troepen moeten weg",
      "alle gewesten worden katholiek",
      "Filips II wordt door de Staten-Generaal afgezet als koning en heer van alle gewesten",
      "de Tiende Penning wordt verhoogd"
     ],
     "a": "elk gewest mag zijn eigen godsdienst bepalen en de Spaanse troepen moeten weg",
     "w": "Twee afspraken: eigen godsdienst per gewest, en Spanjaarden eruit.",
     "meer": "De aanleiding was dat de Spaanse soldaten gingen muiten en plunderen. Dat trof iedereen, katholiek of protestant.",
     "fout": {
      "alle gewesten worden katholiek": "Juist niet: elk gewest mocht het <b>zelf</b> bepalen. Dat was de hele afspraak.",
      "de Tiende Penning wordt verhoogd": "De Tiende Penning was een maatregel van Alva, geen afspraak tussen de gewesten.",
      "Filips II wordt door de Staten-Generaal afgezet als koning en heer van alle gewesten": "Dat gebeurde pas in 1581, met het Plakkaat van Verlatinghe."
     }
    },
    {
     "t": "mc",
     "q": "Waarom viel de samenwerking van 1576 weer uit elkaar?",
     "o": [
      "de gewesten kregen tóch ruzie over godsdienst",
      "Filips II bood hun geld aan",
      "Willem van Oranje werd vermoord en niemand nam zijn plaats in",
      "de Spaanse troepen waren al vertrokken"
     ],
     "a": "de gewesten kregen tóch ruzie over godsdienst",
     "w": "De religieuze oorzaak. Elk gewest zijn eigen godsdienst klonk mooi, maar in de praktijk botste het.",
     "meer": "Farnese maakte daar handig gebruik van: hij kreeg de overwegend katholieke zuidelijke gewesten aan zijn kant.",
     "fout": {
      "Filips II bood hun geld aan": "Dat staat niet in de stof. Het ging om een conflict over <b>geloof</b>.",
      "de Spaanse troepen waren al vertrokken": "Dat was juist een van de afspraken die níet blijvend lukte, de oorlog ging gewoon door.",
      "Willem van Oranje werd vermoord en niemand nam zijn plaats in": "Dat was in 1584, dus ná de splitsing van 1579."
     }
    },
    {
     "t": "gap",
     "q": "In ___ erkenden de noordelijke gewesten Filips II niet langer als heer, in het Plakkaat van Verlatinghe.",
     "a": "1581",
     "w": "1581: het Plakkaat van Verlatinghe. De koning wordt 'verlaten', afgezworen.",
     "meer": "Ezelsbruggetje: <b>V</b>erlatinghe = de koning <b>V</b>erlaten."
    },
    {
     "t": "mc",
     "q": "Wat is een <b>republiek</b>?",
     "o": [
      "een land zonder vorst",
      "een land waarin het volk stemt over alles",
      "een land dat door de kerk wordt bestuurd",
      "een land met zeven koningen"
     ],
     "a": "een land zonder vorst",
     "w": "Republiek = geen koning, keizer of hertog aan het hoofd.",
     "meer": "Let op: republiek betekent niet automatisch democratie. Het bestuur lag bij regenten, niet bij het gewone volk.",
     "fout": {
      "een land waarin het volk stemt over alles": "Dit is de bekendste denkfout. Een republiek is een land <b>zonder vorst</b>: dat zegt nog niets over stemrecht. De Republiek werd bestuurd door regenten.",
      "een land dat door de kerk wordt bestuurd": "Dat zou een theocratie zijn. De Republiek was dat niet.",
      "een land met zeven koningen": "De 'zeven' in de naam slaat op de zeven <b>gewesten</b>, en juist niet op koningen: er was er geen enkele."
     }
    },
    {
     "t": "sleep",
     "opgave": "Zet bij het juiste jaartal.",
     "chips": [
      {
       "t": "De gewesten sluiten een verdrag: eigen godsdienst, Spanjaarden eruit",
       "bak": "1576",
       "waarom": "Kijk nog eens naar het kernwoord: \"De gewesten sluiten een verdrag: eigen godsdienst, Spanjaarden eruit\" hoort bij <b>1576</b>."
      },
      {
       "t": "Noord en zuid gaan uit elkaar",
       "bak": "1579",
       "waarom": "Kijk nog eens naar het kernwoord: \"Noord en zuid gaan uit elkaar\" hoort bij <b>1579</b>."
      },
      {
       "t": "Plakkaat van Verlatinghe",
       "bak": "1581",
       "waarom": "Kijk nog eens naar het kernwoord: \"Plakkaat van Verlatinghe\" hoort bij <b>1581</b>."
      },
      {
       "t": "Filips II wordt afgezworen",
       "bak": "1581",
       "waarom": "Kijk nog eens naar het kernwoord: \"Filips II wordt afgezworen\" hoort bij <b>1581</b>."
      },
      {
       "t": "Republiek der Zeven Verenigde Nederlanden",
       "bak": "1588",
       "waarom": "Kijk nog eens naar het kernwoord: \"Republiek der Zeven Verenigde Nederlanden\" hoort bij <b>1588</b>."
      },
      {
       "t": "Verder zonder een nieuwe vorst",
       "bak": "1588",
       "waarom": "Kijk nog eens naar het kernwoord: \"Verder zonder een nieuwe vorst\" hoort bij <b>1588</b>."
      }
     ],
     "bakjes": [
      {
       "id": "1576",
       "label": "1576",
       "som": ""
      },
      {
       "id": "1579",
       "label": "1579",
       "som": ""
      },
      {
       "id": "1581",
       "label": "1581",
       "som": ""
      },
      {
       "id": "1588",
       "label": "1588",
       "som": ""
      }
     ],
     "w": "1576 samen · 1579 uit elkaar · 1581 koning eraf · 1588 Republiek."
    },
    {
     "t": "mc",
     "q": "Wie vermoordde Willem van Oranje in 1584?",
     "o": [
      "Balthasar Gerards",
      "de hertog van Alva",
      "Alexander Farnese",
      "zijn zoon Maurits"
     ],
     "a": "Balthasar Gerards",
     "w": "Balthasar Gerards schoot hem op 10 juli 1584 neer in het Prinsenhof in Delft.",
     "meer": "Filips II had Willem vogelvrij verklaard en een prijs op zijn hoofd gezet.",
     "fout": {
      "de hertog van Alva": "Alva was toen al lang terug in Spanje (hij vertrok in 1573).",
      "Alexander Farnese": "Farnese was de Spaanse landvoogd na Alva, maar hij was niet de moordenaar.",
      "zijn zoon Maurits": "Maurits was Willems zoon en volgde hem op als stadhouder."
     }
    },
    {
     "t": "gap",
     "q": "De zeven noordelijke gewesten vormden vanaf ___ de Republiek der Zeven Verenigde Nederlanden.",
     "a": "1588|in 1588",
     "w": "1588: een staat zonder vorst.",
     "meer": "1588 is ook het jaar van de Spaanse Armada. Twee keer 1588 om te onthouden."
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Het <b>Plakkaat van Verlatinghe</b> (1581) is de belangrijkste bron van dit stuk. In bron 7 staat: <i>'…dat wij, door de uiterste nood gedwongen, … de koning van Spanje vervallen verklaren van zijn heerschappij, jurisdictie en erfelijke aanspraken op deze landen.'</i>",
    "Ontleed die zin, want er staan drie dingen in die je kunt gebruiken:<br>• <b>'door de uiterste nood gedwongen'</b>: ze doen het niet zomaar, ze zeggen dat het echt niet anders kan.<br>• <b>'vervallen verklaren van zijn heerschappij'</b>: hij is de baas niet meer.<br>• <b>'erfelijke aanspraken'</b>: ook zijn kinderen krijgen het niet.",
    "Dit is enorm: in die tijd was een vorst er 'van God gegeven'. Zomaar je koning afzetten was ongehoord.",
    "Voor <b>Willem van Oranje</b> had dit een direct gevolg: Filips verklaarde hem <b>vogelvrij</b> en loofde <b>25.000 gouden munten</b> uit voor wie hem zou doden. In <b>1584</b> werd hij in Delft doodgeschoten door <b>Balthasar Gerards</b>."
   ],
   "regel": "Plakkaat van Verlatinghe (1581): de Staten-Generaal verklaart Filips II vervallen van zijn heerschappij. Gevolg voor Willem: een prijs op zijn hoofd.",
   "vragen": [
    {
     "t": "mc",
     "q": "Wat betekent 'de koning van Spanje vervallen verklaren van zijn heerschappij'?",
     "o": [
      "hij is niet langer de heer van deze gewesten",
      "hij moet zijn schulden terugbetalen",
      "hij mag van de Staten nooit meer terug naar Spanje",
      "hij wordt gevangengenomen"
     ],
     "a": "hij is niet langer de heer van deze gewesten",
     "w": "Vervallen verklaren van zijn heerschappij = hij is hier de baas niet meer.",
     "meer": "In diezelfde zin staat ook 'erfelijke aanspraken': ook zijn nakomelingen kunnen er geen aanspraak meer op maken.",
     "fout": {
      "hij moet zijn schulden terugbetalen": "Het gaat niet over geld maar over <b>macht</b>: over wie hier de heer is.",
      "hij wordt gevangengenomen": "Daar was geen sprake van, hij zat in Spanje. Ze erkenden hem alleen niet meer.",
      "hij mag van de Staten nooit meer terug naar Spanje": "Spanje bleef gewoon van hem. Het gaat alleen over de Nederlandse gewesten."
     }
    },
    {
     "t": "mc",
     "q": "Wat was een gevolg voor Willem van Oranje ná het Plakkaat van Verlatinghe?",
     "o": [
      "Filips II loofde een beloning uit voor wie hem zou doden",
      "hij werd tot koning gekroond",
      "hij vluchtte terug naar Duitsland",
      "hij sloot in het geheim vrede met Filips II"
     ],
     "a": "Filips II loofde een beloning uit voor wie hem zou doden",
     "w": "25.000 gouden munten voor zijn dood. In 1584 werd hij vermoord door Balthasar Gerards.",
     "meer": "Filips zag Willem als de grote vijand: wie de leider uitschakelt, dacht hij, breekt de opstand.",
     "fout": {
      "hij werd tot koning gekroond": "Juist niet. De gewesten besloten in 1588 helemaal geen vorst meer aan te wijzen.",
      "hij vluchtte terug naar Duitsland": "Hij was al eerder uitgeweken, maar in 1584 was hij in Delft, daar werd hij vermoord.",
      "hij sloot in het geheim vrede met Filips II": "Het tegenovergestelde: Filips zette een prijs op zijn hoofd."
     }
    },
    {
     "t": "gap",
     "q": "Willem van Oranje werd in 1584 in Delft vermoord door ___.",
     "a": "Balthasar Gerards|Balthasar Gerardts|Gerards",
     "w": "Balthasar Gerards, uit op de beloning die Filips II had uitgeloofd.",
     "meer": "Het gebeurde op 10 juli 1584 op de trap van het Prinsenhof in Delft. Dat gebouw is nu een museum."
    },
    {
     "t": "mc",
     "q": "Wie volgde de hertog van Alva op als Spaanse landvoogd?",
     "o": [
      "Alexander Farnese",
      "Margaretha van Parma",
      "Balthasar Gerards",
      "Willem van Oranje"
     ],
     "a": "Alexander Farnese",
     "w": "Farnese kreeg de zuidelijke, vooral katholieke gewesten aan zijn kant.",
     "meer": "Hij was slimmer dan Alva: in plaats van alleen geweld gebruikte hij ook de verdeeldheid over godsdienst.",
     "fout": {
      "Margaretha van Parma": "Zij ging juist vóór Alva. Toen hij kwam, trad zij af.",
      "Balthasar Gerards": "Dat is de moordenaar van Willem van Oranje, geen landvoogd.",
      "Willem van Oranje": "Hij was de leider van de opstand, dus juist de tegenstander van de landvoogd."
     }
    },
    {
     "t": "mc",
     "q": "Waarom was het afzweren van Filips II in 1581 zo bijzonder?",
     "o": [
      "in die tijd gold een vorst als door God gegeven; hem afzetten was ongehoord",
      "het was de eerste keer dat er een oorlog begon",
      "Filips II was nog maar net koning geworden en kende de gewesten nog niet",
      "er was nog nooit een verdrag gesloten tussen gewesten"
     ],
     "a": "in die tijd gold een vorst als door God gegeven; hem afzetten was ongehoord",
     "w": "Je koning afzetten was niet zomaar politiek, het raakte aan het geloof zelf.",
     "meer": "Daarom staat er ook 'door de uiterste nood gedwongen' in het Plakkaat: ze verantwoorden zich, alsof ze willen zeggen dat ze echt geen keus hadden.",
     "fout": {
      "het was de eerste keer dat er een oorlog begon": "De oorlog liep toen al dertien jaar, sinds 1568.",
      "er was nog nooit een verdrag gesloten tussen gewesten": "Dat was er wel: het verdrag van 1576, en de Staten-Generaal bestond al veel langer.",
      "Filips II was nog maar net koning geworden en kende de gewesten nog niet": "Hij was het al sinds 1555, dus ruim 25 jaar."
     }
    },
    {
     "t": "sequence",
     "q": "Zet deze gebeurtenissen in de goede volgorde (oudste eerst).",
     "stappen": [
      "De watergeuzen nemen Den Briel in",
      "De gewesten gaan samenwerken onder Willem van Oranje",
      "Noord en zuid splitsen: Unie van Atrecht en Unie van Utrecht",
      "Plakkaat van Verlatinghe: Filips II wordt niet meer erkend",
      "De zeven noordelijke gewesten worden een republiek"
     ],
     "w": "1572 Den Briel, 1576 samenwerking, 1579 splitsing, 1581 Plakkaat, 1588 Republiek.",
     "meer": "Ezelsbrug voor het rijtje: eerst <b>winnen</b> (Briel), dan <b>samen</b>, dan <b>uit elkaar</b>, dan de koning <b>weg</b>, dan een <b>eigen staat</b>."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Het <b>kenmerkend aspect</b> van deze paragraaf is: <i>het conflict in de Nederlanden dat resulteerde in de stichting van een Nederlandse staat</i>.",
    "Bij zo'n vraag moet je laten zien dat je de <b>hele lijn</b> ziet: het begon als een conflict (over geloof, geld en bestuur) en het eindigde met iets wat er daarvoor niet was, een <b>eigen staat</b>.",
    "Bron 7 (Plakkaat van Verlatinghe) past erbij omdat het het moment is waarop de gewesten hun vorst <b>afzweren</b>: de oude band wordt verbroken. Bron 9 (de Republiek) past erbij omdat het laat zien wat er <b>in de plaats kwam</b>: een nieuwe staat, zónder vorst.",
    "Samen zijn die twee bronnen dus 'het einde van het oude' en 'het begin van het nieuwe'. Precies wat 'resulteerde in de stichting van een Nederlandse staat' betekent."
   ],
   "regel": "Kenmerkend aspect = van conflict naar eigen staat. Bron 7 = de breuk met de koning, bron 9 = de nieuwe staat die ervoor in de plaats kwam.",
   "vragen": [
    {
     "t": "open",
     "q": "Leg uit waarom het Plakkaat van Verlatinghe (bron 7) goed past bij het kenmerkend aspect 'het conflict in de Nederlanden dat resulteerde in de stichting van een Nederlandse staat'.",
     "punten": 2,
     "modelantwoord": "In het Plakkaat van Verlatinghe verklaren de gewesten in 1581 dat Filips II niet langer hun heer is. Daarmee verbreken ze de band met hun vorst, en dat is een noodzakelijke stap op weg naar een eigen staat. Het conflict dat begonnen was over geloof, belasting en bestuur loopt hier dus uit op het afzweren van de koning, waarna de gewesten zelf verder moesten.",
     "sleutelwoorden": [
      {
       "moet": [
        "1581",
        "verlatinghe",
        "afzweren",
        "afgezworen",
        "niet langer"
       ],
       "syn": [
        "vervallen"
       ]
      },
      {
       "moet": [
        "eigen staat",
        "zelf",
        "zonder",
        "republiek",
        "nieuwe staat"
       ],
       "syn": [
        "onafhankelijk"
       ]
      }
     ],
     "rubric": [
      "Je noemt dat de gewesten Filips II afzweren als heer",
      "Je verbindt dat aan het ontstaan van een eigen Nederlandse staat"
     ],
     "w": "Het Plakkaat is de breuk met de oude vorst, en zonder die breuk geen eigen staat.",
     "meer": "Bij een kenmerkend-aspectvraag moet je altijd de brug slaan tussen de bron en de <b>hele ontwikkeling</b>. Alleen navertellen wat er in de bron staat is niet genoeg."
    },
    {
     "t": "mc",
     "q": "Waarom past bron 9 (de Republiek der Zeven Verenigde Nederlanden) bij het kenmerkend aspect?",
     "o": [
      "het laat de nieuwe staat zien die uit het conflict ontstond",
      "het laat zien hoe de Beeldenstorm verliep",
      "het toont hoe groot de macht van Filips II nog was over de gewesten",
      "het bewijst dat de Nederlanden bij Spanje hoorden"
     ],
     "a": "het laat de nieuwe staat zien die uit het conflict ontstond",
     "w": "Het kenmerkend aspect eindigt met 'de stichting van een Nederlandse staat'. Bron 9 ís die staat.",
     "meer": "Handig om samen te onthouden: bron 7 = het oude eindigt (koning eraf), bron 9 = het nieuwe begint (Republiek).",
     "fout": {
      "het laat zien hoe de Beeldenstorm verliep": "Dat is bron 5. Bron 9 gaat over de Republiek van 1588.",
      "het bewijst dat de Nederlanden bij Spanje hoorden": "Dat is bovendien feitelijk onjuist: de Nederlanden waren een eigen gebied met dezelfde heer.",
      "het toont hoe groot de macht van Filips II nog was over de gewesten": "Het tegenovergestelde: het toont een land dat besloot zonder hem verder te gaan."
     }
    },
    {
     "t": "mc",
     "q": "Zet op volgorde: welke gebeurtenis kwam als <b>laatste</b>?",
     "o": [
      "de Republiek der Zeven Verenigde Nederlanden",
      "het Plakkaat van Verlatinghe",
      "de splitsing tussen noord en zuid",
      "het verdrag waarin elk gewest zijn eigen godsdienst mocht bepalen"
     ],
     "a": "de Republiek der Zeven Verenigde Nederlanden",
     "w": "1576 → 1579 → 1581 → 1588. De Republiek is het eindpunt.",
     "meer": "Dit is precies de volgorde die je nodig hebt bij opdracht 9a: bron 8 (1572) → 6 (1576) → 10 (1579) → 7 (1581) → 9 (1588).",
     "fout": {
      "het Plakkaat van Verlatinghe": "1581, bijna het laatste, maar de Republiek kwam nog zeven jaar later.",
      "de splitsing tussen noord en zuid": "1579, daarvóór.",
      "het verdrag waarin elk gewest zijn eigen godsdienst mocht bepalen": "1576, dat is juist het eerste van de vier."
     }
    },
    {
     "t": "mc",
     "q": "Een leerling zegt: 'De Tachtigjarige Oorlog was tachtig jaar lang onafgebroken vechten.' Wat klopt daar niet aan?",
     "o": [
      "er waren onderbrekingen, zoals een wapenstilstand tussen 1609 en 1621",
      "de oorlog duurde precies tachtig jaar, elk jaar zonder een enkele pauze",
      "de oorlog duurde maar veertig jaar",
      "er is helemaal nooit gevochten"
     ],
     "a": "er waren onderbrekingen, zoals een wapenstilstand tussen 1609 en 1621",
     "w": "1568–1648 is wel tachtig jaar, maar er werd niet al die tijd gevochten.",
     "meer": "Daarom gebruiken historici tegenwoordig liever de naam <b>Nederlandse Opstand</b>: die wekt minder de indruk van tachtig jaar aaneengesloten oorlog.",
     "fout": {
      "de oorlog duurde maar veertig jaar": "Nee: van 1568 tot 1648 is tachtig jaar. Alleen niet onafgebroken.",
      "er is helemaal nooit gevochten": "Er is wel degelijk veel gevochten, denk aan Heiligerlee, Den Briel en het beleg van Leiden.",
      "de oorlog duurde precies tachtig jaar, elk jaar zonder een enkele pauze": "Dat is juist de misvatting. Tussen 1609 en 1621 was er een wapenstilstand."
     }
    },
    {
     "t": "gap",
     "q": "Vanaf 1588 gingen de noordelijke gewesten verder als de Republiek der ___ Verenigde Nederlanden.",
     "a": "Zeven|zeven|7",
     "w": "Zeven gewesten, geen vorst. Dat is de officiële naam van Nederland tussen 1588 en 1795.",
     "meer": "De zeven slaat op de gewesten die samen doorvochten na de splitsing van 1579."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "bron": {
      "titel": "Bron G: uit het Plakkaat van Verlatinghe (1581)",
      "tekst": "\"Daarom maken wij bekend dat wij, door de uiterste nood gedwongen, na onderling overleg en met algemene stemmen de koning van Spanje vervallen verklaren van zijn heerschappij.\"",
      "onder": "Naar: het Plakkaat van Verlatinghe, 1581."
     },
     "q": "Leg met bron G uit dat deze bron past bij het kenmerkend aspect 'het conflict in de Nederlanden dat resulteerde in de stichting van een Nederlandse staat'. (2p)",
     "tip": "Koppel de bron aan het kenmerkend aspect: wat staat er in de bron (citaat), en waarom is dat een stap naar een eigen staat?",
     "model": [
      {
       "label": "Citaat",
       "tekst": "In de bron staat dat de Staten-Generaal \"de koning van Spanje vervallen verklaren van zijn heerschappij\"."
      },
      {
       "label": "Wat het betekent",
       "tekst": "De noordelijke gewesten erkennen Filips II niet meer als hun vorst."
      },
      {
       "label": "Koppeling",
       "tekst": "Daardoor kunnen ze een eigen staat beginnen zonder koning: in 1588 de Republiek der Zeven Verenigde Nederlanden."
      }
     ],
     "checklist": [
      {
       "t": "Ik citeer uit de bron.",
       "woorden": [
        "vervallen",
        "heerschappij",
        "koning van spanje"
       ]
      },
      {
       "t": "Ik leg uit wat dat betekent (Filips wordt niet meer erkend).",
       "woorden": [
        "erken",
        "niet meer",
        "afgezet",
        "verlat"
       ]
      },
      {
       "t": "Ik koppel het aan een eigen staat (de Republiek).",
       "woorden": [
        "republiek",
        "staat",
        "1588"
       ]
      }
     ],
     "w": "Plakkaat = de koning eruit; zonder koning kon de Republiek ontstaan.",
     "meer": "Bij een kenmerkend-aspect-vraag moet je antwoord allebei de helften raken: het conflict én de staat."
    }
   ]
  }
 ]
},
{
 "id": "oorzaak-gevolg",
 "emoji": "🧭",
 "titel": "4.4 · Oorzaken en gevolgen (vaardigheid)",
 "paragraaf": "§4.4",
 "kort": "De denkvaardigheid van dit hoofdstuk. Oorzaak of gevolg? Direct of indirect? Bedoeld of onbedoeld? En welk soort: economisch, religieus, politiek of sociaal?",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Niets in de geschiedenis komt zomaar uit de lucht vallen. Alles is het <b>gevolg</b> van eerdere gebeurtenissen én de <b>oorzaak</b> van latere.",
    "Eerst de makkelijkste vraag: <b>komt het ervóór of erná?</b><br>• Ervóór → <b>oorzaak</b> (de reden waarom iets gebeurde)<br>• Erná → <b>gevolg</b> (wat eruit voortkwam)",
    "Daarna het <b>soort</b>. Er zijn er vier, en die gaan over verschillende dingen:<br>• <b>Economisch</b>: alles met <b>arbeid en geld</b> (belasting, handel, winst, rijkdom)<br>• <b>Religieus</b>: alles met <b>geloof</b> (kerk, plakkaten, hagenpreken, beelden)<br>• <b>Politiek</b>: alles met <b>organisatie en bestuur</b> (centralisatie, rechtbanken, wie er de baas is)<br>• <b>Sociaal</b>: hoe <b>mensen met elkaar omgaan</b> (angst, vluchten, samenwerken)",
    "Vuistregel voor het soort: zoek het kernwoord. Zie je <b>geld</b>? Economisch. Zie je <b>geloof</b>? Religieus. Zie je <b>bestuur of macht</b>? Politiek. Zie je <b>mensen onderling</b>? Sociaal."
   ],
   "regel": "Ervóór = oorzaak, erná = gevolg. Soort: geld → economisch, geloof → religieus, bestuur → politiek, mensen onderling → sociaal.",
   "vragen": [
    {
     "t": "vb",
     "opgave": "Van welk soort is dit gevolg: 'Veel Nederlandse edelen vluchtten naar het buitenland uit angst voor de Raad van Beroerten.'",
     "waarom": {
      "q": "Welk soort gevolg is dit vooral?",
      "o": [
       "sociaal",
       "economisch",
       "religieus"
      ],
      "a": "sociaal"
     },
     "fout": {
      "economisch": "Er komt geen geld aan te pas. Economisch gaat over arbeid, handel, belasting en winst, denk aan de Tiende Penning.",
      "religieus": "Het geloof speelt op de achtergrond mee, maar het gevolg zelf gaat over wat mensen <b>doen</b>: wegvluchten uit angst. Dat is hoe mensen in een samenleving met elkaar omgaan, dus sociaal."
     },
     "stappen": [
      {
       "toon": "Stap 1: komt dit vóór of ná de Raad van Beroerten?",
       "uitleg": "Erná. Dus het is een gevolg, geen oorzaak."
      },
      {
       "toon": "Stap 2: wat is het kernwoord?",
       "uitleg": "'Vluchtten' en 'angst'. Geen geld, geen wet, geen kerk, het gaat over wat mensen doen en voelen."
      },
      {
       "toon": "→ Sociaal gevolg.",
       "uitleg": "Sociaal = hoe mensen in een samenleving met elkaar omgaan. Angst, vluchten en samenwerken horen daarbij."
      }
     ],
     "w": "Vluchten uit angst gaat over mensen onderling, dus sociaal.",
     "meer": "Let op: één gebeurtenis kan gevolgen van meerdere soorten hebben. De Raad van Beroerten had ook politieke gevolgen (edelen verloren hun positie)."
    },
    {
     "t": "sleep",
     "opgave": "Welk soort is dit? Let op het kernwoord.",
     "chips": [
      {
       "t": "De Tiende Penning van 10% op de handel",
       "bak": "economisch",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Tiende Penning van 10% op de handel\" hoort bij <b>economisch (geld)</b>."
      },
      {
       "t": "Filips' oorlogen kostten veel geld",
       "bak": "economisch",
       "waarom": "Kijk nog eens naar het kernwoord: \"Filips' oorlogen kostten veel geld\" hoort bij <b>economisch (geld)</b>."
      },
      {
       "t": "De bloedplakkaten tegen ketters",
       "bak": "religieus",
       "waarom": "Kijk nog eens naar het kernwoord: \"De bloedplakkaten tegen ketters\" hoort bij <b>religieus (geloof)</b>."
      },
      {
       "t": "De hagenpreken in het open veld",
       "bak": "religieus",
       "waarom": "Kijk nog eens naar het kernwoord: \"De hagenpreken in het open veld\" hoort bij <b>religieus (geloof)</b>."
      },
      {
       "t": "Centralisatie van het bestuur",
       "bak": "politiek",
       "waarom": "Kijk nog eens naar het kernwoord: \"Centralisatie van het bestuur\" hoort bij <b>politiek (bestuur)</b>."
      },
      {
       "t": "De Raad van Beroerten als rechtbank",
       "bak": "politiek",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Raad van Beroerten als rechtbank\" hoort bij <b>politiek (bestuur)</b>."
      }
     ],
     "bakjes": [
      {
       "id": "economisch",
       "label": "economisch (geld)",
       "som": ""
      },
      {
       "id": "religieus",
       "label": "religieus (geloof)",
       "som": ""
      },
      {
       "id": "politiek",
       "label": "politiek (bestuur)",
       "som": ""
      }
     ],
     "w": "Geld → economisch. Geloof → religieus. Bestuur en rechtspraak → politiek."
    },
    {
     "t": "mc",
     "q": "Is dit een oorzaak of een gevolg van de Beeldenstorm: 'Filips II stuurde de hertog van Alva naar de Nederlanden'?",
     "o": [
      "een gevolg",
      "een oorzaak",
      "allebei tegelijk",
      "geen van beide"
     ],
     "a": "een gevolg",
     "w": "Alva kwam ná de Beeldenstorm, als reactie erop. Dus: gevolg.",
     "meer": "Check altijd eerst de tijdsvolgorde. Beeldenstorm = 1566, komst van Alva = 1567.",
     "fout": {
      "een oorzaak": "Een oorzaak moet <b>vóór</b> de gebeurtenis komen. Alva kwam pas in 1567, dus ná de Beeldenstorm van 1566.",
      "allebei tegelijk": "Dat kan wel bij een keten (een gevolg kan weer de oorzaak van iets anders zijn), maar níet van dezelfde gebeurtenis. Ten opzichte van de Beeldenstorm is dit alleen een gevolg.",
      "geen van beide": "Er is duidelijk verband: Filips stuurde Alva juist <b>omdat</b> de Beeldenstorm had plaatsgevonden."
     }
    },
    {
     "t": "mc",
     "q": "Welk soort oorzaak is dit: 'De calvinisten waren boos op de rijkdom van de katholieke kerk'?",
     "o": [
      "economisch",
      "politiek",
      "sociaal",
      "geen oorzaak maar een gevolg"
     ],
     "a": "economisch",
     "w": "Rijkdom = geld en bezit, dus economisch.",
     "meer": "Dit is een lastige, want er zit ook geloof in. Maar het <b>kernwoord</b> is rijkdom, en rijkdom hoort bij economisch.",
     "fout": {
      "politiek": "Politiek gaat over bestuur en macht: wie er de baas is. Hier gaat het over bezit.",
      "sociaal": "Sociaal gaat over hoe mensen met elkaar omgaan. Hier gaat het over het <b>geld</b> van de kerk.",
      "geen oorzaak maar een gevolg": "Het is wel degelijk een oorzaak: deze boosheid speelde vóór de Beeldenstorm en dreef die mede aan."
     }
    },
    {
     "t": "gap",
     "q": "Alles wat met arbeid en geld te maken heeft, noem je een ___ oorzaak of gevolg.",
     "a": "economische|economisch",
     "w": "Economisch: arbeid, geld, handel, belasting, winst, rijkdom.",
     "meer": "De vier soorten: economisch (geld), religieus (geloof), politiek (bestuur), sociaal (mensen onderling)."
    },
    {
     "t": "mc",
     "q": "Wat is een <b>directe</b> oorzaak?",
     "o": [
      "de laatste druppel",
      "iets wat al heel lang op de achtergrond speelt",
      "een oorzaak die met geld te maken heeft",
      "een gevolg dat niemand eigenlijk wilde"
     ],
     "a": "de laatste druppel",
     "w": "Direct = vlak ervoor, de aanleiding: de laatste druppel die de emmer doet overlopen.",
     "meer": "Indirect = speelt al langer. Soms zie je pas achteraf dat het meespeelde.",
     "fout": {
      "iets wat al heel lang op de achtergrond speelt": "Dat is juist een <b>indirecte</b> oorzaak.",
      "een oorzaak die met geld te maken heeft": "Dat is een <b>economische</b> oorzaak: dat gaat over het soort, niet over direct of indirect.",
      "een gevolg dat niemand eigenlijk wilde": "Dat is een <b>onbedoeld gevolg</b>. Een oorzaak komt vóór de gebeurtenis."
     }
    },
    {
     "t": "mc",
     "q": "'Veel Nederlanders verloren hun geld doordat de handel terugliep.' Welk soort gevolg is dit?",
     "o": [
      "economisch",
      "religieus",
      "politiek",
      "sociaal"
     ],
     "a": "economisch",
     "w": "Geld en handel: economisch.",
     "meer": "Zoek het kernwoord: geld, handel, belasting, winst = economisch.",
     "fout": {
      "religieus": "Er staat niets over geloof of de kerk in.",
      "politiek": "Het gaat niet over bestuur of wie de baas is, maar over geld.",
      "sociaal": "Sociaal gaat over hoe mensen met elkaar omgaan. Hier draait het om geld."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Nu de twee onderscheidingen waar het echt op aankomt. Ze worden vaak door elkaar gehaald, dus zet ze scherp.",
    "<b>Bij oorzaken: direct of indirect?</b><br>• <b>Direct</b> (ook wel <b>aanleiding</b>) = de laatste druppel. Eén concrete gebeurtenis, vlak ervoor.<br>• <b>Indirect</b> = speelt al veel langer, op de achtergrond. Vaak zie je het pas achteraf.<br><i>Voorbeeld:</i> de Beeldenstorm is de <b>directe</b> oorzaak van Alva's komst. Het groeiende calvinisme en de ruzie over centralisatie zijn <b>indirecte</b> oorzaken.",
    "<b>Bij gevolgen: bedoeld of onbedoeld?</b><br>• <b>Bedoeld</b> = dit wílde degene die het deed.<br>• <b>Onbedoeld</b> = het gebeurde óók, maar niemand wilde het.<br><i>Voorbeeld:</i> Alva's bedoelde gevolg was de orde herstellen. Zijn onbedoelde gevolg was een veel grotere opstand.",
    "Let op de valkuil: <b>onbedoeld betekent niet onbelangrijk</b>. Vaak zijn juist de onbedoelde gevolgen het interessantst, in dit hoofdstuk zijn ze zelfs de rode draad."
   ],
   "regel": "Direct = de laatste druppel, vlak ervoor. Indirect = speelt al langer. Bedoeld = dit wilde je. Onbedoeld = het gebeurde toch.",
   "vragen": [
    {
     "t": "mc",
     "q": "Welke oorzaak van de Nederlandse Opstand is <b>indirect</b>?",
     "o": [
      "de groei van het calvinisme sinds de jaren 1550",
      "de Beeldenstorm van 1566, toen er overal kerken werden vernield",
      "de komst van Alva in 1567",
      "de inname van Den Briel in 1572 door de watergeuzen"
     ],
     "a": "de groei van het calvinisme sinds de jaren 1550",
     "w": "Iets dat al jaren speelde en langzaam de spanning opbouwde: dat is indirect.",
     "meer": "Directe oorzaken zijn losse gebeurtenissen vlak ervoor. Indirecte oorzaken zijn ontwikkelingen die al langer aan de gang waren.",
     "fout": {
      "de komst van Alva in 1567": "Ook een concrete gebeurtenis, en bovendien zelf een gevolg van de Beeldenstorm.",
      "de Beeldenstorm van 1566, toen er overal kerken werden vernield": "Dat is juist een <b>directe</b> oorzaak: één concrete gebeurtenis waar Filips meteen op reageerde.",
      "de inname van Den Briel in 1572 door de watergeuzen": "Dat gebeurde ná het begin van de Opstand (1568), dus het kan er geen oorzaak van zijn."
     }
    },
    {
     "t": "mc",
     "q": "Filips II liet Willem van Oranje vermoorden om de opstand te breken. De opstand ging gewoon door en Willem werd een symbool. Hoe noem je dat laatste?",
     "o": [
      "een onbedoeld gevolg",
      "een bedoeld gevolg",
      "een indirecte oorzaak",
      "continuïteit"
     ],
     "a": "een onbedoeld gevolg",
     "w": "Filips wilde de opstand breken, niet een held creëren. Dus: onbedoeld.",
     "meer": "Het <b>bedoelde</b> gevolg was: leider weg, opstand voorbij. Dat eerste lukte, dat tweede niet.",
     "fout": {
      "een bedoeld gevolg": "Dan had Filips gewild dat Willem een symbool werd. Dat is wel het laatste wat hij wilde.",
      "een indirecte oorzaak": "Dit komt ná de moord, dus het is een gevolg. Oorzaken liggen ervóór.",
      "continuïteit": "Dat betekent dat iets hetzelfde blijft. Hier verandert juist iets: Willem wordt na zijn dood een symbool."
     }
    },
    {
     "t": "sleep",
     "opgave": "Bedoeld of onbedoeld gevolg?",
     "chips": [
      {
       "t": "Alva straft de beeldenstormers met de Raad van Beroerten",
       "bak": "bedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"Alva straft de beeldenstormers met de Raad van Beroerten\" hoort bij <b>bedoeld (dit wilden ze)</b>."
      },
      {
       "t": "De Tiende Penning levert Alva geld op voor zijn leger",
       "bak": "bedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"De Tiende Penning levert Alva geld op voor zijn leger\" hoort bij <b>bedoeld (dit wilden ze)</b>."
      },
      {
       "t": "Filips laat Willem van Oranje vermoorden en schakelt de leider uit",
       "bak": "bedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"Filips laat Willem van Oranje vermoorden en schakelt de leider uit\" hoort bij <b>bedoeld (dit wilden ze)</b>."
      },
      {
       "t": "Door Alva's harde optreden wordt het verzet juist groter",
       "bak": "onbedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"Door Alva's harde optreden wordt het verzet juist groter\" hoort bij <b>onbedoeld (dit wilde niemand)</b>."
      },
      {
       "t": "Door de versoepeling van Margaretha leeft het calvinisme op",
       "bak": "onbedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"Door de versoepeling van Margaretha leeft het calvinisme op\" hoort bij <b>onbedoeld (dit wilde niemand)</b>."
      },
      {
       "t": "Margaretha van Parma verliest haar functie als landvoogdes",
       "bak": "onbedoeld",
       "waarom": "Kijk nog eens naar het kernwoord: \"Margaretha van Parma verliest haar functie als landvoogdes\" hoort bij <b>onbedoeld (dit wilde niemand)</b>."
      }
     ],
     "bakjes": [
      {
       "id": "bedoeld",
       "label": "bedoeld (dit wilden ze)",
       "som": ""
      },
      {
       "id": "onbedoeld",
       "label": "onbedoeld (dit wilde niemand)",
       "som": ""
      }
     ],
     "w": "Vraag je af: wilde degene die het deed dít resultaat? Ja → bedoeld. Nee, maar het gebeurde toch → onbedoeld."
    },
    {
     "t": "mc",
     "q": "Wat is een ander woord voor <b>directe oorzaak</b>?",
     "o": [
      "aanleiding",
      "gevolg",
      "kantelpunt",
      "kenmerkend aspect"
     ],
     "a": "aanleiding",
     "w": "Aanleiding = directe oorzaak = de laatste druppel.",
     "meer": "Op het SO mag je beide woorden gebruiken. Leg wel uit <i>waarom</i> het de laatste druppel was.",
     "fout": {
      "gevolg": "Een gevolg komt juist erná. Een oorzaak ligt ervóór.",
      "kantelpunt": "Een kantelpunt is een moment waarna de situatie anders is. Dat gaat over de <b>omslag</b>, niet over de reden waarom iets begon.",
      "kenmerkend aspect": "Dat is iets heel anders: een belangrijk kenmerk van een tijdvak, zoals 'het conflict dat leidde tot een Nederlandse staat'."
     }
    },
    {
     "t": "gap",
     "q": "Een oorzaak die al lang op de achtergrond speelt, heet een ___ oorzaak.",
     "a": "indirecte|indirect|structurele",
     "w": "Indirect (ook wel structureel): speelt al langer, vaak zie je het pas achteraf.",
     "meer": "Tegenover de directe oorzaak, de aanleiding: één concrete gebeurtenis vlak vóór het moment."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Noem de oorzaak waarom de monniken Voes en Van Essen in 1523 levend verbrand werden. Begin je antwoord met het soort oorzaak dat het beste past. (2p)",
     "tip": "De vraag zegt het letterlijk: begin met het soort (religieus, politiek, economisch, sociaal). Pas daarna de oorzaak zelf.",
     "model": [
      {
       "label": "Soort oorzaak",
       "tekst": "Een religieuze oorzaak."
      },
      {
       "label": "De oorzaak",
       "tekst": "De monniken waren aanhangers van Luther, en dat was sinds het Edict van Worms ten strengste verboden. Daarom werden ze als ketters verbrand."
      }
     ],
     "checklist": [
      {
       "t": "Mijn eerste woorden zijn het soort oorzaak: religieus.",
       "woorden": [
        "religieus"
       ]
      },
      {
       "t": "Ik noem de oorzaak: ze volgden Luther of waren protestant (ketter).",
       "woorden": [
        "luther",
        "protestant",
        "ketter",
        "geloof"
       ]
      }
     ],
     "w": "Soort voorop: religieus. Dan pas de oorzaak: ze volgden de verboden leer van Luther.",
     "meer": "Dit was een T2-vraag waarop veel punten blijven liggen, alleen omdat het soort oorzaak niet vooraan staat. Het werkboek vraagt het letterlijk: doe het dan ook."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Op het SO moet je oorzaken en gevolgen niet alleen <b>herkennen</b>, maar ook in een <b>zin</b> zetten. Dat is waar de meeste punten zitten, en waar de meeste antwoorden misgaan.",
    "Gebruik <b>signaalwoorden</b>. Die laten zien dat je het verband snapt: <i>omdat</i>, <i>waardoor</i>, <i>daardoor</i>, <i>dit leidde ertoe dat</i>, <i>met als gevolg dat</i>.",
    "Het werkboek geeft bij opdracht 13b zelfs de zinsbouw kado: <b>'De … (gebeurtenis 1) leidt zo … (uitleg) tot de … (gebeurtenis 2).'</b> Gebruik die vorm.",
    "<b>Slechte zin:</b> <i>'De Beeldenstorm. Alva kwam.'</i>, twee losse feiten, nul verband.<br><b>Goede zin:</b> <i>'De Beeldenstorm maakte Filips II woedend, waardoor hij zijn beste generaal Alva naar de Nederlanden stuurde om orde op zaken te stellen.'</i>, hier staat het verband er echt in."
   ],
   "regel": "Schrijf het verband op met een signaalwoord: omdat, waardoor, daardoor, dit leidde ertoe dat. Twee losse feiten naast elkaar is geen uitleg.",
   "vragen": [
    {
     "t": "open",
     "q": "Schrijf één zin waarin je uitlegt hoe de Beeldenstorm leidde tot de komst van de hertog van Alva. Gebruik een signaalwoord zoals 'waardoor' of 'daardoor'.",
     "punten": 2,
     "modelantwoord": "De Beeldenstorm van 1566 maakte Filips II woedend, waardoor hij zijn beste generaal, de hertog van Alva, met een leger naar de Nederlanden stuurde om de beeldenstormers te straffen en de orde te herstellen.",
     "sleutelwoorden": [
      {
       "moet": [
        "waardoor",
        "daardoor",
        "omdat",
        "leidde",
        "zodat",
        "met als gevolg"
       ],
       "syn": [
        "hierdoor"
       ]
      },
      {
       "moet": [
        "alva"
       ],
       "syn": []
      }
     ],
     "rubric": [
      "Je gebruikt een signaalwoord dat het verband aangeeft",
      "Je noemt zowel de Beeldenstorm als de komst van Alva in één lopende zin"
     ],
     "w": "Een goede oorzaak-gevolgzin bevat allebei de gebeurtenissen én een signaalwoord dat ze verbindt.",
     "meer": "Twee losse zinnen achter elkaar ('Er was een Beeldenstorm. Alva kwam.') leveren geen punten op, ook al klopt alles. De nakijker wil het <b>verband</b> zien."
    },
    {
     "t": "mc",
     "q": "Welke zin legt het verband het <b>beste</b> uit?",
     "o": [
      "Alva voerde de Tiende Penning in, waardoor ook katholieke handelaars zich tegen hem keerden.",
      "Alva voerde de Tiende Penning in. Katholieke handelaars waren daar heel erg boos over.",
      "De Tiende Penning was 10% belasting op handel en winst.",
      "Alva had geld nodig en de handelaars hadden geld."
     ],
     "a": "Alva voerde de Tiende Penning in, waardoor ook katholieke handelaars zich tegen hem keerden.",
     "w": "Hier staat een signaalwoord ('waardoor') dat oorzaak en gevolg echt aan elkaar knoopt.",
     "meer": "Let op het woordje 'ook' in die zin: dat maakt duidelijk waaróm het belangrijk is, het verzet werd breder dan alleen protestants.",
     "fout": {
      "De Tiende Penning was 10% belasting op handel en winst.": "Dit is alleen een <b>definitie</b>. Er is helemaal geen gevolg genoemd.",
      "Alva had geld nodig en de handelaars hadden geld.": "Dit noemt alleen een situatie. 'En' is geen signaalwoord voor oorzaak en gevolg.",
      "Alva voerde de Tiende Penning in. Katholieke handelaars waren daar heel erg boos over.": "Allebei waar, maar het zijn twee losse zinnen. Er staat nergens dát het één door het ander kwam."
     }
    },
    {
     "t": "sleep",
     "opgave": "Zet de ketting op volgorde: welke stap komt wanneer?",
     "chips": [
      {
       "t": "1. Filips vervolgt protestanten hard",
       "bak": "begin",
       "waarom": "Kijk nog eens naar het kernwoord: \"1. Filips vervolgt protestanten hard\" hoort bij <b>het begon met…</b>."
      },
      {
       "t": "2. Edelen schrijven het Smeekschrift",
       "bak": "midden",
       "waarom": "Kijk nog eens naar het kernwoord: \"2. Edelen schrijven het Smeekschrift\" hoort bij <b>daardoor…</b>."
      },
      {
       "t": "3. Margaretha versoepelt de plakkaten",
       "bak": "midden",
       "waarom": "Kijk nog eens naar het kernwoord: \"3. Margaretha versoepelt de plakkaten\" hoort bij <b>daardoor…</b>."
      },
      {
       "t": "4. Het calvinisme leeft op, hagenpreken ontstaan",
       "bak": "midden",
       "waarom": "Kijk nog eens naar het kernwoord: \"4. Het calvinisme leeft op, hagenpreken ontstaan\" hoort bij <b>daardoor…</b>."
      },
      {
       "t": "5. De Beeldenstorm breekt uit",
       "bak": "eind",
       "waarom": "Kijk nog eens naar het kernwoord: \"5. De Beeldenstorm breekt uit\" hoort bij <b>en uiteindelijk…</b>."
      },
      {
       "t": "6. Filips stuurt de hertog van Alva",
       "bak": "eind",
       "waarom": "Kijk nog eens naar het kernwoord: \"6. Filips stuurt de hertog van Alva\" hoort bij <b>en uiteindelijk…</b>."
      }
     ],
     "bakjes": [
      {
       "id": "begin",
       "label": "het begon met…",
       "som": ""
      },
      {
       "id": "midden",
       "label": "daardoor…",
       "som": ""
      },
      {
       "id": "eind",
       "label": "en uiteindelijk…",
       "som": ""
      }
     ],
     "w": "Elke stap is het gevolg van de vorige én de oorzaak van de volgende. Zo werkt een oorzaak-gevolgketen."
    },
    {
     "t": "mc",
     "q": "Een gevolg kan zelf weer een oorzaak worden. Welk voorbeeld laat dat het beste zien?",
     "o": [
      "de Beeldenstorm is een gevolg van de versoepeling én de oorzaak van Alva's komst",
      "de Beeldenstorm is een gevolg van Alva's komst",
      "de Tiende Penning is een oorzaak van de Beeldenstorm, want alles werd duurder",
      "het Plakkaat van Verlatinghe is een oorzaak van het Smeekschrift"
     ],
     "a": "de Beeldenstorm is een gevolg van de versoepeling én de oorzaak van Alva's komst",
     "w": "Dezelfde gebeurtenis, twee rollen: gevolg van wat ervoor kwam, oorzaak van wat erna kwam.",
     "meer": "Zo hangt de hele geschiedenis aan elkaar: er is bijna nooit een begin of een eind, alleen een keten.",
     "fout": {
      "de Beeldenstorm is een gevolg van Alva's komst": "De volgorde klopt niet: Alva kwam in 1567, ná de Beeldenstorm van 1566.",
      "het Plakkaat van Verlatinghe is een oorzaak van het Smeekschrift": "Vijftien jaar in de verkeerde richting: het Smeekschrift was 1566, het Plakkaat 1581.",
      "de Tiende Penning is een oorzaak van de Beeldenstorm, want alles werd duurder": "Ook hier klopt de volgorde niet: de Tiende Penning kwam pas in 1569."
     }
    },
    {
     "t": "open",
     "q": "Noem zowel een economische oorzaak als een economisch gevolg van de invoering van de Tiende Penning door Alva.",
     "punten": 2,
     "modelantwoord": "Een economische oorzaak is dat Alva geld nodig had om zijn leger in de Nederlanden te betalen. Een economisch gevolg is dat iedereen die handel dreef 10 procent belasting moest afdragen over verkoop en winst, waardoor handelaars minder overhielden en zich tegen Alva keerden.",
     "sleutelwoorden": [
      {
       "moet": [
        "leger",
        "geld nodig",
        "betalen",
        "kosten"
       ],
       "syn": [
        "soldaten"
       ]
      },
      {
       "moet": [
        "10",
        "tien",
        "belasting",
        "handel",
        "winst"
       ],
       "syn": [
        "procent"
       ]
      }
     ],
     "rubric": [
      "Je noemt als oorzaak dat Alva geld nodig had (voor zijn leger)",
      "Je noemt als gevolg dat handel en winst zwaarder belast werden"
     ],
     "w": "Oorzaak: Alva had geld nodig voor zijn leger. Gevolg: 10% belasting op verkoop en winst, en dus verzet van handelaars.",
     "meer": "Let erop dat de vraag om <b>allebei</b> vraagt en om <b>economische</b>. Een religieus of politiek antwoord telt hier niet mee, hoe waar het ook is."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg in stappen uit waarom de Nederlanden in 1568 in opstand kwamen tegen Filips II. Begin bij Filips II en eindig bij de Opstand. (4p)",
     "tip": "Bij veel verbanden: elke stap op een eigen regel, met 'daardoor' ertussen. Noem bij de oorzaken het soort.",
     "model": [
      {
       "label": "Stap 1 (politiek)",
       "tekst": "Filips II zette de centralisatie voort, waardoor gewesten en edelen bang waren hun privileges te verliezen."
      },
      {
       "label": "Stap 2 (religieus)",
       "tekst": "Hij vervolgde de calvinisten met bloedplakkaten en de inquisitie. Daardoor kwamen er hagenpreken en in 1566 de Beeldenstorm."
      },
      {
       "label": "Stap 3",
       "tekst": "Daardoor stuurde Filips de hertog van Alva, die met de Raad van Beroerten en de Tiende Penning (economisch) hard optrad."
      },
      {
       "label": "Stap 4",
       "tekst": "Daardoor kwam in 1568 onder leiding van Willem van Oranje de Nederlandse Opstand op gang."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin bij Filips II en eindig bij de Opstand van 1568.",
       "woorden": [
        "filips",
        "1568",
        "opstand"
       ]
      },
      {
       "t": "Ik noem minstens twee soorten oorzaken (politiek, religieus, economisch).",
       "woorden": [
        "politiek",
        "religieus",
        "economisch"
       ]
      },
      {
       "t": "Ik noem de Beeldenstorm en Alva als tussenstappen.",
       "woorden": [
        "beeldenstorm",
        "alva"
       ]
      },
      {
       "t": "Ik verbind de stappen met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor"
       ]
      }
     ],
     "w": "Een opstand heeft meerdere oorzaken tegelijk (geloof, geld en macht), en de Beeldenstorm en Alva zijn de laatste stappen.",
     "meer": "Valkuil: alleen het geloof noemen. Het werkboek wil zien dat je ook de politieke (centralisatie) en economische (belasting) oorzaken kent."
    }
   ]
  }
 ]
}
);


/* ===== §4.5 De strijd beslecht ===== */
window.LEERSTOF.push(
{
 "id": "maurits",
 "emoji": "⚔️",
 "titel": "4.5.1 · Een grotere Republiek",
 "paragraaf": "§4.5",
 "kort": "Na de moord op Willem van Oranje wordt zijn zoon Maurits stadhouder. Met een beter leger, slim gebruik van de rivieren en een Spanje dat overal tegelijk vecht, verovert hij stad na stad.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In <b>1584</b> wordt <b>Willem van Oranje</b> vermoord. Zijn zoon <b>Maurits van Nassau</b> wordt op zijn achttiende verjaardag (1585) <b>stadhouder</b> van Holland en Zeeland: dezelfde functie die zijn vader had. Een stadhouder is de <b>'plaatsvervanger van de heer binnen een gewest'</b>. Maurits houdt van legerzaken; de politiek laat hij over aan de <b>Staten-Generaal</b>. Houd de Oranjes uit elkaar: <b>Willem</b> is de vader, <b>Maurits</b> de zoon, en <b>Frederik Hendrik</b> (komt in 4.5.3) is de halfbroer van Maurits.",
    "Maurits wordt aanvoerder van het <b>Staatse leger</b>: de <b>'naam voor het leger van de opstandige Nederlanden tegen Spanje'</b>. Vanaf <b>1585</b> is Engeland ook in oorlog met Spanje, en dan werken de Engelsen en de opstandelingen samen tegen Filips II. In <b>1588</b> gaan de zeven noordelijke gewesten verder als de <b>Republiek der Zeven Verenigde Nederlanden</b>: de <b>'officiële volledige naam van Nederland tussen 1588 en 1795, meestal afgekort tot De Republiek'</b>.",
    "Maurits wint steeds meer steden terug, zoals <b>Breda</b> (1590, met een truc: soldaten verstopt in een <b>turfschip</b>) en Deventer. Dat lukt door <b>vier oorzaken</b>:<br><b>1. Hervorming van het Staatse leger</b>: klein, maar goed betaald en goed bewapend (musketten, kanonnen).<br><b>2. Gebruik van de rivieren</b>: wapens en goederen gaan snel over het water, en Maurits verovert eerst de steden aan de rivieren.<br><b>3. Muiterij in het Spaanse leger</b>: Filips heeft weinig geld, zijn huursoldaten krijgen vaak geen loon en gaan muiten. Muiterij is een <b>'opstand binnen landleger of scheepsbemanning tegen het gezag'</b>. Al in <b>1576</b> plunderen onbetaalde soldaten drie dagen lang Antwerpen: de <b>Spaanse furie</b>.<br><b>4. Spanje moet zijn aandacht verdelen</b>: het vecht tegen de opstandelingen, tegen Engeland én tegen Frankrijk. Daar regeert de protestantse koning <b>Hendrik IV</b>, die in <b>1598</b> met het <b>Edict van Nantes</b> godsdienstvrijheid geeft.",
    "Spanje vecht op zee en op land. Op zee vaart in <b>1588</b> de <b>Spaanse Armada</b> (Armada betekent vloot) naar het noorden om protestants Engeland aan te vallen. Dat mislukt volledig: een zware storm, bedorven eten en drinkwater, het Spaanse landleger dat de vloot niet kan bereiken, en een slimmere Engelse vloot. Tientallen schepen keren nooit terug. Op land gaat het Spanje beter: in <b>1585</b> valt <b>Antwerpen</b> na een beleg van veertien maanden, net als Brussel en Gent.",
    "Let op: <b>1588</b> is twee keer belangrijk. Het is het jaar van de <b>Armada</b> én het begin van de <b>Republiek</b>."
   ],
   "regel": "Maurits wint door vier oorzaken: een hervormd leger, slim gebruik van de rivieren, muiterij bij de Spanjaarden en een Spanje dat zijn aandacht moet verdelen.",
   "voorbeelden": [
    {
     "en": "Willem (vader, †1584) → Maurits (zoon, stadhouder vanaf 1585) → Frederik Hendrik (halfbroer van Maurits, vanaf 1625).",
     "let": "Drie Oranjes, drie generaties of broers: zet ze altijd in deze volgorde."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wie wordt na de moord op Willem van Oranje (1584) stadhouder van Holland en Zeeland?",
     "o": [
      "Maurits, de zoon van Willem",
      "Frederik Hendrik, de jongere broer van Willem",
      "Johan van Oldenbarnevelt, de landsadvocaat",
      "Alva, de landvoogd"
     ],
     "a": "Maurits, de zoon van Willem",
     "w": "Maurits van Nassau is de zoon van Willem van Oranje. Hij wordt op zijn achttiende verjaardag stadhouder.",
     "meer": "Hij krijgt dezelfde functie als zijn vader had. De politiek laat hij aan de Staten-Generaal over: hij is een militair.",
     "fout": {
      "Frederik Hendrik, de jongere broer van Willem": "Frederik Hendrik is geen broer van Willem, maar de <b>halfbroer van Maurits</b> (dus ook een zoon van Willem). Hij wordt pas in <b>1625</b> stadhouder, na de dood van Maurits.",
      "Johan van Oldenbarnevelt, de landsadvocaat": "Van Oldenbarnevelt is <b>landsadvocaat</b>: de hoogste ambtenaar van de Staten. Hij leidt de politiek, niet het leger. Stadhouder wordt hij nooit.",
      "Alva, de landvoogd": "Alva staat aan de kant van Spanje en is in 1584 al lang vertrokken (1573). Een stadhouder van het opstandige Holland komt uit de familie Oranje."
     }
    },
    {
     "t": "gap",
     "q": "Een stadhouder is de ___ van de heer binnen een gewest.",
     "a": "plaatsvervanger|plaatsvervanger van de heer|vervanger",
     "w": "Letterlijke definitie: 'plaatsvervanger van de heer binnen een gewest'.",
     "meer": "Let op het verschil met een <b>landvoogd</b>: die vervangt de heer in <b>alle</b> gewesten. Een stadhouder doet dat in <b>één</b> gewest (of een paar, zoals Maurits in Holland en Zeeland)."
    },
    {
     "t": "mc",
     "q": "Welk land wordt vanaf 1585 de bondgenoot van de opstandelingen tegen Spanje?",
     "o": [
      "Engeland, dat ook tegen Spanje vocht",
      "Frankrijk, dat net een katholieke koning kreeg",
      "het Duitse Rijk van de keizer",
      "Portugal, met zijn grote handelsvloot"
     ],
     "a": "Engeland, dat ook tegen Spanje vocht",
     "w": "In 1585 raakt Engeland in oorlog met Spanje. Daarna werken de Engelsen en de opstandelingen samen tegen Filips II.",
     "meer": "Drie jaar later stuurt Filips daarom de Armada naar Engeland. Zo hangen 1585 en 1588 aan elkaar.",
     "fout": {
      "Frankrijk, dat net een katholieke koning kreeg": "Frankrijk vecht later ook tegen Spanje, maar daar regeert de <b>protestantse</b> koning Hendrik IV. De bondgenoot uit 1585 is Engeland.",
      "het Duitse Rijk van de keizer": "De keizer is familie van Filips II (de Habsburgers). Dat is geen bondgenoot van de opstandelingen.",
      "Portugal, met zijn grote handelsvloot": "Portugal valt vanaf 1580 juist onder dezelfde koning als Spanje: Filips II. Het staat dus aan de verkeerde kant."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "1576: onbetaalde Spaanse soldaten plunderen Antwerpen (Spaanse furie)",
      "1584: Willem van Oranje vermoord, Maurits wordt stadhouder",
      "1585: Antwerpen valt en Engeland wordt bondgenoot",
      "1588: de Armada mislukt en de Republiek begint",
      "1590: Maurits verovert Breda met een turfschip",
      "1598: Hendrik IV geeft met het Edict van Nantes godsdienstvrijheid"
     ],
     "w": "Eerst de Spaanse furie (1576), dan de moord op Willem (1584), Antwerpen (1585), de Armada en de Republiek (1588), Breda (1590) en het Edict van Nantes (1598).",
     "meer": "Handig ezelsbruggetje: 84-85-88 liggen vlak achter elkaar. Willem dood, Antwerpen weg, Armada kapot."
    },
    {
     "t": "mc",
     "q": "Met welk doel stuurt Filips II in 1588 de Spaanse Armada naar het noorden?",
     "o": [
      "om protestants Engeland aan te vallen",
      "om de opstandige Republiek vanaf zee te veroveren",
      "om Antwerpen te bevrijden",
      "om zilver uit Amerika veilig naar huis te brengen"
     ],
     "a": "om protestants Engeland aan te vallen",
     "w": "Engeland was sinds 1585 de bondgenoot van de opstandelingen. Filips wilde dat land uitschakelen.",
     "meer": "Armada betekent 'vloot'. Het werkboek wil dat je bij zo'n vraag eerst het begrip uitlegt, en dan pas het doel noemt.",
     "fout": {
      "om de opstandige Republiek vanaf zee te veroveren": "De Armada moest wel Spaanse soldaten uit de Nederlanden ophalen, maar het doel was <b>Engeland</b>. Wie Engeland verslaat, neemt de opstandelingen hun bondgenoot af.",
      "om Antwerpen te bevrijden": "Antwerpen was in 1585 al door de Spanjaarden veroverd. Er viel voor Spanje niets te bevrijden.",
      "om zilver uit Amerika veilig naar huis te brengen": "Zilvervloten waren er wel, maar de Armada was een <b>oorlogsvloot</b> die richting Engeland voer, niet naar Amerika."
     }
    },
    {
     "t": "mc",
     "q": "Welke twee gebeurtenissen vallen allebei in 1588?",
     "o": [
      "de Armada mislukt en de Republiek begint",
      "Willem van Oranje vermoord en Antwerpen valt",
      "Breda en het Edict van Nantes",
      "het Twaalfjarig Bestand begint en Maurits pleegt een staatsgreep"
     ],
     "a": "de Armada mislukt en de Republiek begint",
     "w": "1588 is een dubbel jaar: de Spaanse Armada gaat ten onder én de Republiek der Zeven Verenigde Nederlanden begint.",
     "meer": "Juist omdat het twee keer 1588 is, halen leerlingen het vaak door elkaar. Onthoud: 'zee en staat, allebei 1588'.",
     "fout": {
      "Willem van Oranje vermoord en Antwerpen valt": "Dat zijn <b>1584</b> en <b>1585</b>. Vlak ervoor, maar niet 1588.",
      "Breda en het Edict van Nantes": "Breda is <b>1590</b>, het Edict van Nantes <b>1598</b>.",
      "het Twaalfjarig Bestand begint en Maurits pleegt een staatsgreep": "Dat is veel later: het Bestand begint in <b>1609</b>, de staatsgreep is in <b>1618</b>."
     }
    },
    {
     "t": "gap",
     "q": "Maurits verovert Breda in 1590 door soldaten te verstoppen in het ruim van een ___.",
     "a": "turfschip|turfschuit|schip met turf|schip",
     "w": "Een halve compagnie soldaten verstopt zich onder de turf in een schip. Zo komen ze ongezien de stad in.",
     "meer": "Het lijkt op het paard van Troje: de vijand haalt zelf de soldaten binnen. Het past bij de oorzaak 'slim gebruik van het water'."
    },
    {
     "t": "mc",
     "q": "Waarom plunderen soldaten van Filips II in 1576 drie dagen lang de stad Antwerpen?",
     "o": [
      "ze hadden al jaren geen loon gekregen",
      "ze wilden de protestanten straffen voor de Beeldenstorm",
      "Willem van Oranje had ze daarvoor stiekem betaald",
      "Antwerpen weigerde nog langer belasting te betalen"
     ],
     "a": "ze hadden al jaren geen loon gekregen",
     "w": "De soldaten hadden al 2,5 jaar geen soldij gekregen. Ze werden woedend en namen zelf wat ze wilden: de Spaanse furie.",
     "meer": "Dit is een voorbeeld van <b>muiterij</b>: soldaten keren zich tegen hun eigen gezag. Daardoor vechten ze niet tegen de opstandelingen, en dat helpt later Maurits.",
     "fout": {
      "ze wilden de protestanten straffen voor de Beeldenstorm": "De Beeldenstorm was tien jaar eerder (1566). De soldaten plunderden voor zichzelf, omdat ze geen loon kregen, niet om een geloof.",
      "Willem van Oranje had ze daarvoor stiekem betaald": "Juist het omgekeerde: ze waren woedend omdat <b>niemand</b> ze betaalde. Het waren soldaten van Filips, niet van Willem.",
      "Antwerpen weigerde nog langer belasting te betalen": "Het ging niet om een straf voor de stad. Het probleem lag bij Filips: hij had geen geld voor zijn soldaten."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Bij een bronvraag over het succes van Maurits wil het werkboek steeds twee dingen: de <b>oorzaak</b> en de <b>uitleg</b> waarom dat Maurits hielp. Kijk eerst wat je ziet of leest, en vraag je dan af: bij welke van de vier oorzaken hoort dit?",
    "Een musketier of een kanon in de bron? Dan gaat het over de <b>hervorming van het Staatse leger</b>. Een kaart met steden langs het water, of een plan om riviersteden te veroveren? Dan is het <b>gebruik van de rivieren</b>. Plunderende of boze Spaanse soldaten? <b>Muiterij</b>. Een ander land dat tegen Spanje vecht? Spanje moet zijn <b>aandacht verdelen</b>.",
    "<b>Citeren</b> doe je met een stukje tekst <b>uit de bron zelf</b>, tussen aanhalingstekens. Het onderschrift (de uitleg eronder) is geen bewijs: dat heeft de maker van het boek geschreven, niet de bron.",
    "Bij <b>direct en indirect gevolg</b> vraag je: gebeurt het meteen door de gebeurtenis zelf (direct), of pas via een tussenstap (indirect)? De Armada vergaat, dus de Spaanse vloot is kleiner: direct. Spanje moet daarna een dure nieuwe vloot bouwen, waardoor er minder geld is voor het leger: indirect."
   ],
   "regel": "Bronvraag over Maurits: noem de oorzaak, leg uit waarom die hem hielp, en wijs aan wat je IN de bron ziet.",
   "voorbeelden": [
    {
     "en": "Oorzaak: muiterij in het Spaanse leger. Uitleg: soldaten zonder loon gingen plunderen en vochten dus niet tegen Maurits.",
     "let": "Twee zinnen, twee punten: eerst de oorzaak, dan het verband met 'dus' of 'daardoor'."
    }
   ],
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Bij welke oorzaak van het succes van Maurits hoort elke bron of elk feit?",
     "chips": [
      {
       "t": "Een prent van een musketier met musket en vork",
       "bak": "leger",
       "waarom": "Betere wapens voor de soldaten: dat hoort bij de hervorming van het Staatse leger."
      },
      {
       "t": "Soldaten van Maurits krijgen elke maand op tijd hun loon",
       "bak": "leger",
       "waarom": "Goed betaalde soldaten vechten beter en lopen niet weg. Ook dat is de hervorming van het leger."
      },
      {
       "t": "'Ik wil alle plaatsen aan de rivieren belegeren'",
       "bak": "rivier",
       "waarom": "Maurits zegt het zelf: eerst de steden aan de rivieren. Dat is slim gebruik van de rivieren."
      },
      {
       "t": "Kanonnen gaan per schip over de Maas naar het beleg",
       "bak": "rivier",
       "waarom": "Wapens vervoeren over het water gaat snel. Dat is het gebruik van de rivieren."
      },
      {
       "t": "Onbetaalde soldaten plunderen in 1576 Antwerpen",
       "bak": "muit",
       "waarom": "Spaanse soldaten zonder loon keren zich tegen hun eigen gezag: muiterij."
      },
      {
       "t": "Spaanse huursoldaten weigeren te vechten tot ze betaald zijn",
       "bak": "muit",
       "waarom": "Weigeren te vechten tegen je eigen leiding is muiterij. Daardoor vechten ze niet tegen Maurits."
      },
      {
       "t": "Hendrik IV, de protestantse koning van Frankrijk, vecht tegen Spanje",
       "bak": "verdeel",
       "waarom": "Een extra vijand voor Spanje: de Spanjaarden moeten hun soldaten over meer fronten verdelen."
      },
      {
       "t": "Engeland raakt in 1585 in oorlog met Spanje",
       "bak": "verdeel",
       "waarom": "Ook Engeland is een vijand van Spanje. Spanje moet zijn aandacht en soldaten verdelen."
      }
     ],
     "bakjes": [
      {
       "id": "leger",
       "label": "hervorming Staatse leger",
       "som": "goed betaald, goed bewapend"
      },
      {
       "id": "rivier",
       "label": "gebruik van de rivieren",
       "som": "vervoer over water, riviersteden eerst"
      },
      {
       "id": "muit",
       "label": "muiterij Spaanse leger",
       "som": "geen loon, dus muiten"
      },
      {
       "id": "verdeel",
       "label": "Spanje verdeelt zijn aandacht",
       "som": "ook oorlog met Engeland en Frankrijk"
      }
     ],
     "w": "Vier oorzaken: twee door Maurits zelf (leger en rivieren) en twee door zwakte van Spanje (muiterij en aandacht verdelen).",
     "meer": "Op de toets moet je bij elke bron de oorzaak noemen én uitleggen waarom het Maurits hielp. Oefen dus ook de tweede helft: 'daardoor ...'."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Brief van een Spaanse kapitein",
      "tekst": "Mijn mannen hebben al acht maanden geen stuiver gezien. Gisteren hebben ze hun officieren opgesloten en gezworen dat ze geen stap meer zetten voordat de koning betaalt.",
      "onder": "Eigen bewerking, zoals een Spaanse kapitein het rond 1590 zou kunnen schrijven."
     },
     "q": "Welke oorzaak van het succes van Maurits zie je in bron A?",
     "o": [
      "muiterij in het Spaanse leger",
      "Spanje moet zijn aandacht over meer landen verdelen",
      "het gebruik van rivieren",
      "de hervorming en betere bewapening van het Staatse leger"
     ],
     "a": "muiterij in het Spaanse leger",
     "w": "De soldaten krijgen geen loon, sluiten hun officieren op en weigeren te vechten. Dat is muiterij: opstand tegen het eigen gezag.",
     "meer": "Bewijs uit de bron: 'gezworen dat ze geen stap meer zetten voordat de koning betaalt'. Een leger dat niet vecht, kan Maurits niet tegenhouden.",
     "fout": {
      "Spanje moet zijn aandacht over meer landen verdelen": "Er staat niets over andere landen in de bron. Het gaat over soldaten die in opstand komen tegen hun eigen officieren.",
      "het gebruik van rivieren": "Rivieren komen in de bron niet voor. Kijk naar wat de soldaten doen: ze weigeren te vechten.",
      "de hervorming en betere bewapening van het Staatse leger": "Het Staatse leger is het leger van Maurits. Deze brief gaat over het <b>Spaanse</b> leger, en dat is juist slecht betaald."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron B: Steden die Maurits veroverde",
      "tekst": "<table><tr><th>Jaar</th><th>Stad</th><th>Ligt aan</th></tr><tr><td>1591</td><td>Zutphen</td><td>IJssel</td></tr><tr><td>1591</td><td>Deventer</td><td>IJssel</td></tr><tr><td>1591</td><td>Nijmegen</td><td>Waal</td></tr><tr><td>1593</td><td>Geertruidenberg</td><td>Amer</td></tr><tr><td>1594</td><td>Groningen</td><td>Reitdiep</td></tr></table>",
      "onder": "Naar: de veldtochten van Maurits, 1591-1594 (eigen tabel)."
     },
     "q": "Welke oorzaak van het succes van Maurits laat bron B het best zien?",
     "o": [
      "het gebruik van de rivieren",
      "de muiterij van de Spaanse huursoldaten",
      "de steun van de protestantse Franse koning",
      "de mislukte tocht van de Spaanse Armada"
     ],
     "a": "het gebruik van de rivieren",
     "w": "Alle steden in de tabel liggen aan het water. Maurits verovert eerst de riviersteden, precies zoals zijn plan was.",
     "meer": "Bewijs uit de bron zelf: de kolom 'Ligt aan' noemt bij elke stad een rivier. Zo wijs je aan wat je ziet in plaats van alleen te zeggen wat je weet.",
     "fout": {
      "de muiterij van de Spaanse huursoldaten": "Over soldaten zonder loon staat niets in de tabel. Je mag alleen bewijzen met wat je in de bron ziet.",
      "de steun van de protestantse Franse koning": "Frankrijk staat niet in de tabel. De tabel laat steden zien, en wat ze gemeen hebben: het water.",
      "de mislukte tocht van de Spaanse Armada": "De Armada was in 1588 op zee. Deze tabel gaat over steden die later op het land veroverd zijn."
     }
    },
    {
     "t": "sleep",
     "opgave": "De Spaanse Armada vergaat in 1588. Is dit een direct of een indirect gevolg voor Spanje?",
     "chips": [
      {
       "t": "De Spaanse oorlogsvloot is veel kleiner",
       "bak": "direct",
       "waarom": "De schepen vergaan, dus de vloot is meteen kleiner. Geen tussenstap: direct."
      },
      {
       "t": "Engeland wordt niet veroverd",
       "bak": "direct",
       "waarom": "De aanval mislukt, dus Engeland blijft vrij. Dat volgt meteen uit de ondergang: direct."
      },
      {
       "t": "Duizenden Spaanse zeelieden en soldaten komen om",
       "bak": "direct",
       "waarom": "Dat gebeurt tijdens de ondergang zelf: direct."
      },
      {
       "t": "Spanje geeft veel geld uit aan een nieuwe vloot, en heeft minder over voor het leger",
       "bak": "indirect",
       "waarom": "Eerst moet er een nieuwe vloot komen, en dáárdoor is er minder geld voor het leger. Er zit een tussenstap in: indirect."
      },
      {
       "t": "Spaanse soldaten in de Nederlanden krijgen nog vaker geen loon en gaan muiten",
       "bak": "indirect",
       "waarom": "Minder geld voor het leger leidt later tot muiterij. Twee stappen verder: indirect."
      },
      {
       "t": "Engeland kan de opstandelingen blijven helpen",
       "bak": "indirect",
       "waarom": "Engeland blijft vrij (direct), en dáárdoor kan het de Republiek blijven steunen. Dat is de tweede stap: indirect."
      }
     ],
     "bakjes": [
      {
       "id": "direct",
       "label": "direct gevolg",
       "som": "volgt meteen uit de gebeurtenis"
      },
      {
       "id": "indirect",
       "label": "indirect gevolg",
       "som": "volgt pas via een tussenstap"
      }
     ],
     "w": "Direct = meteen door de gebeurtenis zelf. Indirect = er zit een tussenstap tussen, vaak met 'en daardoor'.",
     "meer": "Test: kun je er 'en daardoor' tussen zetten? 'De vloot is kapot, en daardoor moet Spanje een nieuwe bouwen, en daardoor is er geen geld voor soldaten.' Alles na de eerste 'daardoor' is indirect."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron C en D: Twee kaarten van de Nederlanden",
      "tekst": "Op kaart C (1590) is alleen het gebied rond Holland, Zeeland en Utrecht in de kleur van de Republiek. Groningen, Overijssel en een groot deel van Gelderland hebben de Spaanse kleur.<br>Op kaart D (1598) heeft bijna het hele noorden de kleur van de Republiek. Alleen in het zuiden is nog veel Spaans.",
      "onder": "Eigen beschrijving van kaarten zoals bron 1 en bron 2 in het werkboek."
     },
     "q": "Wat kun je met kaart C en D samen bewijzen?",
     "o": [
      "Het Staatse leger won in die jaren bijna het hele noorden terug.",
      "Spanje veroverde tussen 1590 en 1598 steeds meer van het noorden.",
      "De Republiek kocht tussen 1590 en 1598 grond van de Spaanse koning.",
      "Het zuiden sloot zich tussen 1590 en 1598 aan bij de Republiek."
     ],
     "a": "Het Staatse leger won in die jaren bijna het hele noorden terug.",
     "w": "Vergelijk de twee kaarten: in 1598 is veel meer gebied in de kleur van de Republiek dan in 1590. Dat is het succes van Maurits.",
     "meer": "Zo schrijf je het op: 'Op kaart C is alleen ... van de Republiek. Op kaart D is bijna het hele noorden van de Republiek. Dus heeft het Staatse leger gebied teruggewonnen.' Eén zin per kaart.",
     "fout": {
      "Spanje veroverde tussen 1590 en 1598 steeds meer van het noorden.": "Precies andersom gelezen. De Spaanse kleur wordt in het noorden juist <b>kleiner</b>.",
      "De Republiek kocht tussen 1590 en 1598 grond van de Spaanse koning.": "Een kaart laat zien wie een gebied heeft, niet hoe. Uit de tekst weet je dat Maurits steden <b>veroverde</b>.",
      "Het zuiden sloot zich tussen 1590 en 1598 aan bij de Republiek.": "Op kaart D is het zuiden nog grotendeels Spaans. De groei zit in het <b>noorden</b>."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Welke oorzaak van het succes van Maurits zie je in bron E? Leg uit waarom dit Maurits hielp. (2p)",
     "bron": {
      "titel": "Bron E: Een oefenboek voor soldaten",
      "tekst": "Een boek met tientallen prenten. Op elke prent staat een soldaat met een musket in één houding: het kruit erin doen, de lont aansteken, het musket op de vork leggen, richten, schieten. Zo leert elke soldaat precies dezelfde handelingen in dezelfde volgorde.",
      "onder": "Naar: Jacob de Gheyn, Wapenhandelinghe (1607), een oefenboek voor het leger van Maurits."
     },
     "tip": "Begin met de naam van de oorzaak. Leg dan in een tweede zin uit waarom het hielp, met 'daardoor'. Wijs iets aan wat je in de bron ziet.",
     "model": [
      {
       "label": "Oorzaak",
       "tekst": "De hervorming van het Staatse leger: de soldaten waren goed bewapend en goed geoefend."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor konden ze beter en sneller schieten dan hun tegenstanders, en won Maurits gevechten en belegeringen."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je een soldaat met een musket op een vork, die stap voor stap leert laden, richten en schieten."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de oorzaak: hervorming van het Staatse leger.",
       "woorden": [
        "hervorm",
        "leger"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat",
        "dus"
       ]
      },
      {
       "t": "Ik noem iets wat ik in de bron zie (musket, vork, oefenen).",
       "woorden": [
        "musket",
        "vork",
        "oefen",
        "wapen"
       ]
      }
     ],
     "w": "Oorzaak + waarom het hielp + iets uit de bron. Dan heb je de punten.",
     "meer": "Veelgemaakte fout: alleen 'het leger was goed' schrijven. Noem de oorzaak bij naam (hervorming) en zeg wat er in de bron te zien is."
    },
    {
     "t": "mc",
     "q": "Spanje vocht op zee en op land met wisselend succes. Welke combinatie klopt?",
     "o": [
      "Zee: de Armada, een nederlaag. Land: Antwerpen, een succes.",
      "Zee: de Armada, een groot succes. Land: Antwerpen, een nederlaag.",
      "Zee: Antwerpen, een succes. Land: de Armada, een nederlaag.",
      "Zee: de Armada, een nederlaag. Land: Breda, een succes."
     ],
     "a": "Zee: de Armada, een nederlaag. Land: Antwerpen, een succes.",
     "w": "Op zee mislukt de Armada in 1588. Op land verovert Spanje in 1585 Antwerpen na een beleg van veertien maanden.",
     "meer": "Op de toets: geef per voorbeeld de gebeurtenis én of het een succes of nederlaag voor Spanje was. Dat zijn vier losse punten.",
     "fout": {
      "Zee: de Armada, een groot succes. Land: Antwerpen, een nederlaag.": "Succes en nederlaag zijn omgedraaid. De Armada vergaat, en Antwerpen wordt juist door Spanje veroverd.",
      "Zee: Antwerpen, een succes. Land: de Armada, een nederlaag.": "Een Armada is een vloot, die vaart op zee. Antwerpen is een stad op het land.",
      "Zee: de Armada, een nederlaag. Land: Breda, een succes.": "Breda is in 1590 veroverd door <b>Maurits</b>. Dat is voor Spanje juist een nederlaag."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron F: De tactiek van Maurits",
      "tekst": "\"Ik wil alle plaatsen aan de rivieren belegeren ... Eerst de een, dan de ander.\" Daarna, zegt hij, komen de kleine plaatsen landinwaarts vanzelf aan de beurt, omdat ze dan hun voedsel missen.",
      "onder": "Naar: uitspraken van Maurits in R.P. de Graaf, Oorlog, mijn arme schapen. Onder de prent ernaast staat: 'Maurits liet ook kanonnen gieten.'"
     },
     "q": "Met welk stukje bewijs je het best dat Maurits slim gebruikmaakte van de rivieren?",
     "o": [
      "\"Ik wil alle plaatsen aan de rivieren belegeren\"",
      "\"Eerst de een, dan de ander\"",
      "dat de kleine plaatsen landinwaarts vanzelf hun voedsel missen",
      "'Maurits liet ook kanonnen gieten'"
     ],
     "a": "\"Ik wil alle plaatsen aan de rivieren belegeren\"",
     "w": "In dit citaat noemt Maurits zelf de rivieren. Dat is bewijs uit de bron, tussen aanhalingstekens.",
     "meer": "Citeren = een stukje letterlijk overnemen, met aanhalingstekens. Kies het stukje dat precies over de vraag gaat.",
     "fout": {
      "\"Eerst de een, dan de ander\"": "Dit zegt alleen iets over de volgorde, niet over rivieren. Kies een citaat waar het antwoord echt in staat.",
      "dat de kleine plaatsen landinwaarts vanzelf hun voedsel missen": "Dat is het gevolg van zijn plan, en het is niet letterlijk geciteerd. Het bewijs over de rivieren staat in de eerste zin.",
      "'Maurits liet ook kanonnen gieten'": "Dat komt uit het <b>onderschrift</b>, niet uit de bron zelf. En het gaat over wapens (hervorming), niet over rivieren."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Op goud krijg je bronnen die je nog nooit hebt gezien. Dat is niet erg: je kent de vier oorzaken, en je hoeft alleen te herkennen welke de bron laat zien.",
    "Bij een <b>verklaring in stappen</b> schrijf je elke stap op een eigen regel en verbind je ze met <b>daardoor</b>. Begin bij de gebeurtenis, eindig bij Maurits. Bijvoorbeeld: Filips voert overal oorlog → hij heeft geen geld → soldaten krijgen geen loon → ze muiten → het Spaanse leger vecht slecht → Maurits verovert steden.",
    "Bij <b>is de maker voor of tegen</b> zoek je woorden die iets verraden: 'ketters', 'helden', 'verraders', 'bevrijd'. Zulke woorden laten zien aan welke kant de maker staat. Noem altijd het woord dat je bewijs is.",
    "Pas op bij Frankrijk: Spanje vocht al tegen Frankrijk, en het <b>Edict van Nantes</b> (1598) was niet de oorzaak van die oorlog. Het Edict laat zien dat daar een <b>protestantse</b> koning zat die protestanten vrijheid gaf, wat Filips sterk afkeurde. Voor Maurits telt: Spanje moest zijn soldaten verdelen."
   ],
   "regel": "Een verklaring in stappen: elke stap een eigen regel, verbonden met 'daardoor', van de gebeurtenis tot het gevolg voor Maurits.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg in stappen uit hoe de ondergang van de Armada in 1588 Maurits indirect hielp in zijn strijd tegen de Spanjaarden. (3p)",
     "bron": {
      "titel": "Bron G: Het einde van de Armada",
      "tekst": "Na een nachtelijke aanval met brandende schepen en dagenlange stormen vaart de Armada om Schotland en Ierland heen terug. Tientallen schepen vergaan. Koning Filips moet een nieuwe vloot laten bouwen, en dat kost een fortuin.",
      "onder": "Eigen bewerking, naar de SchoolTV-lesbrief over de ondergang van de Spaanse Armada."
     },
     "tip": "Een indirect gevolg heeft een tussenstap. Schrijf drie regels: wat er meteen gebeurde, wat dat Spanje kostte, en wat dat betekende voor het leger tegen Maurits.",
     "model": [
      {
       "label": "Direct gevolg",
       "tekst": "De Armada ging ten onder, waardoor Spanje een groot deel van zijn oorlogsvloot kwijt was."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor moest Filips een dure nieuwe vloot bouwen. In de bron staat: \"dat kost een fortuin\"."
      },
      {
       "label": "Indirect gevolg voor Maurits",
       "tekst": "Daardoor was er minder geld voor het Spaanse leger in de Nederlanden: soldaten kregen geen loon en gingen muiten, en Maurits kon steden veroveren."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met het directe gevolg (de vloot is kapot of kleiner).",
       "woorden": [
        "vloot",
        "schepen"
       ]
      },
      {
       "t": "Ik noem de tussenstap: Spanje moet veel geld uitgeven.",
       "woorden": [
        "geld",
        "kost",
        "duur"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      },
      {
       "t": "Ik eindig bij Maurits of het Spaanse leger in de Nederlanden.",
       "woorden": [
        "maurits",
        "leger",
        "muit",
        "loon"
       ]
      }
     ],
     "w": "Drie stappen: vloot weg → nieuwe vloot kost geld → minder geld voor het leger tegen Maurits.",
     "meer": "Veelgemaakte fout: alleen het directe gevolg noemen ('de vloot was kapot'). Bij 'indirect' moet je altijd nog een stap verder denken."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg met bron H uit waarom de situatie in Frankrijk gunstig was voor Maurits. (2p)",
     "bron": {
      "titel": "Bron H: Nieuwe regels in Frankrijk",
      "tekst": "De Franse koning Hendrik IV, zelf protestant opgevoed, laat in 1598 vastleggen: protestanten mogen hun geloof belijden, ze mogen kerkdiensten houden en ze krijgen dezelfde burgerrechten als katholieken.",
      "onder": "Naar: het Edict van Nantes (1598)."
     },
     "tip": "Gebruik de bron om te laten zien wat voor koning Frankrijk had. Leg dan uit wat de oorlog tussen Frankrijk en Spanje betekende voor de Spaanse soldaten in de Nederlanden.",
     "model": [
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat protestanten in Frankrijk hun geloof mochten belijden en kerkdiensten mochten houden. Frankrijk had dus een koning die protestanten vrijheid gaf, iets wat Filips sterk afkeurde."
      },
      {
       "label": "Oorzaak",
       "tekst": "Frankrijk was ook een vijand van Spanje: Spanje vocht niet alleen tegen de opstandelingen en Engeland, maar ook tegen Frankrijk."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor moest Spanje zijn aandacht en soldaten verdelen, en had het minder soldaten om tegen Maurits te vechten."
      }
     ],
     "checklist": [
      {
       "t": "Ik gebruik iets uit de bron (godsdienstvrijheid, kerkdiensten).",
       "woorden": [
        "vrijheid",
        "kerkdienst",
        "protestant"
       ]
      },
      {
       "t": "Ik zeg dat Spanje ook tegen Frankrijk vocht.",
       "woorden": [
        "frankrijk",
        "fransen",
        "frans"
       ]
      },
      {
       "t": "Ik noem de oorzaak: Spanje moest zijn aandacht verdelen.",
       "woorden": [
        "verdel",
        "aandacht"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      }
     ],
     "w": "Frankrijk was een extra vijand van Spanje, daardoor moest Spanje zijn soldaten verdelen. De bron laat zien dat daar een koning zat die protestanten steunde.",
     "meer": "Let op: het Edict van Nantes was niet de oorzaak van de oorlog tussen Frankrijk en Spanje. Die oorlog liep al. Schrijf dus niet 'door het Edict raakte Spanje in oorlog'."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron I: Een herdenkingspenning uit 1588",
      "tekst": "Op een munt die na de mislukte tocht van de Armada is geslagen, zie je Spaanse schepen die tegen de rotsen slaan. Erbij staat in het Latijn, vertaald: 'God blies en ze werden verstrooid.'",
      "onder": "Naar: een herdenkingspenning, geslagen in Zeeland in 1588."
     },
     "q": "Staat de maker van deze penning aan de kant van Spanje of tegen Spanje, en hoe weet je dat?",
     "o": [
      "Tegen Spanje: hij viert dat God de Spaanse vloot liet vergaan.",
      "Voor Spanje: hij herdenkt de dappere Spaanse zeelieden die omkwamen.",
      "Voor Spanje: hij laat zien dat alleen het weer de Armada versloeg.",
      "Tegen Spanje: de penning is gemaakt in Spanje zelf, in 1588."
     ],
     "a": "Tegen Spanje: hij viert dat God de Spaanse vloot liet vergaan.",
     "w": "De tekst zegt dat God zelf de storm stuurde. De maker ziet de ondergang als iets goeds: hij is dus tegen Spanje.",
     "meer": "Bewijs uit de bron: 'God blies en ze werden verstrooid'. Wie God aan zijn kant ziet in een overwinning, staat aan de winnende kant. Een penning maken is bovendien iets wat je doet om te vieren.",
     "fout": {
      "Voor Spanje: hij herdenkt de dappere Spaanse zeelieden die omkwamen.": "Er staat niets over dapperheid in de bron. De tekst klinkt als een overwinningsfeest, niet als rouw.",
      "Voor Spanje: hij laat zien dat alleen het weer de Armada versloeg.": "Dat er een storm in zit, klopt. Maar de maker zegt dat <b>God</b> die storm stuurde: hij vindt het een straf voor Spanje, dus hij staat er niet achter.",
      "Tegen Spanje: de penning is gemaakt in Spanje zelf, in 1588.": "Het antwoord 'tegen' klopt, maar de reden niet: de penning komt uit Zeeland. En de plek uit het onderschrift is geen bewijs uit de bron zelf."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron J: Een Spaanse kroniek",
      "tekst": "Na veertien maanden van moed en geduld hebben onze soldaten de stad Antwerpen eindelijk bevrijd van de ketters en teruggegeven aan de ware kerk.",
      "onder": "Eigen bewerking, zoals een Spaanse schrijver het in 1585 zou kunnen zeggen."
     },
     "q": "Welk woord uit bron J bewijst het best dat de maker aan de kant van Spanje staat?",
     "o": [
      "bevrijd",
      "veertien maanden",
      "de stad Antwerpen",
      "eindelijk teruggegeven"
     ],
     "a": "bevrijd",
     "w": "Voor de Antwerpenaren was het een verovering. Wie 'bevrijd' schrijft, vindt het een goede zaak: dat is de Spaanse kant.",
     "meer": "Ook 'ketters' (zo noemden katholieken de protestanten) en 'de ware kerk' verraden de kant van de maker. Zoek altijd naar woorden die een oordeel geven.",
     "fout": {
      "veertien maanden": "Dat is een feit (zo lang duurde het beleg). Een feit zegt niets over de kant van de maker.",
      "de stad Antwerpen": "Een plaatsnaam is neutraal. Je zoekt een woord dat laat zien wat de maker ervan <b>vindt</b>.",
      "eindelijk teruggegeven": "'Eindelijk' klinkt wel blij, maar 'teruggegeven' is minder sterk dan 'bevrijd'. Kies het woord met het duidelijkste oordeel."
     }
    },
    {
     "t": "mc",
     "q": "Twee oorzaken van het succes van Maurits kwamen door hemzelf, twee door de zwakte van Spanje. Welke twee had Maurits níet zelf in de hand?",
     "o": [
      "de muiterij en het verdelen van de aandacht",
      "de hervorming van het leger en het gebruik van de rivieren",
      "het gebruik van de rivieren en de muiterij",
      "de hervorming van het leger en het verdelen van de aandacht"
     ],
     "a": "de muiterij en het verdelen van de aandacht",
     "w": "Muiterij komt door Filips (geen loon) en het verdelen van de aandacht komt door Spanjes andere oorlogen. Daar kon Maurits niets aan doen.",
     "meer": "Dit is inzicht: je deelt de oorzaken in op een nieuwe manier. Handig voor een vraag als 'Was het succes vooral de verdienste van Maurits?'",
     "fout": {
      "de hervorming van het leger en het gebruik van de rivieren": "Dat zijn juist de twee die Maurits <b>wel</b> zelf deed: hij hervormde het leger en koos zelf de riviersteden.",
      "het gebruik van de rivieren en de muiterij": "De muiterij klopt, maar de rivieren waren de slimme keuze van Maurits zelf.",
      "de hervorming van het leger en het verdelen van de aandacht": "Het verdelen van de aandacht klopt, maar de hervorming van het leger was het werk van Maurits zelf."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom ging het Spaanse leger muiten, en wat had Maurits daaraan?",
     "stappen": [
      "Filips II voert dure oorlogen op veel plaatsen tegelijk",
      "Hij heeft te weinig geld voor al zijn legers",
      "Zijn huursoldaten krijgen maandenlang geen loon",
      "De soldaten muiten en plunderen in plaats van te vechten",
      "Maurits kan steden veroveren op een verzwakt Spaans leger"
     ],
     "w": "Van oorzaak naar gevolg: oorlogen → geen geld → geen loon → muiterij → kans voor Maurits.",
     "meer": "Zo schrijf je een verklaring: elke stap op een eigen regel, met 'daardoor' ertussen. De Spaanse furie in Antwerpen (1576) is het bekendste voorbeeld van stap 4."
    },
    {
     "t": "mc",
     "q": "Maurits verovert in 1590 Breda met soldaten verstopt in een turfschip. Bij welke oorzaak van zijn succes past dit het best?",
     "o": [
      "het slimme gebruik van het water",
      "de muiterij in het Spaanse leger",
      "het verdelen van de Spaanse aandacht",
      "de mislukking van de Spaanse Armada"
     ],
     "a": "het slimme gebruik van het water",
     "w": "Het turfschip vaart over het water de stad binnen. Maurits gebruikt de waterwegen om ongezien bij de vijand te komen.",
     "meer": "Bij 'past het best' kies je de oorzaak die het meest direct met de gebeurtenis te maken heeft. Hier is dat het water.",
     "fout": {
      "de muiterij in het Spaanse leger": "De Spanjaarden in het kasteel muitten niet: ze werden overrompeld door een list.",
      "het verdelen van de Spaanse aandacht": "Bij Breda gaat het om een slimme truc op één plek, niet om Spanje dat tegen andere landen vecht.",
      "de mislukking van de Spaanse Armada": "De Armada was op zee bij Engeland. Met de verovering van Breda heeft hij niets te maken."
     }
    }
   ]
  }
 ]
},
{
 "id": "stadhouder-landsadvocaat",
 "emoji": "⚖️",
 "titel": "4.5.2 · Stadhouder tegenover landsadvocaat",
 "paragraaf": "§4.5",
 "kort": "Maurits leidt het leger, Johan van Oldenbarnevelt de politiek. Ze verschillen in karakter, ruziën over het Twaalfjarig Bestand en over het geloof. In 1618 grijpt Maurits de macht.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "De zeven noordelijke gewesten werken samen in de <b>Republiek</b>. Ze overleggen in de <b>Staten-Generaal</b>, de <b>'vergadering van de gezamenlijke Gewestelijke Statenvergaderingen'</b>, vooral over de buitenlandse politiek. Verder blijft elk gewest grotendeels zelfstandig. Bijzonder in Europa: er is <b>geen koning</b>, terwijl Spanje, Frankrijk en Engeland wel een vorst hebben. Toen en nu: de Staten-Generaal bestaat nog steeds, maar is nu ons parlement met gekozen Kamerleden.",
    "Twee mannen hebben de macht. <b>Maurits</b> is <b>stadhouder</b> en leider van het Staatse leger. <b>Johan van Oldenbarnevelt</b> (1547-1619) is <b>landsadvocaat</b>: de <b>'hoogste ambtenaar van de Gewestelijke Staten en de Staten-Generaal'</b>. Hij is in dienst van het gewest <b>Holland</b> en komt dus vooral op voor de belangen van Holland. Kort gezegd: de stadhouder leidt het leger, de landsadvocaat leidt de politiek.",
    "De eerste jaren werken ze goed samen. Toch botst het, door <b>drie oorzaken</b>:<br><b>1. Hun karakter</b>: Maurits is een voorzichtige militair, Van Oldenbarnevelt durft risico's te nemen.<br><b>2. Het Twaalfjarig Bestand</b>: de oorlog schaadt de handel van Holland, dus Van Oldenbarnevelt wil een wapenstilstand. Maurits is ertegen. Toch komt het er in <b>1609</b>: het <b>Twaalfjarig Bestand</b>, een <b>'wapenstilstand tussen de Republiek en Spanje, 1609-1621'</b>. Na dit verlies gaat Maurits zich meer met de politiek bemoeien.<br><b>3. Het geloof</b>: ze kiezen elk een andere stroming binnen het <b>calvinisme</b> en maken ruzie over hoe dat geloof precies moet.",
    "De ruzie loopt uit de hand. Maurits krijgt het verwijt dat hij te veel macht wil. Van Oldenbarnevelt wordt beschuldigd van <b>landverraad</b>, omdat hij samenwerkt met Frankrijk en Engeland. In <b>1618</b> pleegt Maurits een <b>staatsgreep</b>: <b>'overname met geweld van de macht in een land'</b>. Van Oldenbarnevelt wordt opgepakt, in een politiek proces ter dood veroordeeld en op <b>13 mei 1619</b> onthoofd. Zijn laatste woorden: hij was geen landverrader, maar een goede vaderlander.",
    "Let op: de Tachtigjarige Oorlog was <b>geen 80 jaar onafgebroken vechten</b>. Tussen 1609 en 1621 lagen de wapens twaalf jaar stil."
   ],
   "regel": "Stadhouder Maurits leidt het leger, landsadvocaat Van Oldenbarnevelt leidt de politiek; karakter, het Bestand en het geloof drijven ze uit elkaar.",
   "voorbeelden": [
    {
     "en": "Een voetbalclub heeft een trainer en een voorzitter. Als linksvoor bij Blauw Geel luister je op het veld naar de trainer, maar de voorzitter beslist over het geld van de club.",
     "let": "Zo ongeveer werkte het ook: Maurits op het slagveld, Van Oldenbarnevelt in de vergadering. En net als bij een club kan het tussen die twee flink botsen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Welke functie had Johan van Oldenbarnevelt?",
     "o": [
      "landsadvocaat",
      "stadhouder van Holland en leider van het Staatse leger",
      "landvoogd",
      "bevelhebber van de vloot van de Republiek"
     ],
     "a": "landsadvocaat",
     "w": "Van Oldenbarnevelt was landsadvocaat: de hoogste ambtenaar van de Gewestelijke Staten en de Staten-Generaal.",
     "meer": "Hij was in dienst van Holland. Daarom lette hij vooral op de belangen van Holland, en dat waren de handel en de scheepvaart.",
     "fout": {
      "stadhouder van Holland en leider van het Staatse leger": "Dat was <b>Maurits</b>. Stadhouder = leger en Oranje. Landsadvocaat = politiek en ambtenaar. Dit is de bekendste verwarring van deze paragraaf.",
      "landvoogd": "Een landvoogd werkte voor de Spaanse koning (zoals Margaretha van Parma of Alva). Van Oldenbarnevelt werkte voor de Republiek.",
      "bevelhebber van de vloot van de Republiek": "Van Oldenbarnevelt was geen militair. Hij was een politicus en ambtenaar."
     }
    },
    {
     "t": "gap",
     "q": "Het Twaalfjarig Bestand duurde van 1609 tot ___.",
     "a": "1621|in 1621",
     "w": "1609 + 12 jaar = 1621. Dan begint de oorlog weer.",
     "meer": "Definitie: 'wapenstilstand tussen de Republiek en Spanje, 1609-1621'. In 1621 wordt ook de WIC opgericht (dat leer je in 5.2)."
    },
    {
     "t": "mc",
     "q": "Waarom wilde Van Oldenbarnevelt een wapenstilstand met Spanje?",
     "o": [
      "de oorlog schaadde de handel van Holland",
      "hij was stiekem weer katholiek geworden",
      "het Staatse leger had alle gevechten verloren",
      "Maurits had hem om een wapenstilstand gevraagd"
     ],
     "a": "de oorlog schaadde de handel van Holland",
     "w": "Holland dreef veel handel, en de oorlog bracht die handel veel schade. Van Oldenbarnevelt, in dienst van Holland, wilde dat oplossen.",
     "meer": "Dit is een <b>economische</b> oorzaak: het gaat om handel en geld.",
     "fout": {
      "hij was stiekem weer katholiek geworden": "Van Oldenbarnevelt was calvinist, net als Maurits. Ze verschilden alleen over de precieze invulling van het calvinisme.",
      "het Staatse leger had alle gevechten verloren": "Het Staatse leger had juist veel succes onder Maurits. De reden was de handel, niet een nederlaag.",
      "Maurits had hem om een wapenstilstand gevraagd": "Andersom: Maurits was <b>tegen</b> de wapenstilstand. Het Bestand was voor hem een verlies."
     }
    },
    {
     "t": "gap",
     "q": "In het jaar ___ pleegde Maurits een staatsgreep.",
     "a": "1618|in 1618",
     "w": "In 1618 greep Maurits met geweld de macht. Daarna werd Van Oldenbarnevelt opgepakt.",
     "meer": "Een jaar later, op 13 mei 1619, werd Van Oldenbarnevelt onthoofd."
    },
    {
     "t": "mc",
     "q": "Er werd tachtig jaar oorlog gevoerd (1568-1648). Werd er al die tachtig jaar gevochten?",
     "o": [
      "nee, er was twaalf jaar wapenstilstand",
      "ja, tachtig jaar lang zonder één dag rust",
      "ja, alleen in de winter stopten de legers even",
      "nee, de oorlog stopte al bij de moord op Willem"
     ],
     "a": "nee, er was twaalf jaar wapenstilstand",
     "w": "Tussen 1609 en 1621 gold het Twaalfjarig Bestand. Toen lagen de wapens stil.",
     "meer": "Daarom zegt het werkboek liever 'de Nederlandse Opstand' (1568-1648). Die naam belooft geen tachtig jaar onafgebroken vechten.",
     "fout": {
      "ja, tachtig jaar lang zonder één dag rust": "Dat is de bekende valkuil. Het <b>Twaalfjarig Bestand</b> (1609-1621) was een wapenstilstand van twaalf jaar.",
      "ja, alleen in de winter stopten de legers even": "In de winter werd inderdaad minder gevochten, maar het belangrijkste is de twaalf jaar wapenstilstand van 1609 tot 1621.",
      "nee, de oorlog stopte al bij de moord op Willem": "Na de moord in 1584 ging de oorlog juist door, met Maurits als leider. Het einde kwam pas in 1648."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wie is wie? Sleep elk feit naar Maurits of naar Johan van Oldenbarnevelt.",
     "chips": [
      {
       "t": "stadhouder van Holland en Zeeland",
       "bak": "mau",
       "waarom": "Maurits werd in 1585 stadhouder, net als zijn vader Willem."
      },
      {
       "t": "leider van het Staatse leger",
       "bak": "mau",
       "waarom": "De stadhouder leidt het leger: dat is Maurits."
      },
      {
       "t": "voorzichtige militair",
       "bak": "mau",
       "waarom": "Maurits was een voorzichtige militair. Van Oldenbarnevelt durfde juist risico's te nemen."
      },
      {
       "t": "pleegde in 1618 een staatsgreep",
       "bak": "mau",
       "waarom": "Maurits greep in 1618 met geweld de macht."
      },
      {
       "t": "landsadvocaat in dienst van Holland",
       "bak": "old",
       "waarom": "Van Oldenbarnevelt was de landsadvocaat van Holland."
      },
      {
       "t": "voorstander van het Twaalfjarig Bestand",
       "bak": "old",
       "waarom": "Van Oldenbarnevelt wilde een wapenstilstand voor de handel van Holland."
      },
      {
       "t": "beschuldigd van landverraad",
       "bak": "old",
       "waarom": "Hij werkte samen met Frankrijk en Engeland. Dat werd hem als landverraad aangerekend."
      },
      {
       "t": "durfde risico's te nemen",
       "bak": "old",
       "waarom": "Van Oldenbarnevelt was de risiconemer, Maurits de voorzichtige."
      }
     ],
     "bakjes": [
      {
       "id": "mau",
       "label": "Maurits (stadhouder)",
       "som": "leger, Oranje, staatsgreep"
      },
      {
       "id": "old",
       "label": "Van Oldenbarnevelt (landsadvocaat)",
       "som": "politiek, Holland, Bestand"
      }
     ],
     "w": "Maurits = stadhouder, leger, tegen het Bestand, staatsgreep. Van Oldenbarnevelt = landsadvocaat, Holland, voor het Bestand, onthoofd.",
     "meer": "Let op: je zou verwachten dat de militair de risico's neemt, maar het is andersom. Juist zulke verrassingen vraagt een toets graag."
    },
    {
     "t": "mc",
     "q": "Wat was de Staten-Generaal in de tijd van de Republiek?",
     "o": [
      "de vergadering van de Staten van de gewesten samen",
      "het parlement met Kamerleden die door iedereen gekozen werden",
      "de raad van Spaanse edelen die Filips II adviseerde",
      "het hoofdkwartier van het leger"
     ],
     "a": "de vergadering van de Staten van de gewesten samen",
     "w": "In de Staten-Generaal kwamen de gewesten samen om te overleggen, vooral over de buitenlandse politiek.",
     "meer": "Toen en nu: tegenwoordig is de Staten-Generaal ons parlement (Eerste en Tweede Kamer). Toen zaten er afgevaardigden van de gewesten, niet door het volk gekozen Kamerleden.",
     "fout": {
      "het parlement met Kamerleden die door iedereen gekozen werden": "Zo werkt het <b>nu</b>. In de Republiek stuurden de gewesten hun eigen afgevaardigden; gewone mensen kozen niemand.",
      "de raad van Spaanse edelen die Filips II adviseerde": "De Staten-Generaal was van de Nederlandse gewesten zelf, en kwam in de Republiek juist zonder Filips bijeen.",
      "het hoofdkwartier van het leger": "Het leger viel onder de stadhouder. De Staten-Generaal was een vergadering voor politiek overleg."
     }
    },
    {
     "t": "mc",
     "q": "Waarom werd Van Oldenbarnevelt ter dood veroordeeld?",
     "o": [
      "hij werd beschuldigd van landverraad",
      "hij had zelf in 1618 een staatsgreep gepleegd",
      "hij was katholiek",
      "hij had de Armada geholpen om Engeland aan te vallen"
     ],
     "a": "hij werd beschuldigd van landverraad",
     "w": "Van Oldenbarnevelt werkte samen met Frankrijk en Engeland. Maurits en zijn aanhang noemden dat landverraad.",
     "meer": "Het was een <b>politiek proces</b>: de rechters stonden aan de kant van Maurits. Daarom zien veel mensen het later als oneerlijk.",
     "fout": {
      "hij had zelf in 1618 een staatsgreep gepleegd": "Omgedraaid: <b>Maurits</b> pleegde de staatsgreep. Van Oldenbarnevelt werd daarna opgepakt.",
      "hij was katholiek": "Ze waren allebei calvinist. Ze ruzieden over de precieze invulling ervan, maar dat was niet de officiële beschuldiging.",
      "hij had de Armada geholpen om Engeland aan te vallen": "De Armada was in 1588 en Engeland was juist een bondgenoot. Daar had Van Oldenbarnevelt niets mee te maken."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Bij een vraag over <b>perspectief</b> kijk je naar twee kanten van hetzelfde verhaal. Maurits zag Van Oldenbarnevelt als een <b>landverrader</b>. Van Oldenbarnevelt zag zichzelf als een <b>goede vaderlander</b>. Allebei hadden ze redenen.",
    "Zo lees je een bron over een persoon: wie spreekt er, en wat vindt die persoon? Woorden als 'verrader', 'redder' of 'vaderlander' laten de mening zien. Citeer zo'n woord als bewijs.",
    "Bij <b>soort oorzaak</b> gebruik je de termen van het werkboek: <b>economisch</b> (handel, geld), <b>religieus</b> (geloof), <b>politiek</b> (macht, bestuur) en <b>sociaal</b> (hoe mensen samenleven). De ruzie tussen Maurits en Van Oldenbarnevelt heeft er meerdere.",
    "Bij <b>toen en nu</b> vergelijk je hoe iets vroeger werkte met hoe het nu werkt. Zelfde naam, andere inhoud: de Staten-Generaal is daar het beste voorbeeld van."
   ],
   "regel": "Perspectief: zeg wie het vindt, wat die persoon vindt, en citeer het woord dat die mening laat zien.",
   "vragen": [
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Laatste woorden",
      "tekst": "\"Mannen, gelooft niet dat ik een landverrader ben.\"",
      "onder": "Naar: Johan van Oldenbarnevelt, vlak voor zijn executie in 1619."
     },
     "q": "Hoe zag Van Oldenbarnevelt zichzelf volgens bron A?",
     "o": [
      "als een eerlijke vaderlander",
      "als een landverrader die spijt had",
      "als een militair die de oorlog wilde winnen",
      "als iemand die Maurits graag als koning zag"
     ],
     "a": "als een eerlijke vaderlander",
     "w": "Hij ontkent dat hij een landverrader is. Hij zegt verder dat hij oprecht heeft gehandeld, als een goede vaderlander.",
     "meer": "Dit is zijn eigen perspectief. Maurits dacht er precies andersom over: voor hem was Van Oldenbarnevelt wel een landverrader.",
     "fout": {
      "als een landverrader die spijt had": "Hij zegt juist: 'gelooft niet dat ik een landverrader ben'. Hij ontkent het, hij bekent niets.",
      "als een militair die de oorlog wilde winnen": "Van Oldenbarnevelt was een politicus, geen militair. En hij wilde juist een wapenstilstand.",
      "als iemand die Maurits graag als koning zag": "Daar staat niets over in de bron. Maurits kreeg juist het verwijt dat hij te veel macht wilde, en daar was Van Oldenbarnevelt tegen."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wat voor soort oorzaak van de ruzie tussen Maurits en Van Oldenbarnevelt is dit?",
     "chips": [
      {
       "t": "De oorlog schaadt de handel van Holland",
       "bak": "eco",
       "waarom": "Handel en geld: economisch."
      },
      {
       "t": "Van Oldenbarnevelt wil een wapenstilstand om de handel te redden",
       "bak": "eco",
       "waarom": "Het doel is de handel: een economische oorzaak."
      },
      {
       "t": "Ze kiezen elk een andere stroming binnen het calvinisme",
       "bak": "rel",
       "waarom": "Het gaat over het geloof: religieus."
      },
      {
       "t": "Ze ruziën over hoe het calvinistische geloof precies moet",
       "bak": "rel",
       "waarom": "Ook dit gaat over het geloof: religieus."
      },
      {
       "t": "Maurits krijgt het verwijt dat hij te veel macht wil",
       "bak": "pol",
       "waarom": "Macht en bestuur: politiek."
      },
      {
       "t": "Van Oldenbarnevelt werkt samen met Frankrijk en Engeland",
       "bak": "pol",
       "waarom": "Buitenlandse politiek en de beschuldiging van landverraad: politiek."
      }
     ],
     "bakjes": [
      {
       "id": "eco",
       "label": "economisch (handel, geld)",
       "som": ""
      },
      {
       "id": "rel",
       "label": "religieus (geloof)",
       "som": ""
      },
      {
       "id": "pol",
       "label": "politiek (macht, bestuur)",
       "som": ""
      }
     ],
     "w": "De ruzie had een economische kant (handel en het Bestand), een religieuze kant (het calvinisme) en een politieke kant (macht en buitenland).",
     "meer": "Het werkboek noemt drie oorzaken: karakter, het Bestand en het geloof. Bij 'welk soort' vertaal je die naar economisch, religieus of politiek."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron B: De Staten-Generaal nu",
      "tekst": "De Staten-Generaal bestaat uit de Eerste en de Tweede Kamer. De 150 leden van de Tweede Kamer worden elke vier jaar gekozen door alle Nederlanders van 18 jaar en ouder.",
      "onder": "Naar: uitleg over het parlement, 2026."
     },
     "q": "Wat is het grootste verschil tussen de Staten-Generaal van nu (bron B) en die van de Republiek?",
     "o": [
      "Toen zaten er mensen van de gewesten, nu gekozen Kamerleden.",
      "Toen was het een vergadering van Spanje, nu is het een Nederlandse.",
      "Toen besliste de koning er alles, nu beslissen de Kamerleden zelf.",
      "Toen bestond hij nog niet, hij is pas in onze tijd bedacht."
     ],
     "a": "Toen zaten er mensen van de gewesten, nu gekozen Kamerleden.",
     "w": "In de Republiek stuurden de gewesten hun eigen mensen. Nu kiest iedereen van 18 jaar en ouder de Tweede Kamer.",
     "meer": "Continuïteit: de naam en het idee van samen vergaderen bleven. Verandering: wie erin zit en wie hen kiest. Noem bij toen-en-nu altijd allebei de kanten.",
     "fout": {
      "Toen was het een vergadering van Spanje, nu is het een Nederlandse.": "De Staten-Generaal was altijd van de Nederlandse gewesten zelf, ook al voor de Opstand.",
      "Toen besliste de koning er alles, nu beslissen de Kamerleden zelf.": "De Republiek had juist <b>geen koning</b>. Dat maakte haar bijzonder in Europa.",
      "Toen bestond hij nog niet, hij is pas in onze tijd bedacht.": "De Staten-Generaal bestond al in de tijd van de Bourgondiërs (1464). Het is een heel oude vergadering."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Een klasgenoot denkt dat Maurits en Van Oldenbarnevelt hetzelfde werk deden. Leg uit wat ieder van hen deed. (2p)",
     "tip": "Schrijf per persoon één zin: de naam, zijn functie, en wat die functie inhoudt. Gebruik de begrippen stadhouder en landsadvocaat.",
     "model": [
      {
       "label": "Maurits",
       "tekst": "Maurits was stadhouder: hij was de leider van het Staatse leger en vocht tegen de Spanjaarden."
      },
      {
       "label": "Van Oldenbarnevelt",
       "tekst": "Van Oldenbarnevelt was landsadvocaat: de hoogste ambtenaar van de Gewestelijke Staten en de Staten-Generaal. Hij leidde de politiek."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem Maurits met het begrip stadhouder.",
       "woorden": [
        "stadhouder"
       ]
      },
      {
       "t": "Ik zeg dat de stadhouder het leger leidt.",
       "woorden": [
        "leger"
       ]
      },
      {
       "t": "Ik noem Van Oldenbarnevelt met het begrip landsadvocaat.",
       "woorden": [
        "landsadvocaat"
       ]
      },
      {
       "t": "Ik zeg dat de landsadvocaat de hoogste ambtenaar is of de politiek leidt.",
       "woorden": [
        "ambtenaar",
        "politiek",
        "staten"
       ]
      }
     ],
     "w": "Per persoon: functie + wat die functie doet. Stadhouder = leger, landsadvocaat = hoogste ambtenaar en politiek.",
     "meer": "Veelgemaakte fout: alleen de functies noemen zonder uitleg ('Maurits was stadhouder en Van Oldenbarnevelt landsadvocaat'). Dan mis je de helft van de punten."
    },
    {
     "t": "mc",
     "q": "Wat veranderde er in 1609, en wat bleef hetzelfde?",
     "o": [
      "Het vechten stopte twaalf jaar, maar de Republiek bleef bestaan.",
      "Het vechten stopte voorgoed, en de Republiek werd een deel van Spanje.",
      "Maurits werd koning en het Bestand bleef uit.",
      "De Staten-Generaal werd opgeheven, maar de oorlog ging gewoon door."
     ],
     "a": "Het vechten stopte twaalf jaar, maar de Republiek bleef bestaan.",
     "w": "In 1609 begint het Twaalfjarig Bestand: een tijdelijke wapenstilstand. De Republiek bleef zoals ze was, met Maurits en Van Oldenbarnevelt.",
     "meer": "Dit is <b>continuïteit en verandering</b>: noem wat anders werd (geen gevechten) én wat bleef (de Republiek, de Staten-Generaal).",
     "fout": {
      "Het vechten stopte voorgoed, en de Republiek werd een deel van Spanje.": "Het Bestand was tijdelijk: in 1621 ging de oorlog verder. En de Republiek bleef zelfstandig.",
      "Maurits werd koning en het Bestand bleef uit.": "De Republiek had geen koning, en de wapenstilstand kwam er juist wel, tegen de zin van Maurits.",
      "De Staten-Generaal werd opgeheven, maar de oorlog ging gewoon door.": "De Staten-Generaal bleef gewoon vergaderen, en de oorlog lag twaalf jaar stil."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "1585: Maurits wordt stadhouder van Holland en Zeeland",
      "1609: het Twaalfjarig Bestand begint, tegen de zin van Maurits",
      "1618: Maurits pleegt een staatsgreep",
      "1619: Van Oldenbarnevelt wordt onthoofd",
      "1621: het Bestand loopt af en de oorlog gaat verder"
     ],
     "w": "Eerst stadhouder (1585), dan het Bestand (1609), de staatsgreep (1618), de onthoofding (1619) en het einde van het Bestand (1621).",
     "meer": "Let op: de staatsgreep en de onthoofding vallen <b>midden in</b> het Bestand. De ruzie barstte los toen er even geen oorlog was."
    },
    {
     "t": "mc",
     "q": "Waarom ging Maurits zich na 1609 meer met de politiek bemoeien?",
     "o": [
      "Hij vond het Bestand fout en had zonder oorlog tijd over.",
      "De Staten-Generaal vroeg hem om landsadvocaat te worden van Holland.",
      "Hij wilde het Bestand verlengen, maar Van Oldenbarnevelt wilde oorlog.",
      "Spanje eiste dat Maurits voortaan de politiek van de Republiek leidde."
     ],
     "a": "Hij vond het Bestand fout en had zonder oorlog tijd over.",
     "w": "Twee oorzaken: Maurits wilde niet dat de politiek nog zo'n 'fout' zou maken, en zonder oorlog had hij tijd over.",
     "meer": "Dit is redeneren: het werkboek zegt dat hij zich na het verlies met politiek ging bemoeien, en jij bedenkt waarom.",
     "fout": {
      "De Staten-Generaal vroeg hem om landsadvocaat te worden van Holland.": "Landsadvocaat was en bleef Van Oldenbarnevelt. Maurits bleef stadhouder.",
      "Hij wilde het Bestand verlengen, maar Van Oldenbarnevelt wilde oorlog.": "Omgedraaid: Van Oldenbarnevelt wilde de wapenstilstand, Maurits was ertegen.",
      "Spanje eiste dat Maurits voortaan de politiek van de Republiek leidde.": "Spanje had in de Republiek niets te eisen. Het besluit kwam van Maurits zelf."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron C: Een pamflet uit 1618",
      "tekst": "Onze prins heeft het vaderland op het nippertje gered van de mannen die stiekem met vreemde machten heulden. Dank zij zijn moed staat de ware kerk weer sterk.",
      "onder": "Eigen bewerking, zoals een aanhanger van Maurits het in 1618 zou kunnen schrijven."
     },
     "q": "Is de maker van bron C voor of tegen Maurits?",
     "o": [
      "voor, want hij noemt Maurits de redder van het vaderland",
      "tegen, want hij vindt dat Maurits te veel macht grijpt",
      "voor, want het pamflet is gemaakt in het jaar 1618",
      "tegen, want hij heeft het over mannen die stiekem heulden"
     ],
     "a": "voor, want hij noemt Maurits de redder van het vaderland",
     "w": "'Gered' en 'dank zij zijn moed' zijn lovende woorden. De maker staat aan de kant van Maurits.",
     "meer": "Met 'de mannen die stiekem met vreemde machten heulden' bedoelt hij Van Oldenbarnevelt en zijn aanhang. Hij noemt ze eigenlijk landverraders.",
     "fout": {
      "tegen, want hij vindt dat Maurits te veel macht grijpt": "Dat verwijt maakten de tegenstanders van Maurits. In deze bron staat alleen lof voor hem.",
      "voor, want het pamflet is gemaakt in het jaar 1618": "'Voor' klopt, maar een jaartal bewijst geen mening. Je hebt een woord uit de bron nodig, zoals 'gered'.",
      "tegen, want hij heeft het over mannen die stiekem heulden": "Die woorden gaan over de tegenstanders van Maurits, niet over Maurits zelf."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Op goud vergelijk je twee perspectieven met bewijs uit de bronnen. Een goed antwoord heeft per persoon: <b>wie</b>, <b>wat hij vindt</b>, en <b>waarom</b>, met een citaat of een element uit de bron.",
    "Bij een vraag als 'welke oorzaak vind jij het belangrijkst?' is er geen fout antwoord, maar wel een goed opgeschreven antwoord. Schrijf: <b>'De belangrijkste oorzaak is ..., omdat ...'</b> en laat zien dat die oorzaak de andere oorzaken in gang zette of erger maakte.",
    "Denk ook aan <b>wanneer een bron gemaakt is</b>. Een prent uit 1855 over 1607 is een bron <b>over</b> die tijd, niet <b>uit</b> die tijd. De maker was er niet bij.",
    "En het grote plaatje: de Republiek was anders dan de rest van Europa. <b>Geen koning</b>, zelfstandige gewesten, en een stadhouder en een landsadvocaat die de macht deelden. Dat delen ging soms goed en soms helemaal mis."
   ],
   "regel": "Twee perspectieven: per persoon wie, wat hij vindt en waarom, met bewijs uit de bron.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Bron A en bron B kijken verschillend naar Van Oldenbarnevelt. Leg uit hoe Maurits en Van Oldenbarnevelt zelf over hem dachten. Gebruik beide bronnen. (2p)",
     "bron": {
      "titel": "Bron A en B",
      "tekst": "<b>Bron A</b> (een aanhanger van Maurits, 1619): 'Wie in oorlogstijd met de vijand onderhandelt en buitenlandse vorsten om steun vraagt, verraadt zijn eigen land.'<br><b>Bron B</b> (Van Oldenbarnevelt, vlak voor zijn dood): \"Mannen, gelooft niet dat ik een landverrader ben.\"",
      "onder": "Bron A: eigen bewerking, zoals een aanhanger van Maurits het in 1619 zou kunnen schrijven. Bron B: naar de laatste woorden van Van Oldenbarnevelt (1619)."
     },
     "tip": "Schrijf twee regels: één voor Maurits en één voor Van Oldenbarnevelt. Zeg wat ieder vond en waarom, en citeer per persoon een stukje uit de bron.",
     "model": [
      {
       "label": "Maurits",
       "tekst": "Maurits zag Van Oldenbarnevelt als een landverrader, omdat hij een wapenstilstand met Spanje wilde en samenwerkte met Frankrijk en Engeland. In bron A staat: 'verraadt zijn eigen land'."
      },
      {
       "label": "Van Oldenbarnevelt",
       "tekst": "Van Oldenbarnevelt zag zichzelf als een goede vaderlander die eerlijk had gehandeld. In bron B zegt hij: \"gelooft niet dat ik een landverrader ben\"."
      }
     ],
     "checklist": [
      {
       "t": "Ik zeg dat Maurits hem een landverrader vond.",
       "woorden": [
        "verrad",
        "verraa"
       ]
      },
      {
       "t": "Ik geef een reden (wapenstilstand, of samenwerken met Frankrijk en Engeland).",
       "woorden": [
        "bestand",
        "wapenstilstand",
        "frankrijk",
        "engeland"
       ]
      },
      {
       "t": "Ik zeg dat Van Oldenbarnevelt zichzelf een goede vaderlander vond.",
       "woorden": [
        "vaderland",
        "eerlijk",
        "oprecht"
       ]
      },
      {
       "t": "Ik citeer uit allebei de bronnen, met aanhalingstekens.",
       "woorden": []
      }
     ],
     "w": "Twee kanten, elk met een reden en een citaat. Maurits: landverrader. Van Oldenbarnevelt: goede vaderlander.",
     "meer": "Veelgemaakte fout: alleen je eigen mening geven of maar één kant noemen. Bij perspectief moet je allebei de personen noemen."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Maurits en Van Oldenbarnevelt kwamen door drie oorzaken tegenover elkaar te staan: hun karakter, het Twaalfjarig Bestand en het geloof. Welke oorzaak vind jij het belangrijkst? Leg uit. (2p)",
     "tip": "Kies één oorzaak en begin met 'De belangrijkste oorzaak is ...'. Leg dan uit met 'omdat' waarom juist die de ruzie het meest aanwakkerde.",
     "model": [
      {
       "label": "Keuze",
       "tekst": "De belangrijkste oorzaak is het Twaalfjarig Bestand."
      },
      {
       "label": "Omdat",
       "tekst": "Omdat Maurits na het Bestand vond dat de politiek een fout had gemaakt. Daardoor ging hij zich met de politiek bemoeien, en kwam hij steeds vaker tegenover Van Oldenbarnevelt te staan. Zonder het Bestand was hij bij het leger gebleven."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met 'De belangrijkste oorzaak is ...' en noem één van de drie.",
       "woorden": [
        "belangrijkste",
        "oorzaak"
       ]
      },
      {
       "t": "Ik noem karakter, Bestand of geloof bij naam.",
       "woorden": [
        "karakter",
        "bestand",
        "geloof",
        "calvinis"
       ]
      },
      {
       "t": "Ik leg uit met 'omdat' of 'daardoor'.",
       "woorden": [
        "omdat",
        "daardoor",
        "waardoor"
       ]
      },
      {
       "t": "Ik laat zien hoe deze oorzaak de ruzie groter maakte.",
       "woorden": [
        "ruzie",
        "conflict",
        "tegenover"
       ]
      }
     ],
     "w": "Eén oorzaak kiezen + een uitleg die laat zien waarom juist die oorzaak de doorslag gaf.",
     "meer": "Je mag ook het geloof of het karakter kiezen, als je het goed uitlegt. Veelgemaakte fout: alle drie noemen zonder te kiezen. Dan krijg je het punt voor de keuze niet."
    },
    {
     "t": "mc",
     "q": "Waarin was de Republiek anders dan Spanje, Frankrijk en Engeland in de 16e en 17e eeuw?",
     "o": [
      "geen koning, en zelfstandige gewesten",
      "een koning uit de familie Oranje die alles zelf besliste",
      "één centraal bestuur met overal precies dezelfde wetten",
      "een gekozen parlement"
     ],
     "a": "geen koning, en zelfstandige gewesten",
     "w": "De Republiek was een land zonder vorst. De gewesten overlegden in de Staten-Generaal, maar regelden veel zelf.",
     "meer": "Dit is een leerdoel van de paragraaf: de staatsinrichting van de Republiek. Stadhouder en landsadvocaat deelden de macht; er was geen vorst boven hen.",
     "fout": {
      "een koning uit de familie Oranje die alles zelf besliste": "De Oranjes waren stadhouder, geen koning. Het stadhouderschap was niet eens erfelijk, al kwamen ze steeds uit die familie.",
      "één centraal bestuur met overal precies dezelfde wetten": "Dat is <b>centralisatie</b>, en daar waren de gewesten juist tegen in opstand gekomen. De Republiek koos voor particularisme.",
      "een gekozen parlement": "Verkiezingen voor iedereen kwamen pas veel later. In de Staten-Generaal zaten afgevaardigden van de gewesten."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron D: Een prent van de onderhandelingen",
      "tekst": "Op de prent zitten Maurits, Van Oldenbarnevelt en de Spaanse onderhandelaar pater Neyen aan een tafel. Ze praten in 1607 over de voorwaarden van een wapenstilstand.",
      "onder": "Naar: een prent van J.F.C. Reckleben, gemaakt tussen 1855 en 1857 (Haags Gemeentearchief)."
     },
     "q": "Is bron D een bron uit de tijd van de onderhandelingen zelf?",
     "o": [
      "nee, hij is ongeveer 250 jaar later gemaakt",
      "ja, want Maurits en Van Oldenbarnevelt staan erop",
      "ja, want hij laat het jaar 1607 zien aan tafel",
      "nee, want een prent is nooit een echte historische bron"
     ],
     "a": "nee, hij is ongeveer 250 jaar later gemaakt",
     "w": "De prent is gemaakt rond 1855, terwijl de onderhandelingen in 1607 waren. De maker was er niet bij.",
     "meer": "Hier gebruik je het onderschrift wél, want de vraag gaat over wanneer de bron gemaakt is. Bij een vraag over wat de bron laat zien, kijk je naar de bron zelf.",
     "fout": {
      "ja, want Maurits en Van Oldenbarnevelt staan erop": "Wie erop staat, zegt niet wanneer hij gemaakt is. Een tekenaar kan ook later mensen uit het verleden tekenen.",
      "ja, want hij laat het jaar 1607 zien aan tafel": "De prent gaat <b>over</b> 1607, maar is niet <b>uit</b> 1607. Kijk naar het jaar waarin hij gemaakt is.",
      "nee, want een prent is nooit een echte historische bron": "Een prent kan best een bron uit de tijd zelf zijn, als hij toen gemaakt is. Het probleem hier is het jaar: 250 jaar later."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron E: Een herdenking in 1919",
      "tekst": "Op een foto staan veel mensen bij het standbeeld van Johan van Oldenbarnevelt in Amersfoort. Er worden kransen gelegd, precies 300 jaar na zijn dood.",
      "onder": "Naar: een foto van de herdenking in 1919 (archief Spaarnestad)."
     },
     "q": "Wat laat bron E zien over hoe mensen later naar Van Oldenbarnevelt keken?",
     "o": [
      "Velen eerden hem later als een groot vaderlander.",
      "Mensen vierden in 1919 dat de landverrader gestraft was.",
      "Mensen vonden in 1919 dat Maurits gelijk had gekregen.",
      "Niemand kende hem nog."
     ],
     "a": "Velen eerden hem later als een groot vaderlander.",
     "w": "Een standbeeld en kransen, 300 jaar later: zo eer je iemand. Later kregen veel mensen meer begrip voor zijn kant van het verhaal.",
     "meer": "Perspectief kan veranderen in de tijd. In 1619 werd hij als landverrader gedood, in 1919 werd hij herdacht.",
     "fout": {
      "Mensen vierden in 1919 dat de landverrader gestraft was.": "Kransen leggen bij een standbeeld is eren, niet vieren dat iemand gestraft is.",
      "Mensen vonden in 1919 dat Maurits gelijk had gekregen.": "De herdenking gaat over Van Oldenbarnevelt, niet over Maurits. Je eert niet degene die je ongelijk vindt hebben.",
      "Niemand kende hem nog.": "Op de foto staan juist veel mensen. Hij was 300 jaar later nog steeds bekend."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe kwamen Maurits en Van Oldenbarnevelt lijnrecht tegenover elkaar?",
     "stappen": [
      "De oorlog brengt de handel van Holland veel schade toe",
      "Van Oldenbarnevelt zet een wapenstilstand door, tegen de zin van Maurits",
      "Maurits gaat zich daarna meer met de politiek bemoeien",
      "Ze ruziën ook over het calvinisme en beschuldigen elkaar",
      "Maurits pleegt een staatsgreep en laat Van Oldenbarnevelt oppakken"
     ],
     "w": "Handel → wapenstilstand → Maurits in de politiek → ruzie over geloof en beschuldigingen → staatsgreep.",
     "meer": "Jaartallen: het Bestand begint in 1609, de staatsgreep is in 1618, de onthoofding in 1619. Bij een verklaring in stappen schrijf je elke stap op een eigen regel."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron F: Utrecht, zomer 1618",
      "tekst": "Maurits trekt met zijn soldaten de stad Utrecht binnen. De soldaten die de stad zelf had aangenomen, moeten hun wapens inleveren. Het stadsbestuur wordt naar huis gestuurd en vervangen door aanhangers van Maurits.",
      "onder": "Eigen bewerking, naar de gebeurtenissen in Utrecht in 1618."
     },
     "q": "Welk begrip past het best bij wat in bron F gebeurt?",
     "o": [
      "staatsgreep",
      "wapenstilstand",
      "landverraad",
      "muiterij"
     ],
     "a": "staatsgreep",
     "w": "Maurits neemt met soldaten, dus met geweld, de macht over en zet zijn eigen mensen in het bestuur. Dat is een staatsgreep.",
     "meer": "Definitie: 'overname met geweld van de macht in een land'. In de bron zie je de soldaten (geweld) en het nieuwe bestuur (de macht).",
     "fout": {
      "wapenstilstand": "Een wapenstilstand betekent juist stoppen met vechten. Hier gebruikt Maurits zijn soldaten om de macht te pakken.",
      "landverraad": "Dat was de beschuldiging tegen Van Oldenbarnevelt. Maurits pleegt hier geen verraad, hij grijpt de macht.",
      "muiterij": "Bij muiterij komen soldaten in opstand tegen hun eigen leiding. Hier geeft de leider zelf (Maurits) de bevelen."
     }
    }
   ]
  }
 ]
},
{
 "id": "vrede-munster",
 "emoji": "🕊️",
 "titel": "4.5.3 · De Spaanse overgave",
 "paragraaf": "§4.5",
 "kort": "Frederik Hendrik, de stedendwinger, verjaagt de Spanjaarden verder. In 1648 erkent Spanje de Republiek in de Vrede van Münster. Zo eindigt de keten die in 1566 met de Beeldenstorm begon.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In <b>1625</b> sterft Maurits. Zijn <b>halfbroer Frederik Hendrik</b> (1584-1647), ook een zoon van Willem van Oranje maar met een andere moeder, wordt de nieuwe stadhouder en bevelhebber van het Staatse leger. Hij krijgt de bijnaam <b>'stedendwinger'</b>, omdat hij steden als <b>'s-Hertogenbosch</b> en <b>Maastricht</b> op de Spanjaarden verovert. De dood van Maurits maakte het leger dus niet zwakker.",
    "De opstandelingen winnen steeds meer. Dat komt door Frederik Hendrik, maar vooral doordat Spanje <b>ook andere oorlogen</b> voert. Spanje moet zijn aandacht en legers verdelen. In <b>1648</b> geeft Spanje op: de <b>Vrede van Münster</b>, een <b>'vredesverdrag uit 1648 tussen de Republiek en Spanje'</b>. Spanje erkent de Republiek als zelfstandige staat. Dat is het einde van de <b>Nederlandse Opstand</b> (1568-1648), ook wel de Tachtigjarige Oorlog, met het Bestand van 1609-1621 ertussen.",
    "Het <b>kenmerkend aspect</b> van deze paragraaf is: <b>'het conflict in de Nederlanden dat resulteerde in de stichting van een Nederlandse staat'</b>. Dat is één lange keten:<br><b>1566</b> Beeldenstorm: de <b>aanleiding</b> van het conflict.<br><b>1567</b> Filips stuurt <b>Alva</b>, die met harde hand straft.<br><b>1568</b> de Opstand begint, onder leiding van <b>Willem van Oranje</b>.<br><b>1579</b> de splitsing: het zuiden stopt in de <b>Unie van Atrecht</b>, het noorden vecht door in de <b>Unie van Utrecht</b>.<br><b>1581</b> <b>Plakkaat van Verlatinghe</b>: het noorden erkent Filips II niet meer als vorst.<br><b>1588</b> de <b>Republiek der Zeven Verenigde Nederlanden</b>: een land zonder vorst.<br><b>1648</b> <b>Vrede van Münster</b>: Spanje erkent de Republiek.",
    "De eerste vier stappen zijn het <b>conflict</b>, de laatste drie de <b>stichting van de staat</b>. Houd de Oranjes uit elkaar: <b>Willem</b> begint de Opstand (vader, †1584), <b>Maurits</b> breidt de Republiek uit (zoon, 1585-1625), <b>Frederik Hendrik</b> dwingt de steden (halfbroer van Maurits, vanaf 1625)."
   ],
   "regel": "Van Beeldenstorm (1566) tot Münster (1648): eerst het conflict, dan de stichting van een eigen staat, de Republiek.",
   "voorbeelden": [
    {
     "en": "Aanleiding = de vonk (de Beeldenstorm). Oorzaken = het kruitvat (geloofsvervolging, belastingen, centralisatie).",
     "let": "Vraagt de toets naar de aanleiding, dan is het antwoord kort: 'de Beeldenstorm (1566)'."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Wie was Frederik Hendrik?",
     "o": [
      "de halfbroer van Maurits",
      "de zoon van Maurits van Nassau",
      "de jongere broer van Willem van Oranje",
      "de landsadvocaat na Van Oldenbarnevelt"
     ],
     "a": "de halfbroer van Maurits",
     "w": "Frederik Hendrik was de halfbroer van Maurits. Ze hadden dezelfde vader (Willem van Oranje) en een andere moeder.",
     "meer": "Hij volgde Maurits in 1625 op als stadhouder en leider van het Staatse leger.",
     "fout": {
      "de zoon van Maurits van Nassau": "Dit is de valkuil: Frederik Hendrik is geen zoon maar de <b>halfbroer</b> van Maurits. Ze zijn allebei zoons van Willem.",
      "de jongere broer van Willem van Oranje": "Hij is een <b>zoon</b> van Willem, geen broer. Hij werd pas in 1584 geboren, vlak voor de moord op zijn vader.",
      "de landsadvocaat na Van Oldenbarnevelt": "Frederik Hendrik was stadhouder en militair, net als Maurits. Geen ambtenaar."
     }
    },
    {
     "t": "gap",
     "q": "In het jaar ___ werd de Vrede van Münster gesloten.",
     "a": "1648|in 1648",
     "w": "In 1648 sloten de Republiek en Spanje vrede in Münster. Spanje erkende de Republiek.",
     "meer": "Tel terug: 1648 - 80 = 1568, het begin van de Opstand. Zo onthoud je allebei."
    },
    {
     "t": "mc",
     "q": "Waarom kreeg Frederik Hendrik de bijnaam 'stedendwinger'?",
     "o": [
      "hij veroverde steden als 's-Hertogenbosch en Maastricht",
      "hij dwong de steden van Holland om meer belasting te betalen",
      "hij bouwde nieuwe vestingsteden rond Amsterdam en Leiden",
      "hij dwong de zuidelijke steden om calvinist te worden"
     ],
     "a": "hij veroverde steden als 's-Hertogenbosch en Maastricht",
     "w": "Hij 'dwong' steden tot overgave door ze te belegeren. Bekend zijn 's-Hertogenbosch en Maastricht.",
     "meer": "Daarom werd het Staatse leger na de dood van Maurits niet zwakker: zijn opvolger was minstens zo succesvol.",
     "fout": {
      "hij dwong de steden van Holland om meer belasting te betalen": "Het ging om steden van de vijand, niet om steden in Holland. 'Dwingen' betekent hier: veroveren.",
      "hij bouwde nieuwe vestingsteden rond Amsterdam en Leiden": "Hij bouwde ze niet, hij veroverde ze, en dan vooral in het zuiden.",
      "hij dwong de zuidelijke steden om calvinist te worden": "Het ging om veroveren met het leger, niet om het geloof van de inwoners."
     }
    },
    {
     "t": "sleep",
     "opgave": "Drie Oranjes. Bij wie hoort elk feit?",
     "chips": [
      {
       "t": "vermoord in 1584",
       "bak": "wil",
       "waarom": "Willem van Oranje werd in 1584 in Delft vermoord."
      },
      {
       "t": "leider van de Opstand vanaf 1568",
       "bak": "wil",
       "waarom": "Willem leidde de Opstand vanaf het begin."
      },
      {
       "t": "stadhouder op zijn achttiende, in 1585",
       "bak": "mau",
       "waarom": "Maurits volgde zijn vader op toen hij 18 werd."
      },
      {
       "t": "veroverde Breda met een turfschip",
       "bak": "mau",
       "waarom": "Breda (1590) was een list van Maurits."
      },
      {
       "t": "pleegde in 1618 een staatsgreep",
       "bak": "mau",
       "waarom": "De staatsgreep tegen Van Oldenbarnevelt was van Maurits."
      },
      {
       "t": "bijnaam 'stedendwinger'",
       "bak": "fh",
       "waarom": "Frederik Hendrik kreeg deze bijnaam door zijn veroveringen."
      },
      {
       "t": "veroverde 's-Hertogenbosch en Maastricht",
       "bak": "fh",
       "waarom": "Dat zijn de bekendste steden van Frederik Hendrik."
      },
      {
       "t": "stadhouder vanaf 1625",
       "bak": "fh",
       "waarom": "Frederik Hendrik volgde in 1625 zijn halfbroer Maurits op."
      }
     ],
     "bakjes": [
      {
       "id": "wil",
       "label": "Willem van Oranje",
       "som": "vader, begint de Opstand"
      },
      {
       "id": "mau",
       "label": "Maurits",
       "som": "zoon, 1585-1625"
      },
      {
       "id": "fh",
       "label": "Frederik Hendrik",
       "som": "halfbroer van Maurits, vanaf 1625"
      }
     ],
     "w": "Willem (vader) begint, Maurits (zoon) breidt uit, Frederik Hendrik (halfbroer) dwingt de steden.",
     "meer": "Ezelsbruggetje op volgorde van de jaartallen: 1568 Willem, 1585 Maurits, 1625 Frederik Hendrik."
    },
    {
     "t": "sequence",
     "q": "Zet de keten van het kenmerkend aspect in de goede volgorde (oudste eerst).",
     "stappen": [
      "1566: de Beeldenstorm",
      "1568: de Opstand begint onder Willem van Oranje",
      "1579: splitsing in de Unie van Atrecht en de Unie van Utrecht",
      "1581: Plakkaat van Verlatinghe",
      "1588: de Republiek der Zeven Verenigde Nederlanden",
      "1648: de Vrede van Münster"
     ],
     "w": "Beeldenstorm, Opstand, splitsing, Plakkaat, Republiek, Münster: van conflict naar eigen staat.",
     "meer": "Tussen 1566 en 1568 komt ook nog Alva (1567). En let op: 1579 (splitsing) komt vóór 1581 (Plakkaat) en 1588 (Republiek)."
    },
    {
     "t": "mc",
     "q": "Waar maakte de Vrede van Münster een einde aan?",
     "o": [
      "aan de Nederlandse Opstand van 1568 tot 1648",
      "aan het Twaalfjarig Bestand van 1609 tot 1621",
      "aan een oorlog die tachtig jaar zonder pauze duurde",
      "aan de Unie van Utrecht"
     ],
     "a": "aan de Nederlandse Opstand van 1568 tot 1648",
     "w": "De Vrede van Münster sloot de Opstand af, die in 1568 begon. Spanje erkende de Republiek.",
     "meer": "Bij zo'n vraag vraagt het werkboek ook de jaartallen. Schrijf dus altijd '1568 tot 1648' erbij.",
     "fout": {
      "aan het Twaalfjarig Bestand van 1609 tot 1621": "Het Bestand was al in 1621 afgelopen. Daarna werd er nog 27 jaar gevochten.",
      "aan een oorlog die tachtig jaar zonder pauze duurde": "De jaartallen kloppen ongeveer, maar 'zonder pauze' niet: van 1609 tot 1621 was er een wapenstilstand.",
      "aan de Unie van Utrecht": "De Unie van Utrecht was de samenwerking van het noorden. Die werd juist de basis van de Republiek, ze hield niet op."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de aanleiding van het conflict in de Nederlanden?",
     "o": [
      "de Beeldenstorm van 1566",
      "de komst van Alva in 1567",
      "de moord op Willem van Oranje in 1584",
      "hoge belastingen"
     ],
     "a": "de Beeldenstorm van 1566",
     "w": "De Beeldenstorm is de vonk die het conflict liet ontbranden. Daarna stuurde Filips Alva.",
     "meer": "Een <b>aanleiding</b> is de directe gebeurtenis waardoor iets begint. <b>Oorzaken</b> zijn de diepere redenen (geloof, geld, macht). Op de toets is 'de Beeldenstorm' genoeg voor het punt.",
     "fout": {
      "de komst van Alva in 1567": "Alva kwam juist <b>als gevolg</b> van de Beeldenstorm. Filips was woedend en stuurde hem om te straffen.",
      "de moord op Willem van Oranje in 1584": "Toen was het conflict al zestien jaar bezig. Dat kan geen aanleiding zijn.",
      "hoge belastingen": "Dat is een <b>oorzaak</b> (economisch), geen aanleiding. Een aanleiding is één concrete gebeurtenis."
     }
    },
    {
     "t": "mc",
     "q": "Wat besloten de noordelijke gewesten in 1581 met het Plakkaat van Verlatinghe?",
     "o": [
      "ze erkenden Filips II niet langer als hun vorst",
      "ze sloten vrede met Spanje en Filips II",
      "ze splitsten zich af van de zuidelijke gewesten",
      "ze richtten de Republiek op als land zonder vorst"
     ],
     "a": "ze erkenden Filips II niet langer als hun vorst",
     "w": "Met het Plakkaat van Verlatinghe zwoeren de noordelijke gewesten Filips II af: hij was niet langer hun heer.",
     "meer": "Ze zochten daarna nog een nieuwe vorst. Pas toen dat niet lukte, gingen ze in 1588 verder als Republiek.",
     "fout": {
      "ze sloten vrede met Spanje en Filips II": "Juist het omgekeerde: ze braken met Filips. De vrede kwam pas in 1648.",
      "ze splitsten zich af van de zuidelijke gewesten": "De splitsing was twee jaar eerder, in <b>1579</b> (Unies van Atrecht en Utrecht).",
      "ze richtten de Republiek op als land zonder vorst": "De Republiek kwam pas in <b>1588</b>, zeven jaar later. In 1581 zetten ze alleen Filips af."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Bronnen <b>chronologisch ordenen</b>: vraag je bij elke bron af <b>over welke gebeurtenis</b> hij gaat. Koppel de bron aan die gebeurtenis, en zet dan de gebeurtenissen op volgorde. Een kaart van twee unies hoort bij 1579, een tekst over een land zonder vorst bij 1588.",
    "Pas op met twee bronnen die op elkaar lijken: de <b>splitsing</b> (1579) gaat over noord tegenover zuid, twee groepen gewesten. De <b>oprichting van de Republiek</b> (1588) gaat over de zeven noordelijke gewesten die samen een staat zonder koning worden.",
    "Bij <b>'noem de belangrijkste oorzaak'</b> zoek je wat Spanje zelf verzwakte. Spanje voerde ook andere oorlogen en moest zijn legers verdelen. 'Het leger was te sterk' is te vaag: zeg welk leger en waarom.",
    "Bij <b>bedoeld en onbedoeld</b> vraag je: wilde de persoon dit zelf? Filips stuurde Alva om de orde te herstellen (bedoeld), maar Alva's harde hand leidde tot de Opstand (onbedoeld)."
   ],
   "regel": "Ordenen: eerst elke bron aan een gebeurtenis koppelen, dan pas de gebeurtenissen op volgorde zetten.",
   "vragen": [
    {
     "t": "sequence",
     "q": "Zet deze bronnen op volgorde van de gebeurtenis waar ze over gaan (oudste eerst).",
     "stappen": [
      "Een prent waarop mannen beelden uit een kerk slaan",
      "Een prent van Alva op een troon, met zijn strenge raad naast hem",
      "Een kaart met in het zuiden de Unie van Atrecht en in het noorden de Unie van Utrecht",
      "Een tekst waarin de Staten verklaren dat Filips II niet langer hun heer is",
      "Een kaart waarop bijna het hele noorden in Staatse handen is",
      "Een prent van een feest in 1648 omdat Spanje vrede sluit"
     ],
     "w": "Beeldenstorm (1566), Alva (1567), splitsing (1579), Plakkaat (1581), Maurits heeft het noorden (1598), Münster (1648).",
     "meer": "Hier stonden expres geen jaartallen bij: je moest de bron eerst aan een gebeurtenis koppelen. Dat is precies wat het werkboek bij bronnen ordenen vraagt."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Een kaart",
      "tekst": "Op een kaart van de Nederlanden zijn de zuidelijke gewesten (zoals Artois en Henegouwen) rood gekleurd en de noordelijke gewesten (zoals Holland, Zeeland en Utrecht) oranje. Een dikke lijn scheidt de twee groepen.",
      "onder": "Eigen beschrijving van een kaart, zoals bron 11 in het werkboek."
     },
     "q": "Bij welke gebeurtenis hoort bron A?",
     "o": [
      "de splitsing van noord en zuid in 1579",
      "de oprichting van de Republiek in 1588",
      "de verspreiding van de Beeldenstorm in 1566",
      "de Vrede van Münster"
     ],
     "a": "de splitsing van noord en zuid in 1579",
     "w": "Twee groepen gewesten met een lijn ertussen: dat is de splitsing in de Unie van Atrecht (zuid) en de Unie van Utrecht (noord).",
     "meer": "Dit zijn de twee bronnen die vaak verwisseld worden. Splitsing = noord tegenover zuid. Republiek = het noorden alleen, als staat zonder koning.",
     "fout": {
      "de oprichting van de Republiek in 1588": "Bij de Republiek gaat het om het noorden alleen, als een land zonder vorst. Deze kaart laat juist twee groepen naast elkaar zien.",
      "de verspreiding van de Beeldenstorm in 1566": "Een kaart van de Beeldenstorm laat zien hoe de onrust zich verspreidde, met pijlen of stippen, niet twee blokken gewesten.",
      "de Vrede van Münster": "In 1648 sluiten Spanje en de Republiek vrede. Op deze kaart zie je de splitsing van de gewesten zelf."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron B: Een besluit",
      "tekst": "De zeven gewesten konden het niet eens worden over wie hun nieuwe heer moest worden. Daarom besloten ze voortaan samen verder te gaan zonder vorst.",
      "onder": "Eigen bewerking, naar bron 12 in het werkboek."
     },
     "q": "Bij welke gebeurtenis hoort bron B?",
     "o": [
      "de start van de Republiek in 1588",
      "de splitsing van noord en zuid in 1579",
      "het Plakkaat van Verlatinghe in 1581",
      "het begin van het Twaalfjarig Bestand"
     ],
     "a": "de start van de Republiek in 1588",
     "w": "'Samen verder zonder vorst': dat is de Republiek der Zeven Verenigde Nederlanden.",
     "meer": "Republiek betekent: een land zonder vorst. Dat woord zit verstopt in de bron als 'zonder vorst'.",
     "fout": {
      "de splitsing van noord en zuid in 1579": "Bij de splitsing gaan noord en zuid uit elkaar. Hier gaat het over de zeven noordelijke gewesten die samen een staat worden.",
      "het Plakkaat van Verlatinghe in 1581": "Met het Plakkaat zetten ze Filips af, maar ze zochten daarna nog een nieuwe heer. 'Verder zonder vorst' kwam pas in 1588.",
      "het begin van het Twaalfjarig Bestand": "Het Bestand gaat over een wapenstilstand met Spanje, niet over hoe de gewesten zich bestuurden."
     }
    },
    {
     "t": "mc",
     "q": "Wat was de belangrijkste oorzaak dat Spanje de Republiek na 1625 niet kon verslaan?",
     "o": [
      "Spanje vocht ook elders en moest zijn legers verdelen",
      "het leger van de Republiek was gewoon veel te sterk",
      "Frederik Hendrik had een grotere vloot dan de Armada van 1588",
      "Spanje had na de Armada helemaal geen soldaten meer"
     ],
     "a": "Spanje vocht ook elders en moest zijn legers verdelen",
     "w": "Spanje vocht op meer plaatsen in Europa. Daardoor had het niet genoeg soldaten en geld om de Republiek te verslaan.",
     "meer": "Schrijf het in twee delen: de oorzaak (andere oorlogen) en het gevolg (aandacht en legers verdelen). Dan is het antwoord compleet.",
     "fout": {
      "het leger van de Republiek was gewoon veel te sterk": "Het Staatse leger was goed, maar 'te sterk' is te vaag en niet de belangrijkste oorzaak. Het werkboek wil: Spanje moest zijn legers <b>verdelen</b>.",
      "Frederik Hendrik had een grotere vloot dan de Armada van 1588": "Frederik Hendrik was vooral een veroveraar van steden op het land. Over een vloot groter dan de Armada staat niets in de stof.",
      "Spanje had na de Armada helemaal geen soldaten meer": "Spanje had nog grote legers, ook na 1588. Het probleem was dat die over veel oorlogen verdeeld waren."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Na 1625 had het Staatse leger een nieuwe leider. Leg met bron C uit waarom het leger daardoor niet zwakker werd. (2p)",
     "bron": {
      "titel": "Bron C: Het beleg van Maastricht",
      "tekst": "Op een ets uit de 17e eeuw zie je de stad Maastricht, omringd door loopgraven, kanonnen en duizenden soldaten van het Staatse leger. De stad wordt van alle kanten ingesloten.",
      "onder": "Naar: een ets van het beleg van Maastricht in 1632, onbekende kunstenaar (Rijksmuseum)."
     },
     "tip": "Schrijf twee zinnen: wie het leger overnam, en wat hij bereikte. Gebruik iets wat je in de bron ziet als bewijs.",
     "model": [
      {
       "label": "Wie",
       "tekst": "Na de dood van Maurits nam zijn halfbroer Frederik Hendrik de leiding over het Staatse leger over."
      },
      {
       "label": "Wat hij bereikte",
       "tekst": "Frederik Hendrik verjoeg de Spanjaarden steeds verder en veroverde steden als 's-Hertogenbosch en Maastricht."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je dat het Staatse leger Maastricht met loopgraven en kanonnen van alle kanten insluit."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem Frederik Hendrik als nieuwe leider.",
       "woorden": [
        "frederik",
        "hendrik"
       ]
      },
      {
       "t": "Ik zeg dat hij de halfbroer van Maurits was.",
       "woorden": [
        "halfbroer",
        "broer"
       ]
      },
      {
       "t": "Ik zeg wat hij bereikte (steden veroveren, Spanjaarden verjagen).",
       "woorden": [
        "verover",
        "verjaag",
        "verjoeg",
        "steden"
       ]
      },
      {
       "t": "Ik noem iets wat ik in de bron zie.",
       "woorden": [
        "maastricht",
        "kanon",
        "loopgra",
        "soldat"
       ]
      }
     ],
     "w": "Frederik Hendrik nam het over en was even succesvol: hij veroverde steden. De bron laat een groot, sterk Staats leger zien.",
     "meer": "Veelgemaakte fout: 'het leger bleef sterk' schrijven zonder te zeggen <b>waarom</b>. Noem de nieuwe leider en wat hij deed."
    },
    {
     "t": "mc",
     "q": "Wat bleef hetzelfde van 1584 tot 1648?",
     "o": [
      "een Oranje leidde als stadhouder het Staatse leger",
      "er werd elk jaar zonder pauze gevochten tegen Spanje",
      "Spanje erkende de Republiek al als zelfstandige staat",
      "de Republiek werd geregeerd door een eigen koning"
     ],
     "a": "een Oranje leidde als stadhouder het Staatse leger",
     "w": "Eerst Maurits (1585-1625), daarna Frederik Hendrik (vanaf 1625): steeds een Oranje aan het hoofd van het leger.",
     "meer": "Dit is <b>continuïteit</b>. Het stadhouderschap was niet erfelijk, toch kwam de stadhouder steeds uit de familie Oranje-Nassau.",
     "fout": {
      "er werd elk jaar zonder pauze gevochten tegen Spanje": "Van 1609 tot 1621 gold het Twaalfjarig Bestand. Er was dus wel een pauze.",
      "Spanje erkende de Republiek al als zelfstandige staat": "Die erkenning kwam pas in 1648, met de Vrede van Münster. Daarvoor zag Spanje de gewesten als opstandelingen.",
      "de Republiek werd geregeerd door een eigen koning": "De Republiek had juist geen koning. Dat was het hele punt van een republiek."
     }
    },
    {
     "t": "mc",
     "q": "Toen en nu: was Nederland na 1648 al een koninkrijk, zoals nu?",
     "o": [
      "nee, het was een republiek zonder koning",
      "ja, Frederik Hendrik werd in 1648 de eerste koning",
      "ja, met een Spaanse koning",
      "nee, het werd weer een deel van het Spaanse rijk"
     ],
     "a": "nee, het was een republiek zonder koning",
     "w": "Na 1648 bleef Nederland de Republiek der Zeven Verenigde Nederlanden, tot 1795. Een koning kwam pas in 1815.",
     "meer": "Nu is Nederland een koninkrijk met koning Willem-Alexander (sinds 2013), een verre nazaat van de Oranjes. Toen waren de Oranjes stadhouder, geen koning.",
     "fout": {
      "ja, Frederik Hendrik werd in 1648 de eerste koning": "Frederik Hendrik stierf in 1647, en hij was stadhouder, geen koning. Al wilde zijn vrouw Amalia van Solms graag koninklijk lijken.",
      "ja, met een Spaanse koning": "Spanje erkende in 1648 juist dat de Republiek vrij was, zonder Spaanse vorst.",
      "nee, het werd weer een deel van het Spaanse rijk": "'Nee' klopt, maar de reden niet: in 1648 werd de Republiek juist erkend als zelfstandige staat."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wilde de persoon dit gevolg zelf (bedoeld), of gebeurde het tegen zijn wil (onbedoeld)?",
     "chips": [
      {
       "t": "Filips stuurt Alva: de Beeldenstormers worden gestraft",
       "bak": "bed",
       "waarom": "Straffen was precies waarvoor Filips Alva stuurde: bedoeld."
      },
      {
       "t": "Filips stuurt Alva: de Nederlanden komen in opstand",
       "bak": "onb",
       "waarom": "Filips wilde rust, geen opstand. Dat gevolg wilde hij niet: onbedoeld."
      },
      {
       "t": "Filips betaalt zijn soldaten niet: ze muiten en plunderen",
       "bak": "onb",
       "waarom": "Filips wilde dat zijn soldaten vochten, niet dat ze muitten: onbedoeld."
      },
      {
       "t": "Van Oldenbarnevelt sluit het Bestand: de handel herstelt",
       "bak": "bed",
       "waarom": "Hij wilde het Bestand juist om de handel te redden: bedoeld."
      },
      {
       "t": "Van Oldenbarnevelt sluit het Bestand: Maurits gaat zich met politiek bemoeien",
       "bak": "onb",
       "waarom": "Dat wilde Van Oldenbarnevelt zeker niet, het werd uiteindelijk zijn ondergang: onbedoeld."
      },
      {
       "t": "Maurits pleegt een staatsgreep: hij heeft de macht in handen",
       "bak": "bed",
       "waarom": "Macht grijpen was het doel van de staatsgreep: bedoeld."
      }
     ],
     "bakjes": [
      {
       "id": "bed",
       "label": "bedoeld gevolg",
       "som": "wat de persoon wilde"
      },
      {
       "id": "onb",
       "label": "onbedoeld gevolg",
       "som": "gebeurde tegen zijn wil"
      }
     ],
     "w": "Bedoeld = het doel van de persoon. Onbedoeld = een gevolg dat hij niet wilde, vaak juist het omgekeerde.",
     "meer": "Eén gebeurtenis kan allebei hebben: Alva sturen gaf een bedoeld gevolg (straffen) én een onbedoeld gevolg (de Opstand)."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Het kenmerkend aspect uitleggen is een <b>verklaring in stappen</b> over tachtig jaar. Het werkboek wil per gebeurtenis een zin uitleg, met de jaartallen erbij. Gebruik de keten: Beeldenstorm → Alva → Opstand → splitsing → Plakkaat → Republiek → Münster.",
    "Verdeel het in twee helften. <b>Conflict in de Nederlanden</b>: Beeldenstorm (1566), de komst en het harde bestuur van Alva (1567), het begin van de Opstand (1568). <b>Stichting van de Nederlandse staat</b>: Plakkaat van Verlatinghe (1581), Republiek der Zeven Verenigde Nederlanden (1588), Vrede van Münster (1648).",
    "Elke stap verbind je met <b>daardoor</b> of <b>daarna</b>, en je zegt bij elke stap <b>waarom</b> de volgende kwam. 'In 1566 was de Beeldenstorm. Daardoor stuurde Filips Alva.' Dat is beter dan alleen een rijtje jaartallen.",
    "Bij een onbekende bron uit 1648 zoek je naar woorden die het einde van het conflict laten zien: 'vrij', 'erkent', 'geen aanspraak meer'. Dat is je bewijs."
   ],
   "regel": "Het kenmerkend aspect: conflict (1566-1568) en stichting (1581-1648), elke stap met een jaartal en een 'daardoor'.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg in stappen uit hoe het conflict in de Nederlanden leidde tot de stichting van een Nederlandse staat. Gebruik minstens vijf gebeurtenissen met jaartal. (5p)",
     "tip": "Schrijf elke gebeurtenis op een eigen regel: jaartal, wat er gebeurde, en met 'daardoor' of 'daarna' waarom de volgende stap kwam. Begin bij de Beeldenstorm, eindig bij Münster.",
     "model": [
      {
       "label": "Aanleiding",
       "tekst": "In 1566 vernielden protestanten beelden in kerken: de Beeldenstorm. Ze waren boos over de vervolging door Filips II."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor stuurde Filips in 1567 de hertog van Alva, die met harde hand strafte. Daardoor kwamen de Nederlanden in 1568 in opstand onder leiding van Willem van Oranje."
      },
      {
       "label": "Splitsing",
       "tekst": "Er ontstond ruzie over het geloof. In 1579 splitsten de gewesten: het zuiden stopte in de Unie van Atrecht, het noorden vocht door in de Unie van Utrecht."
      },
      {
       "label": "Een eigen staat",
       "tekst": "In 1581 erkende het noorden Filips II niet meer als vorst (Plakkaat van Verlatinghe). In 1588 gingen de zeven gewesten verder als Republiek der Zeven Verenigde Nederlanden, zonder vorst."
      },
      {
       "label": "Erkenning",
       "tekst": "Maurits en Frederik Hendrik verjoegen de Spanjaarden verder. In 1648 erkende Spanje de Republiek in de Vrede van Münster."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met de Beeldenstorm (1566) als aanleiding.",
       "woorden": [
        "beeldenstorm",
        "1566"
       ]
      },
      {
       "t": "Ik noem Alva en het begin van de Opstand (1568).",
       "woorden": [
        "alva",
        "1568"
       ]
      },
      {
       "t": "Ik noem de splitsing (1579) en het Plakkaat van Verlatinghe (1581).",
       "woorden": [
        "splits",
        "unie",
        "plakkaat",
        "verlatinghe"
       ]
      },
      {
       "t": "Ik noem de Republiek (1588) en de Vrede van Münster (1648).",
       "woorden": [
        "republiek",
        "1588",
        "nster",
        "1648"
       ]
      },
      {
       "t": "Ik verbind de stappen met 'daardoor' of 'daarna'.",
       "woorden": [
        "daardoor",
        "daarna",
        "waardoor"
       ]
      }
     ],
     "w": "Vijf stappen, elk met jaartal en uitleg: Beeldenstorm → Alva en Opstand → splitsing → Plakkaat en Republiek → Münster.",
     "meer": "Veelgemaakte fout: Alva of het Plakkaat vergeten, of de gebeurtenissen opsommen zonder uit te leggen waarom de volgende kwam. Elke gebeurtenis met uitleg is een punt."
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg met bron A uit waarom 1648 het eindpunt is van het kenmerkend aspect 'het conflict in de Nederlanden dat resulteerde in de stichting van een Nederlandse staat'. (2p)",
     "bron": {
      "titel": "Bron A: Artikel 1 van de Vrede van Münster",
      "tekst": "De koning van Spanje verklaart en erkent dat de Staten-Generaal van de Verenigde Nederlanden en hun gewesten vrije landen zijn, waarop hij geen enkele aanspraak meer maakt.",
      "onder": "Naar: artikel 1 van de Vrede van Münster (1648), vrij vertaald."
     },
     "tip": "Zeg eerst wat er in 1648 gebeurde. Citeer dan het stukje uit de bron dat laat zien dat Spanje de Republiek als staat erkende.",
     "model": [
      {
       "label": "Wat er gebeurde",
       "tekst": "In 1648 sloten Spanje en de Republiek de Vrede van Münster. Daarmee eindigde de Opstand (1568-1648)."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat de koning van Spanje \"erkent\" dat de Verenigde Nederlanden \"vrije landen zijn\". Daardoor was de Republiek nu ook voor Spanje een echte, zelfstandige staat: de stichting was af."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de Vrede van Münster en het einde van de Opstand.",
       "woorden": [
        "nster",
        "vrede",
        "opstand"
       ]
      },
      {
       "t": "Ik zeg dat Spanje de Republiek erkende als zelfstandige staat.",
       "woorden": [
        "erken",
        "zelfstandig",
        "vrij"
       ]
      },
      {
       "t": "Ik citeer uit de bron met aanhalingstekens.",
       "woorden": []
      },
      {
       "t": "Ik leg het verband met 'daardoor' of 'dus'.",
       "woorden": [
        "daardoor",
        "dus",
        "waardoor"
       ]
      }
     ],
     "w": "In 1648 erkende Spanje de Republiek. Het conflict was voorbij en de staat stond: dat is het eindpunt.",
     "meer": "Veelgemaakte fout: alleen 'in 1648 was de vrede' schrijven. Leg ook uit wat de vrede betekende (erkenning) en citeer het woord uit de bron dat dat bewijst."
    },
    {
     "t": "mc",
     "q": "Waarom noem je de Beeldenstorm de aanleiding, en niet de oorzaak van het conflict?",
     "o": [
      "het was de directe vonk, de onvrede bestond al langer",
      "de Beeldenstorm gebeurde maar in een paar kleine dorpen",
      "de Beeldenstorm had niets met het geloof te maken",
      "de Beeldenstorm was pas na het begin van de Opstand"
     ],
     "a": "het was de directe vonk, de onvrede bestond al langer",
     "w": "Geloofsvervolging, hoge belastingen en centralisatie zorgden al jaren voor onvrede. De Beeldenstorm liet het ontploffen.",
     "meer": "Denk aan een kruitvat: de oorzaken zijn het kruit, de aanleiding is de vonk. Zonder kruit doet een vonk niets.",
     "fout": {
      "de Beeldenstorm gebeurde maar in een paar kleine dorpen": "Hij verspreidde zich juist snel over vooral het westen van de Nederlanden, ook in grote steden.",
      "de Beeldenstorm had niets met het geloof te maken": "Het ging juist wel over het geloof: protestanten vonden beelden en versieringen in kerken fout.",
      "de Beeldenstorm was pas na het begin van de Opstand": "De Beeldenstorm was in 1566, de Opstand begon in 1568. Hij kwam ervóór."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron B: Een Spaanse raadsheer, 1647",
      "tekst": "Majesteit, we kunnen niet blijven vechten tegen deze opstandige ketters in het noorden. Onze legers zijn nodig in Duitsland en tegen de Fransen, en de schatkist is leeg.",
      "onder": "Eigen bewerking, zoals een raadgever van de Spaanse koning het in 1647 zou kunnen zeggen."
     },
     "q": "Welke oorzaak van de Spaanse overgave laat bron B zien?",
     "o": [
      "Spanje moest zijn legers over meer oorlogen verdelen",
      "Spanje vond de Republiek eigenlijk wel een goed idee",
      "Frederik Hendrik had de Spaanse koning verslagen",
      "Spanje was zelf protestant geworden na de lange oorlog"
     ],
     "a": "Spanje moest zijn legers over meer oorlogen verdelen",
     "w": "De raadsheer zegt dat de legers nodig zijn in Duitsland en tegen de Fransen. Spanje kan niet overal tegelijk vechten.",
     "meer": "Bewijs uit de bron: \"Onze legers zijn nodig in Duitsland en tegen de Fransen\". En het woord 'ketters' laat zien dat hij nog steeds tegen de Republiek is.",
     "fout": {
      "Spanje vond de Republiek eigenlijk wel een goed idee": "Hij noemt ze 'opstandige ketters'. Hij is er dus helemaal niet blij mee: Spanje geeft op omdat het moet.",
      "Frederik Hendrik had de Spaanse koning verslagen": "Er staat niets over Frederik Hendrik in de bron. En een koning persoonlijk verslaan gebeurde niet.",
      "Spanje was zelf protestant geworden na de lange oorlog": "Spanje bleef katholiek. Het woord 'ketters' (zo noemden katholieken protestanten) bewijst dat."
     }
    },
    {
     "t": "mc",
     "q": "Een klasgenoot zegt: 'Tachtig jaar lang werd er elke dag gevochten, en dat is de schuld van Frederik Hendrik.' Wat is het beste weerwoord?",
     "o": [
      "Er was twaalf jaar Bestand, en Willem begon de Opstand.",
      "Klopt, want Frederik Hendrik leefde tachtig jaar lang.",
      "Klopt, maar alleen Maurits vocht, niet Frederik Hendrik.",
      "Er werd nooit gevochten, het was alleen een ruzie op papier."
     ],
     "a": "Er was twaalf jaar Bestand, en Willem begon de Opstand.",
     "w": "Twee fouten: er was een wapenstilstand van 1609 tot 1621, en de Opstand begon in 1568 onder Willem, niet onder Frederik Hendrik.",
     "meer": "Zo pak je een bewering aan: zoek elke fout apart en verbeter hem met een feit en een jaartal.",
     "fout": {
      "Klopt, want Frederik Hendrik leefde tachtig jaar lang.": "Frederik Hendrik leefde van 1584 tot 1647, nog geen 65 jaar. En hij werd pas in 1625 stadhouder.",
      "Klopt, maar alleen Maurits vocht, niet Frederik Hendrik.": "Frederik Hendrik vocht juist veel: hij was de stedendwinger. En 'elke dag gevochten' klopt niet door het Bestand.",
      "Er werd nooit gevochten, het was alleen een ruzie op papier.": "Er werd wel degelijk gevochten: belegeringen, veldslagen, de Armada. Alleen niet onafgebroken."
     }
    },
    {
     "t": "mc",
     "q": "Welke gebeurtenis hoort bij 'de stichting van een Nederlandse staat', en niet bij 'het conflict in de Nederlanden'?",
     "o": [
      "het Plakkaat van Verlatinghe in 1581",
      "de Beeldenstorm van 1566",
      "de komst van de hertog van Alva in 1567",
      "het begin van de Opstand in 1568"
     ],
     "a": "het Plakkaat van Verlatinghe in 1581",
     "w": "Met het Plakkaat zetten de gewesten Filips af. Dat is de eerste stap naar een eigen staat, na het Plakkaat volgen de Republiek en Münster.",
     "meer": "Het werkboek verdeelt het kenmerkend aspect in twee: conflict (Beeldenstorm, Alva, zijn bestuur) en stichting van de staat (Plakkaat, Republiek, Münster). Leer welke gebeurtenis in welke helft hoort.",
     "fout": {
      "de Beeldenstorm van 1566": "De Beeldenstorm is de aanleiding van het <b>conflict</b>, nog lang geen nieuwe staat.",
      "de komst van de hertog van Alva in 1567": "Alva maakt het <b>conflict</b> juist groter. Hij hoort bij de eerste helft.",
      "het begin van de Opstand in 1568": "De Opstand is het conflict zelf. Een eigen staat komt pas als de gewesten Filips afzetten (1581)."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: waarom gaf Spanje in 1648 op?",
     "stappen": [
      "Spanje voert oorlogen op veel plaatsen in Europa",
      "Het moet zijn soldaten en geld over al die oorlogen verdelen",
      "Er blijven te weinig Spaanse soldaten over voor de Nederlanden",
      "Frederik Hendrik verovert steden als 's-Hertogenbosch en Maastricht",
      "Spanje erkent de Republiek in de Vrede van Münster"
     ],
     "w": "Veel oorlogen → verdelen → te weinig soldaten hier → Frederik Hendrik wint steden → Spanje geeft op.",
     "meer": "Merk op: de belangrijkste oorzaak (verdelen) komt vóór het succes van Frederik Hendrik. Daarom noemt het werkboek het verdelen de belangrijkste oorzaak."
    }
   ]
  }
 ]
}
);


/* ===== §5.2 Een glorieuze Gouden Eeuw ===== */
window.LEERSTOF.push(
{
 "id": "amsterdam-handel",
 "emoji": "⚓",
 "titel": "5.2.1 · Amsterdam, handelsstad van de wereld",
 "paragraaf": "§5.2",
 "kort": "Goedkoop graan erin, kaas, boter en textiel eruit. Na de val van Antwerpen wordt Amsterdam de stapelmarkt van Europa, met een wisselbank, een beurs en een nieuwe grachtengordel.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Na de vorming van de Republiek (1588) breekt de <b>Gouden Eeuw</b> aan: een <i>“periode in de Nederlandse geschiedenis waarin De Republiek een bloeiperiode kent”</i>. Vooral de gewesten <b>Holland en Zeeland</b> worden rijk. Dat komt door hun <b>handelspolitiek</b>: <i>“beleid gericht op de handel”</i>.",
    "Het begint met de bodem. In Holland en Zeeland is die te nat voor graan; mensen leefden eeuwenlang vooral van de visserij. Daarom halen ze goedkoop <b>graan uit het Oostzeegebied</b> (dat is <b>import</b>: kopen in het buitenland). De boeren hoeven dus zelf geen graan te verbouwen en maken <b>melk, kaas en boter</b>. Ambachtslieden maken <b>textiel</b>. Die producten gaan naar het buitenland: <b>export</b>, <i>“producten of diensten die aan het buitenland verkocht worden”</i>. Door die handel groeien de steden.",
    "Dan de <b>ligging</b>: open zee in het westen en rivieren naar het midden van Europa. Ideaal voor handel. In 1585 verovert Spanje Antwerpen, de grootste handelsstad van de Nederlanden. Door die <b>val van Antwerpen</b> trekken kooplieden en hun handel naar <b>Amsterdam</b>. Daar komt de nieuwe <b>stapelmarkt</b>: <i>“een plaats waar op grote schaal producten worden opgeslagen en doorverkocht”</i>. Is er veel graan, dan kopen handelaren het goedkoop in en slaan het op in hun <b>pakhuizen</b>. Komt er een tekort, dan verkopen ze het met flinke winst. Rond 1600 varen er al zo'n 10.000 schepen per jaar de haven in.",
    "Zoveel buitenlandse handelaren betekent ook zoveel soorten munten. Daarom komt er in <b>1609</b> de Amsterdamse <b>wisselbank</b>: een <i>“bank waar geld kon worden gewisseld of in bewaring kon worden gegeven”</i>. Daar wissel je vreemde munten om in de <b>Gulden Florijn</b>. Op de <b>beurs</b>, een <i>“plaats waar handelsovereenkomsten worden gesloten en aandelen worden verhandeld”</i>, investeren rijke burgers hun geld in bedrijven.",
    "Al dat werk trekt mensen aan als een magneet. De stad aan de Amstel groeit zo hard dat ze een nieuwe <b>grachtengordel</b> aanlegt: Singel, Herengracht, Keizersgracht en Prinsengracht. Een schrijver uit 1694, <b>Le Moine de l'Espine</b>, verbaast zich erover: Amsterdam heeft zelf bijna niets (geen hout, geen ijzer, zelfs te weinig graan), en juist dát gebrek dwong de inwoners om overal heen te varen. En ook buitenlandse handelaren profiteerden: zij konden hier verkopen én inkopen."
   ],
   "regel": "Graan erin (import), kaas, boter en textiel eruit (export); na de val van Antwerpen in 1585 wordt Amsterdam de stapelmarkt, met de wisselbank van 1609 en een beurs.",
   "voorbeelden": [
    {
     "en": "Import = graan uit het Oostzeegebied. Export = melk, kaas, boter en textiel.",
     "let": "Draai ze niet om: Holland had te weinig graan, dus graan kwam juist binnen."
    }
   ],
   "vragen": [
    {
     "t": "mc",
     "q": "Waarom haalden Holland en Zeeland hun graan uit het Oostzeegebied?",
     "o": [
      "hun natte bodem was niet geschikt om graan te verbouwen",
      "Spanje verbood de boeren in Holland om zelf graan te telen",
      "het graan uit het Oostzeegebied was lekkerder dan dat van hier",
      "de boeren in Holland vonden vissen leuker dan boeren"
     ],
     "a": "hun natte bodem was niet geschikt om graan te verbouwen",
     "w": "De bodem was te nat voor graan. Dus kochten ze het goedkoop in het Oostzeegebied.",
     "meer": "Dit is het begin van de hele keten: omdat graan van buiten kwam, konden de boeren zich richten op melk, kaas en boter voor de export.",
     "fout": {
      "Spanje verbood de boeren in Holland om zelf graan te telen": "Zo'n verbod was er niet. De reden zit in de natuur: de bodem was te nat.",
      "het graan uit het Oostzeegebied was lekkerder dan dat van hier": "Het ging niet om smaak maar om de bodem: hier groeide gewoon weinig graan. En het Oostzeegraan was goedkoop.",
      "de boeren in Holland vonden vissen leuker dan boeren": "Visserij was wel lang het belangrijkste werk, maar niet omdat het leuker was. De bodem was ongeschikt voor graan."
     }
    },
    {
     "t": "sleep",
     "opgave": "Ging dit product de Republiek in (import) of eruit (export)?",
     "chips": [
      {
       "t": "graan",
       "bak": "imp",
       "waarom": "Holland had zelf te weinig graan, dus dat kwam uit het Oostzeegebied."
      },
      {
       "t": "kaas",
       "bak": "exp",
       "waarom": "De boeren maakten zuivel juist om te verkopen aan het buitenland."
      },
      {
       "t": "boter",
       "bak": "exp",
       "waarom": "Net als kaas en melk: zuivel was een exportproduct."
      },
      {
       "t": "melk",
       "bak": "exp",
       "waarom": "Melk hoort bij de zuivel die de boeren voor de verre handel maakten."
      },
      {
       "t": "textiel",
       "bak": "exp",
       "waarom": "Textiel was een ambachtsproduct dat naar het buitenland werd verkocht."
      },
      {
       "t": "hout voor scheepsbouw",
       "bak": "imp",
       "waarom": "Le Moine de l'Espine schrijft dat Amsterdam zelf geen hout had om zelfs maar het kleinste schip te bouwen."
      }
     ],
     "bakjes": [
      {
       "id": "imp",
       "label": "import (naar binnen)",
       "som": "Wat Holland zelf niet had: graan, hout, ijzer."
      },
      {
       "id": "exp",
       "label": "export (naar buiten)",
       "som": "Wat Holland zelf maakte: zuivel en textiel."
      }
     ],
     "w": "Import is kopen in het buitenland, export is verkopen aan het buitenland.",
     "meer": "Ezelsbruggetje: <b>ex</b>port gaat de deur <b>uit</b> (exit). Graan is de bekendste import; kaas, boter, melk en textiel de bekendste export."
    },
    {
     "t": "gap",
     "q": "De Amsterdamse wisselbank werd opgericht in het jaar ___.",
     "a": "1609|in 1609",
     "w": "In 1609 kwam de wisselbank, omdat er zoveel buitenlandse munten de stad binnenkwamen.",
     "meer": "Handig: 1609 is ook het begin van het Twaalfjarig Bestand. Een rustig moment in de oorlog, goed voor de handel."
    },
    {
     "t": "mc",
     "q": "Wat is een stapelmarkt?",
     "o": [
      "een plaats waar op grote schaal producten worden opgeslagen en doorverkocht",
      "een bank waar handelaren vreemde munten kunnen omwisselen",
      "een gebouw waar handelaren aandelen van bedrijven kopen en verkopen",
      "een markt waar boeren elke week hun eigen kaas en boter verkopen"
     ],
     "a": "een plaats waar op grote schaal producten worden opgeslagen en doorverkocht",
     "w": "Stapelen = opslaan. Op de stapelmarkt sla je spullen op en verkoop je ze later door.",
     "meer": "Het trucje: goedkoop inkopen als er veel is, opslaan in pakhuizen, duur verkopen als er een tekort is.",
     "fout": {
      "een bank waar handelaren vreemde munten kunnen omwisselen": "Dat is de <b>wisselbank</b> (1609). Die hoort wel bij de stapelmarkt, maar is iets anders.",
      "een gebouw waar handelaren aandelen van bedrijven kopen en verkopen": "Dat is de <b>beurs</b>. Op de stapelmarkt gaat het om echte goederen in pakhuizen.",
      "een markt waar boeren elke week hun eigen kaas en boter verkopen": "Dat is een gewone weekmarkt. Een stapelmarkt is veel groter: producten uit de hele wereld worden er opgeslagen en doorverkocht."
     }
    },
    {
     "t": "mc",
     "q": "Waarom trok de handel rond 1585 naar Amsterdam?",
     "o": [
      "Antwerpen kwam in Spaanse handen",
      "Amsterdam werd toen de hoofdstad van Spanje",
      "de VOC werd toen in Amsterdam opgericht",
      "in Antwerpen brak toen de Beeldenstorm uit"
     ],
     "a": "Antwerpen kwam in Spaanse handen",
     "w": "In 1585 veroverde Spanje Antwerpen. Kooplieden vertrokken met hun geld en handel naar het noorden, vooral naar Amsterdam.",
     "meer": "Veel van die kooplieden waren protestant en wilden niet onder de katholieke Spaanse koning leven. Zo kreeg Amsterdam hun geld, hun kennis en hun handelscontacten.",
     "fout": {
      "Amsterdam werd toen de hoofdstad van Spanje": "Amsterdam lag juist in de opstandige Republiek, die tegen Spanje vocht.",
      "de VOC werd toen in Amsterdam opgericht": "Klopt niet met de tijd: de VOC kwam pas in 1602, zeventien jaar later.",
      "in Antwerpen brak toen de Beeldenstorm uit": "De Beeldenstorm was in 1566. In 1585 ging het om de verovering van Antwerpen door Spanje."
     }
    },
    {
     "t": "gap",
     "q": "Bij de wisselbank konden alle vreemde munten worden omgewisseld in de Gulden ___.",
     "a": "Florijn|florijn|Gulden Florijn",
     "w": "De Gulden Florijn was de munt waarin je bij de wisselbank je buitenlandse geld omwisselde.",
     "meer": "Zo kon een koopman uit Frankrijk of Duitsland gewoon in Amsterdam handelen. Dat maakte Amsterdam aantrekkelijk voor de hele wereld."
    },
    {
     "t": "mc",
     "q": "Wat kon een rijke burger op de Amsterdamse beurs doen?",
     "o": [
      "zijn geld investeren in een bedrijf",
      "zijn buitenlandse munten omwisselen",
      "zijn graan opslaan tot er een tekort kwam",
      "stemmen voor een nieuw stadsbestuur"
     ],
     "a": "zijn geld investeren in een bedrijf",
     "w": "Op de beurs werden handelsafspraken gemaakt en aandelen verhandeld. Zo investeerde je in een bedrijf, zoals de VOC.",
     "meer": "Zo groeide het geld in Amsterdam: wie geld had, liet het werken in de handel. Dat heet later handelskapitalisme.",
     "fout": {
      "zijn buitenlandse munten omwisselen": "Dat deed je bij de <b>wisselbank</b>, niet op de beurs.",
      "zijn graan opslaan tot er een tekort kwam": "Opslaan deed je in een <b>pakhuis</b>. Dat hoort bij de stapelmarkt.",
      "stemmen voor een nieuw stadsbestuur": "De beurs had niets met het bestuur te maken. Het was een plek voor handel en aandelen."
     }
    },
    {
     "t": "mc",
     "q": "Waarom begon Amsterdam met de aanleg van een nieuwe grachtengordel?",
     "o": [
      "de handel trok zoveel mensen aan dat de stad moest groeien",
      "de stad moest beter verdedigd worden tegen de Spaanse vloot",
      "de VOC-schepen hadden meer ruimte nodig om aan te meren",
      "het water van de Amstel moest sneller naar zee afvoeren"
     ],
     "a": "de handel trok zoveel mensen aan dat de stad moest groeien",
     "w": "Werk en welvaart trokken mensen aan als een magneet. De stad werd te klein, dus kwamen er nieuwe grachten met huizen en pakhuizen.",
     "meer": "De grachtengordel (Singel, Herengracht, Keizersgracht, Prinsengracht) staat nu op de Werelderfgoedlijst van Unesco.",
     "fout": {
      "de stad moest beter verdedigd worden tegen de Spaanse vloot": "De grachten waren geen verdedigingswerk. Ze kwamen er omdat de stad door de handel zo snel groeide.",
      "de VOC-schepen hadden meer ruimte nodig om aan te meren": "De grote zeeschepen lagen in de haven aan het IJ. De grachtengordel was vooral voor wonen en opslaan.",
      "het water van de Amstel moest sneller naar zee afvoeren": "De Amstel werd wel ingedamd voor havens en grachten, maar de reden was de groei van de stad door de handel."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Nu ga je de stof <b>toepassen</b>. Bij een bronvraag lees je eerst de vraag, dan de bron, en dan zoek je de <b>zin of het detail</b> dat je antwoord bewijst.",
    "<b>Citeren</b> betekent: de woorden uit de bron precies overnemen, tussen aanhalingstekens. Kies de zin die het meest direct bij de vraag past, niet zomaar een zin uit de buurt.",
    "Vraagt de opdracht om een voorbeeld <b>én</b> de bron? Dan heb je twee dingen nodig: iets uit de tekst (bijvoorbeeld: graan wordt goedkoop ingekocht en opgeslagen) en iets wat je <b>in de bron ziet</b> (bijvoorbeeld: een pakhuis met een hijsbalk). Eén van de twee vergeten kost je een punt.",
    "Let ook op <b>continuïteit en verandering</b>: wat is er van de Gouden Eeuw gebleven (de beurs, de grachten) en wat is verdwenen (de stapelmarkt, de Gulden Florijn)?"
   ],
   "regel": "Citeer de zin die je antwoord bewijst, en zet hem tussen aanhalingstekens.",
   "vragen": [
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Amsterdam volgens een Franse schrijver",
      "tekst": "“Toch vindt men hier zelf geen producten die het mogelijk maken het kleinste schip te timmeren of op te tuigen.”",
      "onder": "Naar: Le Moine de l'Espine, De koophandel van Amsterdam (1694)."
     },
     "q": "Welke reden om te handelen haal je uit dit citaat?",
     "o": [
      "Amsterdam moest bijna alles wat het nodig had van buiten halen",
      "Amsterdam had meer schepen dan alle andere landen van Europa samen",
      "de Amsterdammers waren slecht in het bouwen van hun eigen schepen",
      "Spanje blokkeerde de aanvoer van hout en ijzer naar de Republiek"
     ],
     "a": "Amsterdam moest bijna alles wat het nodig had van buiten halen",
     "w": "Er was hier zelf geen hout of ijzer, zelfs niet genoeg voor het kleinste schip. Dus moest het van elders komen: daarom handelden ze.",
     "meer": "Le Moine zegt verderop: juist dat gebrek spoorde de inwoners aan om overal heen te varen. Een tekort werd zo een kracht.",
     "fout": {
      "Amsterdam had meer schepen dan alle andere landen van Europa samen": "Dat staat niet in dit citaat. Bovendien schrijft Le Moine ergens anders alleen dat men 'het idee krijgt' dat er zoveel schepen zijn: dat is geen telling en ook geen reden om te handelen.",
      "de Amsterdammers waren slecht in het bouwen van hun eigen schepen": "Ze konden het wel, maar ze hadden de grondstoffen niet. Lees goed: het gaat om 'geen producten', niet om geen kunde.",
      "Spanje blokkeerde de aanvoer van hout en ijzer naar de Republiek": "Over Spanje staat niets in de bron. Haal je antwoord uit de bron zelf, niet uit je hoofd."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Spanje verovert Antwerpen (1585)",
      "De Republiek der Zeven Verenigde Nederlanden ontstaat (1588)",
      "De VOC wordt opgericht (1602)",
      "De Amsterdamse wisselbank wordt opgericht (1609)",
      "Amsterdam begint de grote uitbreiding van de grachtengordel (1613)"
     ],
     "w": "Eerst valt Antwerpen, dan ontstaat de Republiek, dan komen de VOC, de wisselbank en de nieuwe grachten.",
     "meer": "Het verhaal zit in de volgorde: door de val van Antwerpen komen handel en geld naar Amsterdam; daarna volgen de instellingen (VOC, wisselbank, beurs) en groeit de stad."
    },
    {
     "t": "sleep",
     "opgave": "Waarom werd Amsterdam zo rijk? Welk soort oorzaak is dit?",
     "chips": [
      {
       "t": "Spanje verovert Antwerpen in de oorlog",
       "bak": "pol",
       "waarom": "Een oorlog en een verovering gaan over macht en bestuur: politiek."
      },
      {
       "t": "De Zeeuwen sluiten de Schelde af, zodat Antwerpen niet meer bereikbaar is",
       "bak": "pol",
       "waarom": "Een vijandelijke stad afsluiten is een daad in een oorlog: politiek."
      },
      {
       "t": "Protestantse kooplieden vluchten uit Antwerpen voor de katholieke koning",
       "bak": "rel",
       "waarom": "Ze vertrekken vanwege hun geloof: religieus."
      },
      {
       "t": "Handelaren slaan graan op en verkopen het duur bij een tekort",
       "bak": "eco",
       "waarom": "Inkopen, opslaan en met winst verkopen gaat over geld en handel: economisch."
      },
      {
       "t": "Bij de wisselbank kun je elke munt omwisselen",
       "bak": "eco",
       "waarom": "Een bank en munten gaan over geld: economisch."
      },
      {
       "t": "Rijke burgers investeren op de beurs in bedrijven",
       "bak": "eco",
       "waarom": "Geld investeren om winst te maken is economisch."
      }
     ],
     "bakjes": [
      {
       "id": "pol",
       "label": "politiek (macht, oorlog, bestuur)",
       "som": "De oorlog met Spanje en de val van Antwerpen."
      },
      {
       "id": "rel",
       "label": "religieus (geloof)",
       "som": "Protestanten vluchten naar het noorden."
      },
      {
       "id": "eco",
       "label": "economisch (geld, handel)",
       "som": "Stapelmarkt, wisselbank en beurs."
      }
     ],
     "w": "De bloei van Amsterdam had meer soorten oorzaken: politiek, religieus en economisch.",
     "meer": "Op een toets scoor je extra als je de soort oorzaak meteen noemt: 'Een politieke oorzaak is ...'."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron B: Inwoners van Amsterdam",
      "tekst": "<table><tr><th>Jaar</th><th>Inwoners (ongeveer)</th></tr><tr><td>1580</td><td>30.000</td></tr><tr><td>1600</td><td>60.000</td></tr><tr><td>1650</td><td>175.000</td></tr></table>",
      "onder": "Eigen bewerking, afgeronde schattingen zoals historici die geven."
     },
     "q": "Welke uitleg past het best bij deze tabel en de tekst?",
     "o": [
      "de handel bood zoveel werk dat er steeds meer mensen naar de stad kwamen",
      "in Amsterdam werden na 1580 elk jaar veel meer kinderen geboren dan elders",
      "na de val van Antwerpen vertrokken juist veel mensen uit Amsterdam",
      "het aantal inwoners groeide omdat de grachtengordel al klaar lag"
     ],
     "a": "de handel bood zoveel werk dat er steeds meer mensen naar de stad kwamen",
     "w": "Tussen 1580 en 1650 wordt Amsterdam bijna zes keer zo groot. Dat komt door mensen die afkwamen op werk en welvaart.",
     "meer": "Let op de volgorde van oorzaak en gevolg: eerst de groei door de handel, dán de nieuwe grachtengordel. Niet andersom.",
     "fout": {
      "in Amsterdam werden na 1580 elk jaar veel meer kinderen geboren dan elders": "Zo snel groei je niet door geboortes. De tekst zegt dat de stad mensen aantrok 'als een magneet': ze kwamen van buiten.",
      "na de val van Antwerpen vertrokken juist veel mensen uit Amsterdam": "Omgekeerd: kooplieden trokken uit Antwerpen náár Amsterdam. Dat zie je ook aan de stijgende cijfers.",
      "het aantal inwoners groeide omdat de grachtengordel al klaar lag": "Oorzaak en gevolg zijn hier omgedraaid. De grachtengordel werd aangelegd omdat de stad al zo hard groeide."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron C: Pakhuizen aan de gracht",
      "tekst": "Op een prent van een Amsterdamse gracht zie je een rij hoge, smalle pakhuizen met grote luiken. Boven in elk pakhuis steekt een balk met een katrol naar buiten. Daarmee hijsen mannen zakken graan uit een schip op de gracht naar de zolders.",
      "onder": "Eigen beschrijving van een soort prent zoals er veel bestaan van Amsterdamse pakhuizen in de 17e eeuw."
     },
     "q": "Leg met een voorbeeld én met bron C uit hoe de stapelmarkt werkte. (3p)",
     "tip": "Drie stappen, drie punten: zeg wat er gebeurt als er véél is, wijs iets aan dat je in de bron ziet, en zeg wat er gebeurt bij een tekort.",
     "model": [
      {
       "label": "Voorbeeld: als er veel is",
       "tekst": "Als er veel graan is, kopen handelaren het goedkoop in en slaan ze het op in pakhuizen."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je pakhuizen met een hijsbalk, waarmee zakken graan naar de zolders worden gehesen."
      },
      {
       "label": "Daardoor: bij een tekort",
       "tekst": "Als er later een tekort is, verkopen ze het opgeslagen graan voor een hogere prijs. Daardoor maken ze winst."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een product als voorbeeld (bijvoorbeeld graan).",
       "woorden": [
        "graan",
        "walvistraan",
        "haring",
        "hout"
       ]
      },
      {
       "t": "Ik zeg dat het goedkoop wordt ingekocht en opgeslagen.",
       "woorden": [
        "opgesla",
        "opslaan",
        "goedkoop"
       ]
      },
      {
       "t": "Ik noem iets wat ik in de bron zie (pakhuis, hijsbalk).",
       "woorden": [
        "pakhuis",
        "pakhuizen",
        "balk",
        "katrol"
       ]
      },
      {
       "t": "Ik leg uit dat het bij een tekort duur wordt verkocht.",
       "woorden": [
        "tekort",
        "duur",
        "hogere prijs",
        "winst"
       ]
      }
     ],
     "w": "Een goed antwoord laat de hele cyclus zien: goedkoop inkopen, opslaan (bewijs uit de bron), duur verkopen bij een tekort.",
     "meer": "De veelgemaakte fout: alleen schrijven 'goederen werden opgeslagen en later verkocht'. Dan mis je waaróm het winst opleverde (tekort, hogere prijs) en het bewijs uit de bron."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Amsterdam volgens een Franse schrijver (vervolg)",
      "tekst": "“Amsterdam gaf daardoor niet alleen aan de vreemdelingen de gelegenheid om al hun goederen hier te verkopen, maar ook om andere waren in te kopen en thuisbezorgd te krijgen, tot beider groot voordeel.”",
      "onder": "Naar: Le Moine de l'Espine, De koophandel van Amsterdam (1694)."
     },
     "q": "Welke woorden uit dit citaat bewijzen het best dat zowel Amsterdam als de buitenlanders er beter van werden?",
     "o": [
      "“tot beider groot voordeel”",
      "“al hun goederen hier te verkopen”",
      "“thuisbezorgd te krijgen”",
      "“Amsterdam gaf daardoor”"
     ],
     "a": "“tot beider groot voordeel”",
     "w": "'Beider' betekent: van allebei. Dus Amsterdam én de vreemdelingen hadden er groot voordeel van.",
     "meer": "Bij citeren kies je de woorden die precies bewijzen wat de vraag vraagt. Hier vraagt de vraag naar 'allebei', en dat staat letterlijk in 'beider'.",
     "fout": {
      "“al hun goederen hier te verkopen”": "Dit gaat alleen over wat de buitenlanders deden, niet over het voordeel voor allebei.",
      "“thuisbezorgd te krijgen”": "Dit laat zien wat de buitenlanders kregen, maar niet dat Amsterdam er ook beter van werd.",
      "“Amsterdam gaf daardoor”": "Dit is het begin van de zin, maar het zegt nog niets over voordeel. Een citaat moet je antwoord bewijzen."
     }
    },
    {
     "t": "mc",
     "q": "Welk voorbeeld laat continuïteit zien: iets uit de Gouden Eeuw dat er nu nog steeds is?",
     "o": [
      "er is in Amsterdam nog steeds een beurs voor aandelen",
      "de wisselbank wisselt nog steeds munten om in Gulden Florijn",
      "Amsterdam is nog steeds de stapelmarkt van heel Europa",
      "de VOC haalt nog steeds specerijen uit Azië"
     ],
     "a": "er is in Amsterdam nog steeds een beurs voor aandelen",
     "w": "De beurs bestaat nog: in Amsterdam worden nog altijd aandelen gekocht en verkocht. Dat is continuïteit.",
     "meer": "Continuïteit = iets blijft. Verandering = iets is anders geworden. De stapelmarkt, de wisselbank en de VOC zijn verdwenen: dat is verandering.",
     "fout": {
      "de wisselbank wisselt nog steeds munten om in Gulden Florijn": "De wisselbank bestaat niet meer, en we betalen nu met de euro. Dat is juist een verandering.",
      "Amsterdam is nog steeds de stapelmarkt van heel Europa": "De stapelmarkt is verdwenen. Goederen gaan nu vooral via grote havens als Rotterdam, en meteen door naar de klant.",
      "de VOC haalt nog steeds specerijen uit Azië": "De VOC werd in 1799 opgeheven. Dit is dus geen continuïteit."
     }
    },
    {
     "t": "mc",
     "q": "Je gaat met je moeder winkelen en ziet dat een winkel in de zomer goedkoop winterjassen inslaat, ze in het magazijn bewaart en in december duur verkoopt. Op welk begrip uit de Gouden Eeuw lijkt dit het meest?",
     "o": [
      "de stapelmarkt",
      "de wisselbank",
      "de beurs",
      "het monopolie"
     ],
     "a": "de stapelmarkt",
     "w": "Goedkoop inkopen als er genoeg is, opslaan, en duur verkopen als de vraag groot is: precies de stapelmarkt.",
     "meer": "Het magazijn van de winkel is het pakhuis van toen. Handig om te onthouden: stapelen in de zomer, verkopen in de winter.",
     "fout": {
      "de wisselbank": "Bij de wisselbank ruil je munten om. Hier gaat het om spullen opslaan en later duur verkopen.",
      "de beurs": "Op de beurs koop je aandelen in een bedrijf. De winkel slaat echte jassen op: dat is de stapelmarkt.",
      "het monopolie": "Een monopolie betekent dat er maar één verkoper is. Daar zegt dit voorbeeld niets over."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij Goud schrijf je een <b>verklaring in stappen</b>. Zet elke stap op een eigen regel, en verbind de stappen met <b>daardoor</b> of <b>waardoor</b>. Zo ziet de nakijker meteen dat je het verband snapt.",
    "Begin met de <b>soort oorzaak</b> als de vraag daarom vraagt (politiek, economisch, religieus, sociaal). Daarna: wat gebeurde er, wat was het gevolg, en wat was daar weer het gevolg?",
    "Bij een onbekende bron bewijs je met iets wat je <b>in de bron zelf</b> leest of ziet. Het onderschrift (wie, wanneer) helpt je de bron te plaatsen, maar is geen bewijs voor wat er in de bron gebeurt.",
    "Het <b>kenmerkend aspect</b> van deze paragraaf heeft drie delen: <b>wereldwijde handelscontacten</b> (met wie handel je), <b>handelskapitalisme</b> (geld investeren om winst te maken: beurs, aandelen, wisselbank) en het <b>begin van een wereldeconomie</b> (de hele wereld raakt via de handel met elkaar verbonden)."
   ],
   "regel": "Een verklaring schrijf je in stappen, elke stap op een eigen regel, verbonden met 'daardoor'.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "bron": {
      "titel": "Bron D: Een Antwerpse koopman",
      "tekst": "“Sinds de Spanjaarden de stad hebben, houden de Zeeuwen de Schelde dicht. Er komt geen schip meer binnen. Ik verhuis met mijn geld en mijn klanten naar Amsterdam.”",
      "onder": "Eigen bewerking, zoals een protestantse koopman uit Antwerpen het in 1586 zou kunnen schrijven."
     },
     "q": "Leg in stappen uit hoe de val van Antwerpen Amsterdam rijk maakte. Gebruik bron D. (3p)",
     "tip": "Begin met de soort oorzaak en wat er gebeurde. Zet elke stap op een eigen regel met 'daardoor'. Citeer de zin uit de bron die laat zien dat de koopman vertrekt.",
     "model": [
      {
       "label": "Soort oorzaak en wat er gebeurde",
       "tekst": "Een politieke oorzaak: in 1585 veroverde Spanje Antwerpen, en de Zeeuwen sloten de Schelde af."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor konden kooplieden in Antwerpen geen handel meer drijven en vertrokken ze met hun geld en contacten naar Amsterdam."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat: “Ik verhuis met mijn geld en mijn klanten naar Amsterdam.”"
      },
      {
       "label": "Daardoor (gevolg)",
       "tekst": "Daardoor werd Amsterdam de nieuwe stapelmarkt en werd de stad rijk."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de soort oorzaak (politiek).",
       "woorden": [
        "politiek"
       ]
      },
      {
       "t": "Ik noem de val van Antwerpen (1585) door Spanje.",
       "woorden": [
        "antwerpen",
        "1585",
        "spanje",
        "spanjaard"
       ]
      },
      {
       "t": "Ik verbind de stappen met 'daardoor' of 'waardoor'.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      },
      {
       "t": "Ik citeer uit de bron, tussen aanhalingstekens.",
       "woorden": [
        "verhuis"
       ]
      },
      {
       "t": "Ik eindig met de stapelmarkt of de rijkdom van Amsterdam.",
       "woorden": [
        "stapelmarkt",
        "rijk"
       ]
      }
     ],
     "w": "Oorzaak (val van Antwerpen), tussenstap (kooplieden vertrekken), bewijs uit de bron, gevolg (Amsterdam stapelmarkt).",
     "meer": "Veelgemaakte fout: alleen schrijven 'door de val van Antwerpen werd Amsterdam rijk'. Dan sla je de tussenstap over: wáárom werd het rijk? Omdat de kooplieden met hun geld en handel verhuisden."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg uit dat Amsterdam in de Gouden Eeuw een voorbeeld is van het kenmerkend aspect 'wereldwijde handelscontacten, handelskapitalisme en het begin van een wereldeconomie'. Laat alle drie de delen terugkomen, elk met een voorbeeld. (3p)",
     "tip": "Maak van elk deel van het kenmerkend aspect een eigen regel, en noem het deel er met naam bij. Eén voorbeeld per deel is genoeg.",
     "model": [
      {
       "label": "Wereldwijde handelscontacten",
       "tekst": "Amsterdam handelt met de hele wereld: graan uit het Oostzeegebied, specerijen uit Azië via de VOC en suiker en koffie uit Amerika via de WIC."
      },
      {
       "label": "Handelskapitalisme",
       "tekst": "Op de beurs kopen rijke burgers aandelen om winst te maken, en bij de wisselbank kan elke munt worden omgewisseld. Zo wordt geld geïnvesteerd om meer geld te verdienen."
      },
      {
       "label": "Begin van een wereldeconomie",
       "tekst": "Op de stapelmarkt worden producten uit alle werelddelen opgeslagen en doorverkocht naar andere landen. Daardoor raakt de hele wereld via de handel met elkaar verbonden."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem handelscontacten met minstens twee verre gebieden.",
       "woorden": [
        "oostzee",
        "azi",
        "amerika",
        "afrika",
        "indi"
       ]
      },
      {
       "t": "Ik noem het begrip handelskapitalisme met beurs, aandelen of wisselbank.",
       "woorden": [
        "kapitalisme",
        "beurs",
        "aandel",
        "wisselbank"
       ]
      },
      {
       "t": "Ik noem het begrip wereldeconomie en leg uit dat de wereld verbonden raakt.",
       "woorden": [
        "wereldeconomie",
        "verbonden",
        "doorverk"
       ]
      },
      {
       "t": "Elk deel staat op een eigen regel.",
       "woorden": []
      }
     ],
     "w": "Drie delen, drie regels, elk met een concreet voorbeeld. Het begrip zelf noem je erbij.",
     "meer": "De valkuil: één zin als 'De Republiek handelde wereldwijd en zo ontstond een wereldeconomie'. Daarin mis je het handelskapitalisme en de voorbeelden, dus scoor je hooguit één van de drie punten."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron A: Amsterdam volgens een Franse schrijver",
      "tekst": "“Sommigen verwonderen er zich over, dat er in zo'n klein land zulke grote koophandel wordt gedreven. Zoals er nergens in de wereld is, noch geweest is.”",
      "onder": "Naar: Le Moine de l'Espine, De koophandel van Amsterdam (1694)."
     },
     "q": "Wat zeggen deze zinnen over hoe de maker naar de handel van Amsterdam kijkt?",
     "o": [
      "hij kijkt er met grote bewondering naar",
      "hij vindt dat Amsterdam te veel van het buitenland afhangt",
      "hij is jaloers en vindt de Amsterdammers te rijk",
      "hij is neutraal en geeft alleen cijfers over de handel"
     ],
     "a": "hij kijkt er met grote bewondering naar",
     "w": "'Zoals er nergens in de wereld is, noch geweest is': dat is een groot compliment. De maker is vol bewondering.",
     "meer": "Zo bepaal je hoe een maker ergens tegenover staat: zoek naar woorden die iets groter, mooier of slechter maken. Hier: 'verwonderen', 'zulke grote', 'nergens in de wereld'.",
     "fout": {
      "hij vindt dat Amsterdam te veel van het buitenland afhangt": "Hij noemt elders wel dat Amsterdam alles van buiten haalt, maar hij ziet dat juist als de kracht van de stad, niet als probleem.",
      "hij is jaloers en vindt de Amsterdammers te rijk": "Er staat geen enkel negatief woord in. 'Verwonderen' en 'nergens in de wereld' zijn woorden van bewondering.",
      "hij is neutraal en geeft alleen cijfers over de handel": "Er staan geen cijfers in. En wie schrijft dat iets 'nergens in de wereld' zo is, is niet neutraal."
     }
    },
    {
     "t": "mc",
     "q": "Bij welk deel van het kenmerkend aspect past de Amsterdamse wisselbank het best?",
     "o": [
      "handelskapitalisme",
      "wereldwijde handelscontacten",
      "het begin van een wereldeconomie",
      "de opkomst van steden en burgers"
     ],
     "a": "handelskapitalisme",
     "w": "De wisselbank, de beurs en aandelen gaan over geld laten werken om winst te maken. Dat is handelskapitalisme.",
     "meer": "Ezelsbrug: <b>contacten</b> = met wie handel je; <b>kapitalisme</b> = wat doe je met je geld; <b>wereldeconomie</b> = hoe raakt de hele wereld verbonden.",
     "fout": {
      "wereldwijde handelscontacten": "Daarbij gaat het om de gebieden waarmee je handelt, zoals het Oostzeegebied en Azië. De wisselbank is een geldinstelling: kapitalisme.",
      "het begin van een wereldeconomie": "Dat gaat over de hele wereld die via de handel verbonden raakt. De wisselbank zelf is een instelling voor geld, dus kapitalisme.",
      "de opkomst van steden en burgers": "Dat is een kenmerkend aspect uit de middeleeuwen, niet uit deze paragraaf."
     }
    },
    {
     "t": "mc",
     "q": "Welke gebeurtenis is een indirect gevolg van de val van Antwerpen (1585)?",
     "o": [
      "Amsterdam legt een nieuwe grachtengordel aan",
      "kooplieden vertrekken uit Antwerpen naar het noorden",
      "de Zeeuwen sluiten de Schelde voor Antwerpen af",
      "Spaanse soldaten nemen de stad Antwerpen over"
     ],
     "a": "Amsterdam legt een nieuwe grachtengordel aan",
     "w": "Daar zitten stappen tussen: Antwerpen valt, kooplieden komen naar Amsterdam, de stad groeit, en pas dan komt de grachtengordel. Dus indirect.",
     "meer": "Direct gevolg = meteen, zonder tussenstap. Indirect gevolg = via een of meer tussenstappen. Tel de stappen: hoe meer tussenstappen, hoe indirecter.",
     "fout": {
      "kooplieden vertrekken uit Antwerpen naar het noorden": "Dat gebeurt meteen na de val, zonder tussenstap: een direct gevolg.",
      "de Zeeuwen sluiten de Schelde voor Antwerpen af": "Dat hoort direct bij de val zelf: de vijand houdt de haven dicht. Direct gevolg.",
      "Spaanse soldaten nemen de stad Antwerpen over": "Dat is de val van Antwerpen zelf, geen gevolg ervan."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de verklaring in de goede volgorde: hoe werden Holland en Zeeland rijk?",
     "stappen": [
      "De natte bodem is niet geschikt om graan te verbouwen.",
      "Holland en Zeeland kopen goedkoop graan in het Oostzeegebied.",
      "Daardoor hoeven de boeren zelf geen graan te verbouwen.",
      "Ze maken melk, kaas en boter, en ambachtslieden maken textiel.",
      "Die producten worden aan het buitenland verkocht.",
      "Daardoor worden Holland en Zeeland rijk en groeien de steden."
     ],
     "w": "Van de bodem naar de rijkdom, in zes stappen. Elke stap volgt uit de vorige.",
     "meer": "Zo schrijf je ook een verklaring op de toets: elke stap op een eigen regel, en het woord 'daardoor' laat zien dat de ene stap de volgende veroorzaakt."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron E: De beurs van Amsterdam",
      "tekst": "Op een schilderij zie je een grote binnenplaats met zuilengangen. Overal staan mannen in groepjes te praten en te onderhandelen. De meesten dragen zwarte Hollandse kleding, maar tussen hen lopen ook kooplieden in buitenlandse kleding.",
      "onder": "Eigen beschrijving van een schilderij zoals Emanuel de Witte de binnenplaats van de Amsterdamse beurs schilderde (1653)."
     },
     "q": "Je wilt met deze bron bewijzen dat Amsterdam handelaren van heinde en ver aantrok. Welk bewijs gebruik je?",
     "o": [
      "kooplieden in buitenlandse kleding",
      "het jaartal 1653 dat in het onderschrift staat",
      "de naam van de schilder, Emanuel de Witte",
      "de zuilengangen rond de grote binnenplaats"
     ],
     "a": "kooplieden in buitenlandse kleding",
     "w": "Dat zie je in de bron zelf: buitenlanders handelen mee op de Amsterdamse beurs.",
     "meer": "Bewijs haal je uit wat je in de bron ziet of leest, niet uit het onderschrift. Het onderschrift vertelt wie en wanneer, maar niet wat er gebeurt.",
     "fout": {
      "het jaartal 1653 dat in het onderschrift staat": "Dat staat in het onderschrift, niet in de bron. En een jaartal bewijst niet dat er buitenlanders waren.",
      "de naam van de schilder, Emanuel de Witte": "De maker vertelt je niets over wie er op de beurs handelden. Ook dat komt uit het onderschrift.",
      "de zuilengangen rond de grote binnenplaats": "Dat staat wel in de bron, maar het zegt iets over het gebouw, niet over waar de handelaren vandaan kwamen."
     }
    }
   ]
  }
 ]
},
{
 "id": "voc",
 "emoji": "⛵",
 "titel": "5.2.2 · De VOC: specerijen uit het oosten",
 "paragraaf": "§5.2",
 "kort": "In 1602 voegen de compagnieën zich samen tot de VOC, met een monopolie in Azië en het recht om oorlog te voeren. Aandelen verdelen het risico; Coen maakt de VOC met geweld de baas in Indonesië.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In de zestiende eeuw handelen bijna alleen de <b>Portugezen</b> met <b>Oost-Indië</b> (het huidige Indonesië en omgeving). Daar komen de <b>specerijen</b> vandaan: peper, nootmuskaat, kruidnagel. Maar Portugal hoort op dat moment bij het Spaanse koninkrijk, en met Spanje is de Republiek in oorlog. Holland en Zeeland willen niet dat Spanje rijk wordt van die handel, en ze willen zelf rijker worden. Dus varen ze zelf naar het oosten.",
    "Allerlei kleine <b>compagnieën</b> (<i>“handelsorganisatie”</i>) sturen schepen, maar die concurreren met elkaar en komen vaak halfvol terug. Landsadvocaat <b>Johan van Oldenbarnevelt</b> (het werkboek noemt hem in 5.2 raadpensionaris) besluit: samenwerken! In <b>1602</b> wordt de <b>VOC</b> opgericht, de <i>“Verenigde Oost-Indische Compagnie”</i>. Die krijgt het <b>monopolie</b> (<i>“marktsituatie waarin er maar één aanbieder van een bepaald product is”</i>) op de handel in Azië. Ook mag de VOC uit naam van de Republiek <b>oorlog voeren</b> en <b>verdragen sluiten</b>.",
    "De reis is gevaarlijk: <b>Portugese forten</b> langs de Afrikaanse kust, <b>stormen</b> en <b>schipbreuk</b>, of juist lange <b>windstilte</b>. Dan raken eten en water op en worden mannen ziek, bijvoorbeeld van scheurbuik. Het schip de Batavia verging in 1629 voor de kust van Australië. Om dat risico te verdelen verkoopt de VOC <b>aandelen</b>: een <i>“waardepapier dat de eigenaar rechten geeft in een bedrijf of handelsorganisatie”</i>. Aandeelhouders leggen geld in en krijgen een deel van de winst. De VOC is het eerste bedrijf dat zo werkt: de eerste <b>Naamloze Vennootschap</b>. Bij de start werd het geld voor tien jaar ingelegd.",
    "De belangrijkste vestiging is <b>Batavia</b> op het eiland Java (nu Jakarta). Er zijn ook handelsposten in Zuid-Afrika, India en China. Met vestigingen in meerdere landen is de VOC een <b>multinational</b>: een <i>“bedrijf dat vestigingen heeft in meerdere landen”</i>. Onder leiding van <b>Jan Pieterszoon Coen</b> wordt de VOC met geweld de baas over de Indonesische eilanden, en de bevolking wordt onderdrukt. Toch wordt hij in 1617 benoemd tot gouverneur-generaal.",
    "In een tabel met <b>uitgaven en inkomsten</b> reken je de winst zo uit: <b>inkomsten min uitgaven</b>. Is de uitkomst negatief, dan is het verlies. De meeste winst maakt de VOC tussen 1640 en 1680; in 1648 is de oorlog met Spanje voorbij."
   ],
   "regel": "VOC = 1602, het oosten, specerijen, monopolie in Azië, mocht oorlog voeren en verdragen sluiten, en werkte met aandelen.",
   "voorbeelden": [
    {
     "en": "Winst = inkomsten min uitgaven. 46.700.000 min 33.800.000 = 12.900.000 winst.",
     "let": "Zijn de uitgaven groter dan de inkomsten? Dan is het verlies."
    }
   ],
   "vragen": [
    {
     "t": "gap",
     "q": "De VOC werd opgericht in het jaar ___.",
     "a": "1602|in 1602",
     "w": "In 1602 voegden de losse compagnieën zich samen tot de VOC.",
     "meer": "Niet verwarren: de VOC (oost) is van 1602, de WIC (west) van 1621."
    },
    {
     "t": "mc",
     "q": "Waar staat de afkorting VOC voor?",
     "o": [
      "Verenigde Oost-Indische Compagnie",
      "Vereniging van Oost-Indische Kooplieden",
      "Verenigde Oranje Compagnie",
      "Vrije Oost-Indische Compagnie"
     ],
     "a": "Verenigde Oost-Indische Compagnie",
     "w": "Verenigd, omdat de losse compagnieën samengingen. Oost-Indisch, omdat ze naar het oosten voeren.",
     "meer": "Het woord 'Verenigde' is belangrijk: het vertelt meteen waaróm de VOC werd opgericht, namelijk om de concurrentie tussen de losse compagnieën te stoppen.",
     "fout": {
      "Vereniging van Oost-Indische Kooplieden": "De C staat voor Compagnie, een handelsorganisatie. En het woord is 'Verenigde': de compagnieën gingen samen.",
      "Verenigde Oranje Compagnie": "De O staat voor Oost-Indische, niet voor Oranje. De VOC voer naar Oost-Indië.",
      "Vrije Oost-Indische Compagnie": "De V staat voor Verenigde. De VOC was juist het samengaan van de losse compagnieën."
     }
    },
    {
     "t": "mc",
     "q": "Wie besloot dat de losse compagnieën moesten samenwerken in de VOC?",
     "o": [
      "Johan van Oldenbarnevelt",
      "gouverneur-generaal Jan Pieterszoon Coen",
      "admiraal Piet Hein",
      "stadhouder Willem van Oranje"
     ],
     "a": "Johan van Oldenbarnevelt",
     "w": "Van Oldenbarnevelt zag dat samenwerken meer winst opleverde en sterker stond tegen Spanje.",
     "meer": "Houd de personen uit elkaar: Van Oldenbarnevelt richt de VOC op (in de Republiek), Coen bestuurt haar later in Azië, en Piet Hein werkt voor de WIC.",
     "fout": {
      "gouverneur-generaal Jan Pieterszoon Coen": "Coen kwam later en bestuurde de VOC in Azië. Hij richtte haar niet op.",
      "admiraal Piet Hein": "Piet Hein werkte voor de WIC, in het westen. Hij is bekend van de zilvervloot in 1628.",
      "stadhouder Willem van Oranje": "Willem van Oranje werd al in 1584 vermoord, achttien jaar voor de oprichting van de VOC."
     }
    },
    {
     "t": "mc",
     "q": "De VOC had een monopolie op de handel in Azië. Wat betekent dat?",
     "o": [
      "alleen de VOC uit de Republiek mocht er handelen",
      "de VOC mocht in Azië alles kopen zonder te betalen",
      "de VOC was het grootste bedrijf ter wereld",
      "de VOC deelde de handel eerlijk met andere landen"
     ],
     "a": "alleen de VOC uit de Republiek mocht er handelen",
     "w": "Monopolie: er is maar één aanbieder. Geen andere Nederlandse handelaar mocht de VOC beconcurreren in Azië.",
     "meer": "Daarom vond het werkboek het monopolie het belangrijkste voorrecht: zonder concurrentie kon de VOC de prijzen bepalen.",
     "fout": {
      "de VOC mocht in Azië alles kopen zonder te betalen": "Een monopolie gaat over het alleenrecht om te handelen, niet over gratis spullen.",
      "de VOC was het grootste bedrijf ter wereld": "Misschien was dat zo, maar dat is niet wat monopolie betekent. Monopolie = de enige aanbieder.",
      "de VOC deelde de handel eerlijk met andere landen": "Juist niet: een monopolie betekent dat je de handel voor jezelf houdt."
     }
    },
    {
     "t": "gap",
     "q": "De belangrijkste vestiging van de VOC lag op het eiland Java en heette ___.",
     "a": "Batavia",
     "w": "Batavia was het hoofdkwartier van de VOC in Azië.",
     "meer": "Batavia heet nu Jakarta en is de hoofdstad van Indonesië. Coen bouwde de stad naar het voorbeeld van zijn eigen geboortestad Hoorn."
    },
    {
     "t": "mc",
     "q": "Waarom verkocht de VOC aandelen aan investeerders van buiten?",
     "o": [
      "om het risico van de reizen over veel mensen te verdelen",
      "omdat de Staten-Generaal de VOC verbood om winst te houden",
      "zodat de investeerders zelf mee konden varen naar Azië",
      "omdat de VOC al rijk genoeg was en geld wilde weggeven"
     ],
     "a": "om het risico van de reizen over veel mensen te verdelen",
     "w": "Een schip kon zomaar vergaan. Door veel investeerders te laten meebetalen, droeg niemand het hele risico alleen.",
     "meer": "In ruil kregen de aandeelhouders een deel van de winst. Dat maakte de VOC de eerste Naamloze Vennootschap ter wereld.",
     "fout": {
      "omdat de Staten-Generaal de VOC verbood om winst te houden": "Zo'n verbod was er niet. De winst ging juist voor een deel naar de aandeelhouders, omdat zij geld hadden ingelegd.",
      "zodat de investeerders zelf mee konden varen naar Azië": "Aandeelhouders bleven gewoon thuis. Ze leverden geld, geen bemanning.",
      "omdat de VOC al rijk genoeg was en geld wilde weggeven": "Omgekeerd: de VOC had geld nódig om schepen uit te rusten. Aandelen brachten dat geld binnen."
     }
    },
    {
     "t": "sleep",
     "opgave": "Wie is wie? Hoort dit bij Johan van Oldenbarnevelt of bij Jan Pieterszoon Coen?",
     "chips": [
      {
       "t": "landsadvocaat van Holland",
       "bak": "old",
       "waarom": "Van Oldenbarnevelt was de hoogste ambtenaar van Holland, een politicus in de Republiek."
      },
      {
       "t": "liet de losse compagnieën samengaan in de VOC (1602)",
       "bak": "old",
       "waarom": "Hij besloot dat samenwerken meer winst en meer kracht tegen Spanje gaf."
      },
      {
       "t": "werkte in de Republiek zelf, niet in Azië",
       "bak": "old",
       "waarom": "Van Oldenbarnevelt bleef in de Republiek; de VOC-reizen maakte hij niet mee."
      },
      {
       "t": "gouverneur-generaal van de VOC in Azië",
       "bak": "coen",
       "waarom": "Coen werd in 1617 benoemd tot gouverneur-generaal."
      },
      {
       "t": "maakte Batavia tot hoofdkwartier van de VOC",
       "bak": "coen",
       "waarom": "Coen bouwde Batavia op Java, naar het voorbeeld van Hoorn."
      },
      {
       "t": "maakte de VOC met geweld de baas over de Indonesische eilanden",
       "bak": "coen",
       "waarom": "Onder Coen werd de Indonesische bevolking met geweld onderdrukt."
      }
     ],
     "bakjes": [
      {
       "id": "old",
       "label": "Johan van Oldenbarnevelt",
       "som": "De politicus die de VOC oprichtte."
      },
      {
       "id": "coen",
       "label": "Jan Pieterszoon Coen",
       "som": "De bestuurder van de VOC in Azië."
      }
     ],
     "w": "Van Oldenbarnevelt richt de VOC op in de Republiek; Coen maakt haar met geweld machtig in Azië.",
     "meer": "Ezelsbrug: Van <b>Old</b>enbarnevelt zit aan het begin (de oprichting), Coen zit ver weg in Azië."
    },
    {
     "t": "mc",
     "q": "Welk gevaar hoorde NIET bij de reis naar Oost-Indië?",
     "o": [
      "aanvallen van Indiaanse stammen in Noord-Amerika",
      "vijandige Portugese forten langs de kust van Afrika",
      "lange windstilte waardoor eten en water opraakten",
      "zware stormen waardoor schepen vergingen"
     ],
     "a": "aanvallen van Indiaanse stammen in Noord-Amerika",
     "w": "Noord-Amerika ligt in het westen. De VOC voer om Afrika heen naar het oosten, dus daar kwam ze niet.",
     "meer": "De echte gevaren: Portugese forten, stormen en schipbreuk, windstilte met honger, dorst en ziekte (scheurbuik).",
     "fout": {
      "vijandige Portugese forten langs de kust van Afrika": "Dit was wél een gevaar: de schepen voeren langs de Afrikaanse kust, waar Portugese forten lagen.",
      "lange windstilte waardoor eten en water opraakten": "Dit was wél een gevaar: bij windstilte duurde de reis langer en raakte de voorraad op.",
      "zware stormen waardoor schepen vergingen": "Dit was wél een gevaar: de Batavia verging in 1629 voor de kust van Australië."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Een <b>tabel</b> lees je als een bron: kijk eerst naar de kopjes (wat staat er in elke kolom, in welke eenheid?) en reken dan pas. Winst = inkomsten min uitgaven.",
    "Een bron uit de tijd zelf (een brief, een dagboek, een aandeel) laat zien hoe mensen toen dachten. Zoek de zin die bij de vraag past en citeer hem.",
    "Bij <b>toen en nu</b> vergelijk je: wat is hetzelfde (een overeenkomst) en wat is anders (een verschil)? De VOC lijkt op een multinational van nu, maar er is één groot verschil: de VOC mocht zelf oorlog voeren."
   ],
   "regel": "Winst = inkomsten min uitgaven; is het negatief, dan heet het verlies.",
   "vragen": [
    {
     "t": "mc",
     "bron": {
      "titel": "Bron F: Uitgaven en inkomsten van de VOC (in guldens)",
      "tekst": "<table><tr><th>Periode</th><th>Uitgaven</th><th>Inkomsten</th></tr><tr><td>1620-1640</td><td>33.800.000</td><td>46.700.000</td></tr><tr><td>1640-1680</td><td>423.000.000</td><td>530.000.000</td></tr><tr><td>1680-1730</td><td>907.300.000</td><td>960.200.000</td></tr><tr><td>1730-1780</td><td>1.272.900.000</td><td>1.234.300.000</td></tr><tr><td>1780-1790</td><td>187.100.000</td><td>111.200.000</td></tr></table>",
      "onder": "Naar: gegevens over de VOC zoals het werkboek ze geeft."
     },
     "q": "Hoeveel winst of verlies maakte de VOC in de periode 1620-1640?",
     "o": [
      "12.900.000 gulden winst",
      "12.900.000 gulden verlies",
      "46.700.000 gulden winst",
      "80.500.000 gulden winst"
     ],
     "a": "12.900.000 gulden winst",
     "w": "46.700.000 min 33.800.000 = 12.900.000. De inkomsten zijn groter, dus winst.",
     "meer": "Altijd: inkomsten min uitgaven. Positief = winst, negatief = verlies.",
     "fout": {
      "12.900.000 gulden verlies": "Het bedrag klopt, maar de inkomsten zijn hier groter dan de uitgaven. Dan is het winst.",
      "46.700.000 gulden winst": "Dat zijn alleen de inkomsten. Je moet de uitgaven er nog vanaf halen.",
      "80.500.000 gulden winst": "Je hebt de bedragen opgeteld. Winst is inkomsten mín uitgaven."
     }
    },
    {
     "t": "gap",
     "bron": {
      "titel": "Bron F: Uitgaven en inkomsten van de VOC (in guldens)",
      "tekst": "<table><tr><th>Periode</th><th>Uitgaven</th><th>Inkomsten</th></tr><tr><td>1730-1780</td><td>1.272.900.000</td><td>1.234.300.000</td></tr></table>",
      "onder": "Naar: gegevens over de VOC zoals het werkboek ze geeft."
     },
     "q": "In de periode 1730-1780 maakte de VOC een verlies van ___ gulden.",
     "a": "38.600.000|38.600.000 gulden|38,6 miljoen|38600000|38.6 miljoen",
     "w": "1.234.300.000 min 1.272.900.000 = min 38.600.000. De uitgaven zijn groter, dus verlies.",
     "meer": "Let op: in deze periode zijn de inkomsten de hoogste van de hele tabel, en toch is er verlies. Grote bedragen betekenen niet automatisch winst."
    },
    {
     "t": "mc",
     "q": "In welke periode maakte de VOC de meeste winst, en waarom?",
     "o": [
      "1640-1680, omdat de oorlog met Spanje in 1648 voorbij was",
      "1730-1780, omdat de bedragen toen het hoogst waren",
      "1620-1640, omdat het Twaalfjarig Bestand toen voor rust zorgde",
      "1680-1730, omdat de VOC toen pas haar monopolie kreeg"
     ],
     "a": "1640-1680, omdat de oorlog met Spanje in 1648 voorbij was",
     "w": "530.000.000 min 423.000.000 = 107.000.000 winst, de hoogste van de tabel. Na de vrede van 1648 kon de VOC veel makkelijker handelen.",
     "meer": "Een verklaring koppel je aan iets wat in die tijd gebeurde. Hier: het einde van de oorlog met Spanje.",
     "fout": {
      "1730-1780, omdat de bedragen toen het hoogst waren": "Hoge bedragen zijn geen winst. In die periode waren de uitgaven groter dan de inkomsten: verlies.",
      "1620-1640, omdat het Twaalfjarig Bestand toen voor rust zorgde": "Het Bestand liep van 1609 tot 1621. Juist in 1621 begon de oorlog weer. En de winst was toen 'maar' 12,9 miljoen.",
      "1680-1730, omdat de VOC toen pas haar monopolie kreeg": "Het monopolie kreeg de VOC al bij de oprichting in 1602. En de winst was in deze periode lager dan tussen 1640 en 1680."
     }
    },
    {
     "t": "sequence",
     "q": "Zet de oprichting van de VOC in de goede volgorde.",
     "stappen": [
      "Holland en Zeeland willen zelf specerijen uit Oost-Indië halen.",
      "Losse compagnieën sturen schepen, maar ze beconcurreren elkaar.",
      "Van Oldenbarnevelt laat de compagnieën samengaan.",
      "De VOC wordt opgericht en krijgt het monopolie in Azië (1602).",
      "Investeerders kopen aandelen en de schepen vertrekken.",
      "Aandeelhouders krijgen een deel van de winst."
     ],
     "w": "Eerst het plan, dan de losse compagnieën, dan het samengaan, de VOC, het geld van investeerders en ten slotte de winst.",
     "meer": "Logisch nadenken helpt: winst uitkeren kan pas als er geld is ingelegd en schepen zijn teruggekomen."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron G: Het oudste VOC-aandeel",
      "tekst": "Een vel papier uit 1606, met de hand geschreven. Er staat op dat een inwoner van Enkhuizen een bedrag in de VOC heeft ingelegd, hoeveel hij al betaald heeft, en dat hij daarmee recht heeft op zijn deel van wat de Compagnie verdient.",
      "onder": "Eigen beschrijving naar het oudst bewaarde VOC-aandeel (1606), Westfries Archief in Hoorn."
     },
     "q": "Leg uit waarom de VOC aandelen verkocht. Gebruik het woord risico en iets wat je in bron G ziet. (3p)",
     "tip": "Begin bij het probleem (de gevaarlijke reis), zeg dan wat aandelen oplosten, en wijs als laatste iets aan in de bron.",
     "model": [
      {
       "label": "Het probleem",
       "tekst": "De reis naar Oost-Indië was gevaarlijk: een schip kon vergaan. Investeren in een schip was dus een groot risico."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor verkocht de VOC aandelen, zodat het risico over veel mensen werd verdeeld."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat iemand geld heeft ingelegd en daarmee recht heeft op een deel van wat de Compagnie verdient. In ruil voor zijn geld kreeg hij dus een deel van de winst."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een gevaar van de reis.",
       "woorden": [
        "gevaar",
        "vergaan",
        "storm",
        "schipbreuk",
        "fort",
        "windstilte"
       ]
      },
      {
       "t": "Ik gebruik het woord risico.",
       "woorden": [
        "risico"
       ]
      },
      {
       "t": "Ik leg uit dat het risico verdeeld werd over veel mensen.",
       "woorden": [
        "verdeel",
        "verdeeld",
        "veel mensen",
        "investeerder"
       ]
      },
      {
       "t": "Ik noem iets uit de bron: ingelegd geld en recht op winst.",
       "woorden": [
        "ingelegd",
        "inleg",
        "winst"
       ]
      }
     ],
     "w": "Probleem (risico), oplossing (aandelen verdelen het risico), bewijs uit de bron (inleg in ruil voor winst).",
     "meer": "Veelgemaakte fout: alleen schrijven 'om geld te verdienen'. Dan mis je het risico, en dat is juist de kern van waarom aandelen werden uitgevonden."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron H: Een kleermaker meldt zich bij de VOC",
      "tekst": "“Mijn hart begon direct van opwinding te bonken, want ik waande me al een rijk man, hoewel ik niet eens was aangemonsterd.”",
      "onder": "Naar: Jörg Franz Müller, een kleermaker uit de Elzas, over zijn aanmelding bij de VOC in Amsterdam (1669)."
     },
     "q": "Wat vertelt dit citaat over waarom mannen bij de VOC gingen werken?",
     "o": [
      "ze hoopten er rijk van te worden",
      "ze werden door de VOC gedwongen",
      "ze wilden het christendom verspreiden",
      "ze hadden thuis geen familie meer"
     ],
     "a": "ze hoopten er rijk van te worden",
     "w": "'Ik waande me al een rijk man': Müller droomt al van rijkdom, terwijl hij nog niet eens is aangenomen.",
     "meer": "Let op het woord 'waande': hij dácht dat hij rijk zou worden. Het citaat zegt niets over of dat ook echt gebeurde.",
     "fout": {
      "ze werden door de VOC gedwongen": "Müller meldt zich vrijwillig aan, en zijn hart bonkt van opwinding. Dat is geen dwang.",
      "ze wilden het christendom verspreiden": "Daar staat niets over in de bron. Hij denkt alleen aan rijk worden.",
      "ze hadden thuis geen familie meer": "Over zijn familie zegt het citaat niets. Antwoord met wat er in de bron staat."
     }
    },
    {
     "t": "mc",
     "q": "De VOC wordt vaak de eerste multinational genoemd. Wat is een verschil tussen de VOC en een multinational van nu, zoals Shell of Philips?",
     "o": [
      "de VOC mocht zelf oorlog voeren",
      "de VOC had vestigingen in meerdere landen",
      "de VOC verkocht aandelen aan investeerders",
      "de VOC wilde zoveel mogelijk winst maken"
     ],
     "a": "de VOC mocht zelf oorlog voeren",
     "w": "Een bedrijf van nu mag geen leger hebben of oorlog voeren. De VOC kreeg dat recht van de Republiek. Dat is het grote verschil.",
     "meer": "De andere drie zijn juist overeenkomsten: vestigingen in meerdere landen, aandelen en winst maken doen multinationals nu nog steeds.",
     "fout": {
      "de VOC had vestigingen in meerdere landen": "Dat is een overeenkomst: precies daarom heet de VOC een multinational.",
      "de VOC verkocht aandelen aan investeerders": "Dat is een overeenkomst: grote bedrijven verkopen nu ook aandelen op de beurs.",
      "de VOC wilde zoveel mogelijk winst maken": "Ook een overeenkomst: elk bedrijf wil winst maken."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron I: Uit een scheepsjournaal",
      "tekst": "“Al dertig dagen geen zuchtje wind. Het water in de vaten stinkt, het brood zit vol wormen en twaalf man hebben bloedend tandvlees en kunnen niet meer werken.”",
      "onder": "Eigen bewerking, zoals een stuurman van een VOC-schip het rond 1620 zou kunnen schrijven."
     },
     "q": "Welk gevaar van de reis naar Oost-Indië beschrijft deze bron?",
     "o": [
      "windstilte, met bedorven eten en zieke mannen",
      "een aanval van een vijandig Portugees fort op de kust",
      "een zware storm waardoor het schip bijna verging",
      "een opstand van de bemanning tegen de kapitein"
     ],
     "a": "windstilte, met bedorven eten en zieke mannen",
     "w": "'Geen zuchtje wind', bedorven water en eten, en bloedend tandvlees: dat is windstilte met scheurbuik als gevolg.",
     "meer": "Bloedend tandvlees is een teken van scheurbuik: ziekte door gebrek aan vitamine C, omdat er geen vers fruit en groente aan boord was.",
     "fout": {
      "een aanval van een vijandig Portugees fort op de kust": "Er wordt niet geschoten en er is geen kust te zien. Het probleem is juist dat het schip stil ligt.",
      "een zware storm waardoor het schip bijna verging": "Omgekeerd: er is helemaal geen wind. Storm is een ander gevaar.",
      "een opstand van de bemanning tegen de kapitein": "De mannen zijn ziek, niet opstandig. Daar staat niets over in de bron."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij een vraag naar een <b>oorzaak</b> kan er meer dan één soort zijn. De VOC had een <b>economische</b> oorzaak (samen meer winst, geen concurrentie) én een <b>politieke</b> (Spanje verzwakken, want Portugal hoorde bij Spanje). Noem de soort voorop.",
    "Bij <b>perspectief</b> kijk je door de ogen van verschillende mensen. Een VOC-bestuurder in 1620 zag Coen anders dan een Indonesiër, of een historicus nu. Beide kanten noem je, elk met een argument.",
    "Bij een bron vraag je je af: <b>wie</b> maakte hem, <b>wanneer</b>, en <b>waarom</b>? Een brief van Coen zelf laat zien hoe híj dacht, niet hoe de Indonesiërs het beleefden."
   ],
   "regel": "Twee perspectieven = twee kanten, elk met een eigen argument en bewijs.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Leg uit dat de oprichting van de VOC zowel een economische als een politieke oorzaak had. (2p)",
     "tip": "Twee soorten, dus twee regels. Begin elke regel met de soort oorzaak en leg dan uit wat het was.",
     "model": [
      {
       "label": "Economische oorzaak",
       "tekst": "Een economische oorzaak: de losse compagnieën beconcurreerden elkaar en kwamen halfvol terug. Door samen te werken in één VOC met een monopolie kon er meer winst gemaakt worden."
      },
      {
       "label": "Politieke oorzaak",
       "tekst": "Een politieke oorzaak: Portugal hoorde bij Spanje, waarmee de Republiek in oorlog was. Door de Portugese specerijenhandel over te nemen werd Spanje zwakker, en met de winst kon de oorlog betaald worden."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de economische oorzaak met het woord 'economisch'.",
       "woorden": [
        "economisch"
       ]
      },
      {
       "t": "Ik leg uit: meer winst, geen concurrentie of een monopolie.",
       "woorden": [
        "winst",
        "concurrent",
        "monopolie"
       ]
      },
      {
       "t": "Ik noem de politieke oorzaak met het woord 'politiek'.",
       "woorden": [
        "politiek"
       ]
      },
      {
       "t": "Ik leg het verband met Spanje of de oorlog uit.",
       "woorden": [
        "spanje",
        "oorlog",
        "portugal",
        "portugees"
       ]
      }
     ],
     "w": "Twee soorten oorzaken, elk op een eigen regel, elk met de soort voorop en een uitleg.",
     "meer": "Veelgemaakte fout: twee economische redenen geven ('meer winst' en 'meer specerijen'). De vraag vraagt om twee soorten, dus één moet over Spanje en de oorlog gaan."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "bron": {
      "titel": "Bron J: Coen schrijft aan de bestuurders van de VOC",
      "tekst": "“Wanhoop niet, spaar uw vijanden niet, want God is met ons. (...) In Indië kan iets groots verricht worden.”",
      "onder": "Naar: brief van Jan Pieterszoon Coen aan de bestuurders van de VOC (1618), in hedendaags Nederlands."
     },
     "q": "Een VOC-bestuurder in 1620 en een Indonesische historicus nu kijken heel anders naar Coen. Leg voor allebei uit hoe zij Coen zien, en gebruik bron J als bewijs. (4p)",
     "tip": "Twee perspectieven, dus twee blokjes. Per blokje: hoe ziet deze persoon Coen (held of schurk) en waarom. Gebruik voor elk een stukje uit de bron.",
     "model": [
      {
       "label": "VOC-bestuurder: zijn oordeel",
       "tekst": "De VOC-bestuurder ziet Coen als een held, omdat hij de VOC machtig en rijk maakte in Azië."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "Dat past bij de zin “In Indië kan iets groots verricht worden”: Coen belooft de bestuurders succes."
      },
      {
       "label": "Indonesische historicus: zijn oordeel",
       "tekst": "De Indonesische historicus ziet Coen als een schurk, omdat hij met veel geweld de Indonesische eilanden veroverde en de bevolking onderdrukte."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "Dat zie je aan “spaar uw vijanden niet”: Coen vindt geweld tegen tegenstanders goed."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem het oordeel van de VOC-bestuurder (held) met een reden.",
       "woorden": [
        "held",
        "rijk",
        "machtig",
        "winst"
       ]
      },
      {
       "t": "Ik noem het oordeel van de Indonesische historicus (schurk) met een reden.",
       "woorden": [
        "schurk",
        "geweld",
        "onderdruk"
       ]
      },
      {
       "t": "Ik citeer twee keer uit de bron, tussen aanhalingstekens.",
       "woorden": [
        "spaar",
        "groots"
       ]
      },
      {
       "t": "Elk perspectief staat in een eigen blokje.",
       "woorden": []
      }
     ],
     "w": "Per perspectief een oordeel, een reden en een citaat. Zo laat je zien dat dezelfde persoon heel anders kan worden gezien.",
     "meer": "Veelgemaakte fout: alleen je eigen mening geven. De vraag gaat over hoe twee ándere mensen hem zien. Weetje: op de Banda-eilanden liet Coen in 1621 een groot deel van de bevolking doden of wegvoeren om de nootmuskaat in handen te krijgen."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron F: Uitgaven en inkomsten van de VOC (in guldens)",
      "tekst": "<table><tr><th>Periode</th><th>Uitgaven</th><th>Inkomsten</th></tr><tr><td>1680-1730</td><td>907.300.000</td><td>960.200.000</td></tr><tr><td>1730-1780</td><td>1.272.900.000</td><td>1.234.300.000</td></tr><tr><td>1780-1790</td><td>187.100.000</td><td>111.200.000</td></tr></table>",
      "onder": "Naar: gegevens over de VOC zoals het werkboek ze geeft."
     },
     "q": "Een klasgenoot zegt: 'Tussen 1730 en 1780 ging het het best met de VOC, want toen waren de inkomsten het hoogst.' Klopt dat?",
     "o": [
      "nee, want de uitgaven waren nog hoger",
      "ja, want hogere inkomsten betekenen altijd meer winst",
      "ja, want de VOC had toen de meeste schepen op zee",
      "nee, want de inkomsten waren tussen 1780 en 1790 hoger"
     ],
     "a": "nee, want de uitgaven waren nog hoger",
     "w": "1.234.300.000 min 1.272.900.000 is min 38.600.000. Ondanks de hoge inkomsten was er verlies.",
     "meer": "Bij een tabel trek je pas een conclusie als je beide kolommen gebruikt. Wie alleen naar de inkomsten kijkt, mist de helft.",
     "fout": {
      "ja, want hogere inkomsten betekenen altijd meer winst": "Dat is de denkfout zelf. Als de uitgaven nog harder stijgen, maak je verlies.",
      "ja, want de VOC had toen de meeste schepen op zee": "Over schepen staat niets in de tabel. Gebruik de cijfers die je hebt.",
      "nee, want de inkomsten waren tussen 1780 en 1790 hoger": "Kijk nog eens: 111.200.000 is veel lager. De reden waarom het niet klopt is het verlies."
     }
    },
    {
     "t": "mc",
     "q": "Bij welk deel van het kenmerkend aspect past deze zin het best: 'Rijke Amsterdammers kopen VOC-aandelen om een deel van de winst te krijgen'?",
     "o": [
      "handelskapitalisme",
      "wereldwijde handelscontacten",
      "het begin van een wereldeconomie",
      "de Nederlandse Opstand"
     ],
     "a": "handelskapitalisme",
     "w": "Geld investeren in de handel om er winst mee te maken: dat is handelskapitalisme.",
     "meer": "Het werkboek zegt het zo: particulieren streefden naar winst, niet alleen via de handelsreizen zelf maar ook via beleggingen in die reizen.",
     "fout": {
      "wereldwijde handelscontacten": "Dat gaat over de gebieden waarmee je handelt (Azië, Afrika, Amerika). Hier gaat het om wat je met je geld doet.",
      "het begin van een wereldeconomie": "Dat gaat over de hele wereld die verbonden raakt via de handel. Aandelen kopen voor winst is kapitalisme.",
      "de Nederlandse Opstand": "Dat is geen deel van dit kenmerkend aspect, en de zin gaat over geld, niet over de oorlog."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron H: Een kleermaker meldt zich bij de VOC",
      "tekst": "“Mijn hart begon direct van opwinding te bonken, want ik waande me al een rijk man, hoewel ik niet eens was aangemonsterd.”",
      "onder": "Naar: Jörg Franz Müller, een kleermaker uit de Elzas, over zijn aanmelding bij de VOC in Amsterdam (1669)."
     },
     "q": "Waarom is deze bron niet geschikt om te bewijzen dat VOC-matrozen ook echt rijk werden?",
     "o": [
      "hij beschrijft zijn hoop, niet wat hij verdiende",
      "de bron is geschreven door een kleermaker en niet door een matroos",
      "de bron komt uit 1669, toen de VOC al niet meer bestond",
      "Müller kwam uit de Elzas en kende de VOC dus helemaal niet"
     ],
     "a": "hij beschrijft zijn hoop, niet wat hij verdiende",
     "w": "Müller 'waande' zich rijk: hij hoopte het. Of hij het werd, staat er niet. Een verwachting is geen bewijs.",
     "meer": "Vraag je bij elke bron af: wát kan deze bron eigenlijk bewijzen? Deze bron bewijst dat mensen hoopten rijk te worden, niet dat ze het ook werden.",
     "fout": {
      "de bron is geschreven door een kleermaker en niet door een matroos": "Müller meldde zich juist aan om mee te varen. Dat hij kleermaker was, is niet het probleem. Het probleem is dat hij nog niet gevaren had.",
      "de bron komt uit 1669, toen de VOC al niet meer bestond": "De VOC bestond van 1602 tot 1799. In 1669 was ze juist op haar sterkst.",
      "Müller kwam uit de Elzas en kende de VOC dus helemaal niet": "Hij kende de VOC wel: hij meldde zich in Amsterdam aan. Veel VOC-mannen kwamen uit het buitenland."
     }
    },
    {
     "t": "sleep",
     "opgave": "Waarom werd de VOC opgericht? Is dit een economische of een politieke oorzaak?",
     "chips": [
      {
       "t": "samen meer winst maken",
       "bak": "eco",
       "waarom": "Winst gaat over geld: economisch."
      },
      {
       "t": "geen concurrentie meer tussen de compagnieën",
       "bak": "eco",
       "waarom": "Concurrentie gaat over handel en prijzen: economisch."
      },
      {
       "t": "de schepen kwamen vaak halfvol terug",
       "bak": "eco",
       "waarom": "Halfvolle schepen betekent te weinig handelswaar en te weinig winst: economisch."
      },
      {
       "t": "Spanje niet laten profiteren van de Portugese handel",
       "bak": "pol",
       "waarom": "Het gaat erom de vijand in de oorlog te verzwakken: politiek."
      },
      {
       "t": "sterker staan in de strijd tegen Spanje",
       "bak": "pol",
       "waarom": "Strijd en oorlog gaan over macht: politiek."
      },
      {
       "t": "uit naam van de Republiek verdragen sluiten in Azië",
       "bak": "pol",
       "waarom": "Verdragen sluiten is iets wat een staat doet: politiek."
      }
     ],
     "bakjes": [
      {
       "id": "eco",
       "label": "economisch (geld, handel)",
       "som": "Meer winst, minder concurrentie."
      },
      {
       "id": "pol",
       "label": "politiek (macht, oorlog)",
       "som": "Spanje verzwakken en sterker staan."
      }
     ],
     "w": "De VOC was een bedrijf én een wapen: economische en politieke redenen liepen door elkaar.",
     "meer": "Ditzelfde zie je straks bij de WIC: die werd in 1621 opgericht, precies toen de oorlog met Spanje weer begon."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron K: De VOC-mentaliteit",
      "tekst": "In 2006 riep premier Balkenende in de Tweede Kamer op tot meer 'VOC-mentaliteit': durven, ondernemen en over grenzen kijken. Veel mensen reageerden boos.",
      "onder": "Eigen beschrijving van een debat in de Tweede Kamer (2006)."
     },
     "q": "Waarom reageerden veel mensen boos op het woord 'VOC-mentaliteit'?",
     "o": [
      "de VOC verdiende ook geld met geweld en onderdrukking",
      "de VOC maakte in haar hele bestaan alleen maar verlies",
      "de VOC was in 2006 nog steeds een bestaand bedrijf",
      "de VOC was een Spaans bedrijf en geen Nederlands bedrijf"
     ],
     "a": "de VOC verdiende ook geld met geweld en onderdrukking",
     "w": "Balkenende dacht aan de handelsgeest, maar anderen dachten aan Coen en het geweld in Indonesië. Twee kanten van dezelfde VOC.",
     "meer": "Dit is een mooi voorbeeld van toen en nu: vroeger zag men de VOC vooral als trots verhaal, nu kijken meer mensen ook naar de slachtoffers.",
     "fout": {
      "de VOC maakte in haar hele bestaan alleen maar verlies": "Niet waar: tussen 1620 en 1730 maakte de VOC juist veel winst. De boosheid ging over het geweld.",
      "de VOC was in 2006 nog steeds een bestaand bedrijf": "De VOC werd in 1799 opgeheven. Dat was niet de reden van de boosheid.",
      "de VOC was een Spaans bedrijf en geen Nederlands bedrijf": "De VOC was juist een bedrijf van de Republiek, opgericht om Spanje dwars te zitten."
     }
    }
   ]
  }
 ]
},
{
 "id": "wic",
 "emoji": "🧭",
 "titel": "5.2.3 · De WIC, kaapvaart en driehoekshandel",
 "paragraaf": "§5.2",
 "kort": "In 1621, het jaar dat het Bestand eindigt, komt de WIC: een wapen tegen Spanje. Piet Hein kaapt in 1628 de zilvervloot. Met de driehoekshandel verdient de WIC aan mensenhandel; daar staan we nu bij stil met Keti Koti.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In Amerika zijn <b>Spanje en Portugal</b> de baas, sinds ze in het verdrag van Tordesillas de wereld onder elkaar verdeelden. De Republiek wil dat <b>alleenrecht verstoren</b>. Daarom komt er in <b>1621</b> een tweede compagnie: de <b>WIC</b>, de <i>“West-Indische Compagnie, handelsonderneming die zich richtte op de handel met Amerika, opgericht in 1621”</i>. Let op het jaartal: in 1621 eindigt het <b>Twaalfjarig Bestand</b> (1609-1621) en begint de oorlog met Spanje weer. Geen toeval: de WIC is ook een <b>wapen tegen Spanje</b>.",
    "De WIC lijkt op de VOC: ook een <b>multinational</b>, ook een <b>monopolie</b> (op de handel tussen de West-Afrikaanse kust en Noord- en Zuid-Amerika) en ook het recht om <b>oorlog te voeren</b> in naam van de Republiek. Een van haar belangrijkste bezigheden is de <b>kaapvaart</b>: <i>“met schepen andere schepen proberen te veroveren (kapen)”</i>. Zo leidt de Republiek Spanje af van de oorlog én verdient ze aan de volgeladen Spaanse schepen. In <b>1628</b> kaapt admiraal <b>Piet Hein</b> de complete Spaanse <b>zilvervloot</b>. Met die buit kan de Republiek de oorlog een jaar lang betalen.",
    "De WIC handelt ook in goud en zilver, en doet mee aan de <b>driehoekshandel</b>: <i>“handel tussen de werelddelen Europa, Afrika en Amerika waarvan de handel in tot slaaf gemaakten en plantageproducten belangrijke onderdelen waren”</i>. Schepen gaan met onder meer textiel en wapens naar West-Afrika. Daar worden mensen gekocht van mensenhandelaren. Dat is <b>mensenhandel</b>: <i>“de handel in tot slaaf gemaakte personen”</i>. <b>Tot slaaf gemaakten</b> zijn <i>“mensen die het bezit van een ander zijn gemaakt, niet vrij zijn en geen rechten hebben”</i>. Ze worden onder gruwelijke omstandigheden naar Amerika gebracht en verkocht aan eigenaren van een <b>plantage</b> (<i>“groot landbouwbedrijf waarop meestal één product wordt verbouwd”</i>). Met suiker, koffie en tabak van de plantages varen de schepen terug naar Europa.",
    "Aan de Amsterdamse grachtengordel wonen veel WIC-bestuurders, handelaren in tot slaaf gemaakten en plantage-eigenaren. Aan sommige gevels zie je dat nog: een gevel uit 1663 met tabaksbalen, of een gevelsteen met een koffievat.",
    "Nu zien steeds meer Nederlanders het slavernijverleden als een <b>zwarte bladzijde</b> in onze geschiedenis. Op <b>1 juli</b> is het <b>Keti Koti</b> (“ketenen gebroken”): de herdenking en viering van de afschaffing van de slavernij in Suriname op <b>1 juli 1863</b>. In het Amsterdamse Oosterpark staat sinds 1 juli 2002 het <b>Nationaal Slavernijmonument</b>. En over mannen als <b>Piet Hein</b> en <b>Jan Pieterszoon Coen</b> wordt gediscussieerd: <b>held of schurk</b>? Dat hangt af van wie er kijkt, en wanneer."
   ],
   "regel": "WIC = 1621 (einde Bestand), het westen, kaapvaart (Piet Hein, zilvervloot 1628) en driehoekshandel met tot slaaf gemaakten; afgeschaft in Suriname op 1 juli 1863 (Keti Koti).",
   "voorbeelden": [
    {
     "en": "VOC: oost, 1602, specerijen. WIC: west, 1621, goud, zilver, kaapvaart en driehoekshandel.",
     "let": "Onthoud het zo: de VOC was er eerst (1602), de WIC volgde toen de oorlog weer begon (1621)."
    }
   ],
   "vragen": [
    {
     "t": "gap",
     "q": "De WIC werd opgericht in het jaar ___.",
     "a": "1621|in 1621",
     "w": "In 1621 kwam de WIC, het jaar waarin het Twaalfjarig Bestand afliep.",
     "meer": "VOC 1602, WIC 1621. En 1621 is ook het einde van het Bestand: dat hoort bij elkaar."
    },
    {
     "t": "mc",
     "q": "Waarom is het geen toeval dat de WIC juist in 1621 werd opgericht?",
     "o": [
      "in 1621 eindigde het Bestand en begon de oorlog weer",
      "in 1621 werd de VOC opgeheven en nam de WIC haar werk over",
      "in 1621 kaapte Piet Hein de zilvervloot en was er geld genoeg",
      "in 1621 werd de slavernij afgeschaft en zocht men nieuwe handel"
     ],
     "a": "in 1621 eindigde het Bestand en begon de oorlog weer",
     "w": "Het Twaalfjarig Bestand (1609-1621) liep af. De WIC was niet alleen een handelsbedrijf, maar ook een wapen in de hervatte oorlog tegen Spanje.",
     "meer": "Daarom was kaapvaart op Spaanse schepen zo belangrijk voor de WIC: het verzwakte de vijand en leverde geld op.",
     "fout": {
      "in 1621 werd de VOC opgeheven en nam de WIC haar werk over": "De VOC bestond nog tot 1799. De WIC kwam ernaast, voor het westen.",
      "in 1621 kaapte Piet Hein de zilvervloot en was er geld genoeg": "De zilvervloot werd pas in 1628 gekaapt, zeven jaar na de oprichting van de WIC.",
      "in 1621 werd de slavernij afgeschaft en zocht men nieuwe handel": "De slavernij werd in Suriname pas in 1863 afgeschaft. In 1621 begon de WIC er juist later aan mee te doen."
     }
    },
    {
     "t": "mc",
     "q": "Wat is kaapvaart?",
     "o": [
      "met schepen andere schepen proberen te veroveren",
      "met schepen om de Kaap van Afrika heen varen",
      "handel drijven met de kust van West-Afrika",
      "vissen op walvissen bij Groenland"
     ],
     "a": "met schepen andere schepen proberen te veroveren",
     "w": "Kaapvaart = kapen: vijandelijke schepen veroveren en de lading meenemen.",
     "meer": "Kaapvaart was toegestaan door de staat, omdat het tegen de vijand Spanje ging. Voor de Spanjaarden was het gewoon roof.",
     "fout": {
      "met schepen om de Kaap van Afrika heen varen": "Klinkt hetzelfde, maar kaapvaart komt van kapen, niet van de Kaap.",
      "handel drijven met de kust van West-Afrika": "Dat deed de WIC ook, maar dat is handel, geen kaapvaart.",
      "vissen op walvissen bij Groenland": "Dat is walvisvaart. Kaapvaart gaat over het veroveren van schepen."
     }
    },
    {
     "t": "gap",
     "q": "Piet Hein kaapte de Spaanse zilvervloot in het jaar ___.",
     "a": "1628|in 1628",
     "w": "In 1628 veroverde Piet Hein de complete Spaanse zilvervloot.",
     "meer": "De buit was zo groot dat de Republiek er een jaar oorlog van kon betalen."
    },
    {
     "t": "sleep",
     "opgave": "Hoort dit bij de VOC of bij de WIC?",
     "chips": [
      {
       "t": "opgericht in 1602",
       "bak": "voc",
       "waarom": "De VOC kwam eerst, in 1602."
      },
      {
       "t": "opgericht in 1621",
       "bak": "wic",
       "waarom": "De WIC volgde in 1621, het jaar waarin het Bestand eindigde."
      },
      {
       "t": "specerijen uit Azië",
       "bak": "voc",
       "waarom": "De VOC voer naar het oosten, naar de specerijen."
      },
      {
       "t": "goud, zilver en plantageproducten",
       "bak": "wic",
       "waarom": "De WIC handelde in het westen: goud, zilver, suiker, koffie, tabak."
      },
      {
       "t": "Batavia als hoofdkwartier",
       "bak": "voc",
       "waarom": "Batavia op Java was de belangrijkste vestiging van de VOC."
      },
      {
       "t": "kaapvaart op Spaanse schepen",
       "bak": "wic",
       "waarom": "Kaapvaart was een van de belangrijkste bezigheden van de WIC."
      },
      {
       "t": "driehoekshandel met tot slaaf gemaakten",
       "bak": "wic",
       "waarom": "De driehoekshandel liep tussen Europa, Afrika en Amerika: het gebied van de WIC."
      },
      {
       "t": "Jan Pieterszoon Coen",
       "bak": "voc",
       "waarom": "Coen was gouverneur-generaal van de VOC in Azië."
      }
     ],
     "bakjes": [
      {
       "id": "voc",
       "label": "VOC (oost)",
       "som": "1602, Azië, specerijen, Batavia, Coen."
      },
      {
       "id": "wic",
       "label": "WIC (west)",
       "som": "1621, Afrika en Amerika, kaapvaart, driehoekshandel, Piet Hein."
      }
     ],
     "w": "VOC = oost, 1602, specerijen. WIC = west, 1621, kaapvaart en driehoekshandel.",
     "meer": "Beide hadden wel een monopolie, het recht om oorlog te voeren en werkten met aandelen: dat zijn de overeenkomsten."
    },
    {
     "t": "sequence",
     "q": "Zet de driehoekshandel in de goede volgorde.",
     "stappen": [
      "Schepen vertrekken uit Europa met onder meer textiel en wapens.",
      "In West-Afrika worden mensen gekocht van mensenhandelaren.",
      "De tot slaaf gemaakten worden onder gruwelijke omstandigheden naar Amerika gebracht.",
      "Daar worden ze verkocht aan plantage-eigenaren.",
      "De schepen varen met suiker, koffie en tabak terug naar Europa."
     ],
     "w": "Europa → Afrika → Amerika → Europa: zo is de driehoek rond.",
     "meer": "Elke hoek van de driehoek heeft zijn eigen 'lading': Europese producten, tot slaaf gemaakten, en plantageproducten."
    },
    {
     "t": "mc",
     "q": "Wat wordt er op Keti Koti (1 juli) herdacht en gevierd?",
     "o": [
      "de afschaffing van de slavernij in Suriname",
      "de onafhankelijkheid van Suriname van Nederland",
      "de oprichting van de West-Indische Compagnie",
      "de kaping van de Spaanse zilvervloot"
     ],
     "a": "de afschaffing van de slavernij in Suriname",
     "w": "Keti Koti betekent 'ketenen gebroken'. Op 1 juli 1863 werd de slavernij in Suriname afgeschaft.",
     "meer": "Herdenken (het leed van de tot slaaf gemaakten) en vieren (de vrijheid) gaan op deze dag samen.",
     "fout": {
      "de onafhankelijkheid van Suriname van Nederland": "Suriname werd pas in 1975 onafhankelijk. Keti Koti gaat over de afschaffing van de slavernij.",
      "de oprichting van de West-Indische Compagnie": "De WIC werd in 1621 opgericht en deed mee aan de mensenhandel. Die vier je niet.",
      "de kaping van de Spaanse zilvervloot": "Dat was in 1628. Keti Koti gaat over vrijheid voor de tot slaaf gemaakten."
     }
    },
    {
     "t": "mc",
     "q": "Waarom zeggen we 'tot slaaf gemaakten' en niet gewoon 'slaven'?",
     "o": [
      "het laat zien dat iemand anders hen slaaf heeft gemaakt",
      "het is een ouder woord dat in de zeventiende eeuw al zo werd gebruikt",
      "het woord slaven betekent iets anders, namelijk mensen uit Oost-Europa",
      "het is korter en makkelijker om op te schrijven in een toets"
     ],
     "a": "het laat zien dat iemand anders hen slaaf heeft gemaakt",
     "w": "Niemand wordt als slaaf geboren. Iemand anders maakt een mens tot slaaf. Het woord legt de nadruk op wat hun is aangedaan.",
     "meer": "Het werkboek definieert het zo: “mensen die het bezit van een ander zijn gemaakt, niet vrij zijn en geen rechten hebben”.",
     "fout": {
      "het is een ouder woord dat in de zeventiende eeuw al zo werd gebruikt": "Juist niet: het is een nieuwere term. Vroeger zei men 'slaven'. We kiezen nu bewust deze woorden.",
      "het woord slaven betekent iets anders, namelijk mensen uit Oost-Europa": "Dat is niet de reden. Het gaat erom dat de term laat zien dat iemand hen tot slaaf heeft gemáákt.",
      "het is korter en makkelijker om op te schrijven in een toets": "Het is juist langer. De reden is dat de term respectvoller is en klopt met wat er gebeurde."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Bij een vraag naar een <b>bedoeling</b> (waarom werd iets opgericht?) is één woord niet genoeg. Noem het doel én leg uit waar het vandaan kwam.",
    "Bij <b>held of schurk</b> bestaan er argumenten voor beide kanten. Sorteer ze eerst: wat maakte iemand groot voor de Republiek, en wat deed hij anderen aan?",
    "Bij een beeldbron bewijs je met wat je <b>op de afbeelding ziet</b>. Het onderschrift vertelt wanneer en door wie hij gemaakt is, maar dat is geen bewijs voor wat er gebeurde.",
    "Bij <b>toen en nu</b> vergelijk je hoe mensen vroeger en nu over hetzelfde denken. Vroeger werd Piet Hein vooral gevierd; nu kijken we ook naar de mensen die onder de handel van de WIC hebben geleden."
   ],
   "regel": "Een bedoeling leg je uit met het doel én de reden erachter.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Een klasgenoot schrijft: 'De WIC werd opgericht voor de kaapvaart.' Dat is maar een deel van het verhaal. Leg uit met welke bedoeling de WIC werd opgericht. (2p)",
     "tip": "Twee stappen: zeg eerst wie in Amerika de baas was en waarom, en dan wat de Republiek daaraan wilde veranderen.",
     "model": [
      {
       "label": "De situatie",
       "tekst": "Door het verdrag van Tordesillas hadden Spanje en Portugal het alleenrecht op de handel met Amerika."
      },
      {
       "label": "De bedoeling",
       "tekst": "De Republiek wilde dat alleenrecht verstoren en zelf handel drijven met Amerika. Omdat in 1621 de oorlog met Spanje weer begon, was de WIC daardoor ook een wapen tegen Spanje."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem Spanje en Portugal.",
       "woorden": [
        "spanje",
        "portugal"
       ]
      },
      {
       "t": "Ik gebruik het woord alleenrecht of monopolie.",
       "woorden": [
        "alleenrecht",
        "monopolie"
       ]
      },
      {
       "t": "Ik zeg dat de Republiek dit wilde verstoren en zelf wilde handelen.",
       "woorden": [
        "verstoren",
        "doorbreken",
        "zelf"
       ]
      },
      {
       "t": "Ik leg uit dat de WIC ook een wapen tegen Spanje was.",
       "woorden": [
        "oorlog",
        "wapen",
        "bestand",
        "1621"
       ]
      }
     ],
     "w": "Het doel was het alleenrecht van Spanje en Portugal in Amerika verstoren. Kaapvaart was een middel, niet het hele doel.",
     "meer": "Veelgemaakte fout: alleen 'de kaapvaart' antwoorden. Dat is wat de WIC deed, niet waaróm ze werd opgericht. Vraag naar een bedoeling = vertel het doel en de reden erachter."
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "bron": {
      "titel": "Bron L: Excuses bij het monument",
      "tekst": "Op 1 juli 2023 sprak koning Willem-Alexander bij het Nationaal Slavernijmonument in het Oosterpark in Amsterdam. Hij bood zijn excuses aan voor het slavernijverleden van Nederland. Een half jaar eerder had premier Rutte namens de regering al excuses gemaakt.",
      "onder": "Eigen beschrijving van de herdenking van Keti Koti (2023)."
     },
     "q": "Leg uit waarom de driehoekshandel een zwarte bladzijde in de Nederlandse geschiedenis wordt genoemd. Gebruik de begrippen mensenhandel en tot slaaf gemaakten, en bron L. (3p)",
     "tip": "Leg eerst uit wat er gebeurde (met beide begrippen), dan waarom dat zo erg was, en eindig met wat de bron laat zien over hoe we er nu naar kijken.",
     "model": [
      {
       "label": "Wat er gebeurde",
       "tekst": "In de driehoekshandel deed de WIC aan mensenhandel: in West-Afrika werden mensen gekocht en in Amerika verkocht aan plantage-eigenaren."
      },
      {
       "label": "Waarom het zo erg was",
       "tekst": "De tot slaaf gemaakten waren het bezit van een ander, niet vrij en zonder rechten. Ze werden onder gruwelijke omstandigheden vervoerd. Daardoor zien we dit nu als een zwarte bladzijde."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron zie je dat de koning in 2023 excuses aanbood voor het slavernijverleden. Dat laat zien dat Nederland dit nu als een fout in zijn eigen geschiedenis ziet."
      }
     ],
     "checklist": [
      {
       "t": "Ik gebruik het begrip mensenhandel.",
       "woorden": [
        "mensenhandel"
       ]
      },
      {
       "t": "Ik gebruik het begrip tot slaaf gemaakten.",
       "woorden": [
        "tot slaaf"
       ]
      },
      {
       "t": "Ik leg uit waarom het zo erg was (geen vrijheid, geen rechten, gruwelijk).",
       "woorden": [
        "vrij",
        "rechten",
        "gruwelijk",
        "bezit"
       ]
      },
      {
       "t": "Ik noem iets uit de bron (de excuses).",
       "woorden": [
        "excuses",
        "koning",
        "monument"
       ]
      }
     ],
     "w": "Wat gebeurde er (mensenhandel), waarom was het zo erg (tot slaaf gemaakten zonder vrijheid en rechten), en hoe kijken we er nu naar (excuses).",
     "meer": "Veelgemaakte fout: alleen schrijven 'ze kochten mensen, dat kan niet'. Je gevoel klopt, maar je mist de begrippen en de uitleg. Op de toets krijg je de punten voor het begrip en de reden."
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron M: Een lied over Piet Hein",
      "tekst": "“Piet Hein, Piet Hein, zijn naam is klein, zijn daden bennen groot. Hij heeft gewonnen de Zilveren Vloot.”",
      "onder": "Naar: het lied 'De Zilveren Vloot' van J.P. Heije (19e eeuw)."
     },
     "q": "Welk beeld van Piet Hein geeft dit lied?",
     "o": [
      "een held",
      "een dief",
      "een mensenhandelaar",
      "een onbekende matroos"
     ],
     "a": "een held",
     "w": "'Zijn daden bennen groot': het lied bewondert hem om de verovering van de zilvervloot.",
     "meer": "Let op wanneer het lied gemaakt is: in de 19e eeuw, ruim tweehonderd jaar later. Toen keken Nederlanders vooral met trots naar de Gouden Eeuw.",
     "fout": {
      "een dief": "Spanjaarden zagen hem misschien zo, maar het lied niet. 'Zijn daden bennen groot' is lof.",
      "een mensenhandelaar": "Daar zegt het lied niets over. Het gaat alleen over de zilvervloot.",
      "een onbekende matroos": "'Zijn naam is klein' is een woordgrap: Hein is een korte naam. Zijn daden noemt het lied juist groot."
     }
    },
    {
     "t": "sleep",
     "opgave": "Held of schurk? Sorteer de argumenten over Piet Hein en Jan Pieterszoon Coen.",
     "chips": [
      {
       "t": "Piet Hein kaapte als enige een complete Spaanse zilvervloot",
       "bak": "held",
       "waarom": "Dat was een grote prestatie voor de Republiek: een argument voor held."
      },
      {
       "t": "Met de buit van Piet Hein kon de oorlog een jaar betaald worden",
       "bak": "held",
       "waarom": "Hij hielp de Republiek in de oorlog tegen Spanje: argument voor held."
      },
      {
       "t": "Kapen is eigenlijk het roven van andermans schip en lading",
       "bak": "schurk",
       "waarom": "Vanuit de Spanjaarden gezien is het diefstal: argument voor schurk."
      },
      {
       "t": "Coen maakte de VOC de machtigste handelaar in Azië",
       "bak": "held",
       "waarom": "Voor de VOC en de Republiek was dat een succes: argument voor held."
      },
      {
       "t": "Coen bouwde Batavia uit tot hoofdkwartier van de VOC",
       "bak": "held",
       "waarom": "Voor de VOC een grote prestatie: argument voor held."
      },
      {
       "t": "Coen onderdrukte de Indonesische bevolking met veel geweld",
       "bak": "schurk",
       "waarom": "Geweld tegen de bevolking is een argument voor schurk."
      },
      {
       "t": "Op de Banda-eilanden liet Coen een groot deel van de bevolking doden of wegvoeren",
       "bak": "schurk",
       "waarom": "Dat deed hij om de nootmuskaat in handen te krijgen: een zwaar argument voor schurk."
      }
     ],
     "bakjes": [
      {
       "id": "held",
       "label": "argument voor held",
       "som": "Wat ze deden voor de Republiek en de compagnie."
      },
      {
       "id": "schurk",
       "label": "argument voor schurk",
       "som": "Wat ze anderen aandeden."
      }
     ],
     "w": "Over allebei bestaan argumenten voor held én schurk. Welk label je kiest, hangt af van wiens kant je bekijkt.",
     "meer": "Op de toets: kies een label, zeg of het terecht is, en geef een argument. Bijvoorbeeld: 'Het beeld van Coen als schurk is terecht, omdat hij veel geweld gebruikte bij de verovering van de Indonesische eilanden.'"
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron N: Het slavenschip Brookes",
      "tekst": "Een tekening van een schip van bovenaf, als een bouwtekening. In het ruim liggen honderden mensen in nette rijen naast elkaar, schouder aan schouder. Er is geen ruimte tussen hen om te bewegen of te zitten.",
      "onder": "Naar: stuwplan van het slavenschip Brookes (gebouwd 1781), uit een boek van Thomas Clarkson (1808)."
     },
     "q": "Je wilt met deze bron bewijzen dat tot slaaf gemaakten onmenselijk werden vervoerd. Welk bewijs gebruik je?",
     "o": [
      "de mensen liggen als lading opeengepakt in rijen",
      "het onderschrift zegt dat het schip in 1781 werd gebouwd",
      "de tekening komt uit een boek dat in 1808 verscheen",
      "het schip is van bovenaf getekend, als een bouwtekening"
     ],
     "a": "de mensen liggen als lading opeengepakt in rijen",
     "w": "Dat zie je in de bron zelf: mensen worden behandeld als lading, zo dicht mogelijk opeengepakt.",
     "meer": "Bewijs komt uit wat je ziet of leest in de bron. Het onderschrift (jaartallen, het boek) helpt je de bron te plaatsen, maar bewijst niet hoe de mensen werden behandeld.",
     "fout": {
      "het onderschrift zegt dat het schip in 1781 werd gebouwd": "Dat staat in het onderschrift, en een bouwjaar zegt niets over de behandeling van de mensen.",
      "de tekening komt uit een boek dat in 1808 verscheen": "Ook dat komt uit het onderschrift. Gebruik iets wat je in de bron zelf ziet.",
      "het schip is van bovenaf getekend, als een bouwtekening": "Dat zegt iets over hoe de tekening gemaakt is, niet over hoe de mensen behandeld werden. Wat zie je in het ruim?"
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron O: Een gevel aan de gracht",
      "tekst": "Een rijk versierde gevel uit 1663 aan de Oudezijds Voorburgwal in Amsterdam. Bovenaan zie je vier figuren die op balen tabak zitten en bundels tabaksbladeren vasthouden.",
      "onder": "Eigen beschrijving van een gevel in Amsterdam (1663)."
     },
     "q": "Wat kun je met deze gevel het best bewijzen?",
     "o": [
      "de eigenaar verdiende aan de handel in tabak",
      "in Amsterdam werd zelf veel tabak verbouwd op het land",
      "de eigenaar was tegen de slavernij en de plantages",
      "de gevel werd gemaakt na de afschaffing van de slavernij"
     ],
     "a": "de eigenaar verdiende aan de handel in tabak",
     "w": "De eigenaar liet trots tabak op zijn gevel zetten. Zijn geld kwam uit de handel in tabak, een plantageproduct.",
     "meer": "Zo zie je dat het slavernijverleden nog steeds in de stad zichtbaar is: aan gevels en gevelstenen aan de grachtengordel.",
     "fout": {
      "in Amsterdam werd zelf veel tabak verbouwd op het land": "Tabak kwam van plantages in Amerika, gebracht via de driehoekshandel. De gevel toont de handel, niet de teelt.",
      "de eigenaar was tegen de slavernij en de plantages": "Hij versierde zijn huis juist trots met tabak. Dat wijst op verdienen aan de handel, niet op verzet.",
      "de gevel werd gemaakt na de afschaffing van de slavernij": "De gevel is uit 1663, de afschaffing in Suriname was in 1863: tweehonderd jaar later."
     }
    },
    {
     "t": "mc",
     "q": "Wat hadden de VOC en de WIC met elkaar gemeen?",
     "o": [
      "allebei een monopolie en het recht op oorlog",
      "allebei handelden ze vooral in specerijen uit Azië",
      "allebei werden ze opgericht door admiraal Piet Hein",
      "allebei hadden ze hun hoofdkwartier in Batavia"
     ],
     "a": "allebei een monopolie en het recht op oorlog",
     "w": "De WIC werd 'vergelijkbaar met de VOC' opgericht: allebei multinationals, met een monopolie en het recht om oorlog te voeren.",
     "meer": "Verschillen: VOC oost (1602, specerijen), WIC west (1621, goud, zilver, kaapvaart, driehoekshandel).",
     "fout": {
      "allebei handelden ze vooral in specerijen uit Azië": "Dat deed alleen de VOC. De WIC handelde in het westen: goud, zilver en plantageproducten.",
      "allebei werden ze opgericht door admiraal Piet Hein": "Piet Hein trad pas in 1623 in dienst van de WIC. De VOC kwam er door Van Oldenbarnevelt.",
      "allebei hadden ze hun hoofdkwartier in Batavia": "Batavia op Java was van de VOC. De WIC werkte in Afrika en Amerika."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Bij de vraag <b>is de maker voor of tegen</b> begin je met <b>voor</b> of <b>tegen</b>. Daarna bewijs je het met een <b>citaat</b>. Voor het extra punt kijk je naar de maker: wie was hij, en waarom schreef hij dit?",
    "Een bron uit de tijd zelf kan iets <b>goedpraten</b>. Dat maakt hem niet waardeloos: hij laat juist zien hoe sommige mensen toen dachten. Maar hij is geen eerlijk bewijs voor hoe de tot slaaf gemaakten het hadden.",
    "Bij <b>toen en nu</b> en bij <b>perspectief</b> laat je zien dat het oordeel over een gebeurtenis afhangt van wie kijkt: een Hollandse aandeelhouder, een Spaanse koopman, een tot slaaf gemaakte, of wij nu."
   ],
   "regel": "Voor of tegen? Eerst je antwoord, dan het citaat, dan wie de maker was en waarom hij dit schreef.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "I",
     "bron": {
      "titel": "Bron P: Een scheepsarts over de slavenhandel",
      "tekst": "De maker schrijft dat de tot slaaf gemaakten in Amerika een beter leven zouden hebben dan in hun eigen land, en dat zij geschikter zouden zijn voor het werk op de plantages. Hij eindigt met: “dat het voordeel van de slavenhandel (...) de bezwaren en alle tegenwerpingen die men naar voren zou kunnen brengen, verre te boven gaat.”",
      "onder": "Naar: het boek 'Noodige onderrichtingen voor de slaafhandelaaren' van de scheepsarts Gallandat (1769)."
     },
     "q": "Is de maker van bron P voor of tegen de slavenhandel? Bewijs je antwoord met een citaat, en leg met de titel van zijn boek uit waarom hij dit schreef. (3p)",
     "tip": "Begin met 'voor' of 'tegen'. Citeer dan de zin die het bewijst. Kijk voor het laatste punt naar het onderschrift: voor wie schreef hij zijn boek?",
     "model": [
      {
       "label": "Voor of tegen",
       "tekst": "De maker is voor de slavenhandel."
      },
      {
       "label": "Bewijs uit de bron",
       "tekst": "In de bron staat dat “het voordeel van de slavenhandel (...) de bezwaren en alle tegenwerpingen (...) verre te boven gaat”. Hij vindt de voordelen dus groter dan de bezwaren."
      },
      {
       "label": "Waarom hij dit schreef",
       "tekst": "Zijn boek heet 'Noodige onderrichtingen voor de slaafhandelaaren': een handleiding voor slavenhandelaren. Hij schreef dus voor mensen die aan de slavenhandel verdienden, en praat die handel daarom goed."
      }
     ],
     "checklist": [
      {
       "t": "Ik begin met 'voor'.",
       "woorden": [
        "voor"
       ]
      },
      {
       "t": "Ik citeer uit de bron, tussen aanhalingstekens.",
       "woorden": [
        "voordeel",
        "bezwaren",
        "te boven"
       ]
      },
      {
       "t": "Ik leg uit dat hij de voordelen groter vindt dan de bezwaren.",
       "woorden": [
        "groter",
        "belangrijker",
        "meer"
       ]
      },
      {
       "t": "Ik gebruik de titel: hij schreef voor slavenhandelaren.",
       "woorden": [
        "handelaar",
        "handleiding",
        "onderricht"
       ]
      }
     ],
     "w": "Voor; bewezen met het citaat over 'voordeel' tegenover 'bezwaren'; en de maker schreef een handleiding voor slavenhandelaren, dus hij praat de handel goed.",
     "meer": "Veelgemaakte fout: 'tegen, want hij noemt bezwaren'. Hij noemt ze alleen om ze weg te wuiven. Lees de hele zin. En let op: een bron die iets goedpraat is geen bewijs dat de tot slaaf gemaakten het beter kregen. Andere bronnen, zoals het stuwplan van de Brookes, laten het tegendeel zien."
    },
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg uit dat de VOC en de WIC samen een voorbeeld zijn van het begin van een wereldeconomie. Gebruik voor allebei een voorbeeld, en leg in je laatste stap uit hoe de werelddelen daardoor met elkaar verbonden raakten. (3p)",
     "tip": "Eén regel voor de VOC, één voor de WIC, en een slotregel met 'daardoor'. Noem steeds de werelddelen bij naam.",
     "model": [
      {
       "label": "VOC",
       "tekst": "De VOC haalde specerijen uit Azië naar Europa, met handelsposten in onder meer Indonesië, India, China en Zuid-Afrika."
      },
      {
       "label": "WIC",
       "tekst": "De WIC verbond met de driehoekshandel Europa, Afrika en Amerika: Europese producten naar Afrika, tot slaaf gemaakten naar Amerika en plantageproducten naar Europa."
      },
      {
       "label": "Daardoor: wereldeconomie",
       "tekst": "Daardoor werden producten uit alle werelddelen via Amsterdam doorverkocht naar andere landen. Zo raakten de werelddelen door de handel met elkaar verbonden: het begin van een wereldeconomie."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem een voorbeeld van de VOC met Azië.",
       "woorden": [
        "voc",
        "azi",
        "specerij"
       ]
      },
      {
       "t": "Ik noem een voorbeeld van de WIC met Afrika en Amerika.",
       "woorden": [
        "wic",
        "afrika",
        "amerika",
        "driehoek"
       ]
      },
      {
       "t": "Ik gebruik het begrip wereldeconomie.",
       "woorden": [
        "wereldeconomie"
       ]
      },
      {
       "t": "Ik leg het verband met 'daardoor' en 'verbonden'.",
       "woorden": [
        "daardoor",
        "verbonden",
        "waardoor"
       ]
      }
     ],
     "w": "VOC (Azië) plus WIC (Afrika en Amerika) plus Europa: alle werelddelen raken via de handel verbonden.",
     "meer": "Veelgemaakte fout: alleen 'de VOC en WIC handelden wereldwijd' schrijven. Dat is één zin zonder voorbeelden en zonder uitleg van het begrip. De definitie helpt: wereldeconomie is “productie en consumptie wereldwijd van alles waaraan mensen waar ook ter wereld behoefte hebben”."
    },
    {
     "t": "mc",
     "q": "Op 1 juli 1863 werd de slavernij in Suriname afgeschaft. Waarom betekende dat voor de tot slaaf gemaakten nog niet meteen echte vrijheid?",
     "o": [
      "ze moesten nog tien jaar verplicht op de plantages werken",
      "de slavernij gold alleen in Nederland als afgeschaft, niet in Suriname",
      "de WIC bleef tot 1900 doorgaan met het verkopen van tot slaaf gemaakten",
      "de afschaffing ging pas echt in toen het monument er stond in 2002"
     ],
     "a": "ze moesten nog tien jaar verplicht op de plantages werken",
     "w": "Na 1863 moesten de vrijgemaakten nog tot 1873 verplicht op de plantages werken, onder staatstoezicht. De plantage-eigenaren kregen wel geld als vergoeding; de tot slaaf gemaakten niet.",
     "meer": "Dat is ook een reden waarom Keti Koti zowel herdenken als vieren is: de vrijheid kwam laat en niet in één keer.",
     "fout": {
      "de slavernij gold alleen in Nederland als afgeschaft, niet in Suriname": "Keti Koti gaat juist over de afschaffing in Suriname, op 1 juli 1863.",
      "de WIC bleef tot 1900 doorgaan met het verkopen van tot slaaf gemaakten": "De WIC bestond toen al lang niet meer. De laatste WIC werd in 1791 opgeheven.",
      "de afschaffing ging pas echt in toen het monument er stond in 2002": "Het monument is een plek om te herdenken, geen wet. De afschaffing was in 1863."
     }
    },
    {
     "t": "mc",
     "q": "In 1628 hoort een Spaanse koopman in Sevilla dat Piet Hein de zilvervloot heeft gekaapt. Hoe kijkt hij waarschijnlijk naar Piet Hein?",
     "o": [
      "als een zeerover die het zilver van Spanje heeft gestolen",
      "als een held, omdat hij zo'n slimme aanval had bedacht",
      "als een vriend, omdat Spanje en de Republiek toen vrede hadden",
      "als een slavenhandelaar, omdat de vloot tot slaaf gemaakten vervoerde"
     ],
     "a": "als een zeerover die het zilver van Spanje heeft gestolen",
     "w": "Voor de Spanjaarden was kaapvaart gewoon roof. Hun zilver was weg. Wat in Holland een held was, was in Spanje een dief.",
     "meer": "Perspectief: dezelfde gebeurtenis, twee kanten. De Hollandse aandeelhouder juicht, de Spaanse koopman vloekt.",
     "fout": {
      "als een held, omdat hij zo'n slimme aanval had bedacht": "Dat is het Hollandse perspectief. Een Spanjaard verloor juist zijn zilver.",
      "als een vriend, omdat Spanje en de Republiek toen vrede hadden": "In 1628 was er geen vrede: het Bestand was in 1621 afgelopen en de oorlog was weer begonnen.",
      "als een slavenhandelaar, omdat de vloot tot slaaf gemaakten vervoerde": "De zilvervloot vervoerde zilver en andere kostbaarheden uit de Spaanse koloniën, geen mensen."
     }
    },
    {
     "t": "mc",
     "bron": {
      "titel": "Bron Q: Feest voor Piet Hein",
      "tekst": "In een filmpje uit 1927 zie je een feestelijke herdenking van Piet Hein, met vlaggen en veel publiek. Er wordt niets gezegd over de mensenhandel van de WIC.",
      "onder": "Eigen beschrijving naar een fragment van het Polygoonjournaal (1927)."
     },
     "q": "Nu kijken veel mensen kritischer naar Piet Hein en de WIC dan in 1927. Wat verklaart dat verschil het best?",
     "o": [
      "nu kijken we ook naar de slachtoffers van de WIC",
      "nu weten we pas dat Piet Hein de zilvervloot heeft gekaapt",
      "in 1927 bestond de WIC nog en mocht niemand kritiek hebben",
      "in 1927 was Nederland nog in oorlog met Spanje"
     ],
     "a": "nu kijken we ook naar de slachtoffers van de WIC",
     "w": "In 1927 zag men vooral de trots van de Gouden Eeuw. Nu kijken we ook naar de tot slaaf gemaakten die onder de handel van de WIC hebben geleden.",
     "meer": "Toen en nu: het verleden zelf verandert niet, maar wel de vragen die wij stellen en wiens verhaal we horen.",
     "fout": {
      "nu weten we pas dat Piet Hein de zilvervloot heeft gekaapt": "Dat wist iedereen in 1927 al: daarom vierden ze hem juist.",
      "in 1927 bestond de WIC nog en mocht niemand kritiek hebben": "De WIC bestond al lang niet meer. Het verschil zit in hoe we nu kijken.",
      "in 1927 was Nederland nog in oorlog met Spanje": "De oorlog met Spanje eindigde in 1648, bijna driehonderd jaar eerder."
     }
    },
    {
     "t": "mc",
     "q": "Welk voorbeeld past het best bij 'het begin van een wereldeconomie'?",
     "o": [
      "Amerikaanse suiker gaat via Amsterdam naar heel Europa",
      "Holland en Zeeland halen goedkoop graan uit het Oostzeegebied",
      "rijke Amsterdammers kopen aandelen van de WIC op de beurs",
      "Piet Hein kaapt in 1628 de Spaanse zilvervloot"
     ],
     "a": "Amerikaanse suiker gaat via Amsterdam naar heel Europa",
     "w": "Productie in het ene werelddeel, verkoop in een ander, met Amsterdam als knooppunt: zo raakt de wereld economisch verbonden.",
     "meer": "Wereldeconomie = productie en consumptie wereldwijd. Hoe meer werelddelen in één voorbeeld, hoe beter het past.",
     "fout": {
      "Holland en Zeeland halen goedkoop graan uit het Oostzeegebied": "Dat is handel binnen Europa: een handelscontact, maar nog geen wereldeconomie.",
      "rijke Amsterdammers kopen aandelen van de WIC op de beurs": "Geld investeren voor winst is handelskapitalisme, een ander deel van het kenmerkend aspect.",
      "Piet Hein kaapt in 1628 de Spaanse zilvervloot": "Dat is kaapvaart in de oorlog, geen voorbeeld van wereldwijde productie en verkoop."
     }
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Spanje verovert Antwerpen (1585)",
      "De VOC wordt opgericht (1602)",
      "Het Twaalfjarig Bestand begint (1609)",
      "Het Bestand eindigt en de WIC wordt opgericht (1621)",
      "Piet Hein kaapt de Spaanse zilvervloot (1628)",
      "De slavernij in Suriname wordt afgeschaft (1863)"
     ],
     "w": "Van de val van Antwerpen via VOC, Bestand en WIC naar de zilvervloot, en veel later de afschaffing van de slavernij.",
     "meer": "Onthoud het koppeltje 1621: einde Bestand én oprichting WIC. Dat is geen toeval: de WIC was ook een wapen in de hervatte oorlog."
    }
   ]
  }
 ]
}
);


/* ===== Over alle paragrafen: wie is wie en de tijdlijn ===== */
window.LEERSTOF.push(
{
 "id": "wie-is-wie",
 "emoji": "🧑‍🤝‍🧑",
 "titel": "Wie is wie? Filipsen, Oranjes en ambten",
 "paragraaf": "alle §",
 "kort": "Vier Filipsen, twee Margaretha's, drie Oranjes en drie ambten die op elkaar lijken. Hier haal je ze uit elkaar.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "In deze stof lopen veel mensen rond met dezelfde naam. Dat is geen toeval: vorsten noemden hun kinderen naar hun ouders. Met een paar haakjes houd je ze uit elkaar.",
    "<b>De vier Filipsen.</b> <b>Filips de Stoute</b> (Bourgondische hertog, krijgt in 1384 Vlaanderen door zijn huwelijk). <b>Filips de Goede</b> (zijn kleinzoon, centraliseert, eerste Staten-Generaal in 1464). <b>Filips de Schone</b> (Habsburger, zoon van Maria van Bourgondië en Maximiliaan, vader van Karel V, overleden 1506). <b>Filips II</b> (zoon van Karel V, koning van Spanje vanaf 1555, de vorst van de Opstand).",
    "<b>De twee Margaretha's.</b> <b>Margaretha van Oostenrijk</b> is de <b>tante</b> van Karel V en zijn landvoogdes. <b>Margaretha van Parma</b> is de <b>halfzus</b> van Filips II en zijn landvoogdes, tot Alva komt in 1567. Ezelsbrug: <b>O</b>ostenrijk is <b>O</b>uder, Parma komt later.",
    "<b>De drie Oranjes.</b> <b>Willem van Oranje</b> (vader, leider van de Opstand, vermoord in 1584). <b>Maurits</b> (zijn zoon, legeraanvoerder, verovert steden, staatsgreep 1618). <b>Frederik Hendrik</b> (halfbroer van Maurits, stadhouder vanaf 1625, de 'stedendwinger').",
    "<b>De drie ambten.</b> Een <b>stadhouder</b> is de plaatsvervanger van de heer binnen <b>één gewest</b>. Een <b>landvoogd(es)</b> is de plaatsvervanger van de vorst in <b>alle</b> Nederlandse gewesten. Een <b>landsadvocaat</b> is de <b>hoogste ambtenaar</b> van de Staten (zoals Johan van Oldenbarnevelt)."
   ],
   "regel": "Stadhouder = één gewest, landvoogd = alle gewesten, landsadvocaat = hoogste ambtenaar van de Staten.",
   "voorbeelden": [
    {
     "en": "Filips de Stoute, Filips de Goede, Filips de Schone, Filips II",
     "let": "Op volgorde van tijd: Stoute (1384), Goede (1464), Schone (tot 1506), II (vanaf 1555)."
    }
   ],
   "vragen": [
    {
     "t": "sleep",
     "opgave": "Welke Filips is het?",
     "chips": [
      {
       "t": "krijgt in 1384 Vlaanderen door zijn huwelijk",
       "bak": "stoute",
       "waarom": "Het huwelijk met Margaretha van Male: dat is Filips de Stoute, de eerste Bourgondiër."
      },
      {
       "t": "roept in 1464 de eerste Staten-Generaal bijeen",
       "bak": "goede",
       "waarom": "De eerste Staten-Generaal hoort bij de centralisatie van Filips de Goede."
      },
      {
       "t": "vader van Karel V, sterft in 1506",
       "bak": "schone",
       "waarom": "Na de dood van Filips de Schone in 1506 neemt zijn zoon Karel V het over."
      },
      {
       "t": "koning van Spanje vanaf 1555",
       "bak": "ii",
       "waarom": "Filips II volgt in 1555 zijn vader Karel V op."
      },
      {
       "t": "stuurt Alva naar de Nederlanden",
       "bak": "ii",
       "waarom": "Na de Beeldenstorm van 1566 stuurt Filips II de hertog van Alva."
      },
      {
       "t": "kleinzoon van de eerste Bourgondische hertog",
       "bak": "goede",
       "waarom": "Filips de Goede is de kleinzoon van Filips de Stoute."
      },
      {
       "t": "zoon van Maria van Bourgondië en Maximiliaan",
       "bak": "schone",
       "waarom": "Filips de Schone is een Habsburger: zoon van Maria en Maximiliaan."
      }
     ],
     "bakjes": [
      {
       "id": "stoute",
       "label": "Filips de Stoute",
       "som": "Bourgondië, 1384"
      },
      {
       "id": "goede",
       "label": "Filips de Goede",
       "som": "centralisatie, 1464"
      },
      {
       "id": "schone",
       "label": "Filips de Schone",
       "som": "Habsburg, tot 1506"
      },
      {
       "id": "ii",
       "label": "Filips II",
       "som": "Spanje, vanaf 1555"
      }
     ],
     "w": "Vier Filipsen op een rij: Stoute, Goede, Schone, II.",
     "meer": "Bij een vraag over de Opstand gaat het altijd over Filips II. De drie andere Filipsen horen bij 4.2 en het begin van 4.3."
    },
    {
     "t": "mc",
     "q": "Wie was de <b>tante</b> van Karel V en zijn landvoogdes?",
     "o": [
      "Margaretha van Oostenrijk",
      "Margaretha van Parma",
      "Maria van Bourgondië",
      "Margaretha van Male, de vrouw van Filips de Stoute"
     ],
     "a": "Margaretha van Oostenrijk",
     "w": "Margaretha van Oostenrijk: tante van Karel V.",
     "meer": "Margaretha van Parma is later: de halfzus van Filips II.",
     "fout": {
      "Margaretha van Parma": "Ook een landvoogdes, maar van Filips II, niet van Karel V. Zij is de halfzus van Filips.",
      "Maria van Bourgondië": "Maria is de grootmoeder van Karel V. Zij tekende in 1477 het Groot Privilege.",
      "Margaretha van Male, de vrouw van Filips de Stoute": "Zij is de vrouw van Filips de Stoute, uit de 14e eeuw."
     }
    },
    {
     "t": "mc",
     "q": "Wat is een <b>stadhouder</b>?",
     "o": [
      "plaatsvervanger van de heer binnen een gewest",
      "plaatsvervanger van de vorst in alle gewesten",
      "hoogste ambtenaar van de Staten-Generaal",
      "de burgemeester van een grote stad"
     ],
     "a": "plaatsvervanger van de heer binnen een gewest",
     "w": "Stadhouder = één gewest.",
     "meer": "Het woord zegt het al een beetje: hij houdt de plaats (stede) van de heer bezet, in een gewest.",
     "fout": {
      "plaatsvervanger van de vorst in alle gewesten": "Dat is een <b>landvoogd</b>: die vervangt de vorst in álle gewesten samen.",
      "hoogste ambtenaar van de Staten-Generaal": "Dat is een <b>landsadvocaat</b>, zoals Johan van Oldenbarnevelt.",
      "de burgemeester van een grote stad": "Ondanks het woord 'stad' is een stadhouder geen burgemeester. Hij vertegenwoordigt de heer in een gewest."
     }
    },
    {
     "t": "mc",
     "q": "Hoe zijn Maurits en Willem van Oranje familie van elkaar?",
     "o": [
      "Maurits is de zoon van Willem",
      "Maurits is de halfbroer van Willem",
      "Maurits is de vader van Willem",
      "ze zijn geen familie"
     ],
     "a": "Maurits is de zoon van Willem",
     "w": "Willem is de vader, Maurits de zoon.",
     "meer": "Frederik Hendrik is de halfbroer van Maurits, dus ook een zoon van Willem.",
     "fout": {
      "Maurits is de halfbroer van Willem": "Halfbroer is Frederik Hendrik, en dan van Maurits. Maurits is Willems zoon.",
      "Maurits is de vader van Willem": "Omgekeerd: Willem (1533-1584) is de vader. Maurits wordt na de moord op zijn vader stadhouder.",
      "ze zijn geen familie": "Ze zijn juist vader en zoon, allebei uit de familie Oranje-Nassau."
     }
    },
    {
     "t": "mc",
     "q": "Welke paus stuurde Luther de <b>bul</b>?",
     "o": [
      "Leo X",
      "Julius II",
      "Franciscus",
      "Gregorius"
     ],
     "a": "Leo X",
     "w": "Paus Leo X accepteerde Luthers kritiek niet en stuurde hem een bul.",
     "meer": "Julius II is de paus die in 1506 de Sint-Pieter wilde verfraaien, betaald met aflaten.",
     "fout": {
      "Julius II": "De bekende valkuil: Julius II is de paus van de Sint-Pieter (1506). De bul kwam van Leo X.",
      "Franciscus": "Paus Franciscus was de paus van onze tijd (2013-2025), niet uit de 16e eeuw.",
      "Gregorius": "Die komt niet in deze stof voor. De bul aan Luther kwam van Leo X."
     }
    },
    {
     "t": "gap",
     "q": "Johan van Oldenbarnevelt was geen stadhouder maar ___ van Holland.",
     "a": "landsadvocaat|de landsadvocaat",
     "w": "Landsadvocaat: de hoogste ambtenaar van de Staten.",
     "meer": "Maurits was stadhouder en leidde het leger; Van Oldenbarnevelt leidde de politiek."
    },
    {
     "t": "mc",
     "q": "Wie was de halfbroer van Maurits en werd in 1625 stadhouder?",
     "o": [
      "Frederik Hendrik",
      "Willem van Oranje",
      "Johan van Oldenbarnevelt",
      "Alexander Farnese"
     ],
     "a": "Frederik Hendrik",
     "w": "Frederik Hendrik, de 'stedendwinger'.",
     "meer": "Hij veroverde onder meer 's-Hertogenbosch en Maastricht op de Spanjaarden.",
     "fout": {
      "Willem van Oranje": "Willem is hun vader en was al in 1584 vermoord.",
      "Johan van Oldenbarnevelt": "Hij was landsadvocaat, geen familie, en werd in 1619 onthoofd.",
      "Alexander Farnese": "Farnese stond aan de Spaanse kant: hij was landvoogd voor Filips II."
     }
    },
    {
     "t": "mc",
     "q": "Wie trouwde in 1477 met Maria van Bourgondië, waardoor de gewesten Habsburgs werden?",
     "o": [
      "Maximiliaan I",
      "Karel V",
      "Filips de Goede",
      "Filips II"
     ],
     "a": "Maximiliaan I",
     "w": "Maximiliaan I van Oostenrijk, een Habsburger.",
     "meer": "Huwelijkspolitiek: door dit huwelijk kwamen de Nederlanden in Habsburgse handen. Hun kleinzoon is Karel V.",
     "fout": {
      "Karel V": "Karel V is hun kleinzoon, geboren in 1500.",
      "Filips de Goede": "Filips de Goede is Maria's grootvader.",
      "Filips II": "Filips II leefde een eeuw later. Hij is de zoon van Karel V."
     }
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Nu zet je de mensen in de tijd. De heersers van de Nederlanden volgen elkaar op als een estafette: de Bourgondiërs (Filips de Stoute, Filips de Goede, Karel de Stoute, Maria), dan de Habsburgers (Maximiliaan, Filips de Schone, Karel V, Filips II).",
    "Aan de kant van de Opstand gaat het stokje van <b>Willem van Oranje</b> (tot 1584) naar <b>Maurits</b> (vanaf 1585) naar <b>Frederik Hendrik</b> (vanaf 1625).",
    "Elke vorst die ver weg woont, heeft hier een <b>plaatsvervanger</b> nodig. Bij Karel V is dat Margaretha van Oostenrijk, bij Filips II eerst Margaretha van Parma, dan Alva, dan Alexander Farnese."
   ],
   "regel": "Bourgondiërs, dan Habsburgers; Willem, dan Maurits, dan Frederik Hendrik.",
   "vragen": [
    {
     "t": "sequence",
     "q": "Zet deze heersers van de Nederlanden in de goede volgorde (oudste eerst).",
     "stappen": [
      "Filips de Stoute",
      "Filips de Goede",
      "Maria van Bourgondië",
      "Filips de Schone",
      "Karel V",
      "Filips II"
     ],
     "w": "Stoute, Goede, Maria, Schone, Karel V, Filips II.",
     "meer": "1384 Vlaanderen, 1464 Staten-Generaal, 1477 Groot Privilege, tot 1506 Filips de Schone, 1506-1555 Karel V, vanaf 1555 Filips II."
    },
    {
     "t": "sequence",
     "q": "Zet de landvoogden van Filips II in de goede volgorde.",
     "stappen": [
      "Margaretha van Parma",
      "de hertog van Alva",
      "Alexander Farnese"
     ],
     "w": "Margaretha tot 1567, dan Alva, later Farnese.",
     "meer": "Margaretha legde haar functie neer toen Alva kwam. Farnese kreeg de zuidelijke gewesten weer aan de Spaanse kant."
    },
    {
     "t": "sleep",
     "opgave": "Stadhouder, landvoogd of landsadvocaat?",
     "chips": [
      {
       "t": "Margaretha van Parma",
       "bak": "landvoogd",
       "waarom": "Zij vervangt Filips II in alle Nederlandse gewesten: landvoogdes."
      },
      {
       "t": "Maurits in Holland en Zeeland",
       "bak": "stadhouder",
       "waarom": "Maurits wordt stadhouder van Holland en Zeeland: per gewest."
      },
      {
       "t": "Johan van Oldenbarnevelt",
       "bak": "advocaat",
       "waarom": "Hij is de hoogste ambtenaar van de Staten van Holland: landsadvocaat."
      },
      {
       "t": "de hertog van Alva vanaf 1567",
       "bak": "landvoogd",
       "waarom": "Alva neemt de plaats van Margaretha in: landvoogd over alle gewesten."
      },
      {
       "t": "Margaretha van Oostenrijk",
       "bak": "landvoogd",
       "waarom": "Zij vervangt Karel V in alle gewesten: landvoogdes."
      },
      {
       "t": "een plaatsvervanger die Filips de Goede in één gewest aanstelt",
       "bak": "stadhouder",
       "waarom": "Eén gewest = stadhouder."
      }
     ],
     "bakjes": [
      {
       "id": "stadhouder",
       "label": "stadhouder (één gewest)",
       "som": "per gewest"
      },
      {
       "id": "landvoogd",
       "label": "landvoogd(es) (alle gewesten)",
       "som": "vervangt de vorst overal"
      },
      {
       "id": "advocaat",
       "label": "landsadvocaat (ambtenaar)",
       "som": "hoogste ambtenaar van de Staten"
      }
     ],
     "w": "Tel de gewesten: één is stadhouder, alle is landvoogd. Een ambtenaar is landsadvocaat.",
     "meer": "Na de Opstand is er geen vorst meer, dus ook geen landvoogd. De stadhouder blijft, maar werkt nu voor de Staten."
    },
    {
     "t": "mc",
     "q": "Waarom had Karel V een landvoogdes nodig in de Nederlanden?",
     "o": [
      "zijn rijk was zo groot dat hij het niet alleen kon besturen",
      "hij sprak geen Nederlands en mocht daarom van de gewesten niet zelf regeren",
      "de gewesten wilden geen man als bestuurder",
      "de paus had hem verboden in de Nederlanden te wonen"
     ],
     "a": "zijn rijk was zo groot dat hij het niet alleen kon besturen",
     "w": "Karel V was heer der Nederlanden, koning van Spanje, keizer, en baas over de Nieuwe Wereld: te veel voor één man.",
     "meer": "Daarom stelde hij zijn tante Margaretha van Oostenrijk aan als plaatsvervanger.",
     "fout": {
      "de gewesten wilden geen man als bestuurder": "Dat speelde niet. Het ging om de grootte van zijn rijk.",
      "de paus had hem verboden in de Nederlanden te wonen": "Daar is niets van waar. Hij kon gewoon niet overal tegelijk zijn.",
      "hij sprak geen Nederlands en mocht daarom van de gewesten niet zelf regeren": "Karel was juist in Gent geboren en opgegroeid in de Nederlanden."
     }
    },
    {
     "t": "mc",
     "q": "Wat hebben Filips de Goede (1464) en Karel V (1531) gemeen?",
     "o": [
      "allebei centraliseerden ze het bestuur van de Nederlanden",
      "allebei waren ze koning van Spanje",
      "allebei tekenden ze het Groot Privilege en gaven ze de gewesten hun rechten terug",
      "allebei werden ze afgezet door de Staten"
     ],
     "a": "allebei centraliseerden ze het bestuur van de Nederlanden",
     "w": "Filips de Goede met de Staten-Generaal en stadhouders, Karel V met de Collaterale Raden: allebei centralisatie.",
     "meer": "Dat is <b>continuïteit</b>: dezelfde lijn over meer dan honderd jaar. Filips II zette het door, en dat werd een oorzaak van de Opstand.",
     "fout": {
      "allebei waren ze koning van Spanje": "Filips de Goede was een Bourgondische hertog, geen koning van Spanje.",
      "allebei werden ze afgezet door de Staten": "Afzetten gebeurde pas met Filips II, in het Plakkaat van Verlatinghe (1581).",
      "allebei tekenden ze het Groot Privilege en gaven ze de gewesten hun rechten terug": "Dat deed Maria van Bourgondië in 1477, en het remde de centralisatie juist af."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Noem de overeenkomst en het verschil tussen een stadhouder en een landvoogd. (2p)",
     "tip": "Twee regels: 'Overeenkomst: ...' en 'Verschil: ...'.",
     "model": [
      {
       "label": "Overeenkomst",
       "tekst": "Overeenkomst: allebei zijn ze een plaatsvervanger van de vorst of heer."
      },
      {
       "label": "Verschil",
       "tekst": "Verschil: een stadhouder vervangt de heer in één gewest, een landvoogd in alle Nederlandse gewesten."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de overeenkomst: allebei plaatsvervanger.",
       "woorden": [
        "plaatsvervang",
        "vervang"
       ]
      },
      {
       "t": "Ik noem het verschil: één gewest tegenover alle gewesten.",
       "woorden": [
        "één",
        "een gewest",
        "alle"
       ]
      }
     ],
     "w": "Allebei plaatsvervanger; stadhouder voor één gewest, landvoogd voor alle.",
     "meer": "Dit vroeg het werkboek bij 4.3 opdracht 1b. Een overeenkomst-en-verschilvraag beantwoord je altijd in twee aparte regels."
    },
    {
     "t": "mc",
     "q": "Wie zette Luther in 1521 vogelvrij met het Edict van Worms?",
     "o": [
      "keizer Karel V",
      "paus Leo X",
      "keurvorst Frederik III",
      "paus Julius II"
     ],
     "a": "keizer Karel V",
     "w": "Het Edict van Worms was een keizerlijk bevel: van Karel V.",
     "meer": "De paus zette Luther uit de <b>kerk</b> (bul); de keizer zette hem buiten de <b>wet</b> (Edict).",
     "fout": {
      "paus Leo X": "Valkuil: de paus stuurde de bul en zette Luther uit de kerk. Het Edict van Worms kwam van de keizer.",
      "keurvorst Frederik III": "Frederik beschermde Luther juist en liet hem 'ontvoeren' naar de Wartburg.",
      "paus Julius II": "Julius II was in 1513 al overleden. Hij hoort bij de Sint-Pieter."
     }
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Op goud gebruik je de personen in een uitleg. Een vraag noemt dan een naam, en jij moet weten welke rol die persoon speelt en wat dat verklaart.",
    "Let op het verschil tussen <b>vorst</b> en <b>stadhouder</b> na de Opstand. De Republiek is een land <b>zonder vorst</b>. Toch komen de stadhouders steeds uit de familie Oranje-Nassau, en sommigen gedragen zich bijna als vorsten. Het stadhouderschap is <b>niet erfelijk</b>, maar in de praktijk blijft het in de familie.",
    "Bij twee mensen die tegenover elkaar staan, vraag je je af: wat wilde de één, wat wilde de ander, en waarom? Filips II en Willem, Maurits en Van Oldenbarnevelt, Luther en de paus."
   ],
   "regel": "De Republiek heeft geen vorst; de stadhouders uit de familie Oranje zijn geen koningen.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "De Republiek was een land zonder vorst. Toch kwamen de stadhouders steeds uit de familie Oranje-Nassau. Leg uit waarom dat geen koning is. (2p)",
     "tip": "Begin met wat een vorst is (erfelijk, staatshoofd). Zet daar de stadhouder tegenover.",
     "model": [
      {
       "label": "Vorst",
       "tekst": "Een vorst is het staatshoofd en geeft zijn macht door aan zijn kinderen (erfelijk)."
      },
      {
       "label": "Stadhouder",
       "tekst": "Een stadhouder in de Republiek werkte voor de Staten en het ambt was niet erfelijk. Daarom was hij geen koning, ook al kwamen ze steeds uit de familie Oranje."
      }
     ],
     "checklist": [
      {
       "t": "Ik leg uit wat een vorst is (staatshoofd, erfelijk).",
       "woorden": [
        "erf",
        "staatshoofd",
        "koning"
       ]
      },
      {
       "t": "Ik zeg dat het stadhouderschap niet erfelijk was en dat hij voor de Staten werkte.",
       "woorden": [
        "niet erfelijk",
        "staten"
       ]
      }
     ],
     "w": "Koning = erfelijk staatshoofd. Stadhouder = gekozen dienaar van de Staten, niet erfelijk.",
     "meer": "Het werkboek laat bij 4.5 zien dat Frederik Hendrik en Amalia van Solms zich graag als vorsten lieten schilderen. Dat was eigenlijk niet passend voor een stadhouder."
    },
    {
     "t": "mc",
     "q": "Filips II verklaarde Willem van Oranje vogelvrij. Wat zegt dat over hoe Filips Willem zag?",
     "o": [
      "als een verrader en vijand die buiten de wet stond",
      "als een trouwe edelman die bescherming verdiende",
      "als zijn opvolger als koning van Spanje",
      "als een ketter die door de paus en de inquisitie gestraft moest worden"
     ],
     "a": "als een verrader en vijand die buiten de wet stond",
     "w": "Vogelvrij = buiten de wet: iedereen mocht hem doden. Filips zag Willem als zijn grote vijand.",
     "meer": "Willem zag het zelf anders: in het Wilhelmus zegt hij dat hij de koning van Spanje altijd geëerd heeft. Twee perspectieven op één man.",
     "fout": {
      "als een trouwe edelman die bescherming verdiende": "Juist het omgekeerde: wie vogelvrij is, verliest alle rechtsbescherming.",
      "als zijn opvolger als koning van Spanje": "Willem was geen familie van Filips en geen opvolger.",
      "als een ketter die door de paus en de inquisitie gestraft moest worden": "Het was Filips zelf die hem buiten de wet zette, om politieke redenen: Willem leidde de Opstand."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "bron": {
      "titel": "Bron: twee portretten naast elkaar",
      "tekst": "Portret 1 (rond 1600): Maurits in een eenvoudig harnas, met een kaart van een belegerde stad op tafel. Portret 2 (rond 1620): Johan van Oldenbarnevelt in een zwart pak met een witte kraag, met een stapel papieren en een ganzenveer.",
      "onder": "Eigen beschrijving van twee portretten uit het begin van de 17e eeuw."
     },
     "q": "Leg met de bron uit welk verschil er was tussen het werk van Maurits en dat van Van Oldenbarnevelt. Gebruik de begrippen stadhouder en landsadvocaat. (3p)",
     "tip": "Per persoon één regel: het begrip, wat hij deed, en wat je daarvan in het portret ziet.",
     "model": [
      {
       "label": "Maurits",
       "tekst": "Maurits was stadhouder en leidde het Staatse leger. In het portret zie je een harnas en een kaart van een belegerde stad."
      },
      {
       "label": "Van Oldenbarnevelt",
       "tekst": "Van Oldenbarnevelt was landsadvocaat, de hoogste ambtenaar van de Staten. In het portret zie je papieren en een ganzenveer: hij deed de politiek."
      },
      {
       "label": "Verschil",
       "tekst": "Maurits deed dus vooral het leger, Van Oldenbarnevelt vooral het bestuur en de politiek."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem Maurits als stadhouder met het leger.",
       "woorden": [
        "stadhouder",
        "leger"
       ]
      },
      {
       "t": "Ik noem Van Oldenbarnevelt als landsadvocaat met de politiek.",
       "woorden": [
        "landsadvocaat",
        "politiek",
        "ambtenaar",
        "bestuur"
       ]
      },
      {
       "t": "Ik wijs voor allebei iets aan in de portretten.",
       "woorden": [
        "harnas",
        "kaart",
        "papier",
        "veer"
       ]
      }
     ],
     "w": "Stadhouder Maurits: leger (harnas, kaart). Landsadvocaat Van Oldenbarnevelt: politiek (papieren, veer).",
     "meer": "Een makker van een portret kiest bewust wat iemand vasthoudt. Dat zijn je elementen uit de bron."
    },
    {
     "t": "mc",
     "q": "Welke uitspraak over Karel V en Filips II is juist?",
     "o": [
      "Karel groeide op in de Nederlanden, Filips woonde in Spanje",
      "Filips groeide op in de Nederlanden, Karel woonde in Spanje",
      "allebei woonden ze hun hele leven in Brussel",
      "Filips II was de vader van Karel V"
     ],
     "a": "Karel groeide op in de Nederlanden, Filips woonde in Spanje",
     "w": "Karel V was in Gent geboren; Filips II bestuurde vanuit Spanje met Spaanse edelen.",
     "meer": "Daarom voelden veel Nederlanders Filips als een vreemde vorst, en klaagde het Smeekschrift over de vele vreemdelingen in het bestuur.",
     "fout": {
      "Filips groeide op in de Nederlanden, Karel woonde in Spanje": "Precies omgedraaid.",
      "allebei woonden ze hun hele leven in Brussel": "Brussel was de hoofdstad van de Nederlanden, maar Filips woonde in Spanje.",
      "Filips II was de vader van Karel V": "Omgekeerd: Karel V is de vader van Filips II."
     }
    },
    {
     "t": "mc",
     "q": "Wie hoort er <b>niet</b> bij de kant van de Opstand?",
     "o": [
      "Alexander Farnese",
      "Willem van Oranje",
      "Maurits",
      "Frederik Hendrik"
     ],
     "a": "Alexander Farnese",
     "w": "Farnese was de Spaanse landvoogd na Alva.",
     "meer": "Hij kreeg de katholieke zuidelijke gewesten weer aan de Spaanse kant en veroverde in 1585 Antwerpen.",
     "fout": {
      "Willem van Oranje": "Willem was juist de leider van de Opstand.",
      "Maurits": "Maurits leidde het Staatse leger tegen de Spanjaarden.",
      "Frederik Hendrik": "Frederik Hendrik veroverde als stedendwinger steden op de Spanjaarden."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Luther werd uit de kerk gezet én buiten de wet geplaatst. Leg uit wie wat deed, en waarom dat twee verschillende straffen zijn. (3p)",
     "tip": "Twee personen, twee straffen: paus en keizer. Zeg bij elk wát het betekende.",
     "model": [
      {
       "label": "De paus",
       "tekst": "Paus Leo X stuurde Luther een bul. Toen Luther die verbrandde, zette de paus hem uit de kerk."
      },
      {
       "label": "De keizer",
       "tekst": "Keizer Karel V vaardigde in 1521 het Edict van Worms uit, waarmee Luther vogelvrij werd verklaard."
      },
      {
       "label": "Het verschil",
       "tekst": "De paus is de leider van de kerk en straft binnen het geloof; de keizer is het wereldlijk gezag en zet iemand buiten de wet, zodat hij geen rechtsbescherming meer heeft."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de paus (Leo X) en de bul of de ban uit de kerk.",
       "woorden": [
        "paus",
        "bul",
        "kerk"
       ]
      },
      {
       "t": "Ik noem de keizer (Karel V) en het Edict van Worms.",
       "woorden": [
        "karel",
        "keizer",
        "edict",
        "worms"
       ]
      },
      {
       "t": "Ik leg het verschil uit: kerk tegenover wereldlijke wet.",
       "woorden": [
        "vogelvrij",
        "wet",
        "wereldlijk"
       ]
      }
     ],
     "w": "Paus: uit de kerk. Keizer: buiten de wet (vogelvrij).",
     "meer": "Dit is een van de valkuilen van 3.5: de bul en het Edict van Worms door elkaar halen."
    }
   ]
  }
 ]
},
{
 "id": "tijdlijn",
 "emoji": "📅",
 "titel": "De tijdlijn: van Luther tot de Gouden Eeuw",
 "paragraaf": "alle §",
 "kort": "Alle jaartallen van de zes paragrafen in één lijn, met twee draden (geloof en bestuur) die in 1566 samenkomen.",
 "niveaus": [
  {
   "n": 1,
   "naam": "Brons",
   "uitleg": [
    "Er lopen twee draden door deze stof, en ze komen in <b>1566</b> samen.",
    "<b>De draad van het bestuur:</b> 1384 Filips de Stoute krijgt Vlaanderen. 1464 eerste Staten-Generaal. 1477 Groot Privilege en het huwelijk van Maria met Maximiliaan. 1482 Habsburgse Nederlanden. 1506 Karel V heer der Nederlanden. 1516 koning van Spanje, 1519 keizer. 1531 Collaterale Raden. 1555 Filips II.",
    "<b>De draad van het geloof:</b> 1506 Julius II wil de Sint-Pieter verfraaien. 1517 Luthers 95 stellingen. 1521 rijksdag van Worms. 1523 de eerste brandstapels in Brussel. 1550 bloedplakkaat. 1555 Vrede van Augsburg.",
    "<b>Samen:</b> 1566 Smeekschrift en Beeldenstorm. 1567 Alva. 1568 begin van de Opstand. 1572 Den Briel. 1579 noord en zuid splitsen. 1581 Plakkaat van Verlatinghe. 1584 moord op Willem. 1585 val van Antwerpen. 1588 Armada en de Republiek. 1602 VOC. 1609 wisselbank en Twaalfjarig Bestand. 1621 einde Bestand en de WIC. 1628 de zilvervloot. 1648 Vrede van Münster."
   ],
   "regel": "Twee draden: bestuur en geloof. In 1566 komen ze samen.",
   "voorbeelden": [
    {
     "en": "1555 komt twee keer voor",
     "let": "Vrede van Augsburg én Filips II volgt Karel V op."
    },
    {
     "en": "1588 komt twee keer voor",
     "let": "De Spaanse Armada mislukt én de Republiek begint."
    },
    {
     "en": "1621 komt twee keer voor",
     "let": "Het Twaalfjarig Bestand eindigt én de WIC wordt opgericht."
    }
   ],
   "vragen": [
    {
     "t": "gap",
     "q": "Luther publiceerde zijn 95 stellingen in ___.",
     "a": "1517|in 1517",
     "w": "1517: het begin van de Reformatie.",
     "meer": "Hervormingsdag is nog steeds op 31 oktober."
    },
    {
     "t": "gap",
     "q": "De eerste Staten-Generaal kwam bijeen in ___.",
     "a": "1464|in 1464",
     "w": "1464, onder Filips de Goede.",
     "meer": "Zestien-vier-en-zestig: de gewesten voor het eerst samen in één vergadering."
    },
    {
     "t": "gap",
     "q": "Maria van Bourgondië tekende het Groot Privilege in ___.",
     "a": "1477|in 1477",
     "w": "1477.",
     "meer": "Datzelfde jaar trouwde ze met Maximiliaan I."
    },
    {
     "t": "gap",
     "q": "De Vrede van Münster, het einde van de Opstand, was in ___.",
     "a": "1648|in 1648",
     "w": "1648.",
     "meer": "1568 tot 1648: daarom heet het de Tachtigjarige Oorlog, met een Bestand van twaalf jaar ertussen."
    },
    {
     "t": "gap",
     "q": "De VOC werd opgericht in ___.",
     "a": "1602|in 1602",
     "w": "1602.",
     "meer": "De WIC volgde in 1621."
    },
    {
     "t": "mc",
     "q": "Welke twee gebeurtenissen vallen allebei in 1621?",
     "o": [
      "het einde van het Twaalfjarig Bestand en de oprichting van de WIC",
      "de oprichting van de VOC en de wisselbank",
      "de Armada en de Republiek",
      "de Vrede van Augsburg en de troonsafstand van keizer Karel V in Brussel"
     ],
     "a": "het einde van het Twaalfjarig Bestand en de oprichting van de WIC",
     "w": "1621: de oorlog begint weer, en de WIC wordt meteen een wapen tegen Spanje.",
     "meer": "Geen toeval: zodra het Bestand voorbij was, wilde de Republiek Spanje ook op zee en in Amerika dwarszitten (kaapvaart).",
     "fout": {
      "de oprichting van de VOC en de wisselbank": "VOC is 1602, de wisselbank 1609.",
      "de Armada en de Republiek": "Die vallen allebei in 1588.",
      "de Vrede van Augsburg en de troonsafstand van keizer Karel V in Brussel": "Die vallen allebei in 1555."
     }
    },
    {
     "t": "mc",
     "q": "Wat gebeurde er in 1588?",
     "o": [
      "de Spaanse Armada mislukte en de Republiek begon",
      "de Beeldenstorm en het Smeekschrift",
      "de moord op Willem van Oranje in het Prinsenhof in Delft",
      "de Vrede van Münster werd getekend"
     ],
     "a": "de Spaanse Armada mislukte en de Republiek begon",
     "w": "1588 heeft er twee: Armada en Republiek.",
     "meer": "Handig om samen te onthouden: in hetzelfde jaar dat Spanje op zee verloor, begonnen de noordelijke gewesten hun eigen staat.",
     "fout": {
      "de Beeldenstorm en het Smeekschrift": "Dat is 1566.",
      "de Vrede van Münster werd getekend": "Dat is 1648.",
      "de moord op Willem van Oranje in het Prinsenhof in Delft": "Dat is 1584."
     }
    },
    {
     "t": "gap",
     "q": "Karel V stelde de drie Collaterale Raden in, in ___.",
     "a": "1531|in 1531",
     "w": "1531.",
     "meer": "Geheime Raad, Raad van State en Raad van Financiën."
    },
    {
     "t": "gap",
     "q": "De watergeuzen namen Den Briel in op 1 april ___.",
     "a": "1572",
     "w": "1572.",
     "meer": "'Op 1 april verloor Alva zijn bril.'"
    }
   ]
  },
  {
   "n": 2,
   "naam": "Zilver",
   "uitleg": [
    "Een tijdlijn is meer dan een rijtje: hij laat zien wat oorzaak en wat gevolg is. <b>Wat eerder komt, kan een oorzaak zijn; wat later komt, nooit.</b>",
    "Bij een chronologievraag uit het werkboek krijg je vaak bronnen zonder jaartal. Zoek dan in de bron naar een aanwijzing: een naam (Alva? dan na 1567), een gebeurtenis (een republiek? dan na 1588), of een begrip.",
    "Oefen de grote sprongen: 1517 Luther, 1555 Filips II, 1566 Beeldenstorm, 1568 Opstand, 1588 Republiek, 1648 Münster."
   ],
   "regel": "Wat later gebeurt, kan nooit de oorzaak zijn van iets wat eerder gebeurde.",
   "vragen": [
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Luther publiceert 95 stellingen",
      "rijksdag van Worms",
      "bloedplakkaat van Karel V",
      "Vrede van Augsburg",
      "Beeldenstorm"
     ],
     "w": "1517, 1521, 1550, 1555, 1566.",
     "meer": "Dit is de geloofsdraad: van Luthers kritiek naar de uitbarsting in de Nederlanden."
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Filips de Stoute krijgt Vlaanderen",
      "eerste Staten-Generaal",
      "Groot Privilege",
      "Collaterale Raden",
      "Filips II volgt Karel V op"
     ],
     "w": "1384, 1464, 1477, 1531, 1555.",
     "meer": "Dit is de bestuursdraad: steeds meer centralisatie, met het Groot Privilege als rem."
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "Alva komt naar de Nederlanden",
      "slag bij Heiligerlee",
      "inname van Den Briel",
      "Plakkaat van Verlatinghe",
      "moord op Willem van Oranje"
     ],
     "w": "1567, 1568, 1572, 1581, 1584.",
     "meer": "Let op: het Plakkaat (1581) is vóór de moord op Willem (1584)."
    },
    {
     "t": "sequence",
     "q": "Zet in de goede volgorde (oudste eerst).",
     "stappen": [
      "val van Antwerpen",
      "oprichting van de VOC",
      "begin Twaalfjarig Bestand",
      "oprichting van de WIC",
      "Vrede van Münster"
     ],
     "w": "1585, 1602, 1609, 1621, 1648.",
     "meer": "De val van Antwerpen stuurt de handel naar Amsterdam: het begin van de Gouden Eeuw."
    },
    {
     "t": "mc",
     "q": "Een bron noemt 'de hertog van Alva, landvoogd'. Wat weet je dan over het jaar van de bron?",
     "o": [
      "het is 1567 of later",
      "het is vóór 1555",
      "het is precies 1566, het jaar van de Beeldenstorm",
      "het is na 1648"
     ],
     "a": "het is 1567 of later",
     "w": "Alva werd in 1567 landvoogd. Een bron die hem zo noemt, is niet ouder.",
     "meer": "Zo dateer je een bron zonder jaartal: zoek een naam of begrip waarvan je het jaar weet.",
     "fout": {
      "het is vóór 1555": "Toen regeerde Karel V nog. Alva kwam pas in 1567 als landvoogd.",
      "het is na 1648": "Kan in theorie (iemand schrijft later over Alva), maar het zekere antwoord is: 1567 of later. Na 1648 is veel te precies.",
      "het is precies 1566, het jaar van de Beeldenstorm": "In 1566 was Margaretha nog landvoogdes. Alva kwam een jaar later."
     }
    },
    {
     "t": "mc",
     "q": "Kan de Tiende Penning (1569) een oorzaak zijn van de Beeldenstorm (1566)?",
     "o": [
      "nee, want hij kwam later",
      "ja, want het is een economische oorzaak",
      "ja, want Alva had hem al aangekondigd",
      "nee, want de Tiende Penning bestond niet echt"
     ],
     "a": "nee, want hij kwam later",
     "w": "Iets wat later gebeurt, kan nooit een oorzaak zijn van iets wat eerder gebeurde.",
     "meer": "De Tiende Penning is juist een <b>gevolg</b> van de Beeldenstorm: Alva wilde de Nederlanden ook economisch straffen.",
     "fout": {
      "ja, want het is een economische oorzaak": "Het soort maakt niet uit: eerst moet de volgorde kloppen. 1569 is na 1566.",
      "ja, want Alva had hem al aangekondigd": "Alva was in 1566 nog niet eens in de Nederlanden.",
      "nee, want de Tiende Penning bestond niet echt": "Hij bestond wel: 10% belasting op de verkoop van goederen. Het antwoord is nee omdat hij later kwam."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T1",
     "q": "Leg uit waarom 1566 een kantelpunt is in deze stof. Gebruik een gebeurtenis van ervóór en een van erna. (2p)",
     "tip": "Kantelpunt: zeg hoe het ervoor ging en hoe het erna ging, met 1566 als het moment ertussen.",
     "model": [
      {
       "label": "Ervoor",
       "tekst": "Vóór 1566 werden de protestanten vervolgd met bloedplakkaten, maar was er nog geen openlijk verzet."
      },
      {
       "label": "1566 en erna",
       "tekst": "In 1566 kwamen het Smeekschrift en de Beeldenstorm. Daardoor stuurde Filips Alva en begon in 1568 de Opstand."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem iets van vóór 1566 (vervolging, bloedplakkaten).",
       "woorden": [
        "plakkaat",
        "vervolg",
        "inquisitie",
        "1550"
       ]
      },
      {
       "t": "Ik noem wat er in 1566 gebeurde.",
       "woorden": [
        "beeldenstorm",
        "smeekschrift"
       ]
      },
      {
       "t": "Ik noem wat er daardoor gebeurde (Alva, de Opstand).",
       "woorden": [
        "alva",
        "opstand",
        "1568"
       ]
      }
     ],
     "w": "Voor 1566 vervolging zonder verzet; vanaf 1566 de uitbarsting en daarna de Opstand.",
     "meer": "In 1566 komen de geloofsdraad en de bestuursdraad samen. Daarom is het het belangrijkste jaartal van het hele pakket."
    }
   ]
  },
  {
   "n": 3,
   "naam": "Goud",
   "uitleg": [
    "Op goud gebruik je de tijdlijn om een groot verhaal te vertellen: hoe komt een gewone handelsstad als Amsterdam aan de rijkste haven van de wereld? Het antwoord begint al bij de Opstand.",
    "In 1585 veroveren de Spanjaarden <b>Antwerpen</b>, tot dan toe de grootste handelsstad. Veel kooplieden, vaak protestants, vluchten naar het noorden. De handel verplaatst zich naar <b>Amsterdam</b>, waar de stapelmarkt, de wisselbank (1609) en de beurs komen. Met de VOC (1602) en de WIC (1621) gaat de handel de hele wereld over: de <b>Gouden Eeuw</b>.",
    "Zo is de rode draad compleet: Luther breekt de eenheid van de kerk; Bourgondiërs en Habsburgers proberen de gewesten tot één staat te smeden; onder Filips II komen geloofsvervolging en centralisatie samen; in 1566 ontploft het; het noorden wint een eigen staat; en de handel die na de val van Antwerpen naar Amsterdam trekt, maakt die Republiek rijk."
   ],
   "regel": "Val van Antwerpen (1585): de handel trekt naar Amsterdam, het begin van de Gouden Eeuw.",
   "vragen": [
    {
     "t": "formuleer",
     "rtti": "I",
     "q": "Leg uit hoe de val van Antwerpen (1585) een oorzaak was van de Gouden Eeuw van Amsterdam. (3p)",
     "tip": "Drie stappen: wat er met Antwerpen gebeurde, wat de handelaren deden, en wat Amsterdam daardoor kreeg.",
     "model": [
      {
       "label": "Wat er gebeurde",
       "tekst": "In 1585 veroverden de Spanjaarden de handelsstad Antwerpen."
      },
      {
       "label": "Daardoor",
       "tekst": "Daardoor verplaatste de handel zich naar Amsterdam, en veel kooplieden trokken naar het noorden."
      },
      {
       "label": "Gevolg",
       "tekst": "Amsterdam kreeg de stapelmarkt, de wisselbank en de beurs en werd het centrum van de handel. Die rijkdom heet de Gouden Eeuw."
      }
     ],
     "checklist": [
      {
       "t": "Ik noem de verovering van Antwerpen door de Spanjaarden.",
       "woorden": [
        "antwerpen",
        "spanj"
       ]
      },
      {
       "t": "Ik zeg dat de handel naar Amsterdam trok.",
       "woorden": [
        "amsterdam",
        "handel"
       ]
      },
      {
       "t": "Ik noem wat Amsterdam rijk maakte (stapelmarkt, wisselbank, beurs).",
       "woorden": [
        "stapelmarkt",
        "wisselbank",
        "beurs"
       ]
      },
      {
       "t": "Ik gebruik een verbandwoord.",
       "woorden": [
        "daardoor",
        "waardoor",
        "doordat"
       ]
      }
     ],
     "w": "Het verlies van Antwerpen was de winst van Amsterdam.",
     "meer": "Dit is de brug tussen de Opstand (4.5) en de Gouden Eeuw (5.2). Een toetsvraag kan precies hierover gaan."
    },
    {
     "t": "sequence",
     "q": "Zet de rode draad in de goede volgorde.",
     "stappen": [
      "Luther breekt de eenheid van de kerk",
      "de calvinisten groeien in de Nederlanden en worden vervolgd",
      "Beeldenstorm en daarna Alva",
      "het noorden wordt een republiek zonder vorst",
      "de handel trekt naar Amsterdam: de Gouden Eeuw"
     ],
     "w": "Kerk, vervolging, uitbarsting, eigen staat, rijkdom.",
     "meer": "1517, 1550, 1566-1567, 1588, 1585-1648. Vertel dit verhaal hardop aan iemand thuis: dan weet je of je het snapt."
    },
    {
     "t": "mc",
     "q": "Welke uitspraak over de 'Tachtigjarige' Oorlog is juist?",
     "o": [
      "er was een wapenstilstand van twaalf jaar tussendoor",
      "er werd tachtig jaar lang, van 1568 tot 1648, elke dag gevochten",
      "de oorlog begon in 1588 met de Armada",
      "de oorlog eindigde in 1621 met de WIC"
     ],
     "a": "er was een wapenstilstand van twaalf jaar tussendoor",
     "w": "Het Twaalfjarig Bestand (1609-1621) was een pauze in de oorlog.",
     "meer": "Valkuil: denken dat er tachtig jaar onafgebroken oorlog was. De oorlog liep van 1568 tot 1648, met het Bestand ertussen.",
     "fout": {
      "de oorlog begon in 1588 met de Armada": "De Opstand begon in 1568. 1588 is de Armada en de Republiek.",
      "de oorlog eindigde in 1621 met de WIC": "In 1621 eindigde het Bestand: de oorlog begon toen juist weer. Het einde is 1648, Münster.",
      "er werd tachtig jaar lang, van 1568 tot 1648, elke dag gevochten": "Nee, van 1609 tot 1621 was er een wapenstilstand: het Twaalfjarig Bestand."
     }
    },
    {
     "t": "formuleer",
     "rtti": "T2",
     "q": "Geef een voorbeeld van continuïteit en een voorbeeld van verandering tussen de Bourgondische tijd (1464) en de Republiek (1588). (2p)",
     "tip": "Continuïteit = wat bleef hetzelfde. Verandering = wat werd anders. Twee regels.",
     "model": [
      {
       "label": "Continuïteit",
       "tekst": "Continuïteit: er bleef een Staten-Generaal waarin de gewesten samen vergaderden."
      },
      {
       "label": "Verandering",
       "tekst": "Verandering: in 1464 was er een vorst (Filips de Goede) die de baas was, in de Republiek was er geen vorst meer en hadden de Staten de macht."
      }
     ],
     "checklist": [
      {
       "t": "Ik geef iets wat hetzelfde bleef (bv. de Staten-Generaal of de eigenwijze gewesten).",
       "woorden": [
        "staten",
        "gewest",
        "bleef",
        "zelfde"
       ]
      },
      {
       "t": "Ik geef iets wat anders werd (geen vorst meer).",
       "woorden": [
        "vorst",
        "koning",
        "republiek",
        "anders"
       ]
      },
      {
       "t": "Ik zet ze op twee regels met het woord ervoor.",
       "woorden": [
        "continu",
        "verander"
       ]
      }
     ],
     "w": "De Staten-Generaal bleef; de vorst verdween.",
     "meer": "Ook goed als continuïteit: de gewesten bleven veel zelfstandigheid houden (particularisme). In de Republiek hielden ze 'veel zelfstandigheid', zegt het werkboek."
    },
    {
     "t": "mc",
     "q": "Welk jaartal hoort <b>niet</b> bij Karel V?",
     "o": [
      "1584",
      "1516",
      "1519",
      "1531"
     ],
     "a": "1584",
     "w": "1584 is de moord op Willem van Oranje. Karel V stierf al in 1558.",
     "meer": "Karel V: 1506 heer, 1516 koning van Spanje, 1519 keizer, 1521 Worms, 1531 Collaterale Raden, 1550 bloedplakkaat, 1555 aftreden.",
     "fout": {
      "1516": "In 1516 werd Karel V koning van Spanje.",
      "1519": "In 1519 werd Karel V Duits keizer.",
      "1531": "In 1531 stelde Karel V de Collaterale Raden in."
     }
    },
    {
     "t": "mc",
     "q": "De Vrede van Augsburg (1555) en de Vrede van Münster (1648): wat is het verschil?",
     "o": [
      "Augsburg ging over het geloof in Duitsland, Münster maakte een eind aan de Opstand",
      "Augsburg maakte een eind aan de Opstand, Münster ging over Duitsland",
      "allebei gaven ze iedereen in Europa voortaan volledige godsdienstvrijheid",
      "allebei werden ze getekend door Filips II"
     ],
     "a": "Augsburg ging over het geloof in Duitsland, Münster maakte een eind aan de Opstand",
     "w": "Augsburg: de vorst kiest het geloof van zijn gebied. Münster: Spanje erkent de Republiek.",
     "meer": "Twee vredes, bijna een eeuw uit elkaar. Bij allebei verliest de katholieke Habsburger: Karel V in Duitsland, Spanje in de Nederlanden.",
     "fout": {
      "Augsburg maakte een eind aan de Opstand, Münster ging over Duitsland": "Precies omgedraaid.",
      "allebei werden ze getekend door Filips II": "Augsburg hoort bij Karel V, en in 1648 was Filips II al lang dood.",
      "allebei gaven ze iedereen in Europa voortaan volledige godsdienstvrijheid": "Valkuil: Augsburg gaf alleen de vorst de keus, niet iedereen."
     }
    }
   ]
  }
 ]
}
);

/* ===== koppelingen: films (FILM_PER_ONDERWERP) en extra kijken (EXTRA_KIJKEN) per onderwerp ===== */
window.LEERSTOF.forEach(function (g) {
  var v = (window.FILM_PER_ONDERWERP || {})[g.id]; if (v) g.video = v;
  var p = String(g.paragraaf || "").replace("§", "");
  if (!g.extra && window.EXTRA_KIJKEN && window.EXTRA_KIJKEN[p]) g.extra = window.EXTRA_KIJKEN[p];
});

/* ===== BEGRIPPEN: letterlijke werkboekdefinities [definitie, begrip] per paragraaf ===== */
window.BEGRIPPEN = {
 "p35": {
  "emoji": "✝️",
  "titel": "3.5 Luther en de kerkelijke scheuring",
  "paragraaf": "§3.5",
  "items": [
   [
    "Leider van de katholieke (christelijke) kerk",
    "Paus"
   ],
   [
    "Een verzamelnaam voor alle mensen die een functie hebben in de (rooms-)katholieke kerk.",
    "geestelijken"
   ],
   [
    "Geestelijke die in een klooster woont en zijn leven wijdt aan God.",
    "monnik"
   ],
   [
    "Document dat gekocht kon worden voor kwijtschelding van zonden.",
    "aflaat"
   ],
   [
    "Geestelijke die leiding geeft aan een bisdom, een kerkelijk gebied",
    "bisschop"
   ],
   [
    "Iemand die zich niet houdt aan de officiële katholieke leer",
    "ketter"
   ],
   [
    "De splitsing in de christelijke kerk in een rooms-katholiek en een protestants deel als gevolg van het optreden van Luther en andere kerkhervormers in de 16e eeuw.",
    "Reformatie (Hervorming)"
   ],
   [
    "Aanhangers van de christelijke richting die zich afscheidt van de katholieke kerk",
    "protestanten"
   ],
   [
    "Aanhangers van de (rooms-)katholieke godsdienst",
    "katholieken"
   ],
   [
    "Duits rijk dat ontstaat in de Middeleeuwen en bestaat tot 1806",
    "Heilige Roomse Rijk"
   ],
   [
    "Duitse vorst die het recht heeft om met zes andere keurvorsten de keizer te kiezen.",
    "keurvorst"
   ],
   [
    "Vergadering van alle vorsten van het Heilige Roomse Rijk.",
    "rijksdag"
   ],
   [
    "Het keizerlijk bevel tot wereldlijke verbanning van Luther",
    "Edict van Worms"
   ],
   [
    "Een persoon die buiten de wet geplaatst wordt en alle rechtsbescherming verliest",
    "vogelvrij"
   ],
   [
    "Vrede uit 1555 tussen de katholieke Duitse keizer Karel V en enkele protestantse Duitse vorsten waarin werd bepaald dat de vorst het geloof in zijn gebied mocht bepalen.",
    "Vrede van Augsburg"
   ],
   [
    "De 95 stellingen bieden een uitvoerig puntsgewijs overzicht van de kritiek die Luther heeft op de kerk. Hij wil met deze 95 stellingen bereiken dat de kerk hervormt.",
    "95 stellingen"
   ],
   [
    "De bul die paus Leo X schrijft om Luther als gelovige en voormalig monnik tot de orde te roepen. Luther verbrandt deze bul, samen met het pauselijk wetboek.",
    "pauselijke bul"
   ],
   [
    "Frederik III ‘de Wijze’, keurvorst van de Duitse provincie Saksen, is een voorstander van de Reformatie. Hij biedt Luther bescherming op de momenten dat diens leven in gevaar is vanwege zijn ban uit kerk en wereld.",
    "Frederik III de Wijze"
   ],
   [
    "De Wartburg is in 1521 in handen van de Saksische keurvorst Frederik III. In dit kasteel wordt Luther een aantal jaren voor zijn eigen veiligheid opgeborgen.",
    "de Wartburg"
   ],
   [
    "Monnik en leraar uit Wittenberg (1483-1546) die in 1517 zijn 95 stellingen schreef; een van de grote leiders van de Reformatie.",
    "Maarten Luther"
   ],
   [
    "De paus die in 1506 de Sint-Pieterbasiliek wilde verfraaien, betaald met de aflaathandel.",
    "Julius II"
   ],
   [
    "De paus die Luthers kritiek niet accepteerde en hem een bul stuurde.",
    "Leo X"
   ],
   [
    "Duitse aflaatprediker die aflaten verkocht voor de Sint-Pieter; Luther was vooral fel tegen hem.",
    "Johann Tetzel"
   ]
  ]
 },
 "p42": {
  "emoji": "🛡️",
  "titel": "4.2 Bourgondiërs en gewesten",
  "paragraaf": "§4.2",
  "items": [
   [
    "Bestuurlijke eenheid van een land",
    "gewest"
   ],
   [
    "Bijzondere rechten die door de 'heer' van een gewest worden verleend",
    "privileges"
   ],
   [
    "Het streven van de gewesten en steden in de Nederlanden om hun zelfstandigheid te behouden.",
    "particularisme"
   ],
   [
    "Het streven van vorsten naar één centraal bestuur met overal dezelfde wetten en regels.",
    "centralisatie"
   ],
   [
    "Staat waar overal dezelfde wetten en regels gelden",
    "nationale staat"
   ],
   [
    "Het regelen van een huwelijk om zo familiebezit en macht uit te kunnen breiden",
    "huwelijkspolitiek"
   ],
   [
    "Periode waarin de Nederlandse gewesten onder leiding staan van de Bourgondische hertogen",
    "Bourgondische tijd"
   ],
   [
    "Benaming voor de Nederlandse gewesten in de Habsburgse tijd",
    "Habsburgse Nederlanden"
   ],
   [
    "Plaatsvervanger van de heer binnen een gewest.",
    "stadhouder"
   ],
   [
    "Vergadering van het bestuur van een gewest",
    "Statenvergadering"
   ],
   [
    "Tussen 1464 en 1796 de benaming voor de gezamenlijke vergadering van de verschillende Statenvergaderingen van de verschillende gewesten. Sinds 1814 de benaming voor het parlement/de volksvertegenwoordiging van Nederland bestaande uit de Eerste Kamer en Tweede Kamer.",
    "Staten-Generaal"
   ],
   [
    "Een officieel verzoek om geld of om belasting te mogen heffen",
    "bede"
   ],
   [
    "De periode van duizend jaar (500 - 1500) tussen de val van het West-Romeinse Rijk en het ontstaan van de Renaissance",
    "Middeleeuwen"
   ],
   [
    "Bourgondische hertog die dankzij zijn huwelijk met Margaretha van Male in 1384 het gewest Vlaanderen in handen krijgt.",
    "Filips de Stoute"
   ],
   [
    "Bourgondische hertog, kleinzoon van Filips de Stoute. Hij probeert door middel van centralisatie steeds meer invloed te krijgen in de Nederlandse gewesten.",
    "Filips de Goede"
   ],
   [
    "Kleindochter van Filips de Goede; zij wordt in 1477 hertogin van Bourgondië als haar vader Karel de Stoute onverwacht sneuvelt.",
    "Maria van Bourgondië"
   ],
   [
    "Het privilege dat Maria van Bourgondië in 1477 aan de Nederlandse gewesten geeft: de gewesten behouden hun vrijheid en invloed en beloven haar trouw.",
    "Groot Privilege"
   ],
   [
    "Habsburger uit Oostenrijk die trouwt met Maria van Bourgondië, waardoor Bourgondië en haar zeventien Nederlandse gewesten bij het Habsburgse rijk gaan horen.",
    "Maximiliaan I"
   ]
  ]
 },
 "p43": {
  "emoji": "👑",
  "titel": "4.3 Keizer Karel V",
  "paragraaf": "§4.3",
  "items": [
   [
    "Centrale adviesraden, ingesteld door Karel V, ter bevordering van de centralisatie van de Nederlanden",
    "Collaterale Raden"
   ],
   [
    "Plaatsvervang(st)er van de vorst in alle Nederlandse gewesten.",
    "landvoogd(es)"
   ],
   [
    "Volgelingen van Maarten Luther",
    "lutheranen"
   ],
   [
    "Volgelingen van Johannes Calvijn",
    "calvinisten"
   ],
   [
    "Rechtbank van de katholieke kerk voor het opsporen en bestrijden van ketterij",
    "inquisitie"
   ],
   [
    "Proces waarbij personen of groepen worden achtervolgd, opgepakt en gestraft",
    "vervolgd worden"
   ],
   [
    "Een op een vel papier gedrukte wet, vooral tegen ketters",
    "bloedplakkaat"
   ],
   [
    "Naam voor de gebieden die vanaf 1492 in Noord-, Midden- en Zuid-Amerika worden ontdekt",
    "De Nieuwe Wereld"
   ],
   [
    "Zoon van Maximiliaan I en Maria van Bourgondië; als landsheer bestuurde hij de Habsburgse Nederlanden tussen 1482 en 1506. Vader van Karel V.",
    "Filips de Schone"
   ],
   [
    "Heer der Nederlanden (1506), koning van Spanje (1516) en Duits keizer (1519). De Nederlandse gewesten worden door hem gereorganiseerd, onder meer met de drie Collaterale Raden.",
    "Karel V"
   ],
   [
    "De tante van Karel V, die hij als zijn plaatsvervanger of landvoogdes benoemt over de Nederlandse gewesten.",
    "Margaretha van Oostenrijk"
   ],
   [
    "Fransman die in navolging van Luther een grote bijdrage leverde aan de Reformatie. In Nederland kreeg het calvinisme veel aanhangers.",
    "Johannes Calvijn"
   ],
   [
    "In 1555 treedt Filips II aan als koning van Spanje. Hij volgt zijn vader Karel V op en erft veel gebieden, waaronder de Nederlanden.",
    "Filips II"
   ]
  ]
 },
 "p44": {
  "emoji": "🔥",
  "titel": "4.4 Een onrustige opstand",
  "paragraaf": "§4.4",
  "items": [
   [
    "Waardoor iets gebeurt of wat ten grondslag ligt aan een gebeurtenis, een ontwikkeling of verschijnsel",
    "oorzaak"
   ],
   [
    "In 1566 schrijven ongeveer 200 Nederlandse lage edelen een zeer beleefde maar dringende brief aan Filips II. Daarin vragen zij hem om een mildere behandeling van protestanten.",
    "Smeekschrift der edelen"
   ],
   [
    "opstandeling in de tijd van de Nederlandse Opstand. Zie ook watergeus.",
    "geus"
   ],
   [
    "godsdienstige bijeenkomst in het open veld, geleid door een calvinistisch predikant",
    "hagenpreek"
   ],
   [
    "Uitbarsting onder het (calvinistische) volk in het jaar 1566, waarbij kerken en kloosters ontdaan werden van katholieke versieringen.",
    "Beeldenstorm"
   ],
   [
    "Rechtbank door Alva ingesteld om de beeldenstormers en de verantwoordelijken hiervoor te straffen.",
    "Raad van Beroerten"
   ],
   [
    "Een vaste belasting van 10% op de verkoop van roerende goederen en winsten uit ondernemingen.",
    "Tiende Penning"
   ],
   [
    "Opstand van de Nederlandse gewesten tegen het Spaans gezag tussen 1568 en 1648. Zie ook Tachtigjarige Oorlog.",
    "Nederlandse Opstand"
   ],
   [
    "opstand van de Nederlandse gewesten tegen het Spaans gezag tussen 1568 en 1648. Zie ook Nederlandse Opstand",
    "Tachtigjarige Oorlog"
   ],
   [
    "opstandeling in de tijd van de Nederlandse Opstand. Zie ook geus",
    "watergeus"
   ],
   [
    "Opstand binnen landleger of scheepsbemanning tegen het gezag.",
    "muiterij"
   ],
   [
    "Besluit uit 1581 van de Staten-Generaal om Filips II niet langer te erkennen als vorst.",
    "Plakkaat van Verlatinghe"
   ],
   [
    "Officiële volledige naam van Nederland tussen 1588 en 1795, meestal afgekort tot De Republiek",
    "Republiek der Zeven Verenigde Nederlanden"
   ],
   [
    "Margaretha van Parma is een halfzus van Filips II. Hij stuurt haar als zijn landvoogdes naar Brussel om van daaruit de Nederlanden te besturen.",
    "Margaretha van Parma"
   ],
   [
    "De hertog van Alva wordt door Filips II met een leger naar de Nederlanden gestuurd. Doel: daar orde op zaken stellen na het uitbreken van de Beeldenstorm.",
    "hertog van Alva"
   ],
   [
    "Willem van Oranje is één van de belangrijkste edelen in de Nederlanden. Hij besluit zich tegen de hertog van Alva te verzetten en wordt leider van de Nederlandse Opstand.",
    "Willem van Oranje"
   ],
   [
    "Fanatieke katholiek die Willem van Oranje in 1584 in Delft vermoordt. Filips II had Willem vogelvrij verklaard en een prijs op zijn hoofd gezet.",
    "Balthasar Gerards"
   ],
   [
    "De Spaanse landvoogd na Alva, die de zuidelijke gewesten weer aan de Spaanse kant kreeg.",
    "Alexander Farnese"
   ]
  ]
 },
 "p45": {
  "emoji": "⚔️",
  "titel": "4.5 De strijd beslecht",
  "paragraaf": "§4.5",
  "items": [
   [
    "Hoogste ambtenaar van de Gewestelijke Staten en de Staten-Generaal.",
    "landsadvocaat"
   ],
   [
    "Het Staatse leger is het leger van de opstandige gewesten. Onder leiding van Maurits verovert het diverse steden op de Spanjaarden.",
    "Staatse leger"
   ],
   [
    "De Spaanse Armada bestaat uit een grote Spaanse vloot van zwaar bewapende oorlogsschepen. In 1588 probeert de Spaanse Armada een invasie van Engeland.",
    "Spaanse Armada"
   ],
   [
    "Wapenstilstand tussen de Republiek en Spanje, 1609-1621.",
    "Twaalfjarig Bestand"
   ],
   [
    "Overname met geweld van de macht in een land.",
    "staatsgreep"
   ],
   [
    "In 1648 wordt de Vrede van Münster gesloten tussen de Republiek en Spanje. Daarmee komt er een eind aan de Nederlandse Opstand.",
    "Vrede van Münster"
   ],
   [
    "Landsadvocaat van Holland die namens de Staten-Generaal nauw samenwerkt met Maurits. Hun ruzie loopt uit op zijn onthoofding in 1619.",
    "Johan van Oldenbarnevelt"
   ],
   [
    "Halfbroer van Maurits en stadhouder vanaf 1625. Hij krijgt de bijnaam ‘stedendwinger’, omdat hij steden als Maastricht en ’s-Hertogenbosch op de Spanjaarden verovert.",
    "Frederik Hendrik"
   ],
   [
    "Franse koning die net als de Nederlanden in oorlog raakt met Spanje. Als protestant voert hij godsdienstvrijheid in voor Franse protestanten.",
    "Hendrik IV"
   ],
   [
    "In 1584 belegeren de Spanjaarden Antwerpen. Na veertien maanden (1585) weten zij de stad in te nemen.",
    "val van Antwerpen"
   ],
   [
    "Zoon van Willem van Oranje; na de moord op zijn vader stadhouder van Holland en Zeeland en aanvoerder van het Staatse leger.",
    "Maurits"
   ]
  ]
 },
 "p52": {
  "emoji": "⛵",
  "titel": "5.2 De Gouden Eeuw",
  "paragraaf": "§5.2",
  "items": [
   [
    "Periode in de Nederlandse geschiedenis waarin De Republiek een bloeiperiode kent",
    "Gouden Eeuw"
   ],
   [
    "Kopen en verkopen van producten",
    "handel"
   ],
   [
    "Beleid gericht op de handel",
    "handelspolitiek"
   ],
   [
    "Producten of diensten die aan het buitenland verkocht worden.",
    "export"
   ],
   [
    "Een plaats waar op grote schaal producten worden opgeslagen en doorverkocht",
    "stapelmarkt"
   ],
   [
    "Bank waar geld kon worden gewisseld of in bewaring kon worden gegeven.",
    "wisselbank"
   ],
   [
    "Plaats waar handelsovereenkomsten worden gesloten en aandelen worden verhandeld.",
    "beurs"
   ],
   [
    "Productie en consumptie wereldwijd van alles waaraan mensen waar ook ter wereld behoefte hebben",
    "wereldeconomie"
   ],
   [
    "Afkorting voor de Verenigde Oost-Indische Compagnie.",
    "VOC"
   ],
   [
    "Handelsorganisatie",
    "compagnie"
   ],
   [
    "Marktsituatie waarin er maar één aanbieder van een bepaald product is",
    "monopolie"
   ],
   [
    "Waardepapier dat de eigenaar rechten geeft in een bedrijf of handelsorganisatie",
    "aandeel"
   ],
   [
    "Een naamloze vennootschap (NV) is een organisatie waarbij de aandelen verdeeld zijn over verschillende aandeelhouders of vennoten.",
    "naamloze vennootschap"
   ],
   [
    "Bedrijf dat vestigingen heeft in meerdere landen.",
    "multinational"
   ],
   [
    "West-Indische Compagnie, handelsonderneming die zich richtte op de handel met Amerika, opgericht in 1621.",
    "WIC"
   ],
   [
    "Met schepen andere schepen proberen te veroveren (kapen)",
    "kaapvaart"
   ],
   [
    "Handel tussen de werelddelen Europa, Afrika en Amerika waarvan de handel in tot slaafgemaakten en plantageproducten belangrijke onderdelen waren.",
    "driehoekshandel"
   ],
   [
    "De handel in tot slaaf gemaakte personen",
    "mensenhandel"
   ],
   [
    "Mensen die het bezit van een ander zijn gemaakt, niet vrij zijn en geen rechten hebben.",
    "tot slaaf gemaakten"
   ],
   [
    "Groot landbouwbedrijf waarop meestal één product wordt verbouwd.",
    "plantage"
   ],
   [
    "Gouverneur-generaal van de VOC in Azië, 1619-1623; 1627-1629.",
    "Jan Pieterszoon Coen"
   ],
   [
    "In november 1623 trad Piet Hein in dienst van de WIC. Hij is vooral bekend om zijn kaping van een complete Spaanse zilvervloot.",
    "Piet Hein"
   ],
   [
    "Herdenking en viering van de afschaffing van de slavernij in Suriname, 1 juli 1863. Keti Koti betekent letterlijk ‘ketenen gebroken’.",
    "Keti Koti"
   ]
  ]
 },
 "vaardig": {
  "emoji": "🧭",
  "titel": "Denken als historicus",
  "paragraaf": "vaardigheid",
  "items": [
   [
    "Waardoor iets gebeurt of wat ten grondslag ligt aan een gebeurtenis, een ontwikkeling of verschijnsel",
    "oorzaak"
   ],
   [
    "Een gebeurtenis die de reactie vormt op een oorzaak",
    "gevolg"
   ],
   [
    "Een oorzaak die direct invloed heeft op de gebeurtenissen: de laatste druppel die de emmer doet overlopen",
    "directe oorzaak"
   ],
   [
    "Een oorzaak die al langer speelt, vaak op de achtergrond",
    "indirecte oorzaak"
   ],
   [
    "Een gevolg dat iemand wilde bereiken",
    "bedoeld gevolg"
   ],
   [
    "Een gevolg dat niemand wilde of verwachtte",
    "onbedoeld gevolg"
   ],
   [
    "Alles wat met arbeid en geld te maken heeft",
    "economisch"
   ],
   [
    "Alles wat met geloof te maken heeft",
    "religieus"
   ],
   [
    "Alles wat met organisatie en bestuur te maken heeft",
    "politiek"
   ],
   [
    "Hoe mensen in een samenleving met elkaar omgaan",
    "sociaal"
   ],
   [
    "Dat iets hetzelfde blijft",
    "continuïteit"
   ],
   [
    "Dat iets anders wordt dan het was",
    "verandering"
   ],
   [
    "Een moment waarna de situatie duidelijk de andere kant op gaat",
    "kantelpunt"
   ]
  ]
 }
};

/* ===== OVERZICHT: de oorzaak-gevolgkaart (uit de 4.4-app, voor alle paragrafen) ===== */
window.OVERZICHT = {
 "titel": "De oorzaak-gevolgkaart",
 "tegelTekst": "Oorzaak of gevolg? Bedoeld of niet? Zie in één overzicht welke vraag je stelt.",
 "intro": "Bij bijna elke oorzaak-gevolgvraag van 3.5 tot en met 5.2 kun je dezelfde drie vragen stellen. Loop ze in deze volgorde af, dan kom je altijd uit bij het goede antwoord.",
 "kaart": [
  {
   "id": "oorzaak",
   "label": "VOOR de gebeurtenis",
   "sub": "→ oorzaak",
   "kop": true,
   "kleur": "plum",
   "kinderen": [
    {
     "id": "direct",
     "label": "direct",
     "regel": "de laatste druppel"
    },
    {
     "id": "indirect",
     "label": "indirect",
     "regel": "speelt al langer"
    },
    {
     "id": "soort-o",
     "label": "welk soort?",
     "kop": true,
     "kinderen": [
      {
       "id": "eco-o",
       "label": "economisch",
       "regel": "geld"
      },
      {
       "id": "rel-o",
       "label": "religieus",
       "regel": "geloof"
      },
      {
       "id": "pol-o",
       "label": "politiek",
       "regel": "bestuur"
      },
      {
       "id": "soc-o",
       "label": "sociaal",
       "regel": "mensen onderling"
      }
     ]
    }
   ]
  },
  {
   "id": "gevolg",
   "label": "NA de gebeurtenis",
   "sub": "→ gevolg",
   "kop": true,
   "kleur": "brand",
   "kinderen": [
    {
     "id": "bedoeld",
     "label": "bedoeld",
     "regel": "dit wilden ze"
    },
    {
     "id": "onbedoeld",
     "label": "onbedoeld",
     "regel": "dit wilde niemand"
    },
    {
     "id": "directg",
     "label": "direct",
     "regel": "meteen zichtbaar"
    },
    {
     "id": "indirectg",
     "label": "indirect",
     "regel": "pas na jaren"
    }
   ]
  }
 ],
 "stappen": [
  {
   "kop": "Stap 1, voor of na?",
   "pad": [
    "oorzaak",
    "gevolg"
   ],
   "uitleg": [
    "Begin altijd hier. Zet de twee dingen op een tijdlijn en kijk welke eerst komt.",
    "Komt het <b>vóór</b> de gebeurtenis? Dan is het een <b>oorzaak</b>. Komt het <b>erná</b>? Dan is het een <b>gevolg</b>."
   ],
   "vb": [
    {
     "en": "Alva komt in 1567, de Beeldenstorm was in 1566.",
     "let": "Alva komt erná, dus Alva's komst is een gevolg van de Beeldenstorm, nooit een oorzaak."
    }
   ],
   "check": {
    "q": "De Tiende Penning (1569) ten opzichte van de Beeldenstorm (1566): oorzaak of gevolg?",
    "o": [
     "gevolg",
     "oorzaak"
    ],
    "a": "gevolg",
    "goed": "✅ Precies, 1569 komt ná 1566, dus het kan alleen een gevolg zijn.",
    "fout": {
     "oorzaak": "Kijk naar de jaartallen: 1569 is later dan 1566. Iets dat later gebeurt kan geen oorzaak zijn van iets dat eerder gebeurde."
    }
   }
  },
  {
   "kop": "Stap 2a, bij een oorzaak: direct of indirect?",
   "pad": [
    "oorzaak",
    "direct",
    "indirect"
   ],
   "uitleg": [
    "<b>Direct</b> (ook wel <b>aanleiding</b>): één concrete gebeurtenis, vlak ervoor. De laatste druppel die de emmer doet overlopen.",
    "<b>Indirect</b>: speelt al veel langer op de achtergrond. Vaak zie je pas achteraf dat het meespeelde."
   ],
   "vb": [
    {
     "en": "De Beeldenstorm → directe oorzaak van Alva's komst.",
     "let": "Eén gebeurtenis, en Filips reageerde meteen."
    },
    {
     "en": "De groei van het calvinisme → indirecte oorzaak.",
     "let": "Dat speelde al tientallen jaren en bouwde de spanning langzaam op."
    }
   ],
   "check": {
    "q": "De ruzie over centralisatie, die al sinds Karel V speelde: direct of indirect?",
    "o": [
     "indirect",
     "direct"
    ],
    "a": "indirect",
    "goed": "✅ Klopt, het speelde al generaties lang op de achtergrond.",
    "fout": {
     "direct": "Direct betekent: de laatste druppel, vlak ervoor. Dit sleepte al sinds Karel V, dus het is juist een langlopende, indirecte oorzaak."
    }
   }
  },
  {
   "kop": "Stap 2b, bij een gevolg: bedoeld of onbedoeld?",
   "pad": [
    "gevolg",
    "bedoeld",
    "onbedoeld"
   ],
   "uitleg": [
    "Vraag je af: <b>wilde degene die het deed dit resultaat?</b>",
    "<b>Bedoeld</b> = ja, dit was het plan. <b>Onbedoeld</b> = het gebeurde óók, maar niemand wilde het.",
    "In 4.4 zijn de onbedoelde gevolgen juist de rode draad: bijna elke harde maatregel maakte het verzet groter."
   ],
   "vb": [
    {
     "en": "Alva straft de beeldenstormers → bedoeld.",
     "let": "Dat was letterlijk zijn opdracht van Filips II."
    },
    {
     "en": "Door Alva groeit het verzet → onbedoeld.",
     "let": "Filips stuurde hem juist om rust te krijgen. Hij kreeg oorlog."
    }
   ],
   "check": {
    "q": "Margaretha versoepelt de plakkaten en het calvinisme leeft op. Bedoeld of onbedoeld?",
    "o": [
     "onbedoeld",
     "bedoeld"
    ],
    "a": "onbedoeld",
    "goed": "✅ Precies, ze wilde rust brengen, niet het calvinisme laten groeien.",
    "fout": {
     "bedoeld": "Dan zou Margaretha het calvinisme hebben willen laten groeien. Ze was katholiek en versoepelde juist uit angst voor een opstand van de edelen."
    }
   }
  },
  {
   "kop": "Stap 3, welk soort?",
   "pad": [
    "soort-o",
    "eco-o",
    "rel-o",
    "pol-o",
    "soc-o"
   ],
   "uitleg": [
    "Zoek het <b>kernwoord</b> en kies daarmee het soort:",
    "<b>Economisch</b> = arbeid en geld (belasting, handel, winst, rijkdom).<br><b>Religieus</b> = geloof (kerk, plakkaten, hagenpreken, beelden).<br><b>Politiek</b> = organisatie en bestuur (centralisatie, rechtbanken, wie de baas is).<br><b>Sociaal</b> = hoe mensen met elkaar omgaan (angst, vluchten, samenwerken).",
    "Let op: één gebeurtenis kan oorzaken en gevolgen van <b>meerdere</b> soorten hebben. Dat is geen fout, dat is juist hoe geschiedenis werkt."
   ],
   "vb": [
    {
     "en": "De Tiende Penning → economisch.",
     "let": "Belasting, dus geld."
    },
    {
     "en": "Edelen vluchten uit angst → sociaal.",
     "let": "Het gaat over wat mensen doen en voelen, niet over geld of wetten."
    }
   ],
   "check": {
    "q": "De Raad van Beroerten als rechtbank: welk soort?",
    "o": [
     "politiek",
     "economisch",
     "sociaal"
    ],
    "a": "politiek",
    "goed": "✅ Ja, een rechtbank gaat over bestuur en rechtspraak, en dat is politiek.",
    "fout": {
     "economisch": "Er komt geen geld aan te pas. De belasting van Alva (Tiende Penning) is economisch; zijn rechtbank niet.",
     "sociaal": "Sociaal gaat over hoe mensen onderling omgaan. Een rechtbank instellen is een bestuurlijke maatregel, dus politiek."
    }
   }
  },
  {
   "kop": "Samenvatting",
   "pad": [],
   "samenvatting": [
    "1. Voor of na? → oorzaak of gevolg",
    "2a. Oorzaak: laatste druppel of speelt al langer? → direct of indirect",
    "2b. Gevolg: wilde iemand dit? → bedoeld of onbedoeld",
    "3. Kernwoord: geld / geloof / bestuur / mensen → economisch, religieus, politiek of sociaal",
    "En altijd: schrijf het verband op met 'waardoor' of 'daardoor'."
   ],
   "uitleg": [
    "Deze vier vragen dekken bijna elke oorzaak-gevolgvraag van de toets af. Loop ze in deze volgorde af en je hoeft nooit te gokken.",
    "Ga nu oefenen: het onderwerp \"4.4 · Oorzaken en gevolgen\" gebruikt precies deze kaart, en \"Zo schrijf je een antwoord\" leert je het opschrijven."
   ]
  }
 ]
};

/* ===== MIXVRAGEN: discriminatievragen voor de proeftoets ===== */
window.MIXVRAGEN = [
 {
  "t": "mc",
  "q": "Wat is het verschil tussen het Smeekschrift (1566) en het Plakkaat van Verlatinghe (1581)?",
  "o": [
   "het Smeekschrift vraagt om mildheid, het Plakkaat zet de koning af",
   "het Smeekschrift zet de koning af, het Plakkaat vraagt om mildheid",
   "ze zijn allebei geschreven door Filips II",
   "het zijn twee namen voor hetzelfde document"
  ],
  "a": "het Smeekschrift vraagt om mildheid, het Plakkaat zet de koning af",
  "w": "Smeken om mildheid tegenover de koning verlaten. Vijftien jaar ertussen.",
  "meer": "Ezelsbruggetje: <b>S</b>meekschrift = <b>S</b>meken. <b>V</b>erlatinghe = <b>V</b>erlaten.",
  "fout": {
   "het Smeekschrift zet de koning af, het Plakkaat vraagt om mildheid": "Precies omgedraaid. In 1566 wilden de edelen Filips juist behouden, maar milder.",
   "ze zijn allebei geschreven door Filips II": "Allebei kwamen ze van de Nederlandse kant: het Smeekschrift van lage edelen, het Plakkaat van de Staten-Generaal.",
   "het zijn twee namen voor hetzelfde document": "Twee totaal verschillende documenten, met vijftien jaar ertussen."
  }
 },
 {
  "t": "mc",
  "q": "Wat is het verschil tussen de Raad van Beroerten en de Tiende Penning?",
  "o": [
   "de Raad is een rechtbank, de Tiende Penning een belasting",
   "de Raad is een belasting, de Tiende Penning een rechtbank",
   "allebei rechtbanken van Alva",
   "allebei belastingen van Filips II"
  ],
  "a": "de Raad is een rechtbank, de Tiende Penning een belasting",
  "w": "Straffen tegenover geld ophalen. Allebei van Alva, maar totaal verschillend.",
  "meer": "Raad van Beroerten: de rechtbank van Alva, bijnaam bloedraad. Tiende Penning: 10% op verkoop en winst.",
  "fout": {
   "de Raad is een belasting, de Tiende Penning een rechtbank": "Omgedraaid. 'Penning' verwijst naar geld, 'Raad' naar een rechtbank.",
   "allebei rechtbanken van Alva": "Alleen de Raad van Beroerten was een rechtbank. De Tiende Penning was een belasting.",
   "allebei belastingen van Filips II": "Allebei waren ze van Alva, en alleen de Tiende Penning was een belasting."
  }
 },
 {
  "t": "mc",
  "q": "Welke gebeurtenis was de <b>aanleiding</b> (directe oorzaak) voor de komst van Alva?",
  "o": [
   "de Beeldenstorm",
   "de groei van het calvinisme",
   "de inname van Den Briel",
   "het Plakkaat van Verlatinghe"
  ],
  "a": "de Beeldenstorm",
  "w": "De laatste druppel: Filips hoorde ervan en stuurde meteen zijn beste generaal.",
  "meer": "De groei van het calvinisme is een <b>indirecte</b> oorzaak: die speelde al jaren.",
  "fout": {
   "de groei van het calvinisme": "Dat is een <b>indirecte</b> oorzaak, het speelde al tientallen jaren, en was niet de directe aanleiding.",
   "de inname van Den Briel": "Dat was in 1572, vijf jaar ná Alva's komst.",
   "het Plakkaat van Verlatinghe": "Dat was in 1581, veertien jaar later."
  }
 },
 {
  "t": "mc",
  "q": "Bij de Beeldenstorm werden vooral…",
  "o": [
   "beelden en kerkversieringen vernield",
   "mensen gedood",
   "steden belegerd",
   "schepen veroverd"
  ],
  "a": "beelden en kerkversieringen vernield",
  "w": "Het ging om spullen: altaren, beelden, pilaren en raamschilderingen.",
  "meer": "De doodvonnissen kwamen pas daarna, van de Raad van Beroerten van Alva.",
  "fout": {
   "mensen gedood": "Dit is de bekendste denkfout. De Beeldenstorm was vernieling van voorwerpen, geen bloedbad.",
   "steden belegerd": "Belegeren was juist de tactiek van Alva, later, bijvoorbeeld bij Leiden.",
   "schepen veroverd": "Dat deden de watergeuzen, en dat was jaren later."
  }
 },
 {
  "t": "mc",
  "q": "Wat betekent het dat de Nederlanden in 1588 een <b>republiek</b> werden?",
  "o": [
   "ze gingen verder zonder vorst",
   "iedereen mocht voortaan stemmen",
   "ze werden een deel van Spanje",
   "ze kregen een nieuwe koning"
  ],
  "a": "ze gingen verder zonder vorst",
  "w": "Republiek = land zonder vorst. Dat is de kern.",
  "meer": "Het bestuur lag bij regenten. Een republiek is dus niet automatisch een democratie.",
  "fout": {
   "iedereen mocht voortaan stemmen": "Een veelgemaakte fout. Republiek zegt alleen iets over het ontbreken van een vorst, niet over stemrecht.",
   "ze werden een deel van Spanje": "Het tegenovergestelde: ze hadden Filips II juist in 1581 afgezworen.",
   "ze kregen een nieuwe koning": "Ze besloten juist géén nieuwe vorst aan te wijzen. Dat is wat een republiek is."
  }
 },
 {
  "t": "mc",
  "q": "Alva werd gestuurd om de orde te herstellen, maar het verzet werd juist groter. Wat voor gevolg is dat?",
  "o": [
   "onbedoeld",
   "bedoeld",
   "een directe oorzaak",
   "continuïteit"
  ],
  "a": "onbedoeld",
  "w": "Niemand aan Spaanse kant wilde dit resultaat, en toch gebeurde het.",
  "meer": "Deze boemerang is de rode draad van 4.4: harder ingrijpen gaf steeds groter verzet.",
  "fout": {
   "bedoeld": "Dan zou Filips een grotere opstand hebben gewild. Hij stuurde Alva juist om rust te krijgen.",
   "een directe oorzaak": "Een oorzaak komt vóór de gebeurtenis; dit kwam juist erná.",
   "continuïteit": "Continuïteit betekent dat iets hetzelfde blijft. Hier verandert er juist heel veel."
  }
 },
 {
  "t": "mc",
  "q": "Welk jaartal hoort bij de inname van Den Briel?",
  "o": [
   "1572",
   "1566",
   "1568",
   "1581"
  ],
  "a": "1572",
  "w": "1 april 1572, het kantelpunt van de Opstand.",
  "meer": "Ezelsbruggetje uit die tijd: 'Op 1 april verloor Alva zijn bril.'",
  "fout": {
   "1566": "Dat is het jaar van het Smeekschrift en de Beeldenstorm.",
   "1568": "Dat is het begin van de Opstand: de slag bij Heiligerlee.",
   "1581": "Dat is het Plakkaat van Verlatinghe."
  }
 },
 {
  "t": "mc",
  "q": "Hoorden de Nederlanden bij Spanje?",
  "o": [
   "nee, het was een apart gebied met dezelfde heer",
   "ja, het was een Spaanse provincie",
   "ja, sinds Filips II koning werd",
   "nee, er was helemaal geen verband"
  ],
  "a": "nee, het was een apart gebied met dezelfde heer",
  "w": "Filips II was koning van Spanje én heer van de Nederlanden. Twee gebieden, één baas.",
  "meer": "Juist daarom viel het zo op dat hij Spaanse edelen in het Nederlandse bestuur zette.",
  "fout": {
   "ja, het was een Spaanse provincie": "De bekendste misvatting van dit hoofdstuk. De gewesten hadden eigen wetten, munten en privileges.",
   "ja, sinds Filips II koning werd": "Hij erfde ze van Karel V, maar ze werden daardoor geen deel van Spanje.",
   "nee, er was helemaal geen verband": "Er was wel degelijk een band: dezelfde vorst, en Spaanse edelen in het bestuur."
  }
 },
 {
  "t": "mc",
  "q": "Wie was landvoogdes vóór de hertog van Alva?",
  "o": [
   "Margaretha van Parma",
   "Maria van Bourgondië",
   "Alexander Farnese",
   "Willem van Oranje"
  ],
  "a": "Margaretha van Parma",
  "w": "De halfzus van Filips II, die aftrad toen Alva kwam.",
  "meer": "Volgorde van landvoogden in deze paragraaf: Margaretha van Parma → hertog van Alva → Alexander Farnese.",
  "fout": {
   "Maria van Bourgondië": "Die hoort bij een veel eerdere periode, de Bourgondische tijd.",
   "Alexander Farnese": "Die kwam juist ná Alva.",
   "Willem van Oranje": "Hij was de leider van de opstand, niet een vertegenwoordiger van de koning."
  }
 },
 {
  "t": "mc",
  "q": "Waarom lukte het Filips II niet om het aantal protestanten te verminderen?",
  "o": [
   "door de harde vervolging keerden juist meer mensen zich van de kerk af",
   "hij had te weinig soldaten in de Nederlanden",
   "hij liet de protestanten met rust",
   "de protestanten vluchtten allemaal naar Duitsland"
  ],
  "a": "door de harde vervolging keerden juist meer mensen zich van de kerk af",
  "w": "Het middel werkte averechts: hoe harder de vervolging, hoe meer mensen afhaakten.",
  "meer": "Dit is opdracht 1b uit het werkboek, en meteen het patroon van de hele paragraaf.",
  "fout": {
   "hij had te weinig soldaten in de Nederlanden": "Daar ging het niet om; het probleem was dat de vervolging het tegenovergestelde effect had.",
   "hij liet de protestanten met rust": "Integendeel: hij trad juist veel strenger op dan zijn vader.",
   "de protestanten vluchtten allemaal naar Duitsland": "Sommige edelen vluchtten later, maar het aantal protestanten hier nam juist toe."
  }
 },
 {
  "t": "mc",
  "q": "Welk soort oorzaak is de Tiende Penning voor het verzet tegen Alva?",
  "o": [
   "economisch",
   "religieus",
   "sociaal",
   "het is geen oorzaak"
  ],
  "a": "economisch",
  "w": "Belasting op handel en winst: geld, dus economisch.",
  "meer": "Juist omdat het over geld ging, raakte het ook katholieken, en werd het verzet breder dan alleen protestants.",
  "fout": {
   "religieus": "Religieus gaat over geloof. De Tiende Penning raakte iedereen die handel dreef, ongeacht geloof.",
   "sociaal": "Sociaal gaat over hoe mensen met elkaar omgaan. Hier draait het om belasting.",
   "het is geen oorzaak": "Het is wel degelijk een oorzaak van het verzet: de belasting maakte veel mensen boos op Alva."
  }
 },
 {
  "t": "mc",
  "q": "Wat blijkt uit het Wilhelmus over hoe Willem van Oranje tegen Filips II aankeek?",
  "o": [
   "hij zei de koning altijd geëerd te hebben",
   "hij noemde de koning zijn grootste vijand",
   "hij wilde zelf koning van Spanje worden",
   "hij zei niets over de koning"
  ],
  "a": "hij zei de koning altijd geëerd te hebben",
  "w": "'Den koning van Hispanje heb ik altijd geëerd', eerste couplet.",
  "meer": "Hij vocht tegen de <b>tirannie</b>, niet tegen de koning zelf. Filips zag dat heel anders en zette een prijs op zijn hoofd.",
  "fout": {
   "hij noemde de koning zijn grootste vijand": "Dat was juist andersom: Filips zag Willem als de grote vijand.",
   "hij wilde zelf koning van Spanje worden": "Daar zegt het lied niets over, en dat was ook niet zijn doel.",
   "hij zei niets over de koning": "Het eerste couplet eindigt er juist mee."
  }
 }
];

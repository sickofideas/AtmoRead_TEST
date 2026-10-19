/* ============================================================================
   AtmoRead v6.0.0 — DATA.JS
   Databáze 100% reálných zvuků (One-Shot + 15-20s Tail), priorit, barevných aur,
   dynamických nálad, ukolébavek a dlouhých pohádek i knih pro dospělé.
   ============================================================================ */

/* 1. ČTYŘI SMYSLUPLNÉ REŽIMY VYSOCE SVÍTIVÉ LAMPIČKY */
const LAMP_MODES = [
    {
        id: 'cream',
        name: '📖 Čtecí krémová',
        desc: 'Vysoká svítivost na čtení papírové knihy',
        rgb: [255, 244, 214],
        hex: '#fff4d6'
    },
    {
        id: 'candle',
        name: '🕯️ Teplá svíčka (1800K)',
        desc: 'Zlatavé jantarové světlo bez modré složky',
        rgb: [255, 155, 35],
        hex: '#ff9b23'
    },
    {
        id: 'red',
        name: '🍎 Spánková červená',
        desc: '100% podpora melatoninu a klidného usínání',
        rgb: [225, 38, 24],
        hex: '#e12618'
    },
    {
        id: 'dynamic',
        name: '✨ Dynamická (podle děje)',
        desc: 'Barva pokoje reaguje na slova v příběhu',
        rgb: [245, 158, 11],
        hex: '#f59e0b'
    }
];

/* Barvy, které automaticky střídá režim "Dynamická (podle děje)" */
const DYNAMIC_AURA_PALETTE = [
    {
        id: 'dyn_candle', name: '🕯️ Teplý krb a svíčka', rgb: [255, 150, 30],
        stems: ['svick','lucern','lamp','jantar','vecer','postyl','perin','spanek','spink','usn','domov','chaloup','krb','pec','candle','lantern','bed','home']
    },
    {
        id: 'dyn_red', name: '🔥 Plameny a čarovný šarlat', rgb: [230, 50, 35],
        stems: ['cerven','rud','karkulk','jablk','jahod','ohen','ohn','plamen','cert','pekl','drak','krev','vino','red','fire','flame','dragon']
    },
    {
        id: 'dyn_gold', name: '☀️ Zlaté slunce a poklad', rgb: [252, 211, 38],
        stems: ['zlat','zlut','slunc','slunic','hvezd','poklad','dukat','korun','zlatak','oris','med','kolac','ran','svitan','gold','sun','star','treasure']
    },
    {
        id: 'dyn_forest', name: '🌲 Hluboký lesní mech', rgb: [40, 200, 100],
        stems: ['zelen','les','hvozd','strom','mech','trav','zab','kaprad','krov','smrk','dub','borovic','louk','mysliv','green','forest','tree','woods']
    },
    {
        id: 'dyn_ocean', name: '🌊 Modrá studánka a déšť', rgb: [56, 189, 248],
        stems: ['modr','vod','mor','rek','studank','potok','potuc','ryb','vodnik','des','prs','bour','hrom','snih','mraz','led','blue','water','rain','snow','sea']
    },
    {
        id: 'dyn_magic', name: '🔮 Tajemná kouzelná fialová', rgb: [185, 120, 255],
        stems: ['fialov','fialk','kouzl','car','zazrak','vil','zavoj','zrcadl','tajemn','carodej','sudic','pran','strib','stín','magic','fairy','spell','witch']
    },
    {
        id: 'dyn_rose', name: '🌸 Královská růžová', rgb: [244, 114, 182],
        stems: ['ruzov','ruz','sipkov','princez','lask','srdc','polib','svatb','kvet','sat','strevic','popelk','pink','princess','rose','kiss','love']
    }
];

/* ============================================================================
   2. DYNAMICKÉ SCÉNY PODKRESU (CROSSFADE PODLE NÁLADY POSLEDNÍCH VĚT)
   ============================================================================ */
const MOOD_SCENES = {
    meadow: {
        id: 'meadow',
        name: '🌿 Klidná louka',
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg',
            'https://actions.google.com/sounds/v1/weather/light_breeze.ogg'
        ],
        stems: ['louk','slunc','ran','ptac','kvet','zelen','trav','usm','vesel','cest','zahrad','motyl','vcel','pas','ovc','studank','potok','meadow','sun','morning','garden']
    },
    forest: {
        id: 'forest',
        name: '🌲 Tajemný les',
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg',
            'https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'
        ],
        stems: ['les','hvozd','strom','dub','smrk','houst','stín','vlk','sov','jelen','lisk','jeskyn','mech','vetv','list','noc','tma','bloud','forest','woods','owl','wolf','dark']
    },
    tension: {
        id: 'tension',
        name: '⚔️ Napětí a bouře',
        urls: [
            'https://actions.google.com/sounds/v1/weather/distant_thunder.ogg',
            'https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'
        ],
        stems: ['bour','hrom','blesk','vichr','mec','boj','souboj','rytir','drak','cert','strach','utik','utek','kletb','strel','vrah','detektiv','stín','nebezpec','battle','storm','sword','danger']
    },
    home: {
        id: 'home',
        name: '🔥 Domov a spánek',
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/fire.ogg',
            'https://actions.google.com/sounds/v1/weather/light_rain.ogg'
        ],
        stems: ['krb','ohen','pec','chaloup','domov','postyl','postel','perin','polstar','spink','spanek','usn','dobrou','kuchyn','polevk','caj','klid','tepl','hearth','sleep','bed','home','cozy']
    },
    cafe: {
        id: 'cafe',
        name: '☕ Kavárna a vlak',
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
            'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg'
        ],
        stems: ['kavarn','kav','salek','caj','vino','sklenic','vlak','nadraz','kolej','kupe','novin','dopis','ulic','lamp','kabát','detektiv','román','cafe','coffee','train','station','letter']
    }
};

/* Neutrální zvuky pro hluchá místa (když 8 sekund nepadne žádné klíčové slovo) */
const IDLE_FILLER_SOUNDS = {
    kids: [
        { emoji: '🍃', label: 'Zašustění listí', url: 'https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg' },
        { emoji: '🔥', label: 'Prasknutí v krbu', url: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
        { emoji: '📖', label: 'Otočení stránky', url: 'https://actions.google.com/sounds/v1/foley/page_turn.ogg' }
    ],
    adults: [
        { emoji: '📖', label: 'Otočení stránky', url: 'https://actions.google.com/sounds/v1/foley/page_turn.ogg' },
        { emoji: '🔥', label: 'Prasknutí dřeva v krbu', url: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
        { emoji: '🌧️', label: 'Kapky na okně', url: 'https://actions.google.com/sounds/v1/weather/rain_water_dripping_softly.ogg' }
    ]
};

/* ============================================================================
   3. KVALITNÍ UKOLÉBAVKY A USPÁVACÍ REŽIMY
   ============================================================================ */
const LULLABY_LIST = [
    { id: 'off',       icon: '🔇', title: 'Bez hudby',          desc: 'Pouze zvuky příběhu' },
    { id: 'auto_mood', icon: '🎭', title: 'Dynamický podkres',  desc: 'Mění se sám podle děje' },
    { id: 'brahms',    icon: '🎠', title: 'Brahmsova ukolébavka', desc: 'Klasická hrací skříňka' },
    { id: 'twinkle',   icon: '✨', title: 'Twinkle Twinkle',    desc: 'Třpytivá hvězdička' },
    { id: 'clair',     icon: '🌙', title: 'Clair de Lune',      desc: 'Jemný měsíční svit' },
    { id: 'harp',      icon: '🎹', title: 'Pohádková harfa',    desc: 'Hřejivé akordy harfy' },
    { id: 'chimes',    icon: '🎐', title: 'Zvonkohra ve větru', desc: 'Křišťálové tóny a vánek' },
    { id: 'pinknoise', icon: '🌊', title: 'Růžový šum a moře',  desc: 'Hluboké uspávání miminek' }
];

/* ============================================================================
   4. 100% REÁLNÉ ZVUKOVÉ EFEKTY (ONE-SHOT + 15-20s TAIL SMYČKA + PRIORITA 1-3)
   Priority:
     1 = Dominantní zvrat / bouře / boj / drak / vlak (nejvyšší přednost)
     2 = Zvířata / postavy / oheň / voda / kouzla / zvony / kavárna
     3 = Kroky / dveře / nádobí / drobné ruchy
   ============================================================================ */
const SOUND_LIBRARY = [
    // --- PRIORITA 1: BOUŘE, BOJ, DRAK, VLAK, NAPĚTÍ ---
    {
        id: 'thunder', emoji: '⛈️', label: 'Bouřka a hrom', priority: 1,
        stems: ['bour','bourk','bouri','hrom','zahrm','hrmi','hromobit','blesk','zablesk','mracn','thunder','storm','lightning'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/rolling_thunder.ogg',
            'https://actions.google.com/sounds/v1/weather/distant_thunder.ogg',
            'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_rain.ogg'],
        dur: 6.0
    },
    {
        id: 'sword', emoji: '⚔️', label: 'Šerm a souboj mečů', priority: 1,
        stems: ['mec','savl','dyk','stit','brnen','zbroj','prilb','rytir','souboj','bitv','boj','sek','tal','usek','kopi','sip','luk','kus','straz','vojak','zaklinac','sword','knight','shield','armor','battle','blade','duel'],
        urls: [
            'https://actions.google.com/sounds/v1/weapons/sword_clang.ogg',
            'https://actions.google.com/sounds/v1/impacts/metal_clash.ogg',
            'https://actions.google.com/sounds/v1/impacts/metal_hit_with_ring.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 4.2
    },
    {
        id: 'dragon', emoji: '🐉', label: 'Drak / Medvěd / Šelma', priority: 1,
        stems: ['drak','drac','san','sane','hlavy','obr','obr','otesan','lidozrout','netvor','oblud','medved','medvid','lev','lva','lvi','tygr','zarv','rval','vrc','zavrc','dragon','giant','ogre','bear','lion','roar','monster'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/bear_growl_long.ogg',
            'https://actions.google.com/sounds/v1/animals/lion_roar.ogg',
            'https://actions.google.com/sounds/v1/animals/tiger_roar.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 5.0
    },
    {
        id: 'train', emoji: '🚂', label: 'Vlak a železnice', priority: 1,
        stems: ['vlak','lokomotiv','vagon','kupe','kolej','nadraz','peron','piskot','houk','parn','expres','cestujic','train','railway','station','locomotive'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/train_horn.ogg',
            'https://actions.google.com/sounds/v1/transportation/train_passing_by.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/transportation/train_passing_by.ogg'],
        dur: 5.5
    },
    {
        id: 'suspense', emoji: '🕵️', label: 'Napětí a tajemství', priority: 1,
        stems: ['tajemstv','stín','podezrel','stopa','dukaz','vrazd','detektiv','komisar','strach','lek','vylek','temnot','nocn','hrozb','kletb','duch','strasidl','mystery','detective','shadow','fear','ghost'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/low_thunder_rolls.ogg',
            'https://actions.google.com/sounds/v1/doors/creaking_wooden_door.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 5.2
    },

    // --- PRIORITA 2: REÁLNÁ ZVÍŘATA ---
    {
        id: 'dog', emoji: '🐶', label: 'Pes', priority: 2,
        stems: ['pes','pejs','pejsek','psa','psovi','psem','psi','sten','stek','zastek','haf','ohar','voris','hlidac','smeck','dog','bark','puppy','hound'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/dog_barking.ogg',
            'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience_dog_barking.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 4.2
    },
    {
        id: 'wolf', emoji: '🐺', label: 'Vlk v lese', priority: 2,
        stems: ['vlk','vlc','vlka','vlku','vlkem','vlci','vyje','zavyl','vyti','tesak','selm','wolf','wolves','howl'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/wolf_howl.ogg',
            'https://actions.google.com/sounds/v1/animals/dog_howling.ogg',
            'https://actions.google.com/sounds/v1/animals/dog_growling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'],
        dur: 5.0
    },
    {
        id: 'cat', emoji: '🐱', label: 'Kočka / Kocour', priority: 2,
        stems: ['kock','kocic','kote','kotat','kocour','mnouk','zamnouk','vrni','prede','tichoslap','cat','kitten','meow','purr'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg',
            'https://actions.google.com/sounds/v1/animals/cat_meow.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.2
    },
    {
        id: 'horse', emoji: '🐴', label: 'Kůň a klus kopyt', priority: 2,
        stems: ['kun','kone','koni','konik','konic','hrebec','klisn','hrib','or','reht','zareht','kopyt','cval','klus','juras','sedl','uzd','horse','pony','gallop','stallion'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/horse_whinny.ogg',
            'https://actions.google.com/sounds/v1/animals/horse_gallop.ogg',
            'https://actions.google.com/sounds/v1/animals/horse_snort.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.5
    },
    {
        id: 'bird', emoji: '🐦', label: 'Zpěv ptáčků a holoubků', priority: 2,
        stems: ['ptak','ptac','zpev','zazpiv','cvrlik','pip','vlastov','slavik','skrivan','holub','holoub','hrdlic','cap','labut','kridl','peri','pero','ohnivak','vrabc','sykor','bird','chirp','dove','pigeon','swan'],
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg',
            'https://actions.google.com/sounds/v1/animals/woodpecker_pecking_fast.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg'],
        dur: 4.8
    },
    {
        id: 'owl', emoji: '🦉', label: 'Noční sova a les', priority: 2,
        stems: ['sov','sovi','vyr','syc','houk','zahouk','huu','rozark','owl','hoot'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/owl_hooting.ogg',
            'https://actions.google.com/sounds/v1/ambiences/crickets_with_distant_traffic.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'],
        dur: 4.8
    },
    {
        id: 'crow', emoji: '🐦‍⬛', label: 'Krkavec a vrána', priority: 2,
        stems: ['krkav','vran','havran','krak','zakrak','krahuj','jestrab','orel','orl','sokol','crow','raven','hawk','eagle'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/crow_call.ogg',
            'https://actions.google.com/sounds/v1/animals/crows_picking_at_carcass.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.0
    },
    {
        id: 'frog', emoji: '🐸', label: 'Žabka u rybníka', priority: 2,
        stems: ['zab','zabic','kvak','zakvak','kunk','ropuch','pulec','frog','toad','croak'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/frogs.ogg',
            'https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'],
        dur: 4.5
    },
    {
        id: 'pig', emoji: '🐷', label: 'Prasátko na dvorku', priority: 2,
        stems: ['pras','prase','prasatk','cunik','pasik','kanec','knour','chrocht','zachrocht','rypac','pig','piglet','oink','boar'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/pig_grunt.ogg',
            'https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg'],
        dur: 4.4
    },
    {
        id: 'cow_sheep', emoji: '🐑', label: 'Ovečka, kráva a pastvina', priority: 2,
        stems: ['krav','tele','telat','vul','byk','buc','zabuc','ovc','ovec','beran','beran','jehn','bec','zabec','koz','kozic','kuzl','mec','osel','oslik','cow','cattle','moo','sheep','lamb','goat'],
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/farm_morning_with_sheep.ogg',
            'https://actions.google.com/sounds/v1/animals/cattle_moo.ogg',
            'https://actions.google.com/sounds/v1/animals/sheep_bleat.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/farm_morning_with_sheep.ogg'],
        dur: 4.8
    },
    {
        id: 'rooster', emoji: '🐓', label: 'Kohout a vesnické ráno', priority: 2,
        stems: ['kohout','kokrh','zakokrh','kykyr','slepic','slepic','kur','kurat','kdak','kachn','hus','houser','vesnic','statek','dvur','rooster','hen','chicken','duck','goose','village'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/rooster_crow.ogg',
            'https://actions.google.com/sounds/v1/ambiences/inside_barn_with_chickens.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/inside_barn_with_chickens.ogg'],
        dur: 4.5
    },
    {
        id: 'insect', emoji: '🐝', label: 'Včelka a cvrčci', priority: 2,
        stems: ['vcel','vcelic','cmelak','vos','mouch','musk','komar','mraven','mravene','brouk','brouc','zlatohlav','cvrc','motyl','bzuc','zabzuc','ul','plast','bee','ant','beetle','cricket','buzz'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/bee_buzzing.ogg',
            'https://actions.google.com/sounds/v1/ambiences/crickets_with_distant_traffic.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 4.2
    },

    // --- PRIORITA 2: ŽIVLY, PŘÍRODA, HRAD, KAVÁRNA, KOUZLA ---
    {
        id: 'fire', emoji: '🔥', label: 'Praskající oheň a krb', priority: 2,
        stems: ['ohen','ohn','ohnic','ohnist','plamen','plamin','krb','pec','peci','kamn','hori','shor','prask','zaprask','jiskr','popel','popelk','dym','kour','pochod','louc','fire','flame','hearth','ash','torch'],
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/fire.ogg',
            'https://actions.google.com/sounds/v1/ambiences/daytime_forrest_bonfire.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 5.5
    },
    {
        id: 'water', emoji: '💧', label: 'Studánka, potůček a řeka', priority: 2,
        stems: ['vod','vodic','studank','studn','potok','potuc','rek','ric','pramen','zblun','splouch','ryb','rybic','rybnik','jezer','jezir','vodnik','hastrman','vrba','tun','water','stream','river','well','splash','fish'],
        urls: [
            'https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg',
            'https://actions.google.com/sounds/v1/water/rocks_into_water.ogg',
            'https://actions.google.com/sounds/v1/water/fountain_water_bubbling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'],
        dur: 5.2
    },
    {
        id: 'sea', emoji: '🌊', label: 'Moře a příboj vln', priority: 2,
        stems: ['mor','mori','ocean','vln','priboj','breh','plaz','ostrov','korab','lod','lodic','placht','namor','kotv','sea','ocean','wave','ship','boat','island'],
        urls: [
            'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
            'https://actions.google.com/sounds/v1/water/ocean_wave_rock_beach.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg'],
        dur: 5.8
    },
    {
        id: 'rain', emoji: '🌧️', label: 'Déšť a kapky na střeše', priority: 2,
        stems: ['des','dest','prs','zaprs','lijak','lije','kapk','kape','krupej','mzi','pliskanic','louz','kaluz','rain','shower','drizzle','drop'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg',
            'https://actions.google.com/sounds/v1/weather/light_rain.ogg',
            'https://actions.google.com/sounds/v1/weather/rain_water_dripping_softly.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_rain.ogg'],
        dur: 5.5
    },
    {
        id: 'wind', emoji: '💨', label: 'Vítr, vichřice a mráz', priority: 2,
        stems: ['vitr','vetr','vetric','vanek','fouk','zafouk','odfouk','vichr','vichric','meluzin','vanic','fujavic','snih','sneh','snez','mraz','zima','zimn','led','rampouch','leden','wind','breeze','blow','snow','frost','winter'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/wind_through_window.ogg',
            'https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg',
            'https://actions.google.com/sounds/v1/weather/light_breeze.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 5.5
    },
    {
        id: 'forest', emoji: '🌲', label: 'Šumění lesa a listí', priority: 2,
        stems: ['les','lese','lesik','hvozd','strom','dub','smrk','jedl','borovic','briz','lip','vetev','vetvic','list','listi','sust','zasust','krov','houstin','mech','sipk','trn','trni','parez','jelen','srn','lisk','zajic','forest','woods','tree','branch','leaf','leaves','deer','fox'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg',
            'https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 5.0
    },
    {
        id: 'bell', emoji: '🔔', label: 'Hodiny, zvon a půlnoc', priority: 2,
        stems: ['zvon','zvonek','zvonk','zazvon','cink','zacink','hodin','odbil','odbij','pulnoc','vezn','svatb','kostel','klaster','opatstv','bell','chime','clock','midnight','church'],
        urls: [
            'https://actions.google.com/sounds/v1/alarms/Mechanical_Clock_Ring.ogg',
            'https://actions.google.com/sounds/v1/Cartoon/clang_and_wobble.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.6
    },
    {
        id: 'treasure', emoji: '🪙', label: 'Zlaté dukáty, poklad a kouzlo', priority: 2,
        stems: ['poklad','zlato','zlaty','zlatak','dukat','minc','stribr','drahokam','diamant','perla','perl','rubin','smaragd','prsten','prstyn','korun','zezl','trun','bohatstv','mesec','oris','kouzl','car','zazrak','vil','zrcadl','hulk','gold','coin','treasure','diamond','jewel','ring','crown','magic','spell','fairy'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/coins_in_hand.ogg',
            'https://actions.google.com/sounds/v1/foley/glass_clink.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg'],
        dur: 4.2
    },
    {
        id: 'cafe', emoji: '☕', label: 'Kavárna, hostinec a cinknutí sklenic', priority: 2,
        stems: ['kavarn','kav','hostin','krcm','hospud','hospod','vino','piv','cis','sklenic','salek','caj','stul','bar','hovor','smich','slavnost','ples','bal','cafe','coffee','tavern','inn','wine','glass','feast'],
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
            'https://actions.google.com/sounds/v1/foley/glass_clink.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
        dur: 5.0
    },

    // --- PRIORITA 3: DVEŘE, KROKY, KOČÁR, KUCHYNĚ, ŘEMESLA, KNIHA ---
    {
        id: 'door', emoji: '🚪', label: 'Dveře, brána a zaklepání', priority: 3,
        stems: ['dver','dvir','vrat','bran','zaklep','klep','zabus','bus','vrz','zavrz','otevr','zavr','prah','pant','okenic','okn','chaloup','chalup','domec','domek','hrad','zamek','komnat','door','gate','knock','creak','window','cottage','castle'],
        urls: [
            'https://actions.google.com/sounds/v1/doors/knock_on_wooden_door.ogg',
            'https://actions.google.com/sounds/v1/doors/creaking_wooden_door.ogg',
            'https://actions.google.com/sounds/v1/doors/wood_door_open_close_soft.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.0
    },
    {
        id: 'lock', emoji: '🔑', label: 'Klíč, zámek a truhla', priority: 3,
        stems: ['klic','klick','zamek','zamec','odemk','zamk','truhl','truhlic','skrin','vezen','zalar','mriz','obruc','retez','cert','key','lock','chest','unlock','chain'],
        urls: [
            'https://actions.google.com/sounds/v1/doors/key_in_lock.ogg',
            'https://actions.google.com/sounds/v1/doors/deadbolt_lock.ogg',
            'https://actions.google.com/sounds/v1/doors/metal_scrap_rattling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 3.8
    },
    {
        id: 'steps', emoji: '👣', label: 'Kroky, cesta a kočár', priority: 3,
        stems: ['krok','krac','sel','sla','sli','vyraz','cest','cestic','pesin','stezk','schod','vez','nadvor','sal','putov','poutnik','tulak','strevic','bot','skorn','beh','utik','utek','kocar','sprezen','footstep','walk','path','stairs','tower','shoe','slipper','run','carriage'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/footsteps_on_gravel.ogg',
            'https://actions.google.com/sounds/v1/foley/footsteps_in_water.ogg',
            'https://actions.google.com/sounds/v1/foley/running_on_gravel.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg'],
        dur: 4.0
    },
    {
        id: 'kitchen', emoji: '🍲', label: 'Kuchyně, nádobí a vaření', priority: 3,
        stems: ['kuchyn','kuchar','hrnec','hrnic','kotlik','polevk','kas','pecen','kolac','pernik','med','talir','lzic','nadob','var','bubl','stul','chleb','kitchen','cook','pot','soup','dish','plate','bread'],
        urls: [
            'https://actions.google.com/sounds/v1/water/fountain_water_bubbling.ogg',
            'https://actions.google.com/sounds/v1/foley/dishes_clanking.ogg',
            'https://actions.google.com/sounds/v1/foley/glass_clink.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.2
    },
    {
        id: 'tools', emoji: '🔨', label: 'Řemesla, kovadlina a mlýn', priority: 3,
        stems: ['seker','sekyr','kladiv','kladiv','krumpac','kovadlin','kovar','drevorub','trpasl','dul','skala','skal','kamen','motyk','mlyn','mlynar','kolo','kolovrat','vreten','stave','cihl','drev','axe','hammer','pickaxe','dwarf','dwarves','mill','stone'],
        urls: [
            'https://actions.google.com/sounds/v1/impacts/metal_hit_with_ring.ogg',
            'https://actions.google.com/sounds/v1/doors/knock_on_wooden_door.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.0
    },
    {
        id: 'page', emoji: '📜', label: 'Dopis, kniha a spánek', priority: 3,
        stems: ['knih','strank','dopis','psan','pergamen','inkoust','pero','spink','spanek','usn','usin','postyl','postel','perin','polstar','dobrou','sen','sny','book','page','letter','sleep','bed','pillow','dream'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/page_turn.ogg',
            'https://actions.google.com/sounds/v1/weather/light_breeze.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.0
    }
];

/* ============================================================================
   5. ROZŠÍŘENÁ KNIHOVNA DLOUHÝCH POHÁDEK PRO DĚTI A KNIH PRO DOSPĚLÉ
   ============================================================================ */
const STORIES = {
    kids_cs: [
        {
            title: "👑 Princezna se zlatou hvězdou (Dlouhá uspávací verze)",
            text: "Za sedmero horami a sedmero tichými řekami leželo království, kde žila laskavá princezna Lada. Na čele jí zářila zlatá hvězda, jasná jako večerní slunce. Když do zámku přijel zlý a pyšný král Kazisvět a poručil, že si Ladu vezme za ženu, princezna se v noci tiše vytratila z komnaty. Oblékla si prostý šedivý kožíšek, vzala uzlíček se šaty utkanými z ranní rosy a vydala se lesní cestou do světa. Hluboký zelený les kolem ní tiše šuměl, mezi větvemi zpívali ptáčci a jemný vánek hladil mech u pěšiny. Po dlouhé chůzi došla Lada k čisté lesní studánce. Uložila svůj zlatý poklad a kouzelný závoj pod hladký kámen u vody. Vtom z průzračné studánky vystrčila hlavičku malá stříbrná rybička a zašplouchala ploutvičkou. „Nikomu to neříkej, rybičko, a dobře mi můj poklad opatruj,“ zašeptala princezna. Cestou k sousednímu zámku si umazala tváře popelem a plachetkou zakryla zlatou hvězdu na čele. Zaklepala na těžké dřevěné dveře zámecké kuchyně. Starý dobrý kuchař, kterému v krbu vesele praskal teplý oheň, na plotně bublala voňavá polévka a cinkalo nádobí, přijal skromnou dívku do služby. Jednoho večera se na zámku konal slavný královský ples. Lada vyběhla po schodech na zahradu, pospíchala ke studánce v lese, umyla si tvář čistou vodou a oblékla si šaty třpytivé jako hvězdy. Bílý kůň ji donesl až k zámecké bráně. Mladý princ Radovan z ní nemohl spustit oči, tančil s ní celý večer a navlékl jí na prst zlatý prsten. Když hodiny na věži odbily půlnoc a zazvonil zvon, Lada utekla zpátky do kuchyně. Druhého dne, když kuchař vařil princi polévku, vklouzl prsten do talíře. Princ poznal svou milovanou princeznu se zlatou hvězdou, zazvonily svatební zvony a celé království se pod teplou peřinou uložilo ke sladkému spánku. Dobrou noc."
        },
        {
            title: "🌰 O Popelce a třech kouzelných oříšcích (Dlouhá verze)",
            text: "Byla jednou tichá zima a na střechu starého statku tiše padal bílý sníh. Venku foukal studený vítr, ale uvnitř v kuchyni u veliké pece hřál a praskal červený oheň. V koutku na stoličce seděla hodná Popelka, přebírala hrách z popela a na klíně jí spokojeně předla malá kočička. Najednou na zamrzlé okno zaťukali bílí holoubci, zatřepetali křídly a něžně zavrkali: „Neplač, Popelko, my ti s prací pomůžeme.“ Zatímco holoubci vyzobávali zrníčka, vrátil se ze zasněžené cesty tatínek na koni. Ze sedla sundal tři kouzelné oříšky, které mu v lese spadly přímo do klobouku, když pod dubem zahoukala moudrá sova. Večer odjela macecha se sestrami kočárem na královský zámek. Popelka zůstala sama u krbu, pohladila věrného psa na dvorku, který radostně zaštěkal, a rozlouskla první zlatý oříšek. Zazářilo kouzlo a před ní ležely šaty krásné jako růžové červánky a střevíčky ze samého zlata. Popelka vyběhla ze dveří do stáje, vyhoupla se na bílého koníčka Juráška a cválala tichým zasněženým lesem. V zámeckém sále cinkaly křišťálové lustry a zněla slavnostní hudba. Princ s neznámou princeznou tančil, dokud hodiny na věži neodbily tichou půlnoc. Popelka běžela po zámeckých schodech a na posledním schodu ztratila zlatý střevíček. Ráno přijel princ na koni až na zasněžený dvůr, kde kokrhal kohout. Střevíček Popelce padl jako ulitý, na věži radostně zazvonil zvon a v celém kraji zavládl klid, mír a hluboký spánek."
        },
        {
            title: "🐷 O třech prasátkách a lesním vlkovi (Dlouhá verze)",
            text: "Na kraji prosluněné zelené louky, kde od rána zpívali ptáčci, bzučela pilná včelka a u potůčku kvákala žabka, žila tři malá růžová prasátka. Jednoho dne si sbalila uzlíčky a vyrazila po lesní cestě postavit si vlastní domečky. První prasátko bylo trošku líné, posbíralo na poli žlutou slámu a za chvilku mělo slaměnou chýši. Druhé prasátko sbíralo u lesa dřevěné větvičky, až postavilo lehký domek ze dřeva. Zato třetí prasátko bylo tuze pracovité. Vzalo zednické kladivo, vozilo pevné červené cihly a kameny a celý den stavělo domeček s pevnou střechou, dubovými dveřmi a velkým krbem. Když se snesl večer, v hlubokém lese se ochladilo a mezi smrky zahoukala noční sova. Z temného houští vyšel hladový šedý vlk. Tiše kráčel k prvnímu slaměnému domku, zaklepal na dvířka a hlubokým hlasem zavyl. Pak nabral dech a zafoukal jako prudký vítr. Slaměný domek se rozletěl a první prasátko utíkalo k bráškovi do dřevěného domku. Vlk ale doběhl i tam, znovu zafoukal jako vichřice a rozfoukal i dřevěné stěny. Obě prasátka pelášila k cihlovému domku třetího brášky, vběhla dovnitř a zamkla těžké dveře na dvakrát klíčem. Venku se strhla noční bouřka, v dálce zahřměl hrom a na střechu se spustil tichý déšť. Vlk foukal ze všech sil, ale cihlový dům se ani nepohnul. V chaloupce u teplého krbu praskal oheň, v hrnci bublala dobrá večeře a všechna tři prasátka se zachumlala pod měkkou peřinu a sladce usnula."
        },
        {
            title: "🧣 Červená Karkulka a myslivec (Dlouhá verze)",
            text: "V malé vesničce u zeleného lesa, kde ráno na dvorku kokrhal kohout a na pastvině bečely ovečky, žila hodná holčička. Od babičky dostala červenou sametovou čepičku, a tak jí nikdo neřekl jinak než Červená Karkulka. Jednoho slunečného dne pekla maminka v kuchyni voňavé koláče. V peci praskal oheň a na stole cinkalo nádobí. „Karkulko, zanes babičce do hájovny košíček s koláči a malinovou šťávou, ale nikde se v lese nezdržuj,“ řekla maminka. Karkulka vyšla ze dveří na lesní pěšinu. Mezi vysokými duby a borovicemi zpívali ptáčci, v trávě bzučely včelky a v čistém potůčku žbluňkala studená voda. Zpoza hustého křoví však vykoukl mazaný vlk. Ptal se Karkulky, kam pospíchá, a poradil jí, aby babičce natrhala kytičku lesních květů. Zatímco Karkulka sbírala růžové a fialové kvítky a poslouchala šumění listí, vlk běžel zkratkou přímo k babiččině chaloupce. Třikrát zaklepal na dřevěné dveře, stiskl kliku a vklouzl dovnitř. Když o chvíli později přišla k chaloupce Karkulka, podivila se, proč jsou dveře dokořán. Naštěstí právě kolem hájovny kráčel statečný myslivec se svým věrným psem. Pes ucítil vlka a hlasitě zaštěkal. Myslivec vešel do světnice, babičku i Karkulku vysvobodil a vlka vyhnal hluboko do hor. V chaloupce pak uvařili bylinkový čaj, v krbu zapálili teplý oheň, venku na obloze se rozsvítily zlaté hvězdy a všichni v klidu usnuli."
        },
        {
            title: "🔥 O dvanácti měsíčkách (Dlouhá zimní pohádka)",
            text: "Byla tuhá zima, venku hučel mrazivý vítr, z mraků se sypal bílý sníh a na oknech chaloupky kvetly ledové květy. Zatímco macecha s Holenou seděly v teple u pece, poslaly hodnou Marušku do temného zimního lesa, aby jim přinesla kytičku fialových fialek. Maruška si přehodila starý šátek, otevřela vrzající dveře a vykročila do hlubokých závějí. Pod nohama jí křupal mráz, mezi smrky kvílela meluzína a na zasněžené větvi zahoukala sova. Maruška kráčela výš a výš do hor, až na samém vrcholku spatřila mezi stromy jasnou zlatou záři. Uprostřed mýtiny plápolal veliký oheň, dřevo v něm vesele praskalo a k nebi stoupal teplý dým. Kolem ohniště sedělo na dvanácti kamenech dvanáct tichých mužů. Nejstarší z nich, Leden s dlouhým bílým vousem, vyslechl Maruščinu prosbu, vstal a udeřil kouzelnou holí o zem. Plameny v ohništi vyšlehly vysoko a žezlo převzal mladý Březen. V jediném okamžiku přestal foukat ledový vítr, sníh roztál, v potůčku radostně zašplouchala čistá voda, na větvích zazpívali ptáčci a v zeleném mechu rozkvetly voňavé fialky. Když pak Maruška musela do lesa znovu pro červené jahody a sladká jablíčka, pomohl jí teplý Červen i zlatý Září, kolem kterých bzučely včelky a šuměl letní vánek. Doma v chaloupce se Maruška zahřála u krbu, vypila teplý čaj a pod měkkou peřinou se ponořila do nejkrásnějších snů."
        }
    ],
    adults_cs: [
        {
            title: "🗡️ Zaklínačská noc: Stříbrný meč v bouři (Fantasy)",
            text: "Těžké kapky podzimního deště bubnovaly do olověných okenic starého zájezdního hostince na úpatí hor. Uvnitř krčmy praskal v kamenném krbu mohutný oheň, cinkaly sklenice s rubínovým vínem a od dubových stolů se nesl tlumený šum hovorů. Cizinec s bílými vlasy seděl v rohu ve stínu, pomalu otáčel stránku staré kroniky a poslouchal, jak venku sílí noční vichřice. Najednou se rozletěly těžké dřevěné dveře a dovnitř vpadl promrzlý ponocný. V dálce za hradbami temného lesa se ozvalo táhlé, mrazivé zavytí vlka a hned po něm zahřměl hrom. Cizinec odložil měšec se zlatými mincemi na stůl, přehodil si plášť přes ramena a vyšel do deště. Ve stáji zařehtal jeho černý kůň a neklidně hrábl kopytem. Když vyjeli na kamenitou lesní cestu, mezi staletými duby houkala sova a nad propastí krákali krkavci. U starého kamenného mostu, pod kterým hučela divoká horská řeka, se ze tmy vynořil obrovský stín netvora a temně zařval. Zazvonila ocel, když cizinec tasil stříbrný meč. V záblesku blesku se střetla čepel s drápy v prudkém souboji, jiskry létaly do tmy a vzduchem projelo ohnivé kouzlo. Po posledním úderu se les ponořil do ticha, jen déšť tiše smýval stopy v mechu. Cizinec se vrátil do bezpečí krčmy, přiložil poleno do teplého krbu, zaposlouchal se do klidného praskání plamenů a nechal únavu, aby ho odnesla do hlubokého spánku."
        },
        {
            title: "🕵️ Půlnoční expres a stíny v kavárně (Noir Detektivka)",
            text: "Hodiny na staroměstské věži odbily jedenáctou hodinu a mlhou nad dlážděnými ulicemi se nesl tichý déšť. V malé noční kavárně na rohu nádražní třídy voněla čerstvá káva, jemně cinkaly porcelánové šálky a za zamlženým oknem míjela světla posledních kočárů. Soukromý detektiv seděl u zadního stolu, v prstech obracel starý mosazný klíč a četl zažloutlý dopis, jehož stránky tiše šustily. Každé zaklepání na skleněné dveře kavárny ho přinutilo zvednout oči. Když zaplatil několika stříbrnými mincemi, zvedl límec kabátu a vykročil do deštivé noci. Jeho kroky zněly na mokrém štěrku opuštěného perónu, zatímco v podloubí kvílel studený vítr. Z mlhy se náhle vynořil noční expres; parní lokomotiva táhle zahoukala a těžká kola skřípala po kolejích. Detektiv nastoupil do dřevěného vagónu, prošel úzkou uličkou a klíčem odemkl zamčené kupé na konci vlaku. Na stolku u okna tam v šeru tikaly staré kapesní hodiny a vedle nich ležela zapečetěná truhlička s královským rubínem. Tajemství případu bylo konečně rozluštěno. Vlak se s pravidelným kolébavým rytmem rozjel do tiché krajiny, za oknem šuměl noční les a rytmický zvuk kolejí pomalu ukolébal unaveného detektiva ke klidnému spánku."
        },
        {
            title: "🍷 Listopadový dopis u krbu (Román)",
            text: "Staré venkovské sídlo na útesu nad mořem tonulo v podzimním podvečeru. Zespoda z kamenité pláže doléhal pravidelný příboj mořských vln, které se s tichým šuměním tříštily o břeh, a v zahradě za oknem šustilo spadané listí ve větru. V prostorné knihovně vonělo staré dřevo a v mramorovém krbu hřál a tiše praskal zlatavý oheň. Klára seděla v hlubokém křesle s teplou dekou přes kolena, na stolku vedle ní cinkla sklenice s červeným vínem a u jejích nohou tiše předla mourovatá kočka. Opatrně rozložila pergamenový dopis a začala číst řádky psané dávným inkoustem. Každá otočená stránka vracela vzpomínky na léto, kdy na loukách zpívali ptáci, u řeky cválali koně a ze zámecké věže zněly zvony. Venku se spustil jemný, konejšivý déšť a jeho kapky pravidelně ťukaly na okenní tabulky. Hodiny v hale tiše odbily půlnoc. Klára dopis složila do dřevěné truhličky, zhasla stolní lampu a dívala se do dohasínajících uhlíků v krbu, dokud ji šumění deště a vzdáleného moře neukolébilo do tichého, bezstarostného snu."
        }
    ],
    kids_en: [
        {
            title: "🌰 Cinderella and the Three Magic Hazelnuts (Long Bedtime Tale)",
            text: "Outside the old manor house, soft white snow was falling and a cold winter wind blew through the forest trees. Inside the kitchen, however, a warm red fire crackled in the hearth and a gentle cat purred near the ashes. Kind Cinderella sat quietly by the fire when white doves tapped on the wooden window and fluttered their wings to help her. Her father returned on his horse from a long journey and brought her three magic hazelnuts from the woods where an owl had hooted in an old oak tree. When Cinderella opened the first hazelnut, a dress shining like the golden sun and delicate slippers appeared. She rode her white horse through the snowy forest to the royal castle where music played and glasses clinked at the grand ball. She danced with the prince until the tower clock bell chimed midnight. Cinderella ran down the stairs and lost her golden slipper. The next morning, as the rooster crowed in the village, the prince arrived on his horse, found his true princess, wedding bells rang across the land, and everyone drifted into deep, peaceful sleep."
        },
        {
            title: "🐷 The Three Little Pigs and the Cozy Hearth",
            text: "Three little piglets walked down the sunny meadow path where birds sang in the green trees, bees buzzed among the flowers, and a frog croaked by the flowing stream. The first pig built a house of straw, the second built a cottage of wooden branches, and the third pig used a heavy hammer and red bricks to build a strong stone house with a warm fireplace. When night fell, an owl hooted in the dark forest and a hungry wolf came out of the shadows. He knocked on the wooden door and began to howl. Then he blew like a strong storm wind until the first two houses flew away. The little pigs ran fast along the gravel path into their brother's brick cottage and locked the heavy door with a key. Outside, thunder rolled and gentle rain fell on the roof, but inside by the crackling fire and bubbling soup pot, all three piglets climbed into their soft bed and fell fast asleep."
        }
    ],
    adults_en: [
        {
            title: "🗡️ The Silver Blade in the Storm (Dark Fantasy)",
            text: "Autumn rain drummed against the windows of the old wayside tavern while a warm fire crackled in the stone hearth and wine glasses clinked at the wooden tables. A lone traveler turned the page of an ancient book as the night wind howled outside. Suddenly, a distant wolf howl echoed from the dark forest, followed by rolling thunder. He paid with gold coins, mounted his black horse in the courtyard, and rode along the forest path by the rushing river. Near the ruined castle gate, a monstrous shadow let out a deep roar. Steel rang out as his sword clashed in battle beneath the lightning. When silence returned to the woods, he rode back to the cozy inn, sat by the glowing fireplace, and drifted into quiet sleep."
        },
        {
            title: "🕵️ Midnight Express & Shadows in the Café (Noir Detective)",
            text: "The tower clock bell chimed eleven as soft rain fell over the cobblestone streets. Inside the corner coffee shop, porcelain cups clinked and a detective turned the page of an old letter while holding a brass key. A knock on the door made him look up. He paid with silver coins and walked along the gravel station platform as the cold wind blew. Suddenly the night train horn echoed through the mist. He boarded the carriage, unlocked the compartment door, and found the royal treasure chest ticking beside a pocket clock. As the train rolled gently through the dark forest, he closed his eyes and fell asleep."
        }
    ]
};

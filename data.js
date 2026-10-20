/* ============================================================================
   AtmoRead v6.3.2 — DATA.JS
   Robustní databáze 100% ověřených reálných zvuků (One-Shot + 15-20s Tail),
   priorit, barevných aur, dynamických nálad, ukolébavek (pro děti),
   atmosfér (pro dospělé) a pohádek/knih s volitelnou délkou (do 5 / 15 / 30 min).
   Verzování: SemVer (MAJOR.MINOR.PATCH) — v6.3.2
   ============================================================================ */

/* 1. ČTYŘI SMYSLUPLNÉ REŽIMY VYSOCE SVÍTIVÉ LAMPIČKY */
const LAMP_MODES = [
    {
        id: 'cream',
        name: '📖 Čtecí krémová',
        desc: 'Na čtení knihy',
        rgb: [255, 244, 214],
        hex: '#fff4d6'
    },
    {
        id: 'candle',
        name: '🕯️ Svíčka (1800K)',
        desc: 'Zlatavé světlo',
        rgb: [255, 155, 35],
        hex: '#ff9b23'
    },
    {
        id: 'red',
        name: '🍎 Spánková červená',
        desc: 'Pro melatonin',
        rgb: [225, 38, 24],
        hex: '#e12618'
    },
    {
        id: 'dynamic',
        name: '✨ Dynamická',
        desc: 'Podle děje',
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
        stems: ['fialov','fialk','kouzl','car','zazrak','vil','zavoj','zrcadl','tajemn','carodej','sudic','pran','strib','stín','vesmir','raket','magic','fairy','spell','witch','space']
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
        stems: ['bour','hrom','blesk','vichr','mec','boj','souboj','rytir','drak','cert','strach','utik','utek','kletb','strel','vrah','detektiv','stín','nebezpec','vybuch','valk','battle','storm','sword','danger']
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
        name: '☕ Kavárna a město',
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
            'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg'
        ],
        stems: ['kavarn','kav','salek','caj','vino','sklenic','vlak','nadraz','kolej','kupe','novin','dopis','ulic','lamp','kabat','detektiv','roman','kancelar','pocitac','auto','mest','cafe','coffee','train','station','letter','city']
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
   3. PODKRESY ROZDĚLENÉ PRO DĚTI (UKOLÉBAVKY) A PRO DOSPĚLÉ (ATMOSFÉRA PRO ČTENÍ)
   Výchozí aktivní režim: 'auto_mood' (Dynamický podkres scény)
   ============================================================================ */
const LULLABY_LIST = [
    { id: 'off',           icon: '🔇', title: 'Bez podkresu',           desc: 'Pouze zvuky příběhu' },
    { id: 'auto_mood',     icon: '🎭', title: 'Dynamický podkres',      desc: 'Mění se sám podle děje' },
    { id: 'classic_piano', icon: '🎹', title: 'Noční klavír & Smyčce',  desc: 'Uklidňující Public Domain hudba na hodiny čtení' },
    { id: 'brahms',        icon: '🎠', title: 'Brahmsova ukolébavka',   desc: 'Klasická hrací skříňka' },
    { id: 'twinkle',       icon: '✨', title: 'Twinkle Twinkle',        desc: 'Třpytivá hvězdička' },
    { id: 'clair',         icon: '🌙', title: 'Clair de Lune',          desc: 'Jemný měsíční svit' },
    { id: 'harp',          icon: '🎹', title: 'Pohádková harfa',        desc: 'Hřejivé akordy harfy' },
    { id: 'chimes',        icon: '🎐', title: 'Zvonkohra ve větru',     desc: 'Křišťálové tóny a vánek' },
    { id: 'pinknoise',     icon: '🌊', title: 'Růžový šum a moře',      desc: 'Hluboké uspávání miminek' }
];

const ADULT_AMBIENCE_LIST = [
    { id: 'off',             icon: '🔇', title: 'Bez podkresu',           desc: 'Pouze zvuky z děje' },
    { id: 'auto_mood',       icon: '🎭', title: 'Dynamický podkres',      desc: 'Mění se sám podle děje' },
    { id: 'classic_piano',   icon: '🎹', title: 'Noční klavír & Smyčce',  desc: 'Uklidňující Public Domain hudba na hodiny čtení' },
    { id: 'jazz_noir',       icon: '🎷', title: 'Noční klavír & Déšť',    desc: 'Detektivní noir a kapky' },
    { id: 'cafe_lounge',     icon: '☕', title: 'Pařížská kavárna',       desc: 'Šum kavárny, šálky a déšť' },
    { id: 'fireplace_storm', icon: '🔥', title: 'Praskající krb & Bouřka', desc: 'Oheň a vzdálené hřmění' },
    { id: 'night_train',     icon: '🚂', title: 'Noční expres',           desc: 'Jízda vlakem do noci' },
    { id: 'fantasy_tavern',  icon: '🏰', title: 'Středověký hrad & Loutna', desc: 'Fantasy struny a ohniště' },
    { id: 'deep_focus',      icon: '🌊', title: 'Noční oceán & Ambient',  desc: 'Hluboké soustředění u moře' }
];

/* ============================================================================
   4. ROBUSTNÍ KNIHOVNA 100% OVĚŘENÝCH ZVUKŮ ZE VŠECH OBORŮ
   (Zvířata, příroda, živly, zbraně, stroje, doprava, dílna, nástroje,
    hudební nástroje, domácnost, kancelář, sport a lidské projevy)
   Priority:
     1 = Dominantní zvrat / bouře / boj / výbuch / vlak / siréna
     2 = Zvířata / stroje / auta / nástroje / hudební nástroje / živly
     3 = Kroky / dveře / nádobí / psaní / drobné ruchy
   ============================================================================ */
const SOUND_LIBRARY = [
    // ========================================================================
    // PRIORITA 1: BOUŘE, ZBRANĚ, VÝBUCHY, DRAK, VLAK, SIRÉNA, NAPĚTÍ
    // ========================================================================
    {
        id: 'thunder', emoji: '⛈️', label: 'Bouřka a hrom', priority: 1,
        stems: ['bour','bourk','bouri','hrom','zahrm','hrmi','hromobit','blesk','zablesk','mracn','thunder','storm','lightning'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/rolling_thunder.ogg',
            'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg',
            'https://actions.google.com/sounds/v1/weather/distant_thunder.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_rain.ogg'],
        dur: 5.8
    },
    {
        id: 'sword', emoji: '⚔️', label: 'Šerm a souboj mečů', priority: 1,
        stems: ['mec','savl','dyk','kord','rapir','stit','brnen','zbroj','prilb','rytir','souboj','bitv','boj','sekn','sekal','usek','kopi','halapartn','sip','luk','kuse','straz','vojak','zaklinac','serm','sword','knight','shield','armor','battle','blade','duel','arrow'],
        urls: [
            'https://actions.google.com/sounds/v1/weapons/sword_clang.ogg',
            'https://actions.google.com/sounds/v1/sports/metal_strike.ogg',
            'https://actions.google.com/sounds/v1/impacts/crash_metal_sliding_on_metal.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 4.2
    },
    {
        id: 'gunfire', emoji: '🔫', label: 'Výstřel a střelná zbraň', priority: 1,
        stems: ['pistol','revolver','pusk','flint','kulovnic','samopal','kulomet','zbran','vystrel','strelb','strelil','palb','naboj','kulk','brokovnic','odstrel','gun','pistol','rifle','shot','shoot','bullet','weapon','firearm'],
        urls: [
            'https://actions.google.com/sounds/v1/weapons/rifle_shot_echo.ogg',
            'https://actions.google.com/sounds/v1/weapons/gunfire.ogg',
            'https://actions.google.com/sounds/v1/weapons/single_gunshot.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 4.2
    },
    {
        id: 'explosion', emoji: '💥', label: 'Výbuch, dělo a kanón', priority: 1,
        stems: ['vybuch','exploz','bomb','granat','dynamit','minomet','delo','dela','kanon','raketomet','detonac','vyhodil','explosion','explode','bomb','cannon','artillery','blast','grenade'],
        urls: [
            'https://actions.google.com/sounds/v1/weapons/big_explosion_cut_off.ogg',
            'https://actions.google.com/sounds/v1/weapons/howitzer_cannon_fire.ogg',
            'https://actions.google.com/sounds/v1/weapons/artillery_fire_distant.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 5.2
    },
    {
        id: 'dragon', emoji: '🐉', label: 'Drak / Medvěd / Lev / Šelma', priority: 1,
        stems: ['drak','drac','sane','obri','obrovi','otesan','lidozrout','netvor','oblud','priser','monstr','medved','medvid','lev','lva','lvi','lvem','tygr','leopard','panter','zarv','rval','dragon','giant','ogre','bear','lion','tiger','roar','monster','beast'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/animal_bark_and_growl.ogg',
            'https://actions.google.com/sounds/v1/animals/dog_growling.ogg',
            'https://actions.google.com/sounds/v1/animals/dog_snarling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.8
    },
    {
        id: 'train', emoji: '🚂', label: 'Vlak a železnice', priority: 1,
        stems: ['vlak','vlaku','vlakem','lokomotiv','vagon','kupe','kolej','nadraz','peron','zeleznic','parn','expres','rychlik','pendolin','strojvedouc','train','railway','station','locomotive','railroad'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/train_horn.ogg',
            'https://actions.google.com/sounds/v1/transportation/train_passing_by.ogg',
            'https://actions.google.com/sounds/v1/cartoon/wooden_train_whistle.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/transportation/train_passing_by.ogg'],
        dur: 5.5
    },
    {
        id: 'siren', emoji: '🚨', label: 'Siréna, policie, hasiči a sanitka', priority: 1,
        stems: ['siren','houkack','polici','policejn','sanitk','zachrank','hasic','pozar','poplach','alarm','majak','nehod','siren','ambulance','police','emergency','alarm'],
        urls: [
            'https://actions.google.com/sounds/v1/emergency/ambulance_siren.ogg',
            'https://actions.google.com/sounds/v1/emergency/emergency_siren_short_burst.ogg',
            'https://actions.google.com/sounds/v1/emergency/ambulance_siren_distant.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/outdoor_suburb_traffic.ogg'],
        dur: 4.8
    },
    {
        id: 'suspense', emoji: '🕵️', label: 'Napětí a tajemství', priority: 1,
        stems: ['tajemstv','stín','podezrel','stopa','dukaz','vrazd','detektiv','komisar','vysetrov','strach','lek','vylek','temnot','hrozb','kletb','duch','strasidl','prizrak','mystery','detective','shadow','fear','ghost','horror'],
        urls: [
            'https://actions.google.com/sounds/v1/science_fiction/suspense_builder.ogg',
            'https://actions.google.com/sounds/v1/science_fiction/forboding_resonance.ogg',
            'https://actions.google.com/sounds/v1/doors/creaking_wooden_door.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 5.0
    },

    // ========================================================================
    // PRIORITA 2: 100% OVĚŘENÁ ZVÍŘATA
    // ========================================================================
    {
        id: 'dog', emoji: '🐶', label: 'Pes a štěkot', priority: 2,
        stems: ['pes','pejs','pejsek','psa','psovi','psu','psem','psi','psik','sten','stenat','stek','zastek','haf','hafan','ohar','voris','hlidac','čokl','jezevcik','ovcak','dog','dogs','bark','barking','puppy','hound','woof'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/dog_barking.ogg',
            'https://actions.google.com/sounds/v1/animals/animal_bark_and_growl.ogg',
            'https://actions.google.com/sounds/v1/animals/distant_dog_barking.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 4.2
    },
    {
        id: 'wolf', emoji: '🐺', label: 'Vlk a vrčení šelmy', priority: 2,
        stems: ['vlk','vlc','vlka','vlku','vlkem','vlci','vlcic','smeck','vyje','zavyl','vyti','vrc','zavrc','tesak','selm','hyen','sakal','wolf','wolves','howl','growl','pack'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/dog_growling.ogg',
            'https://actions.google.com/sounds/v1/animals/dog_snarling.ogg',
            'https://actions.google.com/sounds/v1/animals/animal_bark_and_growl.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'],
        dur: 4.8
    },
    {
        id: 'cat', emoji: '🐱', label: 'Kočka, kocour a mňoukání', priority: 2,
        stems: ['kock','kocic','kote','kotat','kotatk','kocour','mnouk','zamnouk','mnau','vrni','zavrni','prede','tichoslap','mick','mourek','cat','cats','kitten','kitty','meow','purr'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/6/62/Meow.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/0/0c/Meow_domestic_cat.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/9/9c/Audio_file_of_cat_meowing.ogg',
            'https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg'],
        dur: 4.2
    },
    {
        id: 'horse', emoji: '🐴', label: 'Kůň, klus kopyt a kočár', priority: 2,
        stems: ['kun','kone','koni','konem','konik','konic','hrebec','klisn','hrib','hribat','reht','zareht','kopyt','cval','klus','juras','sedl','uzd','staj','kocar','bryck','povoz','sprezen','horse','horses','pony','gallop','stallion','mare','carriage','hooves'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/horse_and_carriage.ogg',
            'https://actions.google.com/sounds/v1/transportation/horse_team.ogg',
            'https://actions.google.com/sounds/v1/animals/horse_eating_grass.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 5.0
    },
    {
        id: 'bird', emoji: '🐦', label: 'Zpěv ptáčků a holoubků', priority: 2,
        stems: ['ptak','ptac','zpev','zazpiv','cvrlik','pip','vlastov','slavik','skrivan','holub','holoub','hrdlic','cap','labut','kridl','peri','ohnivak','vrabc','sykor','kos','papous','datel','bird','birds','chirp','dove','pigeon','swan','sparrow','woodpecker'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/june_songbirds.ogg',
            'https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg',
            'https://actions.google.com/sounds/v1/animals/woodpecker_pecking_fast.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg'],
        dur: 4.8
    },
    {
        id: 'owl', emoji: '🦉', label: 'Noční sova a houkání', priority: 2,
        stems: ['sov','sova','sovy','sove','sovou','sovi','sovic','vyr','puštik','sycek','zahouk','huu','rozark','owl','owls','hoot'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/owl_hooting.ogg',
            'https://actions.google.com/sounds/v1/animals/afternoon_crickets_long.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'],
        dur: 4.8
    },
    {
        id: 'crow', emoji: '🐦‍⬛', label: 'Krkavec, vrána a orel', priority: 2,
        stems: ['krkav','vran','havran','krak','zakrak','krahuj','jestrab','orel','orl','sokol','sup','crow','crows','raven','hawk','eagle','falcon'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/crow_call.ogg',
            'https://actions.google.com/sounds/v1/animals/crows_caw_in_field.ogg',
            'https://actions.google.com/sounds/v1/animals/crows_picking_at_carcass.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.2
    },
    {
        id: 'frog', emoji: '🐸', label: 'Žába a kvákání u rybníka', priority: 2,
        stems: ['zab','zaba','zaby','zabe','zabou','zabic','zabak','kvak','zakvak','kunk','ropuch','pulec','mokrad','baz','frog','frogs','toad','croak'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/a/a9/De-Frosch2.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/9/9f/Single_Frog_Croak.oga',
            'https://upload.wikimedia.org/wikipedia/commons/6/60/Night_Chorus_of_Frogs_and_Toads_in_Niger_Delta.ogg',
            'https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'],
        dur: 4.5
    },
    {
        id: 'pig', emoji: '🐷', label: 'Prasátko a chlívek', priority: 2,
        stems: ['pras','prase','prasat','prasatk','cunik','pasik','kanec','knour','svin','chrocht','zachrocht','rypac','chliv','pig','pigs','piglet','oink','boar','hog'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/animal_squealing.ogg',
            'https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg'],
        dur: 4.5
    },
    {
        id: 'cow_sheep', emoji: '🐑', label: 'Ovečka, kráva, koza a pastvina', priority: 2,
        stems: ['krav','tele','telat','vul','byk','buc','zabuc','ovc','ovce','ovci','ovec','oveck','beran','jehn','jehnat','bec','zabec','koz','koza','kozy','kozic','kuzl','osel','oslik','pastv','stado','cow','cattle','moo','bull','sheep','lamb','goat','donkey'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/2/28/Sheep_bleat.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/1/13/Sheep_bleating.ogg',
            'https://actions.google.com/sounds/v1/ambiences/farm_morning_with_sheep.ogg',
            'https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/farm_morning_with_sheep.ogg'],
        dur: 4.8
    },
    {
        id: 'rooster', emoji: '🐓', label: 'Kohout, slepice, husa a kachna', priority: 2,
        stems: ['kohout','kokrh','zakokrh','kykyr','slepic','slípk','kur','kure','kurat','kdak','kachn','kacer','hus','husa','husy','houser','kurnik','statek','dvur','dvorek','rooster','cock','hen','chicken','chick','duck','goose','geese','farm','barnyard'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c5/Rooster_crowing.ogg',
            'https://actions.google.com/sounds/v1/ambiences/inside_barn_with_chickens.ogg',
            'https://actions.google.com/sounds/v1/animals/geese_outside.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/4/43/Young_rooster_crowing.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/inside_barn_with_chickens.ogg'],
        dur: 4.8
    },
    {
        id: 'mouse', emoji: '🐭', label: 'Myš, křeček a veverka', priority: 2,
        stems: ['mys','mysi','mysk','krys','potkan','krecek','veverk','jezek','krtek','hlodav','piskl','zapisk','mouse','mice','rat','hamster','squirrel','squeak'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/mouse_squeaking.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg'],
        dur: 3.8
    },
    {
        id: 'snake', emoji: '🐍', label: 'Had, zmije a zasyčení', priority: 2,
        stems: ['had','hada','hadu','hadi','zmij','kobr','chrestys','anakond','plaz','zasyc','sykot','ustkn','snake','viper','cobra','serpent','rattlesnake','hiss'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/animal_hiss_and_rattle.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'],
        dur: 4.2
    },
    {
        id: 'insect', emoji: '🐝', label: 'Včelka, moucha a cvrčci', priority: 2,
        stems: ['vcel','vcela','vcelk','vcelic','cmelak','vos','vosa','srsen','mouch','musk','komar','mraven','brouk','cvrc','cvrcek','motyl','bzuc','zabzuc','ul','hmyz','bee','bees','wasp','fly','mosquito','ant','beetle','cricket','buzz','insect'],
        urls: [
            'https://actions.google.com/sounds/v1/animals/bee_buzz.ogg',
            'https://actions.google.com/sounds/v1/animals/swarming_bees.ogg',
            'https://actions.google.com/sounds/v1/animals/buzzing_fly.ogg',
            'https://actions.google.com/sounds/v1/animals/afternoon_crickets_long.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/animals/afternoon_crickets_long.ogg'],
        dur: 4.4
    },

    // ========================================================================
    // PRIORITA 2: STROJE, DOPRAVA, AUTA, LETADLA, TOVÁRNA, VESMÍR
    // ========================================================================
    {
        id: 'car', emoji: '🚗', label: 'Auto, motor a silnice', priority: 2,
        stems: ['aut','auto','auta','autem','automobil','vuz','vozu','vozem','vozidl','motor','volant','brzd','plyn','klakson','zatrub','silnic','dalnic','garaz','taxik','taxi','ridic','benzin','car','cars','automobile','vehicle','engine','drive','driving','highway','horn','traffic'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/muscle_car_start_idle_and_drive_away.ogg',
            'https://actions.google.com/sounds/v1/transportation/car_engine_idling_accelerating.ogg',
            'https://actions.google.com/sounds/v1/transportation/car_horn.ogg',
            'https://actions.google.com/sounds/v1/transportation/car_drive_by.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/outdoor_suburb_traffic.ogg'],
        dur: 5.0
    },
    {
        id: 'motorcycle', emoji: '🏍️', label: 'Motorka a skútr', priority: 2,
        stems: ['motork','motocykl','skutr','moped','chopper','motorkar','prilb','motorcycle','motorbike','scooter','biker'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/motorcycle_engine_start_idle_kill.ogg',
            'https://actions.google.com/sounds/v1/transportation/motorcycle_drive_by.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/outdoor_suburb_traffic.ogg'],
        dur: 5.0
    },
    {
        id: 'truck_tractor', emoji: '🚜', label: 'Traktor, kamion, autobus a bagr', priority: 2,
        stems: ['traktor','kamion','nakladak','autobus','trolejbus','bagr','buldozer','jerab','kombajn','orba','pole','tractor','truck','lorry','bus','excavator','bulldozer'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/tractor_background_noise.ogg',
            'https://actions.google.com/sounds/v1/transportation/large_truck_driving.ogg',
            'https://actions.google.com/sounds/v1/transportation/dump_truck_idling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/transportation/tractor_background_noise.ogg'],
        dur: 5.2
    },
    {
        id: 'airplane', emoji: '✈️', label: 'Letadlo, vrtulník a letiště', priority: 2,
        stems: ['letadl','letoun','stihack','vrtulnik','helikopter','letist','pilot','vzlet','pristan','obloh','padak','balon','vzducholod','airplane','plane','aircraft','jet','helicopter','airport','flight','pilot'],
        urls: [
            'https://actions.google.com/sounds/v1/transportation/airplane_in_flight.ogg',
            'https://actions.google.com/sounds/v1/transportation/prop_plane_take_off.ogg',
            'https://actions.google.com/sounds/v1/transportation/helicopter_by.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/transportation/airplane_in_flight.ogg'],
        dur: 5.4
    },
    {
        id: 'bicycle', emoji: '🚲', label: 'Jízdní kolo a cyklista', priority: 2,
        stems: ['kolobez','cyklist','bicykl','slapal','pedal','riditk','prehazovack','skateboard','bicycle','bike','cycling','pedal','skateboard'],
        urls: [
            'https://actions.google.com/sounds/v1/sports/bicycle_pedaling.ogg',
            'https://actions.google.com/sounds/v1/sports/bicycle_pedaling_old_chain.ogg',
            'https://actions.google.com/sounds/v1/sports/skateboard_kick_push.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.2
    },
    {
        id: 'factory_machine', emoji: '⚙️', label: 'Stroj, továrna, robot a technika', priority: 2,
        stems: ['stroj','strojovn','tovarn','fabrik','vyrob','mechanis','ozuben','pist','ventil','cerpadl','generator','turbin','transformator','lis','robot','android','kyborg','automat','machine','machinery','factory','engine','gear','robot','industrial','motor'],
        urls: [
            'https://actions.google.com/sounds/v1/tools/machine_rumble.ogg',
            'https://actions.google.com/sounds/v1/ambiences/factory_background.ogg',
            'https://actions.google.com/sounds/v1/transportation/metal_gear_shifting.ogg',
            'https://actions.google.com/sounds/v1/science_fiction/robot_code.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/factory_background.ogg'],
        dur: 5.0
    },
    {
        id: 'spaceship', emoji: '🚀', label: 'Vesmír, raketa, sci-fi a laser', priority: 2,
        stems: ['vesmir','kosm','raket','kosmick','galaxi','planet','orbit','satelit','druzic','mimozem','ufon','ufo','laser','paprsek','teleport','warp','hvezdolet','space','spaceship','rocket','alien','laser','galaxy','scifi'],
        urls: [
            'https://actions.google.com/sounds/v1/science_fiction/sci_fi_vortex.ogg',
            'https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg',
            'https://actions.google.com/sounds/v1/science_fiction/outer_space.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/science_fiction/outer_space.ogg'],
        dur: 5.2
    },

    // ========================================================================
    // PRIORITA 2: NÁSTROJE, DÍLNA, STAVBA A ŘEMESLA
    // ========================================================================
    {
        id: 'hammer_forge', emoji: '🔨', label: 'Kladivo, kovadlina, kovář a stavba', priority: 2,
        stems: ['kladiv','kladivk','palic','kovadlin','kovar','kovarn',' podkov','hrebik','zatlouk','pribil','zednik','stavb','cihl','kov','zelezn','ocel','hammer','anvil','blacksmith','forge','nail','build','brick'],
        urls: [
            'https://actions.google.com/sounds/v1/tools/hammering_into_wood.ogg',
            'https://actions.google.com/sounds/v1/tools/hammer_on_cement.ogg',
            'https://actions.google.com/sounds/v1/tools/hitting_wedge_with_maul.ogg',
            'https://actions.google.com/sounds/v1/sports/metal_strike.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.4
    },
    {
        id: 'saw_wood', emoji: '🪚', label: 'Pila, sekera a řezání dřeva', priority: 2,
        stems: ['pil','pila','pilu','pilou','pilk','motorov','cirkulark','rezal','rizl','seker','sekyr','drevorub','kacel','pokac','polen','klada','stip','truhl','tesar','saw','chainsaw','axe','chop','lumber','wood','carpenter'],
        urls: [
            'https://actions.google.com/sounds/v1/tools/skil_saw_motor_run.ogg',
            'https://actions.google.com/sounds/v1/tools/chopping_log.ogg',
            'https://actions.google.com/sounds/v1/impacts/splitting_fire_wood.ogg',
            'https://actions.google.com/sounds/v1/impacts/chopping_tree.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 4.6
    },
    {
        id: 'drill_tools', emoji: '🪛', label: 'Vrtačka, šroubovák, klíč a dílna', priority: 2,
        stems: ['vrtack','vrtal','vyvrt','sroub','sroubovak','matic','francouz','racn','brusk','pilnik','sverak','diln','narad','oprav','montov','drill','screwdriver','wrench','tool','tools','workshop','repair'],
        urls: [
            'https://actions.google.com/sounds/v1/tools/18v_cordless_drill_high_pitch.ogg',
            'https://actions.google.com/sounds/v1/tools/household_drill.ogg',
            'https://actions.google.com/sounds/v1/tools/ratchet_wrench_fast.ogg',
            'https://actions.google.com/sounds/v1/tools/ratchet_wrench_slow.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/factory_background.ogg'],
        dur: 4.4
    },
    {
        id: 'shovel_dig', emoji: '⛏️', label: 'Lopata, krumpáč, kopání a důl', priority: 2,
        stems: ['lopat','ryc','krumpac','motyk','kopal','vykop','hrob','jam','hlín','pisk','kamen','skal','dul','hornik','trpasl','jeskyn','shovel','spade','pickaxe','dig','digging','mine','miner','dwarf','stone','rock'],
        urls: [
            'https://actions.google.com/sounds/v1/tools/shovel_digging_dirt.ogg',
            'https://actions.google.com/sounds/v1/impacts/stone_drop.ogg',
            'https://actions.google.com/sounds/v1/impacts/metal_banging_against_rocks.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 4.2
    },
    {
        id: 'sewing_scissors', emoji: '✂️', label: 'Nůžky, šicí stroj, jehla a krejčí', priority: 3,
        stems: ['nuzk','strih','ustrih','sici','jehl','nit','krejc','svadl','latk','platn','kolovrat','vreten','tkalc','scissors','snip','sewing','needle','thread','tailor','cloth'],
        urls: [
            'https://actions.google.com/sounds/v1/office/scissor_snips.ogg',
            'https://actions.google.com/sounds/v1/tools/sewing_machine_series.ogg',
            'https://actions.google.com/sounds/v1/tools/industrial_sewing_machine.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.0
    },

    // ========================================================================
    // PRIORITA 2: HUDEBNÍ NÁSTROJE (REÁLNÉ NAHRÁVKY + AKUSTICKÝ SOakord)
    // ========================================================================
    {
        id: 'piano_inst', emoji: '🎹', label: 'Klavír, piáno a varhany', priority: 2,
        instrumentChord: 'piano',
        stems: ['klavir','pian','klaves','varhan','cembal','harmonik','akordeon','melodi','koncert','skladatel','noty','piano','organ','keyboard','melody','concert'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c7/CMajor_Chord_in_Different_Instruments.ogg',
            'https://actions.google.com/sounds/v1/cartoon/xylophone_tip_toe_scale_up.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
        dur: 4.6
    },
    {
        id: 'guitar_harp', emoji: '🎸', label: 'Kytara, loutna, harfa a struny', priority: 2,
        instrumentChord: 'guitar',
        stems: ['kytar','loutn','harf','mandolin','ukulel','banj','citer','strun','brnk','zahrál','akord','bard','trubadur','guitar','lute','harp','strings','chord','strum','banjo'],
        urls: [
            'https://actions.google.com/sounds/v1/cartoon/instrument_strum.ogg',
            'https://upload.wikimedia.org/wikipedia/commons/c/cc/9577_Guitarz1970_Clean_E9_Guitar_Chord_%28Mike_Tribulas%29.ogg',
            'https://actions.google.com/sounds/v1/cartoon/concussive_guitar_hit.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.5
    },
    {
        id: 'violin_strings', emoji: '🎻', label: 'Housle, violoncello a smyčce', priority: 2,
        instrumentChord: 'violin',
        stems: ['housl','houslic','violoncell','cello','kontrabas','smycec','symfoni','orchestr','dirigent','violin','fiddle','cello','orchestra','symphony'],
        urls: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c7/CMajor_Chord_in_Different_Instruments.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.6
    },
    {
        id: 'trumpet_horn', emoji: '🎺', label: 'Trubka, roh, fanfára a flétna', priority: 2,
        instrumentChord: 'brass',
        stems: ['trubk','trump','roh','lesni','fanfar','pozoun','trombon','saxofon','klarinet','fletn','pistal','dudy','zatroub','troub','trumpet','horn','bugle','fanfare','flute','whistle','saxophone'],
        urls: [
            'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
            'https://actions.google.com/sounds/v1/cartoon/slide_whistle_up.ogg',
            'https://actions.google.com/sounds/v1/cartoon/whistle_toy.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.4
    },
    {
        id: 'drums_perc', emoji: '🥁', label: 'Bubny, bicí, tympány a činely', priority: 2,
        stems: ['buben','bubn','bubink','bici','tympan','cinel','gong','tambur','rytm','bubnov','drum','drums','drummer','cymbal','gong','percussion','rhythm'],
        urls: [
            'https://actions.google.com/sounds/v1/cartoon/drum_roll.ogg',
            'https://actions.google.com/sounds/v1/cartoon/tympani_bing.ogg',
            'https://actions.google.com/sounds/v1/cartoon/crash_layer_drumset.ogg',
            'https://actions.google.com/sounds/v1/cartoon/crash_layer_cymbals.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.2
    },

    // ========================================================================
    // PRIORITA 2: ŽIVLY, PŘÍRODA, HRAD, KAVÁRNA, ZVONY, POKLAD
    // ========================================================================
    {
        id: 'fire', emoji: '🔥', label: 'Praskající oheň, krb a sirky', priority: 2,
        stems: ['ohen','ohn','ohnic','ohnist','plamen','plamin','krb','pec','peci','kamn','hori','shor','prask','zaprask','jiskr','popel','popelk','dym','kour','pochod','louc','zapalovac','sirk','zapalk','fire','flame','hearth','ash','torch','lighter','match'],
        urls: [
            'https://actions.google.com/sounds/v1/ambiences/fire.ogg',
            'https://actions.google.com/sounds/v1/ambiences/daytime_forrest_bonfire.ogg',
            'https://actions.google.com/sounds/v1/household/lighter_flick.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 5.5
    },
    {
        id: 'water', emoji: '💧', label: 'Studánka, potůček a řeka', priority: 2,
        stems: ['vod','voda','vody','vode','vodou','vodic','studank','studn','potok','potuc','reka','reky','rece','rekou','ric','pramen','zblun','splouch','ryb','ryba','rybic','rybnik','jezer','jezir','vodnik','hastrman','vodopad','water','stream','river','well','splash','fish','lake'],
        urls: [
            'https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg',
            'https://actions.google.com/sounds/v1/water/rocks_into_water.ogg',
            'https://actions.google.com/sounds/v1/water/fountain_water_bubbling.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg'],
        dur: 5.2
    },
    {
        id: 'sea', emoji: '🌊', label: 'Moře, příboj vln a loď', priority: 2,
        stems: ['mor','more','mori','ocean','vln','vlny','priboj','breh','plaz','ostrov','korab','lod','lode','lodi','lodic','plachetnic','parnik','clun','palub','namor','kapitan','kotv','pirat','sea','ocean','wave','waves','ship','boat','sail','island','pirate'],
        urls: [
            'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
            'https://actions.google.com/sounds/v1/water/ocean_wave_rock_beach.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg'],
        dur: 5.8
    },
    {
        id: 'rain', emoji: '🌧️', label: 'Déšť a kapky na střeše', priority: 2,
        stems: ['des','dest','prs','prsi','zaprs','lijak','lije','kapk','kape','krupej','mzi','pliskanic','louz','kaluz','destnik','rain','raining','shower','drizzle','drop','umbrella'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg',
            'https://actions.google.com/sounds/v1/weather/light_rain.ogg',
            'https://actions.google.com/sounds/v1/weather/rain_water_dripping_softly.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_rain.ogg'],
        dur: 5.5
    },
    {
        id: 'wind', emoji: '💨', label: 'Vítr, vichřice, sníh a mráz', priority: 2,
        stems: ['vitr','vetr','vetric','vanek','fouk','zafouk','odfouk','vichr','vichric','meluzin','vanic','fujavic','snih','sneh','snez','mraz','zima','zimn','led','rampouch','wind','breeze','blow','snow','frost','winter','ice'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/wind_through_window.ogg',
            'https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg',
            'https://actions.google.com/sounds/v1/weather/light_breeze.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 5.5
    },
    {
        id: 'forest', emoji: '🌲', label: 'Šumění lesa, stromů a listí', priority: 2,
        stems: ['les','lesa','lese','lesem','lesik','hvozd','strom','dub','smrk','jedl','borovic','briz','lip','vetev','vetvic','list','listi','sust','zasust','krov','houstin','mech','sipk','trn','parez','jelen','srn','lisk','zajic','forest','woods','tree','branch','leaf','leaves','deer','fox'],
        urls: [
            'https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg',
            'https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg',
            'https://actions.google.com/sounds/v1/impacts/forest_wood_snapping.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/summer_forest.ogg'],
        dur: 5.0
    },
    {
        id: 'bell', emoji: '🔔', label: 'Hodiny, budík, zvon a zvonkohra', priority: 2,
        stems: ['zvon','zvonek','zvonk','zazvon','cink','zacink','hodin','hodink','budik','tikot','tikaj','odbil','odbij','pulnoc','vezn','svatb','kostel','klaster','zvonkohr','bell','bells','chime','clock','alarm','midnight','church'],
        urls: [
            'https://actions.google.com/sounds/v1/cartoon/mechanical_clock_ring.ogg',
            'https://actions.google.com/sounds/v1/cartoon/jingle_bells.ogg',
            'https://actions.google.com/sounds/v1/foley/wind_chimes_of_shells.ogg',
            'https://actions.google.com/sounds/v1/alarms/clock_ticking.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/alarms/clock_ticking.ogg'],
        dur: 4.6
    },
    {
        id: 'treasure', emoji: '🪙', label: 'Mince, peníze, poklad a kouzlo', priority: 2,
        stems: ['poklad','zlato','zlaty','zlatak','dukat','minc','peniz','penize','bankovk','pokladn','stribr','drahokam','diamant','perla','perl','rubin','smaragd','prsten','prstyn','korun','zezl','trun','bohatstv','mesec','oris','kouzl','carov','caro','cary','zazrak','vila','vily','zrcadl','hulk','gold','coin','coins','money','treasure','diamond','jewel','ring','crown','magic','spell','fairy'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/coins_in_hand.ogg',
            'https://actions.google.com/sounds/v1/impacts/loose_change_on_wood.ogg',
            'https://actions.google.com/sounds/v1/foley/glass_clink.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/spring_day_forest.ogg'],
        dur: 4.2
    },
    {
        id: 'cafe', emoji: '🍷', label: 'Kavárna, restaurace, víno a přípitek', priority: 2,
        stems: ['kavarn','kav','kava','restaurac','hostin','krcm','hospud','hospod','vino','vinem','piv','pivo','sekt','sampansk','pripit','tukl','sklenic','sklenk','lahev','zátk','korek','salek','bar','slavnost','ples','cafe','coffee','tavern','inn','wine','beer','glass','bottle','toast','feast'],
        urls: [
            'https://actions.google.com/sounds/v1/impacts/silverware_on_glass_toast.ogg',
            'https://actions.google.com/sounds/v1/household/wine_bottles_clinking.ogg',
            'https://actions.google.com/sounds/v1/household/bottle_cork.ogg',
            'https://actions.google.com/sounds/v1/household/ice_cubes_in_glass.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
        dur: 4.8
    },

    // ========================================================================
    // PRIORITA 2 & 3: VĚCI, DOMÁCNOST, KANCELÁŘ, SPORT A LIDSKÉ PROJEVY
    // ========================================================================
    {
        id: 'phone', emoji: '📱', label: 'Telefon, mobil a zazvonění', priority: 2,
        stems: ['telefon','mobil','smartphon','sluchatk','zavol','volal','hovor','vyzvan','sms','zprav','phone','telephone','mobile','cellphone','ringing','call'],
        urls: [
            'https://actions.google.com/sounds/v1/alarms/phone_ringing.ogg',
            'https://actions.google.com/sounds/v1/household/telephone_ring.ogg',
            'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
        dur: 4.4
    },
    {
        id: 'computer_keyboard', emoji: '💻', label: 'Počítač, klávesnice a kancelář', priority: 3,
        stems: ['pocitac','notebook','laptop','klavesnic','monitor','obrazovk','internet','web','server','program','kod','aplikac','kancelar','psaci','computer','laptop','keyboard','typing','office','software'],
        urls: [
            'https://actions.google.com/sounds/v1/office/keyboard_typing_fast.ogg',
            'https://actions.google.com/sounds/v1/office/typing_on_keyboard.ogg',
            'https://actions.google.com/sounds/v1/office/assorted_computer_sounds.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'],
        dur: 4.2
    },
    {
        id: 'camera_photo', emoji: '📸', label: 'Fotoaparát a focení', priority: 3,
        stems: ['fotoaparat','fotak','fotk','fotograf','vyfot','blesk','objektiv','kamer','camera','photo','photograph','picture','shutter'],
        urls: [
            'https://actions.google.com/sounds/v1/household/handling_a_camera.ogg',
            'https://actions.google.com/sounds/v1/household/wall_light_switch_close.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 3.6
    },
    {
        id: 'glass_break', emoji: '🪟', label: 'Rozbité sklo a střepy', priority: 2,
        stems: ['rozbil','rozbit','strep','strepy','trist','roztri','praskl','vylom','shatter','smash','broken','shards'],
        urls: [
            'https://actions.google.com/sounds/v1/impacts/glass_windows_breaking.ogg',
            'https://actions.google.com/sounds/v1/impacts/wine_glass_shatter.ogg',
            'https://actions.google.com/sounds/v1/impacts/small_glass_pane_shatter.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 4.2
    },
    {
        id: 'sports_game', emoji: '⚽', label: 'Míč, sport, karty a hra', priority: 3,
        stems: ['mic','mick','fotbal','kopn','gol','basketbal','tenis','volejbal','hokej','zapas','stadion','hrist','karty','karet','kostk','kulecnik','bowling','ball','soccer','football','basketball','tennis','cards','game','sport'],
        urls: [
            'https://actions.google.com/sounds/v1/sports/soccer_kicks_series.ogg',
            'https://actions.google.com/sounds/v1/sports/basketball_bounce_and_roll.ogg',
            'https://actions.google.com/sounds/v1/sports/card_dealing.ogg',
            'https://actions.google.com/sounds/v1/sports/billiard_balls_hit.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.0
    },
    {
        id: 'laugh_human', emoji: '😄', label: 'Smích, kašel a kýchnutí', priority: 3,
        stems: ['smich','zasm','smal','usm','checht','chichot','kasel','zakasl','kychn','plakal','plac','vzlyk','mimink','dite','laugh','laughing','chuckle','cough','sneeze','cry','baby'],
        urls: [
            'https://actions.google.com/sounds/v1/human_voices/male_chuckling.ogg',
            'https://actions.google.com/sounds/v1/human_voices/man_laugh_and_knee_slap.ogg',
            'https://actions.google.com/sounds/v1/human_voices/male_cough.ogg',
            'https://actions.google.com/sounds/v1/human_voices/male_sneeze.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 3.8
    },
    {
        id: 'door', emoji: '🚪', label: 'Dveře, brána, okno a zaklepání', priority: 3,
        stems: ['dver','dvir','vrat','bran','zaklep','klep','zabus','bus','vrz','zavrz','otevr','zavr','prah','pant','okenic','okn','chaloup','chalup','domec','domek','hrad','komnat','vypinac','rozsvit','zhasn','door','gate','knock','creak','window','cottage','castle','switch'],
        urls: [
            'https://actions.google.com/sounds/v1/doors/knock_on_wooden_door.ogg',
            'https://actions.google.com/sounds/v1/doors/creaking_wooden_door.ogg',
            'https://actions.google.com/sounds/v1/doors/wood_door_open_close_soft.ogg',
            'https://actions.google.com/sounds/v1/household/window_open.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.0
    },
    {
        id: 'lock', emoji: '🔑', label: 'Klíč, zámek, truhla a řetězy', priority: 3,
        stems: ['klic','klick','zamek','zamec','odemk','zamk','truhl','truhlic','skrin','trezor','vezen','zalar','mriz','obruc','retez','pout','key','lock','chest','unlock','chain','prison'],
        urls: [
            'https://actions.google.com/sounds/v1/doors/key_in_lock.ogg',
            'https://actions.google.com/sounds/v1/doors/deadbolt_lock.ogg',
            'https://actions.google.com/sounds/v1/impacts/chain_jingle.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/wind_through_window.ogg'],
        dur: 3.8
    },
    {
        id: 'steps', emoji: '👣', label: 'Kroky, chůze, běh a schody', priority: 3,
        stems: ['krok','krac','sel','sla','sli','vyraz','cest','cestic','pesin','stezk','schod','vez','nadvor','sal','putov','poutnik','tulak','strevic','bot','skorn','beh','bezel','utik','utek','footstep','walk','path','stairs','tower','shoe','slipper','run'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/footsteps_on_gravel.ogg',
            'https://actions.google.com/sounds/v1/foley/running_on_gravel.ogg',
            'https://actions.google.com/sounds/v1/foley/footsteps_in_water.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg'],
        dur: 4.0
    },
    {
        id: 'kitchen', emoji: '🍲', label: 'Kuchyně, vaření, čaj a nádobí', priority: 3,
        stems: ['kuchyn','kuchar','hrnec','hrnic','kotlik','panv','konvic','caj','polevk','kas','pecen','kolac','pernik','med','talir','lzic','vidlic','nuz','kraj','nadob','var','bubl','stul','chleb','jidl','vecer','snidan','obed','kitchen','cook','pot','kettle','tea','soup','dish','plate','knife','bread','food'],
        urls: [
            'https://actions.google.com/sounds/v1/household/kettle_boil.ogg',
            'https://actions.google.com/sounds/v1/household/pour_boiling_water_into_cup.ogg',
            'https://actions.google.com/sounds/v1/household/chopping_vegetables.ogg',
            'https://actions.google.com/sounds/v1/foley/dishes_clanking.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/ambiences/fire.ogg'],
        dur: 4.4
    },
    {
        id: 'page', emoji: '📜', label: 'Kniha, dopis, psaní perem a spánek', priority: 3,
        stems: ['knih','kniz','strank','kapitol','dopis','psal','psan','pergamen','papir','novin','casopis','inkoust','pero','brkem','tuzk','denik','spink','spanek','usn','usin','postyl','postel','perin','polstar','dobrou','sen','sny','book','page','letter','paper','newspaper','write','pen','quill','sleep','bed','pillow','dream'],
        urls: [
            'https://actions.google.com/sounds/v1/foley/page_turn.ogg',
            'https://actions.google.com/sounds/v1/office/quill_pen_writing.ogg',
            'https://actions.google.com/sounds/v1/office/flipping_newspaper_pages.ogg',
            'https://actions.google.com/sounds/v1/office/pen_writing.ogg'
        ],
        tailUrls: ['https://actions.google.com/sounds/v1/weather/light_breeze.ogg'],
        dur: 4.0
    }
];

/* ============================================================================
   5. ROZŠÍŘENÁ KNIHOVNA POHÁDEK A KNIH S VOLITELNOU DÉLKOU (DO 5 / 15 / 30 MINUT)
   Verze v6.3.0 — Každý příběh podporuje 3 délky pro AI čtení i vlastní čtení:
   - Do 5 minut:  Kompletní svižný příběh (cca 350–500 slov + dramatické pauzy se zvuky)
   - Do 15 minut: Výpravná verze s rozšířenými dějovými kapitolami (cca 1 200–1 500 slov)
   - Do 30 minut: Hluboká uspávací verze s atmosférou a uklidňujícím nočním epilogem (cca 2 500+ slov)
   ============================================================================ */
const STORIES = {
    kids_cs: [
        {
            id: "lada",
            title: "👑 Princezna se zlatou hvězdou",
            text: "Za sedmero horami a sedmero tichými řekami leželo království, kde žila laskavá princezna Lada. Na čele jí zářila zlatá hvězda, jasná jako večerní slunce. Když do zámku přijel zlý a pyšný král Kazisvět a poručil, že si Ladu vezme za ženu, princezna se v noci tiše vytratila z komnaty. Oblékla si prostý šedivý kožíšek, vzala uzlíček se šaty utkanými z ranní rosy a vydala se lesní cestou do světa. Hluboký zelený les kolem ní tiše šuměl, mezi větvemi zpívali ptáčci a jemný vánek hladil mech u pěšiny. Po dlouhé chůzi došla Lada k čisté lesní studánce. Uložila svůj zlatý poklad a kouzelný závoj pod hladký kámen u vody. Vtom z průzračné studánky vystrčila hlavičku malá stříbrná rybička a zašplouchala ploutvičkou. „Nikomu to neříkej, rybičko, a dobře mi můj poklad opatruj,“ zašeptala princezna. Cestou k sousednímu zámku si umazala tváře popelem a plachetkou zakryla zlatou hvězdu na čele. Zaklepala na těžké dřevěné dveře zámecké kuchyně. Starý dobrý kuchař, kterému v krbu vesele praskal teplý oheň, na plotně bublala voňavá polévka a cinkalo nádobí, přijal skromnou dívku do služby. Jednoho večera se na zámku konal slavný královský ples. Lada vyběhla po schodech na zahradu, pospíchala ke studánce v lese, umyla si tvář čistou vodou a oblékla si šaty třpytivé jako hvězdy. Bílý kůň ji donesl až k zámecké bráně. Mladý princ Radovan z ní nemohl spustit oči, tančil s ní celý večer a navlékl jí na prst zlatý prsten. Když hodiny na věži odbily půlnoc a zazvonil zvon, Lada utekla zpátky do kuchyně. Druhého dne, když kuchař vařil princi polévku, vklouzl prsten do talíře. Princ poznal svou milovanou princeznu se zlatou hvězdou, zazvonily svatební zvony a celé království se pod teplou peřinou uložilo ke sladkému spánku. Dobrou noc.",
            midChapter: "Ještě než však nastal čas královského plesu, prožila princezna Lada v zámecké kuchyni mnoho klidných dnů. Každé ráno, sotva na dvorku zakokrhal kohout a v zahradě zazpívali první ptáčci, přiložila Lada dřevěná polena do krbu, až oheň vesele zapraskal a vytopil celou světnici. V měděné konvici začala bublat čistá voda na ranní čaj a starý kuchař krájel na dřevěném stole čerstvý chléb. Na zámeckém nádvoří štěkal věrný hlídací pes, ve stáji řehtali koně a kovář v podhradí zvonivě bušil kladivem do kovadliny, aby okoval královský kočár. Odpoledne chodívala Lada s košíkem do hlubokého lesa na bylinky a sladké jahody. Pod starým dubem jí dělala společnost malá zrzavá veverka, v trávě bzučely pilné včelky a u tiché řeky klapalo dřevěné kolo starého mlýna. Kdykoliv se princezně zastesklo po domově, posadila se na mech u studánky, poslouchala jemné šplouchání vody a tichý šepot větru ve větvích smrků. Jednou se nad lesem přehnala letní bouřka, v dálce zahřměl hrom a na listí stromů zabubnoval vlahý déšť. Lada se schovala v dřevěné chaloupce starého drvoštěpa, kde u pece předla mourovatá kočka a na stěně tikaly vyřezávané hodiny. Když déšť ustal a nad loukou znovu vysvitlo zlaté slunce, vrátila se princezna po lesní pěšině zpět do zámku, kde už na harfu a housle hráli zámečtí hudebníci."
        },
        {
            id: "popelka",
            title: "🌰 O Popelce a třech kouzelných oříšcích",
            text: "Byla jednou tichá zima a na střechu starého statku tiše padal bílý sníh. Venku foukal studený vítr, ale uvnitř v kuchyni u veliké pece hřál a praskal červený oheň. V koutku na stoličce seděla hodná Popelka, přebírala hrách z popela a na klíně jí spokojeně předla malá kočička. Najednou na zamrzlé okno zaťukali bílí holoubci, zatřepetali křídly a něžně zavrkali: „Neplač, Popelko, my ti s prací pomůžeme.“ Zatímco holoubci vyzobávali zrníčka, vrátil se ze zasněžené cesty tatínek na koni. Ze sedla sundal tři kouzelné oříšky, které mu v lese spadly přímo do klobouku, když pod dubem zahoukala moudrá sova. Večer odjela macecha se sestrami kočárem na královský zámek. Popelka zůstala sama u krbu, pohladila věrného psa na dvorku, který radostně zaštěkal, a rozlouskla první zlatý oříšek. Zazářilo kouzlo a před ní ležely šaty krásné jako růžové červánky a střevíčky ze samého zlata. Popelka vyběhla ze dveří do stáje, vyhoupla se na bílého koníčka Juráška a cválala tichým zasněženým lesem. V zámeckém sále cinkaly křišťálové lustry a zněla slavnostní hudba. Princ s neznámou princeznou tančil, dokud hodiny na věži neodbily tichou půlnoc. Popelka běžela po zámeckých schodech a na posledním schodu ztratila zlatý střevíček. Ráno přijel princ na koni až na zasněžený dvůr, kde kokrhal kohout. Střevíček Popelce padl jako ulitý, na věži radostně zazvonil zvon a v celém kraji zavládl klid, mír a hluboký spánek.",
            midChapter: "Během dlouhých zimních dnů na statku měla Popelka spoustu přátel mezi zvířátky. Každé jitro, když na zasněženém dvorku zakokrhal kohout a v chlívku zabečela bílá ovečka, donesla Popelka do stáje voňavé seno svému koníčkovi Juráškovi. Koník radostně zařehtal a zadupal kopyty o dřevěnou podlahu. U boudy poskakoval veselý pejsek Voříšek, který pokaždé přátelsky zaštěkal, když Popelka otevřela vrzající dřevěné dveře. V lese za statkem křupal pod kroky čerstvý sníh, mezi větvemi borovic profukoval zimní vítr a u zamrzlého potoka zvonily ledové rampouchy. Když Popelka rozlouskla druhý kouzelný oříšek, objevily se v něm myslivecké šaty, luk a toulec se šípy. Vyjela na koni do tichého lesa, kde potkala mladého prince. Společně poslouchali, jak v korunách stromů zpívají sýkorky a v dálce houká lesní roh. Večer se Popelka vrátila ke teplému krbu v kuchyni, nalila do misky mléko pro malou kočičku, která tiše vrněla a mňoukala, a pozorovala zlaté jiskry v peci, zatímco za oknem tiše sněžilo a na staré věži odbíjely hodiny."
        },
        {
            id: "prasatka",
            title: "🐷 O třech prasátkách a lesním vlkovi",
            text: "Na kraji prosluněné zelené louky, kde od rána zpívali ptáčci, bzučela pilná včelka a u potůčku kvákala žabka, žila tři malá růžová prasátka. Jednoho dne si sbalila uzlíčky a vyrazila po lesní cestě postavit si vlastní domečky. První prasátko bylo trošku líné, posbíralo na poli žlutou slámu a za chvilku mělo slaměnou chýši. Druhé prasátko sbíralo u lesa dřevěné větvičky, až postavilo lehký domek ze dřeva. Zato třetí prasátko bylo tuze pracovité. Vzalo zednické kladivo, vozilo pevné červené cihly a kameny a celý den stavělo domeček s pevnou střechou, dubovými dveřmi a velkým krbem. Když se snesl večer, v hlubokém lese se ochladilo a mezi smrky zahoukala noční sova. Z temného houští vyšel hladový šedý vlk. Tiše kráčel k prvnímu slaměnému domku, zaklepal na dvířka a hlubokým hlasem zavyl. Pak nabral dech a zafoukal jako prudký vítr. Slaměný domek se rozletěl a první prasátko utíkalo k bráškovi do dřevěného domku. Vlk ale doběhl i tam, znovu zafoukal jako vichřice a rozfoukal i dřevěné stěny. Obě prasátka pelášila k cihlovému domku třetího brášky, vběhla dovnitř a zamkla těžké dveře na dvakrát klíčem. Venku se strhla noční bouřka, v dálce zahřměl hrom a na střechu se spustil tichý déšť. Vlk foukal ze všech sil, ale cihlový dům se ani nepohnul. V chaloupce u teplého krbu praskal oheň, v hrnci bublala dobrá večeře a všechna tři prasátka se zachumlala pod měkkou peřinu a sladce usnula.",
            midChapter: "Zatímco třetí prasátko pečlivě stavělo svůj cihlový dům, pomáhal mu u lesa starý tiskař a truhlář. Pilou řezali silné dřevěné trámy na střechu, kladivem zatloukali železné hřebíky a lopatou míchali maltu. První dvě prasátka si mezitím bezstarostně hrála na zelené louce u rybníka. První prasátko brnkalo na malou dřevěnou kytaru, druhé hrálo na veselou flétnu a u vody jim do rytmu kvákaly zelené žáby. Kolem po polní cestě projel červený traktor, na sousedním statku zabučela kráva a zaštěkal ovčácký pes. Když pak slunce začalo klesat za obzor a les se ponořil do šera, zvedl se od řeky chladný vítr a listí na stromech začalo tajemně šustit. V cihlovém domku však bylo útulno a bezpečno. Třetí prasátko zamklo dubové dveře pevným klíčem, rozsvítilo teplou lucernu, postavilo na plotnu konvici s čajem a přiložilo polínko do krbu, kde vesele praskal oheň."
        },
        {
            id: "karkulka",
            title: "🧺 O Červené karkulce a babiččině chaloupce",
            text: "Žila byla malá holčička, které každý říkal Červená karkulka. Jednoho slunečného rána jí maminka v kuchyni upekla sladký koláč, do košíčku uložila med a řekla: „Karkulko, dones prosím košíček babičce do lesní chaloupky a jdi pěkně po cestičce.“ Karkulka vyšla ze dveří, na dvorku jí na cestu zaštěkal hodný pes a zakokrhal kohout. Vstoupila do zeleného lesa, kde v korunách stromů zpívali ptáčci, nad květy bzučela zlatá včelka a u čisté studánky žbluňkala voda. Jak tak kráčela po mechové pěšině, vynořil se zpoza starého dubu šedý vlk. „Copak to neseš v košíčku, Karkulko?“ zeptal se vlk a tiše zavrčel. Když mu Karkulka pověděla o babiččině chaloupce, ukázal jí paseku plnou modrých zvonků a fialek. Zatímco holčička trhala kytičku, vlk běžel zkratkou mezi křovím až k chaloupce, zaklepal na dřevěné dveře a vklouzl dovnitř. Za malou chvíli došla k chaloupce i Karkulka. Venku začal foukat chladný vítr a větve stromů šustily. Karkulka otevřela vrzající dveře a podivovala se, proč má babička pod peřinou tak velké uši a veliké zuby. Naštěstí právě kolem chaloupky procházel statečný myslivec se svým věrným psem. Uslyšel podezřelé vrčení, vstoupil do světnice a babičku i Karkulku vysvobodil. Babička pak v kamnech rozdělala teplý oheň, v konvici uvařila bylinkový čaj a na stůl postavila voňavý koláč. Když za oknem začal tiše šumět večerní déšť a odbily hodiny, uložila se Karkulka do měkké postýlky, zavřela oči a usnula.",
            midChapter: "Cesta lesem k babiččině chaloupce vedla kolem mnoha zajímavých míst. Nejprve Karkulka míjela dřevorubeckou mýtinu, kde dřevorubci sekerou a pilou chystali dřevo na zimu a u cesty stál připravený vůz s koněm, který spokojeně přežvykoval trávu a občas zařehtal. O kousek dál tekla přes kameny bystrá lesní řeka, ve které plavaly stříbrné rybičky a na břehu kvákala malá žabka. V korunách vysokých smrků ťukal datel do dřeva, z větví se ozýval zpěv slavíka a v mechu pod kapradím zašustila malá lesní myška. Když se Karkulka večer po šťastném shledání s babičkou a myslivcem posadila v chaloupce ke stolu, na stěně klidně tikaly staré kukačkové hodiny, v kamnech praskal hřejivý oheň, na klíně babičky předla kočka a za oknem v lese houkala sova."
        },
        {
            id: "ruzenka",
            title: "🌹 O Šípkové Růžence a zakletém království",
            text: "Před dávnými časy se královi a královně narodila vytoužená holčička, které dali jméno Růženka. Na slavném zámku vystrojili velikou hostinu, cinkaly zlaté poháry, zněla kouzelná hudba a sudičky přinášely malé princezně vzácné dary. Jedna zlá sudička však vyslovila temnou kletbu, že se princezna v patnácti letech píchne o trn a usne. Dobrá víla ale mávla stříbrnou hůlkou a kouzlo zmírnila: Růženka nezemře, nýbrž celé království se ponoří do sto let dlouhého klidného spánku. Roky plynuly jako tichá voda v řece. V den patnáctých narozenin vystoupala Růženka po kamenných schodech do nejvyšší zámecké věže. Otevřela malým klíčem staré dřevěné dveře, kde seděla stařenka u kolovratu. Jakmile se princezna dotkla vřetena, ulehla na postel s hedvábným polštářem a okamžitě usnula. V tu samou chvíli usnul král na zlatém trůnu, kuchaři v kuchyni u praskajícího ohně v krbu, kůň ve stáji, pes na nádvoří i bílí holoubci na střeše. Kolem celého zámku vyrostl neproniknutelný les šípkových růží, ve kterém jen tiše šuměl vítr a zpívali ptáčci. Po stu letech přijel k zámku na bílém koni mladý princ. Taseným mečem rozhrnul trnité větve, které před ním rozkvétaly v růžové květy, prošel tichým nádvořím a vystoupal po schodech až do věže. Když Růženku jemně políbil, kouzlo pominulo. Hodiny na věži radostně odbily, zazvonil zvon, v krbu se znovu rozhořel teplý oheň, pes vesele zaštěkal a celé království slavilo v pokoji a lásce. Dobrou noc.",
            midChapter: "Po celých sto let, kdy spící zámek odpočíval pod ochranou růžového keře, vládlo v jeho komnatách a zahradách magické ticho. V královské hudební síni stál otevřený klavír a zlatá harfa, jejichž struny občas rozechvěl jemný průvan, který vnikl pootevřeným oknem. V zámeckém parku u mramorové fontány tiše bublala čistá voda, v korunách starých lip zpívali ptáčci a v noci nad věží kroužila moudrá sova. V podhradí na louce cinkaly zvonečky pasoucích se oveček, u lesa bzučely včely a nad celým krajem se klenula hluboká hvězdná obloha. Když pak princ na koni projel zámeckou bránou a hodiny začaly znovu tikat, probudil se i starý kuchař u krbu, kočka v kuchyni spokojeně zamňoukala a ze zámecké věže se rozezněla radostná fanfára trubek."
        },
        {
            id: "pernikova",
            title: "🧁 O Jeníčkovi, Mařence a perníkové chaloupce",
            text: "V malé chaloupce u lesa bydleli Jeníček a Mařenka. Jednoho rána vzali džbánek a vydali se do hlubokého lesa na sladké červené jahody. Kolem cesty zpívali ptáčci, v mechu bzučely včelky a v dálce ťukal datel do kůry smrku. Děti sbíraly jahodu za jahodou, až zašlo zlaté slunce, zvedl se chladný večerní vítr a v korunách stromů zahoukala noční sova. Jeníček vylezl na vysoký dub a v dálce uviděl teplé světýlko, které zářilo jako malá svíčka. Děti kráčely po lesní pěšině, až došly na mýtinu, kde stála chaloupka celá postavená z voňavého perníku, cukru a čokolády. Když si Jeníček kousek perníku ze střechy ulomil, zavrzaly dřevěné dveře a vyšla stará ježibaba. Děti však byly chytré a statečné, přelstily zlou babu v kuchyni u veliké rozpálené pece, vzaly z truhly hrst zlatých dukátů a utíkaly lesem zpátky k domovu. Cestou jim přes širokou řeku pomohla přeplavat bílá labuť, která tiše čeřila čistou vodu. Na kraji vesnice jim naproti vyběhl věrný pes, radostně zaštěkal a tatínek s maminkou je objali u teplého krbu, kde praskal oheň. Děti si vypily teplé mléko, zachumlaly se pod měkkou peřinu a spokojeně usnuly.",
            midChapter: "Než děti našly cestu zpátky z hlubokého lesa, odpočinuly si v mechové jeskyni u lesní studánky, kde čistá voda tiše žbluňkala do kamenné tůňky. V korunách stromů šumělo listí, nad paloukem přeletěl černý krkavec a v trávě cvrkali večerní cvrčci. Když pak s pomocí bílé labutě překonali řeku a došli do rodné vesnice, v kovárně ještě dohasínala výheň, na kostelní věži odbily hodiny a v chaloupce už maminka chystala teplou večeři v kuchyni. Na klíně Mařenky pak celé hodiny předla malá kočička, venku za oknem tiše šuměl noční déšť a v krbu praskalo smrkové dřevo."
        }
    ],
    adults_cs: [
        {
            id: "zaklinac",
            title: "⚔️ Zaklínač a stín nad starým hradem (Fantasy)",
            text: "Nad opuštěným hradem na skalním útesu se stahovala těžká černá mračna a z moře vál ledový vítr. V dálce zahřměl první hrom a klikatý blesk ozářil rozbitou bránu nádvoří. Zaklínač vedl svého unaveného koně po kamenné cestě, kopyta dutě klapala o mokrou dlažbu a do pláště se mu opřel hustý noční déšť. Ve staré krčmě v podhradí vesele praskal v krbu veliký oheň, na stolech cinkaly sklenice s červeným vínem a unavení poutníci tiše rozmlouvali. Zaklínač otevřel těžké dřevěné dveře, posadil se do stínu v rohu, položil na stůl měšec se stříbrnými mincemi a požádal hostinského o horkou polévku. Od starého kováře se dozvěděl, že v hlubokém lese pod hradem se za půlnoci ozývá děsivé vytí vlka a v opuštěné věži číhá nebezpečný netvor. Když hodiny na kostelní věži odbily půlnoc a zazvonil zvon, vyrazil zaklínač po kluzkých schodech nahoru do zříceniny. Mezi větvemi stromů zahoukala sova a v průvanu zavrzala železná mříž. Ze tmy se vynořila obrovská šelma a zuřivě zařvala. Zaklínač bleskurychle tasil stříbrný meč, ocel zazvonila o drápy v prudkém souboji a v záři blesku odrazil útok štítem. Po těžkém boji zavládlo na nádvoří ticho, bouřka ustoupila, déšť se změnil v jemné kapky a v krčmě u teplého krbu čekal zasloužený klid a spánek.",
            midChapter: "V krčmě u paty hradu mezitím potulný bard ladil struny své dřevěné loutny a tiše vyhrával starou baladu o dávných králích. Venku za oknem burácel příboj mořských vln, které narážely do skal pod útesem, a ve stáji neklidně řehtali koně. Kovář u vedlejšího stolu vyprávěl, jak celý den v kovárně bušil kladivem do rozpálené oceli, aby vykoval pevné meče a štíty pro hradní stráž. Když zaklínač procházel podzemní chodbou hradu, pod jeho botami křupaly střepy rozbitého skla, ze stropu kapala studená voda do hluboké studny a v rukou mu plápolala smolná pochodeň. Těžký zámek na železné truhle v hradní věži zacvakal, uvnitř se zaleskly staré zlaté dukáty a pergamenový dopis psaný brkem, který odhalil pradávné tajemství hradního pána."
        },
        {
            id: "expres",
            title: "🕵️ Noční expres do Paříže (Detektivní román)",
            text: "Na hlavním nádraží panovala sychravá podzimní mlha, na skleněnou střechu nástupiště bubnoval vytrvalý déšť a v dálce hlasitě zahoukal noční vlak. Detektiv v dlouhém kabátě kráčel rychlým krokem po peronu, v kapse svíral starý mosazný klíč a tajný dopis psaný inkoustovým perem. Nastoupil do vagonu, prošel úzkou uličkou do jídelního vozu, který voněl jako stará pařížská kavárna, a objednal si šálek horké kávy. Lokomotiva se s pískotem dala do pohybu, kola pravidelně klapala po kolejích a za oknem ubíhala temná noční krajina, kde ve větru šuměly lesy. Ve vedlejším kupé se náhle ozvalo tiché zaklepání na dveře, zacinkala rozbitá sklenice a v chodbě mihl podezřelý stín. Detektiv odemkl zamčenou truhlu se stopami a důkazy, prohlédl si zlatý prsten s rubínem a zaposlouchal se do tikotu svých kapesních hodin. Venku za oknem vlaku se strhla prudká bouřka a zahřměl hrom. Díky nenápadné stopě na stránce staré knihy odhalil detektiv pravdu dříve, než noční expres za svítání vjel do stanice, kde už u klidné řeky zpívali ranní ptáci.",
            midChapter: "V jídelním voze nočního expresu hrála z gramofonu tichá klavírní melodie, číšník naléval červené víno do křišťálových sklenic a u vedlejšího stolku spisovatel rychle psal na psacím stroji a klávesnici další kapitolu svého románu. Detektiv vytáhl malý fotoaparát, vyfotil podezřelou pečeť na obálce a zkontroloval svůj revolver v pouzdře pod sakem. Když vlak projížděl kolem osvětleného předměstí, na mokré silnici pod viaduktem projížděla auta, v dálce zazněla policejní siréna a na přejezdu cinkal výstražný zvonek. Poté se vlak znovu ponořil do tichého nočního lesa, kde jen rytmicky klapaly koleje a na okno kupé tiše ťukaly kapky deště."
        },
        {
            id: "chata",
            title: "🍷 Večer v horské chatě u krbu (Románová kapitola)",
            text: "Vysoko v horách, kde kolem dřevěné chaty foukal mrazivý zimní vítr a na střechu tiše padal hustý sníh, panovalo hřejivé ticho. V obývacím pokoji u kamenného krbu praskal živý oheň a vrhal jantarové světlo na police plné starých knih. Na dřevěném stole cinkly dvě sklenice s červeným vínem, v kuchyni jemně probublávala horká voda na čaj a u křesla spokojeně předla kočka. Venku za zamrzlým oknem zaštěkal v dálce u sousedního statku pes a mezi zasněženými smrky v lese zahoukala sova. Otevřela starý dopis schovaný mezi stránkami knihy, poslouchala klidné praskání plamenů a sledovala, jak na věži v údolí odbíjejí hodiny půlnoc. Větrná vichřice venku pomalu utichla, v pokoji zůstal jen tichý dech ohně a hluboký večerní klid.",
            midChapter: "Odpoledne předtím strávili opravou staré dřevěné verandy, kde pilou uřízli novou polici na knihy a kladivem přibili uvolněné prkno, zatímco pod okapem cinkala zvonkohra ve větru. V rohu pokoje stál starý klavír, na který zahráli tichou večerní skladbu, a na dřevěném stole rozdali karty k přátelské hře. Když pak v noci zhasli poslední lampu a ponechali jen mihotavé světlo svíčky a žhnoucí uhlíky v krbu, celá horská chata se ponořila do hlubokého míru."
        }
    ],
    kids_en: [
        {
            id: "lada_en",
            title: "👑 The Princess with the Golden Star",
            text: "Once upon a time in a peaceful kingdom lived a kind princess with a bright golden star on her forehead. When a proud dark king arrived with his knights and swords, the princess slipped quietly out the wooden door at night. She walked along a mossy path through the deep green forest where little birds chirped in the branches and a gentle breeze rustled the leaves. By a clear forest stream, she hid her golden crown and magic ring under a stone while a little silver fish splashed in the water. At the neighboring castle, she knocked on the kitchen door where a warm fire crackled in the hearth and soup bubbled in a pot. On the night of the royal ball, a white horse carried her to the castle gate. When the tower clock chimed midnight and the bell rang, she ran down the stairs back to her cozy bed, and soon the whole kingdom fell into a sweet sleep. Good night."
        }
    ],
    adults_en: [
        {
            id: "express_en",
            title: "🕵️ The Midnight Express & The Old Cafe",
            text: "Heavy rain tapped against the window of the old coffee shop near the railway station while distant thunder rolled across the dark sky. The detective folded the secret letter, paid with a few coins, and walked out into the cold wind as the midnight train blew its horn. Inside the wooden compartment, a warm lamp glowed while the train sped along the tracks through a deep forest."
        }
    ]
};

/* Rozšiřující kapitoly pro režimy "Do 15 minut" a "Do 30 minut" */
const EXTENDED_SLEEP_CHAPTERS = {
    kids_cs_mid: "Mezitím se nad celým pohádkovým krajem pomalu snášel tichý soumrak. Na zelené louce u potoka naposledy zazpívali ptáčci, pilné včelky se vrátily do svého úlu a u rákosí tiše zakvákala žabka. Na statku ve vesnici obešel hospodář stáj, pohladil věrného koně, nasypal zrní slepicím a zamkl dřevěná vrata klíčem. Na dvorku spokojeně zaštěkal pes, schoulil se do své boudy a položil hlavu na tlapky. V chaloupce u lesa zapálila babička svíčku v lucerně, přiložila suché polínko do krbu, kde jemně praskal teplý oheň, a v kuchyni postavila na plotnu konvici s medovým čajem. Na měkkém polštáři u pece tiše vrněla a předla malá kočička, zatímco za oknem v korunách dubů a smrků šuměl večerní vánek a v dálce zahoukala moudrá noční sova.",
    kids_cs_long: "Jak noc postupovala dál, na tmavé obloze se rozsvítily tisíce třpytivých hvězd a zlatý měsíc se zrcadlil na hladině klidného jezera. V hlubokém lese utichly všechny kroky, jen čistá studánka tiše žbluňkala v mechu a jemný vítr hladil listí stromů. V zámecké komnatě dozněly poslední tóny pohádkové harfy a klavíru, těžké dubové dveře se tiše zavřely a na věži pomalu tikaly staré hodiny. Všechna zvířátka v lese i na statku už zavřela očička — spinká malý pejsek, spinká kočička u krbu, spinká bílý koníček ve stáji, spinkají ovečky na pastvině i ptáčci ve větvích. Na střechu chaloupky začaly zlehka ťukat tiché kapky nočního deště jako jemná ukolébavka. V pokoji hřeje teplý oheň v krbu, peřina je měkká a heboučká, dech se zpomaluje a přicházejí ty nejkrásnější barevné sny. Dobrou noc a sladké spaní.",
    adults_cs_mid: "Noc se mezitím prohloubila a přinesla s sebou zvláštní, uklidňující bezčasí. V tiché uličce pod lampami projelo poslední noční auto, v přístavu u moře se zhoupla zakotvená loď na vlnách příboje a v prázdné kavárně na rohu dozněla tichá melodie klavíru a houslí. Na psacím stole ležela otevřená kniha, vedle ní pomalu dohořívala svíčka a inkoustové pero odpočívalo vedle popsaného pergamenu. V kamenném krbu tiše praskalo dubové dřevo, žhavé uhlíky sálaly příjemným teplem a na okenní římsu pravidelně dopadaly kapky nočního deště.",
    adults_cs_long: "Hodiny v rohu místnosti tiše odměřovaly vteřiny a připomínaly, že všechny denní starosti, cesty i bouře zůstaly bezpečně daleko za zavřenými dveřmi. V dálce za kopci ještě naposledy zahoukal noční vlak mířící spící krajinou a nad lesem se přehnal tichý závan větru. U křesla spokojeně předla kočka, ve sklenici se zaleskla poslední kapka červeného vína a stránky staré knihy jemně zašustily. Oheň v krbu pomalu klesal do klidného žhnutí, dešťové kapky na střeše splývaly v tichý konejšivý šum a celým domem se rozlil hluboký noční klid, připravený na odpočinek a tiché snění."
};

function getStoryTextByDuration(story, durationMin, profile, lang) {
    if (!story) return '';
    if (story.isUrlArticle) {
        return story.activeVariant === 'full' ? (story.fullText || story.text) : (story.summaryText || story.text);
    }
    const base = story.text || '';
    const mid = story.midChapter || '';
    if (durationMin <= 5) {
        return base;
    }
    const extraMid = (profile === 'adults') ? EXTENDED_SLEEP_CHAPTERS.adults_cs_mid : EXTENDED_SLEEP_CHAPTERS.kids_cs_mid;
    const extraLong = (profile === 'adults') ? EXTENDED_SLEEP_CHAPTERS.adults_cs_long : EXTENDED_SLEEP_CHAPTERS.kids_cs_long;

    if (durationMin <= 15) {
        return [base, mid, extraMid].filter(Boolean).join(' ');
    }
    // 30 minut: plný příběh + střední kapitola + atmosférické rozvinutí + dlouhý uspávací epilog
    return [base, mid, extraMid, extraLong, extraMid, extraLong].filter(Boolean).join(' ');
}


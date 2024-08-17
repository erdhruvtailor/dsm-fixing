export const predCurrentMaritalStatus = {
    NeverMarried: 'Never Married',
    Divorced: 'Divorced',
    Widow: 'Widow'
};

export const predGender = {
    Male: 'Male',
    Female: 'Female'
};

export const predImmigrationStatusOfCandidate = {
    StudentVisa: 'Student Visa',
    WorkVisa: 'Work Visa',
    PermanentResident: 'Permanent Resident',
    Citizen: 'Citizen'
};

export const predBelieveInKundli = {
    No: 'No',
    Yes: 'Yes'
};

export const preDietPreference = {
    Vegan: 'Vegan',
    Vegetarian: 'Vegetarian',
    NonVegetarian: 'Non-Vegetarian'
};

export const preLifestyleHabits = {
    dailyAlcoholConsumption: "Daily Alcohol Consumption",
    weeklyAlcoholConsumption: "Weekly Alcohol Consumption",
    monthlyAlcoholConsumption: "Monthly Alcohol Consumption",
    occasionalAlcoholConsumption: "Occasional Alcohol Consumption",
    currentSmoker: "Current Smoker",
    formerSmoker: "Former Smoker",
    noSmokingAndAlcohol: "No Smoking And Alcohol"
};

export const topCountries = {
    Canada: 'Canada',
    India: 'India',
    USA: 'United States of America',
    UK: 'United Kingdom',
    Australia: 'Australia',
    NewZealand: 'NewZealand',
    Germany: 'Germany',
    France: 'France',
    Kenya: 'Kenya',
    Brazil: 'Brazil',
    Other : 'Other'
};


export const preInterests = [ { value: 'music', label: 'Music 🎵' },
    { value: 'sports', label: 'Sports 🏅' },
    { value: 'reading', label: 'Reading 📚' },
    { value: 'movies', label: 'Movies 🎬' },
    { value: 'travel', label: 'Travel 🌍' },
    { value: 'cooking', label: 'Cooking 🍳' },
    { value: 'gaming', label: 'Gaming 🎮' },
    { value: 'photography', label: 'Photography 📸' },
    { value: 'drawing', label: 'Drawing ✏️' },
    { value: 'fitness', label: 'Fitness 🏋️‍♂️' },
    { value: 'hiking', label: 'Hiking 🥾' },
    { value: 'fishing', label: 'Fishing 🎣' },
    { value: 'gardening', label: 'Gardening 🌱' },
    { value: 'knitting', label: 'Knitting 🧶' },
    { value: 'biking', label: 'Biking 🚴‍♂️' },
    { value: 'swimming', label: 'Swimming 🏊‍♂️' },
    { value: 'dancing', label: 'Dancing 💃' },
    { value: 'writing', label: 'Writing ✍️' },
    { value: 'yoga', label: 'Yoga 🧘‍♂️' },
    { value: 'crafts', label: 'Crafts 🎨' },
    { value: 'camping', label: 'Camping ⛺' },
    { value: 'pottery', label: 'Pottery 🏺' },
    { value: 'musicConcerts', label: 'Music Concerts 🎤' },
    { value: 'jogging', label: 'Jogging 🏃‍♂️' },
    { value: 'birdWatching', label: 'Bird Watching 🐦' },
    { value: 'volunteering', label: 'Volunteering 🤝' },
    { value: 'woodworking', label: 'Woodworking 🪵' },
    { value: 'sculpting', label: 'Sculpting 🗿' },
    { value: 'theater', label: 'Theater 🎭' },
    { value: 'calligraphy', label: 'Calligraphy 🖋️' },
    { value: 'origami', label: 'Origami 🗺️' },
    { value: 'astrology', label: 'Astrology 🔮' },
    { value: 'modelBuilding', label: 'Model Building 🚂' },
    { value: 'anime', label: 'Anime 🍜' },
    { value: 'museums', label: 'Museums 🏛️' },
    { value: 'podcasts', label: 'Podcasts 🎙️' },
    { value: 'starGazing', label: 'Star Gazing 🌟' },
    { value: 'history', label: 'History 📜' },
    { value: 'surfing', label: 'Surfing 🏄‍♂️' },
    { value: 'skateboarding', label: 'Skateboarding 🛹' },
    { value: 'ballet', label: 'Ballet 🩰' },
    { value: 'archery', label: 'Archery 🏹' },
    { value: 'beekeeping', label: 'Beekeeping 🐝' },
    { value: 'motorcycling', label: 'Motorcycling 🏍️' },
    { value: 'snowboarding', label: 'Snowboarding 🏂' },
    { value: 'horsebackRiding', label: 'Horseback Riding 🐎' },
    { value: 'sailing', label: 'Sailing ⛵' },
    { value: 'boxing', label: 'Boxing 🥊' },
    { value: 'cheerleading', label: 'Cheerleading 📣' },
    { value: 'rollerblading', label: 'Rollerblading 🛼' },
    { value: 'pilates', label: 'Pilates 🧘‍♀️' },
    { value: 'geocaching', label: 'Geocaching 🗺️' },
    { value: 'antiquing', label: 'Antiquing 🕰️' },
    { value: 'rccars', label: 'RC Cars 🚗' },
    { value: 'wineTasting', label: 'Wine Tasting 🍷' },
    { value: 'whittling', label: 'Whittling 🪓' },
    { value: 'miniaturePainting', label: 'Miniature Painting 🎨' },
    { value: 'zumba', label: 'Zumba 💃' },
    { value: 'languageLearning', label: 'Language Learning 🗣️' },
    { value: 'mixology', label: 'Mixology 🍸' },
    { value: 'jewelryMaking', label: 'Jewelry Making 💍' },
    { value: 'scrapbooking', label: 'Scrapbooking 📒' },
    { value: 'woodcarving', label: 'Woodcarving 🪚' },
    { value: 'potluckCooking', label: 'Potluck Cooking 🍲' },
    { value: 'modelRailroading', label: 'Model Railroading 🚂' },
    { value: 'magicTricks', label: 'Magic Tricks 🎩' },
    { value: 'birdKeeping', label: 'Bird Keeping 🦜' },
    { value: 'dogTraining', label: 'Dog Training 🐕' },
    { value: 'caving', label: 'Caving ⛰️' },
    { value: 'fencing', label: 'Fencing 🤺' },
    { value: 'synchronizedSwimming', label: 'Synchronized Swimming 🏊‍♀️' },
    { value: 'leatherworking', label: 'Leatherworking 👜' },
    { value: 'foraging', label: 'Foraging 🍄' },
    { value: 'rockClimbing', label: 'Rock Climbing 🧗‍♂️' },
    { value: 'soapMaking', label: 'Soap Making 🧼' },
    { value: 'taxidermy', label: 'Taxidermy 🦌' },
    { value: 'tapestryWeaving', label: 'Tapestry Weaving 🧵' },
    { value: 'circusSkills', label: 'Circus Skills 🎪' },
    { value: 'flyFishing', label: 'Fly Fishing 🎣' },
    { value: 'motorboating', label: 'Motorboating 🚤' },
    { value: 'campfireCooking', label: 'Campfire Cooking 🔥' },
    { value: 'origami', label: 'Origami 🦢' },
    { value: 'stargazing', label: 'Stargazing 🌌' },
    { value: 'birdWatching', label: 'Bird Watching 🐦' },
    { value: 'metalDetecting', label: 'Metal Detecting 🔍' },
    { value: 'scubaDiving', label: 'Scuba Diving 🤿' },
    { value: 'kiteFlying', label: 'Kite Flying 🪁' },
    { value: 'cosplay', label: 'Cosplay 🦸‍♂️' },
    { value: 'swordFighting', label: 'Sword Fighting ⚔️' }
];



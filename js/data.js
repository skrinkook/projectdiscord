let data = {
    "servers": [
    ] 
}

const serverNamesArray = [
    "Galactic Hangout",
    "Pixel Pioneers",
    "Echo Chamber",
    "Serenity Station",
    "Quantum Realm",
    "Midnight Society",
    "Electric Oasis",
    "The Cozy Corner",
    "Neon Nexus",
    "Dreamland Domain",
    "Alpha Alliance",
    "Crypto Central",
    "Starry Skies",
    "Techno Tribe",
    "Zen Garden",
    "Cosmic Crusaders",
    "The Chill Zone",
    "Virtual Voyage",
    "Magic Manor",
    "Byte Bazaar",
    "Enigma Enclave",
    "Harmony Haven",
    "Synth City",
    "The Lively Lounge",
    "Cyber Sanctuary",
    "Oasis of Oddities",
    "Spectrum Squad",
    "The Zenith Zone",
    "Dreamer's Den",
    "Serendipity Station",
    "Lunar Legends",
    "Pixel Playground",
    "Electric Empire",
    "The Covert Club",
    "Nebula Nexus",
    "Midnight Metropolis",
    "Quantum Quarters",
    "Stellar Society",
    "Digital Dreamland",
    "Alpha Arcade",
    "Crypto Cafe",
    "Starstruck Station",
    "Techno Tavern",
    "Zenith Zephyr",
    "The Tranquil Terrace",
    "Virtual Vista",
    "Magic Mansion",
    "Bit Bazaar",
    "Enigma Estate",
    "Harmony Hideaway",
    "Synth Sanctuary",
    "The Serene Salon",
    "Cyber Circus",
    "Oasis of Oddities",
    "Spectrum Social",
    "The Zen Zone",
    "Dreamer's Domain",
    "Serendipity Square",
    "Lunar Lounge",
    "Pixel Paradise",
    "Electric Eden",
    "The Cozy Club",
    "Nebula Nook",
    "Midnight Manor",
    "Quantum Quarters",
    "Stellar Salon",
    "Digital Delight",
    "Alpha Arcade",
    "Crypto Corner",
    "Starry Social",
    "Techno Tavern",
    "Zenith Zone",
    "The Tranquil Terrace",
    "Virtual Vista",
    "Magic Mansion",
    "Byte Bazaar",
    "Enigma Enclave",
    "Harmony Haven",
    "Synth Sanctuary",
    "The Serene Salon",
    "Cyber Circus",
    "Oasis of Oddities",
    "Spectrum Social",
    "The Zen Zone",
    "Dreamer's Domain",
    "Serendipity Square",
    "Lunar Lounge",
    "Pixel Paradise",
    "Electric Eden",
    "The Cozy Club",
    "Nebula Nook",
    "Midnight Manor",
    "Quantum Quarters",
    "Stellar Salon",
    "Digital Delight",
    "Alpha Arcade",
    "Crypto Corner",
    "Starry Social",
    "Techno Tavern",
    "Zenith Zone"
];

const numberOfServers = 25;

for (let i = 0; i < numberOfServers; i++){

    //70% chance to generate 0, 30% it will be number from 1 to 10
    let notificationNumber;
    if (Math.random() <= 0.3) {
        notificationNumber = Math.floor(Math.random() * 10) + 1;
    } else {
        notificationNumber = 0;
    }

    let randomServerName = serverNamesArray[Math.floor(Math.random() * serverNamesArray.length)];

    const newObject = {
        "id": 1 + i,
        "name": randomServerName,
        "notifications": notificationNumber,
        "icon": ""
      };
      data.servers.push(newObject);
}

console.log(data);


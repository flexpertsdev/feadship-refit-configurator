// Paint Color Library - Generated from Alex Seal color database
// This file contains the complete Alex Seal color library used in the Feadship refit configurator

import type { Color } from '@/types/yacht-v2';

// Extended color type with Alex Seal specific data
export interface AlexSealColor extends Color {
  alexSealColorNo?: string;
  index?: number;
}

export const colorGroups = {
  'whites-beiges': 'Whites & Beiges',
  'golds-browns': 'Golds & Browns',
  'blacks-greys': 'Blacks & Greys',
  'blues': 'Blues',
  'greens': 'Greens',
  'reds-oranges-yellows': 'Reds, Oranges & Yellows',
  'custom-colours': 'Custom Colours'
} as const;

export type ColorGroup = keyof typeof colorGroups;

export const paintColors: AlexSealColor[] = [
  // Whites & Beiges
  { id: "DJdof5HCboh6dSKLpjvw", name: "Lunar White", hex: "#e7d6c2", type: "gloss", group: "whites-beiges", alexSealColorNo: "9107", index: 0 },
  { id: "zjmquxx74A2ti0H5E2Go", name: "Matterhorn White", hex: "#dde0e1", type: "gloss", group: "whites-beiges", alexSealColorNo: "9123", index: 1 },
  { id: "6odSz64DXk2bV898HRs9", name: "Fleet White", hex: "#e7e4dd", type: "gloss", group: "whites-beiges", alexSealColorNo: "9126", index: 2 },
  { id: "nJJtaBpB1vvgk0czotNO", name: "Off White", hex: "#eae8e1", type: "gloss", group: "whites-beiges", alexSealColorNo: "9130", index: 3 },
  { id: "7lAfDcC1KyHZKk133pTV", name: "Cloud White", hex: "#efedec", type: "gloss", group: "whites-beiges", alexSealColorNo: "9132", index: 4 },
  { id: "UNx2Z39X4JKIRcSaEcma", name: "Snow White", hex: "#ececeb", type: "gloss", group: "whites-beiges", alexSealColorNo: "9134", index: 5 },
  { id: "fmZOnsyqqvZrkpKfPGRH", name: "Arctic White", hex: "#deded8", type: "gloss", group: "whites-beiges", alexSealColorNo: "9135", index: 6 },
  { id: "PWg5lXZaZ6EdWDLLY2rC", name: "Eggshell White", hex: "#e7ded0", type: "gloss", group: "whites-beiges", alexSealColorNo: "9138", index: 7 },
  { id: "Wjbrx0HRIYNg2pKuRhCT", name: "Montblanc White", hex: "#e2e4e0", type: "gloss", group: "whites-beiges", alexSealColorNo: "9145", index: 8 },
  { id: "gPzs47QhawFERtDXaGDB", name: "Carina White", hex: "#dddedd", type: "gloss", group: "whites-beiges", alexSealColorNo: "9146", index: 9 },
  { id: "oD2ckIbQ3BvSds6RfNu2", name: "Vanilla White", hex: "#efe8d4", type: "gloss", group: "whites-beiges", alexSealColorNo: "9147", index: 10 },
  { id: "BvFDkHJjnKFhN3QJ57g8", name: "Nordic White", hex: "#e0ddc9", type: "gloss", group: "whites-beiges", alexSealColorNo: "9148", index: 11 },
  { id: "VPbM9RFTlYGJYWn9kO01", name: "Cream", hex: "#eedfc9", type: "gloss", group: "whites-beiges", alexSealColorNo: "1150", index: 12 },
  { id: "PFWmileHgaHwqeyS8prE", name: "Light Ivory", hex: "#e7d4c9", type: "gloss", group: "whites-beiges", alexSealColorNo: "1183", index: 13 },
  { id: "cMtaoVVYRB8i2otZwUEB", name: "Lunar White", hex: "#e7d6c2", type: "matte", group: "whites-beiges", alexSealColorNo: "9107", index: 79 },
  { id: "RDVUdRWH1m3ncASkJNSb", name: "Matterhorn White", hex: "#dde0e1", type: "matte", group: "whites-beiges", alexSealColorNo: "9123", index: 80 },
  { id: "KHBnqnvD3jqRbDnNUP5j", name: "Fleet White", hex: "#e7e4dd", type: "matte", group: "whites-beiges", alexSealColorNo: "9126", index: 81 },
  { id: "q6Ecvkmvi8xsurz7nIs0", name: "Off White", hex: "#eae8e1", type: "matte", group: "whites-beiges", alexSealColorNo: "9130", index: 82 },
  { id: "m6MYq2N4li8nyFSs8EP1", name: "Cloud White", hex: "#efedec", type: "matte", group: "whites-beiges", alexSealColorNo: "9132", index: 83 },
  { id: "M5tL5unwjGdkf1Rp9Zef", name: "Snow White", hex: "#ececeb", type: "matte", group: "whites-beiges", alexSealColorNo: "9134", index: 84 },
  { id: "WsXPZzBydYYPq65PXhnh", name: "Arctic White", hex: "#deded8", type: "matte", group: "whites-beiges", alexSealColorNo: "9135", index: 85 },
  { id: "33Y9vAeBAa9P4gu63IuG", name: "Eggshell White", hex: "#e7ded0", type: "matte", group: "whites-beiges", alexSealColorNo: "9138", index: 86 },
  { id: "Je3WL4KeYUFyPHB70p91", name: "Montblanc White", hex: "#e2e4e0", type: "matte", group: "whites-beiges", alexSealColorNo: "9145", index: 87 },
  { id: "Z7h66vfTKgYXIULiSgqw", name: "Carina White", hex: "#dddedd", type: "matte", group: "whites-beiges", alexSealColorNo: "9146", index: 88 },
  { id: "19eSj0kt4MadVD54FboQ", name: "Vanilla White", hex: "#efe8d4", type: "matte", group: "whites-beiges", alexSealColorNo: "9147", index: 89 },
  { id: "Sewfp067zZFFj4mV53rQ", name: "Nordic White", hex: "#e0ddc9", type: "matte", group: "whites-beiges", alexSealColorNo: "9148", index: 90 },
  { id: "mFGznJSEMDgLusrqbkGC", name: "Cream", hex: "#eedfc9", type: "matte", group: "whites-beiges", alexSealColorNo: "1150", index: 91 },
  { id: "9xO9R2sRjmSyEmYBJSp0", name: "Light Ivory", hex: "#e7d4c9", type: "matte", group: "whites-beiges", alexSealColorNo: "1183", index: 92 },

  // Golds & Browns
  { id: "afieKWIhaiHq5tdNYhyJ", name: "Eagle Brown", hex: "#5c4f4b", type: "gloss", group: "golds-browns", alexSealColorNo: "8127", index: 14 },
  { id: "qXmLRZpxXZRmtOgYIftF", name: "Buffalo Brown", hex: "#7e746e", type: "gloss", group: "golds-browns", alexSealColorNo: "8128", index: 15 },
  { id: "hFdyeFxOWdnXBVifJkZq", name: "Sahara Tan", hex: "#95765f", type: "gloss", group: "golds-browns", alexSealColorNo: "8160", index: 16 },
  { id: "nvN3deUK4dgplu9qyZzk", name: "Sable Brown", hex: "#43271e", type: "gloss", group: "golds-browns", alexSealColorNo: "8168", index: 17 },
  { id: "sOskF89lpiVNH9I3vjJY", name: "Horizons Teak", hex: "#5a3511", type: "gloss", group: "golds-browns", alexSealColorNo: "8191", index: 18 },
  { id: "SxPOYTmpRV8GbLhSsJhM", name: "Camel Beige", hex: "#b9a689", type: "gloss", group: "golds-browns", alexSealColorNo: "1151", index: 19 },
  { id: "xc0NnxkrrHCFqifcFbD3", name: "Savannah Beige", hex: "#cc9d6e", type: "gloss", group: "golds-browns", alexSealColorNo: "1152", index: 20 },
  { id: "MWRuH59qbCEY7ZTJRzfW", name: "Moon Dust", hex: "#d6c5ac", type: "gloss", group: "golds-browns", alexSealColorNo: "1158", index: 21 },
  { id: "P6GfW2gJjMVChHEZLYpJ", name: "San Mateo Wheat", hex: "#e5c799", type: "gloss", group: "golds-browns", alexSealColorNo: "1236", index: 22 },
  { id: "4ttieJvs3JO0fwxZgzTS", name: "Eagle Brown", hex: "#5c4f4b", type: "matte", group: "golds-browns", alexSealColorNo: "8127", index: 93 },
  { id: "Id7eCObRAr5UOPXOUhjj", name: "Buffalo Brown", hex: "#7e746e", type: "matte", group: "golds-browns", alexSealColorNo: "8128", index: 94 },
  { id: "OvJ6yw4ze1P7oR44dIHh", name: "Buffalo Brown", hex: "#7e746e", type: "matte", group: "golds-browns", alexSealColorNo: "8128", index: 95 },
  { id: "XqT5jOqR8nX9M8Ikd2GV", name: "Sahara Tan", hex: "#95765f", type: "matte", group: "golds-browns", alexSealColorNo: "8160", index: 96 },
  { id: "CLmiyxpAnz5bVoVvdxhF", name: "Sable Brown", hex: "#43271e", type: "matte", group: "golds-browns", alexSealColorNo: "8168", index: 97 },
  { id: "7hpBgSfhIoFBjezEiJY2", name: "Sable Brown", hex: "#43271e", type: "matte", group: "golds-browns", alexSealColorNo: "8168", index: 98 },
  { id: "vvrKblpSg0SuLgx3Fg0R", name: "Horizons Teak", hex: "#5a3511", type: "matte", group: "golds-browns", alexSealColorNo: "8191", index: 99 },
  { id: "Vf7ZoTSCFrXezuku0kDm", name: "Camel Beige", hex: "#b9a689", type: "matte", group: "golds-browns", alexSealColorNo: "1151", index: 100 },
  { id: "eq0IZ7bTxmBtLnZ6qsS7", name: "Savannah Beige", hex: "#cc9d6e", type: "matte", group: "golds-browns", alexSealColorNo: "1152", index: 101 },
  { id: "wr0rT5TTahETBxHH3r8w", name: "Moon Dust", hex: "#d6c5ac", type: "matte", group: "golds-browns", alexSealColorNo: "1158", index: 102 },
  { id: "xWeRSK9ZOw9IG75fSzQ5", name: "San Mateo Wheat", hex: "#e5c799", type: "matte", group: "golds-browns", alexSealColorNo: "1236", index: 103 },
  { id: "Ji8nzdyHrhCtXptieDjr", name: "Hazelnut", hex: "#82756a", type: "metallic", group: "golds-browns", alexSealColorNo: "8944", index: 165 },
  { id: "x8iCMIsSUShwd7ocLD6P", name: "Pale Gold", hex: "#cba77e", type: "metallic", group: "golds-browns", alexSealColorNo: "1927", index: 171 },
  { id: "jaFbaYh6lrtvtJYPw83q", name: "Mocha Brown", hex: "#584135", type: "metallic", group: "golds-browns", alexSealColorNo: "8949", index: 172 },
  { id: "l179eiNljhsZydBeSzHh", name: "Sahara Gold", hex: "#896449", type: "metallic", group: "golds-browns", alexSealColorNo: "1918", index: 173 },

  // Blacks & Greys
  { id: "1OCkutQTBVXQDCmV9W4Q", name: "Super Jet Black", hex: "#0b0706", type: "gloss", group: "blacks-greys", alexSealColorNo: "9232", index: 23 },
  { id: "TmdKFr7xPqZvPFBsfrNE", name: "Whisper Gray", hex: "#c1c7ca", type: "gloss", group: "blacks-greys", alexSealColorNo: "7151", index: 24 },
  { id: "mOFhTfTENRP1vDgRJMSf", name: "Pearl Gray", hex: "#c3c5c1", type: "gloss", group: "blacks-greys", alexSealColorNo: "7152", index: 25 },
  { id: "Lh0rtLq5ALFKJUTlOEQh", name: "Light Gray", hex: "#aeb0ae", type: "gloss", group: "blacks-greys", alexSealColorNo: "7153", index: 26 },
  { id: "7H4N5VjZEYDr0QKYybNX", name: "Pegasus Gray", hex: "#cac2b6", type: "gloss", group: "blacks-greys", alexSealColorNo: "7154", index: 27 },
  { id: "GQEDVzy9M3iZSuHx0Us0", name: "Kingston Gray", hex: "#a6afb3", type: "gloss", group: "blacks-greys", alexSealColorNo: "7155", index: 28 },
  { id: "gDZ6CNsN4NaLQsKqBPhY", name: "Dark Gray", hex: "#596d6f", type: "gloss", group: "blacks-greys", alexSealColorNo: "7156", index: 29 },
  { id: "YP9iKynRa82b26BC5hdd", name: "Raccoon Gray", hex: "#7c8181", type: "gloss", group: "blacks-greys", alexSealColorNo: "7188", index: 30 },
  { id: "BCkYLpmSB0n18P3AtL6s", name: "Warm Gray", hex: "#a19891", type: "gloss", group: "blacks-greys", alexSealColorNo: "7189", index: 31 },
  { id: "k6bPNUL7xsW8272irGZY", name: "Stingray Gray", hex: "#414748", type: "gloss", group: "blacks-greys", alexSealColorNo: "7190", index: 32 },
  { id: "USdY0S30MpxqWpMshZiq", name: "Seattle Gray", hex: "#c5cabb", type: "gloss", group: "blacks-greys", alexSealColorNo: "7281", index: 33 },
  { id: "6vfvTZcKHgbcRBVrQccn", name: "Thunderstorm Gray", hex: "#2c3437", type: "gloss", group: "blacks-greys", alexSealColorNo: "7389", index: 34 },
  { id: "ExnNRbVL1NxLnS7CnuKh", name: "Silver Metallic", hex: "#a4a7aa", type: "gloss", group: "blacks-greys", alexSealColorNo: "943", index: 76 },
  { id: "DOE9lpOToNOH72MaIK6P", name: "Storm Grey Metallic", hex: "#4c4743", type: "gloss", group: "blacks-greys", alexSealColorNo: "953", index: 77 },
  { id: "EDEGCOH0jY4QVWnPNIzf", name: "Dark Black Metallic", hex: "#30302e", type: "gloss", group: "blacks-greys", alexSealColorNo: "9449", index: 78 },
  { id: "ffNwSZq8lILkE2zEtLkA", name: "Super Jet Black", hex: "#0b0706", type: "matte", group: "blacks-greys", alexSealColorNo: "9232", index: 104 },
  { id: "e3bx1flyy7W8xalwYZQO", name: "Whisper Gray", hex: "#c1c7ca", type: "matte", group: "blacks-greys", alexSealColorNo: "7151", index: 105 },
  { id: "4TwQN9Il1kMdyjyzNSE3", name: "Pearl Gray", hex: "#c3c5c1", type: "matte", group: "blacks-greys", alexSealColorNo: "7152", index: 106 },
  { id: "bour6dISETlzcakecvgF", name: "Light Gray", hex: "#aeb0ae", type: "matte", group: "blacks-greys", alexSealColorNo: "7153", index: 107 },
  { id: "qV4nWLXMGskRNI5JiKlZ", name: "Pegasus Gray", hex: "#cac2b6", type: "matte", group: "blacks-greys", alexSealColorNo: "7154", index: 108 },
  { id: "Wxv9w4M8ot0sIaOULh9J", name: "Kingston Gray", hex: "#a6afb3", type: "matte", group: "blacks-greys", alexSealColorNo: "7155", index: 109 },
  { id: "eRQMIOsFWJkXmcPzQVQS", name: "Dark Gray", hex: "#596d6f", type: "matte", group: "blacks-greys", alexSealColorNo: "7156", index: 110 },
  { id: "WUpESpBj9Y9qAGoVLnYN", name: "Raccoon Gray", hex: "#7c8181", type: "matte", group: "blacks-greys", alexSealColorNo: "7188", index: 111 },
  { id: "NjgqGrvUMVNdMbw0mSPv", name: "Warm Gray", hex: "#a19891", type: "matte", group: "blacks-greys", alexSealColorNo: "7189", index: 112 },
  { id: "4aOj7lkkLUpJoXcZvgTn", name: "Stingray Gray", hex: "#414748", type: "matte", group: "blacks-greys", alexSealColorNo: "7190", index: 113 },
  { id: "SeBAm7JEzL6a7XB1JlAE", name: "Seattle Gray", hex: "#c5cabb", type: "matte", group: "blacks-greys", alexSealColorNo: "7281", index: 114 },
  { id: "TfX98aAQPFYRdVUgcXXX", name: "Thunderstorm Gray", hex: "#2c3437", type: "matte", group: "blacks-greys", alexSealColorNo: "7389", index: 115 },
  { id: "dDZwXsHNCVH9p5BYvKZx", name: "Silver Metallic", hex: "#a4a7aa", type: "matte", group: "blacks-greys", alexSealColorNo: "943", index: 158 },
  { id: "kwr9d2RS0T09VAytGUAr", name: "Storm Grey Metallic", hex: "#4c4743", type: "matte", group: "blacks-greys", alexSealColorNo: "953", index: 159 },
  { id: "OqVTsyoiV6RF4jH83Emd", name: "Dark Black Metallic", hex: "#30302e", type: "matte", group: "blacks-greys", alexSealColorNo: "9449", index: 160 },
  { id: "gvzdXweRZDSZWqP2u6xr", name: "Pure Silver", hex: "#7e8184", type: "metallic", group: "blacks-greys", alexSealColorNo: "9392", index: 161 },
  { id: "M4bKxxf5kJKdWK6BxI3r", name: "Anniversary Silver", hex: "#898988", type: "metallic", group: "blacks-greys", alexSealColorNo: "9389", index: 162 },
  { id: "ctXCbIhyRNEWwQfBgAqE", name: "Stardust Silver", hex: "#79736e", type: "metallic", group: "blacks-greys", alexSealColorNo: "7905", index: 163 },
  { id: "sdxUPIyqhaVYpA3jixsk", name: "Snowpack Silver", hex: "#94938c", type: "metallic", group: "blacks-greys", alexSealColorNo: "7928", index: 164 },
  { id: "uEKcfICEsR0vEgYSR57h", name: "Diamond Gray", hex: "#473e38", type: "metallic", group: "blacks-greys", alexSealColorNo: "8945", index: 166 },
  { id: "PtEVNuQKJkCsrXImJ3QK", name: "Ahamay Gray", hex: "#5e686f", type: "metallic", group: "blacks-greys", alexSealColorNo: "7906", index: 167 },
  { id: "2bdJdvQRUgmSsk1vkjyf", name: "Midnight Gray", hex: "#2b2c2a", type: "metallic", group: "blacks-greys", alexSealColorNo: "7916", index: 168 },
  { id: "8zMdlSYO49zuIMOi4ARl", name: "Flint Black", hex: "#1f1e1c", type: "metallic", group: "blacks-greys", alexSealColorNo: "9394", index: 169 },
  { id: "mBC4ka8hPZOrG3E91oep", name: "Black Magic", hex: "#0c0b0c", type: "metallic", group: "blacks-greys", alexSealColorNo: "9388", index: 170 },

  // Blues
  { id: "jMcprYtHjIAjYINllSWv", name: "Sky Blue", hex: "#57a1bd", type: "gloss", group: "blues", alexSealColorNo: "5117", index: 35 },
  { id: "eskvwvE6Y014OMb4X4Rl", name: "Petrol Blue", hex: "#2c5b6c", type: "gloss", group: "blues", alexSealColorNo: "5133", index: 36 },
  { id: "vmvUN1N0xo5RhZkbP6nW", name: "Royal Blue", hex: "#003169", type: "gloss", group: "blues", alexSealColorNo: "5150", index: 37 },
  { id: "m6bIenxgFgtpPHfnRSAC", name: "Navy Blue", hex: "#00427e", type: "gloss", group: "blues", alexSealColorNo: "5151", index: 38 },
  { id: "kklCJ1E8xudjtSYJ6U1N", name: "Capri Blue", hex: "#006a98", type: "gloss", group: "blues", alexSealColorNo: "5152", index: 39 },
  { id: "9ZczzXZYtTE7oN4DgRjb", name: "Flag Blue", hex: "#0c1927", type: "gloss", group: "blues", alexSealColorNo: "5153", index: 40 },
  { id: "lHVvorrpP3shcav6UxcB", name: "Aristo Blue", hex: "#00284f", type: "gloss", group: "blues", alexSealColorNo: "5154", index: 41 },
  { id: "xpOAkYGcVFC1zPypARr7", name: "Majestic Blue", hex: "#08161f", type: "gloss", group: "blues", alexSealColorNo: "5158", index: 42 },
  { id: "NYpie3HEeOSBeTo6NNuW", name: "Ice Blue", hex: "#d1e5e9", type: "gloss", group: "blues", alexSealColorNo: "5159", index: 43 },
  { id: "Qp0WppUjxiN1kTyV4pnp", name: "Stars &amp; Stripes Blue", hex: "#3c667a", type: "gloss", group: "blues", alexSealColorNo: "5160", index: 44 },
  { id: "Gb7fjTxFXbQEozBb85Yj", name: "AD Blue", hex: "#22a9b6", type: "gloss", group: "blues", alexSealColorNo: "5179", index: 45 },
  { id: "nS1aeRpcF5YdMKg8anp9", name: "Etheral Blue", hex: "#c1dbe9", type: "gloss", group: "blues", alexSealColorNo: "5182", index: 46 },
  { id: "abPLIpSMrqZJ2NF9cIf4", name: "Fisherman Blue", hex: "#86b7c2", type: "gloss", group: "blues", alexSealColorNo: "5185", index: 47 },
  { id: "wtgLtR6PDiT4dQGUpVST", name: "Deep Sea Blue", hex: "#003b4e", type: "gloss", group: "blues", alexSealColorNo: "5192", index: 48 },
  { id: "7EaXzWmSOfLbrlBNfRe2", name: "Sorrento Blue", hex: "#10525e", type: "gloss", group: "blues", alexSealColorNo: "5193", index: 49 },
  { id: "KRzJmtul1u5qtUfmtu08", name: "Santorin Blue", hex: "#00274f", type: "gloss", group: "blues", alexSealColorNo: "5195", index: 50 },
  { id: "dnOurlscZ9XnoidKclvB", name: "Infinity Blue", hex: "#03203b", type: "gloss", group: "blues", alexSealColorNo: "5199", index: 51 },
  { id: "htiNFUblz2RYR2NWV3DM", name: "Midnight Blue", hex: "#111a28", type: "gloss", group: "blues", alexSealColorNo: "5200", index: 52 },
  { id: "nUCYi9vlpjgFxZwkEm9J", name: "Empress Blue", hex: "#0076a4", type: "gloss", group: "blues", alexSealColorNo: "5203", index: 53 },
  { id: "QiBDtS4qA4r9r9VChXVa", name: "Mint Blue", hex: "#a9d5e0", type: "gloss", group: "blues", alexSealColorNo: "5211", index: 54 },
  { id: "gKsmGpdDaDoVZ4HA71nk", name: "Lauderdale Blue", hex: "#005a8f", type: "gloss", group: "blues", alexSealColorNo: "5213", index: 55 },
  { id: "kU9PYr8obd2XsTi0mbTx", name: "Bimini Blue", hex: "#358aab", type: "gloss", group: "blues", alexSealColorNo: "5215", index: 56 },
  { id: "Q7rzwsdmp3wBFQYl4cyl", name: "Storm Blue", hex: "#678b9b", type: "gloss", group: "blues", alexSealColorNo: "5260", index: 57 },
  { id: "WZwPYQiTctaOV3PLNXJa", name: "Sky Blue", hex: "#57a1bd", type: "matte", group: "blues", alexSealColorNo: "5117", index: 116 },
  { id: "BPqdSfqv3P1eBBMZLf5A", name: "Petrol Blue", hex: "#2c5b6c", type: "matte", group: "blues", alexSealColorNo: "5133", index: 117 },
  { id: "R3EMxiCsjHY9k2xHi9eK", name: "Royal Blue", hex: "#003169", type: "matte", group: "blues", alexSealColorNo: "5150", index: 118 },
  { id: "iYfFZkv3EXnDS0Sag6RS", name: "Navy Blue", hex: "#00427e", type: "matte", group: "blues", alexSealColorNo: "5151", index: 119 },
  { id: "CqZTPHytwFRZvK9wUipo", name: "Capri Blue", hex: "#006a98", type: "matte", group: "blues", alexSealColorNo: "5152", index: 120 },
  { id: "6KP1uQnbqGIbldUawbZq", name: "Flag Blue", hex: "#0c1927", type: "matte", group: "blues", alexSealColorNo: "5153", index: 121 },
  { id: "g308FOfIhZX49JKCRJap", name: "Aristo Blue", hex: "#00284f", type: "matte", group: "blues", alexSealColorNo: "5154", index: 122 },
  { id: "4MVQMrFrJX63teuisp0F", name: "Majestic Blue", hex: "#08161f", type: "matte", group: "blues", alexSealColorNo: "5158", index: 123 },
  { id: "NTU0OHQ1WYWnteLFzWZ0", name: "Ice Blue", hex: "#d1e5e9", type: "matte", group: "blues", alexSealColorNo: "5159", index: 124 },
  { id: "ZJDcZrgGE4cAO5mAwpyO", name: "Stars &amp; Stripes Blue", hex: "#3c667a", type: "matte", group: "blues", alexSealColorNo: "5160", index: 125 },
  { id: "sC1IQs2NTGUke62YFMi2", name: "AD Blue", hex: "#22a9b6", type: "matte", group: "blues", alexSealColorNo: "5179", index: 126 },
  { id: "aabThrC7XouDtahesmMZ", name: "Etheral Blue", hex: "#c1dbe9", type: "matte", group: "blues", alexSealColorNo: "5182", index: 127 },
  { id: "O2EkZsJPPJIvd2kD7rYE", name: "Etheral Blue", hex: "#c1dbe9", type: "matte", group: "blues", alexSealColorNo: "5182", index: 128 },
  { id: "s0A13vQEysR1ooEWLKWG", name: "Fisherman Blue", hex: "#86b7c2", type: "matte", group: "blues", alexSealColorNo: "5185", index: 129 },
  { id: "svMLvQPUFPvNcLqoV4oY", name: "Deep Sea Blue", hex: "#003b4e", type: "matte", group: "blues", alexSealColorNo: "5192", index: 130 },
  { id: "dJ6FioGn2fGK271wAwJC", name: "Sorrento Blue", hex: "#10525e", type: "matte", group: "blues", alexSealColorNo: "5193", index: 131 },
  { id: "Ic54pcIwggM0T2YG67VZ", name: "Santorin Blue", hex: "#00274f", type: "matte", group: "blues", alexSealColorNo: "5195", index: 132 },
  { id: "z1ZaO4VBqoPNa0jVmNm4", name: "Infinity Blue", hex: "#03203b", type: "matte", group: "blues", alexSealColorNo: "5199", index: 133 },
  { id: "cx7UqrOeCHCMwpUe8Ogc", name: "Midnight Blue", hex: "#111a28", type: "matte", group: "blues", alexSealColorNo: "5200", index: 134 },
  { id: "t0Z2D5fFm39uWz8EnTs3", name: "Empress Blue", hex: "#0076a4", type: "matte", group: "blues", alexSealColorNo: "5203", index: 135 },
  { id: "J0meVcbsIuyNBzlnjARX", name: "Mint Blue", hex: "#a9d5e0", type: "matte", group: "blues", alexSealColorNo: "5211", index: 136 },
  { id: "RNU7ydRZEtRL6cjTSysW", name: "Lauderdale Blue", hex: "#005a8f", type: "matte", group: "blues", alexSealColorNo: "5213", index: 137 },
  { id: "SPKC19BHsXkmeV0jv35J", name: "Bimini Blue", hex: "#358aab", type: "matte", group: "blues", alexSealColorNo: "5215", index: 138 },
  { id: "XKPMqJTU03K2ZDxi6Y4g", name: "Storm Blue", hex: "#678b9b", type: "matte", group: "blues", alexSealColorNo: "5260", index: 139 },
  { id: "887k5soMhf8nAHMrDk49", name: "Dolphine Blue", hex: "#6f92a2", type: "metallic", group: "blues", alexSealColorNo: "5927", index: 177 },
  { id: "8iMI4DZGoF9i5o9IGfuC", name: "Palma Blue", hex: "#325162", type: "metallic", group: "blues", alexSealColorNo: "5922", index: 178 },
  { id: "UJjJQKRxPLbKWVYWgetr", name: "Lagoon Blue", hex: "#278ab0", type: "metallic", group: "blues", alexSealColorNo: "5991", index: 179 },
  { id: "9URLSS0IumgfPgDQxGjW", name: "Peppermint Blue", hex: "#003359", type: "metallic", group: "blues", alexSealColorNo: "5914", index: 180 },
  { id: "l8QgWkes2mLhlspXRNzE", name: "Blue Topaz", hex: "#00213a", type: "metallic", group: "blues", alexSealColorNo: "5915", index: 181 },
  { id: "x8HZrsA2ZVLGJQ3PSl3o", name: "Royal Nights", hex: "#041628", type: "metallic", group: "blues", alexSealColorNo: "5918", index: 182 },

  // Greens
  { id: "V5DpojdulfR6A7WH5qvN", name: "Jade Mist Green", hex: "#003321", type: "gloss", group: "greens", alexSealColorNo: "6150", index: 58 },
  { id: "XGD9bRmba1r3DVK3aaX4", name: "Forest Green", hex: "#00452f", type: "gloss", group: "greens", alexSealColorNo: "6152", index: 59 },
  { id: "bQCeLslhZYximLj0C1TF", name: "Dark Green", hex: "#031d19", type: "gloss", group: "greens", alexSealColorNo: "6155", index: 60 },
  { id: "tqm1LPr0L8L59cpQYpeM", name: "Aqua Mist", hex: "#d2e9e4", type: "gloss", group: "greens", alexSealColorNo: "6158", index: 61 },
  { id: "HUn1chlsRzK1SdZ00rss", name: "Sea Foam", hex: "#90dfd1", type: "gloss", group: "greens", alexSealColorNo: "6173", index: 62 },
  { id: "cX7JMDZEdAWSADym7m2w", name: "Sea Frost", hex: "#b5e4da", type: "gloss", group: "greens", alexSealColorNo: "6183", index: 63 },
  { id: "83rSVRAoPDs8jyXw9pt0", name: "Teal", hex: "#006568", type: "gloss", group: "greens", alexSealColorNo: "6188", index: 64 },
  { id: "AWIl3TKRzOLW5QxkC0WI", name: "Island Turquoise", hex: "#008988", type: "gloss", group: "greens", alexSealColorNo: "6216", index: 65 },
  { id: "7dCA0h5QCAEDcRUUWtUf", name: "Kelly Green", hex: "#005a17", type: "gloss", group: "greens", alexSealColorNo: "6219", index: 66 },
  { id: "9ODzVouh4Jsigz8vTGKe", name: "Jade Mist Green", hex: "#003321", type: "matte", group: "greens", alexSealColorNo: "6150", index: 140 },
  { id: "gRYVXgS9gosq4AakUygN", name: "Forest Green", hex: "#00452f", type: "matte", group: "greens", alexSealColorNo: "6152", index: 141 },
  { id: "rXszWCvvdjeoz6C90W2y", name: "Dark Green", hex: "#031d19", type: "matte", group: "greens", alexSealColorNo: "6155", index: 142 },
  { id: "0XmGCDg1dPGkuiSAyvk5", name: "Sea Owl Green", hex: "#134313", type: "gloss", group: "greens", alexSealColorNo: "6213", index: 143 },
  { id: "75V3BUFKdwjxEMkxUUEV", name: "Aqua Mist", hex: "#d2e9e4", type: "matte", group: "greens", alexSealColorNo: "6158", index: 143 },
  { id: "szLH11ZOJWhhv3ZIWBVA", name: "Sea Foam", hex: "#90dfd1", type: "matte", group: "greens", alexSealColorNo: "6173", index: 144 },
  { id: "RkbIwSTtZaT1sLBnJAJi", name: "Sea Frost", hex: "#b5e4da", type: "matte", group: "greens", alexSealColorNo: "6183", index: 145 },
  { id: "biK9LnwUKTf4AOGaRslT", name: "Teal", hex: "#006568", type: "matte", group: "greens", alexSealColorNo: "6188", index: 146 },
  { id: "3WDpXXHaFDPbZ0wlUpmr", name: "Island Turquoise", hex: "#008988", type: "matte", group: "greens", alexSealColorNo: "6216", index: 147 },
  { id: "fo1tvqnKzjrqGDQKlVzg", name: "Kelly Green", hex: "#005a17", type: "matte", group: "greens", alexSealColorNo: "6219", index: 148 },
  { id: "Ab36rS28MEwHZY9Xq8JF", name: "Velvet Green", hex: "#01312e", type: "metallic", group: "greens", alexSealColorNo: "6915", index: 183 },
  { id: "UrBv4SZjTMf8We82oRHq", name: "Luna Green", hex: "#91987f", type: "metallic", group: "greens", alexSealColorNo: "6919", index: 184 },

  // Reds, Oranges & Yellows
  { id: "626ePy1VHni6OZ9uWNG7", name: "Sunfast Red", hex: "#a4000c", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "3150", index: 67 },
  { id: "NHIhn6mk0I0AXyJAePpm", name: "Toreador Red", hex: "#a50e07", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "3151", index: 68 },
  { id: "ApezciW6WPCq92qqDoSV", name: "Wine Red", hex: "#640f14", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "3152", index: 69 },
  { id: "ZJ1VPZO1hBWeRq0Wm7gq", name: "Vivid Red", hex: "#880000", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "3153", index: 70 },
  { id: "cBpWwHpcMzQGJUhPRZF4", name: "Blackberry Red", hex: "#512e3d", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "3199", index: 71 },
  { id: "p3iit7yZRUT7LY8JR6Zx", name: "International Orange", hex: "#d63e00", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "2165", index: 72 },
  { id: "FHfEubdsEwI2xvbD8wbn", name: "Fighting Lady Yellow", hex: "#f7dea2", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "1164", index: 73 },
  { id: "tPUnKavx5Sr07hFHj3C7", name: "Federal Yellow", hex: "#fb9e00", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "1232", index: 74 },
  { id: "BSfIKqInT0yHy7oG86AO", name: "Mellow Yellow", hex: "#f2e9ce", type: "gloss", group: "reds-oranges-yellows", alexSealColorNo: "1237", index: 75 },
  { id: "ZkphTY96liWBbHXt2Qky", name: "Sunfast Red", hex: "#a4000c", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "3150", index: 149 },
  { id: "dBQXjdeQmFMbzC8TkW1e", name: "Toreador Red", hex: "#a50e07", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "3151", index: 150 },
  { id: "izz2x2jPQVNd3QJtXsxJ", name: "Wine Red", hex: "#640f14", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "3152", index: 151 },
  { id: "bDXFa2UD45nuaFdterVA", name: "Vivid Red", hex: "#880000", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "3153", index: 152 },
  { id: "H6PWCaNDePQgXi1KQzdD", name: "Blackberry Red", hex: "#512e3d", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "3199", index: 153 },
  { id: "Wuk8cxVuVBod2R6IXDvG", name: "International Orange", hex: "#d63e00", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "2165", index: 154 },
  { id: "7lb4lDw7JBAzAtT952OL", name: "Fighting Lady Yellow", hex: "#f7dea2", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "1164", index: 155 },
  { id: "jtMKiJgJAuhu5yN0HiqN", name: "Federal Yellow", hex: "#fb9e00", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "1232", index: 156 },
  { id: "bmRRm18gQ11PH8gFs9Wo", name: "Mellow Yellow", hex: "#f2e9ce", type: "matte", group: "reds-oranges-yellows", alexSealColorNo: "1237", index: 157 },
  { id: "u4OJy529dcQP5lJv7oBc", name: "Royal Rubie", hex: "#230d15", type: "metallic", group: "reds-oranges-yellows", alexSealColorNo: "3905", index: 174 },
  { id: "v3DscNxto49buKmEpg8h", name: "Venetian Red", hex: "#6e3e45", type: "metallic", group: "reds-oranges-yellows", alexSealColorNo: "3984", index: 175 },
  { id: "nq3V7jRWMMhA33PLjUvM", name: "Sunstone Red", hex: "#6b2523", type: "metallic", group: "reds-oranges-yellows", alexSealColorNo: "3971", index: 176 },

];

// Get colors filtered by group and/or type
export const getFilteredColors = (group: string | null, type: string | null): AlexSealColor[] => {
  let filtered = paintColors;
  
  if (group) {
    filtered = filtered.filter(color => color.group === group);
  }
  
  if (type) {
    filtered = filtered.filter(color => color.type === type);
  }
  
  return filtered;
};

// Get all unique paint types
export const getPaintTypes = (): string[] => {
  const types = new Set(paintColors.map(color => color.type));
  return Array.from(types);
};

// Get color by ID
export const getColorById = (id: string): AlexSealColor | undefined => {
  return paintColors.find(color => color.id === id);
};

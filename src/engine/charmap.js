export const englishUnicode = [
    '\u0061', // a
    '\u0062', // b
    '\u0063', // c
    '\u0064', // d
    '\u0065', // e
    '\u0066', // f
    '\u0067', // g
    '\u0068', // h
    '\u0069', // i
    '\u006A', // j
    '\u006B', // k
    '\u006C', // l
    '\u006D', // m
    '\u006E', // n
    '\u006F', // o
    '\u0070', // p
    '\u0071', // q
    '\u0072', // r
    '\u0073', // s
    '\u0074', // t
    '\u0075', // u
    '\u0076', // v
    '\u0077', // w
    '\u0078', // x
    '\u0079', // y
    '\u007A', // z
    '\u003B', // ;
    '\u0027', // '
];

export const hindiUnicodes = [
    '\u0902', // a $ं
    '\u0907', // b इ
    '\u092C', // c ब
    '\u0915', // d क
    '\u092E', // e म
    '\u093F', // f $ि
    '\u0939', // g ह
    '\u0940', // h $ी
    '\u092A', // i प
    '\u0930', // j र
    '\u093E', // k $ा
    '\u0938', // l स
    '\u0909', // m उ
    '\u0926', // n द
    '\u0935', // o व
    '\u091A', // p च
    '\u0941', // q $ु 
    '\u0924', // r त
    '\u0947', // s $े
    '\u091C', // t ज
    '\u0928', // u न
    '\u0905', // v अ
    '\u0942', // w $ू 
    '\u0917', // x ग
    '\u0932', // y ल
    '', // z 
    '\u092F', // ; य
    '' // '
]

const engToHindiList = [
    { eng: 'a', hindi: 'अ', unicodeEng: '\u0061', unicodeHindi: '\u0905' },
    { eng: 'b', hindi: 'ब', unicodeEng: '\u0062', unicodeHindi: '\u092C' },
    { eng: 'c', hindi: 'म', unicodeEng: '\u0063', unicodeHindi: '\u092E' },
    { eng: 'd', hindi: 'द', unicodeEng: '\u0064', unicodeHindi: '\u0926' },
    { eng: 'e', hindi: 'ड', unicodeEng: '\u0065', unicodeHindi: '\u0921' },
    { eng: 'f', hindi: 'त', unicodeEng: '\u0066', unicodeHindi: '\u0924' },
    { eng: 'g', hindi: 'ग', unicodeEng: '\u0067', unicodeHindi: '\u0917' },
    { eng: 'h', hindi: 'अ', unicodeEng: '\u0068', unicodeHindi: '\u0905' },
    { eng: 'i', hindi: 'फ', unicodeEng: '\u0069', unicodeHindi: '\u092B' },
    { eng: 'j', hindi: 'इ', unicodeEng: '\u006A', unicodeHindi: '\u0907' },
    { eng: 'k', hindi: 'उ', unicodeEng: '\u006B', unicodeHindi: '\u0909' },
    { eng: 'l', hindi: 'ए', unicodeEng: '\u006C', unicodeHindi: '\u090F' },
    { eng: 'm', hindi: 'न', unicodeEng: '\u006D', unicodeHindi: '\u0928' },
    { eng: 'n', hindi: 'व', unicodeEng: '\u006E', unicodeHindi: '\u0935' },
    { eng: 'o', hindi: 'र', unicodeEng: '\u006F', unicodeHindi: '\u0930' },
    { eng: 'p', hindi: 'च', unicodeEng: '\u0070', unicodeHindi: '\u091A' },
    { eng: 'q', hindi: 'औ', unicodeEng: '\u0071', unicodeHindi: '\u0914' },
    { eng: 'r', hindi: 'क', unicodeEng: '\u0072', unicodeHindi: '\u0915' },
    { eng: 's', hindi: 'स', unicodeEng: '\u0073', unicodeHindi: '\u0938' },
    { eng: 't', hindi: 'ट', unicodeEng: '\u0074', unicodeHindi: '\u091F' },
    { eng: 'u', hindi: 'न', unicodeEng: '\u0075', unicodeHindi: '\u0928' },
    { eng: 'v', hindi: 'प', unicodeEng: '\u0076', unicodeHindi: '\u092A' },
    { eng: 'w', hindi: 'आ', unicodeEng: '\u0077', unicodeHindi: '\u0906' },
    { eng: 'x', hindi: 'ष', unicodeEng: '\u0078', unicodeHindi: '\u0937' },
    { eng: 'y', hindi: 'ल', unicodeEng: '\u0079', unicodeHindi: '\u0932' },
    { eng: 'z', hindi: 'य', unicodeEng: '\u007A', unicodeHindi: '\u092F' }
];

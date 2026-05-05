export const engToHindi = (engUnicodes, hindiUnicodes) => {
    let engToHindiMap = new Map();
    let len = hindiUnicodes.length
    for(let i = 0; i < len; i++) {
        if(hindiUnicodes[i] !== '') {
            engToHindiMap.set(engUnicodes[i], hindiUnicodes[i])
        }
    }

    return engToHindiMap;
}
export function randomInteger(lowerBound=1, upperBound) {
    if (upperBound < 0 || lowerBound >= upperBound) {
        return;
    }

    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
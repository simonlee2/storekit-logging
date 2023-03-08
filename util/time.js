function millisecondsToSeconds(milliseconds) {
    if (milliseconds === undefined) {
        return undefined
    } else {
        return milliseconds / 1000;
    }
}

module.exports = {
    millisecondsToSeconds,
};
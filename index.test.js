const {totalRaceTime} = require('./index')

describe('F1 Test', () => {
    test('Example 1', () => {
        const TYRES = ['MEDIUM'];
        const CIRCUIT_LAPS = 30;
        const TARGET_PIT_STOP = 0.4
        const timeRace = totalRaceTime(TYRES, CIRCUIT_LAPS, TARGET_PIT_STOP);
        expect(timeRace).toEqual('00:40:36')
    })

    test('Example 2', () => {
        const TYRES = ['HARD', 'SOFT'];
        const CIRCUIT_LAPS = 60;
        const TARGET_PIT_STOP = 0.3
        const timeRace = totalRaceTime(TYRES, CIRCUIT_LAPS, TARGET_PIT_STOP);
        expect(timeRace).toEqual('01:27:21')
    })

    test('Example 3', () => {
        const TYRES = ['SOFT', 'SOFT', 'MEDIUM'];
        const CIRCUIT_LAPS = 75;
        const TARGET_PIT_STOP = 0.4
        const timeRace = totalRaceTime(TYRES, CIRCUIT_LAPS, TARGET_PIT_STOP);
        expect(timeRace).toEqual('01:51:55')
    })
})
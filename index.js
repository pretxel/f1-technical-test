const {Duration} = require('luxon')

const TYPE_TYRES = {
    SOFT: {
        LABEL: 'SOFT',
        GRAINING: 0.4,
        TIME: 75
    },
    MEDIUM: {
        LABEL: 'MEDIUM',
        GRAINING: 0.25,
        TIME: 77
    },
    HARD: {
        LABEL: 'HARD',
        GRAINING: 0.15,
        TIME: 80
    }
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function formatTime (milliseconds) {
    return Duration.fromObject({milliseconds:milliseconds}).toFormat('hh:mm:ss') 
}


// Get tyre wear by lap
const getTyreWearByLap = (typeTyre, lap) => {
    return getBaseLog(TYPE_TYRES[typeTyre].GRAINING, lap) + 2
}

// time 
const timeTyreWear = (typeTyre, tyreWear, lapTyre) => {
    return  ((1 - tyreWear) * TYPE_TYRES[typeTyre].GRAINING) * lapTyre;
}



const totalRaceTime = (tyres, laps, targetPitStop) => {

    let totalTime = 0;
    let TYRE_WEAR_THRESHOLD = 0.5

    //Create tyre state
    const tyresStates = tyres.map(tyre => ({ type: tyre, tyreWear: 100, laps: 1 }));
    let currentTyre = tyresStates.shift()

    for(let currentLap=1; currentLap<=laps; currentLap++ ){
        totalTime += TYPE_TYRES[currentTyre.type].TIME;
        currentTyre.tyreWear= getTyreWearByLap(currentTyre.type, currentTyre.laps)
        
        // Validate tyre wear 
        if (currentTyre.tyreWear < TYRE_WEAR_THRESHOLD){
            totalTime += timeTyreWear(currentTyre.type, currentTyre.tyreWear, currentTyre.laps)
        }
        // Check if the pilot sholud go to Box
        if (currentTyre.tyreWear <= targetPitStop && tyresStates.length) {
            currentTyre = tyresStates.shift()
        }
        currentTyre.laps++;
    }
    
    const totalTimeMillis = parseInt(totalTime * 1000);
    return formatTime(totalTimeMillis)
}

module.exports = {totalRaceTime}

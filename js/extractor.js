// Extraction of osu file :)
export function parseOsuFile(data) {
    const parsedData = {
        general: {},
        editor: {},
        metadata: {},
        difficulty: {},
        events: [],
        timingPoints: [],
        hitobjects: [],
    };

    const lines = data.split("\r\n");

    let currentSection = null;
    for (const line of lines) {
        if (line.startsWith("[")) {
            currentSection = line.slice(1, -1).toLowerCase();
            console.log(`Line string= ${line}`);
            continue;
        }

        if (
            currentSection == "general" ||
            currentSection == "editor" ||
            currentSection == "metadata" ||
            currentSection == "difficulty"
        ) {
            const keyValue = line.split(": ");
            if (keyValue.length === 2) {
                const key = keyValue[0];
                const value = keyValue[1];
                parsedData[currentSection][key] = value;
                continue;
            }
        }
        if (currentSection == "timingpoints") {
            const values = line.split(",").map(Number);
            const offset = values[0];
            const beatlength = values[1];
            const meter = values[2];

            parsedData.timingPoints.push({ offset, beatlength, meter });
            continue;
        }
        if (currentSection == "hitobjects") {
            const values = line.split(",").map(Number);
            const lane = values[0];
            const offset = values[2];

            parsedData.hitobjects.push({ lane, offset });
        }
    }

    return parsedData;
}

// extracter.js

// Define a function to parse the provided .osu text data
export function parseOsuFile(data) {
    const parsedData = {
        general: {},
        editor: {},
        metadata: {},
        difficulty: {},
        events: [],
        timingPoints: [],
        hitObjects: [],
    };

    // Split the data into lines
    const lines = data.split("\n");

    // Parse the data into the appropriate sections
    let currentSection = null;
    for (const line of lines) {
        if (line.startsWith("[") && line.endsWith("]")) {
            currentSection = line.slice(1, -1).toLowerCase();
        } else {
            const [key, value] = line.split(":");
            if (currentSection && key && value) {
                parsedData[currentSection][key.trim()] = value.trim();
            }
        }
    }

    return parsedData;
}

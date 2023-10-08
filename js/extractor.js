// Define a function to parse the provided .osu text data
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

    // Split the data into lines
    const lines = data.split("\r\n");

    // Parse the data into the appropriate sections
    let currentSection = null;
    for (const line of lines) {

        if (line.startsWith("[")) {
            currentSection = line.slice(1, -1).toLowerCase();
            console.log(`Line string= ${line}`)
            continue;
        }
        if (currentSection == "general" || currentSection == "editor" || currentSection == "metadata" || currentSection == "difficulty") {
            const keyValue = line.split(": "); // Split each line by ": " to separate key and value
            if (keyValue.length === 2) {
                const key = keyValue[0];
                const value = keyValue[1];
                parsedData[currentSection][key] = value; // Add key-value pair to the appropriate section
                console.log(`Succesfully pushed ${key} with value ${value} into ${currentSection}`);
                continue;
            }
        }
        // if (currentSection == "timingpoints") {
        //     const values = line.split(',').map(Number);
        //     const offset = values[0];
        //     const beatlength = values[1];
        //     const meter = values[2];

        //     parsedData.currentSection.push({offset, beatlength, meter});
        //     console.log(`Succesfully pushed ${offset} & ${beatlength} & ${meter} into ${currentSection}`);
        //     continue;
        // }
        // if (currentSection == "hitobjects") {
        //     const values = line.split(',').map(Number);
        //     const lane = values[0];
        //     const offset = values[2];

        //     parsedData.currentSection.push({ lane, offset });
        //     console.log(`Succesfully pushed ${lane} & ${offset} into ${currentSection}`);

        // }
    }

    return parsedData;
}

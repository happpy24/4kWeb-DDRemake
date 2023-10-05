// const fs = require('fs');
// const yaml = require('js-yaml');

// export class QuaFileExtractor {
//     constructor(filePath) {
//         this.filePath = filePath;
//     }

//     extractData() {
//         try {
//             const fileContent = fs.readFileSync(this.filePath, 'utf8');
//             const quaData = yaml.load(fileContent);

//             const extractedData = {
//                 AudioFile: quaData.AudioFile,
//                 SongPreviewTime: parseInt(quaData.SongPreviewTime),
//                 BackgroundFile: quaData.BackgroundFile,
//                 MapId: parseInt(quaData.MapId),
//                 MapSetId: parseInt(quaData.MapSetId),
//                 Mode: quaData.Mode,
//                 Title: quaData.Title,
//                 Artist: quaData.Artist,
//                 Source: quaData.Source,
//                 Tags: quaData.Tags.split(' '),
//                 Creator: quaData.Creator,
//                 DifficultyName: quaData.DifficultyName,
//                 Description: parseInt(quaData.Description),
//                 EditorLayers: quaData.EditorLayers,
//                 CustomAudioSamples: quaData.CustomAudioSamples,
//                 SoundEffects: quaData.SoundEffects,
//                 TimingPoints: quaData.TimingPoints.map(point => ({
//                     StartTime: parseInt(point.StartTime),
//                     Bpm: parseFloat(point.Bpm),
//                 })),
//                 HitObjects: quaData.HitObjects.map(obj => ({
//                     StartTime: parseInt(obj.StartTime),
//                     Lane: parseInt(obj.Lane),
//                 })),
//             };

//             return extractedData;
//         } catch (error) {
//             console.error('Error extracting data from .qua file:', error);
//             return null;
//         }
//     }
// }

// module.exports = QuaFileExtractor;
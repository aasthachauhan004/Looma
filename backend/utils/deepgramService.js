const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

async function transcribeAudio(audioPath) {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
  const audioBuffer = fs.readFileSync(audioPath);

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    audioBuffer,
    {
      model: "nova-2",
      smart_format: true,
      punctuate: true,
      paragraphs: true,
      utterances: true,
    }
  );

  if (error) throw error;

  const transcript = result.results.channels[0].alternatives[0].transcript;
  const words = result.results.channels[0].alternatives[0].words;

  return {
    text: transcript,
    words: words,
    metadata: {
      duration: result.metadata.duration,
      channels: result.metadata.channels,
    },
  };
}

module.exports = { transcribeAudio };

const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

async function generateAudio(text) {
  try {
    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    const voiceId = "21m00Tcm4TlvDq8ikWAM";

    // Generate audio using textToSpeech
    const audio = await elevenlabs.textToSpeech.convert(voiceId, {
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    });

    // Save audio to file
    const outputDir = path.join(__dirname, "../uploads");
    const outputPath = path.join(outputDir, `generated-${Date.now()}.mp3`);

    console.log("  Saving audio to:", outputPath);

    // Convert stream to buffer and save
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(outputPath, buffer);

    console.log(
      "  Audio saved successfully, size:",
      (buffer.length / 1024).toFixed(2),
      "KB"
    );

    return outputPath;
  } catch (error) {
    console.error("Error generating audio:", error);
  }
}

module.exports = {
  generateAudio,
};

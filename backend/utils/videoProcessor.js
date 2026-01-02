const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const util = require("util");

const execPromise = util.promisify(exec);

async function extractAudioFromVideo(videoPath) {
  // Generate audio path in the same directory as the video
  const audioPath = videoPath.replace(path.extname(videoPath), ".mp3");
  const command = `ffmpeg -i "${videoPath}" -vn -acodec libmp3lame -q:a 2 "${audioPath}"`;

  await execPromise(command);

  if (!fs.existsSync(audioPath)) {
    throw new Error("Audio extraction failed");
  }

  return audioPath;
}

module.exports = {
  extractAudioFromVideo,
};

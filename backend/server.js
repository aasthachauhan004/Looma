require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const { extractAudioFromVideo } = require("./utils/videoProcessor");
const { transcribeAudio } = require("./utils/deepgramService");
const { generateAudio } = require("./utils/elevenlabsService");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "video-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/avi",
      "video/quicktime",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only video files are allowed."));
    }
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.post("/api/upload-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const videoPath = req.file.path;

    // Extract audio from video
    const audioPath = await extractAudioFromVideo(videoPath);

    // Transcribe audio
    const transcription = await transcribeAudio(audioPath);

    // Generate new audio
    let generatedAudioPath;
    try {
      generatedAudioPath = await generateAudio(transcription.text);
    } catch (err) {
      console.error("Error generating audio:", err);
      generatedAudioPath = null; // fallback
    }

    res.json({
      success: true,
      videoPath: `/uploads/${req.file.filename}`,
      transcription: transcription.text,
      audioPath: generatedAudioPath ? path.basename(generatedAudioPath) : null,
      message: "Video processed successfully",
    });
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({
      error: "Failed to process video",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

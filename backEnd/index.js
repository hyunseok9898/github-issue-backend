const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ GitHub Issue 생성 라우트
app.post("/api/issues", async (req, res) => {
  const { title, body } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    // GitHub API 호출
    const response = await axios.post(
      "https://api.github.com/repos/hyunseok9898/github-issue/issues",
      { title, body },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create issue",
      details: err.response?.data || err.message,
    });
  }
});

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

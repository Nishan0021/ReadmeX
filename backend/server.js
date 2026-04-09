// ================================
// README GENERATOR — backend/server.js
// Node.js + Express + OpenAI API
// ================================

const express = require('express');
const cors    = require('cors');
const OpenAI  = require('openai');
require('dotenv').config();

const app  = express();
const port = process.env.PORT || 3001;

// ── MIDDLEWARE ──
app.use(cors({ origin: '*' }));   // Tighten in production
app.use(express.json());

// ── OPENAI CLIENT ──
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,   // Set in .env
});

// ── HEALTH CHECK ──
app.get('/', (req, res) => {
  res.json({ status: 'README Generator API is running 🚀' });
});

// ─────────────────────────────────────────────
//  POST /api/generate
//  Body: { name, github, role, bio, skills,
//          projects, linkedin, twitter,
//          portfolio, opts, theme }
// ─────────────────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const {
    name = '', github = '', role = '', bio = '',
    skills = [], projects = [],
    linkedin = '', twitter = '', portfolio = '',
    opts = {}, theme = 'professional',
  } = req.body;

  if (!name && !github) {
    return res.status(400).json({ error: 'name or github is required' });
  }

  // Build the prompt
  const prompt = buildPrompt({
    name, github, role, bio, skills,
    projects, linkedin, twitter, portfolio, opts, theme,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',             // Cheap + fast — swap to gpt-4o if needed
      messages: [
        {
          role: 'system',
          content:
            'You are a GitHub README expert. You generate professional, ' +
            'visually impressive GitHub profile README files in Markdown. ' +
            'Return ONLY the raw Markdown — no explanations, no code fences around the whole thing.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const markdown = completion.choices[0].message.content.trim();
    res.json({ markdown });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'AI generation failed', details: err.message });
  }
});

// ─────────────────────────────────────────────
//  PROMPT BUILDER
// ─────────────────────────────────────────────
function buildPrompt(data) {
  const {
    name, github, role, bio, skills, projects,
    linkedin, twitter, portfolio, opts, theme,
  } = data;

  const skillList  = skills.join(', ')   || 'Not specified';
  const projectList = projects
    .filter(p => p.name)
    .map(p => `- ${p.name}: ${p.desc || 'No description'} (${p.url || 'No URL'})`)
    .join('\n') || 'None';

  const optList = Object.entries(opts)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'none';

  return `
Generate a GitHub profile README in the "${theme}" style with the following info:

Name: ${name}
GitHub Username: ${github}
Role / Title: ${role}
Bio: ${bio}
Skills: ${skillList}
Projects:
${projectList}
LinkedIn: ${linkedin || 'N/A'}
Twitter: ${twitter || 'N/A'}
Portfolio: ${portfolio || 'N/A'}
Sections to include: ${optList}

Guidelines:
- Use shields.io badges for skills (style=for-the-badge)
- Use github-readme-stats for GitHub stats (theme=tokyonight)
- Use github-readme-streak-stats for streak
- Use github-profile-trophy for trophies
- Use proper Markdown formatting with headers, emojis, and alignment tags
- Make it look polished and professional
- Include actual GitHub username in all image URLs
- Return ONLY raw Markdown, nothing else
`.trim();
}

// ── START SERVER ──
app.listen(port, () => {
  console.log(`\n🚀 README Generator API running at http://localhost:${port}`);
  console.log(`   OpenAI Key: ${process.env.OPENAI_API_KEY ? '✅ Found' : '❌ Missing — set OPENAI_API_KEY in .env'}\n`);
});

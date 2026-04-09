// ===================== THEME =====================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isDark ? '' : '';
  document.getElementById('theme-label').textContent = isDark ? 'Dark Mode' : 'Light Mode';
}

// ===================== STEPS =====================
const STEPS = [
  { label: 'Basic Info', sub: 'Tell us about yourself' },
  { label: 'Links',      sub: 'Portfolio, blog, resume' },
  { label: 'Social',     sub: 'Social media profiles' },
  { label: 'Skills',     sub: 'Technologies you know' },
  { label: 'Preview',    sub: 'Review and generate' },
];

let currentStep = 1;

function renderStepper() {
  const el = document.getElementById('stepper');
  el.innerHTML = '';
  STEPS.forEach((s, i) => {
    const n = i + 1;
    const isDone   = n < currentStep;
    const isActive = n === currentStep;
    const item = document.createElement('div');
    item.className = 'step-item' + (isActive ? ' active' : isDone ? ' done' : '');
    item.innerHTML = `
      <div class="step-row">
        ${i > 0 ? `<div class="step-connector ${isDone || isActive ? (isDone ? 'done' : 'active') : ''}"></div>` : ''}
        <div class="step-circle">${isDone ? '✓' : n}</div>
        ${i < STEPS.length - 1 ? `<div class="step-connector ${n < currentStep ? 'done' : ''}"></div>` : ''}
      </div>
      <div class="step-label">${s.label}</div>
      <div class="step-sublabel">${s.sub}</div>
    `;
    item.onclick = () => { if (isDone || isActive) goStep(n); };
    el.appendChild(item);
  });
}

function goStep(n) {
  if (n === 2 && !validateName()) return;
  document.getElementById('step-' + currentStep).style.display = 'none';
  currentStep = n;
  document.getElementById('step-' + n).style.display = '';
  renderStepper();
  if (n === 5) generateReadme();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateName() {
  const v   = document.getElementById('f-name').value.trim();
  const err = document.getElementById('err-name');
  if (!v) { err.style.display = ''; return false; }
  err.style.display = 'none';
  return true;
}

// ===================== SOCIAL FIELDS =====================
function buildSocialFields() {
  const grid = document.getElementById('social-fields');
  grid.innerHTML = '';
  SOCIAL_PLATFORMS.forEach(p => {
    const g = document.createElement('div');
    g.className = 'form-group';
    g.innerHTML = `<label>${p.label}</label><input type="text" id="social-${p.id}" placeholder="${p.ph}"/>`;
    grid.appendChild(g);
  });
}

// ===================== SKILLS UI =====================
let selectedSkills = new Set();
let filterText = '';
let filterCat  = '';

function buildSkillsUI() {
  const sel  = document.querySelector('.skills-cat-select');
  const cats = [...new Set(SKILLS.map(s => s.cat))];
  sel.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');
  renderSkills();
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  const filtered  = SKILLS.filter(s => {
    const matchText = !filterText || s.label.toLowerCase().includes(filterText.toLowerCase());
    const matchCat  = !filterCat  || s.cat === filterCat;
    return matchText && matchCat;
  });

  const bycat = {};
  filtered.forEach(s => { (bycat[s.cat] = bycat[s.cat] || []).push(s); });

  let html = '';
  for (const cat in bycat) {
    html += `<div class="skills-section-title">${cat}</div><div class="skills-grid">`;
    bycat[cat].forEach(s => {
      html += `
        <div class="skill-chip${selectedSkills.has(s.id) ? ' selected' : ''}"
             onclick="toggleSkill('${s.id}')" title="${s.label}">
          <img src="${s.img}" alt="${s.label}"
               onerror="this.src='https://via.placeholder.com/36x36/4ade80/fff?text=${s.label[0]}'"/>
          <span>${s.label}</span>
        </div>`;
    });
    html += '</div>';
  }

  if (!html) html = '<div style="color:var(--text3);padding:20px 0;">No skills found.</div>';
  container.innerHTML = html;
  document.getElementById('skill-count').textContent = selectedSkills.size;
}

function toggleSkill(id) {
  if (selectedSkills.has(id)) selectedSkills.delete(id);
  else selectedSkills.add(id);
  renderSkills();
}

function filterSkills(v)      { filterText = v; renderSkills(); }
function filterByCategory(v)  { filterCat  = v; renderSkills(); }

// ===================== HELPERS =====================
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ===================== PREVIEW TABS =====================
function switchTab(tab) {
  document.getElementById('preview-preview').style.display  = tab === 'preview'  ? '' : 'none';
  document.getElementById('preview-markdown').style.display = tab === 'markdown' ? '' : 'none';
  document.getElementById('tab-preview').className  = 'preview-tab' + (tab === 'preview'  ? ' active' : '');
  document.getElementById('tab-markdown').className = 'preview-tab' + (tab === 'markdown' ? ' active' : '');
}

// ===================== README GENERATOR =====================
function generateReadme() {
  const name      = getVal('f-name')     || 'Your Name';
  const subtitle  = getVal('f-subtitle');
  const working   = getVal('f-working');
  const learning  = getVal('f-learning');
  const collab    = getVal('f-collab');
  const helpwith  = getVal('f-helpwith');
  const askme     = getVal('f-askme');
  const reach     = getVal('f-reach');
  const funfact   = getVal('f-funfact');
  const portfolio = getVal('f-portfolio');
  const blog      = getVal('f-blog');
  const resume    = getVal('f-resume');

  const visitorBadge  = document.getElementById('chk-visitor').checked;
  const twitterBadge  = document.getElementById('chk-twitter-badge').checked;
  const ghStats       = document.getElementById('chk-stats').checked;
  const topLangs      = document.getElementById('chk-top-langs').checked;
  const streak        = document.getElementById('chk-streak').checked;
  const trophy        = document.getElementById('chk-trophy').checked;

  const ghUser = getVal('social-github');

  // --- Build Markdown ---
  let md = `<h1 align="center">Hi 👋, I'm ${name}</h1>\n`;
  if (subtitle) md += `<h3 align="center">${subtitle}</h3>\n`;
  md += '\n';

  if (visitorBadge && ghUser)
    md += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${ghUser}&label=Profile%20views&color=0e75b6&style=flat" alt="${ghUser}" /> </p>\n\n`;

  if (trophy && ghUser)
    md += `[![trophy](https://github-profile-trophy.vercel.app/?username=${ghUser})](https://github.com/ryo-ma/github-profile-trophy)\n\n`;

  const fields = [
    working  && `- 🔭 I'm currently working on **${working}**`,
    learning && `- 🌱 I'm currently learning **${learning}**`,
    collab   && `- 👯 I'm looking to collaborate on **${collab}**`,
    helpwith && `- 🤔 I'm looking for help with **${helpwith}**`,
    askme    && `- 💬 Ask me about **${askme}**`,
    reach    && `- 📫 How to reach me **${reach}**`,
    funfact  && `- ⚡ Fun fact **${funfact}**`,
  ].filter(Boolean);

  if (fields.length) md += fields.join('\n') + '\n\n';

  if (portfolio || blog || resume) {
    md += '### 🔗 Links\n';
    if (portfolio) md += `- 🌐 [Portfolio](${portfolio})\n`;
    if (blog)      md += `- 📝 [Blog](${blog})\n`;
    if (resume)    md += `- 📄 [Resume/CV](${resume})\n`;
    md += '\n';
  }

  const socials = SOCIAL_PLATFORMS.map(p => {
    const v = getVal('social-' + p.id);
    return v ? { ...p, val: v } : null;
  }).filter(Boolean);

  if (socials.length) {
    md += '<h3 align="left">Connect with me:</h3>\n<p align="left">\n';
    socials.forEach(p => {
      const url = p.url.replace('{u}', p.val);
      md += `<a href="${url}" target="blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/${p.id}.svg" alt="${p.label}" height="30" width="40" /></a>\n`;
    });
    md += '</p>\n\n';

    if (twitterBadge && getVal('social-twitter')) {
      const tw = getVal('social-twitter');
      md += `[![Twitter Follow](https://img.shields.io/twitter/follow/${tw}?logo=twitter&style=for-the-badge)](https://twitter.com/${tw})\n\n`;
    }
  }

  const skillObjs = SKILLS.filter(s => selectedSkills.has(s.id));
  if (skillObjs.length) {
    md += '<h3 align="left">Languages and Tools:</h3>\n<p align="left">\n';
    skillObjs.forEach(s => {
      md += `<a href="#" target="_blank" rel="noreferrer"><img src="${s.img}" alt="${s.label}" width="40" height="40"/></a>\n`;
    });
    md += '</p>\n\n';
  }

  if (ghUser) {
    if (ghStats)  md += `<p><img align="left" src="https://github-readme-stats.vercel.app/api?username=${ghUser}&show_icons=true&locale=en" alt="${ghUser}" /></p>\n\n`;
    if (topLangs) md += `<p><img align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=${ghUser}&show_icons=true&locale=en&layout=compact" alt="${ghUser}" /></p>\n\n`;
    if (streak)   md += `<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${ghUser}&" alt="${ghUser}" /></p>\n\n`;
  }

  // --- Render preview pane ---
  const preview = document.getElementById('preview-preview');
  if (!name && !subtitle && !fields.length) {
    preview.innerHTML = `
      <div class="empty-preview">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Fill in the form to see your README preview here.
      </div>`;
  } else {
    preview.innerHTML = renderMarkdownPreview(
      name, subtitle, fields, socials, skillObjs,
      portfolio, blog, resume,
      ghUser, visitorBadge, ghStats, topLangs, streak, trophy
    );
  }

  document.getElementById('preview-markdown').textContent = md;
  window._generatedMd = md;
}

function renderMarkdownPreview(
  name, subtitle, fields, socials, skillObjs,
  portfolio, blog, resume,
  ghUser, visitorBadge, ghStats, topLangs, streak, trophy
) {
  let html = `<div style="text-align:center"><h1>Hi 👋, I'm ${name}</h1>`;
  if (subtitle) html += `<h3>${subtitle}</h3>`;
  if (visitorBadge && ghUser)
    html += `<br><img src="https://komarev.com/ghpvc/?username=${ghUser}&label=Profile+views&color=0e75b6&style=flat" alt="views"/>`;
  html += '</div><br>';

  if (fields.length) {
    html += '<ul>' +
      fields.map(f =>
        `<li style="margin:4px 0">${
          f.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^- /, '')
        }</li>`
      ).join('') +
      '</ul><br>';
  }

  if (portfolio || blog || resume) {
    html += '<h3>🔗 Links</h3><ul>';
    if (portfolio) html += `<li>🌐 <a href="${portfolio}">Portfolio</a></li>`;
    if (blog)      html += `<li>📝 <a href="${blog}">Blog</a></li>`;
    if (resume)    html += `<li>📄 <a href="${resume}">Resume/CV</a></li>`;
    html += '</ul><br>';
  }

  if (socials.length) {
    html += '<h3>Connect with me</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">';
    socials.forEach(p => {
      const url = p.url.replace('{u}', p.val);
      html += `<a href="${url}" style="background:var(--surface2);border-radius:6px;padding:5px 10px;font-size:0.78rem;font-weight:600;color:var(--text);text-decoration:none;">${p.label}</a>`;
    });
    html += '</div>';
  }

  if (skillObjs.length) {
    html += '<h3>Languages & Tools</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">';
    skillObjs.forEach(s => {
      html += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;border-radius:8px;background:var(--surface2);min-width:56px">
          <img src="${s.img}" width="28" height="28" alt="${s.label}" onerror="this.style.display='none'"/>
          <span style="font-size:0.65rem;color:var(--text2)">${s.label}</span>
        </div>`;
    });
    html += '</div>';
  }

  if (ghUser) {
    if (ghStats)  html += `<br><img src="https://github-readme-stats.vercel.app/api?username=${ghUser}&show_icons=true" alt="stats"/>`;
    if (topLangs) html += `<br><img src="https://github-readme-stats.vercel.app/api/top-langs?username=${ghUser}&layout=compact" alt="top langs"/>`;
    if (streak)   html += `<br><img src="https://github-readme-streak-stats.herokuapp.com/?user=${ghUser}" alt="streak"/>`;
    if (trophy)   html += `<br><img src="https://github-profile-trophy.vercel.app/?username=${ghUser}" alt="trophy"/>`;
  }

  return html;
}

// ===================== COPY / EXPORT =====================
function copyMarkdown() {
  if (!window._generatedMd) return;
  navigator.clipboard.writeText(window._generatedMd).then(() => {
    const btn  = event.target;
    const orig = btn.textContent;
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = orig, 1800);
  });
}

function exportReadme() {
  if (!window._generatedMd) return;
  const blob = new Blob([window._generatedMd], { type: 'text/markdown' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'README.md';
  a.click();
}

// ===================== SAMPLE / CLEAR =====================
function clearStep1() {
  ['f-name','f-subtitle','f-working','f-learning','f-collab','f-helpwith','f-askme','f-reach','f-funfact']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function loadSample() {
  document.getElementById('f-name').value     = 'Nishan';
  document.getElementById('f-subtitle').value = 'Full Stack Developer | Open Source Enthusiast';
  document.getElementById('f-working').value  = 'a MERN Stack e-commerce platform';
  document.getElementById('f-learning').value = 'GraphQL, TypeScript and System Design';
  document.getElementById('f-collab').value   = 'open source projects and innovative ideas';
  document.getElementById('f-askme').value    = 'React, Node.js, and web development';
  document.getElementById('f-reach').value    = '@example.com';
  document.getElementById('f-funfact').value  = "I debug with console.log and I'm proud of it!";
}

function autoFill() {
  const username = document.getElementById('github-autofill').value.trim();
  if (!username) return;
  document.getElementById('f-name').value = username;
  document.getElementById('social-github').value = username;
  ['javascript', 'react', 'nodejs'].forEach(id => selectedSkills.add(id));
  alert('Auto-filled with GitHub username! Edit as needed.');
}

// ===================== INIT =====================
renderStepper();
buildSocialFields();
buildSkillsUI();

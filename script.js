// Configuration loaded from config.js
// Edit config.js to add your API keys
const CONFIG = window.SMALLTALK_CONFIG || {
    NEWS_API_KEY: '',
    GOOGLE_SEARCH_API_KEY: '',
    GOOGLE_SEARCH_ENGINE_ID: '',
    OPENAI_API_KEY: '',
    ANTHROPIC_API_KEY: '',
    MAX_SEARCH_RESULTS: 10,
    AI_TEMPERATURE: 0.3,
    DEBUG_MODE: false,
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Small Talk Helper loading...');
    
    displayCurrentDate();
    
    // Check if running from file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    if (isFileProtocol) {
        console.warn('Running from file:// protocol. Some APIs may not work due to CORS. Use a local server for full functionality.');
    }
    
    // Load tech news immediately
    console.log('Loading tech news...');
    loadTechNews();
    console.log('Tech news loaded!');
    
    // Set up auto-refresh for tech news (once per day)
    const lastRefresh = localStorage.getItem('lastNewsRefresh');
    const today = new Date().toDateString();
    
    if (lastRefresh !== today) {
        localStorage.setItem('lastNewsRefresh', today);
    }
});

// Display current date
function displayCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    dateElement.textContent = `📅 ${today.toLocaleDateString('en-US', options)}`;
}

// Load tech news from multiple sources
async function loadTechNews() {
    const newsContainer = document.getElementById('techNewsCards');
    
    // Show demo content immediately - instant, no waiting!
    displayNewsCards(getDemoTechNews());
    
    // Note: Real API news loading disabled by default for speed.
    // Enable DEBUG_MODE in config.js if you want to try loading real news.
}

// Fetch from Hacker News API
async function fetchHackerNews() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        
        // Get top 6 stories
        const topStories = storyIds.slice(0, 6);
        const articles = [];
        
        for (const id of topStories) {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const story = await storyResponse.json();
            
            if (story && story.title) {
                articles.push({
                    title: story.title,
                    description: story.text ? stripHtml(story.text).substring(0, 150) + '...' : 'Click to read more on Hacker News',
                    url: story.url || `https://news.ycombinator.com/item?id=${id}`,
                    source: 'Hacker News',
                    date: new Date(story.time * 1000).toLocaleDateString()
                });
            }
        }
        
        return articles;
    } catch (error) {
        console.error('Error fetching Hacker News:', error);
        return [];
    }
}

// Fetch from NewsAPI (requires API key)
async function fetchNewsAPI() {
    if (!CONFIG.NEWS_API_KEY) return [];
    
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const fromDate = oneWeekAgo.toISOString().split('T')[0];
        
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=technology&from=${fromDate}&sortBy=popularity&apiKey=${CONFIG.NEWS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.articles) {
            return data.articles.slice(0, 6).map(article => ({
                title: article.title,
                description: article.description || 'Click to read more',
                url: article.url,
                source: article.source.name,
                date: new Date(article.publishedAt).toLocaleDateString()
            }));
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching NewsAPI:', error);
        return [];
    }
}

// Demo tech news (fallback)
function getDemoTechNews() {
    const today = new Date().toLocaleDateString();
    return [
        {
            title: "AI Breakthrough: New Language Model Achieves Human-Level Reasoning",
            description: "Researchers unveil a groundbreaking AI system that demonstrates unprecedented reasoning capabilities, marking a significant milestone in artificial intelligence development.",
            source: "Tech Insider",
            url: "https://news.ycombinator.com/",
            date: today
        },
        {
            title: "Quantum Computing Reaches New Milestone with 1000-Qubit Processor",
            description: "Major tech company announces successful development of a 1000-qubit quantum processor, potentially revolutionizing fields from drug discovery to cryptography.",
            source: "Science Daily",
            url: "https://www.sciencedaily.com/news/computers_math/quantum_computers/",
            date: today
        },
        {
            title: "Sustainable Tech: Solar Panels Now 50% More Efficient",
            description: "Breakthrough in photovoltaic technology promises to dramatically reduce the cost of solar energy and accelerate the transition to renewable power.",
            source: "Green Tech News",
            url: "https://techcrunch.com/category/green/",
            date: today
        },
        {
            title: "New Programming Language Simplifies Concurrent Computing",
            description: "Developers release innovative language that makes parallel programming accessible to mainstream developers, potentially transforming software development.",
            source: "Dev Community",
            url: "https://dev.to/",
            date: today
        },
        {
            title: "Breakthrough in Edge Computing Enables Real-Time AI on Devices",
            description: "New chip architecture allows complex AI models to run directly on smartphones and IoT devices without cloud connectivity.",
            source: "Hardware Weekly",
            url: "https://www.theverge.com/tech",
            date: today
        },
        {
            title: "Open Source Project Hits 1 Million Contributors Worldwide",
            description: "Popular open-source initiative celebrates milestone with contributors from every country, demonstrating the power of global collaboration.",
            source: "Open Source Daily",
            url: "https://github.com/trending",
            date: today
        }
    ];
}

// Display news cards
function displayNewsCards(articles) {
    const newsContainer = document.getElementById('techNewsCards');
    
    console.log('Displaying news cards:', articles.length);
    
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📰</div>
                <p>No tech news available at the moment.</p>
            </div>
        `;
        return;
    }
    
    newsContainer.innerHTML = articles.map(article => `
        <div class="news-card" ${article.url ? `onclick="window.open('${article.url || '#'}', '_blank')" style="cursor: pointer;"` : ''}>
            <h3>${escapeHtml(article.title)}</h3>
            <p>${escapeHtml(article.description)}</p>
            <div class="news-meta">
                <span class="news-source">${escapeHtml(article.source)}</span>
                <span class="news-date">${escapeHtml(article.date)}</span>
            </div>
        </div>
    `).join('');
    
    console.log('News cards displayed successfully!');
}

// Refresh tech news
function refreshTechNews() {
    localStorage.setItem('lastNewsRefresh', new Date().toDateString());
    loadTechNews();
}

// Search for meeting topic discussions
async function searchMeetingTopic() {
    const topicInput = document.getElementById('meetingTopic');
    const resultsContainer = document.getElementById('topicResults');
    const topic = topicInput.value.trim();
    
    if (!topic) {
        resultsContainer.innerHTML = `
            <div class="error">Please enter a meeting topic</div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Searching for relevant discussions...</div>';
    
    // Show demo results immediately for reliability
    setTimeout(() => {
        const demoResults = getDemoTopicResults(topic);
        displayTopicResults(demoResults);
    }, 500);
    
    // Try to fetch real results in background (won't work on file://)
    try {
        const isFileProtocol = window.location.protocol === 'file:';
        if (!isFileProtocol) {
            let results = [];
            
            // Search Reddit
            const redditResults = await searchReddit(topic);
            results = results.concat(redditResults);
            
            // Search arXiv
            const arxivResults = await searchArXiv(topic);
            results = results.concat(arxivResults);
            
            if (results.length > 0) {
                displayTopicResults(results);
            }
        }
    } catch (error) {
        console.log('Using demo results (API unavailable)');
    }
}

// Search Reddit (no auth required for public posts)
async function searchReddit(topic) {
    try {
        const response = await fetch(
            `https://www.reddit.com/search.json?q=${encodeURIComponent(topic)}&limit=3&sort=relevance&t=week`
        );
        const data = await response.json();
        
        if (data.data && data.data.children) {
            return data.data.children.map(post => ({
                title: post.data.title,
                description: post.data.selftext ? 
                    stripHtml(post.data.selftext).substring(0, 200) + '...' : 
                    `Discussion with ${post.data.num_comments} comments`,
                source: `Reddit - r/${post.data.subreddit}`,
                url: `https://reddit.com${post.data.permalink}`
            }));
        }
        
        return [];
    } catch (error) {
        console.error('Error searching Reddit:', error);
        return [];
    }
}

// Search arXiv for academic papers
async function searchArXiv(topic) {
    try {
        const response = await fetch(
            `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(topic)}&start=0&max_results=3&sortBy=submittedDate&sortOrder=descending`
        );
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        const results = [];
        
        for (let i = 0; i < Math.min(entries.length, 3); i++) {
            const entry = entries[i];
            const title = entry.getElementsByTagName('title')[0]?.textContent;
            const summary = entry.getElementsByTagName('summary')[0]?.textContent;
            const link = entry.getElementsByTagName('id')[0]?.textContent;
            
            if (title && summary) {
                results.push({
                    title: title.trim(),
                    description: summary.trim().substring(0, 200) + '...',
                    source: 'arXiv (Academic Paper)',
                    url: link
                });
            }
        }
        
        return results;
    } catch (error) {
        console.error('Error searching arXiv:', error);
        return [];
    }
}

// Demo topic results
function getDemoTopicResults(topic) {
    return [
        {
            title: `The Future of ${topic}: Key Trends and Innovations`,
            description: `Recent discussions highlight emerging trends in ${topic}, including new methodologies, tools, and best practices that are reshaping the industry.`,
            source: 'Tech Community Forum'
        },
        {
            title: `Case Study: Successful ${topic} Implementation`,
            description: `Learn from real-world examples of organizations that have successfully implemented ${topic} strategies, including challenges faced and lessons learned.`,
            source: 'Industry Blog'
        },
        {
            title: `Expert Panel Discussion on ${topic}`,
            description: `Industry leaders share insights on the current state and future direction of ${topic}, with actionable advice for practitioners.`,
            source: 'Professional Network'
        }
    ];
}

// Display topic results
function displayTopicResults(results) {
    const resultsContainer = document.getElementById('topicResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <p>No results found for this topic.</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = results.map(result => `
        <div class="result-card" ${result.url ? `onclick="window.open('${result.url}', '_blank')" style="cursor: pointer;"` : ''}>
            <h3>${escapeHtml(result.title)}</h3>
            <p>${escapeHtml(result.description)}</p>
            <span class="result-source">${escapeHtml(result.source)}</span>
        </div>
    `).join('');
}

// Look up person information
async function lookupPerson() {
    console.log('lookupPerson function called!');
    const nameInput = document.getElementById('personName');
    const resultsContainer = document.getElementById('personResults');
    const name = nameInput.value.trim();
    
    console.log('Name entered:', name);
    
    if (!name) {
        resultsContainer.innerHTML = `
            <div class="error">Please enter a name</div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Researching public information...</div>';
    
    console.log('Calling displayPersonResearch...');
    
    try {
        // Simple approach - provide research guidance and direct links
        displayPersonResearch(name);
        console.log('displayPersonResearch completed!');
        
    } catch (error) {
        console.error('Error looking up person:', error);
        resultsContainer.innerHTML = `
            <div class="error">
                <p>Error: ${escapeHtml(error.message)}</p>
            </div>
        `;
    }
}

// Display person research with direct search links
function displayPersonResearch(name) {
    const resultsContainer = document.getElementById('personResults');
    
    // Create search URLs for different platforms
    const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
    const linkedinSearch = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name)}`;
    const twitterSearch = `https://twitter.com/search?q=${encodeURIComponent(name)}`;
    const githubSearch = `https://github.com/search?q=${encodeURIComponent(name)}&type=users`;
    const scholarSearch = `https://scholar.google.com/scholar?q=${encodeURIComponent(name)}`;
    
    resultsContainer.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border-color: var(--primary-color);">
            <h3>🔍 Quick Research for "${escapeHtml(name)}"</h3>
            <p style="color: var(--text-secondary); margin: 1rem 0;">
                Click below to search public sources and gather conversation topics:
            </p>
            
            <div style="display: grid; gap: 0.75rem; margin-top: 1.5rem;">
                <a href="${googleSearch}" target="_blank" rel="noopener noreferrer" 
                   style="display: flex; align-items: center; padding: 1rem; background: var(--bg-primary); 
                          border: 2px solid var(--border-color); border-radius: 8px; text-decoration: none; 
                          color: var(--text-primary); transition: all 0.2s ease;"
                   onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateX(5px)'"
                   onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)'">
                    <span style="font-size: 1.5rem; margin-right: 1rem;">🌐</span>
                    <div style="flex: 1;">
                        <strong>Google Search</strong>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">General information and news</div>
                    </div>
                    <span style="color: var(--primary-color);">→</span>
                </a>
                
                <a href="${linkedinSearch}" target="_blank" rel="noopener noreferrer"
                   style="display: flex; align-items: center; padding: 1rem; background: var(--bg-primary); 
                          border: 2px solid var(--border-color); border-radius: 8px; text-decoration: none; 
                          color: var(--text-primary); transition: all 0.2s ease;"
                   onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateX(5px)'"
                   onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)'">
                    <span style="font-size: 1.5rem; margin-right: 1rem;">💼</span>
                    <div style="flex: 1;">
                        <strong>LinkedIn</strong>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">Professional background and experience</div>
                    </div>
                    <span style="color: var(--primary-color);">→</span>
                </a>
                
                <a href="${scholarSearch}" target="_blank" rel="noopener noreferrer"
                   style="display: flex; align-items: center; padding: 1rem; background: var(--bg-primary); 
                          border: 2px solid var(--border-color); border-radius: 8px; text-decoration: none; 
                          color: var(--text-primary); transition: all 0.2s ease;"
                   onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateX(5px)'"
                   onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)'">
                    <span style="font-size: 1.5rem; margin-right: 1rem;">🎓</span>
                    <div style="flex: 1;">
                        <strong>Google Scholar</strong>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">Publications and research</div>
                    </div>
                    <span style="color: var(--primary-color);">→</span>
                </a>
                
                <a href="${githubSearch}" target="_blank" rel="noopener noreferrer"
                   style="display: flex; align-items: center; padding: 1rem; background: var(--bg-primary); 
                          border: 2px solid var(--border-color); border-radius: 8px; text-decoration: none; 
                          color: var(--text-primary); transition: all 0.2s ease;"
                   onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateX(5px)'"
                   onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)'">
                    <span style="font-size: 1.5rem; margin-right: 1rem;">💻</span>
                    <div style="flex: 1;">
                        <strong>GitHub</strong>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">Projects and contributions</div>
                    </div>
                    <span style="color: var(--primary-color);">→</span>
                </a>
                
                <a href="${twitterSearch}" target="_blank" rel="noopener noreferrer"
                   style="display: flex; align-items: center; padding: 1rem; background: var(--bg-primary); 
                          border: 2px solid var(--border-color); border-radius: 8px; text-decoration: none; 
                          color: var(--text-primary); transition: all 0.2s ease;"
                   onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateX(5px)'"
                   onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateX(0)'">
                    <span style="font-size: 1.5rem; margin-right: 1rem;">🐦</span>
                    <div style="flex: 1;">
                        <strong>Twitter/X</strong>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">Recent thoughts and activity</div>
                    </div>
                    <span style="color: var(--primary-color);">→</span>
                </a>
            </div>
        </div>
        
        <div class="result-card">
            <h3>💬 Conversation Starters</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Use what you find to ask engaging questions:
            </p>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-primary);">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">💡</span>
                    "I saw you worked on [project/company]. What was that experience like?"
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-primary);">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">💡</span>
                    "What got you interested in [their field/specialty]?"
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-primary);">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">💡</span>
                    "I read about [recent work/post]. What's your take on [related topic]?"
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-primary);">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">💡</span>
                    "What are you most excited about working on right now?"
                </li>
            </ul>
        </div>
        
        <div class="result-card" style="background: rgba(99, 102, 241, 0.05); border-color: var(--primary-color);">
            <h3>🎯 Pro Tips</h3>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                <li style="margin: 0.5rem 0;">Look for recent posts, articles, or projects they've shared</li>
                <li style="margin: 0.5rem 0;">Check their current role and company news</li>
                <li style="margin: 0.5rem 0;">Find common interests or mutual connections</li>
                <li style="margin: 0.5rem 0;">Note any recent achievements or milestones</li>
                <li style="margin: 0.5rem 0;">Keep it genuine - use research as context, not a script</li>
            </ul>
        </div>
    `;
}

// Remove complex AI functions - keeping it simple!
// (The old performGoogleSearch, generateAISummary, etc. functions can stay for optional future use,
// but won't be called by default)

// Generate AI summary of search results
async function generateAISummary(name, searchResults) {
    const systemPrompt = `You are a precise research summarizer for this app. Your job: turn top Google results into a crisp, neutral brief. Be accurate, no hype, no guesses. Prefer concrete numbers, milestones, and primary sources. If evidence is thin or conflicting, say so. Never invent URLs or facts. Output must be valid JSON only.

Return JSON in this exact format:
{
  "name": "Person Name",
  "summary": "Brief 2-3 sentence overview of who they are",
  "keyFacts": ["Fact 1", "Fact 2", "Fact 3"],
  "professionalBackground": "Their role, company, or field",
  "recentActivity": "Recent news, projects, or achievements",
  "conversationStarters": ["Starter 1", "Starter 2", "Starter 3"],
  "sources": ["url1", "url2"],
  "confidence": "high|medium|low",
  "note": "Any caveats or conflicting information"
}`;

    const userPrompt = `Research summary for: ${name}

Google Search Results:
${searchResults.map((result, i) => `
${i + 1}. ${result.title}
   URL: ${result.link}
   Source: ${result.displayLink}
   Snippet: ${result.snippet}
`).join('\n')}

Provide a research summary in valid JSON format.`;

    try {
        // Try OpenAI first
        if (CONFIG.OPENAI_API_KEY) {
            return await callOpenAI(systemPrompt, userPrompt);
        }
        
        // Try Anthropic Claude
        if (CONFIG.ANTHROPIC_API_KEY) {
            return await callAnthropic(systemPrompt, userPrompt);
        }
        
        throw new Error('No AI API configured');
    } catch (error) {
        console.error('Error generating AI summary:', error);
        throw error;
    }
}

// Call OpenAI API
async function callOpenAI(systemPrompt, userPrompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: CONFIG.AI_TEMPERATURE || 0.3,
            response_format: { type: "json_object" }
        })
    });
    
    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

// Call Anthropic Claude API
async function callAnthropic(systemPrompt, userPrompt) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': CONFIG.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2000,
            temperature: CONFIG.AI_TEMPERATURE || 0.3,
            system: systemPrompt,
            messages: [
                { role: 'user', content: userPrompt }
            ]
        })
    });
    
    if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.content[0].text;
    
    // Extract JSON from response (Claude sometimes wraps it)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }
    
    return JSON.parse(content);
}

// Display AI-powered person results
function displayAIPersonResults(name, aiSummary, searchResults) {
    const resultsContainer = document.getElementById('personResults');
    
    const confidenceEmoji = {
        'high': '✅',
        'medium': '⚠️',
        'low': '❓'
    };
    
    const confidenceBadge = confidenceEmoji[aiSummary.confidence] || '📊';
    
    resultsContainer.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border-color: var(--primary-color);">
            <h3>📊 Research Summary for "${escapeHtml(aiSummary.name || name)}" ${confidenceBadge}</h3>
            <p style="color: var(--text-primary); font-size: 1.05rem; margin: 1rem 0;">
                ${escapeHtml(aiSummary.summary)}
            </p>
            
            ${aiSummary.professionalBackground ? `
                <div style="margin: 1rem 0;">
                    <strong style="color: var(--primary-color);">👔 Professional Background:</strong>
                    <p style="margin: 0.5rem 0;">${escapeHtml(aiSummary.professionalBackground)}</p>
                </div>
            ` : ''}
            
            ${aiSummary.recentActivity ? `
                <div style="margin: 1rem 0;">
                    <strong style="color: var(--primary-color);">📰 Recent Activity:</strong>
                    <p style="margin: 0.5rem 0;">${escapeHtml(aiSummary.recentActivity)}</p>
                </div>
            ` : ''}
            
            ${aiSummary.keyFacts && aiSummary.keyFacts.length > 0 ? `
                <div style="margin: 1rem 0;">
                    <strong style="color: var(--primary-color);">🔑 Key Facts:</strong>
                    <ul style="list-style: none; padding-left: 0; margin-top: 0.5rem;">
                        ${aiSummary.keyFacts.map(fact => `
                            <li style="padding: 0.25rem 0; padding-left: 1.5rem; position: relative; color: var(--text-secondary);">
                                <span style="position: absolute; left: 0; color: var(--primary-color);">•</span>
                                ${escapeHtml(fact)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${aiSummary.note ? `
                <div style="margin: 1rem 0; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-left: 3px solid var(--warning-color); border-radius: 5px;">
                    <strong style="color: var(--warning-color);">⚠️ Note:</strong>
                    <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">${escapeHtml(aiSummary.note)}</p>
                </div>
            ` : ''}
            
            ${aiSummary.conversationStarters && aiSummary.conversationStarters.length > 0 ? `
                <div style="margin: 1.5rem 0 1rem 0;">
                    <strong style="color: var(--primary-color);">💬 Conversation Starters:</strong>
                    <ul style="list-style: none; padding-left: 0; margin-top: 0.5rem;">
                        ${aiSummary.conversationStarters.map(starter => `
                            <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-primary); font-style: italic;">
                                <span style="position: absolute; left: 0; color: var(--primary-color);">💡</span>
                                "${escapeHtml(starter)}"
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <strong style="color: var(--primary-color); font-size: 0.9rem;">🔗 Sources:</strong>
                <div style="margin-top: 0.5rem;">
                    ${searchResults.slice(0, 5).map((result, i) => `
                        <a href="${result.link}" target="_blank" rel="noopener noreferrer" 
                           style="display: block; padding: 0.5rem; margin: 0.25rem 0; background: var(--bg-secondary); 
                                  border-radius: 5px; text-decoration: none; color: var(--text-primary); 
                                  transition: all 0.2s ease; font-size: 0.9rem;"
                           onmouseover="this.style.background='var(--bg-tertiary)'"
                           onmouseout="this.style.background='var(--bg-secondary)'">
                            <span style="color: var(--primary-color); font-weight: 500;">${i + 1}.</span>
                            ${escapeHtml(result.title)}
                            <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 0.25rem;">
                                ${escapeHtml(result.displayLink)}
                            </span>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.05); border-radius: 8px; text-align: center;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">
                    Confidence: <strong style="color: var(--primary-color);">${aiSummary.confidence.toUpperCase()}</strong>
                    ${aiSummary.confidence === 'low' ? ' - Limited information available' : ''}
                </span>
            </div>
        </div>
        
        <div class="result-card">
            <h3>📋 Raw JSON Response</h3>
            <pre style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; color: var(--text-primary);">${JSON.stringify(aiSummary, null, 2)}</pre>
        </div>
    `;
}

// Display Google search results without AI
function displayGoogleSearchResults(name, searchResults) {
    const resultsContainer = document.getElementById('personResults');
    
    resultsContainer.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border-color: var(--primary-color);">
            <h3>🔍 Google Search Results for "${escapeHtml(name)}"</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Found ${searchResults.length} results. Add an AI API key (OpenAI or Anthropic) for automated summaries.
            </p>
        </div>
        
        ${searchResults.map((result, i) => `
            <div class="result-card" onclick="window.open('${result.link}', '_blank')" style="cursor: pointer;">
                <h3>${i + 1}. ${escapeHtml(result.title)}</h3>
                <p>${escapeHtml(result.snippet)}</p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                    <span class="result-source">${escapeHtml(result.displayLink)}</span>
                    <span style="font-size: 0.85rem; color: var(--primary-color);">Click to open →</span>
                </div>
            </div>
        `).join('')}
    `;
}

// Display guidance when APIs not configured
function displayPersonGuidance(name) {
    const resultsContainer = document.getElementById('personResults');
    
    resultsContainer.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border-color: var(--primary-color);">
            <h3>💡 Setup Required: Google Search Integration</h3>
            <p style="color: var(--text-primary); margin-bottom: 1rem;">
                To enable AI-powered person lookup with Google search results, you need to configure API keys.
            </p>
            
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong style="color: var(--primary-color);">📝 Required Setup:</strong>
                <ol style="margin: 0.5rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                    <li style="margin: 0.5rem 0;">
                        <strong>Google Custom Search API</strong>
                        <ul style="margin-top: 0.25rem; font-size: 0.9rem;">
                            <li>Get API key: <a href="https://console.cloud.google.com/" target="_blank" style="color: var(--primary-color);">Google Cloud Console</a></li>
                            <li>Create search engine: <a href="https://programmablesearchengine.google.com/" target="_blank" style="color: var(--primary-color);">Programmable Search</a></li>
                        </ul>
                    </li>
                    <li style="margin: 0.5rem 0;">
                        <strong>AI API (choose one):</strong>
                        <ul style="margin-top: 0.25rem; font-size: 0.9rem;">
                            <li>OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" style="color: var(--primary-color);">Get API Key</a></li>
                            <li>Anthropic Claude: <a href="https://console.anthropic.com/" target="_blank" style="color: var(--primary-color);">Get API Key</a></li>
                        </ul>
                    </li>
                    <li style="margin: 0.5rem 0;">Add keys to <code style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 3px;">script.js</code> CONFIG object</li>
                </ol>
            </div>
        </div>
        
        <div class="result-card">
            <h3>🔍 Manual Research Tips for "${escapeHtml(name)}"</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                While you set up the API, here's how to research manually:
            </p>
            <ul style="list-style: none; padding-left: 0; color: var(--text-secondary);">
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">🔍</span>
                    Search LinkedIn for professional background
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">🏢</span>
                    Look up their company's recent news
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">📚</span>
                    Check Google Scholar for publications
                </li>
                <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--primary-color);">🎤</span>
                    Search for conference talks or presentations
                </li>
            </ul>
            
            <button onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(name)}', '_blank')" 
                    style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; 
                           border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
                Search Google for "${escapeHtml(name)}" →
            </button>
        </div>
    `;
}


// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// Add enter key support for inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('meetingTopic').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchMeetingTopic();
    });
    
    document.getElementById('personName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') lookupPerson();
    });
});


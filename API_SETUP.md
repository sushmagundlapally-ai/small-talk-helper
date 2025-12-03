# API Setup Guide 🔑

## Overview

SmallTalk works great out-of-the-box with free APIs, but you can unlock powerful AI-powered person research by adding a few API keys.

### What Works Without Setup ✅
- Daily tech news (Hacker News API)
- Reddit discussions
- arXiv academic papers
- Conversation tips

### What Requires Setup 🔧
- **AI-Powered Name Lookup** - Google search + AI summarization
  - Requires: Google Custom Search API + OpenAI or Anthropic API

---

## Setup Options

### Option 1: Basic (Free, No Setup)
Use the app as-is with demo content for name lookup.

**Cost:** $0/month  
**Setup time:** 0 minutes

---

### Option 2: Enhanced with Google Search
Add real Google search results without AI summaries.

**Required APIs:**
- Google Custom Search API

**Cost:** Free (100 searches/day)  
**Setup time:** 10 minutes

---

### Option 3: Full AI-Powered (Recommended)
Get AI-generated summaries with conversation starters.

**Required APIs:**
- Google Custom Search API
- OpenAI API or Anthropic API

**Cost:** ~$1-5/month (depending on usage)  
**Setup time:** 15 minutes

---

## Step-by-Step Setup

### 1. Google Custom Search API

#### Step 1.1: Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Custom Search API"
   - Search for "Custom Search API" in the API Library
   - Click "Enable"
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

**Free Tier:** 100 searches/day

#### Step 1.2: Create Search Engine
1. Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Add" to create a new search engine
3. Configure:
   - **Sites to search:** Select "Search the entire web"
   - **Name:** "SmallTalk Person Search"
4. Click "Create"
5. Copy your **Search engine ID** (cx parameter)

#### Step 1.3: Configure Search Engine
1. In your search engine settings
2. Enable "Search the entire web"
3. Turn on "Image search" (optional)
4. Save

---

### 2. OpenAI API (Option A - Recommended)

#### Step 2.1: Get API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Name it "SmallTalk App"
5. Copy and save your API key securely

**Pricing:**
- GPT-4o-mini: ~$0.15 per 1M input tokens
- ~$0.001-0.003 per search/summary
- Estimated: $1-3/month for regular use

#### Why OpenAI?
- Fast responses
- Great at JSON formatting
- Reliable summarization
- Good pricing

---

### 3. Anthropic Claude API (Option B - Alternative)

#### Step 3.1: Get API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Click "Create Key"
5. Copy and save your API key securely

**Pricing:**
- Claude 3.5 Sonnet: ~$3 per 1M input tokens
- ~$0.003-0.006 per search/summary
- Estimated: $2-5/month for regular use

#### Why Anthropic?
- Very accurate summaries
- Great at following instructions
- Strong reasoning
- Privacy-focused company

---

### 4. Configure the App

#### Step 4.1: Edit script.js
Open `/Users/sushma.gundlapally/Documents/small-talk-helper/script.js`

#### Step 4.2: Find the CONFIG section (lines 1-10)

```javascript
const CONFIG = {
    NEWS_API_KEY: '', // Optional: for more news sources
    REDDIT_CLIENT_ID: '', // Optional: not needed
    REDDIT_CLIENT_SECRET: '', // Optional: not needed
    GOOGLE_SEARCH_API_KEY: '', // 👈 ADD HERE
    GOOGLE_SEARCH_ENGINE_ID: '', // 👈 ADD HERE
    OPENAI_API_KEY: '', // 👈 ADD HERE (Option A)
    ANTHROPIC_API_KEY: '', // 👈 OR ADD HERE (Option B)
};
```

#### Step 4.3: Add Your Keys

**Minimum Configuration (Google Search only):**
```javascript
const CONFIG = {
    NEWS_API_KEY: '',
    REDDIT_CLIENT_ID: '',
    REDDIT_CLIENT_SECRET: '',
    GOOGLE_SEARCH_API_KEY: 'AIzaSyC...your-key-here',
    GOOGLE_SEARCH_ENGINE_ID: 'a1b2c3d4e5f...',
    OPENAI_API_KEY: '',
    ANTHROPIC_API_KEY: '',
};
```

**Full Configuration with OpenAI:**
```javascript
const CONFIG = {
    NEWS_API_KEY: '',
    REDDIT_CLIENT_ID: '',
    REDDIT_CLIENT_SECRET: '',
    GOOGLE_SEARCH_API_KEY: 'AIzaSyC...your-google-key',
    GOOGLE_SEARCH_ENGINE_ID: 'a1b2c3d4e5f...',
    OPENAI_API_KEY: 'sk-proj-...your-openai-key',
    ANTHROPIC_API_KEY: '',
};
```

**Full Configuration with Anthropic:**
```javascript
const CONFIG = {
    NEWS_API_KEY: '',
    REDDIT_CLIENT_ID: '',
    REDDIT_CLIENT_SECRET: '',
    GOOGLE_SEARCH_API_KEY: 'AIzaSyC...your-google-key',
    GOOGLE_SEARCH_ENGINE_ID: 'a1b2c3d4e5f...',
    OPENAI_API_KEY: '',
    ANTHROPIC_API_KEY: 'sk-ant-...your-anthropic-key',
};
```

#### Step 4.4: Save the File

---

## Testing Your Setup

### Test Google Search
1. Open `index.html` in your browser
2. Scroll to "Know Your Attendees" section
3. Enter a public figure's name (e.g., "Satya Nadella")
4. Click "Look Up"

**Expected Result:**
- If only Google API configured: List of search results
- If AI API also configured: AI-generated summary with conversation starters

### Test AI Summarization
Look for:
- ✅ Name and summary
- ✅ Professional background
- ✅ Recent activity
- ✅ Key facts
- ✅ Conversation starters
- ✅ Confidence rating
- ✅ Source links
- ✅ Raw JSON output

---

## Security Best Practices

### ⚠️ Important Security Notes

1. **Client-Side Keys Are Visible**
   - API keys in `script.js` are visible to anyone viewing the page
   - Only use this for personal/internal use
   - Don't commit keys to public GitHub repositories

2. **Recommended for Production:**
   - Create a backend API proxy
   - Store keys in environment variables
   - Use server-side API calls
   - Implement rate limiting

3. **API Key Restrictions:**
   - Restrict Google API key to specific domains (in Google Cloud Console)
   - Set spending limits on OpenAI/Anthropic dashboards
   - Monitor usage regularly

### For Personal Use Only ✅
If using locally or on a private internal tool:
- The current setup is fine
- Just don't share your keys
- Monitor your API usage

### For Public Deployment ⚠️
If deploying publicly:
- Create a backend proxy (Node.js, Python, etc.)
- Move API calls to server-side
- Add authentication
- Implement rate limiting

---

## Cost Management

### Monitor Usage

**Google Cloud Console:**
- Check daily quota usage
- Set up billing alerts
- View API metrics

**OpenAI Dashboard:**
- View usage statistics
- Set monthly spending limits
- Download usage reports

**Anthropic Console:**
- Check API usage
- Set budget alerts
- Monitor credits

### Optimize Costs

1. **Cache Results:**
   - Add localStorage caching for repeated searches
   - Reduce duplicate API calls

2. **Use Cheaper Models:**
   - OpenAI: GPT-4o-mini (already configured)
   - Anthropic: Claude Haiku (edit in code if needed)

3. **Set Limits:**
   - Google: 100 free searches/day
   - OpenAI: Set monthly limit ($5-10)
   - Anthropic: Set monthly limit ($5-10)

---

## Troubleshooting

### Issue: "Google Search API error: 403"
**Solution:**
- Check if Custom Search API is enabled in Google Cloud
- Verify API key is correct
- Check billing is enabled (even for free tier)
- Verify search engine ID is correct

### Issue: "OpenAI API error: 401"
**Solution:**
- Check API key is valid
- Ensure key starts with `sk-proj-` or `sk-`
- Verify account has credits
- Check for typos in key

### Issue: "Anthropic API error: 401"
**Solution:**
- Check API key is valid
- Ensure key starts with `sk-ant-`
- Verify account has credits
- Check API version is correct

### Issue: "No results found"
**Solution:**
- Try a more specific search term
- Check internet connection
- Verify person/topic exists online
- Try a different name

### Issue: CORS errors
**Solution:**
- API calls from `file://` protocol may fail
- Use a local server: `python3 -m http.server 8000`
- Or deploy to web hosting (Netlify, GitHub Pages)

---

## Example JSON Output

Here's what the AI summary looks like:

```json
{
  "name": "Satya Nadella",
  "summary": "CEO of Microsoft since 2014, leading the company's cloud-first transformation and AI initiatives. Known for cultural transformation and significant growth in Microsoft's market value.",
  "keyFacts": [
    "Became Microsoft CEO in 2014",
    "Led Azure cloud platform growth to major market position",
    "Championed AI integration across Microsoft products",
    "Author of 'Hit Refresh' memoir"
  ],
  "professionalBackground": "CEO of Microsoft Corporation, previously led Cloud and Enterprise division. Engineering background from Microsoft, Sun Microsystems.",
  "recentActivity": "Recently announced major AI partnership with OpenAI and integration of GPT technology into Microsoft products. Leading company's initiatives in responsible AI development.",
  "conversationStarters": [
    "What do you think about Microsoft's AI strategy under his leadership?",
    "Have you read his book 'Hit Refresh' about Microsoft's transformation?",
    "How has Azure's growth impacted cloud computing competition?"
  ],
  "sources": [
    "https://www.microsoft.com",
    "https://news.microsoft.com"
  ],
  "confidence": "high",
  "note": "Public figure with extensive coverage. Information verified from multiple authoritative sources."
}
```

---

## Alternative: Backend Proxy (Advanced)

For production use, create a backend:

### Node.js Example

```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/lookup', async (req, res) => {
  const { name } = req.body;
  
  // Call Google Search API
  const searchResults = await fetchGoogle(name);
  
  // Call OpenAI API
  const summary = await generateSummary(searchResults);
  
  res.json(summary);
});

app.listen(3000);
```

Then update frontend to call your backend instead of APIs directly.

---

## Optional: NewsAPI

For more tech news sources:

1. Get free API key: [NewsAPI.org](https://newsapi.org/)
2. Add to CONFIG: `NEWS_API_KEY: 'your-key-here'`
3. Free tier: 100 requests/day

---

## Support

### Having Issues?

1. Check browser console for errors (F12)
2. Verify all API keys are correct
3. Test each API separately
4. Check API quotas and limits
5. Review troubleshooting section above

### Need Help?

- Google Cloud: [Support Center](https://cloud.google.com/support)
- OpenAI: [Help Center](https://help.openai.com/)
- Anthropic: [Documentation](https://docs.anthropic.com/)

---

## Summary

### Minimum Setup (Free)
- Works immediately
- No API keys needed
- Basic functionality

### Recommended Setup (~$1-5/month)
- Google Custom Search API (free 100/day)
- OpenAI API (~$1-3/month)
- Full AI-powered summaries

### Total Setup Time
- Reading this guide: 5 minutes
- Getting API keys: 10-15 minutes
- Testing: 5 minutes
- **Total: ~20-25 minutes**

### Monthly Cost Estimate
- Personal use: $1-3
- Team use (10 people): $5-15
- Heavy use: $10-25

**Worth it?** Absolutely! Save hours of manual research. ✨

---

## Quick Start Checklist

- [ ] Create Google Cloud project
- [ ] Enable Custom Search API
- [ ] Get Google API key
- [ ] Create Programmable Search Engine
- [ ] Get Search Engine ID
- [ ] Choose OpenAI or Anthropic
- [ ] Get AI API key
- [ ] Add keys to script.js
- [ ] Test with a public figure
- [ ] Set spending limits
- [ ] Bookmark this guide

---

**Ready to enhance your SmallTalk app? Follow the steps above and unlock AI-powered conversation research!** 🚀


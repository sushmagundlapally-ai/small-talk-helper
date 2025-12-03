# Quick Setup Guide ⚡

## 3-Step Setup for AI Features

### Step 1: Create Your Config File

```bash
# Copy the template
cp config.template.js config.js
```

Or manually:
1. Find `config.template.js`
2. Copy it
3. Rename the copy to `config.js`

---

### Step 2: Add Your API Keys

Open `config.js` in any text editor and add your keys:

```javascript
const CONFIG = {
    // For AI-powered person lookup, add these:
    GOOGLE_SEARCH_API_KEY: 'AIzaSyC...your-key',
    GOOGLE_SEARCH_ENGINE_ID: 'a1b2c3d4e5f...',
    OPENAI_API_KEY: 'sk-proj-...your-key',
    
    // Everything else can stay empty
};
```

**Where to get keys:**
- Google Search: [console.cloud.google.com](https://console.cloud.google.com/)
- Google Search Engine: [programmablesearchengine.google.com](https://programmablesearchengine.google.com/)
- OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

### Step 3: Test Your Setup

1. Open `setup-checker.html` in your browser
2. See which features are enabled
3. Test your API connections
4. Fix any issues

---

## That's It! 🎉

Now open `index.html` and try the "Know Your Attendees" section with a name like "Jensen Huang" or "Satya Nadella"

---

## Need Help?

### Quick Links
- **Detailed Setup:** See `API_SETUP.md`
- **Examples:** See `AI_EXAMPLE.md`
- **Main App:** Open `index.html`
- **Test Setup:** Open `setup-checker.html`

### Common Issues

**"Config not found"**
- Make sure `config.js` exists (not `config.template.js`)
- Check that it's in the same folder as `index.html`

**"API error"**
- Verify your API keys are correct
- Check you have billing enabled (Google Cloud)
- Make sure you have credits (OpenAI)

**"No results"**
- Try a more specific search term
- Check your internet connection
- Open browser console (F12) for error details

---

## Cost Estimate

### Free Features (No Setup Needed)
- ✅ Tech news from Hacker News
- ✅ Reddit discussions
- ✅ arXiv papers
- ✅ Conversation tips
- **Cost: $0**

### AI Features (With Setup)
- ✅ Google search results (100 free/day)
- ✅ AI summaries
- ✅ Conversation starters
- ✅ Confidence ratings
- **Cost: ~$1-5/month for personal use**

---

## File Structure

```
small-talk-helper/
├── index.html              # Main app
├── script.js               # App logic
├── styles.css              # Styling
├── config.js               # YOUR KEYS (create from template)
├── config.template.js      # Template (safe to share)
├── setup-checker.html      # Test your setup
├── API_SETUP.md           # Detailed guide
├── AI_EXAMPLE.md          # Example outputs
├── .gitignore             # Protects your keys
└── README.md              # Project overview
```

---

## Security Reminder

### ✅ Safe to Commit to Git:
- `config.template.js`
- `index.html`
- `script.js`
- `styles.css`
- All `.md` files

### ❌ NEVER Commit:
- `config.js` (contains your actual keys!)

The `.gitignore` file automatically protects `config.js` from being committed.

---

## Next Steps

1. ✅ Create `config.js` from template
2. ✅ Add your API keys
3. ✅ Test with `setup-checker.html`
4. ✅ Use the app at `index.html`
5. 🚀 Enjoy AI-powered conversation research!

---

## Questions?

- Read `API_SETUP.md` for detailed instructions
- Check `AI_EXAMPLE.md` for example outputs
- Open `setup-checker.html` to diagnose issues
- See browser console (F12) for error messages

**Happy conversing!** 💬


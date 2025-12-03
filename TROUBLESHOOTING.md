# Troubleshooting Guide 🔧

## Search Not Working?

### Quick Diagnosis

**Open this file to test:** `test-search.html`

This will test all search functionality and show you exactly what's working.

---

## Common Issues

### 1. Person Lookup Shows "Setup Required"

**What you see:**
```
💡 Setup Required: Google Search Integration
To enable AI-powered person lookup...
```

**Why:**
- This is NORMAL if you haven't added API keys
- Person lookup requires Google Search API + AI API

**Solutions:**

**Option A: Use without AI (works now)**
```
1. Tech news (Hacker News) ✅ No setup needed
2. Meeting topics (Reddit/arXiv) ✅ No setup needed  
3. Conversation tips ✅ No setup needed
4. Person lookup ❌ Needs API keys
```

**Option B: Enable AI features**
```bash
# 1. Copy template
cp config.template.js config.js

# 2. Edit config.js and add your API keys
# See SETUP.md for instructions

# 3. Test your setup
open setup-checker.html
```

---

### 2. Meeting Topic Search Not Working

**Test it:**
```bash
open test-search.html
# Click "Test Reddit Search" and "Test arXiv Search"
```

**Common causes:**

#### A. Browser CORS Issues
**Symptoms:** Errors in console about "CORS" or "cross-origin"

**Fix:** Run a local server instead of opening file directly
```bash
cd /Users/sushma.gundlapally/Documents/small-talk-helper

# Option 1: Python
python3 -m http.server 8000
# Then open: http://localhost:8000

# Option 2: PHP
php -S localhost:8000
# Then open: http://localhost:8000
```

#### B. Internet Connection
**Symptoms:** All searches fail with "network error"

**Fix:** Check your internet connection

#### C. Firewall/VPN
**Symptoms:** Searches timeout or fail

**Fix:** Try disabling VPN or check firewall settings

---

### 3. Tech News Not Loading

**Test it:**
```bash
open test-search.html
# Click "Test Hacker News"
```

**Common causes:**

#### A. Hacker News API Down
**Symptoms:** Test shows error or timeout

**Fix:** Wait and try again later (rare issue)

#### B. Cached Results
**Symptoms:** Old news showing

**Fix:** Click "🔄 Refresh News" button on main page

**Or clear cache:**
```javascript
// Open browser console (F12) and run:
localStorage.clear();
location.reload();
```

---

### 4. Config Not Loading

**Symptoms:**
- Console errors about CONFIG
- Setup checker shows "Config Not Loaded"

**Check:**
```bash
# Make sure config.js exists
ls -la config.js

# Should show: config.js
```

**Fix:**
```bash
# If file doesn't exist, create it:
cp config.template.js config.js

# Then refresh browser
```

---

### 5. Page is Blank or Broken

**Symptoms:**
- White screen
- Missing styles
- Console errors about missing files

**Fix:**
```bash
# Make sure all files exist:
ls -la

# You should see:
# - index.html
# - script.js
# - styles.css
# - config.js (or config.template.js)

# If config.js is missing:
cp config.template.js config.js
```

**Hard refresh:**
- **Mac:** Cmd + Shift + R
- **Windows:** Ctrl + Shift + R
- **Or:** Clear browser cache

---

## Diagnostic Steps

### Step 1: Test Configuration
```bash
open setup-checker.html
```

Shows:
- ✅ What features are enabled
- ❌ What's missing
- 🧪 Test buttons for APIs

### Step 2: Test Search APIs
```bash
open test-search.html
```

Tests:
- Reddit search (no API needed)
- arXiv search (no API needed)
- Hacker News (no API needed)

Shows detailed error messages if something fails.

### Step 3: Check Browser Console
```
1. Open index.html
2. Press F12 (or Cmd+Option+I on Mac)
3. Click "Console" tab
4. Look for errors (red text)
5. Share errors if asking for help
```

---

## Feature Matrix

| Feature | Needs API? | Works Without Setup? |
|---------|------------|---------------------|
| Tech News (Hacker News) | ❌ No | ✅ Yes |
| Tech News (NewsAPI) | ✅ Yes | ❌ No |
| Meeting Topics (Reddit) | ❌ No | ✅ Yes |
| Meeting Topics (arXiv) | ❌ No | ✅ Yes |
| Person Lookup (Basic) | ✅ Yes | ❌ No |
| Person Lookup (AI) | ✅ Yes | ❌ No |
| Conversation Tips | ❌ No | ✅ Yes |

**Summary:** 
- ✅ **4 features work immediately** without any setup
- ✅ **2 features need API keys** (person lookup)

---

## Understanding "Search Not Working"

### What Works WITHOUT Setup:

1. **Tech Headlines Section** ✅
   - Pulls from Hacker News
   - Refreshes daily
   - Should always work

2. **Meeting Topic Research** ✅
   - Reddit discussions
   - arXiv papers
   - Should always work

3. **Conversation Tips** ✅
   - Static content
   - Always visible

### What Needs Setup:

4. **Person Lookup (AI-powered)** ❌
   - Requires Google Search API
   - Requires OpenAI or Anthropic API
   - Shows setup guide if not configured

---

## Quick Fixes

### "Nothing Works"
```bash
# 1. Make sure you're connected to internet
ping google.com

# 2. Try running a local server
cd /Users/sushma.gundlapally/Documents/small-talk-helper
python3 -m http.server 8000

# 3. Open in browser:
# http://localhost:8000
```

### "Person Lookup Not Working"
```
This is EXPECTED without API keys!

To enable:
1. See SETUP.md
2. Add API keys to config.js
3. Costs ~$1-5/month
```

### "Meeting Topics Not Working"
```bash
# Test individually:
open test-search.html

# If tests pass but main app fails:
# - Hard refresh browser
# - Clear cache
# - Try different browser
```

### "Tech News Not Working"
```javascript
// Clear cache and reload
localStorage.clear();
location.reload();

// Or click "Refresh News" button
```

---

## Browser Compatibility

### Recommended:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

### Issues:
- ❌ Internet Explorer (not supported)
- ⚠️ Old browsers may have issues

---

## Still Having Issues?

### Collect This Information:

1. **What exactly isn't working?**
   - Tech news?
   - Meeting topic search?
   - Person lookup?
   - Everything?

2. **What do you see?**
   - Error message?
   - Blank screen?
   - Loading forever?
   - Setup guide?

3. **Browser console errors:**
   ```
   F12 → Console tab → Copy any red errors
   ```

4. **Test results:**
   ```bash
   open test-search.html
   # Run all tests and note which fail
   ```

5. **Setup status:**
   ```bash
   open setup-checker.html
   # Screenshot the feature status
   ```

---

## Most Likely Causes

### If EVERYTHING doesn't work:
1. Internet connection issue
2. Browser blocking scripts
3. Files in wrong location
4. CORS issue (use local server)

### If ONLY person lookup doesn't work:
1. **This is normal!** Needs API keys
2. See SETUP.md to enable it
3. Other features should still work

### If meeting topics don't work:
1. CORS issue - use local server
2. Reddit/arXiv API temporarily down
3. Browser blocking requests

---

## Quick Test Commands

```bash
# Go to app directory
cd /Users/sushma.gundlapally/Documents/small-talk-helper

# Test 1: Open diagnostic page
open test-search.html

# Test 2: Open setup checker  
open setup-checker.html

# Test 3: Run local server
python3 -m http.server 8000
# Then open: http://localhost:8000

# Test 4: Check files exist
ls -la *.html *.js *.css

# Test 5: View config
cat config.js
```

---

## Summary

**Most common issue:**  
Person lookup shows "Setup Required" - This is NORMAL without API keys!

**Quick fix:**  
Use the features that work without setup (tech news, meeting topics, tips)

**Want AI features?**  
Follow SETUP.md to add API keys (~15 minutes, ~$1-5/month)

**Still broken?**  
Run `test-search.html` to see exactly what's failing

---

## Help Files

- 📖 **SETUP.md** - How to add API keys
- 🧪 **test-search.html** - Test all searches
- 🔧 **setup-checker.html** - Check configuration
- 📚 **API_SETUP.md** - Detailed API setup
- 📊 **README.md** - Project overview

---

**Need more help?** Open browser console (F12) and look for error messages!


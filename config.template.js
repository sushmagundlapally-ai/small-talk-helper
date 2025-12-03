// 🔑 SmallTalk Configuration Template
// 
// 📋 SETUP INSTRUCTIONS:
// 1. Copy this file and rename it to: config.js
// 2. Add your API keys below
// 3. Save the file
// 4. Refresh index.html in your browser
//
// ⚠️ SECURITY NOTE: 
// - config.js is in .gitignore and won't be committed
// - This template file is safe to commit (no actual keys)
// - Never share your actual API keys publicly
//
// 📖 Detailed Setup Guide: See API_SETUP.md

const CONFIG = {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🆓 OPTIONAL - NewsAPI (for more tech news sources)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Free tier: 100 requests/day
    // Get key: https://newsapi.org/
    NEWS_API_KEY: '',
    
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔍 GOOGLE CUSTOM SEARCH API (for AI-powered person lookup)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Free tier: 100 searches/day
    // 
    // Step 1: Get API Key
    //   1. Go to: https://console.cloud.google.com/
    //   2. Create or select a project
    //   3. Enable "Custom Search API"
    //   4. Go to Credentials → Create Credentials → API Key
    //   5. Copy and paste below
    GOOGLE_SEARCH_API_KEY: '',
    
    // Step 2: Create Search Engine
    //   1. Go to: https://programmablesearchengine.google.com/
    //   2. Click "Add" to create new search engine
    //   3. Select "Search the entire web"
    //   4. Create and copy the Search Engine ID (cx parameter)
    //   5. Paste below
    GOOGLE_SEARCH_ENGINE_ID: '',
    
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🤖 AI API - CHOOSE ONE (for AI-powered summaries)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // Option A: OpenAI (RECOMMENDED)
    // Cost: ~$1-3/month for typical use
    // Model: GPT-4o-mini (fast, accurate, affordable)
    // Get key: https://platform.openai.com/api-keys
    OPENAI_API_KEY: '',
    
    // Option B: Anthropic Claude (ALTERNATIVE)
    // Cost: ~$2-5/month for typical use
    // Model: Claude 3.5 Sonnet (excellent reasoning)
    // Get key: https://console.anthropic.com/
    ANTHROPIC_API_KEY: '',
    
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🎚️ ADVANCED SETTINGS (optional)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // Maximum number of Google search results to fetch (1-10)
    MAX_SEARCH_RESULTS: 10,
    
    // AI model temperature (0.0 = more focused, 1.0 = more creative)
    // Lower values = more factual and consistent
    // Higher values = more creative but potentially less accurate
    AI_TEMPERATURE: 0.3,
    
    // Cache tech news refresh (in milliseconds, default: 24 hours)
    NEWS_CACHE_DURATION: 24 * 60 * 60 * 1000,
    
    // Enable debug logging to browser console
    DEBUG_MODE: false,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📊 CONFIGURATION VALIDATION (Don't edit below this line)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Check what features are enabled
CONFIG.FEATURES = {
    enhancedNews: !!CONFIG.NEWS_API_KEY,
    googleSearch: !!(CONFIG.GOOGLE_SEARCH_API_KEY && CONFIG.GOOGLE_SEARCH_ENGINE_ID),
    aiSummaries: !!(CONFIG.OPENAI_API_KEY || CONFIG.ANTHROPIC_API_KEY),
    fullAiLookup: !!(CONFIG.GOOGLE_SEARCH_API_KEY && CONFIG.GOOGLE_SEARCH_ENGINE_ID && (CONFIG.OPENAI_API_KEY || CONFIG.ANTHROPIC_API_KEY))
};

// Log configuration status
if (CONFIG.DEBUG_MODE) {
    console.log('🔧 SmallTalk Configuration:');
    console.log('  📰 Enhanced News:', CONFIG.FEATURES.enhancedNews ? '✅' : '❌');
    console.log('  🔍 Google Search:', CONFIG.FEATURES.googleSearch ? '✅' : '❌');
    console.log('  🤖 AI Summaries:', CONFIG.FEATURES.aiSummaries ? '✅' : '❌');
    console.log('  🎯 Full AI Lookup:', CONFIG.FEATURES.fullAiLookup ? '✅' : '❌');
}

// Make config available globally
window.SMALLTALK_CONFIG = CONFIG;


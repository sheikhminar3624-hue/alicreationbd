/**
 * Vercel Speed Insights Integration
 * 
 * This script initializes Vercel Speed Insights for tracking web vitals
 * and performance metrics on the AliCreationBD website.
 */

// Import and inject Speed Insights
import { injectSpeedInsights } from './vercel-speed-insights.mjs';

// Initialize Speed Insights
injectSpeedInsights({
  debug: false, // Set to true for debugging in development
});

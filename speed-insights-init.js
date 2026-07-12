// Initialize Vercel Speed Insights
// This script loads the Speed Insights tracking for performance monitoring
(function() {
  // Initialize the queue if it doesn't exist
  window.si = window.si || function() { (window.siq = window.siq || []).push(arguments); };
  
  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '1.3.1');
  
  // Append the script to the document head
  if (document.head) {
    document.head.appendChild(script);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
})();

/* ──────────────────────────────────────────────────────────────────────────
   Lexyoz — privacy-safe analytics (PostHog)
   COPPA-friendly configuration for a children's website:
     • No tracking cookies (memory-only persistence)
     • No autocapture of clicks/forms, no heatmaps
     • No session recording, no surveys
     • No personal data is ever sent (no names, emails, etc.)
   We only record anonymous, aggregated usage: page visits, which game is
   opened, and home-screen installs. Geo (country/city) is derived by PostHog
   from IP; enable "Discard client IP data" in Project Settings so the raw IP
   is not stored (location is still calculated).
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  // --- PostHog loader snippet (official) ---
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Pe Ts Ms Es Rs capture Ge calculateEventProperties Os register register_once register_for_session unregister unregister_for_session Ds getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Cs Fs createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ls debug L As getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  // --- Initialise in strict privacy mode ---
  posthog.init('phc_AjDm6iQxC738JaWJnxM6ji7nkCXhcQejng4Agg6zjgzX', {
    api_host: 'https://us.i.posthog.com',
    persistence: 'memory',           // no cookies / no localStorage identifiers
    autocapture: false,              // do not auto-record clicks/inputs
    capture_pageview: true,          // count page visits (anonymous)
    capture_pageleave: true,
    disable_session_recording: true, // never record the screen
    disable_surveys: true,
    enable_heatmaps: false,
    capture_performance: false,
    rageclick: false,
    advanced_disable_decide: false
  });

  // --- Tag each page with a friendly game name (easier dashboards) ---
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var GAMES = {
    'index.html': 'menu',
    '': 'menu',
    'letters.html': 'abc_letters',
    'math-hoops.html': 'math_hoops_classic',
    'super-hero.html': 'math_hoops_hero',
    'calorie-monster.html': 'calorie_monster',
    'privacy.html': 'privacy'
  };
  var game = GAMES[path] || path.replace('.html', '');

  // Attach "game" to every event from this page
  posthog.register({ game: game });

  // Explicit "page opened" event (in addition to the automatic pageview)
  if (game !== 'menu' && game !== 'privacy') {
    posthog.capture('game_open', { game: game });
  }

  // --- Track "Add to Home Screen" (PWA install) ---
  window.addEventListener('appinstalled', function () {
    posthog.capture('pwa_install', { game: game });
  });
})();

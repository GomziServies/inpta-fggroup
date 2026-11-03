/**
 * FG Group CRM tracking — the same drop-in file in every FG Group website and landing page.
 * Mirrors the main website (fggroup_react: components/CookieConsent.jsx + assets/js/utils/visitor-tracking.js),
 * without depending on React, a router or a CSS framework, so one file works in CRA, Vite, TS and plain HTML.
 *
 * What it does
 *  1. Loads the shared visitor tracker from fg-api (GET /public/v1/visitor/tracker.js) with this site's key.
 *     The key is registered in fg-api src/config/website-sources.js, which decides the CRM brand
 *     (fgiit | fwg | gn) and the domains allowed to send. While the cookie banner is unanswered the tracker
 *     only counts the visit anonymously (no name, phone, email, IP or persistent id).
 *  2. Cookie banner. "Accept All" is the consent: the browser gets a visitor id and its visit summary becomes a
 *     "Website Visitor" lead in the CRM (marketing > omnichannel leads) for this brand. "Reject All" stops
 *     everything and wipes the visitor id.
 *  3. A notice above every inquiry form's submit button. Sending the form is the visitor's agreement that the
 *     form's details are added to that lead; the notice has a "Stop tracking on this device" link.
 *  4. withVisitorTracking(payload): call it on every POST /contact-inquiry payload (attachToAxios() does it for an
 *     axios instance). With the notice on screen it hands the form details to the tracker first and adds
 *     details.visitor_id, so the inquiry and the browsing history become ONE lead in the CRM.
 *
 * Usage (once, in the app entry):
 *   import { initCrmTracking, attachToAxios } from './crm/fg-crm-tracking';
 *   initCrmTracking({ siteKey: 'fwg-online-combo', apiBase: 'https://api.fggroup.in', brand: 'Fitness With Gomzi', accent: '#99c229' });
 *   attachToAxios(publicAxiosInstance);
 */

const CHOICE_KEY = 'fg_cookie_choice';
const NOTICE_ATTR = 'data-fg-tracking-notice';
const STOP_ATTR = 'data-fg-stop-tracking';
const BANNER_ID = 'fg-cookie-banner';
const DEFAULT_POLICY_URL = 'https://fggroup.in/cookie-policy';

let settings = null;

const readChoice = () => {
  try {
    return localStorage.getItem(CHOICE_KEY);
  } catch (e) {
    return null;
  }
};

const saveChoice = (value) => {
  try {
    localStorage.setItem(CHOICE_KEY, value);
  } catch (e) {
    // storage blocked: the banner simply shows again next visit
  }
};

function loadTracker() {
  if (window.__fgTrackerRequested) return;
  window.__fgTrackerRequested = true;
  const script = document.createElement('script');
  script.src = `${settings.apiBase}/public/v1/visitor/tracker.js`;
  script.async = true;
  script.setAttribute('data-site', settings.siteKey);
  // the profile this site keeps in localStorage (name / email / phone), read only after the visitor agrees
  script.setAttribute('data-profile-keys', settings.profileKeys.join(','));
  document.head.appendChild(script);
}

// ---- cookie banner ----

function wipeVisitorId() {
  try {
    localStorage.removeItem('fg_lead_consent');
    localStorage.removeItem('fg_consent_source');
    localStorage.removeItem('fg_vid');
  } catch (e) {
    // nothing stored
  }
  document.cookie = 'fg_vid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function answerBanner(accepted) {
  saveChoice(accepted ? 'accepted' : 'rejected');
  const tracker = window.fgTracker;
  if (accepted) {
    // the tracker reads the saved choice when it loads, so an early click is not lost
    if (tracker && tracker.acceptCookies) tracker.acceptCookies();
  } else if (tracker && tracker.rejectCookies) {
    tracker.rejectCookies();
  } else {
    wipeVisitorId();
  }
  const banner = document.getElementById(BANNER_ID);
  if (banner) banner.remove();
}

function buildButton(label, primary) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.style.cssText = primary
    ? `padding:10px 22px;border-radius:8px;border:0;background:${settings.accent};color:${settings.accentText};font-family:inherit;font-size:14px;font-weight:700;line-height:1.2;cursor:pointer;`
    : 'padding:10px 22px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:transparent;color:#cbd5e1;font-family:inherit;font-size:14px;font-weight:600;line-height:1.2;cursor:pointer;';
  return button;
}

function showBanner() {
  if (readChoice() || document.getElementById(BANNER_ID)) return;

  const banner = document.createElement('div');
  banner.id = BANNER_ID;
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.style.cssText = `position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:rgba(15,23,42,.97);border-top:2px solid ${settings.accent};font-family:inherit;box-shadow:0 -6px 24px rgba(0,0,0,.18);`;

  const inner = document.createElement('div');
  inner.style.cssText = 'max-width:1200px;margin:0 auto;padding:16px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;';

  const text = document.createElement('p');
  text.style.cssText = 'flex:1 1 320px;min-width:0;margin:0;color:#e2e8f0;font-size:14px;line-height:1.6;';
  text.appendChild(
    document.createTextNode(
      `We use cookies and browser storage to improve your experience and analyse site traffic. Accepting lets the ${settings.brand} team's CRM save your visit summary (pages viewed, interests, device and browser storage) — no personal details are added unless you send a form. `
    )
  );
  const link = document.createElement('a');
  link.href = settings.policyUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Read our Cookie & Data Policy';
  link.style.cssText = `color:${settings.accent};text-decoration:underline;font-weight:600;`;
  text.appendChild(link);

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:10px;flex-shrink:0;';
  const reject = buildButton('Reject All', false);
  const accept = buildButton('Accept All', true);
  reject.addEventListener('click', () => answerBanner(false));
  accept.addEventListener('click', () => answerBanner(true));
  actions.appendChild(reject);
  actions.appendChild(accept);

  inner.appendChild(text);
  inner.appendChild(actions);
  banner.appendChild(inner);
  document.body.appendChild(banner);
}

// ---- notice above inquiry submit buttons ----

// Inputs that mean "this is a form where a visitor leaves contact details"
const CONTACT_INPUTS =
  'input[type="tel"], input[type="email"], input[name*="mobile" i], input[name*="phone" i], input[id*="mobile" i], input[id*="phone" i], input[placeholder*="mobile" i], input[placeholder*="phone" i], input[placeholder*="whatsapp" i]';
// Buttons that are NOT an inquiry submit (login, OTP, password, search): no notice next to these
const NOT_AN_INQUIRY = /otp|log ?in|sign ?in|verify|password|register|sign ?up|subscribe|search|apply coupon/i;

function buildNotice() {
  const p = document.createElement('p');
  p.setAttribute(NOTICE_ATTR, '1');
  // grid-column: a full row of its own when the form is a CSS grid (ignored otherwise)
  p.style.cssText = 'margin:8px 0;font-size:12px;line-height:1.5;color:#6b7280;text-align:left;grid-column:1/-1;';
  p.appendChild(
    document.createTextNode(
      `By sending this form you agree that ${settings.brand} saves your details and your activity on this site (pages viewed, programs, how you found us) so our team can follow up. `
    )
  );
  const stop = document.createElement('a');
  stop.href = '#';
  stop.setAttribute(STOP_ATTR, '1');
  stop.style.cssText = 'text-decoration:underline;color:inherit;';
  stop.textContent = 'Stop tracking on this device';
  p.appendChild(stop);
  return p;
}

function placeNotices() {
  document.querySelectorAll(CONTACT_INPUTS).forEach((input) => {
    if (input.type === 'hidden' || input.closest(`[${NOTICE_ATTR}]`)) return;

    // nearest ancestor that holds a visible submit-like button after this input
    let container = input.parentElement;
    let button = null;
    while (container && container !== document.body) {
      const candidates = Array.from(container.querySelectorAll('button, input[type="submit"], input[type="button"]')).filter(
        (b) =>
          // eslint-disable-next-line no-bitwise
          input.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING &&
          b.type !== 'reset' &&
          b.offsetParent !== null &&
          // dropdowns, tabs and toggles inside the form are not its submit button
          !b.hasAttribute('aria-haspopup') &&
          !/^(combobox|tab|switch|checkbox|radio)$/.test(b.getAttribute('role') || '')
      );
      // a real submit button wins; otherwise the first button after the field (React forms often use type="button")
      button = candidates.find((b) => b.type === 'submit') || candidates[0] || null;
      if (button) break;
      container = container.parentElement;
    }
    if (!button || !container) return;

    // not a lead form: a password field in the same form, or a login / OTP style button
    if (container.querySelector('input[type="password"]')) return;
    if (NOT_AN_INQUIRY.test(button.textContent || button.value || '')) return;
    if (container.querySelector(`[${NOTICE_ATTR}]`)) return; // one notice per form

    button.parentNode.insertBefore(buildNotice(), button);
  });
}

function stopTracking() {
  try {
    if (window.fgTracker && window.fgTracker.setConsent) window.fgTracker.setConsent(false);
    else localStorage.setItem('fg_lead_consent', '0');
    localStorage.removeItem('fg_vid');
  } catch (e) {
    // storage blocked: nothing was stored, nothing to withdraw
  }
  document.querySelectorAll(`[${STOP_ATTR}]`).forEach((el) => {
    el.textContent = 'Tracking stopped on this device';
  });
}

function installSubmitNotice() {
  document.addEventListener('click', (event) => {
    const link = event.target && event.target.closest ? event.target.closest(`[${STOP_ATTR}]`) : null;
    if (!link) return;
    event.preventDefault();
    stopTracking();
  });

  // Forms appear and disappear as visitors move around (modals, routes): place notices again after DOM changes
  let timer = null;
  const schedule = () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      try {
        placeNotices();
      } catch (e) {
        // a page quirk must never break the site
      }
    }, 300);
  };
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  schedule();
}

// ---- public API ----

/**
 * Starts tracking for this site. Safe to call more than once (only the first call counts).
 * @param {object} options
 * @param {string} options.siteKey      key registered in fg-api src/config/website-sources.js
 * @param {string} options.apiBase      fg-api base URL, e.g. https://api.fggroup.in (no trailing slash)
 * @param {string} options.brand        name shown in the banner and notice, e.g. "Fitness With Gomzi"
 * @param {string} [options.accent]     brand colour for the banner button / border
 * @param {string} [options.accentText] text colour on the accent button
 * @param {string[]} [options.profileKeys] localStorage keys holding the logged-in profile (default ['user_info'])
 * @param {string} [options.policyUrl]  cookie policy page
 */
export function initCrmTracking(options) {
  if (typeof window === 'undefined' || typeof document === 'undefined' || settings) return;
  if (!options || !options.siteKey || !options.apiBase) return;
  settings = {
    siteKey: options.siteKey,
    apiBase: String(options.apiBase).replace(/\/+$/, ''),
    brand: options.brand || 'FG Group',
    accent: options.accent || '#f97316',
    accentText: options.accentText || '#ffffff',
    profileKeys: options.profileKeys || ['user_info'],
    policyUrl: options.policyUrl || DEFAULT_POLICY_URL,
  };
  window.fgCrm = { stopTracking, withVisitorTracking };

  const start = () => {
    try {
      loadTracker();
      showBanner();
      installSubmitNotice();
    } catch (e) {
      // tracking must never break the site
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}

const noticeIsVisible = () => Array.from(document.querySelectorAll(`[${NOTICE_ATTR}]`)).some((el) => el.offsetParent !== null);

/**
 * Call on every POST /contact-inquiry payload. Returns the payload to send (with details.visitor_id added when the
 * visitor agreed). Never throws and never delays the inquiry by more than 2.5 seconds.
 * @param {object} payload contact-inquiry body: { name, email, mobile, subject, message, source, details }
 * @returns {Promise<object>}
 */
export async function withVisitorTracking(payload) {
  try {
    if (!payload || typeof payload !== 'object' || (typeof FormData !== 'undefined' && payload instanceof FormData)) return payload;
    const tracker = typeof window !== 'undefined' ? window.fgTracker : null;
    // Consent comes from the notice above the submit button: without it on screen, nothing is shared.
    if (!tracker || !tracker.consentOnSubmit || !noticeIsVisible()) return payload;

    await Promise.race([
      tracker.consentOnSubmit(
        {
          full_name: String(payload.name || payload.full_name || '').trim(),
          phone_number: String(payload.mobile || payload.phone || payload.phone_number || '').replace(/\D/g, ''),
          email: String(payload.email || '').trim(),
          city: String((payload.details && payload.details.city) || payload.city || '').trim(),
        },
        payload.subject
      ),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);

    const visitorId = tracker.visitorId;
    if (!visitorId) return payload;
    return { ...payload, details: { ...(payload.details || {}), visitor_id: visitorId } };
  } catch (e) {
    return payload;
  }
}

/** True for a POST to .../contact-inquiry (the public inquiry endpoint). */
export function isContactInquiryRequest(method, url) {
  return String(method || '').toLowerCase() === 'post' && /\/contact-inquiry\/?(\?.*)?$/.test(String(url || ''));
}

/**
 * Adds withVisitorTracking() to every POST /contact-inquiry sent through this axios instance.
 * @param {import('axios').AxiosInstance} instance
 */
export function attachToAxios(instance) {
  if (!instance || !instance.interceptors || instance.__fgCrmAttached) return;
  instance.__fgCrmAttached = true;
  instance.interceptors.request.use(async (config) => {
    if (isContactInquiryRequest(config.method, config.url)) config.data = await withVisitorTracking(config.data);
    return config;
  });
}

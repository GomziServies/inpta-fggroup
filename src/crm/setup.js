/**
 * FG Group CRM tracking for this site: cookie banner, visitor tracker, and the link that makes an inquiry and the
 * visitor's browsing one lead. Site key 'inpta-website' is registered in fg-api src/config/website-sources.js, which
 * sends this site's leads to the FGIIT section of the CRM. How it works: ./fg-crm-tracking.js
 */
import apiConfig from '../js/apiConfig';
import { publicAxiosInstance } from '../js/api';
import { initCrmTracking, attachToAxios } from './fg-crm-tracking';

initCrmTracking({
  apiBase: apiConfig.BASE_URL,
  siteKey: 'inpta-website',
  brand: 'INPTA',
  accent: '#1e4680',
  profileKeys: ['user_info'],
});

// every POST /contact-inquiry carries the visitor id, so the inquiry joins the visitor's lead
attachToAxios(publicAxiosInstance);

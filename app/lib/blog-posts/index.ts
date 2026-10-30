import type { BlogPost } from "../blog";
import { agencyVsFreelancerVsOffshore } from "./agency-vs-freelancer-vs-offshore";
import { aiAppBuilderVsDevelopmentTeam } from "./ai-app-builder-vs-development-team";
import { arabicRtlAppsUae } from "./arabic-rtl-apps-uae";
import { chooseAppDevelopmentCompany } from "./choose-app-development-company";
import { flutterVsReactNative } from "./flutter-vs-react-native";
import { mvpTimeline } from "./mvp-timeline";
import { tabbyTamaraMobileAppUae } from "./tabby-tamara-mobile-app-uae";
import { ukGdprChecklist } from "./uk-gdpr-checklist";

/** Newest first — they appear before the older posts in lib/blog.ts. */
export const newPosts: BlogPost[] = [
  aiAppBuilderVsDevelopmentTeam,
  agencyVsFreelancerVsOffshore,
  tabbyTamaraMobileAppUae,
  mvpTimeline,
  flutterVsReactNative,
  chooseAppDevelopmentCompany,
  ukGdprChecklist,
  arabicRtlAppsUae,
];

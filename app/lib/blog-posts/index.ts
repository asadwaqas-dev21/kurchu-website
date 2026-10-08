import type { BlogPost } from "../blog";
import { arabicRtlAppsUae } from "./arabic-rtl-apps-uae";
import { chooseAppDevelopmentCompany } from "./choose-app-development-company";
import { flutterVsReactNative } from "./flutter-vs-react-native";
import { mvpTimeline } from "./mvp-timeline";
import { ukGdprChecklist } from "./uk-gdpr-checklist";

/** Newest first — they appear before the older posts in lib/blog.ts. */
export const newPosts: BlogPost[] = [
  mvpTimeline,
  flutterVsReactNative,
  chooseAppDevelopmentCompany,
  ukGdprChecklist,
  arabicRtlAppsUae,
];

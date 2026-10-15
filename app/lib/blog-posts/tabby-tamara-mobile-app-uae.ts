import type { BlogPost } from "../blog";
import { FEATURES, formatUsd } from "../estimator";

// The integration price comes from the same table as the AI estimator, so the two never disagree.
const payments = FEATURES.find((feature) => feature.key === "payments")!;

export const tabbyTamaraMobileAppUae: BlogPost = {
  slug: "add-tabby-tamara-to-mobile-app-uae",
  title: "How to add Tabby and Tamara to a mobile app in the UAE",
  seoTitle: "Add Tabby & Tamara to a Mobile App (UAE Guide)",
  excerpt:
    "A developer-checked guide to adding Tabby and Tamara buy-now-pay-later to an iOS, Android, Flutter or React Native app: the payment flow, SDKs, UAE ID checks and go-live tests.",
  category: "Payments",
  date: "2026-10-15",
  readTime: "9 min read",
  image: "/blog/tabby-tamara-bnpl.svg",
  imageAlt: "Illustration of a phone checkout splitting a payment into four instalments",
  keywords: [
    "Tabby integration mobile app",
    "Tamara integration mobile app",
    "buy now pay later app UAE",
    "BNPL integration Flutter",
    "Tabby Flutter SDK",
    "Tamara SDK",
    "Tabby React Native",
    "Tabby vs Tamara",
  ],
  summary:
    "To add Tabby or Tamara to a mobile app, show their instalment messaging on product, cart and checkout screens, create a checkout session when the customer places the order, open the provider's checkout through its official iOS, Android, Flutter or React Native SDK, then confirm the payment on your server through the provider's API and webhooks before you capture and ship the order.",
  cta: {
    title: "Price an app with Tabby and Tamara built in",
    body: "Describe your shop or service and the free AI estimator lists the features, the timeline and the price — payments included.",
    href: "/app-cost-estimator",
    label: "Estimate my app",
  },
  takeaways: [
    "Both providers have official SDKs for iOS, Android, Flutter and React Native.",
    "Never trust the app's result screen: confirm every payment on your server.",
    "UAE checkouts can ask for an Emirates ID scan, so the app needs camera access.",
    "Instalment messaging belongs on product, cart and checkout screens, in Arabic and English.",
    "Both providers run a go-live checklist, so plan time for their review.",
  ],
  sections: [
    {
      heading: "What are Tabby and Tamara?",
      paragraphs: [
        "Tabby and Tamara are buy-now-pay-later (BNPL) providers widely used across the UAE and Saudi Arabia. At checkout the customer chooses to split the purchase into instalments; the provider approves the customer, collects the instalments and settles the order with the merchant under the terms of their merchant agreement.",
        "For an app, that means a new payment method next to cards, Apple Pay and Google Pay. Many UAE customers now look for it on higher-value purchases such as electronics, fashion, furniture, beauty and services, so it is a common request for e-commerce and booking apps built for the Emirates.",
      ],
    },
    {
      heading: "How does a BNPL payment work inside a mobile app?",
      paragraphs: [
        "Tabby and Tamara follow the same overall flow. The app handles the customer experience; your server holds the secret API keys and decides whether an order is paid. The steps are:",
      ],
      bullets: [
        "Show instalment messaging — the provider's snippet or widget — on the product page, the cart and the payment step.",
        "When the customer taps Place order, create one checkout session for exactly that order and amount.",
        "Open the provider's checkout in the app, through its SDK or its hosted payment page.",
        "The customer signs in, verifies their identity if needed and approves the plan.",
        "Your server confirms the result with the provider's API, backed by webhooks — not by what the app reports.",
        "Your server finalises the payment — capture for Tabby, authorise then capture for Tamara — and the order is fulfilled; cancellations and refunds also go through the API.",
      ],
    },
    {
      heading: "Tabby vs Tamara: what is different for developers?",
      paragraphs: [
        "The two integrations are close enough that one well-designed payments module can support both. These are the differences that matter when you build, based on each provider's developer documentation as of October 2026:",
      ],
      table: {
        caption: "Tabby and Tamara mobile integration compared",
        headers: ["", "Tabby", "Tamara"],
        rows: [
          ["Official mobile SDKs", "iOS, Android, Flutter (tabby_flutter_inapp_sdk) and React Native", "iOS, Android, Flutter and React Native"],
          ["Checkout session", "Created through the SDK, or by your backend for a hosted payment page", "Created by your backend; the app opens the returned checkout URL"],
          ["Confirming the payment", "Retrieve the payment from your backend, backed by webhooks", "Webhooks for each order event, plus the order status API"],
          ["After approval", "Capture the full amount once the payment is AUTHORIZED", "Authorise the order (within 72 hours unless auto-authorise is on), then capture when it ships"],
          ["UAE identity check", "Inside checkout; needs camera, microphone and photo access", "UAE KYC Web SDK inside a WebView; needs camera access and inline media playback"],
          ["Instalment messaging", "Product, cart and checkout snippets", "Product, cart and checkout widgets following the UAE guidelines"],
          ["Through a gateway", "Also offered through Checkout.com", "Also offered through Checkout.com"],
        ],
      },
    },
    {
      heading: "Should you use the SDK or a hosted checkout page?",
      paragraphs: [
        "For most apps the official SDK is the right choice. It handles the checkout screen, the result callbacks and the instalment snippets, and it is maintained by the provider as their checkout changes. Flutter and React Native apps can use the providers' own packages, so a cross-platform app does not need two native integrations.",
        "Without an SDK, your backend creates the session and the app opens the provider's hosted payment page. Tabby recommends the system browser — a Chrome Custom Tab on Android or an ASWebAuthenticationSession or SFSafariViewController on iOS — with success, cancel and failure URLs that deep-link back into the app. An embedded WebView also works, but you then own the camera permissions and the recovery when a customer leaves the app mid-checkout.",
        "If you already take card payments through Checkout.com, both providers are also available as payment methods there, which can mean one integration and one settlement report instead of three.",
      ],
    },
    {
      heading: "Why must the payment be confirmed on your server?",
      paragraphs: [
        "Because the app is not proof of payment. Customers switch to a banking app, lose signal or close the checkout after approving it, so the result screen can be missing or wrong. Tabby's documentation is explicit: the status lives on the provider's backend, a closed checkout is not a cancellation, and a pending status is not a failure.",
        "In practice your server should:",
      ],
      bullets: [
        "Save the payment or order ID as soon as the session is created, before the customer can leave the app.",
        "Show a \"Confirming your payment…\" state rather than an instant success or failure screen.",
        "Re-check the status with the provider when the app returns to the foreground, polling your own backend with a capped back-off.",
        "Treat webhooks as notifications: answer quickly, ignore duplicates and handle events that arrive out of order.",
        "Capture, cancel and refund with unique reference IDs, so a retried request can never charge or refund twice.",
      ],
    },
    {
      heading: "What camera and ID permissions does the app need?",
      paragraphs: [
        "New customers may have to verify their identity inside checkout — for example by photographing their Emirates ID — so a checkout that cannot open the camera loses sales. Grant the permissions before release and test them on real devices:",
      ],
      bullets: [
        "iOS (Tabby): add camera, microphone and photo library usage descriptions to Info.plist; the Flutter SDK also needs the camera and microphone permission flags in the Podfile.",
        "Android (Tabby): declare CAMERA, RECORD_AUDIO and MODIFY_AUDIO_SETTINGS, handle permission requests in your WebChromeClient and use the photo picker for image uploads.",
        "Tamara in the UAE: the ID check runs on the UAE KYC Web SDK, which needs JavaScript, camera access and, on iOS, allowsInlineMediaPlayback set on the WebView.",
        "Ask for runtime permissions with a clear explanation; granting everything silently is only acceptable in test builds.",
      ],
    },
    {
      heading: "Where should the instalment messaging appear?",
      paragraphs: [
        "Both providers expect the instalment price to be visible before checkout, not only as a payment option. Tamara's UAE guidelines place the widget directly below the product price, below the cart total and among the payment methods, in Arabic and English, with amounts recalculated live and never shown as fractions. Tabby's checklist asks for snippets on every product and every cart amount, updating as the cart changes, and shown only in the countries where your merchant account is registered.",
        "Use the providers' official wording, logos and pop-ups rather than writing your own claims. In a bilingual app, check every snippet in both languages and in right-to-left layout — see our guide to Arabic and right-to-left apps for the details.",
      ],
    },
    {
      heading: "What does the go-live checklist test?",
      paragraphs: [
        "Neither provider switches a merchant to live until its checklist passes. Expect them to test:",
      ],
      bullets: [
        "Success, cancellation, rejection and failure, each landing on the right localised screen.",
        "The corner case where a customer approves and then closes the app before returning — the order must still complete through webhooks.",
        "One checkout session per Place order tap, never cached or reused, with the same total for every payment method.",
        "No close or back buttons drawn by the app over Tabby's checkout.",
        "The cart kept after a cancellation and cleared only after success.",
        "Full, partial and repeated refunds, plus cancellations, matching on both sides.",
        "The UAE ID verification flow and the widgets working inside the mobile app, not just on the website.",
      ],
    },
    {
      heading: "How long does it take, and what does it cost?",
      paragraphs: [
        `For an app that already takes payments, adding one BNPL provider is usually days of engineering, not weeks; adding both mostly reuses the same payments module. In our published price table, online payments add ${formatUsd(payments.low)}–${formatUsd(payments.high)} to an app's build price. Merchant onboarding and each provider's go-live review run on their own schedule, so start the merchant applications early.`,
        "The providers' own fees are set in your merchant agreement with them, separately from the cost of building the app.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need both Tabby and Tamara in my app?",
      a: "Not necessarily. Each provider has its own customer base and approval decisions, so offering both can help more shoppers complete a purchase, while one is simpler to run and reconcile. Many UAE retailers start with one and add the second later. Because the checkout flows are so similar, a well-built payments module makes adding the second provider a small, low-risk change.",
    },
    {
      q: "Can I add Tabby or Tamara to a Flutter or React Native app?",
      a: "Yes. Tabby publishes tabby_flutter_inapp_sdk for Flutter and tabby-react-native-sdk for React Native, alongside its native iOS and Android SDKs, and Tamara offers iOS, Android, Flutter and React Native SDKs too. A cross-platform app can therefore use one integration for both stores. Your backend still creates or verifies sessions, confirms payments and handles capture, refunds and webhooks for every platform.",
    },
    {
      q: "Why does the Tabby or Tamara checkout ask for the camera?",
      a: "New customers in the UAE may need to verify their identity, for example by scanning their Emirates ID, before their first instalment plan is approved. The checkout uses the phone's camera for that check. If your app has not declared and requested camera access, verification can fail and the customer may abandon the purchase, so test this flow on real iPhones and Android phones.",
    },
    {
      q: "Can the app mark an order as paid when the SDK returns success?",
      a: "No. The SDK result is a signal to start checking, not proof of payment. Customers can close the app, lose connection or approve the plan in another app, so your server must confirm the status with the provider's API and webhooks before marking the order paid, capturing it or shipping. Both providers test this during go-live, including approvals that finish after the customer has left.",
    },
    {
      q: "Do Tabby and Tamara replace my card payment gateway?",
      a: "No. They are added as extra payment methods alongside cards, Apple Pay and Google Pay, which most UAE apps take through a gateway such as Network International, Telr, PayTabs or Checkout.com. Some gateways, including Checkout.com, can also offer Tabby and Tamara themselves, which reduces the number of separate integrations, dashboards and settlement reports your team has to manage.",
    },
  ],
  relatedLinks: [
    { href: "/app-cost-estimator", label: "Estimate the cost of your app" },
    { href: "/locations/uae", label: "App development for UAE businesses" },
    { href: "/locations/uae/dubai", label: "App development in Dubai" },
    { href: "/blog/arabic-rtl-app-development-uae", label: "Arabic and right-to-left apps for the UAE" },
    { href: "/blog/flutter-vs-react-native", label: "Flutter vs React Native: which should you choose?" },
  ],
};

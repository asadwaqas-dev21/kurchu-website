/** ──────────────────────────────────────────────
 *  App Ideas Library — /app-ideas/<slug>.
 *
 *  Each idea is a fixed plan written once (features, reasons, tips, FAQs);
 *  prices, timelines and wireframes are derived from the pricing table in
 *  lib/estimator.ts. Pages are fully static: no AI and no server work at
 *  request time.
 * ──────────────────────────────────────────────*/
import type { FeatureKey } from "./estimator";

export type AppIdea = {
  slug: string;
  /** "Salon booking app" — used in titles and headings. */
  name: string;
  /** Placeholder brand shown in the wireframes. */
  sampleName: string;
  category: string;
  /** Who it is for and what it does — the page's opening answer. */
  intro: string;
  audience: string;
  mvp: Array<[FeatureKey, string]>;
  later: Array<[FeatureKey, string]>;
  standOut: string[];
  launchTips: string[];
  questions: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const appIdeas: AppIdea[] = [
  {
    slug: "salon-booking-app",
    name: "Salon booking app",
    sampleName: "Glow Studio",
    category: "Beauty & wellness",
    intro:
      "A salon booking app lets clients pick a service, a stylist and a time slot, pay a deposit and get reminders — while the salon manages its calendar in one place and cuts no-shows.",
    audience: "Hair and beauty salons, barbers, nail and spa studios — single branches or small chains.",
    mvp: [
      ["accounts", "Clients keep their bookings, preferences and history in one account."],
      ["booking", "The core of the app: services, stylists and live time-slot availability."],
      ["payments", "A deposit at booking is the simplest way to reduce no-shows."],
      ["push", "Reminders the day before and an hour before the appointment."],
      ["admin", "Staff manage the calendar, stylists, services and prices from a web dashboard."],
    ],
    later: [
      ["reviews", "Ratings per stylist help new clients choose with confidence."],
      ["loyalty", "Points or a free tenth visit bring regulars back."],
      ["media", "Clients save reference photos of the style they want."],
      ["analytics", "See busy hours, top services and no-show rates."],
    ],
    standOut: [
      "Let clients rebook their last appointment in one tap.",
      "Show each stylist's portfolio so clients book the person, not just the slot.",
      "Offer a waitlist that fills cancelled slots automatically.",
    ],
    launchTips: [
      "Put a QR code at reception and on receipts — existing clients are your first users.",
      "Keep phone bookings in the same calendar from day one so nothing double-books.",
      "Start with deposits only for long or expensive services, not every booking.",
    ],
    questions: ["How many branches and stylists will use the calendar?", "Do you need deposits, full payment in the app, or pay at the salon?"],
    faqs: [
      {
        q: "Can the salon app work with walk-in clients too?",
        a: "Yes. Staff can add walk-ins and phone bookings from the dashboard, so the app's calendar always shows real availability and online clients never book a slot that is already taken.",
      },
      {
        q: "Should a salon app take full payment or a deposit?",
        a: "Most salons start with a deposit for longer or higher-value services. It reduces no-shows without putting off clients who prefer to pay in person, and you can switch to full prepayment later.",
      },
    ],
  },
  {
    slug: "food-delivery-app",
    name: "Food delivery app",
    sampleName: "Dastarkhwan",
    category: "Food & drink",
    intro:
      "A food delivery app lets customers browse restaurant menus, order and pay in a few taps and follow their rider live — with separate experiences for customers, restaurants and riders.",
    audience: "Restaurant groups, cloud kitchens, home-cook marketplaces and local delivery startups.",
    mvp: [
      ["accounts", "Customers save addresses, payment details and past orders."],
      ["listings", "Restaurants and their menus, with photos, prices and availability."],
      ["search", "Find a dish, cuisine or restaurant quickly."],
      ["cart_checkout", "Order several dishes, add notes and choose delivery or pickup."],
      ["payments", "Card and wallet payments, alongside cash on delivery where needed."],
      ["tracking", "Live rider location and order status from kitchen to door."],
      ["roles", "Separate flows for customers, restaurants and riders."],
      ["push", "Order confirmed, out for delivery and delivered alerts."],
      ["admin", "Manage restaurants, riders, orders, fees and refunds."],
    ],
    later: [
      ["reviews", "Ratings for dishes and restaurants build trust."],
      ["loyalty", "Rewards and promo codes for repeat orders."],
      ["chat", "Customers message the rider or restaurant about an order."],
      ["analytics", "Order volumes, delivery times and top restaurants."],
    ],
    standOut: [
      "Show an honest delivery time based on real kitchen and rider data.",
      "Let groups split one order between several people.",
      "Offer scheduled orders for office lunches and events.",
    ],
    launchTips: [
      "Launch in a small delivery radius you can serve well, then expand.",
      "Sign up enough restaurants before customers arrive — empty menus lose users fast.",
      "Decide early whether you employ riders or use a delivery partner; it changes the app.",
    ],
    questions: ["Will you run your own riders or use a delivery partner?", "Is it one restaurant brand or a marketplace of many?"],
    faqs: [
      {
        q: "Does a food delivery app need separate apps for riders?",
        a: "Not necessarily. One app with separate roles can serve customers, restaurants and riders at first; many businesses split the rider app out later, once rider volumes justify a dedicated experience.",
      },
      {
        q: "Can a food delivery app support cash on delivery?",
        a: "Yes. Cash on delivery can sit alongside card and wallet payments, with riders marking cash collected in the app so the dashboard reconciles every order.",
      },
    ],
  },
  {
    slug: "grocery-delivery-app",
    name: "Grocery delivery app",
    sampleName: "Fresh Basket",
    category: "Retail",
    intro:
      "A grocery delivery app lets shoppers fill a basket from a large catalogue, choose a delivery slot and pay online — with stock and substitutions handled by the store.",
    audience: "Supermarkets, local grocers, wholesale suppliers and quick-commerce startups.",
    mvp: [
      ["accounts", "Shoppers save addresses and reorder past baskets."],
      ["listings", "A large catalogue organised by aisle and category."],
      ["search", "Find products fast across thousands of items."],
      ["cart_checkout", "Build a basket, set quantities and note substitutions."],
      ["booking", "Choose a delivery slot that suits the shopper."],
      ["payments", "Pay online at checkout or on delivery."],
      ["push", "Slot reminders and order updates."],
      ["admin", "Manage stock, prices, slots and orders."],
    ],
    later: [
      ["tracking", "Live delivery tracking on the day."],
      ["subscriptions", "Weekly baskets and delivery memberships."],
      ["loyalty", "Points on every order."],
      ["analytics", "Best-sellers, basket size and slot demand."],
    ],
    standOut: [
      "Let shoppers approve substitutions before the order is packed.",
      "Make reordering last week's basket a single tap.",
      "Show slot capacity honestly so promised times are kept.",
    ],
    launchTips: [
      "Start with your best-selling few hundred products, not the whole store.",
      "Keep catalogue prices in sync with the till from day one.",
      "Limit slots at first so every delivery arrives on time.",
    ],
    questions: ["How many products will be in the app at launch?", "Does stock come from a POS or ERP system we should connect to?"],
    faqs: [
      {
        q: "How does a grocery app handle out-of-stock items?",
        a: "The usual approach is substitutions: shoppers choose a preferred alternative or 'no substitute' per item, and the picker confirms changes before delivery so the final bill matches what arrives.",
      },
      {
        q: "Can the grocery app connect to our existing stock system?",
        a: "Usually, yes — through an integration with your POS or ERP, so prices and stock stay in sync. That integration is priced separately because it depends on what your system supports.",
      },
    ],
  },
  {
    slug: "real-estate-app",
    name: "Real estate app",
    sampleName: "Prime Homes",
    category: "Property",
    intro:
      "A real estate app lets buyers and tenants search listings by location, price and type, view photos and maps, save favourites and contact the agent directly.",
    audience: "Estate agencies, property developers and listing portals.",
    mvp: [
      ["accounts", "Save favourite properties and searches."],
      ["listings", "Properties with price, size, features and status."],
      ["search", "Filter by area, price, bedrooms and property type."],
      ["maps", "See listings on a map and explore the neighbourhood."],
      ["media", "Photo galleries and floor plans for every property."],
      ["chat", "Message the agent about a property instantly."],
      ["admin", "Agents add and update listings from a dashboard."],
    ],
    later: [
      ["push", "Alerts when a new property matches a saved search."],
      ["booking", "Book viewings directly in the agent's calendar."],
      ["languages", "Arabic or other languages for wider markets."],
      ["analytics", "Most viewed listings and enquiry sources."],
    ],
    standOut: [
      "Send instant alerts the moment a matching property is listed.",
      "Show total monthly cost, not only the headline price.",
      "Let buyers book a viewing slot without a phone call.",
    ],
    launchTips: [
      "Import your existing listings so the app is full on day one.",
      "Make enquiry response time a team target — speed wins property leads.",
      "Add the listing link to every portal ad and social post.",
    ],
    questions: ["Are the listings yours only, or from several agencies?", "Do listings come from a CRM or portal feed we should sync with?"],
    faqs: [
      {
        q: "Can a real estate app sync with our CRM?",
        a: "Yes, through an integration with your CRM or listing feed, so agents update a property once and the app reflects it. It is scoped separately once we know which system you use.",
      },
      {
        q: "Does a real estate app need a map view?",
        a: "For most buyers, yes — location is usually the first filter. A map lets them explore an area visually and see nearby listings, which keeps them browsing longer.",
      },
    ],
  },
  {
    slug: "school-management-app",
    name: "School management app",
    sampleName: "Bright Campus",
    category: "Education",
    intro:
      "A school management app connects parents, teachers and administrators: attendance, announcements, homework, fees and messages in one place, in the languages your families use.",
    audience: "Schools, academies, tuition centres and education groups.",
    mvp: [
      ["accounts", "Secure sign-in for parents, teachers and staff."],
      ["roles", "Each role sees only what it needs — parent, teacher, admin."],
      ["push", "Announcements, absences and reminders reach parents instantly."],
      ["email_sms", "SMS backup for parents who miss app notifications."],
      ["payments", "Parents pay fees online with receipts."],
      ["admin", "Manage classes, students, fees and announcements."],
    ],
    later: [
      ["chat", "Parent–teacher messaging with school oversight."],
      ["media", "Share homework, worksheets and class photos."],
      ["languages", "English and Urdu or Arabic for every family."],
      ["analytics", "Attendance trends and fee collection reports."],
    ],
    standOut: [
      "Notify parents within minutes when a child is marked absent.",
      "Show each family one fee balance with a full payment history.",
      "Keep parent–teacher messages inside school hours and visible to admins.",
    ],
    launchTips: [
      "Roll out one class or grade first, fix the details, then go school-wide.",
      "Give teachers a short training session — adoption starts with them.",
      "Send the app link with the next fee notice so every family installs it.",
    ],
    questions: ["How many students, classes and campuses?", "Do you already use software for fees or attendance that we should connect to?"],
    faqs: [
      {
        q: "How is children's data protected in a school app?",
        a: "Access is limited by role, data is encrypted, and only the information the school genuinely needs is collected. Hosting location and consent wording are agreed with the school during discovery.",
      },
      {
        q: "Can a school app work in Urdu or Arabic?",
        a: "Yes. Interfaces can support English with Urdu or Arabic, including right-to-left layouts, so every family can use the app in the language they read most comfortably.",
      },
    ],
  },
  {
    slug: "fitness-coaching-app",
    name: "Fitness coaching app",
    sampleName: "Coach Fit",
    category: "Health & fitness",
    intro:
      "A fitness coaching app lets trainers deliver workout plans, track client progress and stay in touch — and lets clients follow their programme and message their coach from their phone.",
    audience: "Personal trainers, coaching businesses, gyms and online fitness brands.",
    mvp: [
      ["accounts", "Clients sign in to their own programme."],
      ["profiles", "Goals, measurements and progress history for each client."],
      ["subscriptions", "Monthly coaching plans billed automatically."],
      ["media", "Workout videos and progress photos."],
      ["chat", "Clients ask their coach questions between sessions."],
      ["push", "Workout reminders and check-in prompts."],
    ],
    later: [
      ["streaming", "Live or on-demand classes inside the app."],
      ["analytics", "Progress charts for clients and coaches."],
      ["social", "A community feed to keep clients motivated."],
      ["ai", "Suggested adjustments based on logged workouts."],
    ],
    standOut: [
      "Weekly check-ins with photos keep clients accountable.",
      "Let coaches reuse plan templates and personalise them in minutes.",
      "Celebrate streaks and milestones to cut drop-off.",
    ],
    launchTips: [
      "Move your existing clients into the app first — they become your proof.",
      "Offer a free first week rather than a long free trial.",
      "Record a short welcome video so new clients feel coached from day one.",
    ],
    questions: ["Is it one coach or a team of trainers?", "Will clients pay inside the app or through your existing payments?"],
    faqs: [
      {
        q: "Do fitness app subscriptions go through Apple and Google?",
        a: "Digital content and coaching sold inside the app usually must use App Store and Google Play billing, which take a commission. Some services delivered in person can use other payment methods — we confirm the right option for your model.",
      },
      {
        q: "Can trainers upload their own workout videos?",
        a: "Yes. Coaches upload videos and build plans from a library, then assign them to clients. Video hosting is a running cost that grows with your library and audience.",
      },
    ],
  },
  {
    slug: "taxi-booking-app",
    name: "Taxi & ride-hailing app",
    sampleName: "City Ride",
    category: "Transport",
    intro:
      "A taxi or ride-hailing app lets riders request a car, see the driver on a live map, pay in the app and rate the trip — with a separate driver experience and dispatch dashboard.",
    audience: "Taxi companies, fleet operators, corporate transport and local ride-hailing startups.",
    mvp: [
      ["accounts", "Riders and drivers each sign in to their own experience."],
      ["roles", "Separate rider and driver flows in one system."],
      ["maps", "Pickup, drop-off and nearby drivers on a map."],
      ["tracking", "Live driver location from acceptance to arrival."],
      ["payments", "Card or cash payment with automatic fare receipts."],
      ["push", "Driver assigned, arriving and trip complete alerts."],
      ["admin", "Dispatch, driver management, fares and payouts."],
    ],
    later: [
      ["reviews", "Two-way ratings keep service quality high."],
      ["chat", "Rider–driver messaging without sharing numbers."],
      ["loyalty", "Ride credits for frequent riders."],
      ["analytics", "Demand by area and time, driver performance."],
    ],
    standOut: [
      "Show the fare before booking so riders trust the price.",
      "Let riders share their live trip with family for safety.",
      "Offer scheduled rides for airports and early mornings.",
    ],
    launchTips: [
      "Onboard enough drivers before launch — long waits lose riders permanently.",
      "Start in one city and the busiest routes.",
      "Use corporate accounts for steady weekday demand.",
    ],
    questions: ["Do you have an existing fleet, or will drivers join independently?", "How are fares calculated — meter, fixed zones or distance and time?"],
    faqs: [
      {
        q: "Does a taxi app need two separate apps?",
        a: "Riders and drivers need different experiences. They can start as roles inside one app to save cost, then split into two apps once both sides grow — the backend stays the same.",
      },
      {
        q: "Can a ride-hailing app accept cash?",
        a: "Yes. Cash can sit alongside card payments, with drivers confirming cash received in the app so payouts and commissions stay accurate in the dashboard.",
      },
    ],
  },
  {
    slug: "ecommerce-app",
    name: "E-commerce shopping app",
    sampleName: "Urban Threads",
    category: "Retail",
    intro:
      "An e-commerce app turns an online store into a fast, personal shopping experience: browse, search, save favourites, check out in a few taps and get notified about drops and offers.",
    audience: "Fashion, beauty and lifestyle brands, and online stores with repeat customers.",
    mvp: [
      ["accounts", "Saved addresses, wishlists and order history."],
      ["social_login", "Sign in with Google or Apple to cut checkout friction."],
      ["listings", "Product pages with variants, sizes and stock."],
      ["search", "Search and filters across the catalogue."],
      ["cart_checkout", "A fast checkout with saved details."],
      ["payments", "Cards, wallets and cash on delivery where relevant."],
      ["push", "New drops, back-in-stock and order updates."],
      ["admin", "Manage products, orders and promotions."],
    ],
    later: [
      ["reviews", "Product reviews with photos."],
      ["loyalty", "Points and member-only offers."],
      ["ai", "Personalised recommendations."],
      ["analytics", "Conversion, basket size and repeat-purchase rates."],
    ],
    standOut: [
      "Back-in-stock alerts recover sales your website loses.",
      "App-only early access to new drops rewards installs.",
      "One-tap reorder for consumables brings customers back.",
    ],
    launchTips: [
      "Connect to your existing store so products and orders stay in one place.",
      "Give a first-order discount for installing the app.",
      "Use push sparingly — a few relevant alerts beat daily promotions.",
    ],
    questions: ["Do you already sell on Shopify, WooCommerce or another platform?", "Roughly how many products and orders per month?"],
    faqs: [
      {
        q: "Do I need an app if I already have an online store?",
        a: "An app pays off when customers buy repeatedly — drops, replenishment, loyalty — because push notifications and saved details lift repeat orders. If most customers buy once, your mobile website may be enough.",
      },
      {
        q: "Can the app use my existing Shopify or WooCommerce store?",
        a: "Usually, yes. The app reads products, stock and orders from your existing store through an integration, so you manage everything in one place.",
      },
    ],
  },
  {
    slug: "doctor-appointment-app",
    name: "Doctor & clinic appointment app",
    sampleName: "CareSlot",
    category: "Healthcare",
    intro:
      "A doctor appointment app lets patients find a doctor, book an available slot and get reminders — while the clinic manages schedules, patient details and follow-ups from one dashboard.",
    audience: "Clinics, hospitals, diagnostic centres and multi-doctor practices.",
    mvp: [
      ["accounts", "Patients keep appointments and details in one secure account."],
      ["profiles", "Doctor profiles with specialty, timings and fees."],
      ["booking", "Live availability per doctor and clinic."],
      ["push", "Appointment reminders and schedule changes."],
      ["email_sms", "SMS confirmations for patients without the app open."],
      ["admin", "Reception manages schedules, bookings and patient records."],
    ],
    later: [
      ["payments", "Pay consultation fees in advance."],
      ["streaming", "Video consultations for follow-ups."],
      ["chat", "Secure messages between patient and clinic."],
      ["media", "Share reports and prescriptions."],
      ["languages", "Urdu or Arabic for wider patient reach."],
    ],
    standOut: [
      "Let patients join a waitlist for earlier slots.",
      "Send preparation instructions automatically before tests.",
      "Remind patients when a follow-up is due.",
    ],
    launchTips: [
      "Start with the doctors who have the longest phone queues.",
      "Train reception first — they keep the calendar accurate.",
      "Print the app link on prescriptions and appointment cards.",
    ],
    questions: ["How many doctors and locations?", "Do patient records live in existing clinic software we should connect to?"],
    faqs: [
      {
        q: "How is patient data kept private in a clinic app?",
        a: "Access is limited by role, data is encrypted in transit and at rest, and every access is logged. Health-data rules differ by country, so hosting and consent are agreed with your compliance adviser during discovery.",
      },
      {
        q: "Can the app add video consultations later?",
        a: "Yes. Booking is designed so a video consultation can be added as another appointment type later, without rebuilding the scheduling system.",
      },
    ],
  },
  {
    slug: "buy-sell-marketplace-app",
    name: "Buy & sell marketplace app",
    sampleName: "Bazaar Hub",
    category: "Marketplace",
    intro:
      "A buy and sell marketplace app lets people list items with photos, find what they want nearby, chat with sellers and arrange the deal — with moderation to keep the community safe.",
    audience: "Classifieds startups, niche marketplaces (fashion, electronics, vehicles) and community platforms.",
    mvp: [
      ["accounts", "Buyers and sellers manage listings and messages."],
      ["listings", "Item listings with price, condition and location."],
      ["search", "Search and filter by category, price and area."],
      ["media", "Several photos per listing, taken in the app."],
      ["chat", "Buyers and sellers negotiate without sharing numbers."],
      ["push", "New messages and offers on your listings."],
      ["admin", "Moderate listings, handle reports and ban bad actors."],
    ],
    later: [
      ["reviews", "Seller ratings build trust between strangers."],
      ["payments", "Secure in-app payment for shipped items."],
      ["maps", "Browse listings near you on a map."],
      ["analytics", "Popular categories and listing performance."],
    ],
    standOut: [
      "Make listing an item take under a minute from photo to post.",
      "Verify sellers with a phone check and badge.",
      "Suggest a fair price from similar listings.",
    ],
    launchTips: [
      "Seed listings in one niche and one city before going broad.",
      "Moderate quickly in the early weeks — trust is the product.",
      "Encourage sellers to share their listings on social media.",
    ],
    questions: ["Will buyers and sellers meet in person, or will items be shipped?", "Is it one category or a general marketplace?"],
    faqs: [
      {
        q: "How do marketplace apps prevent scams?",
        a: "With layers: phone-verified accounts, in-app chat that keeps numbers private, reporting tools, ratings and fast moderation from the admin dashboard. In-app payment with buyer protection can follow once volumes justify it.",
      },
      {
        q: "Should a marketplace app take payments at launch?",
        a: "Many marketplaces launch with chat and meet-in-person deals, then add in-app payments once trust and volume grow. It keeps the first version cheaper and faster to launch.",
      },
    ],
  },
];

export const getAppIdea = (slug: string) => appIdeas.find((idea) => idea.slug === slug);
export const appIdeaPath = (idea: AppIdea) => `/app-ideas/${idea.slug}`;

import type { ReactNode } from "react";
import type { FeatureKey } from "@/app/lib/estimator";

/**
 * Rough phone wireframes for an estimate — drawn entirely from the feature
 * list the estimator already chose, so they cost no extra AI calls. Each
 * feature maps to a hand-built screen template; the visitor's app name is the
 * only text that comes from the model (rendered as plain text by React).
 */

const MAX_SCREENS = 6;

/* ── Building blocks ───────────────────────────── */
const L = ({ w = "100%", strong }: { w?: string; strong?: boolean }) => <i className={`wf-l${strong ? " is-strong" : ""}`} style={{ width: w }} />;
const Img = ({ h = 56, children }: { h?: number; children?: ReactNode }) => (
  <span className="wf-img" style={{ height: h }}>
    {children}
  </span>
);
const Btn = ({ children, ghost }: { children: ReactNode; ghost?: boolean }) => <span className={`wf-btn${ghost ? " is-ghost" : ""}`}>{children}</span>;
const Field = ({ children }: { children: ReactNode }) => <span className="wf-field">{children}</span>;
const Card = ({ children, accent }: { children: ReactNode; accent?: boolean }) => <span className={`wf-card${accent ? " is-accent" : ""}`}>{children}</span>;
const Row = ({ children }: { children: ReactNode }) => <span className="wf-row2">{children}</span>;
const Avatar = ({ size = 18 }: { size?: number }) => <i className="wf-av" style={{ width: size, height: size }} />;
const Stars = () => <span className="wf-stars">★★★★★</span>;
const MapView = ({ route }: { route?: boolean }) => (
  <span className="wf-map">
    {route && <i className="wf-route" />}
    <i className="wf-pin" style={{ left: "28%", top: "62%" }} />
    <i className="wf-pin is-accent" style={{ left: route ? "68%" : "58%", top: route ? "26%" : "38%" }} />
    {!route && <i className="wf-pin" style={{ left: "76%", top: "70%" }} />}
  </span>
);

type Screen = { id: string; title: string; body: ReactNode };
type Flags = { push: boolean; languages: boolean; offline: boolean };

/* ── Screen templates, by feature ──────────────── */
function home(has: (k: FeatureKey) => boolean): Screen {
  return {
    id: "home",
    title: "Home",
    body: (
      <>
        <L w="45%" />
        <L w="75%" strong />
        {has("booking") ? (
          <Card accent>
            <L w="50%" />
            <L w="80%" strong />
            <Btn ghost>Reschedule</Btn>
          </Card>
        ) : has("tracking") ? (
          <Card accent>
            <L w="55%" />
            <span className="wf-progress">
              <i style={{ width: "60%" }} />
            </span>
            <L w="40%" />
          </Card>
        ) : (
          <Img h={64} />
        )}
        {has("listings") || has("cart_checkout") ? (
          <span className="wf-grid2">
            {[0, 1].map((i) => (
              <span key={i}>
                <Img h={42} />
                <L w="80%" />
              </span>
            ))}
          </span>
        ) : (
          [0, 1].map((i) => (
            <Card key={i}>
              <L w="70%" strong />
              <L w="90%" />
            </Card>
          ))
        )}
      </>
    ),
  };
}

const TEMPLATES: Array<{ key: FeatureKey; screen: (has: (k: FeatureKey) => boolean) => Screen }> = [
  {
    key: "booking",
    screen: (has) => ({
      id: "booking",
      title: "Book",
      body: (
        <>
          <L w="50%" strong />
          <span className="wf-days">
            {["M", "T", "W", "T", "F"].map((d, i) => (
              <i key={i} className={i === 2 ? "is-on" : undefined}>
                {d}
              </i>
            ))}
          </span>
          <L w="35%" />
          <span className="wf-slots">
            {["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"].map((t, i) => (
              <i key={t} className={i === 3 ? "is-on" : undefined}>
                {t}
              </i>
            ))}
          </span>
          <Btn>{has("payments") ? "Pay deposit & book" : "Confirm booking"}</Btn>
        </>
      ),
    }),
  },
  {
    key: "listings",
    screen: (has) => ({
      id: "browse",
      title: "Browse",
      body: (
        <>
          {has("search") && <Field>Search…</Field>}
          <span className="wf-chips">
            <i className="is-on" />
            <i />
            <i />
          </span>
          <span className="wf-grid2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                <Img h={46} />
                <L w="85%" />
                <L w="45%" strong />
              </span>
            ))}
          </span>
        </>
      ),
    }),
  },
  {
    key: "tracking",
    screen: () => ({
      id: "tracking",
      title: "Live tracking",
      body: (
        <>
          <MapView route />
          <Card>
            <L w="60%" strong />
            <L w="40%" />
            <span className="wf-steps">
              <i className="is-on" />
              <i className="is-on" />
              <i />
            </span>
          </Card>
        </>
      ),
    }),
  },
  {
    key: "maps",
    screen: () => ({
      id: "map",
      title: "Nearby",
      body: (
        <>
          <MapView />
          <Card>
            <L w="65%" strong />
            <L w="45%" />
            <Btn ghost>Directions</Btn>
          </Card>
        </>
      ),
    }),
  },
  {
    key: "streaming",
    screen: () => ({
      id: "player",
      title: "Watch",
      body: (
        <>
          <Img h={92}>
            <i className="wf-play" />
          </Img>
          <span className="wf-progress">
            <i style={{ width: "35%" }} />
          </span>
          <L w="70%" strong />
          {[0, 1].map((i) => (
            <Row key={i}>
              <Img h={26} />
              <span>
                <L w="80%" />
                <L w="50%" />
              </span>
            </Row>
          ))}
        </>
      ),
    }),
  },
  {
    key: "social",
    screen: () => ({
      id: "feed",
      title: "Feed",
      body: (
        <>
          {[0, 1].map((i) => (
            <Card key={i}>
              <Row>
                <Avatar />
                <span>
                  <L w="60%" strong />
                </span>
              </Row>
              <Img h={52} />
              <span className="wf-likes">♥ ● ↗</span>
            </Card>
          ))}
        </>
      ),
    }),
  },
  {
    key: "chat",
    screen: () => ({
      id: "chat",
      title: "Messages",
      body: (
        <>
          <span className="wf-bubble">
            <L w="80%" />
          </span>
          <span className="wf-bubble is-me">
            <L w="70%" />
          </span>
          <span className="wf-bubble">
            <L w="90%" />
            <L w="50%" />
          </span>
          <span className="wf-bubble is-me">
            <L w="55%" />
          </span>
          <Field>Type a message…</Field>
        </>
      ),
    }),
  },
  {
    key: "ai",
    screen: () => ({
      id: "assistant",
      title: "Assistant",
      body: (
        <>
          <span className="wf-bubble is-me">
            <L w="70%" />
          </span>
          <span className="wf-bubble is-ai">
            <L w="90%" />
            <L w="80%" />
            <L w="55%" />
          </span>
          <span className="wf-chips">
            <i className="is-on" />
            <i />
          </span>
          <Field>✦ Ask anything…</Field>
        </>
      ),
    }),
  },
  {
    key: "cart_checkout",
    screen: () => ({
      id: "checkout",
      title: "Checkout",
      body: (
        <>
          {[0, 1, 2].map((i) => (
            <Row key={i}>
              <Img h={26} />
              <span>
                <L w="75%" />
                <L w="35%" strong />
              </span>
            </Row>
          ))}
          <span className="wf-total">
            <L w="30%" />
            <L w="25%" strong />
          </span>
          <Btn>Pay now</Btn>
        </>
      ),
    }),
  },
  {
    key: "payments",
    screen: () => ({
      id: "payment",
      title: "Payment",
      body: (
        <>
          <Card accent>
            <L w="40%" />
            <L w="55%" strong />
          </Card>
          <Field>Card number</Field>
          <span className="wf-grid2">
            <Field>MM / YY</Field>
            <Field>CVC</Field>
          </span>
          <Btn>Pay securely</Btn>
        </>
      ),
    }),
  },
  {
    key: "subscriptions",
    screen: () => ({
      id: "plans",
      title: "Plans",
      body: (
        <>
          {["Monthly", "Yearly", "Lifetime"].map((plan, i) => (
            <Card key={plan} accent={i === 1}>
              <L w="45%" strong />
              <L w="70%" />
            </Card>
          ))}
          <Btn>Subscribe</Btn>
        </>
      ),
    }),
  },
  {
    key: "reviews",
    screen: () => ({
      id: "reviews",
      title: "Reviews",
      body: (
        <>
          <span className="wf-score">
            <b>4.8</b>
            <Stars />
          </span>
          {[0, 1, 2].map((i) => (
            <Row key={i}>
              <Avatar />
              <span>
                <L w="50%" strong />
                <L w="90%" />
              </span>
            </Row>
          ))}
        </>
      ),
    }),
  },
  {
    key: "loyalty",
    screen: () => ({
      id: "rewards",
      title: "Rewards",
      body: (
        <>
          <Card accent>
            <L w="35%" />
            <b className="wf-big">1,250 pts</b>
            <span className="wf-progress">
              <i style={{ width: "70%" }} />
            </span>
          </Card>
          {[0, 1, 2].map((i) => (
            <Row key={i}>
              <Img h={22} />
              <span>
                <L w="70%" />
              </span>
            </Row>
          ))}
        </>
      ),
    }),
  },
  {
    key: "media",
    screen: () => ({
      id: "upload",
      title: "Photos",
      body: (
        <>
          <span className="wf-grid3">
            <span className="wf-add">+</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <Img key={i} h={40} />
            ))}
          </span>
          <Btn>Upload</Btn>
        </>
      ),
    }),
  },
  {
    key: "profiles",
    screen: () => ({
      id: "profile",
      title: "Profile",
      body: (
        <>
          <span className="wf-center">
            <Avatar size={44} />
            <L w="45%" strong />
            <L w="30%" />
          </span>
          {[0, 1, 2, 3].map((i) => (
            <span className="wf-setting" key={i}>
              <L w="55%" />
              <i>›</i>
            </span>
          ))}
        </>
      ),
    }),
  },
  {
    key: "accounts",
    screen: (has) => ({
      id: "signin",
      title: "Sign in",
      body: (
        <>
          <L w="60%" strong />
          <Field>Email</Field>
          <Field>Password</Field>
          <Btn>Sign in</Btn>
          {has("social_login") && (
            <>
              <Btn ghost>Continue with Apple</Btn>
              <Btn ghost>Continue with Google</Btn>
            </>
          )}
          <L w="50%" />
        </>
      ),
    }),
  },
];

function Phone({ app, screen, flags, withPush }: { app: string; screen: Screen; flags: Flags; withPush: boolean }) {
  return (
    <figure className="wf-phone">
      <div className="wf-screen">
        <div className="wf-status">
          <span>9:41</span>
          <i className="wf-island" />
          <span>●●●</span>
        </div>
        {withPush && (
          <div className="wf-push">
            <b>{app}</b>
            <span>New update for you</span>
          </div>
        )}
        <div className="wf-head">
          <span className="wf-app">{app}</span>
          {flags.languages && <span className="wf-lang">EN | ع</span>}
        </div>
        <b className="wf-title">{screen.title}</b>
        <div className="wf-body">{screen.body}</div>
        {flags.offline && screen.id === "home" && <span className="wf-offline">Saved for offline</span>}
        <div className="wf-tabs" aria-hidden="true">
          <i className="is-on" />
          <i />
          <i />
          <i />
        </div>
      </div>
      <figcaption>{screen.title}</figcaption>
    </figure>
  );
}

function Dashboard({ app, analytics }: { app: string; analytics: boolean }) {
  return (
    <figure className="wf-web">
      <div className="wf-browser">
        <div className="wf-bar">
          <i />
          <i />
          <i />
          <span>admin.{app.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourapp"}.com</span>
        </div>
        <div className="wf-dash">
          <span className="wf-side">
            <b>{app}</b>
            {[0, 1, 2, 3, 4].map((i) => (
              <L key={i} w={`${60 + ((i * 13) % 30)}%`} />
            ))}
          </span>
          <span className="wf-main">
            <span className="wf-tiles">
              {[0, 1, 2].map((i) => (
                <Card key={i}>
                  <L w="50%" />
                  <b className="wf-big">{["1,284", "86", "$4.2k"][i]}</b>
                </Card>
              ))}
            </span>
            {analytics && (
              <span className="wf-chart">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </span>
            )}
            {[0, 1, 2, 3].map((i) => (
              <span className="wf-tr" key={i}>
                <L w="30%" />
                <L w="20%" />
                <L w="15%" strong />
              </span>
            ))}
          </span>
        </div>
      </div>
      <figcaption>Admin dashboard (web)</figcaption>
    </figure>
  );
}

/** Up to six phone screens for the MVP features, plus the web dashboard when the plan has one. */
export function AppWireframes({ name, features }: { name: string; features: FeatureKey[] }) {
  const set = new Set(features);
  const has = (key: FeatureKey) => set.has(key);
  const app = name || "Your app";
  const flags: Flags = { push: has("push"), languages: has("languages"), offline: has("offline") };

  const screens: Screen[] = [home(has)];
  for (const template of TEMPLATES) {
    if (screens.length >= MAX_SCREENS) break;
    // Payments get their own screen only when there is no checkout to carry them.
    if (template.key === "payments" && (has("cart_checkout") || has("booking"))) continue;
    if (has(template.key)) screens.push(template.screen(has));
  }

  return (
    <div className="wf">
      <div className="wf-phones">
        {screens.map((screen, i) => (
          <Phone key={screen.id} app={app} screen={screen} flags={flags} withPush={flags.push && i === 0} />
        ))}
      </div>
      {has("admin") && <Dashboard app={app} analytics={has("analytics")} />}
    </div>
  );
}

/** ──────────────────────────────────────────────
 *  "Ask Kurchu" limits, shared by the widget and /api/chat.
 *  Kept in their own file so the client bundle never pulls in the
 *  assistant's instructions.
 * ──────────────────────────────────────────────*/

/** Longest message a visitor can type — enough for a detailed question or brief. */
export const MAX_INPUT_CHARS = 500;

/** Visitor messages per conversation; after this the widget suggests starting over or emailing the team. */
export const MAX_VISITOR_MESSAGES = 20;

/** Most recent messages sent to the model — enough context, bounded cost. */
export const HISTORY_SENT = 12;

/** Longest assistant reply kept in that history (replies are written to stay far below this). */
export const MAX_REPLY_CHARS = 1500;

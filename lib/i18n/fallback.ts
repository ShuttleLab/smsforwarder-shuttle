// Deep-merge a locale's messages over the English base so any key missing from a
// partially-translated locale falls back to English instead of showing a raw key.

type Msgs = Record<string, unknown>;

export function mergeWithFallback(locale: Msgs, english: Msgs): Msgs {
  const out: Msgs = { ...english };
  for (const key of Object.keys(locale)) {
    const lv = locale[key];
    const ev = english[key];
    if (
      lv && ev &&
      typeof lv === "object" && typeof ev === "object" &&
      !Array.isArray(lv) && !Array.isArray(ev)
    ) {
      out[key] = mergeWithFallback(lv as Msgs, ev as Msgs);
    } else if (lv !== undefined && lv !== "") {
      out[key] = lv;
    }
  }
  return out;
}

import type { Entry } from "./interfaces/entry.interface.ts";
import { nanoid } from "nanoid";
import { AppError } from "../utils/app.error.js";

export class UrlsService {
  private store = new Map<string, Entry>();

  shorten = (url: string) => {
    const code = nanoid(7);
    this.store.set(code, { original: url, clicks: 0 });
    return code;
  };

  stats = (code: string): Entry => {
    const entry = this.store.get(code);
    if (!entry) throw new AppError(404, "URL not found");
    return entry;
  };

  increment = (code: string) => {
    const entry = this.store.get(code);
    if (!entry) throw new AppError(404, "URL not found");
    entry.clicks++;
    return entry;
  };
}

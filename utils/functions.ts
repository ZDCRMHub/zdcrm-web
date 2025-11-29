import { subMonths } from "date-fns";

export const today = new Date();
export const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
export const monthsAgo = subMonths(new Date(), 20);

export const toNumber = (v: unknown): number => {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace(/[,₦\s]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
};

export const buildQuery = (params: Record<string, any>) => {
  if (!params) return "";
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  );
  const query = new URLSearchParams(filtered);
  return query.toString() ? `?${query.toString()}` : "";
};

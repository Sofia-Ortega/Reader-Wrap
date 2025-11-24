import { useCallback, useEffect, useState } from "react";
import { IBookStats } from "../../utils/types";
import { readBookStatsFromLocalStorage } from "../../utils/bookStatsUtil";
import { defaultIBookStats } from "../data/defaultIBookStats";

export function useBookStats() {
  const [bookStats, setBookStats] = useState<IBookStats>(defaultIBookStats);

  const refresh = useCallback(() => {
    const stored = readBookStatsFromLocalStorage();
    if (stored !== null) setBookStats(stored);
    console.log("stored:", stored);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { bookStats, refresh };
}

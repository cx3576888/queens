export async function reportResult(data: any) {
  try {
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.warn("[util] Report result error:", res.status, res.statusText);
    } else {
      console.log("[util] Report result success:", data);
    }
  } catch (error) {
    console.error("[util] Fetch Error:", error);
  }
}

const LOCAL_STORAGE_KEY = "my_scores";

export function initLocalStorage() {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
  }
}

export function saveToLocalStorage(data: any) {
  const scores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  scores[data.puzzleNumber] = [...scores[data.puzzleNumber] || [], data];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));
}

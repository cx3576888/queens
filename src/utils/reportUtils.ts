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

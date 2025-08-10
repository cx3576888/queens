export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = req.body;
    console.log("[Vercel] Data comes:", body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[Vercel] Error when data comes:", error);
    return res.status(400).json({ ok: false, error: String(error) });
  }
}

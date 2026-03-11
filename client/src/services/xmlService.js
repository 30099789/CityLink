export async function fetchXML(filename) {
  try {
    const res = await fetch(`/xml/${filename}`);
    return await res.text();
  } catch { return null; }
}

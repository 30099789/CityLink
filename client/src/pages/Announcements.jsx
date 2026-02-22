import { useEffect, useState } from "react";

export default function Announcements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/src/data/announcements.xml")
      .then((res) => res.text())
      .then((xmlText) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const data = Array.from(
          xml.getElementsByTagName("announcement")
        ).map((item) => ({
          title: item.getElementsByTagName("title")[0]?.textContent || "",
          date: item.getElementsByTagName("date")[0]?.textContent || "",
        }));

        setItems(data);
      });
  }, []);

  return (
    <main>
      <h1>Announcements</h1>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.date}</p>
        </div>
      ))}
    </main>
  );
}
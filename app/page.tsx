"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    styleMode: "",
    productType: "",
    mainStoneSize: "",
    totalCaratWeight: "",
    stoneShape: "",
    material: "",
    plating: "",
    designHighlights: "",
    occasions: "",
    price: "",
    keywords: "",
  });

  const [result, setResult] = useState({
    titleA: "",
    titleB: "",
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    html: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ✅ 必填校验
  const requiredFields = [
    "styleCode",
    "productType",
    "mainStoneSize",
    "totalCaratWeight",
    "stoneShape",
    "material",
    "plating",
    "designHighlights",
    "occasions",
    "price",
"keywords",
"priceLevel",
  ];

  const isFormValid = requiredFields.every(
    (key) => form[key as keyof typeof form]?.trim() !== ""
  );

  async function handleGenerate() {
    // ❗ 再做一层保险校验
    if (!isFormValid) {
      alert("请把所有信息填写完整后再生成文案");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: form }),
      });

      const data = await res.json();
      const text = data.result || "";

      const get = (label: string) => {
        const reg = new RegExp(`${label}:(.*?)(?=\\n\\d+\\. |$)`, "s");
        return text.match(reg)?.[1]?.trim() || "";
      };

      setResult({
        titleA: get("1\\. Title A"),
        titleB: get("2\\. Title B"),
        b1: get("3\\. Bullet Point 1"),
        b2: get("4\\. Bullet Point 2"),
        b3: get("5\\. Bullet Point 3"),
        b4: get("6\\. Bullet Point 4"),
        b5: get("7\\. Bullet Point 5"),
        html: get("8\\. HTML Description"),
      });
    } catch (err) {
      alert("生成失败，请重试");
    }

    setLoading(false);
  }

  const Input = (label: string, name: string, placeholder = "") => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, color: "#333", marginBottom: 4 }}>
        {label}
      </div>
      <input
        name={name}
        value={(form as any)[name]}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 40,
          padding: "0 10px",
          borderRadius: 8,
          border: "1px solid #ddd",
          color: "#111",
        }}
      />
    </div>
  );

  const Output = (label: string, value: string) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, color: "#111", marginBottom: 4 }}>
        {label}
      </div>
      <textarea
        value={value}
        readOnly
        style={{
          width: "100%",
          height: label.includes("Title") ? 60 : 90,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ddd",
          color: "#111",
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: 30, background: "#f5f6f7", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          background: "#fff",
          padding: 30,
          borderRadius: 16,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 28,
            marginBottom: 20,
            color: "#000",
            fontWeight: 700,
          }}
        >
          昇达珠宝亚马逊团队文案工具
        </h1>

        {/* 进度条 */}
        {loading && (
          <div
            style={{
              height: 4,
              background: "#000",
              width: "100%",
              marginBottom: 20,
              animation: "loading 1s linear infinite",
            }}
          />
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 30,
          }}
        >
          {/* 左侧输入 */}
          <div>
            {Input("款号", "styleCode", "如 HR0123")}
            {Input("产品类型", "productType", "RING")}
            {Input("主石尺寸", "mainStoneSize", "2CT")}
            {Input("总克拉重", "totalCaratWeight", "3CTTW")}
            {Input("石型", "stoneShape", "Round")}
            {Input("材质", "material", "S925")}
            {Input("电镀", "plating", "18K White Gold")}
            {Input("设计亮点", "designHighlights", "solitaire / halo")}
            {Input("佩戴场景", "occasions", "wedding")}
            {Input("价格（自动影响文案风格）", "price", "如 149.99")}
            {Input("关键词", "keywords", "moissanite ring")}

            <button
              onClick={handleGenerate}
              disabled={!isFormValid || loading}
              style={{
                width: "100%",
                height: 50,
                background: "#000",
                color: "#fff",
                borderRadius: 10,
                marginTop: 10,
                fontSize: 16,
                opacity: !isFormValid || loading ? 0.5 : 1,
                cursor: !isFormValid || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "生成中..." : "生成文案"}
            </button>
          </div>

          {/* 右侧输出 */}
          <div>
            {Output("Title A（SEO）", result.titleA)}
            {Output("Title B（CTR）", result.titleB)}
            {Output("Bullet Point 1", result.b1)}
            {Output("Bullet Point 2", result.b2)}
            {Output("Bullet Point 3", result.b3)}
            {Output("Bullet Point 4", result.b4)}
            {Output("Bullet Point 5", result.b5)}
            {Output("HTML Description", result.html)}
          </div>
        </div>
      </div>
    </div>
  );
}
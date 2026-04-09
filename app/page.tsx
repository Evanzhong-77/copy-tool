"use client";

import { useState } from "react";

export default function Home() {
  
  const [form, setForm] = useState({
  styleMode: "",
  productType: "",
  diamondWeight: "",
  stoneShape: "",
  material: "",
  plating: "",
  designHighlights: "",
  occasions: "",
  price: "",
  bulletKeyword1: "",
  bulletKeyword2: "",
  bulletKeyword3: "",
  bulletKeyword4: "",
  bulletKeyword5: "",
  bulletDirection1: "",
  bulletDirection2: "",
  bulletDirection3: "",
  bulletDirection4: "",
  bulletDirection5: "",
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

const [authed, setAuthed] = useState(false);
const [inputPwd, setInputPwd] = useState("");
const [loading, setLoading] = useState(false);

  if (!authed) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: 320,
          padding: 30,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20, color: "#000" }}>
          请输入访问密码
        </h2>

        <input
          type="password"
          placeholder="Enter Password"
          value={inputPwd}
          onChange={(e) => setInputPwd(e.target.value)}
          style={{
            width: "100%",
            height: 40,
            padding: "0 10px",
            borderRadius: 8,
            border: "1px solid #000",
            color: "#000",
            marginBottom: 15,
          }}
        />

        <button
          onClick={() => {
            if (inputPwd === "chengyuanzhubao") {
              setAuthed(true);
            } else {
              alert("Wrong password");
            }
          }}
          style={{
            width: "100%",
            height: 40,
            background: "#000",
            color: "#fff",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          进入系统
        </button>
      </div>
    </div>
  );
}

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ✅ 必填校验
  const requiredFields = [
  "productType",
  "diamondWeight",
  "stoneShape",
  "material",
  "plating",
  "designHighlights",
  "price",
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
        body: JSON.stringify(form),
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

  function copyAll() {
  const fullText = `
Title A:
${result.titleA}

Title B:
${result.titleB}

Bullet 1:
${result.b1}

Bullet 2:
${result.b2}

Bullet 3:
${result.b3}

Bullet 4:
${result.b4}

Bullet 5:
${result.b5}

HTML Description:
${result.html}
  `;

  navigator.clipboard.writeText(fullText);
  alert("已复制完整文案");
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
            {Input("产品类型", "productType", "RING")}
            {Input("钻石重量", "diamondWeight", "如 5.3CTTW (3CT)")}
            {Input("石型", "stoneShape", "Round")}
            {Input("材质", "material", "S925")}
            {Input("电镀", "plating", "18K White Gold")}
            {Input("设计亮点", "designHighlights", "solitaire / halo")}
            {Input("佩戴场景", "occasions", "wedding")}
            {Input("价格（自动影响文案风格）", "price", "如 149.99")}

            {Input("Title埋词", "styleMode", "如 moissanite engagement ring")}
            {Input("Bullet Point 1埋词", "bulletKeyword1")}
            {Input("Bullet Point 2埋词", "bulletKeyword2")}
            {Input("Bullet Point 3埋词", "bulletKeyword3")}
            {Input("Bullet Point 4埋词", "bulletKeyword4")}
            {Input("Bullet Point 5埋词", "bulletKeyword5")}

            {Input("Bullet Point 1方向", "bulletDirection1")}
            {Input("Bullet Point 2方向", "bulletDirection2")}
            {Input("Bullet Point 3方向", "bulletDirection3")}
            {Input("Bullet Point 4方向", "bulletDirection4")}
            {Input("Bullet Point 5方向", "bulletDirection5")}

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
            <button
  onClick={copyAll}
  style={{
    marginBottom: 10,
    padding: "8px 12px",
    borderRadius: 8,
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  }}
>
  一键复制完整文案
</button>
{Output("Title A（SEO）", result.titleA)}
{Output("Title B（CTR）", result.titleB)}
{Output("Bullet Point 1", result.b1)}
{Output("Bullet Point 2", result.b2)}
{Output("Bullet Point 3", result.b3)}
{Output("Bullet Point 4", result.b4)}
{Output("Bullet Point 5", result.b5)}
{Output("HTML Description", result.html)}
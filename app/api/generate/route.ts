import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
   const { price } = prompt;

let priceLevel: "low" | "mid" | "high" = "mid";

const numericPrice = Number(price) || 0;
if (numericPrice < 120) {
  priceLevel = "low";
} else if (numericPrice <= 180) {
  priceLevel = "mid";
} else {
  priceLevel = "high";
}
let strategy = "";
let titleStyle = "";

if (priceLevel === "low") {
  strategy = "Focus on value, affordability, and larger visual size than expected.";
} else if (priceLevel === "mid") {
  strategy = "Balance premium feel, durability, and everyday usability.";
} else {
  strategy = "Emphasize luxury feel, craftsmanship, and premium positioning.";
}

if (priceLevel === "low") {
  titleStyle = `
TITLE STYLE (LOW PRICE):
- Prioritize keyword coverage and clarity
- Emphasize size and value (e.g. 2CT, 3CTTW)
- Use practical buying terms: engagement, wedding, anniversary
- Keep structure straightforward and readable
- Avoid luxury or emotional positioning
`;
} else if (priceLevel === "mid") {
  titleStyle = `
TITLE STYLE (MID PRICE):
- Balance keyword coverage and perceived quality
- Include both specs and light premium cues (e.g. "premium feel")
- Keep clean structure, avoid keyword stuffing
- Maintain readability with slight upgrade tone
`;
} else if (priceLevel === "high") {
  titleStyle = `
TITLE STYLE (HIGH PRICE):
- Position the product as premium jewelry, not a budget alternative
- Emphasize craftsmanship, material quality, balance, presence, finish, and ownership pride
- Use premium language such as "premium", "refined", "fine jewelry", "statement", "elevated", "high-end"
- Focus on confidence, presence, design quality, and gifting significance
- Avoid all value-driven language completely
- Avoid all budget-driven language completely
- Avoid all comparison logic completely
- Do NOT mention savings, affordability, budget, cost-effectiveness, price advantage, or value per dollar
- Do NOT use phrases like "larger than", "better than", "more than typical", "compared to", "without diamond pricing", "travel replacement", or "cheaper listings"
- Do NOT frame the product as an alternative to lower-tier products
- Make the product feel worth the price through refinement, craftsmanship, and premium presentation
`;
}

    const res = await fetch("https://api.gptsapi.net/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.1",
        messages: [
          {
            role: "system",
            content: `
            PRICING STRATEGY (CRITICAL):
            ${strategy}

            ${titleStyle}

            HIGH PRICE STRICT ENFORCEMENT:
- For HIGH PRICE content, remove ALL comparison logic
- NEVER use phrases like "larger than", "better than", "more than typical"
- NEVER mention affordability, savings, budget, or price advantage
- NEVER compare with cheaper listings or diamonds
- Content MUST read like premium jewelry copy, not value copy
- Focus ONLY on presence, craftsmanship, refinement, and premium feel

You MUST strictly follow this pricing strategy when writing ALL content.

If the output does NOT clearly reflect this pricing strategy,
it will be considered FAILED and must be regenerated.

The tone, wording, and selling logic MUST align with this strategy.

----------------------

You are a TOP Amazon conversion-focused copywriter specialized in moissanite jewelry for the US market.

Your goal is to maximize BOTH:
1. Click-through rate (CTR)
2. Conversion rate (CVR)

You are NOT writing a brand story.
You are writing a listing that must SELL.

----------------------
STRICT OUTPUT RULES (MANDATORY)
----------------------

- Output MUST be 100% English
- NO Chinese, NO mixed language, NO brackets like （）
- NO explanations, NO extra text
- NO poetic or emotional storytelling
- NO weak adjectives unless supported by facts
- Every sentence must contain a selling point

----------------------
INPUT INFORMATION
----------------------

- Product Type: {productType}
- Style Type: {styleType}
- Main Stone Size: {mainStoneSize}
- Total Carat Weight: {totalCaratWeight}
- Stone Shape: {stoneShape}
- Stone Quality: D Color, VVS1
- Material: {material}
- Plating: {plating}
- Design Highlights: {designHighlights}
- Occasions: {occasions}
- Package Content: {packageContent}
- Keywords: {keywords}

----------------------
POSITIONING LOGIC
----------------------

- Competitors are priced at $60–$120
- This product must feel like a PREMIUM upgrade
- Emphasize:
  - Larger stone presence
  - Stronger material build
  - Higher perceived value
  - Better gifting experience

----------------------
CONVERSION RULES
----------------------

- Write like top-performing Amazon listings
- Prioritize clarity and selling points
- Focus on WHY to buy
- Avoid abstract or emotional writing

----------------------
TITLE RULES (SEO + CTR)
----------------------

- Max 200 characters
- Keyword MUST be at the beginning
- Must include:
  - "moissanite ring" OR "engagement ring"
  - "D Color VVS1"

- Structure:
  Core Keyword + Stone Size + Shape + Total Carat + Material + Use Case

----------------------
DUAL TITLE RULES (CRITICAL)
----------------------

You MUST generate TWO different titles:

Title A:
- SEO focused
- clean, keyword optimized
- prioritize keyword coverage and readability
- no aggressive marketing wording

Title B:
- CTR focused
- more aggressive and attention-grabbing
- include high-impact words when appropriate:
  "Large Carat", "Statement Ring", "Bold Look", "High Carat"
- must create stronger click appeal vs competitors

- MUST include at least ONE high-impact CTR phrase when appropriate
- Must create differentiation vs smaller carat competitors
- Avoid weak filler words like "high sparkle"
- Avoid stacking redundant words (wedding + bridal + proposal overload)
- Keep title clean, but slightly more aggressive for click-through

----------------------
BULLET POINT RULES
----------------------

Write EXACTLY 5 bullet points (200–300 characters each)

Structure:

Bullet 1: Stone size + visual impact  
Bullet 2: Material + durability  
Bullet 3: Design + comfort  
Bullet 4: Usage scenarios  
Bullet 5: Packaging + confidence  

----------------------
BULLET HEADING RULES
----------------------

- Each bullet MUST start with a 2–3 word heading
- NO punctuation
- Must be benefit-driven and strong

Examples:
- Large Stone Impact
- High Carat Coverage
- Durable Silver Build
- Low Profile Comfort
- Daily Wear Ready
- Premium Gift Packaging

----------------------
BULLET CONTENT RULES (CRITICAL UPGRADE)
----------------------

- First line MUST hit a strong factual selling point
- MUST include numbers (CT, CTTW)
- Avoid repetition
- Avoid vague wording

LOW PRICE ONLY:
- Comparison logic is allowed
- Competitor contrast is allowed
- Value-driven language is encouraged

MID PRICE:
- Use light comparison only when helpful
- Balance perceived quality and practicality

HIGH PRICE ONLY:
- NO comparison logic
- NO competitor contrast
- NO price-value framing
- Focus on presence, refinement, craftsmanship, and premium ownership feeling

----------------------
BULLET 4 RULE (SCENARIO UPGRADE)
----------------------

- MUST include clear and SPECIFIC scenarios:
  engagement proposal, wedding ceremony, daily wear, travel use

- Avoid vague wording like:
  "timeless", "forever", "lifelong"

----------------------
BULLET 5 RULE
----------------------

- MUST include packaging + gifting + confidence
- SHOULD include comparison:
  better than basic packaging from cheaper listings

----------------------
HTML DESCRIPTION RULES
----------------------

- Length: 1200–1500 characters
- Use <br> ONLY

Structure:

1. Product advantage
2. Stone performance
3. Craftsmanship
4. Design
5. Usage
6. Packaging

----------------------
DESCRIPTION FIRST LINE RULE
----------------------

- MUST start with product specs or product advantage
- MUST include CT or CTTW

LOW PRICE:
- comparison language is allowed

MID PRICE:
- use restrained comparison only when necessary

HIGH PRICE:
- NO comparison language
- Open with premium presence, refinement, or craftsmanship

----------------------
DESCRIPTION CONVERSION BOOST (CRITICAL)
----------------------

- MUST include at least ONE decision-driving sentence

LOW PRICE example:
"This makes it a smart choice for buyers who want a larger look at an accessible price."

MID PRICE example:
"This makes it a reliable upgrade choice for buyers who want both visual impact and everyday wearability."

HIGH PRICE example:
"This makes it a compelling choice for buyers who want refined presence, premium craftsmanship, and a ring that feels worthy of important milestones."

----------------------
OUTPUT FORMAT
----------------------

1. Title A:
2. Title B:
3. Bullet Point 1:
4. Bullet Point 2:
5. Bullet Point 3:
6. Bullet Point 4:
7. Bullet Point 5:
8. HTML Description:
`,
          },
          {
            role: "user",
            content: JSON.stringify(prompt),
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    console.log("API返回：", data);

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content || "",
    });

  } catch (error) {
    return NextResponse.json({ result: "Error generating content" });
  }
}
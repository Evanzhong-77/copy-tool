import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const prompt = await req.json();
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
Style Mode: ${prompt.styleMode}

Your goal is to maximize BOTH:
1. Click-through rate (CTR)
2. Conversion rate (CVR)

You are NOT writing a brand story.
You are writing a listing that must SELL.
----------------------
SEARCH & CONVERSION CONTROL (CRITICAL)
----------------------

TITLE KEYWORD STACKING (CRITICAL):

- The title MUST aggressively stack high-search keywords in the first half.

- REQUIRED keyword structure (front-loaded):
  moissanite ring + (engagement ring OR wedding ring) + for women

- At least 3–4 core keywords MUST appear within the first 80 characters.

- Add 1–2 scenario keywords:
  proposal / bridal / anniversary / promise / gift

- Add 1–2 attribute keywords:
  handmade / sterling silver / white gold / dainty / minimalist / vintage / halo / solitaire

- Avoid wasting early title space on low-value words.

- The title should feel slightly "keyword dense" but still readable.

### BULLET STRUCTURE RULE (MANDATORY)

- Bullet 1 MUST combine: stone size + visual impact + core selling point
- Focus on real buyer concerns: size appearance, sparkle, durability, comfort, occasions
- Avoid repeated meaning across bullets
- NO generic luxury filler content

### SELLING PRIORITY RULE (MANDATORY)

- Each bullet MUST deliver a strong, clear reason to buy

- Priority order:
  1. Visual impact (size, presence)
  2. Material quality (real value)
  3. Wear experience (comfort, daily use)
  4. Use case (proposal, gift, occasion)
  5. Confidence (packaging, trust)

- If a sentence does NOT increase desire to buy → REMOVE it

- Every bullet must answer:
  "Why should I buy this instead of others?"

- Avoid neutral information
- Avoid descriptive-only sentences

Violation → INVALID

CONTENT QUALITY RULE:

- Every bullet must have a different purpose
- Every sentence must either increase conversion OR improve search coverage

BULLET STRUCTURE ENFORCEMENT (CRITICAL):

- Bullet 1: Stone size + visual impact + immediate value perception (MUST feel impressive at first glance)

- Bullet 2: Material + craftsmanship + durability (answer: will it last?)

- Bullet 3: Wearing experience + comfort + daily usability (answer: can I wear it every day?)

- Bullet 4: Occasions + gifting + emotional trigger (proposal / anniversary / gift)

- Bullet 5: Packaging + after-sales + confidence guarantee

STRICT RULES:
- Each bullet MUST focus on ONLY ONE core angle
- NO overlapping meaning between bullets
- If two bullets feel similar, rewrite one completely

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

- Product Type: ${prompt.productType}
- Diamond Weight: ${prompt.diamondWeight}
- Stone Shape: ${prompt.stoneShape}
- Material: ${prompt.material}
- Plating: ${prompt.plating}
- Design Highlights: ${prompt.designHighlights}
- Occasions: ${prompt.occasions}

- Title Keyword: ${prompt.styleMode}

- Bullet 1 Keyword: ${prompt.bulletKeyword1}
- Bullet 2 Keyword: ${prompt.bulletKeyword2}
- Bullet 3 Keyword: ${prompt.bulletKeyword3}
- Bullet 4 Keyword: ${prompt.bulletKeyword4}
- Bullet 5 Keyword: ${prompt.bulletKeyword5}

- Bullet 1 Direction: ${prompt.bulletDirection1}
- Bullet 2 Direction: ${prompt.bulletDirection2}
- Bullet 3 Direction: ${prompt.bulletDirection3}
- Bullet 4 Direction: ${prompt.bulletDirection4}
- Bullet 5 Direction: ${prompt.bulletDirection5}

----------------------
BULLET CONTROL SYSTEM (CRITICAL)
----------------------

Bullet Direction is the HIGHEST PRIORITY.

RULES:

1. If Bullet Direction is provided:
- You MUST strictly follow that direction
- You MUST NOT ignore it
- You MUST NOT replace it with your own idea

2. If Bullet Direction is EMPTY:

- You MUST use Reference Copy as structure and idea source

Reference Copy:
${prompt.referenceCopy}

- Extract writing style and structure
- Generate similar type of bullet content
- Do NOT copy wording directly
- Keep same level of detail and strength

- If BOTH Bullet Direction AND Reference Copy are EMPTY:
  → You MUST fallback to default bullet structure rules
  → You MUST still produce strong, detailed bullet content

3. Bullet Keyword Usage:
- If provided, MUST appear naturally in that bullet
- Do NOT force or repeat

4. Bullet Quality Upgrade:
- Each bullet SHOULD be 14–20 words
- MUST contain:
  → a concrete feature
  → a clear benefit
- MUST feel like a real selling point

If any bullet is generic, short, or vague → INVALID

----------------------
DIAMOND WEIGHT RULE (MANDATORY):

- Use Diamond Weight EXACTLY as provided
- MUST appear in Title OR Bullet 1
- MUST NOT be rewritten or split
----------------------

  HUMAN-LIKE WRITING ENFORCEMENT (CRITICAL):

- Write like an experienced Amazon operator, NOT a copywriter.

- Avoid exaggerated or dramatic language.

- Avoid phrases like:
  "stunning", "breathtaking", "timeless beauty", "luxury feel", "elevated elegance"

- Use practical, buyer-focused wording:
  → what it looks like on hand
  → how it feels to wear
  → whether it fits daily use
  → whether it matches expectations

- Keep sentences slightly imperfect and natural
  → do NOT sound overly polished or poetic

- The content should feel like:
  → written by a seller who understands customers
  → not a marketing script

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
- Must include:
  - "moissanite ring" OR "engagement ring"
  - "D Color VVS1"

----------------------
BULLET POINT RULES
----------------------

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
OUTPUT FORMAT HARD RULES (MANDATORY):

1. TITLE RULES
- Every word must start with a capital letter (Title Case)
- The first 80 characters must contain the most important keyword
- Do NOT repeat the same word more than once
- Do NOT repeat total carat weight or stone size more than once
- Keywords must be naturally expanded, not copied exactly as input

2. BULLET STRUCTURE RULES
- Each bullet must have a single clear purpose (no mixed logic)

3. NO REPETITION RULE
- Same word cannot appear twice in the same sentence
- Avoid repeating key phrases across bullets
- Do not reuse the same sentence structure

4. STONE WEIGHT RULE
- Diamond Weight can appear ONLY ONCE in the entire listing
- If already used, do NOT repeat in Title or other Bullets

5. LANGUAGE CLEANLINESS
- No Chinese punctuation
- No mixed language
- No duplicate phrases like “perfect gift perfect gift”
- No redundant wording

IF ANY RULE IS VIOLATED → OUTPUT IS INVALID

1. Title A:
2. Bullet Point 1:
3. Bullet Point 2:
4. Bullet Point 3:
5. Bullet Point 4:
6. Bullet Point 5:
7. HTML Description:
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
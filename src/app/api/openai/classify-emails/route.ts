// pages/api/classify-emails.js
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";



export async function POST(request: NextRequest, res: NextResponse) {
  const reqBody = await request.json();
  const emailsList = reqBody.emailsList;
  const storedKey = reqBody.storedKey

  const openai = new OpenAI({
    apiKey: storedKey, // This is the default and can be omitted
  });
  try {
    let classifications = [];
    for (const email of emailsList) {
      const classificationPrompt = `Classify the following email into one of the following categories: Important, Promotions, Social, Marketing, Spam, General.\n\n\nEmail: ${email.email}\nCategory: ? `;
      const classificationResponse = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: classificationPrompt,
      });
      classifications.push({
        ...email,
        category: classificationResponse.choices[0].text.trim().split("\n"),
      });
    }
    return NextResponse.json({ classifications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

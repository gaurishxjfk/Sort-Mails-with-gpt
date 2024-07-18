import { promises as fs } from "fs";
import path from "path";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  throw new Error(
    "Authorization required. Please visit /api/gmail/auth-url to authorize."
  );
}

function decodeBase64(encoded: string) {
  const buffer = Buffer.from(encoded, "base64");
  return buffer.toString("utf-8");
}

async function listEmails(auth: any, totalMails: number) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: totalMails ? totalMails : 5, // Adjust as needed
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    return "No emails found.";
  }

  const emailDetailsPromises = messages.map((message: any) =>
    gmail.users.messages.get({
      userId: "me",
      id: message.id,
    })
  );
  const emailDetails = await Promise.all(emailDetailsPromises);

  return emailDetails.map((email: any) => {
    const headers = email.data.payload.headers;
    const fromHeader = headers.find((header: any) => header.name === "From");
    const senderName = fromHeader
      ? fromHeader.value.split("<")[0].trim()
      : "Unknown";
    const senderEmail = fromHeader
      ? fromHeader.value.split("<")[1].replace(">", "")
      : "Unknown";

    const body = email.data.payload.parts
      ? email.data.payload.parts[0].body.data
      : email.data.payload.body.data;
    const decodedBody = body ? decodeBase64(body) : "No content";

    return {
      id: email.data.id,
      snippet: email.data.snippet,
      senderName,
      senderEmail,
      body: decodedBody,
    };
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mailCount = parseInt(searchParams.get("mailCount") || "0", 10);
  try {
    const authClient = await authorize();
    const emails = await listEmails(authClient, mailCount);

    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: error }, { status: 500 });
  }
}

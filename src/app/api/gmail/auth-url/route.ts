import { promises as fs } from 'fs';
import path from 'path';
import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

export async function GET() {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
  const keys = JSON.parse(content);
  const { client_id, client_secret, redirect_uris } = keys.installed || keys.web;

  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return NextResponse.redirect(authUrl);
}

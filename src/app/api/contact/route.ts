import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: 'Server contact form is not configured yet. Please add WEB3FORMS_ACCESS_KEY in .env.local' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `New Portfolio Message from ${name}`
      })
    });

    const data = await response.json();
    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: data.message || 'Submission failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

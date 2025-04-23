import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no types declaration
import pdfParse from "pdf-parse/lib/pdf-parse";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("files") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  try {
    const data = await pdfParse(buf);
    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

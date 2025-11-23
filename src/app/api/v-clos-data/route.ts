import { NextResponse } from "next/server";
import { getNews, getEvents } from "@/libs/microcms";

export async function GET() {
    try {
        // ニュースとイベントを並行取得
        const [news, events] = await Promise.all([getNews(), getEvents()]);

        return NextResponse.json({ news, events });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
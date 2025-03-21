// app/api/flights/route.ts
import { NextResponse } from "next/server";
import supabase from "../../lib/supabase"; // ここで Supabase クライアントをインポート

export async function GET() {
  try {
    // Supabase からフライト情報を取得
    const { data, error } = await supabase
      .from("flights") // flights テーブルを参照
      .select("*"); // すべてのカラムを取得

    if (error) {
      throw error;
    }

    // 結果を JSON で返す
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching flights:", error);
    // エラーレスポンス
    return NextResponse.json(
      { error: "Error fetching flights" },
      { status: 500 }
    );
  }
}

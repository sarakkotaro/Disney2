// pages/index.tsx (または任意のページ)
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<any[]>([]); // 型を必要に応じて変更
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const { data, error } = await supabase
          .from("flights") // flightsテーブルからデータを取得
          .select("*");

        if (error) throw error;
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <div>フライト情報を取得中...</div>;
  }

  return (
    <div>
      <h1>フライト情報</h1>
      <div>
        {flights.length === 0 ? (
          <div>フライト情報がありません</div>
        ) : (
          flights.map((flight) => (
            <div key={flight.id}>
              <h2>フライトID: {flight.id}</h2>
              <p>マイル数: {flight.miles} マイル</p>
              <p>プログラム: {flight.program}</p>
              <p>航空会社: {flight.airlines.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightsPage;

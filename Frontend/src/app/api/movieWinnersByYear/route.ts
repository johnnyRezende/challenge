import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest)
{
  const query = req.nextUrl.searchParams.get('query');

  console.log(query)

  const response = await axios.get(
    "https://challenge.outsera.tech/api/movies/winnersByYear",
    { params: { year: query } }
  );

  if (response.data.length === 0) {
    return NextResponse.json({ error: "No movie found for the given year" }, { status: 404 });
  }

  return NextResponse.json(response.data);
}
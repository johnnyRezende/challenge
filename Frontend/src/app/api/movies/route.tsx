import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


export async function GET(
  req: NextRequest
): Promise<NextResponse> {

  try {

    const maxMinProducersInterval = await axios.get("https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers");
    const multipleWinners         = await axios.get("https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners");

    const responseStudiosWinCount = await axios.get("https://challenge.outsera.tech/api/movies/studiosWithWinCount");

    // Ensuring desc order
    const topThreeStudios = responseStudiosWinCount.data.studios.sort((a: any, b: any) => b.winCount - a.winCount).slice(0, 3);

    return NextResponse.json({
      minMaxInterval: maxMinProducersInterval.data,
      multipleWinners: multipleWinners.data.years,
      topThreeStudios: topThreeStudios
    });

  } catch (error: unknown) {

    let errorMessage = "Internal Server Error"

    if (error instanceof Error) {
      errorMessage = `Error while fetching dashboard data: ${error.message}`
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }


}

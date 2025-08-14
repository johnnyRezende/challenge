import { NextResponse } from 'next/server';
import axios from 'axios';
import { type Movie } from '@/types/movie';

export async function GET(request: Request): Promise<NextResponse>
{
  try {
    const { searchParams } = new URL(request.url);

    const page   = searchParams.get('page') ?? '0';
    const size   = searchParams.get('size') ?? '10';
    const year   = searchParams.get('year') ?? '0';
    const winner = searchParams.get('winner') ?? '';;

    const params: {
      page: string;
      size: string;
      year?: string;
      winner?: string;
    } = {
      page,
      size,
    };

    if (Number(year)) {
      params.year = year
      params.size = '10'
    }

    if (winner) {
      params.winner = winner
    }
    console.log("Requesting:", axios.getUri({ url: 'https://challenge.outsera.tech/api/movies', params }));

    const response = await axios.get("https://challenge.outsera.tech/api/movies",
      {params}
    );

    if (response.data.content.length === 0) {
      return NextResponse.json({ error: "No movies" }, { status: 404 });
    }

    const movies = response.data.content.map((movie: Movie)=> ({
    ...movie,
    winner: movie.winner ? 'Yes' : 'No'
    }))

    const result = {
      content: movies,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages,
      pageNumber: response.data.number
    }

    return NextResponse.json(result);

  } catch (error: unknown) {

    let errorMessage = "Internal Server Error"

    if (error instanceof Error) {
      errorMessage = `Error while fetching all movies: ${error.message}`
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }

}

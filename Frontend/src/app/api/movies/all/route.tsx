import { NextResponse } from 'next/server';
import axios from 'axios';
import { type Movie } from '@/types/movie';

export async function GET(
): Promise<NextResponse>
{
  try {
    const response = await axios.get("https://challenge.outsera.tech/api/movies?page=1&size=100");

    if (response.data.content.length === 0) {
      return NextResponse.json({ error: "No movies" }, { status: 404 });
    }

    const movies = response.data.content.map((movie: Movie)=> ({
    ...movie,
    winner: movie.winner ? 'Yes' : 'No'
    }))

    return NextResponse.json(movies);

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

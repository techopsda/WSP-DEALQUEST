import { NextResponse } from 'next/server';

export const handleDQAPIError = (error: Error) => {
  console.error(`ERROR: ${error?.message}`);
  return new NextResponse(error?.message, { status: 500 });
};

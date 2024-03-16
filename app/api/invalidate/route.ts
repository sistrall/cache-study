import { invalidateSurrogateKeys } from '../../../lib/api';

export async function POST(request: Request) {
  const body = await request.text();
  const surrogateKeys = body.split(/[\s,]+/);

  const revalidatedPaths = await invalidateSurrogateKeys({ surrogateKeys });

  return Response.json({ surrogateKeys, revalidatedPaths });
}

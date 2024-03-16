import { getData, storeSurrogateKeys } from '../lib/api';

export default async function Home() {
  const { data, surrogateKeys } = await getData({
    query: `query Home {
      allLyricExcerpts {
        songTitle
        author
        id
      }
    }`,
  });

  await storeSurrogateKeys({ path: '/', surrogateKeys });

  const { allLyricExcerpts } = data;

  return (
    <div className="mx-auto container prose lg:prose-xl">
      <main>
        <p>Pick any excerpt</p>
        <h1>Lyric excerpts</h1>
        <ul>
          {allLyricExcerpts?.map(
            (excerpt: { id: string; songTitle: string; author: string }) => (
              <li key={excerpt.id}>
                <a href={`/excerpt/${excerpt.id}`}>
                  {excerpt.songTitle} • {excerpt.author}
                </a>
              </li>
            ),
          )}
        </ul>
      </main>
      <hr />
      <footer>
        <ul>
          <li>
            Surrogate keys: <code>{surrogateKeys.join(' ')}</code>
          </li>
          <li>Render at {new Date().toISOString()}</li>
        </ul>
      </footer>

    </div>
  );
}

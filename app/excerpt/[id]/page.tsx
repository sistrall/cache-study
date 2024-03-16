import { getData, storeSurrogateKeys } from '../../../lib/api';

export const dynamic = 'force-static';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data, surrogateKeys } = await getData({
    query: `query Excerpt($id: ItemId) {
      lyricExcerpt(filter: {id: {eq: $id}}) {
        songTitle
        author
        id
        createdAt
        updatedAt
        text(markdown: true)
      }
    }`,
    variables: { id },
  });

  const { lyricExcerpt } = data;

  await storeSurrogateKeys({
    path: `/excerpt/${lyricExcerpt.id}`,
    surrogateKeys,
  });

  return (
    <div className="mx-auto container prose lg:prose-xl">
      <main>
        <p>
          <a href="/">🔙 Go back to home</a>
        </p>
        <h1>{lyricExcerpt.songTitle}</h1>
        <blockquote dangerouslySetInnerHTML={{ __html: lyricExcerpt.text }} />
        <p>— Updated at {lyricExcerpt.updatedAt}</p>
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

export function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim().slice(0, 200);
  if (!q) return <>{text}</>;
  const index = text.toLocaleLowerCase().indexOf(q.toLocaleLowerCase());
  return index < 0 ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  );
}

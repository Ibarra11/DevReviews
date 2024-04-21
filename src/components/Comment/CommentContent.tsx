interface Props {
  content: string;
}
export default function CommentContent({ content }: Props) {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}

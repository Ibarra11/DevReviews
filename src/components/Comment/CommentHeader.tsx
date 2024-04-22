import moment from "moment";

interface Props {
  username: string;
  date: Date;
}
export default function CommentHeader({ username, date }: Props) {
  const formattedTime = moment(date).fromNow();
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-gray-300 rounded-full"></div>
        <p className="text-sm font-semibold">{username}</p>
      </div>
      <time className="text-gray-500 text-xs font-medium">{formattedTime}</time>
    </div>
  );
}

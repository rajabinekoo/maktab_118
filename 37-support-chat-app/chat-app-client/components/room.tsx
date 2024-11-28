import Link from "next/link";

export const RoomItem: React.FC<IRoomItem> = ({ clientMail, roomId }) => {
  return (
    <Link className="block" href={`/admin/rooms/${roomId}`}>
      <div className="w-full bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2">
        <p className="font-semibold">{clientMail}</p>
      </div>
    </Link>
  );
};

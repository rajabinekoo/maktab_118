import { AdminChatRoom } from "@/containers/admin-chat-room";
import { SendMessage } from "@/containers/send-message";

const RoomPage: React.FC = () => {
  return (
    <main className="space-y-10">
      <AdminChatRoom />
      <SendMessage />
    </main>
  );
};

export default RoomPage;

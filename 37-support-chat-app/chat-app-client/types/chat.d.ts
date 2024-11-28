interface IRoomItem {
  roomId: string;
  clientMail: string;
}

interface IFetchRoomsDto {
  list: Array<IRoomItem>;
  clientId: string;
}

interface IChatItem {
  to: string;
  from: string;
  chatId: string;
  context: string;
  createdAt: string;
}

interface IRoomChats {
  list: Array<IChatItem>;
  clientId: string;
}

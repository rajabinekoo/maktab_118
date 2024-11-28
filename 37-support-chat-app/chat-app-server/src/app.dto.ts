export class Error {
  constructor(public readonly message: string) {
  }
}

export class NewMessageResponse {
  chatId: string;
  context: string;
  from: string;
  to: string;
  createdAt: string;

  constructor(
    _chatId: string,
    _context: string,
    _from: string,
    _to: string,
    _createdAt: string
  ) {
    this.chatId = _chatId;
    this.context = _context;
    this.from = _from;
    this.to = _to;
    this.createdAt = _createdAt;
  }
}

export class JoinResponse {
  clientId!: string;
  roomId!: string;

  constructor(_clientId: string, _roomId: string) {
    this.clientId = _clientId;
    this.roomId = _roomId;
  }
}

export class RoomResponse {
  clientMail!: string;
  roomId!: string;

  constructor(_clientMail: string, _roomId: string) {
    this.clientMail = _clientMail;
    this.roomId = _roomId;
  }
}

export class NewMessageByAdminRequest {
  message: string;
  to: string;
}

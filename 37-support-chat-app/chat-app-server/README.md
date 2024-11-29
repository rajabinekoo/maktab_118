## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Socket.io

### User events

#### listening events

<table>
  <tr>
    <th>
      name
    </th>
    <th>
      content
    </th>
    <th>
      role
    </th>
  </tr>
  <tr>
    <td>
      receiveMessage
    </td>
    <td>
      message body
    </td>
    <td>
      admin / user
    </td>
  </tr>
  <tr>
    <td>
      error
    </td>
    <td>
      error body
    </td>
    <td>
      admin / user
    </td>
  </tr>
</table>

#### emitting events

<table>
  <tr>
    <th>
      name
    </th>
    <th>
      ack
    </th>
    <th>
      content
    </th>
    <th>
      role
    </th>
  </tr>
  <tr>
    <td>
      joinByAdmin
    </td>
    <td>
      true (clientId - chats)
    </td>
    <td>
      roomId
    </td>
    <td>
      admin
    </td>
  </tr>
  <tr>
    <td>
      fetchRooms
    </td>
    <td>
      true
    </td>
    <td>
      no content
    </td>
    <td>
      admin
    </td>
  </tr>
  <tr>
    <td>
      newMessage
    </td>
    <td>
      false
    </td>
    <td>
      message body
    </td>
    <td>
      admin / user
    </td>
  </tr>
  <tr>
    <td>
      join
    </td>
    <td>
      true (previous chats - clientId - roomId)
    </td>
    <td>
      no-content
    </td>
    <td>
      user
    </td>
  </tr>
</table>


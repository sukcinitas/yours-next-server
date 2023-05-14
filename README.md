# Yours Next

An application to create shared playlists, play videos in a regular or synchronised manner via embedded Youtube video player and to chat in real-time using socket.io. 
You can take a look at the application demo [here](https://yours-next.herokuapp.com/#/) (it might take ~ 10 seconds for the sleeping app on Heroku to wake up).

---

## Built with

### Front-end [yours-next-client](https://github.com/sukcinitas/yours-next-client)

### Back-end

- Node & Express
- MongoDB & Mongoose
- Axios
- Bcryptjs
- Socket.io

#### APIs

- Youtube IFrame Player API
- Youtube Data API

#### Testing

- Jest

#### Linting

- ESLint (Airbnb style guide)

---

## Setup

Clone these repositories - `git clone https://github.com/sukcinitas/yours-next-server.git server`, `git clone https://github.com/sukcinitas/yours-next-client.git client`; install dependencies of each -
  `npm install` (you will need `npm` and `node` installed globally); 

  - `npm run dev` - to run the app on [localhost:8080](http://localhost:8080/)

- to initialize submodule inside server directory and fetch all its data - `cd client`, `git submodule init`, `git submodule update`.

---

## Environment Variables

To run this project you will need to add the following environment variables to your .env file

`MONGODB_URI`, `SESSION_SECRET`, `GOOGLE_API_KEY`

---

## Endpoints

### /api/group

<table>
  <tr>
    <th>URL & HTTP method</th>
    <th>Parameters | req body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>/api/group/create <code>POST</code></td>
    <td>
      Request body:
      <ul>
        <li><code>{ name: <em>string</em>, passcode: <em>string</em> }</code></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, message: 'Group has been successfully created!' }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ success: false, type: 'general', 'message': 'Bad request! Failed to create the group!' }</code></li>
        <li><code>400</code> <code>{ success: false, type: 'name', message: 'Name is already in use!' }</code></li>
        <li><code>500</code> <code>{ success: false, type: 'general', message: 'Authentication failed!' }</code></li>
        <li><code>500</code> <code>{ success: false, type: 'general', message: 'Failed to create the group!' }</code></li>
        <li><code>500</code> <code>{ success: false, type: 'general', message: 'Failed to create the group!' err: [<em>error message</em>] }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/group/authenticate <code>POST</code></td>
    <td>
      Request body:
      <ul>
        <li><code>{ name: <em>string</em>, passcode: <em>string</em> }</code></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, message: 'Authentication succeeded!' }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ success: false, type: 'general', message: 'Bad request! Authentication failed!' }</code></li>
        <li><code>401</code> <code>{ success: false, type: 'name', message: 'Group with this name is not found!' }</code></li>
        <li><code>401</code> <code>{ success: false, type: 'passcode', message: 'Passcode is incorrect!' }</code></li>
        <li><code>500</code> <code>{ success: false, type: 'general', message: 'Authentication failed!' }</code></li>
        <li><code>500</code> <code>{ success: false, type: 'general', message: 'Authentication failed!!' err: [<em>error message</em>] }</code></li>
      </ul>
    </td>
  </tr>
</table>

### /api/data

<!-- DATA -->

<table>
  <tr>
    <th>URL & HTTP method</th>
    <th>Parameters | req body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>/api/data/search <code>GET</code></td>
    <td>
      Query parameters:
      <ul>
        <li><code>q</code>  <em>string required</em></li>
        <li><code>pageToken</code> <em>string optional</em></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
        <li><code>200</code> <code>{ success: true, data: [Data] }</code></li>
      </ul>
      Error response:
      <ul>
        <li><code>500</code> <code>{ success: false, message: 'Could not get results!', error: '[<em>youtube data api error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/group/playlists <code>GET</code></td>
    <td>
      Query parameters:
      <ul>
        <li><code>channelId</code>  <em>string required</em></li>
        <li><code>pageToken</code>  <em>string optional</em></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, data: [Data] }</code></li>
      </ul>
      Error response:
      <ul>
        <li><code>500</code> <code>{ success: false, message: 'Could not get results!', error: '[<em>youtube data api error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/group/playlistItems <code>GET</code></td>
    <td>
      Query parameters:
      <ul>
        <li><code>playlistId</code>  <em>string required</em></li>
        <li><code>pageToken</code>  <em>string optional</em></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, data: [Data] }</code></li>
      </ul>
      Error response:
      <ul>
        <li><code>500</code> <code>{ success: false, message: 'Could not get results!', error: '[<em>youtube data api error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/group/videos <code>GET</code></td>
    <td>
      Query parameters:
      <ul>
        <li><code>idList</code>  <em>string required</em></li>
        <li><code>pageToken</code>  <em>string optional</em></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, data: [Data] }</code></li>
      </ul>
      Error response:
      <ul>
        <li><code>500</code> <code>{ success: false, message: 'Could not get results!', error: '[<em>youtube data api error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
</table>

### /api/playlists

<table>
  <tr>
    <th>URL & HTTP method</th>
    <th>Parameters | req body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>/api/playlists <code>GET</code></td>
    <td>
      Query parameters:
      <ul>
        <li><code>group</code> <em>string required</em></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, playlists: [ {_id: <em>string</em>, title: <em>string</em>, createdBy: <em>string</em>, items: <em>string[]</em>, createdAt: <em>string</em>, updatedAt: <em>string</em> }] }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>403</code> <code>{ success: false, message: 'Forbidden! Could not get playlists!' }</code></li>
        <li><code>500</code> <code>{ success: false, message: 'Could not get playlists!', error: '[<em>database error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/playlists <code>POST</code></td>
    <td>
    Request body:
      <ul>
        <li><code>{ title: <em>string</em>, createdBy: <em>string</em> }</code></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, 'message': 'Playlist has been successfully created!', playlist: {_id: <em>string</em>, title: <em>string</em>, createdBy: <em>string</em>, items: <em>string[]</em>, createdAt: <em>string</em>, updatedAt: <em>string</em> } }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>403</code> <code>{ success: false, message: 'Forbidden!' }</code></li>
        <li><code>400</code> <code>{ success: false, message: 'Playlist with this title already exists!'}</code></li>
        <li><code>500</code> <code>{ success: false, message: 'Could not create playlist!', error: '[<em>database error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>/api/playlists/:id <code>GET</code></td>
    <td>
      none
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, playlist: {_id: <em>string</em>, title: <em>string</em>, createdBy: <em>string</em>, items: <em>string[]</em>, createdAt: <em>string</em>, updatedAt: <em>string</em> } }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ success: false, message: 'Could not get playlist or playlist has been deleted!' }</code></li>
        <li><code>500</code> <code>{ success: false, message: 'Could not get playlist!', error: '[<em>database error message</em>]'}</code></li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>/api/playlists/:id <code>DELETE</code></td>
    <td>
        none
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, message: 'Playlist has been successfully deleted!' }</code></li>
      </ul>
      Error response:
      <ul>
        <li><code>500</code> <code>{ success: false, message: 'Could not delete playlist!', error: '[<em>database error message</em>]'}</code></li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>/api/playlists/:id <code>PUT</code></td>
    <td>
      Request body:
      <ul>
        <li><code>{ item: <em>string</em> }</code></li>
      </ul>
    </td>
    <td>
      Success responses: 
      <ul>
          <li><code>200</code> <code>{ success: true, playlist: {_id: <em>string</em>, title: <em>string</em>, createdBy: <em>string</em>, items: <em>string[]</em>, createdAt: <em>string</em>, updatedAt: <em>string</em> } }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ success: false, message: 'Bad request! Could not update playlist!' }</code></li>
        <li><code>500</code> <code>{ success: false, message: 'Could not update playlist!', error: '[<em>database error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>/api/playlists/:id/removeItem <code>PUT</code></td>
    <td>
      Request body:
      <ul>
        <li><code>{ items: <em>string[]</em> }</code></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ success: true, message: 'Item(s) has been successfully deleted!' </code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ success: false, message: 'No item(s) to delete!' }</code></li>
        <li><code>500</code> <code>{ success: false, message: 'Could not delete playlist item(s)!', error: '[<em>database error message</em>]' }</code></li>
      </ul>
    </td>
  </tr>
</table>

---

## Aknowledgements

- [Handling CORS in Socket.IO](https://socket.io/docs/v2/handling-cors/)
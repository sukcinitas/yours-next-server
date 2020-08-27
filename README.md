----
## Technologies
##### Front-end [yours-next-client](https://github.com/sukcinitas/yours-next-client)

##### Back-end
- Node & Express
- MongoDB & Mongoose
- Axios
- Bcryptjs
- Socket.io

##### APIs
- Youtube IFrame Player API
- Youtube Data API

##### Testing & linting & bundling & compiling
- Jestgit 
- ESLint (Airbnb style guide)

----

### /api/group

|route     |HTTP method|req.body|result|
|----------|:---------:|:------:|------|
|/api/group/create|POST       |`{name, passcode}`       |<ul><li>`{ success: false, message: 'Failed to create the group!'}` if recieves no name and/or passcode or otherwise fails</li><li>`{ success: false, message: 'Name is already in use!'}` if name is already used</li><li>`{ success: true, message: 'Group has been successfully created! }` if operation is successful</li></ul>
|/api/group/authenticate|POST| `{name, passcode}` |<ul><li>`{ success: false, message: 'Authentication failed!'}` if recieves no name and/or passcode or otherwise fails</li><li>`{ success: false, message: 'Group with this name is not found!'}` if group is not in the database</li><li>`{ success: false, message: 'Passcode is incorrect!'}` if passcode is incorrect</li><li>`{ success: true, message: 'Authentication succeeded! }` if operation is successful</li></ul> |

### /api/data

|route     |HTTP method|req.query|result|
|----------|:---------:|:------:|------|
|/api/data/search?q=&pageToken=|GET|`{q}` - a search query|<ul><li>`{ success: true, data }` if operation is successful</li><li>`{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails</li><ul>|
|/api/data/playlists?channelId=&pageToken=|GET|-|<ul><li>`{ success: true, data }` if operation is successful</li><li>`{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails</li><ul>|
|/api/data/playlistItems?playlistId=&pageToken=|GET|-|<ul><li>`{ success: true, data }` if operation is successful</li><li>`{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails</li><ul>|
|/api/data/videos?idList=&pageToken=|GET|`{idList}` - a string of comma separated video ids|<ul><li>`{ success: true, data }` if operation is successful</li><li>`{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails</li><ul>|

### /api/playlists

|route     |HTTP method|req.body|result|
|----------|:---------:|:------:|------|
|/api/playlists?group=|GET|-|<ul><li>`{ success: true, playlists: [{title: '', createdBy: 'group-name', items: ['videoId1'], createdAt: '', updatedAt: '' }] }` if operation is successful</li><li>`{ success: false, message: 'Could not get playlists!', error: '[database error message]' }` if operation fails</li></ul>|
|/api/playlists|POST|`{title, createdBy}`|<ul><li>`{ success: true, playlist, message: 'Playlist has been successfully created!' }` if operation is successful</li><li>`{ success: false, message: 'Could not create playlist!', error: '[database error message]' }`  if operation fails</li></ul>|
|/api/playlists/:id|GET|-|<ul><li>`{ success: true, playlist: {title: '', createdBy: 'group-name', items: ['videoId1'], createdAt: '', updatedAt: '' } }` if operation is successful</li><li>`{ success: false, message: 'Could not get playlist!', error: '[database error message]'}` if operation fails</li></ul>|
|/api/playlists/:id|DELETE|-|<ul><li>`{ success: true, message: 'Playlist has been successfully deleted!' }` if operation is successful</li><li>`{ success: false, message: 'Could not delete playlist!', error: '[database error message]'}` if operation fails</li></ul>|
|/api/playlists/:id|PUT|-|<ul><li>`{ success: false, message: 'Could not update playlist!' }` if no item is provided</li><li>`{ success: true, playlist }` if operation is successful</li><li>`{ success: false, message: 'Could not update playlist!', error: '[database error message]' }` if operation fails</li></ul>|
|/api/playlists/:id/removeItem|PUT|-|<ul><li>`{ success: false, message: 'No item(s) to delete!' }` if no item(s) are provided</li><li>`{ success: true, message: 'Item(s) has been successfully deleted!' }` if operation is successful</li><li>`{ success: false, message: 'Could not delete playlist item(s)!', error: '[database error message]' }` if operation fails</li></ul>

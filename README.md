### /data
    /data/search GET
    /data/playlists GET
    /data/playlistItems GET
    /data/videos GET
### /group
    /group/create POST
    /group/authenticate POST
### /playlists
    /playlits/?group= GET
    /playlits/ POST
    /playlits/:id GET
    /playlits/:id DELETE
    /playlits/:id PUT
    /playlits/:id/removeItem PUT
    
----

### /group
- /group/create **POST** || **req.body**  `{ name, passcode }`
   - `{ success: false, message: 'Failed to create group!'}` if recieves no name and/or passcode or otherwise fails
   - `{ success: false, message: 'Name is already in use!'}` if name is already used
   - `{ success: true, message: 'Group has been successfully created! }` if operation is successful
- /group/authenticate **POST** || **req.body** `{ name, passcode }`
   - `{ success: false, message: 'Authentication failed!'}` if recieves no name and/or passcode or otherwise fails
   - `{ success: false, message: 'Group with this name is not found!'}` if group is not in database
   - `{ success: false, message: 'Passcode is incorrect!'}` if passcode is incorrect
   - `{ success: true, message: 'Authentication succeeded! }` if operation is successful

----

### /playlists
- /playlists GET || **req.query**  `{ group } // group name`
   - `{ success: true, playlists: [] }` if operation is successful
   - `{ success: false, message: 'Could not get playlists!', error: '[database error message]' }` if operation fails 
- /playlists POST || **req.body**  `{ title, createdBy }`
   - `{ success: true, playlist, message: 'Playlist has been successfully created!' }` if operation is successful
   - `{ success: false, message: 'Could not create playlist!', error: '[database error message]' }`  if operation fails
- /playlists/:id GET || **req.params**  `{ id }`
   - `{ success: true, playlist }` if operation is successful
   - `{ success: false, message: 'Could not get playlist!', error: err.message }` if operation fails
- /playlists/:id DELETE || **req.params**  `{ id }`
   - `{ success: true, message: 'Playlist has been successfully deleted!' }` if operation is successful
   - `{ success: false, message: 'Could not delete playlist!', error: '[database error message]'}` if operation fails
- /playlists/:id PUT || **req.params**  `{ id }` || **req.body** `{ item }` // videoId
   - `{ success: false, message: 'Could not update playlist!' }` if no item is provided
   - `{ success: true, playlist }` if operation is successful
   - `{ success: false, message: 'Could not update playlist!', error: err.message }` if operation fails
- /:id/removeItem PUT || **req.params**  { id } // playlist id || **req.body** `{ items } // a list of video ids of items to remove`
   - `{ success: false, message: 'No item(s) to delete!' }` if no item(s) is provided
   - `{ success: true, message: 'Item(s) has been successfully deleted!' }` if operation is successful
   - `{ success: false, message: 'Could not delete playlist item(s)!', error: '[database error message]' }` if operation fails

----

#### /data
- /search?q=&pageToken= GET || **req.query**  `{ q, pageToken }; // pageToken is unrequired`
    - `{ success: true, data }` if operation is successful
    - `{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails
- /playlists?channelId=&pageToken= GET || **req.query**  `{ channelId, pageToken } // pageToken is unrequired`
    - `{ success: true, data }` if operation is successful
    - `{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails
- /playlistItems?playlistId=&pageToken= GET || **req.query**  `{ playlistItems, pageToken } // pageToken is unrequired`
    - `{ success: true, data }` if operation is successful
    - `{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails
- /videos?idList=&pageToken= GET || **req.query**  `{ idList, pageToken } // pageToken is unrequired, idList is a string of video ids separated by commas`
    - `{ success: true, data }` if operation is successful
    - `{ success: false, message: 'Could not get results!', error: '[youtube data api error message]' }` if operation fails

import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth.reducer'
import { channelDetailsReducer } from './reducers/channel.reducer'
import { commentListReducer } from './reducers/comment.reducer'
import { channelVideosReducer, homeVideoReducer, relatedVideoReducer, searchVideoReducer, selectedVideoReducer, subscribedChannelsReducer } from './reducers/videos.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideoReducer,
    searchedVideos: searchVideoReducer,
    subscribedChannels: subscribedChannelsReducer,
    channelVideos: channelVideosReducer,
})

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
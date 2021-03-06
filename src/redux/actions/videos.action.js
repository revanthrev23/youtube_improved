import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCESS, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, RELATED_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SUBSCRIBED_CHANNELS_REQUEST, SUBSCRIBED_CHANNELS_SUCCESS, SUBSCRIBED_CHANNELS_FAIL, CHANNEL_VIDEO_REQUEST, CHANNEL_VIDEO_FAIL, CHANNEL_VIDEO_SUCCESS } from "../actionType"
import request from "../../api"

export const getPopularVideos = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
       })
       const { data } = await request('/videos', {
          params: {
             part: 'snippet,contentDetails,statistics',
             chart: 'mostPopular',
             regionCode: 'IN',
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
          },
       })
 
       dispatch({
          type: HOME_VIDEOS_SUCESS,
          payload: {
             videos: data.items,
             nextPageToken: data.nextPageToken,
             category: 'All',
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }
 
 export const getVideosByCategory = keyword => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
 
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
             q: keyword,
             type: 'video',
          },
       })
 
       dispatch({
          type: HOME_VIDEOS_SUCESS,
          payload: {
             videos: data.items,
             nextPageToken: data.nextPageToken,
             category: keyword,
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }
 
 export const getVideoById = id => async dispatch => {
    try {
       dispatch({
          type: SELECTED_VIDEO_REQUEST,
       })
 
       const { data } = await request('/videos', {
          params: {
             part: 'snippet,statistics',
             id: id,
          },
       })
       dispatch({
          type: SELECTED_VIDEO_SUCCESS,
          payload: data.items[0],
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: SELECTED_VIDEO_FAIL,
          payload: error.message,
       })
    }
 }
 
 export const getRelatedVideos = id => async dispatch => {
    try {
       dispatch({
          type: RELATED_VIDEO_REQUEST,
       })
 
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
             relatedToVideoId: id,
             maxResults: 15,
             type: 'video',
          },
       })
       dispatch({
          type: RELATED_VIDEO_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data.message)
       dispatch({
          type: RELATED_VIDEO_FAIL,
          payload: error.response.data.message,
       })
    }
 }
 
 export const getVideosBySearch = (keyword,order) => async dispatch => {
    try {
       dispatch({
          type: SEARCH_VIDEO_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
 
             maxResults: 20,
             q: keyword,
             order: order,
             type: 'video,channel',
          },
       })
 
       dispatch({
          type: SEARCH_VIDEO_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: SEARCH_VIDEO_FAIL,
          payload: error.message,
       })
    }
 }
 
 export const getSubscribedChannels = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: SUBSCRIBED_CHANNELS_REQUEST,
       })
       const { data } = await request('/subscriptions', {
          params: {
             part: 'snippet,contentDetails',
 
             mine: true,
          },
          headers: {
             Authorization: `Bearer ${getState().auth.accessToken}`,
          },
       })
       dispatch({
          type: SUBSCRIBED_CHANNELS_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data)
       dispatch({
          type: SUBSCRIBED_CHANNELS_FAIL,
          payload: error.response.data,
       })
    }
 }
 
 export const getVideosByChannel = id => async dispatch => {
    try {
       dispatch({
          type: CHANNEL_VIDEO_REQUEST,
       })
 
       // 1. get upload playlist id
       const {
          data: { items },
       } = await request('/channels', {
          params: {
             part: 'contentDetails',
             id: id,
          },
       })
       const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
       // 2. get the videos using the id
       const { data } = await request('/playlistItems', {
          params: {
             part: 'snippet,contentDetails',
             playlistId: uploadPlaylistId,
             maxResults: 30,
          },
       })
 
       dispatch({
          type: CHANNEL_VIDEO_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data.message)
       dispatch({
          type: CHANNEL_VIDEO_FAIL,
          payload: error.response.data,
       })
    }
 }
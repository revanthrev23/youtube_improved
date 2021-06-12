import React, { useEffect } from 'react'
import './_videoMetaData.scss'
import moment from 'moment'
import numeral from 'numeral'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action'
import HelmetCustom from '../HelmetCustom'

const VideoMetaData = ({video:{snippet,statistics},videoId}) => {

    const {channelId, channelTitle, description, title, publishedAt} = snippet;
    const {viewCount, likeCount, dislikeCount} = statistics;

    const dispatch = useDispatch();
    
    const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(state => state.channelDetails.channel);

    const subscriptionStatus = useSelector(state => state.channelDetails.subscriptionStatus)
    console.log("Line 20 metadata", subscriptionStatus);

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    },[dispatch, channelId]);

    return (
        <div className="videoMetadata py-2">
            <HelmetCustom title={title} description={description} />
            <div className="videoMetadata__top">
                <h5>{title}</h5>
                <div className="d-flex justify-content-between align-items-center py-1">
                    <span>{numeral(viewCount).format("0.a")} Views • &nbsp;
                    {moment(publishedAt).fromNow()}</span>
                <div>
                    <span className="mr-3">
                        <MdThumbUp size={26} />{numeral(likeCount).format("0.a")} Likes
                    </span>
                    <span className="mr-3">
                        <MdThumbDown size={26} />{numeral(dislikeCount).format("0.a")} Dislikes
                    </span>
                </div>
            </div>
        </div>
            <div className="videoMetadata__channel d-flex justify-content-between align-items-center my-2 py-3">
                <div className="d-flex">
                    <img src={channelSnippet?.thumbnails?.default?.url} className="rounded-circle mr-3" alt=""/>
                    <div className="d-flex flex-column">
                        <span>{channelTitle}</span>
                        <span>{numeral(channelStatistics?.subscriberCount).format("0.a")} Subscribers</span>
                    </div>
                </div>
                <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus? 'Subscribed' : 'Subscribe'}</button>
            </div>
            <div className="videoMetadata__description">
                <ShowMoreText lines={3} more="SHOW MORE" less="SHOW LESS" anchorClass="showMoreText" expanded={false} >{description}</ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData

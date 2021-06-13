import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getVideosBySearch } from '../../redux/actions/videos.action';
import VideoHorizontal from '../VideoHorizontal/VideoHorizontal'
import './_searchScreen.scss'

const SearchScreen = () => {
    const {query} = useParams();

    const dispatch = useDispatch();

    const [filter, setFilter] = useState("relevance");

    useEffect(() => {
        dispatch(getVideosBySearch(query,filter));
        setFilter(null);
    },[query, filter, dispatch])

    let {videos,loading} = useSelector(state => state.searchedVideos)
    console.log(typeof videos);

    const asc = () => {
        console.log("Inside A to Z");
        setFilter("title");
    }

    const views = () => {
        console.log("Inside Views");
        setFilter("viewCount");
    }

    const rating = () => {
        console.log("Inside rating");
        setFilter("rating");
    }

    const date = () => {
        console.log("Inside date");
        setFilter("date");
    }

    return (
        <>
        <div className="filters">
            Filters: 
            <span className="filter" onClick={asc}>A-Z</span>
            <span className="filter" onClick={views}>Views</span>
            <span className="filter" onClick={rating}>Rating</span>
            <span className="filter" onClick={date}>Date</span>
        </div>

        <Container>
            {
                !loading ? (
                    videos?.map(video => <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
                    )
                ) : (
                    <SkeletonTheme color='#343a40' highlightColor='#3c4147'><Skeleton width='100%' height='160px' count={20} /></SkeletonTheme>
                )
            }
        </Container>
        </>
    )
}

export default SearchScreen
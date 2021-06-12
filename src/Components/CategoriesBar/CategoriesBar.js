import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import "./_categoriesBar.scss"

const keywords = [
    'All',
    'React js',
    'React Native',
    'use of API',
    'Redux',
    'Sandalwood',
    'Music',
    'Arijit Singh',
    'Maroon 5',
    'Bollywood',
    'Cricket',
    'RCB',
    'IPL',
    'PUBG Mobile',
    'Mortal',
 ]

const CategoriesBar = () => {
    const [activeElement, setActiveElement] = useState('All');

    const dispatch = useDispatch()

    const handleClick = (value) => {
        setActiveElement(value)
        if(value === "All")
            dispatch(getPopularVideos())
        else
            dispatch(getVideosByCategory(value))
    }
    
    return (
        <div className="categoriesBar">
            {
                keywords.map((value, i) => <span key={i} onClick={() => handleClick(value)} className={activeElement === value ? 'active' : ""} >{value}</span>)
            }
        </div>
    )
}

export default CategoriesBar

import React, { useEffect, useState } from 'react'
import "./_header.scss"
import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications, MdApps } from "react-icons/md"
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import jsonpAdapter from 'axios-getjsonp'

const Header = ({handleSidebar}) => {
    const [input,setInput] = useState();
    const [search,setSearch] = useState(null);

    const history = useHistory();

    const {photoURL} = useSelector(state => state.auth?.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`)
    }

    var result;

    const fetchData = input => {
        const GOOGLE_AC_URL = `https://clients1.google.com/complete/search`;
        
        return axios({
            url: GOOGLE_AC_URL,
            adapter: jsonpAdapter,
            params: {
              client: "youtube",
              hl: "en",
              ds: "yt",
              q: input,
            }
          })
          .then((res) => {
            if (res.status !== 200) {
              throw Error("Suggest API not 200!");
            }
            result = res.data[1].map((item) => item[0]);
            console.log("Result is:",result);
            setSearch(result);
            return result;
          })
    }

    useEffect(() => {
        if(input){
            let timeout;
            if(timeout){
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => {
                const res = fetchData(input);
                setSearch(res);
            },2000);
        } else {
            setSearch(null);
        }  
    },[input])

    console.log(search);

    const searchItem = (id) => {
        setInput(search[id]);
        console.log("Input is:", input);
        history.push(`/search/${search[id]}`);
        setSearch(null)
    }

    return (
        <>
        <div className="header">
            <FaBars className="header__menu" onClick={() => handleSidebar()} size={26} />
            <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" className="header__logo"/>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Search' value={input} onChange={e=>{setInput(e.target.value)}} />
                <button type='submit'>
                <AiOutlineSearch size={22} />
                </button>
            </form>

         <div className='header__icons'>
            <MdNotifications size={28} />
            <MdApps size={28} />
            <img src={photoURL} alt='avatar' />
         </div>

        </div>
        { search &&
                    <div className="suggestions">
                            <li className="item" id="0" onClick={(e) => searchItem(e.target.id)}>{search[0]}</li>
                            <li className="item" id="1" onClick={(e) => searchItem(e.target.id)}>{search[1]}</li>
                            <li className="item" id="2" onClick={(e) => searchItem(e.target.id)}>{search[2]}</li>
                            <li className="item" id="3" onClick={(e) => searchItem(e.target.id)}>{search[3]}</li>
                            <li className="item" id="4" onClick={(e) => searchItem(e.target.id)}>{search[4]}</li>
                            <li className="item" id="5" onClick={(e) => searchItem(e.target.id)}>{search[5]}</li>
                            <li className="item" id="6" onClick={(e) => searchItem(e.target.id)}>{search[6]}</li>
                            <li className="item" id="7" onClick={(e) => searchItem(e.target.id)}>{search[7]}</li>
                            <li className="item" id="8" onClick={(e) => searchItem(e.target.id)}>{search[8]}</li>
                            <li className="item" id="9" onClick={(e) => searchItem(e.target.id)}>{search[9]}</li>
                            <li className="item" id="10" onClick={(e) => searchItem(e.target.id)}>{search[10]}</li>
                            <li className="item" id="11" onClick={(e) => searchItem(e.target.id)}>{search[11]}</li>
                            <li className="item" id="12" onClick={(e) => searchItem(e.target.id)}>{search[12]}</li>
                            <li className="item" id="13" onClick={(e) => searchItem(e.target.id)}>{search[13]}</li>
                    </div>
        }
        </>
    )
}

export default Header

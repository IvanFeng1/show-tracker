import React,{useState, useEffect,useLayoutEffect} from 'react'
import ShowBlock from './components/ShowBlock.js'
import Loading from "./components/Loading.js" 
const Browse = () => {
    const [raw_data,set_data] = useState([])
    //code for fetch the trending anime for user to look at
    useEffect(() => {

        fetch('/api/browse').then(res => res.text()).then(res => JSON.parse(res)).then(res => {
            set_data(res.data)
        })
    }, [])
    return (
        <div>
            {raw_data.length > 0 ? 
                raw_data.map((data) => (
                    <ShowBlock data={data} />
                )) :
                <Loading />
            }
        </div>
    )
}

export default Browse
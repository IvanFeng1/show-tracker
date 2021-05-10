import React from 'react'
import { Query } from 'react-apollo';
// import { Movie_Popular } from "./queries.js";
import { gql, useQuery } from '@apollo/client';


export const Movie_Popular = gql`
    query{
        Page(page:1){
            media(sort:POPULARITY_DESC){
                id
                title{
                    english(stylised:true)
                    native(stylised:true)
                }
                episodes
                genres
                coverImage{
                    large
                }
                bannerImage
                popularity
                trending
                averageScore
            }
        }
    }
`
const Apollotest = () => {
    const {loading,error,data} = useQuery(Movie_Popular)
    console.log(data)
    return(
        <div>cancer</div>
    )
}

export default Apollotest
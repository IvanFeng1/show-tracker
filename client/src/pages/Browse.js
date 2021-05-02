import React from 'react'

const Browse = () => {

    //code for fetch the trending anime for user to look at
    const fetch_data = async () => {
        try {
            let response = await fetch('/api/browse')
            let data = await response.text()
            data = await JSON.parse(data)
            console.log(data)
        }
        catch(err){
            alert(err)
        }
    }
    fetch_data()
    return (
        <div>
        </div>
    )
}

export default Browse
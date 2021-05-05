 const express = require('express')

 const app = express()

 const port = 5000

 // code for fetchign from api 
const fetch = require('node-fetch');

const base_api_url = 'https://kitsu.io/api/edge'


// endpoint to get data for browse page
app.get('/api/browse', async (request, response) => {
    let url = base_api_url + '/trending/anime'
    const rawResp = await fetch(url)
    const data = await rawResp.json()
    response.send(data)
})
app.listen(port, () => console.log(` Server started at port ${port}`))



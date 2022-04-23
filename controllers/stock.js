import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.API_KEY

export const getCompany = async (req, res) => {

    const symbol = req.params.symbol


    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${apiKey}&symbols=${symbol}`)
        res.status(200).json(stock.data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getStockPrices = async (req, res) => {

    const symbols = req.params.symbol

    try {
        const stock = await axios.get(`https://cloud.iexapis.com/v1/stock/market/quote/latestprice/batch?token=${apiKey}&symbols=${symbols}`)
        res.status(200).json(stock.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
    
}

export const getLatestPrice = async (req, res) => {

    const symbol = req.params.symbol

    try {
        const price = await axios(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${apiKey}&symbols=${symbol}`)
        res.status(200).json(price.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
}

export const addStockToUser = async (req, res) => {
    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${apiKey}&symbols=aapl`)
        res.status(200).json(stock.data)
    } catch (error) {
        
    }
}

export const search = async (req, res) => {
    const fragment = req.params.fragment

    try {
       const results = await axios.get(`https://cloud.iexapis.com/stable/search/${fragment}?token=${apiKey}`)
       res.status(200).json(results.data)
    } catch (error) {
        
    }
}

export const getHistoricalData = async (req, res) => {
    const id = req.params.id

    try {
        const data = await axios.get(`https://cloud.iexapis.com/stable/stock/${id}/chart/ytd?token=${apiKey}`)

        const formattedData = []
        
        data.data.forEach(point => {
            const date = point['date'].slice(5, 10)
            const obj = {
                name: date,
                price: point['close']
            }
                formattedData.push(obj)
        })

        res.status(200).json(formattedData)
    } catch (error) {
        res.status(500).json('Could not get data')
    }
}

export const getNews = async (req, res) => {
    const symbol = req.params.id
    try {
        const news = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news/last/5?token=${apiKey}`)
        res.status(200).json(news.data)
    } catch (error) {
        
    }
}


export const getMostActive = async (req, res) => {
    try {
        const collection = await axios.get(`https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=${apiKey}`)


        const finalData = []

        collection.data.forEach(stock => {
            finalData.push({symbol: stock.symbol, latestPrice: stock.latestPrice, change: stock.change})
        })


        res.status(200).json(finalData)
    } catch (error) {
        res.status(500).json('error')
    }
}

export const getCollection = async (req, res) => {

    const tag = req.params.type
    const name = req.query.name

    console.log

    try {

        const collection = await axios.get(`https://cloud.iexapis.com/stable/stock/market/collection/${tag}?collectionName=${name}&token=${apiKey}`)

        console.log(collection, "COLL")


        const finalData = []

        const sorted = collection.data.sort((a, b) => b.latestPrice - a.latestPrice).slice(0, 15)


        sorted.forEach(stock => {
            finalData.push({symbol: stock.symbol, latestPrice: stock.latestPrice, change: stock.change, companyName: stock.companyName})
        })


        res.status(200).json(finalData)
    } catch (error) {

        res.status(500).json('error') 
    }
}

export const getFinancials = async (req, res) => {
    
    const { symbol } = req.params

    try {

        const { data } = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/financials?token=${apiKey}&symbols=${symbol}`)

        res.status(200).json(data.financials[0])
    } catch (error) {

        res.status(500).json(error)
    }
}

export const getTags = async (req, res) => {
    try {
        const { data } = await axios.get(`https://cloud.iexapis.com/stable/ref-data/sectors?token=${apiKey}`)

        res.status(200).json(data)
    } catch (error) {

        res.status(500).json(error)
    }
}



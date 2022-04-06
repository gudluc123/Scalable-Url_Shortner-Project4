const urlModel = require('../model/urlModel');
const shortid = require('shortid');

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidUrl = function (value) {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(value);
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// ==================================================================================================================================
//                                               createShortUrl
// ==================================================================================================================================


const createShortUrl = async function (req, res) {  

    try {
        const longUrl = req.body.longUrl

        if (!isValidRequestBody(req.body))
         { return res.status(400).send({ status: false, message: "Please Provide longUrl in the body" }) }

        if (!isValid(longUrl))
         { return res.status(400).send({ status: false, message: "Please Provide longUrl InSide the String" }) }

        if (!isValidUrl(longUrl))
         return res.status(400).send({ status: false, message: "Invalid URL" })
        

         const getUrl = await urlModel.findOne({longUrl:longUrl})

            // console.log(getUrl)
            if ( getUrl){
    
            return res.status(201).send({ status: true,msg:"long url already exists", data: getUrl.shortUrl})
            } else{ 
                const baseUrl = "localhost:3000"
                const urlCode = shortid.generate() // to generate the unique url like /hafsd, /43nnnj
                const shortUrl = `${baseUrl}/${urlCode}`  //this is called template literal
                const data = {
                    longUrl: longUrl,
                    shortUrl: shortUrl,
                    urlCode: urlCode
                   }
               
                
                   
                   const createUrl = await urlModel.create(data)
                  res.status(201).send({status:true, data:createUrl}) 

            }
            
         
         const baseUrl = "localhost:3000"
         const urlCode = shortid.generate() // to generate the unique url like /hafsd, /43nnnj
         const shortUrl = `${baseUrl}/${urlCode}`  //this is called template literal
         const data = {
             longUrl: longUrl,
             shortUrl: shortUrl,
             urlCode: urlCode
            }
        
         
            
            const createUrl = await urlModel.create(data)
            
            
            
            
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// =======================================================================================================================
//                                                  getURL
//==========================================================================================================================



const getUrl = async function (req, res) {

    try {
        const urlCode = req.params.urlCode

        const getUrl = await urlModel.findOne({ urlCode: urlCode })

        if (!getUrl) return res.status(404).send({ status: false, message: `This "${urlCode}" urlCode not exist` })

        const getLongUrl = getUrl.longUrl

        return res.redirect(302, getLongUrl) //302 stand for successfull redirection

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}





module.exports.createShortUrl = createShortUrl
module.exports.getUrl = getUrl

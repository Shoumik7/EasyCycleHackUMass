const express = require("express");
const app = express();
let axios = require("axios");
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const multer = require('multer')
const Clarifai = require('clarifai')
app.use(cors());

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.listen(PORT, () =>{
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on Port: ${PORT}`)

})

app.get('/', (req, res) => {
  res.send('hello')
})


app.get("/:item/:user_latitude/:user_longitude", cors(), (req, res) => {

  console.log(req.params);
  let user_item = req.params.item;
  let user_latitude = req.params.user_latitude;
  let user_longitude = req.params.user_longitude;

  let url = "https://search.earth911.com/?what=" + user_item + "&where=&list_filter=all&max_distance=25&family_id=&latitude=" + user_latitude + "&longitude=" + user_longitude + "&country=&province=&city=&sponsor=";
  console.log(url);

  let nearest_recycling_center_name = '';
  let nearest_recycling_center_addr = '';

  request(url, (error, response, html) => {
    console.log("html: " + html);
    let $ = cheerio.load(html);
    const wrapper = $('#all-listings-results');
    //console.log("wrapper html: " + wrapper.html());
    //console.log("")
  
    nearest_recycling_center_name = wrapper.children().first().children().first().children().first().find('h2').text();
    console.log('Nearest Recycling Center Name: ' + nearest_recycling_center_name);

    if(nearest_recycling_center_name === ""){
      res.json({nearest_recycling_center_name: '', nearest_recycling_center_addr: '', nearest_recycling_center_latitude: '', nearest_recycling_center_longitude: ''});
    }
    else{
      let temp = (wrapper.children().first().children().first().children().first().find('h2').children().attr('href'))
    console.log("temp: " + temp);

    
    index_nearest_recycling_center_latitude = (wrapper.children().first().children().first().children().first().find('h2').children().attr('href')).indexOf("latitude");
    console.log("lat index: " + index_nearest_recycling_center_latitude);

    nearest_recycling_center_latitude = (wrapper.children().first().children().first().children().first().find('h2').children().attr('href')).substring(index_nearest_recycling_center_latitude + 9, index_nearest_recycling_center_latitude + 15);
    console.log("lat: " + nearest_recycling_center_latitude);

    index_nearest_recycling_center_longitude = (wrapper.children().first().children().first().children().first().find('h2').children().attr('href')).indexOf("longitude");
    console.log("lng index: " + index_nearest_recycling_center_longitude);

    nearest_recycling_center_longitude = (wrapper.children().first().children().first().children().first().find('h2').children().attr('href')).substring(index_nearest_recycling_center_longitude + 10, index_nearest_recycling_center_longitude + 17);
    console.log("lng: " + nearest_recycling_center_longitude);
    

  
    //const temp = wrapper.children().first().children().first();
    //console.log(temp.html());
  
    let address1 = '';
    let address2 = '';
    let address3 = '';
  
    const temp2 = wrapper.children().first().children().first().map((i, el) => {
      //console.log("el: " + el);
      address1 = $(el).find('.address1').text().trim();
      address2 = $(el).find('.address2').text().trim();
      address3 = $(el).find('.address3').text().trim();
    });

    //const test = wrapper.children().first().next();
    //console.log("test: " + test.html());
  
    //Printing
    //console.log("address 1: " + address1);
    //console.log("address 2: " + address2);
    //console.log("address 3: " + address3);
  
    if(address1 === ''){
      //TO-DO: This implies that the address doesn't exist so use the next nearest recycling center that has a known existing address
    }
    
    if(address1 !== '' && address2 === '' && address3 !== ''){
      nearest_recycling_center_addr = address1 + ', ' + address3
    }
    else{
      //TO-DO: Handle the case of there being an address 2 value and undersatnd how to apply it
    }
    
    console.log('Nearest Recycling Center Address: ' + nearest_recycling_center_addr);
  
    //const output = site.children('ul').children('li').children('div').children('h2').next().text();

    res.json({nearest_recycling_center_name,nearest_recycling_center_addr, nearest_recycling_center_latitude, nearest_recycling_center_longitude})
    
    }
  })
})

// Upload Endpoint
app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})


//Model to determine item type//
app.post('/image-predict', (req, res) => {

    const bytes_64 = req.body;
    console.log(bytes_64);

    const USER_ID = 'as29bnia3z50';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '4fc863f052064e70a97dfc5dc15f7dc4';
    const APP_ID = '5467c54cb7e54d2483e78627401183a5';
    // Change these to whatever model and image input you want to use
    const MODEL_ID = 'general-image-recognition';
    const IMAGE_URL = 'https://media.istockphoto.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc=';
    // This is optional.You can specify a model version or the empty string for the default
    const MODEL_VERSION_ID = '';

    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

    const stub = ClarifaiStub.grpc();

  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);

  stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        let counter = 0;
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
            if(counter === 2){
              console.log("name: " + concept.name);
              res.send('bottle');
            }
            counter++;
        }
    }

  );
});




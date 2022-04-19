
require('../models/database');
const { rawListeners } = require('../models/Category');
const Category = require('../models/Category');
const Work = require('../models/Work');




/**
 * GET /
 * Home page
 */

exports.hompage = async (req, res) => {

  try{

  const limitnumber=5;
  const categories = await Category.find({}).limit(limitnumber);
  const latest = await Work.find({}).sort({_id: -1}).limit(limitnumber);
  const Fitness = await Work.find({ 'category': 'Fitness' }).limit(limitnumber);
  const Electronics = await Work.find({ 'category': 'Electronics' }).limit(limitnumber);
  const Dance = await Work.find({ 'category': 'Dance' }).limit(limitnumber);
  const Clothing = await Work.find({ 'category': 'Clothing' }).limit(limitnumber);
  

  const business = { latest, Fitness , Electronics , Dance , Clothing };

  res.render('index', { title: 'Work Up - Homepage' , categories , business});
  }
  catch(error){
    res.status(500).send({message: error.message || "Error Occured" });
  }
}



/**
 * GET /categories
 * Categories
 */

 exports.exploreCategories = async (req, res) => {

  try{

  const limitnumber= 20;
  const categories = await Category.find({}).limit(limitnumber);
  res.render('categories', { title: 'Work Up - Categories' , categories});
  }
  catch(error){
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


/**
 * GET /businesses using ID
 * Business
 */

 exports.exploreWork = async(req, res) => {
  try {
    let workId = req.params.id;
    const work = await Work.findById(workId);
    res.render('work', { title: 'Work Up - Businesses', work } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories By ID
 * Categories
 */

 exports.exploreCategoriesById = async (req, res) => {

  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Work.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Work Up - CategoriesByID', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


/**
 *Explore latest
 */

 exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 10;
    const work = await Work.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Work Up - Explore Latest', work } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}



/**
 *Explore randome
 */

 exports.exploreRandom = async (req, res) => {
  try {
    let count = await Work.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let work = await Work.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Work Up - Explore Random', work } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


/**
 *Submit form
 */

exports.submitWork = async(req,res) => {
  
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-work', { title: 'Work Up - Explore Latest' , infoErrorsObj , infoSubmitObj} );
 
  
  
}


exports.submitWorkOnPost = async(req,res) => {

  try{
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }




    const newWork = Work({
      name: req.body.name,
      description:req.body.description,
      email:req.body.email,
      phoneno:req.body.phoneno,
      category:req.body.category,
      image:newImageName


    })
    await newWork.save();
  }
  catch(error)
  {
    req.flash('infoErrors',error);
  }
  
  req.flash('infoSubmit', 'Your Business has been added to our website.');
  res.redirect('submit-work');
 
  
}













// async function insertDymmyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         "name": "Fitness",
//         "image": "fitness_1.svg"
//       },
//       {
//         "name": "Dance",
//         "image": "dance_1.png"
//       },
//       {
//         "name": "Electronics",
//         "image": "electronics.png"
//       },
//       {
//         "name": "Clothing",
//         "image": "clothing.png"
//       },
      
//       {
//         "name": "Health & Household",
//         "image": "health.png"
//       }
//     ]);
//   } catch (error) {
//     console.log('this is the err', + error)
//   }
// }

// insertDymmyCategoryData();


// async function insertDymmyWorkData(){
//   try {
//     await Work.insertMany([
//       { 
//         "name": "ShapeUp",
//         "description": `ShapeUp is a health and fitness company that provides digital and
//         offline fitness, nutrition, and mental well-being experiences.
//         ShapeUp offers a variety of trainer-led, group workout courses
//         with the goal of making training fun and easy. It makes exercise
//         enjoyable, daily food is nutritious and delicious, mental fitness
//         simple with yoga and meditation, and medical and lifestyle care
//         simple.`,
//         "email": "hello@shapeup.fit",
//         "phoneno": "9912334567",
//         "category": "Fitness", 
//         "image": "shapeup.png"
//       },
//       { 
//         "name": "ClearBeing",
//         "description": `ClearBeing has 30 years of expertise as a Naturopath and Yoga
//         Therapist. ClearBeing invites you to cultivate well-being via yoga
//         and traditional practises. Online telehealth sessions and
//         self-care consultations are now available, with personalised
//         herbal treatments and practitioner-only goods delivered to your
//         home.`,
//         "email": "yogi123@gmail.com",
//         "phoneno": "9712345671",
//         "category": "Fitness", 
//         "image": "clearbeing.png"
//       },
//       { 
//         "name": " QuadLock",
//         "description": `Quad Lock makes products for people with an active lifestyle.
//         The Quad Lock Handlebar Mount is the perfect smartphone mount for
//         motorcyclists, and it works with all Quad Lock Cases, as well as
//         the Quad Lock Universal Adaptor for other Android phones.`,
//         "email": "quadlockfy@gmail.com",
//         "phoneno": "9198401123",
//         "category": "Fitness", 
//         "image": "quadlock.png"
//       },
//       { 
//         "name": "Nritya Arpan",
//         "description": ` Nritya Arpan is a Bharathanatyam institue with 20 years of expertise
//         and 9 years of teaching experience. They have performed in over 150
//         stage perfomances. They give lessons to
//         youngsters as young as five years old and people of all ages.
//         Many people have been influenced by their teachings..`,
//         "email": "dancewharshini@gmail.com",
//         "phoneno": "9763411113",
//         "category": "Dance", 
//         "image": "bharatnatyam.png"
//       },
//       { 
//         "name": "Diggin'Dance",
//         "description": ` Are you interested in learning Bollywood, hip hop, or
//         contemporary dance? You've come to the right place. Mr Anand
//         teaches you according to your abilities, whether you are a
//         beginner or an advanced learner. His technique is based on the
//         fundamentals of dance. He enjoys starting from the ground up and
//         bringing it to a higher level while keeping the student's
//         performance in mind. This is necessary to enable successful
//         learning as well as a sense of fulfillment.`,
//         "email": "hiphopanand@gmail.com",
//         "phoneno": "9876543219",
//         "category": "Dance", 
//         "image": "westerndance.png"
//       },
//       { 
//         "name": "GroovyFox",
//         "description": ` GroovyFox is a dance technology company that curates workshops
//         and programmes for dance enthusiasts searching for a simple and
//         enjoyable dancing experience. GroovyFox uses data and insights to
//         create a fun learning experience for the audience. There are
//         classes available both online and offline. Hip-hop, jazz, ballet,
//         and salsa courses are popular at GroovyFox. Professional,
//         non-professional, and personal coaching classes are available at
//         various times.`,
//         "email": "groovyfox@gmail.com",
//         "phoneno": "9711234567",
//         "category": "Dance", 
//         "image": "groovyfox.jpg"
//       },
//       { 
//         "name": "Digital Vision - Phone and accessoriesx",
//         "description": ` Digital Vision is a company that makes low-cost electronic gadgets.
//         Samsung manufactures a wide range of mobile phones and
//         accessories, as well as appliances, digital media devices,
//         semiconductors, memory chips, and integrated systems.`,
//         "email": "digivisi@gmail.com",
//         "phoneno": "7132451122",
//         "category": "Electronics", 
//         "image": "digitalvision.png"
//       },
//       { 
//         "name": "CogNetwork",
//         "description": `CogNetwork is a innovative tech company that designs,
//         manufactures, and markets cutting-edge, dependable, high-quality
//         PC products as well as value-added professional services that
//         help clients be more productive and competitive. Computers,
//         laptops, PCs, Tablets, Printers, Scanners, and other accessories
//         are available at CogNetwork. `,
//         "email": "cognetwork.help@gmail.com",
//         "phoneno": "9123579135",
//         "category": "Electronics", 
//         "image": "cognetwork.png"
//       },
//       { 
//         "name": "Acorn-Television and Video",
//         "description": `Acorn TVs, with their sleek, clean aesthetic and appearance,
//         provide high resolution image quality with endless detail. Watch
//         your favourite TV series, movies, and live sports events in
//         remarkable detail and depth. Softque also sells speakers, gaming
//         consoles, and home entertainment systems and home theatres.
//          `,
//         "email": "acorncontact@domain.com",
//         "phoneno": "8989123234",
//         "category": "Electronics", 
//         "image": "acorntv.png"
//       },
//       { 
//         "name": "DownTown",
//         "description": `DownTown is a destination for the latest trends and hottest
//         styles. DownTown's inventory includes a variety of brands and
//         product categories for men, women, and children, including Indian
//         and western garments, footwear, purses, cosmetic items, and
//         fashion accessories.`,
//         "email": "helpdowntownstores@gmail.com",
//         "phoneno": "1345-123-1655",
//         "category": "Clothing", 
//         "image": "downtown.png"
//       },
//       { 
//         "name": "Sweat Threads",
//         "description": `Sweat Threads is an American producer and retailer of men's,
//         women's, and children's underwear, sleepwear, and sportswear.
//         We are able to provide unrivalled craftsmanship due to our
//         devotion to quality and authenticity`,
//         "email": "sweatapp@yahoo.co.in",
//         "phoneno": "123456789",
//         "category": "Clothing", 
//         "image": "sweat.png"
//       },
//       { 
//         "name": "Urban Vogue",
//         "description": `The Urban Vogue Group is a collection of brands and enterprises
//         that allows people to express themselves through fashion and
//         design while also choosing a more sustainable lifestyle. By
//         providing the customers offering and evolving with a focus on
//         sustainable and profitable growth, we add value to people and
//         society in general.
//         `,
//         "email": "urbanv@gmail.com",
//         "phoneno": "9511167891",
//         "category": "Clothing", 
//         "image": "urbanvogue.png"
//       },
//       { 
//         "name": "Stationery Hut",
//         "description": `Stationery Hut is a personal, institutional, and office
//         stationery e-commerce shopping complex. S tationery Hut offers
//         thousands of stationery goods that unwittingly become a part of
//         our everyday lives at home, business, school, and college. You
//         will be astonished with their low prices, great deals, and 100
//         percent authentic items.`,
//         "email": "sales@stationaryhut.in",
//         "phoneno": "1008-132-7132",
//         "category": "Health & Household", 
//         "image": "stationeryhut.png"
//       },
//       { 
//         "name": "Stationery Hut",
//         "description": `Stationery Hut is a personal, institutional, and office
//         stationery e-commerce shopping complex. S tationery Hut offers
//         thousands of stationery goods that unwittingly become a part of
//         our everyday lives at home, business, school, and college. You
//         will be astonished with their low prices, great deals, and 100
//         percent authentic items.`,
//         "email": "sales@stationaryhut.in",
//         "phoneno": "1008-132-7132",
//         "category": "Health & Household", 
//         "image": "stationeryhut.png"
//       },
//       { 
//         "name": " Target Corp",
//         "description": `Furniture, modular furniture, home furnishings, home accessories,
//         bed and bath items, and kitchenware are all available at Target
//         Corp. Target Corp's in-house stylists and buyers are inspired by
//         worldwide trends to deliver fashionable and inexpensive furniture
//         and homeware to a wide range of households, from conventional to
//         contemporary.`,
//         "email": "help@targetcorp.in",
//         "phoneno": "1873-212-7500",
//         "category": "Health & Household", 
//         "image": "target.png"
//       },
//       { 
//         "name": "MedSphere",
//         "description": `MedSphere is an online medical equipment marketplace that enables
//         healthcare organisations to purchase and sell medical equipment,
//         medical disposables, and home health supplies. There will be no
//         more lost man-hours or a lack of transparency. With realtime
//         price notifications, pricing comparisons, and direct contacts
//         with the supply source, you can maximise your income.`,
//         "email": "contact@medsphere.in",
//         "phoneno": "8971544432",
//         "category": "Health & Household", 
//         "image": "medsphere.png"
//       },
//     ]);
//   } catch (error) {
//     console.log('this is err', + error)
//   }
// }

// insertDymmyWorkData();
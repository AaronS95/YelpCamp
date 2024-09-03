require('dotenv').config();

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66d7159534e7d31fae470fb2",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nesciunt cupiditate excepturi? Ipsa omnis, similique, fugit magnam ipsum perferendis cumque ad eveniet hic tenetur a amet error et neque eos!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dxv3wimpm/image/upload/v1621865261/YelpCamp/image_kyu9lt.jpg",
          filename: "YelpCamp/image_kyu9lt",
        },
        {
          url: "https://res.cloudinary.com/dxv3wimpm/image/upload/v1635288830/YelpCamp/national-camp-day-1_wkkd7n.jpg",
          filename: "YelpCamp/national-camp-day-1_wkkd7n",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

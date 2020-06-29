const util = require('util')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

async function seedDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();

    // Create a new record (document) for a new city
    const cityCreate = { "ID": 4080, "Name": "Hengelo", "CountryCode": "NLD", "District": "Overijssel", "Population": 1 };
    const resultCreate = await client.db("importedDb").collection("city").insertOne(cityCreate);
    console.log(resultCreate.ops[0]);

    // Update that record with a new population
    // $set for updating only  one field-value
    const cityID = { "ID": 4080 };
    const cityUpdate = { $set: { "Population": 80683 } };
    const resultUpdate = await client.db("importedDb").collection("city").updateOne(cityID, cityUpdate);
    const { matchedCount, modifiedCount } = resultUpdate;
    if (matchedCount && modifiedCount) {
      console.log(`Successfully updated the item.`);
    }

    // Read the document that you just updated in two ways :
    // #  finding by the city name, 
    const cityName = { "Name": "Hengelo" };
    const resultFindCity = await client.db("importedDb").collection("city").find(cityName).toArray();
    resultFindCity.forEach((city, index, array) => {
      console.log(`The ${index + 1}. of ${array.length} documents found is : `);
      console.log(city);
    });

    // #  and then by the country code
    const countryCode = { "CountryCode": "NLD" };
    const resultFindCountry = await client.db("importedDb").collection("city").find(countryCode).sort({ "Name": 1 }).toArray();
    resultFindCountry.forEach((country, index, array) => {
      console.log(`The ${index + 1}. of ${array.length} documents found is : `);
      console.log(country);
    });

    // Delete the city
    const resultDelete = await client.db("importedDb").collection("city").deleteOne(cityName);
    console.log(`Deleted ${resultDelete.deletedCount} item.`);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
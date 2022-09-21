const mongoose = require('mongoose')

const database = process.env.DATABASE

async function main() {
    await mongoose.connect(database)
    console.log('Connected database') 
}

main().catch((err) => console.log(err))

module.exports = mongoose
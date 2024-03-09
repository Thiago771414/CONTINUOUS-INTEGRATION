function addIdToUser (user) {
    user.id = user._id;
    delete user._id
    return user;
}

class UserRepository {

    constructor(collection) {
        this.collection = collection
    }

    async findOneByEmail(email) {

        const user = await this.collection.findOne({email});

        if (user === null) {
            throw new Error(`User with email ${email} does not exist`)
        }

        return addIdToUser(user);
    }
    
    async findOneById(id) {

        const user = await this.collection.findOne({_id: id});

        if (user === null) {
            throw new Error(`User with id ${id} does not exist`)
        }

        return addIdToUser(user);
    }

    async insert(user) {
        await this.collection.insertOne(user)
        return addIdToUser(user);
    }

    async update(id, data) {

        const result = await this.collection.findOneAndUpdate({_id: id}, {
            $set: data
        }, {
            returnNewDocument: true
        })

        if (result.value === null) {
            throw Error(`User with id ${id} was not found`)
        }

        return await this.findOneById(id)
    }

    async delete(id) {
        const result = await this.collection.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            throw new Error(`User with id ${id} does not exist`)
        }
    }

    async findAll() {
        const users = await this.collection.find().toArray()
        return users.map(addIdToUser)
    }

    async deleteAll() {
        await this.collection.deleteMany({})
    }
}

module.exports = UserRepository
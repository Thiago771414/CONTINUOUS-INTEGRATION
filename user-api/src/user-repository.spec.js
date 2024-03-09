const {MongoClient} = require('mongodb');
const UserRepository = require('./user-repository');
const {ObjectId} = require('bson');

describe('UserRepository', () => {
  let userRepository;
  let collection;
  let client;

  beforeAll(async () => {
    const uri = 'mongodb://127.0.0.1:27017/workshop_mongo';
    client = new MongoClient(uri);
    await client.connect();
    collection = client.db('workshop_mongo').collection('user');
    userRepository = new UserRepository(collection);
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  describe('findOneById', () => {
    test('Deve retornar o usuário por id', async () => {
      const result = await collection.insertOne({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      const user = await userRepository
          .findOneById(ObjectId(result.insertedId));

      expect(user).toStrictEqual({
        _id: result.insertedId,
        name: 'John Doe',
        email: 'john@doe.com',
      });
    });

    test('Deve lançar uma exceção para um usuário não existente', async () => {
      await expect(userRepository
          .findOneById(ObjectId('61a05c492d399952b235d8bd')))
          .rejects
          .toThrow('User with id 61a05c492d399952b235d8bd does not exist');
    });
  });

  describe('findOneByEmail', () => {
    test('Deve retornar o usuário john@doe.com', async () => {
      const result = await collection.insertOne({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      const user = await userRepository.findOneByEmail('john@doe.com');

      expect(user).toStrictEqual({
        _id: result.insertedId,
        name: 'John Doe',
        email: 'john@doe.com',
      });
    });

    test('Deve lançar uma exceção para um usuário não existente', async () => {
      await expect(userRepository.findOneByEmail('john@doe.com'))
          .rejects.toThrow('User with email john@doe.com does not exist');
    });
  });

  describe('insert', () => {
    test('Inserir um novo usuário', async () => {
      const user = await userRepository.insert({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      const result = await userRepository.findOneByEmail('john@doe.com');

      expect(result).toStrictEqual(user);
    });
  });

  describe('update', () => {
    test('Deve atualizar um usuário existente', async () => {
      const result = await userRepository.insert({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      await userRepository.update(result._id, {
        name: 'John Doe da Silva',
        email: 'john@doe.com',
      });

      const user = await userRepository.findOneByEmail('john@doe.com');

      expect(user).toStrictEqual({
        _id: result._id,
        name: 'John Doe da Silva',
        email: 'john@doe.com',
      });
    });
    test('Deve lançar uma exceção para um usuário não existente', async () => {

    });
  });

  describe('delete', () => {
    test('Deve remover um usuário existente', async () => {
      const user = await userRepository.insert({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      await userRepository
          .delete(user._id);

      await expect(userRepository
          .findOneByEmail('john@doe.com'))
          .rejects
          .toThrow();
    });

    test('Deve lançar uma exceção para um usuário não existente', async () => {
      await expect(userRepository.delete(ObjectId('61a05c492d399952b235d8bd')))
          .rejects
          .toThrow('User with id 61a05c492d399952b235d8bd does not exist');
    });
  });

  describe('findAll', () => {
    test('Deve retornar uma lista vazia de usuários', async () => {
      const list = await userRepository.findAll();
      expect(list).toStrictEqual([]);
    });
    test('Deve retornar uma lista contendo dois usuários', async () => {
      const user1 = await userRepository.insert({
        name: 'John Doe',
        email: 'john@doe.com',
      });

      const user2 = await userRepository.insert({
        name: 'Alice Doe',
        email: 'alice@doe.com',
      });

      const list = await userRepository.findAll();

      expect(list).toStrictEqual([user1, user2]);
    });
  });
});

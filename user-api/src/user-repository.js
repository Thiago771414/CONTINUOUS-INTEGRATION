/**
 * Adiciona o ID de usuário ao objeto do usuário e remove o _id.
 * @param {Object} user - O objeto de usuário.
 * @return {Object} O objeto de usuário com o ID adicionado.
 */
function addIdToUser(user) {
  user.id = user._id;
  delete user._id;
  return user;
}
/**
 * Classe para manipulação de operações CRUD do usuário.
 */
class UserRepository {
  /**
   * Construtor da classe UserRepository.
   * A coleção MongoDB para interação com os usuários.
   * @param {Collection} collection
   */
  constructor(collection) {
    this.collection = collection;
  }
  /**
   * Encontra um usuário pelo e-mail.
   * @param {string} email - O e-mail do usuário a ser encontrado.
   * @return {Promise<Object>} O objeto de usuário encontrado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findOneByEmail(email) {
    const user = await this.collection.findOne({email});

    if (user === null) {
      throw new Error(`User with email ${email} does not exist`);
    }

    return addIdToUser(user);
  }
  /**
   * Encontra um usuário pelo ID.
   * @param {ObjectId} id - O ID do usuário a ser encontrado.
   * @return {Promise<Object>} O objeto de usuário encontrado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findOneById(id) {
    const user = await this.collection.findOne({_id: id});

    if (user === null) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return addIdToUser(user);
  }
  /**
   * Insere um novo usuário.
   * @param {Object} user - O objeto de usuário a ser inserido.
   * @return {Promise<Object>} O objeto de usuário inserido.
   */
  async insert(user) {
    await this.collection.insertOne(user);
    return addIdToUser(user);
  }
  /**
   * Atualiza um usuário existente.
   * @param {ObjectId} id - O ID do usuário a ser atualizado.
   * @param {Object} data - Os dados a serem atualizados.
   * @return {Promise<Object>} O objeto de usuário atualizado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async update(id, data) {
    const result = await this.collection.findOneAndUpdate({_id: id}, {
      $set: data,
    }, {
      returnNewDocument: true,
    });

    if (result.value === null) {
      throw Error(`User with id ${id} was not found`);
    }

    return await this.findOneById(id);
  }
  /**
   * Exclui um usuário pelo ID.
   * @param {ObjectId} id - O ID do usuário a ser excluído.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async delete(id) {
    const result = await this.collection.deleteOne({_id: id});

    if (result.deletedCount === 0) {
      throw new Error(`User with id ${id} does not exist`);
    }
  }
  /**
   * Encontra todos os usuários.
   * @return {Promise<Array>} Uma lista de todos os usuários.
   */
  async findAll() {
    const users = await this.collection.find().toArray();
    return users.map(addIdToUser);
  }
  /**
   * Exclui todos os usuários.
   */
  async deleteAll() {
    await this.collection.deleteMany({});
  }
}

module.exports = UserRepository;

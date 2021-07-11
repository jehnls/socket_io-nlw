import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


export class UserService {
  private usersRepository: Repository<User>;

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create( email: string){
    
    const userExits = await this.usersRepository.findOne({
      email,
    });

    if(userExits){
      return userExits;
    }
    
    const user = this.usersRepository.create({
      email,
    });
    
    await this.usersRepository.save(user);
    
    return user;
  }

  async findByEmail (email : string) {
     const user = await this.usersRepository.findOne({
      email,
    });

    return user;
  }
}
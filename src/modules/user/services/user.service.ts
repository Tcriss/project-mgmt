import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, EditUserDto } from '../dto';
import { User } from '../entities';
import { ResponseI } from 'src/common/interfaces';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    public async findAllUsers(): Promise<User[]> {
        const users: User[] = await this.userRepository.find();

        if (users.length == 0) throw new HttpException('There are no users', HttpStatus.NO_CONTENT);
        if (users == null || users == undefined) throw new HttpException('Opps!, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)

        return users;
    }

    public async findOneUser(uuid: string): Promise<User> {
        const user: User = await this.userRepository.findOneBy({ uuid: uuid });

        if (!user) throw new HttpException('No user found with this uuid', HttpStatus.NO_CONTENT);

        return user;
    }

    public async createUser(user: CreateUserDto): Promise<ResponseI> {
        const userRes: User = await this.userRepository.save(user);

        if (!userRes) throw new HttpException('Opps! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (userRes) {
            const res: ResponseI = {
                message: 'User created succesfully',
                data: userRes
            }

            return res;
        }
    }

    public async editUser(uuid: string, user: EditUserDto): Promise<ResponseI> {
        const res: UpdateResult = await this.userRepository.update(uuid, user);

        if (res.affected === 0) throw new HttpException('No user found with this uuid', HttpStatus.NOT_FOUND);
        if (res.affected === 1) {
            const user = await this.findOneUser(uuid);
            const res: ResponseI = {
                message: 'changes saved succesfully',
                data: user
            }

            return res;
        }
    }

    public async deleteUser(uuid: string): Promise<void> {
        const res: DeleteResult = await this.userRepository.delete(uuid);

        if (res.affected === 0) throw new HttpException('Oops!, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (res.affected === 1) throw new HttpException('User deleted', HttpStatus.OK);
    }
}

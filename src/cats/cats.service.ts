import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cache } from 'cache-manager';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCatDto: CreateCatDto) {
    const cats: Cat[] = JSON.parse(await this.cacheManager.get('cats')) || [];
    console.log(cats);

    cats.push(createCatDto);
    await this.cacheManager.set('cats', JSON.stringify(cats), { ttl: 0 });
    return 'This action adds a new cat';
  }

  async findAll() {
    const cats: Cat[] = JSON.parse(await this.cacheManager.get('cats'));
    return cats;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}

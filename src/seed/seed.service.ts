import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data: PokeResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    )
      .then((res) =>
        res
          .json
          // console.log(res)
          (),
      )

      .catch((err) => console.log(err));

    const pokemonsToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');

      const no = +segments[segments.length - 2];

      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return { message: 'Seed executed successfully' };
  }

  async getSeed() {
    const pokemons = await this.pokemonModel.find();

    return pokemons;
  }
}

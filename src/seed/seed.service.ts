import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {
    const data: PokeResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    )
      .then((res) =>
        res
          .json
          // console.log(res)
          (),
      )
      .catch((err) => console.log(err));

    data.results.forEach(({ name, url }) => {
      let segments = url.split('/');

      let n_pokemon = +segments[segments.length - 2];
      console.log({ name, n_pokemon });
    });

    return data.results;
  }
}

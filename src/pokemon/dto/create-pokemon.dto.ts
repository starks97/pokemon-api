import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt({ message: 'no must be a number' })
  @Min(1, { message: 'no must have min of 1 element' })
  @IsPositive({ message: 'no must be a positive number' })
  no: number;

  @IsString({ always: true, message: 'Please enter a string  ' })
  name: string;
}

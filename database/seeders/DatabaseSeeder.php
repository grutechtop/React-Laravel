<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Book;
use App\Models\Comment;
use Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        // Let's make two users
        Author::create(['name' => $faker->name, 'age' => $faker->randomDigit()]);
        Author::create(['name' => $faker->name, 'age' => $faker->randomDigit()]);

        // Let's make two Books
        Book::create([
            'author_id' => 1,
            'title' => $faker->name,
            'date' => $faker->randomDigit(),
        ]);
        Book::create([
            'author_id' => 1,
            'title' => $faker->name,
            'date' => $faker->randomDigit(),
        ]);

        // Let's make one comment 
        Comment::create([
            'book_id' => 1,
            'name' => $faker->name,
            'comment' => $faker->realText()
        ]);
    }
}

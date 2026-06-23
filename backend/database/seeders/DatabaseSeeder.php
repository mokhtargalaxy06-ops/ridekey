<?php

namespace Database\Seeders;

use App\Models\Bike;
use App\Models\Blog;
use App\Models\GearItem;
use App\Models\Page;
use App\Models\Ride;
use App\Models\User;
use App\Support\RideKeyCatalog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@ridekey.ma')],
            [
                'name' => 'RideKey Admin',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'RideKey2026!')),
            ],
        );

        foreach (RideKeyCatalog::bikes() as $bike) {
            Bike::updateOrCreate(['id' => $bike['id']], $bike);
        }

        foreach (RideKeyCatalog::gear() as $gearItem) {
            GearItem::updateOrCreate(['id' => $gearItem['id']], $gearItem);
        }

        foreach (RideKeyCatalog::rides() as $ride) {
            Ride::updateOrCreate(['id' => $ride['id']], $ride);
        }

        foreach (RideKeyCatalog::blogs() as $blog) {
            Blog::updateOrCreate(['id' => $blog['id']], $blog);
        }

        foreach (RideKeyCatalog::pages() as $page) {
            Page::updateOrCreate(['id' => $page['id']], $page);
        }
    }
}

<?php

namespace Tests\Feature;

use App\Models\Bike;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_and_manage_bikes(): void
    {
        User::create([
            'name' => 'RideKey Admin',
            'email' => 'admin@ridekey.ma',
            'password' => Hash::make('RideKey2026!'),
        ]);

        $token = $this->postJson('/api/admin/login', [
            'email' => 'admin@ridekey.ma',
            'password' => 'RideKey2026!',
        ])
            ->assertOk()
            ->json('token');

        $this->postJson('/api/admin/bikes', [
            'id' => 'test-bike',
            'name' => 'Test Bike',
            'brand' => 'Test',
            'type' => 'Adventure',
            'price' => 500,
            'rentalRate' => 500,
            'gallery' => [],
        ], ['Authorization' => "Bearer {$token}"])
            ->assertCreated()
            ->assertJsonPath('data.id', 'test-bike');

        $this->assertDatabaseHas('bikes', ['id' => 'test-bike']);

        $this->putJson('/api/admin/bikes/test-bike', [
            'id' => 'test-bike',
            'name' => 'Updated Bike',
            'brand' => 'Test',
            'type' => 'Adventure',
            'price' => 600,
            'rentalRate' => 600,
            'gallery' => [],
        ], ['Authorization' => "Bearer {$token}"])
            ->assertOk()
            ->assertJsonPath('data.name', 'Updated Bike');

        $this->deleteJson('/api/admin/bikes/test-bike', [], ['Authorization' => "Bearer {$token}"])
            ->assertOk();

        $this->assertDatabaseMissing('bikes', ['id' => 'test-bike']);
    }

    public function test_admin_resources_reject_missing_token(): void
    {
        Bike::create([
            'id' => 'guarded-bike',
            'name' => 'Guarded Bike',
            'brand' => 'Test',
            'type' => 'Adventure',
            'price' => 1,
            'rentalRate' => 1,
            'gallery' => [],
        ]);

        $this->getJson('/api/admin/bikes')
            ->assertUnauthorized();
    }
}

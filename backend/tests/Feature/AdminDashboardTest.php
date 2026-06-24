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

    public function test_admin_can_create_update_and_delete_blog_posts(): void
    {
        $headers = ['Authorization' => 'Bearer ridekey-local-admin-token'];
        $payload = [
            'id' => 'dashboard-crud-post',
            'title' => 'Dashboard CRUD Post',
            'seoTitle' => 'Dashboard CRUD Post',
            'date' => 'Jun 24, 2026',
            'publishedAt' => '2026-06-24',
            'updatedAt' => '2026-06-24',
            'isPublished' => false,
            'tag' => 'Testing',
            'image' => null,
            'excerpt' => 'A test article created through the dashboard API.',
            'keywords' => ['dashboard', 'crud'],
            'sections' => [
                ['heading' => 'First section', 'body' => 'Article body.'],
            ],
        ];

        $this->postJson('/api/admin/blogs', $payload, $headers)
            ->assertCreated()
            ->assertJsonPath('data.isPublished', false);

        $this->getJson('/api/blogs')
            ->assertOk()
            ->assertJsonMissing(['id' => 'dashboard-crud-post']);

        $payload['title'] = 'Published Dashboard CRUD Post';
        $payload['isPublished'] = true;

        $this->putJson('/api/admin/blogs/dashboard-crud-post', $payload, $headers)
            ->assertOk()
            ->assertJsonPath('data.title', 'Published Dashboard CRUD Post')
            ->assertJsonPath('data.isPublished', true);

        $this->getJson('/api/blogs')
            ->assertOk()
            ->assertJsonFragment(['id' => 'dashboard-crud-post']);

        $this->deleteJson('/api/admin/blogs/dashboard-crud-post', [], $headers)
            ->assertOk();

        $this->assertDatabaseMissing('blogs', ['id' => 'dashboard-crud-post']);
    }
}

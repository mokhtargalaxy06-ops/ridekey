<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiCatalogTest extends TestCase
{
    public function test_catalog_endpoint_returns_core_content(): void
    {
        $this->getJson('/api/catalog')
            ->assertOk()
            ->assertJsonStructure([
                'bikes' => [
                    '*' => ['id', 'name', 'brand', 'price', 'gallery'],
                ],
                'bikeFilters' => ['brands', 'types', 'displacements', 'priceRanges'],
                'gear',
                'rides',
                'rideShowcase',
                'ridesPage',
                'blogs',
            ]);
    }

    public function test_single_bike_endpoint_returns_404_for_unknown_bike(): void
    {
        $this->getJson('/api/bikes/not-a-bike')
            ->assertNotFound();
    }

    public function test_rental_request_endpoint_validates_and_accepts_payload(): void
    {
        $this->postJson('/api/rental-requests', [
            'bike_id' => 'dr650',
            'name' => 'Test Rider',
            'phone' => '+212600000000',
            'start_date' => '2026-07-01',
            'end_date' => '2026-07-03',
            'pickup_time' => '10:00',
            'return_time' => '18:00',
            'gear' => ['gopro hero 11'],
        ])
            ->assertCreated()
            ->assertJsonPath('type', 'rental_request');
    }
}

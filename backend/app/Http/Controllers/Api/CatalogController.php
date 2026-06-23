<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use App\Models\Blog;
use App\Models\GearItem;
use App\Models\Page;
use App\Models\Ride;
use App\Support\RideKeyCatalog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Schema;

class CatalogController extends Controller
{
    public function catalog(): JsonResponse
    {
        return response()->json([
            'bikes' => $this->bikesData(),
            'bikeFilters' => RideKeyCatalog::bikeFiltersFor($this->bikesData()),
            'gear' => $this->gearData(),
            'rides' => $this->ridesData(),
            'rideShowcase' => RideKeyCatalog::rideShowcase(),
            'ridesPage' => RideKeyCatalog::ridesPage(),
            'blogs' => $this->blogsData(),
            'pages' => $this->pagesData(),
        ]);
    }

    public function bikes(): JsonResponse
    {
        return response()->json([
            'data' => $this->bikesData(),
            'filters' => RideKeyCatalog::bikeFiltersFor($this->bikesData()),
        ]);
    }

    public function bike(string $id): JsonResponse
    {
        $bike = collect($this->bikesData())->firstWhere('id', $id);

        abort_if(! $bike, 404, 'Bike not found.');

        return response()->json(['data' => $bike]);
    }

    public function gear(): JsonResponse
    {
        return response()->json(['data' => $this->gearData()]);
    }

    public function rides(): JsonResponse
    {
        return response()->json([
            'data' => $this->ridesData(),
            'showcase' => RideKeyCatalog::rideShowcase(),
            'page' => RideKeyCatalog::ridesPage(),
        ]);
    }

    public function blogs(): JsonResponse
    {
        return response()->json(['data' => $this->blogsData()]);
    }

    public function blog(string $id): JsonResponse
    {
        $blog = collect($this->blogsData())->firstWhere('id', $id);

        abort_if(! $blog, 404, 'Blog post not found.');

        return response()->json(['data' => $blog]);
    }

    public function pages(): JsonResponse
    {
        return response()->json(['data' => $this->pagesData()]);
    }

    public function page(string $id): JsonResponse
    {
        $page = collect($this->pagesData())->firstWhere('id', $id);

        abort_if(! $page, 404, 'Page not found.');

        return response()->json(['data' => $page]);
    }

    private function bikesData(): array
    {
        return $this->databaseRows(Bike::class, 'bikes', RideKeyCatalog::bikes());
    }

    private function gearData(): array
    {
        return $this->databaseRows(GearItem::class, 'gear_items', RideKeyCatalog::gear());
    }

    private function ridesData(): array
    {
        return $this->databaseRows(Ride::class, 'rides', RideKeyCatalog::rides());
    }

    private function blogsData(): array
    {
        return $this->databaseRows(Blog::class, 'blogs', RideKeyCatalog::blogs());
    }

    private function pagesData(): array
    {
        return $this->databaseRows(Page::class, 'pages', RideKeyCatalog::pages());
    }

    /**
     * @param class-string<Model> $model
     */
    private function databaseRows(string $model, string $table, array $fallback): array
    {
        if (! Schema::hasTable($table) || $model::query()->count() === 0) {
            return $fallback;
        }

        return $model::query()
            ->orderBy('created_at')
            ->get()
            ->map(fn (Model $item) => $item->toArray())
            ->all();
    }
}

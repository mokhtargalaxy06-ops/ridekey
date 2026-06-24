<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bike;
use App\Models\Blog;
use App\Models\GearItem;
use App\Models\Page;
use App\Models\Ride;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AdminCatalogController extends Controller
{
    private const RESOURCES = [
        'bikes' => Bike::class,
        'gear' => GearItem::class,
        'rides' => Ride::class,
        'blogs' => Blog::class,
        'pages' => Page::class,
    ];

    public function index(Request $request, string $resource): JsonResponse
    {
        $this->authorizeAdmin($request);

        $model = $this->modelFor($resource);

        $query = $model::query();

        if ($resource === 'blogs') {
            $query->orderByDesc('updatedAt')->orderByDesc('created_at');
        } else {
            $query->orderBy('created_at');
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request, string $resource): JsonResponse
    {
        $this->authorizeAdmin($request);

        $model = $this->modelFor($resource);
        $payload = $this->validatePayload($request, $resource);

        /** @var Model $record */
        $record = $model::query()->create($payload);

        return response()->json(['data' => $record], 201);
    }

    public function update(Request $request, string $resource, string $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $model = $this->modelFor($resource);
        $record = $model::query()->findOrFail($id);
        $payload = $this->validatePayload($request, $resource, $id);
        $record->update($payload);

        return response()->json(['data' => $record->fresh()]);
    }

    public function destroy(Request $request, string $resource, string $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $model = $this->modelFor($resource);
        $model::query()->findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted.']);
    }

    public function upload(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $payload = $request->validate([
            'file' => [
                'required',
                'file',
                'mimetypes:image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm',
                'max:102400',
            ],
            'folder' => ['nullable', 'string', 'max:80'],
        ]);

        $file = $payload['file'];
        $folder = Str::slug($payload['folder'] ?? 'media') ?: 'media';
        $directory = public_path("uploads/{$folder}");

        File::ensureDirectoryExists($directory);

        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move($directory, $filename);

        $path = "/uploads/{$folder}/{$filename}";

        return response()->json([
            'url' => url($path),
            'path' => $path,
            'mime' => $file->getClientMimeType(),
        ], 201);
    }

    private function authorizeAdmin(Request $request): void
    {
        $token = $request->bearerToken() ?: $request->header('X-Admin-Token');

        abort_unless(
            is_string($token) && hash_equals(config('services.admin.token'), $token),
            401,
            'Unauthorized.',
        );
    }

    /**
     * @return class-string<Model>
     */
    private function modelFor(string $resource): string
    {
        abort_unless(array_key_exists($resource, self::RESOURCES), 404, 'Resource not found.');

        return self::RESOURCES[$resource];
    }

    private function validatePayload(Request $request, string $resource, ?string $id = null): array
    {
        $this->ensurePayloadId($request, $id);

        $unique = Rule::unique($this->tableFor($resource), 'id')->ignore($id, 'id');

        return match ($resource) {
            'bikes' => $request->validate([
                'id' => ['required', 'string', 'max:120', $unique],
                'name' => ['required', 'string', 'max:180'],
                'brand' => ['required', 'string', 'max:120'],
                'type' => ['required', 'string', 'max:120'],
                'price' => ['required', 'integer', 'min:0'],
                'rentalRate' => ['required', 'integer', 'min:0'],
                'engine' => ['nullable', 'string', 'max:180'],
                'displacement' => ['nullable', 'string', 'max:80'],
                'torque' => ['nullable', 'string', 'max:80'],
                'topSpeed' => ['nullable', 'string', 'max:80'],
                'power' => ['nullable', 'string', 'max:80'],
                'weight' => ['nullable', 'string', 'max:80'],
                'image' => ['nullable', 'string'],
                'gallery' => ['nullable', 'array'],
                'gallery.*' => ['string'],
                'description' => ['nullable', 'string'],
            ]),
            'gear' => $request->validate([
                'id' => ['required', 'string', 'max:120', $unique],
                'name' => ['required', 'string', 'max:180'],
                'category' => ['nullable', 'string', 'max:120'],
                'rating' => ['required', 'integer', 'min:1', 'max:5'],
                'price' => ['required', 'string', 'max:80'],
                'priceValue' => ['required', 'integer', 'min:0'],
                'image' => ['nullable', 'string'],
                'url' => ['nullable', 'string'],
                'cta' => ['nullable', 'string', 'max:80'],
            ]),
            'rides' => $request->validate([
                'id' => ['required', 'string', 'max:120', $unique],
                'title' => ['required', 'string', 'max:180'],
                'price' => ['required', 'string', 'max:80'],
                'startDate' => ['nullable', 'string', 'max:80'],
                'startTime' => ['nullable', 'string', 'max:80'],
                'endDate' => ['nullable', 'string', 'max:80'],
                'endTime' => ['nullable', 'string', 'max:80'],
                'image' => ['nullable', 'string'],
                'video' => ['nullable', 'array'],
            ]),
            'blogs' => $request->validate([
                'id' => ['required', 'string', 'max:160', $unique],
                'title' => ['required', 'string', 'max:240'],
                'seoTitle' => ['nullable', 'string', 'max:240'],
                'date' => ['nullable', 'string', 'max:80'],
                'publishedAt' => ['nullable', 'date'],
                'updatedAt' => ['nullable', 'date'],
                'isPublished' => ['required', 'boolean'],
                'tag' => ['nullable', 'string', 'max:120'],
                'image' => ['nullable', 'string'],
                'excerpt' => ['nullable', 'string'],
                'keywords' => ['nullable', 'array'],
                'keywords.*' => ['string'],
                'sections' => ['nullable', 'array'],
            ]),
            'pages' => $request->validate([
                'id' => ['required', 'string', 'max:120', $unique],
                'title' => ['required', 'string', 'max:180'],
                'path' => ['required', 'string', 'max:180'],
                'seoTitle' => ['nullable', 'string', 'max:240'],
                'seoDescription' => ['nullable', 'string'],
                'heroImage' => ['nullable', 'string'],
                'isPublished' => ['nullable', 'boolean'],
                'content' => ['nullable', 'array'],
            ]),
        };
    }

    private function ensurePayloadId(Request $request, ?string $currentId = null): void
    {
        if ($request->filled('id')) {
            return;
        }

        $source = $currentId
            ?: $request->input('title')
            ?: $request->input('name')
            ?: $request->input('path')
            ?: (string) Str::uuid();

        $request->merge([
            'id' => Str::slug($source) ?: (string) Str::uuid(),
        ]);
    }

    private function tableFor(string $resource): string
    {
        return match ($resource) {
            'bikes' => 'bikes',
            'gear' => 'gear_items',
            'rides' => 'rides',
            'blogs' => 'blogs',
            'pages' => 'pages',
        };
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RequestController extends Controller
{
    public function contact(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['nullable', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:80'],
            'model' => ['nullable', 'string', 'max:160'],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        return $this->accepted('contact_request', $payload);
    }

    public function rental(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'bike_id' => ['required', 'string', 'max:120'],
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:80'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'pickup_time' => ['nullable', 'date_format:H:i'],
            'return_time' => ['nullable', 'date_format:H:i'],
            'gear' => ['array'],
            'gear.*' => ['string', 'max:120'],
            'note' => ['nullable', 'string', 'max:2000'],
        ]);

        return $this->accepted('rental_request', $payload);
    }

    public function ride(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'duration' => ['required', 'integer', 'min:1', 'max:60'],
            'riders' => ['required', 'integer', 'min:1', 'max:50'],
            'motorcycles' => ['required', 'integer', 'min:1', 'max:50'],
            'route' => ['nullable', 'string', 'max:180'],
            'start_date' => ['nullable', 'date'],
            'skill_level' => ['nullable', 'in:beginner,intermediate,advanced'],
            'accommodation' => ['nullable', 'in:yes,no,0,1,true,false'],
            'support_vehicle' => ['nullable', 'in:yes,no,0,1,true,false'],
            'note' => ['nullable', 'string', 'max:2000'],
        ]);

        return $this->accepted('ride_request', $payload);
    }

    private function accepted(string $type, array $payload): JsonResponse
    {
        Log::info("RideKey {$type}", $payload);

        return response()->json([
            'message' => 'Request received.',
            'type' => $type,
            'data' => $payload,
        ], 201);
    }
}

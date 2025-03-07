<?php

namespace App\Http\Controllers; // Add namespace

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller; // Import base Controller class

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Auth::user()->tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'startdate' => 'required|date',
            'enddate' => 'required|date|after_or_equal:startdate',
            'notes' => 'nullable|string',
            'category' => 'nullable|string|in:low,medium,high',
        ]);

        $task = auth()->user()->tasks()->create($validated);
        return response()->json($task, 201);
    }
}

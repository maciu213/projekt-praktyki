<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'priority' => 'required|in:low,medium,high',  // Use the 3-tier system
        ]);

        // Create a new task
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'priority' => $validated['priority'],
        ]);

        // Return response
        return response()->json($task, 201); // Return created task with 201 status
    }

    // Method to get all tasks (optional)
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }
}

<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']); // For register
Route::post('/login', [AuthController::class, 'login']); // For login


Route::post('tasks', [TaskController::class, 'store']);  // For creating tasks
Route::get('tasks', [TaskController::class, 'index']);   // For retrieving all tasks 

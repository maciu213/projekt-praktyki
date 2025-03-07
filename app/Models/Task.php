<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model  // Change from Tasks to Task
{
    use HasFactory;

    protected $table = 'tasks'; // Explicitly specify table name

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'priority',
        'user_id', // If tracking user tasks
    ];
}

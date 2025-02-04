<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Scheduling\Schedule;

use App\Jobs\SyncItemsJob;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('sync:items', function () {
    dispatch(new SyncItemsJob);
    $this->info('SyncItemsJob dispatched successfully.');
})->purpose('Dispatch the SyncItemsJob.');

$schedule = app(Schedule::class);
$schedule->command('sync:items')->daily();

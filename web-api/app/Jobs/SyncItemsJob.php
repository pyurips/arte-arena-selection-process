<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

use App\Models\Item;
use App\Models\SyncLog;

class SyncItemsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');
    
        if ($response->ok()) {
            $items = $response->json();
            $countProcessed = 0;

            Item::whereNotNull('external_id')->delete();

            foreach ($items as $data) {
                $item = Item::updateOrCreate(
                    ['external_id' => $data['id']],
                    [
                        'title' => $data['title'],
                        'body'  => $data['body']
                    ]
                );

                if ($item->wasRecentlyCreated) {
                    $countProcessed++;
                }
            }

            SyncLog::create([
                'records_processed' => $countProcessed
            ]);
        } else {
            \Log::error('Erro ao obter dados da API para sincronização.');
        }
    }
}

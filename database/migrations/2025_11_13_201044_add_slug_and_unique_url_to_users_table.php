<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Slug único para el perfil del barbero (ej. juan-perez)
            $table->string('slug')->nullable()->unique()->after('codigo_barbero');

            // URL única o personalizada (ej. /b/juan-perez o /barber/juan-perez)
            $table->string('unique_url')->nullable()->unique()->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropUnique(['unique_url']);
            $table->dropColumn(['slug', 'unique_url']);
        });
    }
};

import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';


export default function Dashboard({ barbero }) {
    return (
        <AppLayout >
            <Head title={`Panel de ${barbero.name}`} />

            <div className="min-h-screen bg-black text-white p-10">
                <h1 className="text-4xl font-bold mb-6">
                    Bienvenido {barbero.name}
                </h1>

                <p className="text-zinc-400 mb-4">
                    Este es tu dashboard personal.
                </p>

                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-2">Tu información:</h2>
                    <ul className="text-zinc-300">
                        <li><b>Slug:</b> {barbero.slug}</li>
                        <li><b>Código:</b> {barbero.codigo_barbero}</li>
                        <li><b>URL pública:</b> {barbero.unique_url}</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}

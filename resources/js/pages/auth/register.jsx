import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <img 
                            src="/img/barb-er.png" 
                            alt="Logo" 
                            className="h-42 w-42 object-contain"
                        />
                    </div>

                    {/* Título y descripción */}
                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Crea una cuenta
                        </h1>
                        <p className="text-zinc-400">
                            Ingrese sus datos a continuación para crear su cuenta.
                        </p>
                    </div>

                    {/* Formulario */}
                    <form className="flex flex-col gap-7 bg-zinc-800 p-5 rounded-2xl border border-zinc-700" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-white">Nombre</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Nombre completo"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-white">Correo</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-white">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Contraseña"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-white">Confirmar contraseña</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirmar contraseña"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="mt-2 w-full cursor-pointer bg-white text-black hover:bg-zinc-200 font-semibold" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Crear Cuenta
                            </Button>
                        </div>

                        <div className="text-zinc-400 text-center text-sm">
                           ¿Ya tienes una cuenta?{' '}
                            <TextLink href={route('login')} tabIndex={6} className="text-white hover:underline">
                                Entrar
                            </TextLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
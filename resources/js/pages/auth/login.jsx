import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Scissors } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { User, KeyRound } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-6xl bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Left Panel */}
                    <div className="md:w-1/2 p-8 md:p-12 lg:pb-18 flex flex-col justify-center">
                         <div className="flex justify-center">
                        <img 
                            src="/img/barb-er.png" 
                            alt="Logo" 
                            className="h-42 w-42 object-contain"
                        />
                    </div>

                       <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-center lg:text-left whitespace-nowrap">
  Bienvenido de vuelta
</h2>
                        
                        <p className="text-zinc-400 mb-12 text-lg">
                            Accede a tu cuenta para gestionar tu barbería o reservar tu próxima cita
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-zinc-300">Sistema seguro y confiable</span>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-zinc-300">Acceso desde cualquier dispositivo</span>
                            </div>
                            
                            <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-zinc-300">Gestión completa de tu negocio</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="md:w-1/2 bg-zinc-800 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Iniciar sesión
                        </h3>
                        <p className="text-zinc-400 mb-8">
                            Ingresa tus credenciales para continuar
                        </p>

                        {status && <div className="mb-6 text-center text-sm font-medium text-green-500">{status}</div>}

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="flex items-center text-white gap-2">
                                        <User size={18} />
                                        Correo electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="flex items-center text-white gap-2">
                                            <KeyRound size={18} />
                                            Contraseña
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink 
                                                href={route('password.request')} 
                                                className="ml-auto text-sm text-zinc-400 hover:text-white" 
                                                tabIndex={5}
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Tu contraseña"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600 py-5"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="border-zinc-700 bg-zinc-900"
                                    />
                                    <Label htmlFor="remember" className="text-zinc-300">
                                        Recordar credenciales
                                    </Label>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="mt-4 w-full cursor-pointer bg-white text-black hover:bg-zinc-200 font-semibold p-5" 
                                    tabIndex={4} 
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Iniciar sesión
                                </Button>
                                <div className="text-zinc-400 text-center text-sm">
                           ¿No tienes cuenta?{' '}
                            <TextLink href={route('register')} tabIndex={6} className="text-white hover:underline">
                                Registrate aquí
                            </TextLink>
                        </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
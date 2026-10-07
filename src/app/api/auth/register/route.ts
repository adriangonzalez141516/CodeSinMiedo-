import { NextResponse } from 'next/server';
import { saveUser, getUserByEmail } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const id = Date.now().toString() + Math.random().toString(36).substring(2);

    const newUser = { id, name, email, passwordHash };
    await saveUser(newUser);

    const token = await signToken({ id: newUser.id, email: newUser.email, name: newUser.name });

    const response = NextResponse.json({ success: true, message: 'Usuario registrado exitosamente', user: { id, name, email } }, { status: 201 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2 // 2 horas
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}

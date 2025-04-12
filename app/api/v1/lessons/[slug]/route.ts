import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { deleteLesson, getLesson, updateLesson } from '@/features/lesson/domain/use-cases';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await getLesson(slug);

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = params.slug;
  const body = await request.json();
  await updateLesson(slug, body);

  return NextResponse.json({ message: 'Lesson updated successfully' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = params.slug;
  await deleteLesson(slug);

  return NextResponse.json({ message: 'Lesson deleted successfully' });
}
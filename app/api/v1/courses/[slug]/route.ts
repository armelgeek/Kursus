import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { deleteCourse, getCourse, updateCourse } from '@/features/course/domain/use-cases';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const data = await getCourse(slug);

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = (await params).slug;
  const body = await request.json();
  await updateCourse(slug, body);

  return NextResponse.json({ message: 'Course updated successfully' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = (await params).slug;
  await deleteCourse(slug);

  return NextResponse.json({ message: 'Course deleted successfully' });
}

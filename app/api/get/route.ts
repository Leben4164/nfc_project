import { NextResponse } from "next/server";
import { initialStudents } from '../../../data/students';

let globalStudents = initialStudents;

export async function GET() {
  return globalStudents
}
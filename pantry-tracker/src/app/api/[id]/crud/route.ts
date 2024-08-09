import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../firebase"; // Adjust the import path as needed
import { ref, set, remove, get } from "firebase/database";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const emailIdPart = params.id; // Extract `id` from the path parameters

  try {
    const { item } = await req.json(); // Use req.json() for reading JSON body
    const itemRef = ref(database, `users/${emailIdPart}/pantryItems/${item}`);
    await set(itemRef, item);
    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error adding item" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const emailIdPart = params.id; // Extract `id` from the path parameters

  try {
    const itemsRef = ref(database, `users/${emailIdPart}/pantryItems`);
    const snapshot = await get(itemsRef);
    const data = snapshot.val();
    return NextResponse.json(data ? Object.values(data) : []);
  } catch (error) {
    return NextResponse.json({ error: "Error retrieving items" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const emailIdPart = params.id; // Extract `id` from the path parameters

  try {
    const { item } = await req.json();
    const itemRef = ref(database, `users/${emailIdPart}/pantryItems/${item}`);
    await remove(itemRef);
    return NextResponse.json({ message: "Item removed successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error removing item" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Product from "@/app/models/Product";

// Get single product
export async function GET(request: NextRequest, { params }: any) {
  await connectToDatabase();

  try {
    const Params = await params;
    const product = await Product.findById(Params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Update product
export async function PUT(request: NextRequest, { params }: any) {
  await connectToDatabase();
  const updates = await request.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(params.id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(request: NextRequest, { params }: any) {
  await connectToDatabase();

  try {
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

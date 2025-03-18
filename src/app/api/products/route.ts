import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Product from "@/app/models/Product";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { name, description, price, images, category, stock } =
    await request.json();

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      images,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
export async function GET() {
  await connectToDatabase();

  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

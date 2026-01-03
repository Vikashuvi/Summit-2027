import { NextResponse } from "next/server";

// Gallery images are fetched directly from Firebase client SDK in GallerySection
// This endpoint is kept for potential future server-side needs
export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Gallery images are loaded client-side from Firebase",
    });
}

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: folder || "summit-2027",
            resource_type: "auto",
        });

        // Create optimized URL with auto format (AVIF/WebP) and auto quality
        const optimizedUrl = result.secure_url.replace(
            '/upload/',
            '/upload/f_auto,q_auto/'
        );

        return NextResponse.json({
            success: true,
            url: optimizedUrl, // Use the optimized URL
            originalUrl: result.secure_url, // Keep original if needed
            publicId: result.public_id,
            width: result.width,
            height: result.height,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { publicId } = await request.json();

        console.log("Delete request for publicId:", publicId);

        if (!publicId) {
            return NextResponse.json(
                { error: "No public ID provided" },
                { status: 400 }
            );
        }

        // Delete from Cloudinary with explicit resource_type
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            invalidate: true, // Clear CDN cache
        });

        console.log("Cloudinary delete result:", result);

        // Check if deletion was successful
        if (result.result === "ok" || result.result === "not found") {
            return NextResponse.json({
                success: true,
                result,
            });
        } else {
            console.error("Cloudinary deletion failed:", result);
            return NextResponse.json({
                success: false,
                error: "Failed to delete from Cloudinary",
                result,
            });
        }
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { error: "Failed to delete image", details: String(error) },
            { status: 500 }
        );
    }
}

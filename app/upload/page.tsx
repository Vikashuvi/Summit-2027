"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
    orderBy,
    query,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Plus,
    Image as ImageIcon,
    Users,
    Loader2,
    X,
    GripVertical,
    Edit3,
    Save,
} from "lucide-react";
import Image from "next/image";

interface CarouselImage {
    id: string;
    url: string;
    publicId: string;
    order: number;
    createdAt: Date;
}

interface Speaker {
    id: string;
    name: string;
    title: string;
    company: string;
    imageUrl: string;
    publicId: string;
    order: number;
    createdAt: Date;
}

type TabType = "carousel" | "speakers";

export default function UploadPage() {
    const [activeTab, setActiveTab] = useState<TabType>("carousel");
    const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSpeaker, setEditingSpeaker] = useState<string | null>(null);
    const [speakerForm, setSpeakerForm] = useState({
        name: "",
        title: "",
        company: "",
    });
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    // Fetch data from Firebase
    const fetchCarouselImages = useCallback(async () => {
        try {
            const q = query(
                collection(db, "carouselImages"),
                orderBy("order", "asc")
            );
            const snapshot = await getDocs(q);
            const images = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as CarouselImage[];
            setCarouselImages(images);
        } catch (error) {
            console.error("Error fetching carousel images:", error);
        }
    }, []);

    const fetchSpeakers = useCallback(async () => {
        try {
            const q = query(collection(db, "speakers"), orderBy("order", "asc"));
            const snapshot = await getDocs(q);
            const speakersList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Speaker[];
            setSpeakers(speakersList);
        } catch (error) {
            console.error("Error fetching speakers:", error);
        }
    }, []);

    useEffect(() => {
        fetchCarouselImages();
        fetchSpeakers();
        setIsLoading(false);
    }, [fetchCarouselImages, fetchSpeakers]);

    // Upload image to Cloudinary
    const uploadToCloudinary = async (
        file: File,
        folder: string
    ): Promise<{ url: string; publicId: string } | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            return { url: data.url, publicId: data.publicId };
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        }
    };

    // Delete from Cloudinary
    const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
        try {
            console.log("Deleting image with publicId:", publicId);

            const response = await fetch("/api/upload", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId }),
            });

            const data = await response.json();
            console.log("Delete response:", data);

            if (!response.ok) {
                console.error("Delete failed:", data);
            }

            return response.ok || data.success;
        } catch (error) {
            console.error("Delete error:", error);
            return false;
        }
    };

    // Carousel Image Handlers
    const handleCarouselUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);

        for (const file of Array.from(files)) {
            const result = await uploadToCloudinary(file, "summit-2027/carousel");
            if (result) {
                await addDoc(collection(db, "carouselImages"), {
                    url: result.url,
                    publicId: result.publicId,
                    order: carouselImages.length,
                    createdAt: new Date(),
                });
            }
        }

        await fetchCarouselImages();
        setIsUploading(false);
        e.target.value = "";
    };

    const handleCarouselDelete = async (image: CarouselImage) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        setIsUploading(true);
        await deleteFromCloudinary(image.publicId);
        await deleteDoc(doc(db, "carouselImages", image.id));
        await fetchCarouselImages();
        setIsUploading(false);
    };

    // Speaker Handlers
    const handleSpeakerUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const result = await uploadToCloudinary(file, "summit-2027/speakers");
        if (result) {
            await addDoc(collection(db, "speakers"), {
                name: "New Speaker",
                title: "Title",
                company: "Company",
                imageUrl: result.url,
                publicId: result.publicId,
                order: speakers.length,
                createdAt: new Date(),
            });
        }

        await fetchSpeakers();
        setIsUploading(false);
        e.target.value = "";
    };

    const handleSpeakerDelete = async (speaker: Speaker) => {
        if (!confirm("Are you sure you want to delete this speaker?")) return;

        setIsUploading(true);
        await deleteFromCloudinary(speaker.publicId);
        await deleteDoc(doc(db, "speakers", speaker.id));
        await fetchSpeakers();
        setIsUploading(false);
    };

    const handleSpeakerEdit = (speaker: Speaker) => {
        setEditingSpeaker(speaker.id);
        setSpeakerForm({
            name: speaker.name,
            title: speaker.title,
            company: speaker.company,
        });
    };

    const handleSpeakerSave = async (speakerId: string) => {
        await updateDoc(doc(db, "speakers", speakerId), {
            name: speakerForm.name,
            title: speakerForm.title,
            company: speakerForm.company,
        });
        setEditingSpeaker(null);
        await fetchSpeakers();
    };

    // Drag and Drop for reordering
    const handleDragStart = (id: string) => {
        setDraggedItem(id);
    };

    const handleDragOver = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (draggedItem === targetId) return;

        const items = activeTab === "carousel" ? carouselImages : speakers;
        const draggedIndex = items.findIndex((item) => item.id === draggedItem);
        const targetIndex = items.findIndex((item) => item.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const newItems = [...items];
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        if (activeTab === "carousel") {
            setCarouselImages(newItems as CarouselImage[]);
        } else {
            setSpeakers(newItems as Speaker[]);
        }
    };

    const handleDragEnd = async () => {
        const items = activeTab === "carousel" ? carouselImages : speakers;
        const collectionName = activeTab === "carousel" ? "carouselImages" : "speakers";

        // Update order in Firebase
        for (let i = 0; i < items.length; i++) {
            await updateDoc(doc(db, collectionName, items[i].id), { order: i });
        }

        setDraggedItem(null);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">Image Manager</h1>
                    <p className="text-slate-400 mt-1">
                        Manage hero carousel and past event speakers
                    </p>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit">
                    <button
                        onClick={() => setActiveTab("carousel")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "carousel"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        <ImageIcon className="w-5 h-5" />
                        Hero Carousel
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                            {carouselImages.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("speakers")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "speakers"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Past Event Speakers
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                            {speakers.length}
                        </span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto"
            >
                {/* Upload Button */}
                <div className="mb-6">
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]">
                        {isUploading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Plus className="w-5 h-5" />
                        )}
                        {isUploading
                            ? "Uploading..."
                            : activeTab === "carousel"
                                ? "Add Carousel Image"
                                : "Add Past Event Speaker"}
                        <input
                            type="file"
                            accept="image/*"
                            multiple={activeTab === "carousel"}
                            onChange={
                                activeTab === "carousel"
                                    ? handleCarouselUpload
                                    : handleSpeakerUpload
                            }
                            className="hidden"
                            disabled={isUploading}
                        />
                    </label>
                </div>

                {/* Carousel Images Grid */}
                {activeTab === "carousel" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {carouselImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all ${draggedItem === image.id ? "opacity-50" : ""
                                        }`}
                                >
                                    {/* Drag Handle - only this part is draggable */}
                                    <div
                                        className="absolute top-2 left-2 z-20 cursor-grab active:cursor-grabbing"
                                        draggable
                                        onDragStart={() => handleDragStart(image.id)}
                                        onDragOver={(e) => handleDragOver(e, image.id)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium flex items-center gap-1">
                                            <GripVertical className="w-4 h-4" />
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="aspect-video relative">
                                        <Image
                                            src={image.url}
                                            alt={`Carousel ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>

                                    {/* Delete Button - always visible with high z-index */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleCarouselDelete(image);
                                        }}
                                        className="absolute top-2 right-2 z-30 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {carouselImages.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-lg">No carousel images yet</p>
                                <p className="text-sm">Upload images to get started</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Speakers Grid */}
                {activeTab === "speakers" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {speakers.map((speaker, index) => (
                                <motion.div
                                    key={speaker.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    draggable
                                    onDragStart={() => handleDragStart(speaker.id)}
                                    onDragOver={(e) => handleDragOver(e, speaker.id)}
                                    onDragEnd={handleDragEnd}
                                    className={`group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-grab active:cursor-grabbing ${draggedItem === speaker.id ? "opacity-50" : ""
                                        }`}
                                >
                                    <div className="aspect-square relative">
                                        <Image
                                            src={speaker.imageUrl}
                                            alt={speaker.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    {/* Speaker Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        {editingSpeaker === speaker.id ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={speakerForm.name}
                                                    onChange={(e) =>
                                                        setSpeakerForm({ ...speakerForm, name: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={speakerForm.title}
                                                    onChange={(e) =>
                                                        setSpeakerForm({ ...speakerForm, title: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Title"
                                                />
                                                <input
                                                    type="text"
                                                    value={speakerForm.company}
                                                    onChange={(e) =>
                                                        setSpeakerForm({ ...speakerForm, company: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Company"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleSpeakerSave(speaker.id)}
                                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingSpeaker(null)}
                                                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-all"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="text-white font-semibold text-lg">
                                                    {speaker.name}
                                                </h3>
                                                <p className="text-slate-300 text-sm">{speaker.title}</p>
                                                <p className="text-slate-400 text-sm">{speaker.company}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Order Badge */}
                                    <div className="absolute top-2 left-2">
                                        <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium flex items-center gap-1">
                                            <GripVertical className="w-4 h-4" />
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {editingSpeaker !== speaker.id && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => handleSpeakerEdit(speaker)}
                                                className="p-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-all"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleSpeakerDelete(speaker)}
                                                className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {speakers.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                                <Users className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-lg">No past event speakers yet</p>
                                <p className="text-sm">Upload images to get started</p>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isUploading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center">
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                            <p className="text-white font-medium">Processing...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

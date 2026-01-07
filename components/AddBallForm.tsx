"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/components/AppProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CirclePlus, X, Camera, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ball } from "@/lib/types";

interface AddBallFormProps {
    onClose?: () => void;
    initialData?: Ball;
}

export function AddBallForm({ onClose, initialData }: AddBallFormProps) {
    const { addBall, updateBall, deleteBall } = useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        coverstock: "",
        image: "",
        notes: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                brand: initialData.brand,
                coverstock: initialData.coverstock,
                image: initialData.image || "",
                notes: initialData.notes || ""
            });
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (initialData) {
            updateBall(initialData.id, {
                name: formData.name,
                brand: formData.brand,
                coverstock: formData.coverstock,
                image: formData.image,
                notes: formData.notes
            });
        } else {
            addBall({
                name: formData.name,
                brand: formData.brand,
                coverstock: formData.coverstock,
                image: formData.image,
                notes: formData.notes
            });
        }

        setFormData({ name: "", brand: "", coverstock: "", image: "", notes: "" });
        if (onClose) onClose();
    };

    const handleDelete = () => {
        if (initialData && confirm("Are you sure you want to delete this ball? This action cannot be undone.")) {
            deleteBall(initialData.id);
            if (onClose) onClose();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-secondary/50 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-primary">
                    {initialData ? "Edit Ball" : "Add New Ball"}
                </h3>
                {onClose && (
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="grid gap-4">
                <div className="flex justify-center mb-2">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
                            formData.image ? "border-primary/50 bg-black/20" : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30"
                        )}
                        style={formData.image ? { backgroundImage: `url(${formData.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    >
                        {!formData.image && (
                            <>
                                <Camera className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-400">Tap to take photo or upload</span>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <Input
                    required
                    label="Ball Name"
                    placeholder="e.g. Phaze II"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        required
                        label="Brand"
                        placeholder="e.g. Storm"
                        value={formData.brand}
                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    />
                    <Input
                        required
                        label="Coverstock"
                        placeholder="e.g. Solid Reactive"
                        value={formData.coverstock}
                        onChange={e => setFormData({ ...formData, coverstock: e.target.value })}
                    />
                </div>
            </div>

            <div className="pt-2 flex gap-2">
                <Button type="submit" className="flex-1">
                    {initialData ? <Save className="mr-2 h-4 w-4" /> : <CirclePlus className="mr-2 h-4 w-4" />}
                    {initialData ? "Save Changes" : "Add to Arsenal"}
                </Button>
                {initialData && (
                    <Button type="button" variant="danger" onClick={handleDelete} className="px-3">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </form>
    );
}

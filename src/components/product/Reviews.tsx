'use client'

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Reviews() {
    const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews')

    return (
        <div className="border-t pt-16">
            <div className="flex flex-col md:flex-row gap-12">

                {/* Summary Section */}
                <div className="md:w-1/3 space-y-6">
                    <h3 className="text-2xl font-bold">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-yellow-500">
                            <Star className="fill-current w-6 h-6" />
                            <Star className="fill-current w-6 h-6" />
                            <Star className="fill-current w-6 h-6" />
                            <Star className="fill-current w-6 h-6" />
                            <Star className="w-6 h-6 text-muted" />
                        </div>
                        <span className="text-xl font-medium">4.0 out of 5</span>
                    </div>
                    <p className="text-muted-foreground">Based on 2 reviews</p>

                    <Button className="w-full">Write a Review</Button>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                    <div className="flex border-b mb-6">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            Reviews (2)
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'questions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            Q&A (0)
                        </button>
                    </div>

                    {activeTab === 'reviews' ? (
                        <div className="space-y-8">
                            {/* Mock Review 1 */}
                            <div className="border-b pb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">JD</div>
                                        <span className="font-semibold">John Doe</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">2 days ago</span>
                                </div>
                                <div className="flex text-yellow-500 mb-2">
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                </div>
                                <h4 className="font-medium mb-1">Great camera quality!</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    I bought this for my backyard and the picture quality is amazing, even at night. Installation was a breeze.
                                </p>
                            </div>

                            {/* Mock Review 2 */}
                            <div className="">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">AS</div>
                                        <span className="font-semibold">Sarah A.</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">1 week ago</span>
                                </div>
                                <div className="flex text-yellow-500 mb-2">
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="fill-current w-4 h-4" />
                                    <Star className="w-4 h-4" />
                                    <Star className="w-4 h-4" />
                                </div>
                                <h4 className="font-medium mb-1">Decent for the price</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    Good battery life but the app connection can be a bit spotty sometimes. Overall good value.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            No questions yet. Be the first to ask!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

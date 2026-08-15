import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <>
            <main className="bg-background overflow-hidden">
                <section>
                    <div className="relative sm:py-24 pt-24 pb-16">
                        <div className="mx-auto max-w-5xl px-6">
                            <div>
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium lg:text-6xl sm:text-left text-center animate-fade-in-up delay-100">The Notes App Built for Developers</h1>
                                <p className="text-muted-foreground my-6 max-w-2xl text-balance text-2xl animate-fade-in-up delay-200 sm:text-left text-center">Write, organize, and share technical notes with Markdown, code snippets, and syntax highlighting — all in one place.</p>

                                <div className="flex flex-col items-center gap-3 *:w-fit sm:flex-row sm:items-start animate-fade-in-up delay-300">

                                    <Button
                                        key={2}
                                        nativeButton={false}
                                        size="lg"
                                        variant="outline"
                                        className="shine-effect"
                                        render={
                                            <Link href="/dashboard">
                                                <span className="text-nowrap">Start Taking Notes</span>
                                            </Link>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="relative mt-16 sm:mr-0">
                                <div 
                                    className="bg-background rounded-(--radius) relative mx-auto overflow-hidden border border-transparent shadow-lg shadow-black/10 ring-1 ring-black/10 animate-fade-in-up delay-400 sm:w-full w-107.5"
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
                                    }}
                                >
                                    <Image
                                        src="/hero-section.png"
                                        alt="app screen"
                                        width="2880"
                                        height="1842"
                                        loading="eager"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

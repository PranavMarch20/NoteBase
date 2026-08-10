import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-6 text-center">
                        <h2 className="text-foreground text-balance text-3xl font-semibold lg:text-4xl">Your developer notebook, always within reach.</h2>
                        <div className="flex justify-center gap-3">
                            <Button
                                nativeButton={false}
                                size="lg"
                                variant="outline"
                                className="shine-effect"
                                render={
                                    <Link href="#link">
                                        <span className="text-nowrap">Start for Free</span>
                                    </Link>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

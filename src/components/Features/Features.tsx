import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

const icons = {
    Zap: Zap,
    Settings2: Settings2,
    Sparkles: Sparkles,
}

const featureItems = [
    {
        title: "Customizable Security Setup",
        description:
            "Choose from a wide range of configurations to tailor your CCTV system exactly to your security requirements.",
        icon: "Zap",
    },
    {
        title: "Full Monitoring Control",
        description:
            "Manage viewing angles, recording modes, alerts, and more—giving you complete command over your surveillance.",
        icon: "Settings2",
    },
    {
        title: "AI-Powered Protection",
        description:
            "Experience advanced AI features like smart motion detection, intruder alerts, and automated activity recognition.",
        icon: "Sparkles",
    }
];

export default function Features() {
    return (
        <section className="py-16 md:py-32 ">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl text-primary md:text-4xl font-bold tracking-tight">
                        Built to cover your needs
                    </h2>

                    <p className="mt-4">
                        Smart, customizable and AI-powered security solutions for every home and business.
                    </p>
                </div>

                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    {featureItems.map((item, index) => {
                        const IconComponent = icons[item.icon]
                        return (
                            <Card key={index} className="group bg-accent">
                                <CardHeader className="pb-3">
                                    <CardDecorator>
                                        <IconComponent className="size-6 text-primary" aria-hidden />
                                    </CardDecorator>

                                    <h2 className="mt-6 font-medium text-primary">{item.title}</h2>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm">{item.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_4px,transparent_4px),linear-gradient(to_bottom,var(--color-border)_4px,transparent_4px)] bg-[size:24px_24px] dark:opacity-50 "
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
            {children}
        </div>
    </div>
)

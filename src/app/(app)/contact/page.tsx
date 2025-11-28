import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react'

export const dynamic = "force-static"

export const metadata: Metadata = {
    title: 'Contact Us | Store',
    description: 'Get in touch with our team for support, inquiries, or feedback.',
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-24 bg-muted/30 overflow-hidden">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-2">
                            Contact Us
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            We'd love to hear from you
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-[700px]">
                            Have a question about our products, pricing, or just want to say hello? Our team is ready to answer all your questions.
                        </p>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Contact Form */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Send us a message</h2>
                                <p className="text-muted-foreground">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <Card className="border-border/50 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Get in touch</CardTitle>
                                    <CardDescription>
                                        You can reach us anytime via <a href="mailto:support@store.com" className="text-primary hover:underline">support@store.com</a>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="first-name">First name</Label>
                                                <Input id="first-name" placeholder="John" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last-name">Last name</Label>
                                                <Input id="last-name" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" placeholder="How can we help?" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us more about your inquiry..."
                                                className="min-h-[150px] resize-y"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full sm:w-auto">
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Info & FAQ */}
                        <div className="space-y-12">
                            {/* Info Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col space-y-3 p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Our friendly team is here to help.
                                    </p>
                                    <a href="mailto:hello@store.com" className="text-primary font-medium hover:underline">hello@store.com</a>
                                </div>

                                <div className="flex flex-col space-y-3 p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Visit Us</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Come say hello at our office HQ.
                                    </p>
                                    <span className="text-foreground font-medium">100 Smith Street<br />Collingwood VIC 3066 AU</span>
                                </div>

                                <div className="flex flex-col space-y-3 p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Call Us</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Mon-Fri from 8am to 5pm.
                                    </p>
                                    <a href="tel:+15550000000" className="text-primary font-medium hover:underline">+1 (555) 000-0000</a>
                                </div>

                                <div className="flex flex-col space-y-3 p-6 rounded-xl bg-muted/30 border border-border/50">
                                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Live Chat</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Our team is available to chat.
                                    </p>
                                    <span className="text-foreground font-medium">Start a chat</span>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>What are your support hours?</AccordionTrigger>
                                        <AccordionContent>
                                            We are available Monday through Friday, 9:00 AM to 6:00 PM EST. Weekend support is available for urgent issues only.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Where is your office located?</AccordionTrigger>
                                        <AccordionContent>
                                            Our headquarters is located in Collingwood, Victoria, Australia. However, we have a distributed team working globally.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary depending on the destination.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>How can I track my order?</AccordionTrigger>
                                        <AccordionContent>
                                            Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status in your account dashboard.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

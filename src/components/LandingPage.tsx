import React from 'react';
import { ArrowRight, BookOpen, Brain, Users, Star, Play, Check } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  const { setCurrentPage } = useApp();

  const features = [
    {
      icon: BookOpen,
      title: "Vast Study Library",
      description: "Access thousands of study materials, lecture notes, and practice exams from top universities worldwide."
    },
    {
      icon: Brain,
      title: "AI-Powered Tools",
      description: "Generate summaries, flashcards, and quizzes instantly from your documents using advanced AI technology."
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Share study lists, participate in discussions, and learn together with students from around the globe."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      university: "MIT",
      content: "CyuStud has completely transformed how I study. The AI-generated summaries save me hours of reading time!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Medical Student",
      university: "Harvard",
      content: "The collaborative features are amazing. I've connected with study groups that have improved my grades significantly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Business Student",
      university: "Stanford",
      content: "The document library is comprehensive and the search function is incredibly powerful. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  const stats = [
    { number: "500K+", label: "Students" },
    { number: "2M+", label: "Documents" },
    { number: "1K+", label: "Universities" },
    { number: "50+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="text-xl tracking-tight text-blue-600">
              CyuStud
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentPage('login')}>
                Log In
              </Button>
              <Button onClick={() => setCurrentPage('signup')}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-blue-600 border-blue-200 bg-blue-50">
                  Join 500,000+ students worldwide
                </Badge>
                <h1 className="text-4xl lg:text-6xl tracking-tight">
                  Study Smarter with{' '}
                  <span className="text-blue-600">AI-Powered</span>{' '}
                  Learning
                </h1>
                <p className="text-xl text-muted-foreground">
                  Access the world's largest library of study materials, generate instant summaries with AI, 
                  and collaborate with students globally to ace your exams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentPage('signup')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl text-blue-600">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1727790632675-204d26c2326c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwZWR1Y2F0aW9uJTIwYm9va3N8ZW58MXx8fHwxNzU3MTg0MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students studying with CyuStud"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight">
              Everything you need to excel academically
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI-powered study tools to collaborative learning features, 
              CyuStud has everything you need to succeed in your studies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight">
              Loved by students worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what students from top universities are saying about CyuStud
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.university}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl tracking-tight">
            Ready to transform your studying?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join hundreds of thousands of students who are already using CyuStud 
            to improve their grades and study more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setCurrentPage('signup')}
            >
              Start Free Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Free forever plan
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-xl tracking-tight text-blue-600">
                CyuStud
              </div>
              <p className="text-muted-foreground text-sm">
                The world's leading platform for collaborative learning and AI-powered study tools.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4>Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>AI Tools</div>
                <div>Study Library</div>
                <div>Collaboration</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4>Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4>Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Community</div>
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 CyuStud. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
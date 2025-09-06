import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, Book, Video, FileText, Users, HelpCircle, Send, Clock, CheckCircle, Star, ExternalLink, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

export function HelpSupport() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button on the homepage. You can sign up using your email or through social login with Google or Microsoft.'
        },
        {
          question: 'What\'s the difference between Free and Premium accounts?',
          answer: 'Free accounts have access to public documents and basic features. Premium accounts include AI tools, unlimited uploads, advanced search, and priority support. See our pricing page for a detailed comparison.'
        },
        {
          question: 'How do I upload documents?',
          answer: 'Navigate to the Upload page, drag and drop your files or click to browse. Fill in the document information and click publish. Supported formats include PDF, DOC, DOCX, PPT, and PPTX.'
        }
      ]
    },
    {
      title: 'AI Tools',
      icon: Video,
      questions: [
        {
          question: 'What AI tools are available?',
          answer: 'Premium users have access to AI-powered summary generation, automatic flashcard creation, and quiz generation from uploaded documents.'
        },
        {
          question: 'How accurate are the AI-generated summaries?',
          answer: 'Our AI summaries are highly accurate for academic content. However, we recommend reviewing and editing the summaries to ensure they meet your specific needs.'
        },
        {
          question: 'Can I edit AI-generated content?',
          answer: 'Yes! All AI-generated content (summaries, flashcards, quizzes) can be edited, customized, and exported in various formats.'
        }
      ]
    },
    {
      title: 'Study Groups & Collaboration',
      icon: Users,
      questions: [
        {
          question: 'How do I join a study group?',
          answer: 'Browse study groups on the Study Lists page, find one that interests you, and click "Join". You can also create your own study group and invite others.'
        },
        {
          question: 'Can I create private study groups?',
          answer: 'Yes! When creating a study group, you can set it to private. Only invited members will be able to see and join private groups.'
        },
        {
          question: 'How do I share documents with my study group?',
          answer: 'Add documents to your study list and share the list with your group members. They\'ll be able to access all documents in the shared list.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: FileText,
      questions: [
        {
          question: 'How do I upgrade to Premium?',
          answer: 'Go to your Profile page and click on the Subscription tab. Choose the Premium plan and follow the payment instructions.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your profile settings. You\'ll retain Premium features until the end of your billing period.'
        },
        {
          question: 'Do you offer student discounts?',
          answer: 'Yes! We offer special student pricing. Verify your student status with a valid .edu email address to access discounted rates.'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: 'Available 24/7',
      responseTime: 'Usually within 5 minutes',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: Mail,
      availability: 'Always available',
      responseTime: 'Within 24 hours',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our technical team',
      icon: Phone,
      availability: 'Mon-Fri, 9 AM - 6 PM EST',
      responseTime: 'Immediate',
      action: 'Call Now',
      premium: true
    }
  ];

  const helpResources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough for new users',
      type: 'Guide',
      icon: Book,
      readTime: '5 min read'
    },
    {
      title: 'AI Tools Tutorial',
      description: 'Learn how to use our AI-powered features',
      type: 'Video',
      icon: Video,
      readTime: '8 min video'
    },
    {
      title: 'Study Group Best Practices',
      description: 'Tips for effective collaborative learning',
      type: 'Article',
      icon: Users,
      readTime: '3 min read'
    },
    {
      title: 'Document Upload Guidelines',
      description: 'Best practices for sharing study materials',
      type: 'Guide',
      icon: FileText,
      readTime: '4 min read'
    }
  ];

  const recentTickets = [
    {
      id: 'T-001234',
      subject: 'AI summary not generating properly',
      status: 'resolved',
      priority: 'medium',
      created: '2024-12-01',
      lastUpdate: '2024-12-02'
    },
    {
      id: 'T-001235',
      subject: 'Cannot upload large PDF files',
      status: 'in-progress',
      priority: 'high',
      created: '2024-12-03',
      lastUpdate: '2024-12-04'
    }
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.subject || !supportForm.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate ticket creation
    alert('Support ticket created successfully! We\'ll get back to you within 24 hours.');
    setSupportForm({
      subject: '',
      category: '',
      priority: 'medium',
      message: ''
    });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions, access help resources, or get in touch with our support team
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="grid gap-6">
            {filteredFAQs.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon className="h-5 w-5 mr-2" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No FAQs found</h3>
              <p className="text-muted-foreground mb-4">
                Try a different search term or browse our help resources
              </p>
              <Button variant="outline" onClick={() => setActiveTab('contact')}>
                Contact Support
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Contact Support Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Support Channels */}
            <div className="space-y-6">
              <h2 className="text-xl">Get in Touch</h2>
              
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Card key={index} className={channel.premium && user?.role !== 'premium' ? 'opacity-60' : ''}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg">{channel.title}</h3>
                            {channel.premium && (
                              <Badge variant="default" className="text-xs">Premium</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{channel.description}</p>
                          <div className="space-y-1 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-2" />
                              {channel.availability}
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2" />
                              {channel.responseTime}
                            </div>
                          </div>
                          <Button 
                            className="w-full"
                            disabled={channel.premium && user?.role !== 'premium'}
                            variant={index === 0 ? 'default' : 'outline'}
                          >
                            {channel.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Support Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSupportSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={supportForm.category} onValueChange={(value) => setSupportForm(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account & Billing</SelectItem>
                            <SelectItem value="ai-tools">AI Tools</SelectItem>
                            <SelectItem value="documents">Document Upload</SelectItem>
                            <SelectItem value="study-groups">Study Groups</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={supportForm.priority} onValueChange={(value) => setSupportForm(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={supportForm.message}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please describe your issue in detail..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-2">Help Resources</h2>
            <p className="text-muted-foreground">
              Browse our collection of guides, tutorials, and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {helpResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.readTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Community Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Community Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-2">Student Community</h4>
                  <p className="text-muted-foreground mb-4">
                    Connect with other students, ask questions, and share study tips in our community forum.
                  </p>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                </div>
                <div>
                  <h4 className="mb-2">Feature Requests</h4>
                  <p className="text-muted-foreground mb-4">
                    Have an idea for a new feature? Share it with us and vote on what you'd like to see next.
                  </p>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Submit Ideas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          {user ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl">Your Support Tickets</h2>
                <Button onClick={() => setActiveTab('contact')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>

              {recentTickets.length > 0 ? (
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg">{ticket.subject}</h3>
                              <Badge 
                                variant={ticket.status === 'resolved' ? 'secondary' : 'default'}
                                className={ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {ticket.status.replace('-', ' ')}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={
                                  ticket.priority === 'high' ? 'border-red-200 text-red-700' :
                                  ticket.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                                  'border-gray-200 text-gray-700'
                                }
                              >
                                {ticket.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Ticket #{ticket.id}</span>
                              <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                              <span>Last update: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">No support tickets</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any support requests yet
                  </p>
                  <Button onClick={() => setActiveTab('contact')}>
                    Create Support Ticket
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">Sign in required</h3>
              <p className="text-muted-foreground">
                Please sign in to view your support tickets
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="mb-2">Quick Links</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>System Status</div>
              <div>API Documentation</div>
              <div>Terms of Service</div>
              <div>Privacy Policy</div>
            </div>
          </div>
          <div>
            <h4 className="mb-2">Contact Info</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>support@cyustud.com</div>
              <div>+1 (555) 123-4567</div>
              <div>Monday - Friday, 9 AM - 6 PM EST</div>
            </div>
          </div>
          <div>
            <h4 className="mb-2">Follow Us</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Twitter</div>
              <div>LinkedIn</div>
              <div>YouTube</div>
              <div>Blog</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>Rated 4.8/5 by 10,000+ students</span>
        </div>
      </div>
    </div>
  );
}
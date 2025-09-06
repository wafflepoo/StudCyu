import React, { useState } from 'react';
import { Plus, Users, BookOpen, MessageSquare, Star, Share2, Edit3, Trash2, Search, Filter, Clock, User, Heart, Eye } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StudyLists() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('my-lists');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newListForm, setNewListForm] = useState({
    title: '',
    description: '',
    subject: '',
    privacy: 'public',
    tags: ''
  });

  const subjects = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Psychology', 'Economics', 'Business', 'Literature', 'History', 'Philosophy'
  ];

  const mockStudyLists = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      description: 'Essential resources for understanding ML algorithms, neural networks, and deep learning concepts.',
      creator: { name: 'Dr. Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', id: 'user1' },
      subject: 'Computer Science',
      privacy: 'public',
      members: 47,
      documents: 23,
      likes: 156,
      views: 892,
      createdAt: '2024-11-15',
      tags: ['Machine Learning', 'AI', 'Neural Networks'],
      isOwner: user?.email === 'premium@demo.com',
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=300&h=200&fit=crop',
      recentActivity: [
        { user: 'Alex Student', action: 'added document', item: 'Deep Learning Basics', time: '2 hours ago' },
        { user: 'Maria Garcia', action: 'joined list', time: '1 day ago' },
      ]
    },
    {
      id: '2',
      title: 'Organic Chemistry Study Group',
      description: 'Collaborative study materials for organic chemistry including lab procedures and reaction mechanisms.',
      creator: { name: 'Prof. Michael Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', id: 'user2' },
      subject: 'Chemistry',
      privacy: 'public',
      members: 34,
      documents: 18,
      likes: 89,
      views: 445,
      createdAt: '2024-11-20',
      tags: ['Organic Chemistry', 'Lab', 'Reactions'],
      isOwner: false,
      thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop',
      recentActivity: [
        { user: 'Dr. Johnson', action: 'added document', item: 'Aldol Reactions Guide', time: '4 hours ago' },
        { user: 'Emma Wilson', action: 'started discussion', item: 'Stereochemistry Questions', time: '6 hours ago' },
      ]
    },
    {
      id: '3',
      title: 'Calculus II Problem Sets',
      description: 'Curated collection of practice problems with detailed solutions for integration techniques.',
      creator: { name: 'Dr. Emily Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily', id: 'user3' },
      subject: 'Mathematics',
      privacy: 'public',
      members: 78,
      documents: 31,
      likes: 234,
      views: 1203,
      createdAt: '2024-11-10',
      tags: ['Calculus', 'Integration', 'Problem Solving'],
      isOwner: user?.email === 'student@demo.com',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      recentActivity: [
        { user: 'John Smith', action: 'completed quiz', item: 'Integration by Parts', time: '30 min ago' },
        { user: 'Lisa Chang', action: 'added solution', item: 'Problem Set 7', time: '2 hours ago' },
      ]
    },
    {
      id: '4',
      title: 'Psychology Research Methods',
      description: 'Resources for understanding statistical analysis and research design in psychology.',
      creator: { name: 'Dr. Alex Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', id: 'user4' },
      subject: 'Psychology',
      privacy: 'private',
      members: 15,
      documents: 12,
      likes: 67,
      views: 289,
      createdAt: '2024-11-25',
      tags: ['Research Methods', 'Statistics', 'SPSS'],
      isOwner: false,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      recentActivity: [
        { user: 'Dr. Thompson', action: 'shared resource', item: 'ANOVA Tutorial', time: '1 day ago' },
      ]
    }
  ];

  const mockDiscussions = [
    {
      id: '1',
      listId: '1',
      title: 'Best resources for understanding backpropagation?',
      author: { name: 'Alex Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex-student' },
      replies: 12,
      likes: 8,
      lastActivity: '2 hours ago',
      preview: 'I\'m struggling to understand how backpropagation works in neural networks. Can anyone recommend good visual explanations or interactive demos?'
    },
    {
      id: '2',
      listId: '2',
      title: 'Stereochemistry confusion - need help!',
      author: { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      replies: 7,
      likes: 5,
      lastActivity: '6 hours ago',
      preview: 'I keep getting confused with R/S configuration. Does anyone have a good mnemonic or method that helped them?'
    },
    {
      id: '3',
      listId: '3',
      title: 'Integration by parts - when to use it?',
      author: { name: 'Maria Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria' },
      replies: 15,
      likes: 12,
      lastActivity: '1 day ago',
      preview: 'How do you decide when integration by parts is the best approach vs other techniques?'
    }
  ];

  const filteredLists = mockStudyLists.filter(list => {
    const matchesSearch = !searchQuery || 
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab = activeTab === 'my-lists' ? list.isOwner : true;
    
    return matchesSearch && matchesTab;
  });

  const handleCreateList = () => {
    if (!newListForm.title || !newListForm.subject) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate creating list
    alert('Study list created successfully!');
    setIsCreateDialogOpen(false);
    setNewListForm({
      title: '',
      description: '',
      subject: '',
      privacy: 'public',
      tags: ''
    });
  };

  const StudyListCard = ({ list }: { list: any }) => (
    <Card className="hover:shadow-lg transition-shadow group">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={list.thumbnail}
          alt={list.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={list.privacy === 'public' ? 'secondary' : 'default'}>
            {list.privacy}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button size="sm" variant="secondary">
            <Eye className="h-4 w-4 mr-1" />
            View List
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="line-clamp-2 mb-1">{list.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{list.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={list.creator.avatar} alt={list.creator.name} />
              <AvatarFallback>{list.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{list.creator.name}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {list.members}
              </span>
              <span className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                {list.documents}
              </span>
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {list.likes}
              </span>
            </div>
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {list.views}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">{list.subject}</Badge>
            {list.tags.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            {list.isOwner ? (
              <>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Join
                </Button>
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DiscussionCard = ({ discussion }: { discussion: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="line-clamp-2 pr-4">{discussion.title}</h4>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span>{discussion.likes}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{discussion.preview}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{discussion.author.name}</span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {discussion.replies}
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {discussion.lastActivity}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Study Lists & Collaboration</h1>
          <p className="text-muted-foreground">
            Create, share, and discover curated study materials with fellow students
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Study List
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Study List</DialogTitle>
              <DialogDescription>
                Create a curated list of study materials to share with others or keep private.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newListForm.title}
                  onChange={(e) => setNewListForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter list title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newListForm.description}
                  onChange={(e) => setNewListForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this list covers"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={newListForm.subject} onValueChange={(value) => setNewListForm(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="privacy">Privacy</Label>
                  <Select value={newListForm.privacy} onValueChange={(value) => setNewListForm(prev => ({ ...prev, privacy: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newListForm.tags}
                  onChange={(e) => setNewListForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., algorithms, data structures, programming"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList}>
                Create List
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-lists">My Lists</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map(list => (
              <StudyListCard key={list.id} list={list} />
            ))}
          </div>

          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No study lists found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </TabsContent>

        {/* My Lists Tab */}
        <TabsContent value="my-lists" className="space-y-6">
          {user ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLists.map(list => (
                  <StudyListCard key={list.id} list={list} />
                ))}
              </div>

              {filteredLists.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">No study lists yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first study list to organize and share your favorite materials
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First List
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">Sign in required</h3>
              <p className="text-muted-foreground">
                Please sign in to view and manage your study lists
              </p>
            </div>
          )}
        </TabsContent>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-6">
          <div className="grid gap-4">
            {mockDiscussions.map(discussion => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">Load More Discussions</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Popular Lists Sidebar - Desktop only */}
      <div className="hidden xl:block fixed right-8 top-32 w-80">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trending Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudyLists.slice(0, 3).map((list, index) => (
                <div key={list.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-12 h-8 bg-muted rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={list.thumbnail}
                      alt={list.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-1">{list.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{list.members} members</span>
                      <span>•</span>
                      <span>{list.documents} docs</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Download, Star, MessageSquare, Eye, FileText, Video, Image, BookOpen, Clock, User } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SearchRepository() {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    subject: '',
    institution: '',
    documentType: '',
    difficulty: [1, 5],
    rating: 0,
    dateRange: 'all'
  });

  const subjects = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Psychology', 'Economics', 'Business', 'Literature', 'History', 'Philosophy'
  ];

  const institutions = [
    'MIT', 'Harvard University', 'Stanford University', 'UC Berkeley', 'Oxford University',
    'Cambridge University', 'Yale University', 'Princeton University', 'Caltech'
  ];

  const documentTypes = ['Lecture Notes', 'Study Guide', 'Practice Exam', 'Assignment', 'Textbook Chapter', 'Video Lecture', 'Lab Report'];

  const mockDocuments = [
    {
      id: '1',
      title: 'Advanced Machine Learning Algorithms',
      description: 'Comprehensive notes covering neural networks, deep learning, and reinforcement learning concepts.',
      author: 'Dr. Sarah Chen',
      institution: 'MIT',
      subject: 'Computer Science',
      type: 'Lecture Notes',
      pages: 89,
      rating: 4.8,
      downloads: 1247,
      comments: 23,
      uploadDate: '2024-12-01',
      difficulty: 4,
      tags: ['AI', 'Neural Networks', 'Deep Learning'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=300&h=200&fit=crop',
      isPremium: false
    },
    {
      id: '2',
      title: 'Organic Chemistry Lab Manual',
      description: 'Complete lab procedures and safety guidelines for organic chemistry experiments.',
      author: 'Prof. Michael Johnson',
      institution: 'Harvard University',
      subject: 'Chemistry',
      type: 'Lab Report',
      pages: 156,
      rating: 4.6,
      downloads: 856,
      comments: 17,
      uploadDate: '2024-11-28',
      difficulty: 3,
      tags: ['Organic Chemistry', 'Laboratory', 'Experiments'],
      thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop',
      isPremium: true
    },
    {
      id: '3',
      title: 'Calculus II Practice Problems',
      description: 'Collection of practice problems with detailed solutions for integration techniques.',
      author: 'Dr. Emily Rodriguez',
      institution: 'Stanford University',
      subject: 'Mathematics',
      type: 'Practice Exam',
      pages: 67,
      rating: 4.9,
      downloads: 2134,
      comments: 45,
      uploadDate: '2024-12-03',
      difficulty: 3,
      tags: ['Calculus', 'Integration', 'Problem Solving'],
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      isPremium: false
    },
    {
      id: '4',
      title: 'Introduction to Psychology Study Guide',
      description: 'Comprehensive study guide covering major psychological theories and research methods.',
      author: 'Dr. Alex Thompson',
      institution: 'Yale University',
      subject: 'Psychology',
      type: 'Study Guide',
      pages: 234,
      rating: 4.7,
      downloads: 1689,
      comments: 31,
      uploadDate: '2024-11-25',
      difficulty: 2,
      tags: ['Psychology', 'Research Methods', 'Theories'],
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      isPremium: false
    },
    {
      id: '5',
      title: 'Quantum Physics Lecture Series',
      description: 'Video lectures covering quantum mechanics fundamentals and advanced topics.',
      author: 'Prof. David Wilson',
      institution: 'Cambridge University',
      subject: 'Physics',
      type: 'Video Lecture',
      pages: 0,
      rating: 4.9,
      downloads: 934,
      comments: 28,
      uploadDate: '2024-12-02',
      difficulty: 5,
      tags: ['Quantum Physics', 'Mechanics', 'Advanced'],
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop',
      isPremium: true
    },
    {
      id: '6',
      title: 'Financial Economics Textbook Chapter',
      description: 'Chapter on portfolio theory and risk management in financial markets.',
      author: 'Prof. Lisa Chang',
      institution: 'Oxford University',
      subject: 'Economics',
      type: 'Textbook Chapter',
      pages: 78,
      rating: 4.5,
      downloads: 567,
      comments: 12,
      uploadDate: '2024-11-30',
      difficulty: 4,
      tags: ['Finance', 'Portfolio Theory', 'Risk Management'],
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      isPremium: false
    }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = !filters.subject || doc.subject === filters.subject;
    const matchesInstitution = !filters.institution || doc.institution === filters.institution;
    const matchesType = !filters.documentType || doc.type === filters.documentType;
    const matchesDifficulty = doc.difficulty >= filters.difficulty[0] && doc.difficulty <= filters.difficulty[1];
    const matchesRating = doc.rating >= filters.rating;

    return matchesSearch && matchesSubject && matchesInstitution && matchesType && matchesDifficulty && matchesRating;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'oldest':
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Lecture':
        return Video;
      case 'Lecture Notes':
      case 'Study Guide':
        return FileText;
      case 'Practice Exam':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const handleDownload = (doc: any) => {
    if (doc.isPremium && user?.role !== 'premium') {
      alert('This is a premium document. Upgrade to access it.');
      return;
    }
    alert(`Downloaded: ${doc.title}`);
  };

  const DocumentCard = ({ document, isListView = false }: { document: any, isListView?: boolean }) => {
    const TypeIcon = getTypeIcon(document.type);
    
    if (isListView) {
      return (
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                <ImageWithFallback
                  src={document.thumbnail}
                  alt={document.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1">
                  <TypeIcon className="h-4 w-4 text-white bg-black/50 rounded p-0.5" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1 line-clamp-1">{document.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{document.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {document.author}
                      </span>
                      <span>{document.institution}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{document.subject}</Badge>
                      <Badge variant="outline">{document.type}</Badge>
                      {document.isPremium && <Badge variant="default" className="bg-yellow-500">Premium</Badge>}
                      {document.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{document.rating}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {document.downloads}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {document.comments}
                      </span>
                      {document.pages > 0 && (
                        <span>{document.pages} pages</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" onClick={() => handleDownload(document)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="hover:shadow-lg transition-shadow group">
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={document.thumbnail}
            alt={document.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <TypeIcon className="h-5 w-5 text-white bg-black/50 rounded p-1" />
          </div>
          <div className="absolute top-2 right-2">
            {document.isPremium && <Badge className="bg-yellow-500">Premium</Badge>}
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button size="sm" variant="secondary">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="line-clamp-2 mb-1">{document.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{document.description}</p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{document.author}</span>
              <span>•</span>
              <span>{document.institution}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{document.rating}</span>
                <span className="text-xs text-muted-foreground">({document.comments})</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Download className="h-3 w-3" />
                <span>{document.downloads}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">{document.subject}</Badge>
              <Badge variant="outline" className="text-xs">{document.type}</Badge>
              {document.tags.slice(0, 1).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                Preview
              </Button>
              <Button size="sm" className="flex-1" onClick={() => handleDownload(document)}>
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3">Subject</h3>
        <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3">Institution</h3>
        <Select value={filters.institution} onValueChange={(value) => setFilters(prev => ({ ...prev, institution: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="All institutions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All institutions</SelectItem>
            {institutions.map(institution => (
              <SelectItem key={institution} value={institution}>{institution}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3">Document Type</h3>
        <Select value={filters.documentType} onValueChange={(value) => setFilters(prev => ({ ...prev, documentType: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            {documentTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3">Difficulty Level</h3>
        <div className="px-2">
          <Slider
            value={filters.difficulty}
            onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Beginner</span>
            <span>Advanced</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, rating: checked ? rating : 0 }))}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                {rating}+ stars
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Study Repository</h1>
          <p className="text-muted-foreground">
            Discover and access study materials from top universities worldwide
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilterSidebar />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search documents, courses, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {sortedDocuments.length} of {mockDocuments.length} documents
            </p>
          </div>

          {/* Documents Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {sortedDocuments.map(document => (
              <DocumentCard 
                key={document.id} 
                document={document} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>

          {/* No Results */}
          {sortedDocuments.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No documents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}

          {/* Load More */}
          {sortedDocuments.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">Load More Documents</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
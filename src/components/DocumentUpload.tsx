import React, { useState, useCallback } from 'react';
import { Upload, FileText, Brain, Zap, Download, Eye, Edit3, Share2, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

export function DocumentUpload() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [aiResults, setAiResults] = useState<any>(null);
  const [documentInfo, setDocumentInfo] = useState({
    title: '',
    description: '',
    subject: '',
    institution: '',
    type: '',
    tags: '',
    isPublic: true
  });

  const subjects = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Psychology', 'Economics', 'Business', 'Literature', 'History', 'Philosophy'
  ];

  const documentTypes = ['Lecture Notes', 'Study Guide', 'Practice Exam', 'Assignment', 'Textbook Chapter', 'Lab Report'];

  const institutions = [
    'MIT', 'Harvard University', 'Stanford University', 'UC Berkeley', 'Oxford University',
    'Cambridge University', 'Yale University', 'Princeton University', 'Caltech', 'Other'
  ];

  const mockAIResults = {
    summary: `This document covers advanced machine learning algorithms with a focus on neural networks and deep learning architectures. Key topics include:

• Feedforward neural networks and backpropagation
• Convolutional Neural Networks (CNNs) for image processing
• Recurrent Neural Networks (RNNs) and LSTM for sequence data
• Attention mechanisms and Transformer architectures
• Regularization techniques and optimization algorithms
• Transfer learning and fine-tuning strategies

The material is suitable for graduate-level computer science students with prior knowledge of linear algebra, calculus, and basic machine learning concepts.`,

    flashcards: [
      {
        front: "What is backpropagation?",
        back: "A supervised learning algorithm used to train neural networks by calculating gradients of the loss function with respect to network weights through the chain rule."
      },
      {
        front: "What are the main components of a CNN?",
        back: "Convolutional layers (feature extraction), pooling layers (dimensionality reduction), and fully connected layers (classification)."
      },
      {
        front: "What problem do LSTM networks solve?",
        back: "The vanishing gradient problem in traditional RNNs, allowing the network to learn long-term dependencies in sequential data."
      },
      {
        front: "What is transfer learning?",
        back: "A technique where a pre-trained model is adapted for a new but related task, leveraging learned features from the original training."
      },
      {
        front: "What is the attention mechanism?",
        back: "A technique that allows models to focus on specific parts of the input when making predictions, improving performance on sequence-to-sequence tasks."
      }
    ],

    quiz: {
      questions: [
        {
          question: "Which activation function is commonly used in the output layer for binary classification?",
          options: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
          correct: 1,
          explanation: "Sigmoid function outputs values between 0 and 1, making it ideal for binary classification problems."
        },
        {
          question: "What is the primary advantage of using CNNs for image processing?",
          options: ["Faster training", "Translation invariance", "Smaller model size", "Better accuracy on all tasks"],
          correct: 1,
          explanation: "CNNs provide translation invariance, meaning they can detect features regardless of their position in the image."
        },
        {
          question: "In the context of regularization, what does 'dropout' refer to?",
          options: ["Removing entire layers", "Randomly setting some neurons to zero during training", "Reducing learning rate", "Early stopping"],
          correct: 1,
          explanation: "Dropout randomly sets some neurons to zero during training to prevent overfitting by reducing co-adaptation between neurons."
        },
        {
          question: "What is the vanishing gradient problem?",
          options: ["Gradients become too large", "Gradients approach zero in deep networks", "Learning rate is too high", "Model converges too quickly"],
          correct: 1,
          explanation: "In deep networks, gradients can become exponentially small as they propagate backward, making it difficult to train early layers."
        }
      ]
    },

    keyPoints: [
      "Neural networks require careful initialization and regularization",
      "CNNs excel at spatial pattern recognition in images",
      "RNNs and LSTMs are designed for sequential data processing",
      "Attention mechanisms revolutionized natural language processing",
      "Transfer learning can significantly reduce training time and data requirements",
      "Proper hyperparameter tuning is crucial for optimal performance"
    ]
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setDocumentInfo(prev => ({
        ...prev,
        title: file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setDocumentInfo(prev => ({
        ...prev,
        title: file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  }, []);

  const processWithAI = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    setActiveTab('ai-tools');

    // Simulate AI processing with progress updates
    const progressSteps = [
      { progress: 20, status: 'Extracting text content...' },
      { progress: 40, status: 'Analyzing document structure...' },
      { progress: 60, status: 'Generating summary...' },
      { progress: 80, status: 'Creating flashcards...' },
      { progress: 90, status: 'Generating quiz questions...' },
      { progress: 100, status: 'Processing complete!' }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(step.progress);
    }

    setAiResults(mockAIResults);
    setIsProcessing(false);
  };

  const handlePublish = async () => {
    if (!uploadedFile || !documentInfo.title || !documentInfo.subject) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    alert('Document uploaded successfully!');
    // Reset form
    setUploadedFile(null);
    setAiResults(null);
    setDocumentInfo({
      title: '',
      description: '',
      subject: '',
      institution: '',
      type: '',
      tags: '',
      isPublic: true
    });
    setActiveTab('upload');
  };

  const isPremiumUser = user?.role === 'premium';
  const canUseAI = isPremiumUser || user?.role === 'institutional';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Upload Document</h1>
        <p className="text-muted-foreground">
          Share your study materials and use AI tools to enhance them
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Details</TabsTrigger>
          <TabsTrigger value="ai-tools" disabled={!uploadedFile}>
            AI Tools {!canUseAI && <Badge variant="secondary" className="ml-2">Premium</Badge>}
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!uploadedFile}>Preview & Publish</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileUpload}
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                      <div>
                        <p className="text-lg">File uploaded successfully!</p>
                        <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Choose Different File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg">Drag and drop your file here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports: PDF, DOC, DOCX, PPT, PPTX, TXT (Max 50MB)
                      </p>
                    </div>
                  )}
                </div>

                {uploadedFile && canUseAI && (
                  <div className="mt-6">
                    <Button onClick={processWithAI} className="w-full" disabled={isProcessing}>
                      <Brain className="h-4 w-4 mr-2" />
                      Process with AI Tools
                    </Button>
                  </div>
                )}

                {uploadedFile && !canUseAI && (
                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Upgrade to Premium to access AI tools for automatic summary generation, flashcard creation, and quiz generation.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Document Information */}
            <Card>
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={documentInfo.title}
                    onChange={(e) => setDocumentInfo(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter document title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={documentInfo.description}
                    onChange={(e) => setDocumentInfo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this document covers"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={documentInfo.subject} onValueChange={(value) => setDocumentInfo(prev => ({ ...prev, subject: value }))}>
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
                    <Label htmlFor="type">Document Type</Label>
                    <Select value={documentInfo.type} onValueChange={(value) => setDocumentInfo(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Select value={documentInfo.institution} onValueChange={(value) => setDocumentInfo(prev => ({ ...prev, institution: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(institution => (
                        <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={documentInfo.tags}
                    onChange={(e) => setDocumentInfo(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="e.g., machine learning, neural networks, AI"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="ai-tools" className="space-y-6">
          {isProcessing ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg mb-2">Processing with AI</h3>
                <p className="text-muted-foreground mb-4">
                  Analyzing your document and generating study materials...
                </p>
                <Progress value={processingProgress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">{processingProgress}% complete</p>
              </CardContent>
            </Card>
          ) : aiResults ? (
            <div className="space-y-6">
              {/* AI Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      AI-Generated Summary
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm">{aiResults.summary}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiResults.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Flashcards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      AI-Generated Flashcards ({aiResults.flashcards.length})
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiResults.flashcards.slice(0, 4).map((card: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">FRONT</Label>
                            <p className="text-sm">{card.front}</p>
                          </div>
                          <Separator />
                          <div>
                            <Label className="text-xs text-muted-foreground">BACK</Label>
                            <p className="text-sm">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {aiResults.flashcards.length > 4 && (
                    <Button variant="outline" className="w-full mt-4">
                      View All {aiResults.flashcards.length} Flashcards
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quiz Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      AI-Generated Quiz ({aiResults.quiz.questions.length} questions)
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiResults.quiz.questions.slice(0, 2).map((question: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <p className="mb-3 text-sm">{question.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option: string, optIndex: number) => (
                            <div 
                              key={optIndex} 
                              className={`p-2 text-xs rounded border ${
                                optIndex === question.correct ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{question.explanation}</p>
                      </div>
                    ))}
                  </div>
                  {aiResults.quiz.questions.length > 2 && (
                    <Button variant="outline" className="w-full mt-4">
                      View All {aiResults.quiz.questions.length} Questions
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">AI Tools Ready</h3>
                <p className="text-muted-foreground">
                  Upload a document and return to this tab to generate AI-powered study materials.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Title</Label>
                    <p>{documentInfo.title || 'Untitled Document'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <p className="text-sm">{documentInfo.description || 'No description provided'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Subject</Label>
                    <p>{documentInfo.subject || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Document Type</Label>
                    <p>{documentInfo.type || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Institution</Label>
                    <p>{documentInfo.institution || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">File</Label>
                    <p className="text-sm">{uploadedFile?.name}</p>
                  </div>
                </div>
              </div>

              {documentInfo.tags && (
                <div>
                  <Label className="text-sm text-muted-foreground">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {documentInfo.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag.trim()}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setActiveTab('upload')}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
                <Button onClick={handlePublish} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Publish Document
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
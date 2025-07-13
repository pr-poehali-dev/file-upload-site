import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'design-system.sketch',
      size: '12.4 MB',
      type: 'Sketch File',
      uploadDate: '2 часа назад',
      isPublic: false,
      downloads: 0
    },
    {
      id: 2,
      name: 'presentation.pdf',
      size: '8.9 MB',
      type: 'PDF Document',
      uploadDate: '1 день назад',
      isPublic: true,
      downloads: 15
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  const toggleFileVisibility = (id: number) => {
    setUploadedFiles(files => 
      files.map(file => 
        file.id === id ? { ...file, isPublic: !file.isPublic } : file
      )
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={18} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">FileShare</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Главная
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Загрузка
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Файлы
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Настройки
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Загружайте и делитесь файлами
            <br />
            <span className="text-primary">безопасно</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Быстрая загрузка файлов до 100MB с возможностью настройки приватности и сроков хранения
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="CloudUpload" size={20} />
                  <span>Загрузка файлов</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    Перетащите файлы сюда или нажмите для выбора
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Поддерживаются все форматы файлов • Максимум 100MB
                  </p>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Выбрать файлы
                  </Button>
                </div>

                {/* Upload Settings */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Публичный доступ</span>
                      <Button variant="outline" size="sm">
                        <Icon name="Lock" size={14} className="mr-1" />
                        Приватный
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Файл будет доступен только по прямой ссылке
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Срок хранения</span>
                      <Button variant="outline" size="sm">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        30 дней
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Файл будет удалён автоматически
                    </p>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Files List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Files" size={20} />
                    <span>Загруженные файлы</span>
                  </div>
                  <Badge variant="secondary">{uploadedFiles.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="FileText" size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {file.size} • {file.type} • {file.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={file.isPublic ? "default" : "secondary"}>
                          {file.isPublic ? 'Публичный' : 'Приватный'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFileVisibility(file.id)}
                        >
                          <Icon name={file.isPublic ? "Unlock" : "Lock"} size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Copy" size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Download" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} />
                  <span>Статистика</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Использовано места</span>
                    <span className="text-sm font-medium">21.3 MB</span>
                  </div>
                  <Progress value={21} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">из 100 MB</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-xs text-muted-foreground">Скачиваний</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{uploadedFiles.length}</div>
                    <div className="text-xs text-muted-foreground">Файлов</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Info" size={20} />
                  <span>Ограничения</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Максимальный размер</span>
                  <Badge variant="outline">100 MB</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Форматы файлов</span>
                  <Badge variant="outline">Все</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Срок хранения</span>
                  <Badge variant="outline">30 дней</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Уведомления</span>
                  <Badge variant="outline">Email</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Zap" size={20} />
                  <span>Быстрые действия</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить корзину
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Archive" size={16} className="mr-2" />
                  Архивировать старые файлы
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки аккаунта
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AudioPlayer from '@/components/AudioPlayer';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const tracks = [
    { id: 1, title: 'Midnight Pulse', duration: '4:32', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Digital Dreams', duration: '3:45', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Neon Horizons', duration: '5:18', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, title: 'Echo Chamber', duration: '4:02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">MENCO MUSIC</h1>
            <div className="flex gap-8">
              {['home', 'bio', 'music', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                    activeSection === section
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'bio' ? 'Биография' :
                   section === 'music' ? 'Музыка' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
            <Icon name="Music" size={40} className="text-primary" />
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">ALXANDR MENCO</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Электронная музыка для души
          </p>
          <Button
            onClick={() => scrollToSection('music')}
            size="lg"
            className="rounded-full px-8 py-6 text-lg"
          >PLAY ME</Button>
        </div>
      </section>

      <section id="bio" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-4xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Биография</h2>
          <Card className="p-8 md:p-12 bg-card border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="User" size={120} className="text-primary/40" />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Современный электронный музыкант, создающий атмосферные композиции на стыке ambient, techno и experimental.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Путь в музыке начался с экспериментов с синтезаторами и драм-машинами. Сегодня мои треки звучат на площадках по всему миру.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Disc3" size={20} className="text-primary" />
                    <span className="text-sm">4 альбома</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-primary" />
                    <span className="text-sm">50K+ слушателей</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="music" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-6xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Музыка</h2>
          <AudioPlayer tracks={tracks} />
          
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: 'Spotify', name: 'Spotify', link: '#' },
              { icon: 'Music2', name: 'Apple Music', link: '#' },
              { icon: 'Youtube', name: 'YouTube', link: '#' },
            ].map((platform) => (
              <Card
                key={platform.name}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={platform.icon as any} size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-sm text-muted-foreground">Слушать на платформе</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-4xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Контакты</h2>
          <Card className="p-8 md:p-12 bg-card border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Свяжитесь со мной</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'Mail', label: 'Email', value: 'synth@music.com' },
                    { icon: 'Instagram', label: 'Instagram', value: '@synth_music' },
                    { icon: 'Send', label: 'Telegram', value: '@synthmusic' },
                  ].map((contact) => (
                    <div key={contact.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name={contact.icon as any} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="font-medium">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Для сотрудничества</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Открыт для коллаборации с другими артистами, продюсерами и лейблами. 
                  Также доступен для саундтреков и музыки для визуальных проектов.
                </p>
                <Button className="w-full rounded-full" size="lg">
                  <Icon name="Mail" size={20} className="mr-2" />
                  Написать письмо
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 SYNTH. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AudioPlayer from '@/components/AudioPlayer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const tracks = [
    { id: 1, title: 'Alxandr Menco & Seven - Back It Up', duration: '3:45', url: 'https://drive.google.com/uc?export=download&id=1FjRcrL788P0BxsajutCnDQWza_p0xWCQ' },
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
                  {section === 'home' ? 'Home' : 
                   section === 'bio' ? 'Bio' :
                   section === 'music' ? 'Music' : 'Contact'}
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
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">Electronic music for everyone</p>
          <Button
            onClick={() => scrollToSection('music')}
            size="lg"
            className="rounded-full px-8 py-6 text-lg"
          >PLAY ME</Button>
        </div>
      </section>

      <section id="bio" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-4xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Biography</h2>
          <Card className="p-8 md:p-12 bg-card border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/7ac2c36f-fc31-4823-abe7-0c6e6fe7358d.jpg" 
                  alt="Alexander Menco"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">A modern electronic musician who creates atmospheric compositions in the style of afro house, techno, and melodic techno.
</p>
                <p className="text-muted-foreground leading-relaxed">My journey in music began at an early age, and I graduated from music school. During my student years, I performed as a DJ. Currently, I am actively involved in writing electronic music, and my tracks are played at venues worldwide.</p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Disc3" size={20} className="text-primary" />
                    <span className="text-sm"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-primary" />
                    <span className="text-sm"></span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="music" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-6xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Playlist</h2>
          <AudioPlayer tracks={tracks} />
          
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: 'Spotify', name: 'Spotify', link: 'https://open.spotify.com/artist/35FipG066segTX732MA9r5' },
              { icon: 'Music2', name: 'Yandex Music', link: 'https://music.yandex.ru/artist/24925501' },
              { icon: 'Youtube', name: 'YouTube', link: 'https://www.youtube.com/@alxandrmenco' },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon name={platform.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">Listen on platform</p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-4xl fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Contact</h2>
          <Card className="p-8 md:p-12 bg-card border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'Mail', label: 'Email', value: 'alxandrmenco@gmail.com' },
                    { icon: 'Instagram', label: 'Instagram', value: '@alxandr.menco' },
                    { icon: 'Send', label: 'Telegram', value: '@alxandrmenco' },
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
                <h3 className="text-2xl font-semibold mb-6">Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Open for collaboration with other artists, producers and labels. 
                  Also available for soundtracks and music for visual projects.
                </p>
                <Button 
                  className="w-full rounded-full" 
                  size="lg"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Icon name="Mail" size={20} className="mr-2" />
                  Send email
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 ALXANDR MENCO. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send me a message</DialogTitle>
            <DialogDescription>
              Fill out the form below and I'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const subject = encodeURIComponent(`Message from ${formData.name}`);
              const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
              window.location.href = `mailto:alxandrmenco@gmail.com?subject=${subject}&body=${body}`;
              setIsDialogOpen(false);
              setFormData({ name: '', email: '', message: '' });
            }}
            className="space-y-4 mt-4"
          >
            <div>
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
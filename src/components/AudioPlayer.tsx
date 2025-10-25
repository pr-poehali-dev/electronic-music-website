import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  duration: string;
  url: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < tracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
        setCurrentTrack(0);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsPlaying(true);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <audio ref={audioRef} src={tracks[currentTrack]?.url} />
      
      <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {tracks[currentTrack]?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Track {currentTrack + 1} of {tracks.length}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
            <Icon name="Music" size={16} className="text-primary" />
            <span className="text-sm font-medium">{tracks[currentTrack]?.duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative h-20 bg-secondary/30 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/40 to-primary/60"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div className="absolute inset-0 flex items-end">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 mx-[1px] rounded-t transition-all"
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`,
                    opacity: i / 60 < (currentTime / duration) ? 0.8 : 0.3
                  }}
                />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek([parseFloat(e.target.value)])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentTrack === 0}
            className="hover:bg-secondary"
          >
            <Icon name="SkipBack" size={20} />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90"
          >
            {isPlaying ? (
              <Icon name="Pause" size={24} />
            ) : (
              <Icon name="Play" size={24} />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentTrack === tracks.length - 1}
            className="hover:bg-secondary"
          >
            <Icon name="SkipForward" size={20} />
          </Button>
        </div>

        <div className="space-y-2 pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Playlist</h4>
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(true);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                index === currentTrack
                  ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-lg'
                  : 'hover:bg-secondary/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                {index === currentTrack ? (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name={isPlaying ? "Volume2" : "Disc3"} size={16} className="text-primary" />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground w-8 text-center">
                    {index + 1}
                  </span>
                )}
                <span className={`text-sm ${index === currentTrack ? 'text-primary font-semibold' : 'text-foreground'}`}>
                  {track.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
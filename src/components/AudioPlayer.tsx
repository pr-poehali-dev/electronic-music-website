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
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
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
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
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

        <div className="space-y-2 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Playlist</h4>
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(true);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                index === currentTrack
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">
                  {index + 1}
                </span>
                <span className={`text-sm ${index === currentTrack ? 'text-primary font-medium' : 'text-foreground'}`}>
                  {track.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

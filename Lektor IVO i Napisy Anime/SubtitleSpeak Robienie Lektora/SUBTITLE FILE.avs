VideoFile="C:\Users\mateu\Desktop\SubtitleSpeak\SUBTITLE FILE.avi"
SpeakerMono = WavSource("C:\Users\mateu\Desktop\SubtitleSpeak\SUBTITLE FILE.wav")
Speaker = MergeChannels(SpeakerMono, SpeakerMono)
AVI=DirectShowSource(VideoFile, video = true)
audio = MixAudio(AVI, Speaker, 0.5, 0.5)
return AudioDub(AVI, audio)

import subprocess
import time


def cmd(command):
    subprocess.call(command, shell=True)

# IMAGE


def hight_quality_image_real_esrgan_x4_plus_anime():
    cmd('realesrgan-ncnn-vulkan.exe -i input -o output -n realesrgan-x4plus-anime')


def fast_image_real_esrgan_animevideov3_x4():
    cmd('realesrgan-ncnn-vulkan.exe -i input -o output -n realesr-animevideov3-x4')


def fast_image_real_esrgan_animevideov3_x4_jpg():
    cmd('realesrgan-ncnn-vulkan.exe -i input -o output -n realesr-animevideov3-x4 -f jpg')


def slow_image_real_esrgan_x4_plus():
    cmd('realesrgan-ncnn-vulkan.exe -i input -o output -n realesrgan-x4plus')


# VIDEO
# Jak pobrać FFmpeg w windows
# https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z -- auto pobieranie
# Zmienne środowiskowe urzytkownika w PATH dodaj -> ścierzkę do folderu: C:\FFmpeg\bin
# cmd ffmpeg -version -- czy działa

def clean():
    # usuń folder tmp_frames i out_frames
    cmd('rmdir /s /q tmp_frames')
    cmd('rmdir /s /q out_frames')

    # przywróc folder tmp_frames i out_frames
    cmd('mkdir tmp_frames')
    cmd('mkdir out_frames')


def add_info():
    filename = input("Podaj nazwę pliku np.: 1.mp4: ")

    print("FPS: ")
    cmd('ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 ./input/' + filename)

    print("Wpisz powyższą ilość FPS np.: 500: ")
    fps = input("Podaj ilość FPS: ")

    return filename, fps


def video_to_frames(filename):
    # Ffmpeg pobierze klatki z video i zapisze je w folderze tmp_frames
    cmd('ffmpeg -i ./input/' + filename +
        ' -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 ./tmp_frames/frame%08d.jpg')


def fast_image_real_esrgan_animevideov3_x4_jpg_with_temp_folder():
    # Ulepszenie klatek zapisanych w folderze tmp_frames i zapisanie ich w folderze out_frames
    cmd('realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesr-animevideov3-x4 -f jpg')


def fast_image_real_esrgan_animevideov3_x3_jpg_with_temp_folder():
    # Ulepszenie klatek zapisanych w folderze tmp_frames i zapisanie ich w folderze out_frames
    cmd('realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesr-animevideov3-x3 -f jpg')


def fast_image_real_esrgan_animevideov3_x2_jpg_with_temp_folder():
    cmd('realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesr-animevideov3-x2 -f jpg')


def hight_quality_image_real_esrgan_x4_plus_animevideo():
    cmd('realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesrgan-x4plus-anime')


def frames_to_video_with_sound(filename, fps):
    # Połączenie ulepszonych klatek z powrotem w video, gdzie dźwięk zostanie skopiowany z pierwotnego video
    cmd('ffmpeg -r ' + fps + ' -i ./out_frames/frame%08d.jpg -i ./input/' + filename +
        ' -map 0:v:0 -map 1:a:0 -c:a copy -c:v libx264 -r ' + fps + ' -pix_fmt yuv420p ./output/' + filename)


def copy_part_of_video_or_audio():
    # Cele testowe - jest to rozwiązanie z błędami, zapisywany dźiwiek i obraz są trochę przesunięte
    filename, fps = add_info()
    print("Podaj czas początkowy i końcowy np.: 00:00:00 00:00:02")
    ss = input("Podaj czas początkowy: ")
    to = input("Podaj czas końcowy: ")
    # Skopjuj  od 00:00:00 do 00:00:02
    cmd('ffmpeg -i ./input/' + filename +
        ' -ss ' + ss + ' -to ' + to + ' -c:a aac -b:a 192k -pix_fmt yuv420p ./output/' + filename)


def video_info():
    # Informacje o video
    filename = input("Podaj nazwę pliku np.: 1.mp4: ")
    cmd('ffmpeg -i ./input/' + filename)


def audio_with_image():
    choice = input(
        "1. Automatycznie wiele plików z czarnym tłem, UWAGA NUMERACJA OD 0.MP3 DO 999.MP3\n2. Wybierz audio i obraz\n")
    if choice == "1":
        # Dla każdego pliku z input .mp3 zostanie przeprowazona konwersja na mp4 z czarnym tłem w folderzxe input/0_src/BLACK.jpg
        cmd('FOR /L %i IN (' + input("Podaj początek numeracji: ") + ',1,' + input("Podaj koniec numeracji: ") +
            ') DO ffmpeg -loop 1 -i ./input/0_src/BLACK.jpg -i ./input/%i.mp3 -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest ./output/%i.mp4')

    if choice == "2":
        audio = input("Podaj nazwę pliku audio np.: 1.mp3: ")
        image = input("Podaj nazwę pliku obrazu np.: 1.jpg: ")
        cmd('ffmpeg -loop 1 -i ./input/' + image + ' -i ./input/' + audio +
            ' -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest ./output/' + audio + '.mp4')


def vido_to_1_minute_clips():
    filename = input("Podaj nazwę pliku np.: 1.mp4: ")

    # Wyświetl czas w minutach
    cmd('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 -sexagesimal ./input/' + filename)
    min = input("Podaj liczbę minut w zaokrągleniu do dołu np.: 1.6 -> 1: ")
    cmd('mkdir output\\one_minute_clips')
    for i in range(int(min)):
        if (i < 10):
            cmd('ffmpeg -i ./input/' + filename + ' -ss 00:0' + str(i) +
                ':00 -t 00:01:00 -c:a aac -b:a 192k -pix_fmt yuv420p ./output/one_minute_clips/' + str(i) + '.mp4')
        if (i >= 10):
            cmd('ffmpeg -i ./input/' + filename + ' -ss 00:' + str(i) +
                ':00 -t 00:01:00 -c:a aac -b:a 192k -pix_fmt yuv420p ./output/one_minute_clips/' + str(i) + '.mp4')


# Funkcja do wypalania napisów, konwertuje niedostępne czcionki na Arial w .ass
def add_subtitles():
    filename = input("Podaj nazwę pliku głównego z napisami np.: 1.mkv: ")
    subfilename = input(
        "Podaj nazwę pliku napisów np.: 1.ass (bez fontów), 1.mkv: ")
    cmd('ffmpeg -i ./input/' + filename + ' -vf subtitles=./input/' + subfilename +
        ' -c:v libx265 -crf 0 -preset ultrafast ./output/' + filename + '.mp4')
    # -preset ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo (default medium)


# Funkcja do dodawania lektora do filmu
def add_lector():
    filename = input("Podaj nazwę pliku głównego z napisami np.: 1.mkv: ")
    lectorfilename = input("Podaj nazwę pliku lektora np.: 1.wav: ")
    cmd('ffmpeg -i ./input/' + filename + ' -i ./input/' + lectorfilename +
        ' -filter_complex "[1:a]volume=7dB[a1];[0:a][a1]amix=inputs=2:duration=first" -c:v libx265 -crf 0 -preset ultrafast ./output/' + filename + '.mp4')


# Połączenie napisów z lektorem, konwertuje niedostępne czcionki na Arial w .ass
def add_subtitles_and_lector():
    filename = input("Podaj nazwę pliku głównego z napisami np.: 1.mkv: ")
    subfilename = input(
        "Podaj nazwę pliku napisów np.: 1.ass (bez fontów), 1.mkv: ")
    lectorfilename = input("Podaj nazwę pliku lektora np.: 1.wav: ")
    cmd('ffmpeg -i ./input/' + filename + ' -i ./input/' + lectorfilename + ' -vf subtitles=./input/' + subfilename +
        ' -filter_complex "[1:a]volume=7dB[a1];[0:a][a1]amix=inputs=2:duration=first" -c:v libx265 -crf 0 -preset ultrafast ./output/' + filename + '.mp4')


def main():
    start_time = time.time()
    choice = input(
        "1. Ulepsz i skaluj zdjęcia\n2. Ulepsz i skaluj anime / film\n3. Kopiuj część filmu lub audio\n4. Wyświetl informacje o pliku video lub audio\n5. Konwertuj audio i obraz do video\n6. Podziel video na 1 minutowe klipy\n7. Wypal napisy do video\n8. Dodaj ścieżkę dźwiękową lektora do video\n9. Wypal napisy i dodaj ścieżkę dźwiękową lektora do video\n10. Koniec\nWybierz: ")

    if choice == '1':
        # IMAGE
        hight_quality_image_real_esrgan_x4_plus_anime()
        # fast_image_real_esrgan_animevideov3_x4()
        # fast_image_real_esrgan_animevideov3_x4_jpg()
        # slow_image_real_esrgan_x4_plus()

    if choice == '2':
        # VIDEO
        filename, fps = add_info()
        video_to_frames(filename)
        fast_image_real_esrgan_animevideov3_x4_jpg_with_temp_folder()  # 8K
        # fast_image_real_esrgan_animevideov3_x3_jpg_with_temp_folder() # - nie działa
        # fast_image_real_esrgan_animevideov3_x2_jpg_with_temp_folder()  # - nie działa
        # hight_quality_image_real_esrgan_x4_plus_animevideo()  # 8K high quality slow

        frames_to_video_with_sound(filename, fps)
        # clean()

    if choice == '3':
        copy_part_of_video_or_audio()

    if choice == '4':
        video_info()

    if choice == '5':
        audio_with_image()

    if choice == '6':
        vido_to_1_minute_clips()

    if choice == '7':
        add_subtitles()

    if choice == '8':
        add_lector()

    if choice == '9':
        add_subtitles_and_lector()

    # Mierz czas
    print("--- %s seconds ---" % (time.time() - start_time))
    print("--- %s minutes ---" % ((time.time() - start_time) / 60))
    print("--- %s hours ---" % ((time.time() - start_time) / 3600))


main()

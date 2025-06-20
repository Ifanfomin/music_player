import os
import json
import subprocess


def sorting(x: str):
    x = x.lower()
    if x.find(".") < 4 and x[:x.find(".")].isdigit():
        x = "0" * (4 - len(x[:x.find(".")])) + x[:x.find(".")]
    elif x.find(" ") < 4 and x[:x.find(" ")].isdigit():
        x = "0" * (4 - len(x[:x.find(" ")])) + x[:x.find(" ")]
    elif x.find("-") < 4 and x[:x.find("-")].isdigit():
        x = "0" * (4 - len(x[:x.find("-")])) + x[:x.find("-")]
    elif x.find("_") < 4 and x[:x.find("_")].isdigit():
        x = "0" * (4 - len(x[:x.find("_")])) + x[:x.find("_")]
    elif x.find(",") < 4 and x[:x.find(",")].isdigit():
        x = "0" * (4 - len(x[:x.find(",")])) + x[:x.find(",")]
    return x.lower()



def f(dct, name, path, number):
    path = path + name + "/"
    tracks = []
    # try:
    names = sorted(
        os.listdir(path),
        key=lambda x: sorting(x)
        )
    for name in names:
        if all([extension not in name for extension in extensions]):
            dct[name] = {}
            f(dct[name], name, path, number+1)
        else:
            if any([extension in name for extension in music_extensions]):
                tracks.append(name)
    dct["_tracks"] = tracks
    if number == 0:
        # with open("files.json", "w") as files:
        #     json.dump({"Base": dct}, files)
        print(dct)
            # subprocess.run('echo {} | clip'.format(dct), shell=True, check=True)
    # except e:
    #     print(e)

extensions = [".mp3", ".flac", ".ogg", ".wav", ".png", ".jpg", ".jpeg", ".gif", ".m4a", ".py", ".m4v", ".mp4", ".rtf", ".JPG", ".txt", ".cue", ".accurip", ".log", ".m3u", ".dat", ".db", ".bmp"]
music_extensions = [".mp3", ".flac", ".ogg", ".wav", ".m4a"]

f({}, "", "audio", 0)













# Пример созданного данным скриптом словаря для нашей файловой системы
d = {
    'Русское': {
        'Аквариум': {
            '1983 - Радио Африка': {
                'Covers': {
                    '_tracks': []
                },
                '_tracks': [
                    '01. музыка серебряных спиц.mp3', 
                    '02. капитан африка.mp3', 
                    '03. песни вычерпывающих людей.mp3', 
                    '04. змея.mp3', 
                    '05. вана хойа.mp3', 
                    '06. рок-н-ролл мертв.mp3', 
                    '07. радио шао-линь.mp3', 
                    '08. искусство быть смирным.mp3', 
                    '09. тибетское танго.mp3', 
                    '10. время луны.mp3', 
                    '11. мальчик евграф.mp3', 
                    '12. твоей звезде.mp3', 
                    '13. с утра шел снег.mp3', 
                    '14. еще один упавший вниз.mp3', 
                    '15. Платан [бонус трек].mp3', 
                    '16. Сторож Сергеев [бонус трек].mp3', 
                    '17. Альтернатива [бонус трек].mp3']
            },
            '_tracks': []
        },
        'АукцЫон': {
            '1990 - Жопа': {
                '_tracks': [
                    '01. Колпак.mp3', 
                    '02. Немой.mp3', 
                    '03. Пионер.mp3', 
                    '04. Боюсь.mp3', 
                    '05. Ябеда.mp3', 
                    '06. Самолёт.mp3', 
                    '07. Любовь.mp3', 
                    '08. Вру.mp3', 
                    '09. Выжить.mp3', 
                    '10. Убьют.mp3']
            },
            '1991 - Бодун': {
                '_tracks': [
                    '01. В нелюди.mp3', 
                    '02. День Победы.mp3', 
                    '03. Ушла.mp3', 
                    '04. Сирота.mp3', 
                    '05. Слон.mp3', 
                    '06. Фа фа фа.mp3', 
                    '07. Warum.mp3', 
                    '08. Лётчик.mp3', 
                    '09. Песня про столбы.mp3', 
                    '10. Зима.mp3', 
                    '11. Отлюбил.mp3']
            },
            '_tracks': []
        },
        'Самое большое простое число': {
            '_tracks': [
                'Злой.mp3'
            ]
        },
        '_tracks': []
    }, 
    '_tracks': []
}

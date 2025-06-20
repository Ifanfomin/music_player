import music_tag

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
    return x



def f(dct: dict, name: str, path: str, number: int):
    path = path + name + "/"
    img_path = "img/" + "/".join(path.split("/")[1:])
    try:
        os.mkdir(img_path)
    except:
        print("!", path)
    tracks = []
    names = sorted(
        os.listdir(path),
        key=lambda x: sorting(x)
        )
    img_names = set(os.listdir(img_path))
    cover = [cov for cov in names if (".jpg" in cov) or (".png" in cov)]
    cover = cover[0] if cover != [] else False
    for name in names:
        if all([extension not in name for extension in extensions]):
            dct[name] = {}
            f(dct[name], name, path, number+1)
        else:
            if any([extension in name for extension in music_extensions]):
                tracks.append(name)
                try:
                    if name[:name.rfind(".")] + ".png" not in img_names:
                        file = music_tag.load_file(path + name)
                        # print(file)
                        data = file["artwork"].first
                        if data != None:
                            with open(img_path + name[:name.rfind(".")] + ".png", "wb") as img:
                                # print(file["artwork"].first.data)
                                # print(path + name[:name.rfind(".")] + ".png")
                                img.write(data.data)
                        elif cover != False:
                            with open(img_path + name[:name.rfind(".")] + ".png", "wb") as img:
                                with open(path + cover, "rb") as cov:
                                    img.write(cov.read())
                except:
                    ...

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

# full_path = "/media/ifan/64_IFAN_SB/"
if "img" not in os.listdir():
    os.mkdir("img")
f({}, "", "audio", 0)














d = {
    'Иностранное': {
        'Pink Floyd': {
            '1967 - The Piper At The Gates Of Dawn [2007, 50999-503919-2-9]': {
                '03. Matilda Mother (Mono).mp3': {}, 
                '02. Lucifer Sam (Mono).mp3': {}, 
                '07. Interstellar Overdrive (Mono).mp3': {}, 
                '09. Chapter 24 (Mono).mp3': {}, 
                '11. Bike (Mono).mp3': {}, 
                '01. Astronomy Domine (Mono).mp3': {}, 
                '08. The Gnome (Mono).mp3': {}, 
                '04. Flaming (Mono).mp3': {}, 
                '10. The Scarecrow (Mono).mp3': {}, 
                'Front.jpg': {}, 
                '05. Pow R. Toc H. (Mono).mp3': {}, 
                '06. Take Up Thy Stethoscope And Walk (Mono).mp3': 
                {}
            }, 
            '1970 - Atom Heart Mother [1994, UDCD 595]': {
                "05. Alan's Psychedelic Breakfast.mp3": {}, 
                '04. Fat Old Sun.mp3': {}, 
                'Front.jpg': {}, 
                '02. If.mp3': {}, 
                '01. Atom Heart Mother.mp3': {}, 
                "03. Summer '68.mp3": {}
            }, 
            '1973 - The Dark Side Of The Moon [2011, 5099902943121] (Immersion Ed.)': {
                'folder.jpg': {}, 
                '06. Us And Them.flac': {}, 
                '09. Eclipse.flac': {}, 
                '07. Any Colour You Like.flac': {}, 
                '03. Time.flac': {}, 
                '01. Speak To Me - Breathe.flac': {}, 
                '08. Brain Damage.flac': {}, 
                '04. The Great Gig In The Sky.flac': {}, 
                '02. On The Run.flac': {}, '05. Money.flac': {}
            }
        }, 
        'Black Sabbath': {
            '1970. Paranoid [2009, 1782444]': {
                '07. Rat Salad.mp3': {}, 
                '02. Paranoid.mp3': {}, 
                '08. Fairies Wear Boots.mp3': {}, 
                '06. Hand Of Doom.mp3': {}, 
                '05. Electric Funeral.mp3': {}, 
                '04. Iron Man.mp3': {}, 
                'Front.jpg': {}, 
                '03. Planet Caravan.mp3': {}, 
                '01. War Pigs.mp3': {}
            }, 
            '1970. Black Sabbath [2012, UIGY-9094]': {
                '04. N.I.B..mp3': {}, 
                '01. Black Sabbath.mp3': {}, 
                '07. Warning.mp3': {}, 
                '06. Sleeping Village.mp3': {}, 
                '03. Behind The Wall Of Sleep.mp3': {}, 
                "05. Evil Woman, Don't Play Your Games With Me.mp3": {}, 
                'Front.jpg': {}, '02. The Wizard.mp3': {}
            }
        }
    }, 
    'Русское': {}
}

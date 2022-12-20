links = "https://novelbin.net/n/re-evolution-online-novel/chapter-"
def num_url():
    with open("webs3.txt", "w", encoding="utf-8") as f:
        for i in range(1, 2+1):
            f.write(links + str(i) + "\n")
    f.close()
num_url()
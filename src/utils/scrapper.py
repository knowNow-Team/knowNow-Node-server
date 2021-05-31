import json
import sys

import requests
from bs4 import BeautifulSoup


def search_naver_dic(query_keyword):
    dicUrl = """http://endic.naver.com/search.nhn?sLn=kr&dicQuery={0}&x=12&y=12&query={0}&target=endic&ie=utf8&query_utf=&isOnlyViewEE=NMethod=GET"""
    r = requests.get(dicUrl.format(query_keyword))
    soup = BeautifulSoup(r.text, "html.parser")
    resultMeans = soup.find_all(attrs={"class": "fnt_k05"})
    resultPartOfSpeeches = soup.find_all(attrs={"class": "fnt_k09"})
    resultPhonics = soup.find_all(attrs={"class": "fnt_e25"})
    resultVoicePath = soup.find_all(attrs={"class": "btn_side_play"})[0]["playlist"]

    printResult(
        "naver", resultMeans, resultPartOfSpeeches, resultPhonics, resultVoicePath, query_keyword
    )


# btn_side_play _soundPlay: 발음듣기
# fnt_e25: 발음기호
# fnt_e07: 예문 뜻
# fnt_k10: 예문


def printResult(
    site, resultMeans, resultPartOfSpeeches, resultPhonics, resultVoicePath, query_keyword
):
    meanList = []
    partOfSpeechList = []
    result = {"word": query_keyword, "meanings": [], "wordClasses": []}
    notIgnoreList = ["[명사]", "[대명사]", "[동사]", "[형용사]", "[부사]", "[전치사]", "[접속사]", "[감탄사]"]

    # 뜻 추출
    for elem in resultMeans:
        text = elem.get_text().strip()
        if text:
            meanList.append(text.replace("\n", ", "))
    # 품사 추출
    for elem in resultPartOfSpeeches:
        text = elem.get_text().strip()
        if text:
            partOfSpeechList.append(text.replace("\n", ", "))
    # 음성 추출(미국식)
    if resultVoicePath:
        result["pronounceVoicePath"] = resultVoicePath
    # 발음기호 추출(미국식)
    phonics = resultPhonics[0].get_text().strip()
    if phonics:
        result["phonics"] = phonics.replace("\n", ", ")
    # 뜻(한글) 저장
    for word in meanList:
        if word.upper() == word.lower():
            result["meanings"].append(word)
    if not result.meanings:
        raise Exception
    # 품사(중복 제외) 저장
    for partOfSpeech in partOfSpeechList:
        if partOfSpeech in notIgnoreList and partOfSpeech[1:-1] not in result["wordClasses"]:
            result["wordClasses"].append(partOfSpeech[1:-1])

    print(json.dumps(result, ensure_ascii=False), end="")


def main(args=None):
    """The main routine."""
    if len(sys.argv) < 2:
        print("Usage : kdic [keyword]")
        sys.exit(0)

    query = sys.argv[1]
    try:
        search_naver_dic(query)
    except Exception as err:
        print("{}", end="")


if __name__ == "__main__":
    main()

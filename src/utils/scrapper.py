import sys
import requests
from bs4 import BeautifulSoup


def search_naver_dic(query_keyword):
    dic_url = """http://endic.naver.com/search.nhn?sLn=kr&dicQuery={0}&x=12&y=12&query={0}&target=endic&ie=utf8&query_utf=&isOnlyViewEE=NMethod=GET"""
    r = requests.get(dic_url.format(query_keyword))
    soup = BeautifulSoup(r.text, "html.parser")
    result_means = soup.find_all(attrs={"class": "fnt_k05"})
    result_classes = soup.find_all(attrs={"class": "fnt_k09"})
    print_result("naver", result_means, result_classes)


def print_result(site, result_means, result_classes):
    print("*" * 25)
    print("*** %s dic ***" % site)
    print("*" * 25)
    meansList = []
    classesList = []
    notIgnoreList = ["[명사]", "[대명사]", "[동사]", "[형용사]", "[부사]", "[전치사]", "[접속사]", "[감탄사]"]

    for elem in result_means:
        text = elem.get_text().strip()
        if text:
            meansList.append(text.replace("\n", ", "))
    for elem in result_classes:
        text = elem.get_text().strip()
        if text:
            classesList.append(text.replace("\n", ", "))
    for i in range(len(meansList)):
        print(classesList[i], meansList[i])
        if classesList[i] not in notIgnoreList:
            continue


def main(args=None):
    """The main routine."""
    if len(sys.argv) < 2:
        print("Usage : kdic [keyword]")
        sys.exit(0)

    query = sys.argv[1]
    try:
        search_naver_dic(query)
    except DictError as err:
        print("Please check your internet connection.", err)


if __name__ == "__main__":
    main()
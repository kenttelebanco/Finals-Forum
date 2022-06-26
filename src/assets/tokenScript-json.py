import json
import re

import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
# Opening JSON file
f = open('assets/dataset.json')

# returns JSON object as
# a dictionary
data = json.load(f)

posTokens = {}
negTokens = {}
# Iterating through the json
# list

def find_match(d, str):
    # for srv_name, srv_id in [(resp['name'], resp['id']) for resp in json.loads(response1.data)]:
    for key, val in d.items():
        s1 = val['word'].casefold().strip()
        s2 = str[0].casefold().strip()
        if s1 == s2:
            # print(s1 + '|' + s2 + "|" + str[1])
            return key, True

    return 0, False

def getProbabilityOfTokens(d):
    for key, val in d.items():
        temp = val['count'] / len(d)
        temp = round(temp, 6)
        temp = {'probability': temp}
        d[key].update(temp)
        # print(temp)
        # print(d[key])


for i in data:
    if not isinstance(i['Phrase'], int) and not isinstance(i['Phrase'], float) and len(i['Phrase']) > 1:
        p = i['Phrase']
        p = re.sub(r'[^\w]', ' ', p)
        p = p.lower()
        words = nltk.pos_tag(nltk.word_tokenize(p))

        # print(words[0][0] + " | " + words[0][1])
        sen = i['Sentiment']

        for el in words:
            if el[1] != '.' or el[1] != 'FW':
                token = {}
                if sen == 0:
                    if len(negTokens) >= 1:
                        key, ret = find_match(negTokens, el)
                        # print(negTokens[key])
                        if ret:
                            vu = negTokens[key]['count']
                            vu += 1
                            u = {'count': vu}
                            negTokens[key].update(u)
                            # print(negTokens[key])
                        else:
                            token['word'] = el[0]
                            token['count'] = 1
                            token['pos'] = el[1]
                            token['sentiment'] = "negative"
                            # print(token)
                            negTokens[len(negTokens)] = token
                    else:
                        token['word'] = el[0]
                        token['count'] = 1
                        token['pos'] = el[1]
                        token['sentiment'] = "negative"
                        # print(token)

                        negTokens[len(negTokens)] = token
                elif sen == 4:
                    if len(posTokens) >= 1:
                        key, ret = find_match(posTokens, el)
                        if ret:
                            vu = posTokens[key]['count']
                            vu += 1
                            u = {'count': vu}
                            # print(token)
                            posTokens[key].update(u)
                        else:
                            token['word'] = el[0]
                            token['count'] = 1
                            token['pos'] = el[1]
                            token['sentiment'] = "positive"
                            # print(token)
                            posTokens[len(posTokens)] = token
                    else:
                        token['word'] = el[0]
                        token['count'] = 1
                        token['pos'] = el[1]
                        token['sentiment'] = "positive"
                        # print(token)

                        posTokens[len(posTokens)] = token
                # print(negTokens)

        # print(next((i for i, item in enumerate(negTokens) if item["word"] == "a"), None))

getProbabilityOfTokens(posTokens)
getProbabilityOfTokens(negTokens)

json_object_pos = json.dumps(posTokens, indent=4)
json_object_neg = json.dumps(negTokens, indent=4)
with open("assets/posTokens.json", "w") as outfile:
    outfile.write(json_object_pos)
with open("assets/negTokens.json", "w") as outfile:
    outfile.write(json_object_neg)

print("YAY")
# Closing file
f.close()
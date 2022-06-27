import json
import re
import timeit
import nltk

start = timeit.default_timer()
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
# Opening JSON file
f = open('assets/dataset.json')

# returns JSON object as
# a dictionary
data = json.load(f)

posTokens = {}
negTokens = {}
neuTokens = {}


# Iterating through the json
# list

import os
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
            if el[1] != '.' and el[1] != 'FW' and el[1] != 'CD' and el[1] != 'DT' and el[1] != 'PRP' and el[1] != 'CC' and el[1] != 'PRP$' \
                    and el[1] != 'TO' and el[1] != 'WDT' and el[1] != 'WP' and el[1] != 'WRB' and el[1] != 'IN' and el[1] != 'NN' and el[1] != 'NNS' \
                    and el[1] != 'NNP' and el[1] != 'NNPS' and el[0] != 'is' and el[0] != 'are' and el[0] != 'was' and el[0] != 'were':
                token = {}
                if sen == 0 or sen == 1:
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

                elif sen == 2:
                    if len(neuTokens) >= 1:
                        key, ret = find_match(neuTokens, el)
                        if ret:
                            vu = neuTokens[key]['count']
                            vu += 1
                            u = {'count': vu}
                            # print(token)
                            neuTokens[key].update(u)
                        else:
                            token['word'] = el[0]
                            token['count'] = 1
                            token['pos'] = el[1]
                            token['sentiment'] = "neutral"
                            # print(token)
                            neuTokens[len(neuTokens)] = token
                    else:
                        token['word'] = el[0]
                        token['count'] = 1
                        token['pos'] = el[1]
                        token['sentiment'] = "neutral"
                        # print(token)

                        neuTokens[len(neuTokens)] = token
                elif sen == 4 or sen == 3:
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
getProbabilityOfTokens(neuTokens)
getProbabilityOfTokens(negTokens)

json_object_pos = json.dumps(posTokens, indent=4)
json_object_neutral = json.dumps(neuTokens, indent=4)
json_object_neg = json.dumps(negTokens, indent=4)
with open("assets/posTokens.json", "w") as outfile:
    outfile.write(json_object_pos)
with open("assets/neuTokens.json", "w") as outfile:
    outfile.write(json_object_neutral)
with open("assets/negTokens.json", "w") as outfile:
    outfile.write(json_object_neg)
print("YAY")
stop = timeit.default_timer()
print('Time: ', stop - start)
# Closing file
f.close()
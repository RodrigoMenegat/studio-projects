# DIARY

Most of the steps taken in the data cleaning, analysis and visualization process are described thoroughly in the Jupyter Notebooks. Here there is a brief summary of all actions that were made without Python.

## DATA SOURCES:
- [Brazilian House of Representatives, department of transcriptions](http://www2.camara.leg.br/atividade-legislativa/plenario/discursos/notas.html)
- [Jornalistas Livres](https://www.facebook.com/jornalistaslivres/posts/361114270679123), [Patrícia Cornils](https://docs.google.com/spreadsheets/d/1rTFC9kbPqeHWrr2JalcvehgRXdAu03BwyBTgTL6oFC8/edit#gid=177016461)

## 1. PDF page extraction
- Temer vote:
Pgs. 170 to 313

  GhostScript ran from command line:

  "C:\Program Files\gs\gs9.21\bin\gswin64.exe" -dNOPAUSE -dBATCH -dFirstPage=121 -dLastPage=324 -sDEVICE=pdfwrite -sOutputFile=C:\Users\Avell\Desktop\the-lede-program\data-studio\sentiment-votes\dilma-votes.pdf -f C:\Users\Avell\Desktop\the-lede-program\data-studio\sentiment-votes\dilma.pdf

## 2. Turning PDF into text
- Temer vote
  python C:\Anaconda3\Scripts\pdf2txt.py C:\Users\Avell\Desktop\the-lede-program\data-studio\sentiment-votes\temer-votes.pdf -o C:\Users\Avell\Desktop\the-lede-program\data-studio\sentiment-votes\temer-votes.txt

## 3. Cleaning and formatting
- Temer vote
Did manual reading, cleaning and formatting.
Used the following regex to make the resulting table is in the desired `REPRESENTATIVE - PARTY - STATE - VOTE - SPEECH` format:
  FIND WHAT: ^(O|A)\s{1,2}SR(A)?\.\s{1,2}([^(]+)(\(.*\))\s{1,2}-\s{1,2}(.*)\s-\s+(.*)
  REPLACE: \3,\4,"\5",\6

## 4. Formatting the LIWC dictionary
- Wrapped every numerical sentiment id into brackets, to avoid capturing them by mistake, in both the LIWC itself and in the sentiment dictionary.
- Opened the [original codefile]() and used the following Regex to define a function that would an 0/1 variable for each sentiment:
  **FIND WHAT**: (\[\d+\])\s+(\w+)
  **REPLACE WITH:** def get_\2(row):\n    if '\1' in row['related_sentiments']:\n         return 1\n    else:\n        return 0

## 5. Scaling the markers of the chart
Due to limitations of Seaborn's stripplot method, I manually rescaled the markers according to the proportion of each vote in a given party.
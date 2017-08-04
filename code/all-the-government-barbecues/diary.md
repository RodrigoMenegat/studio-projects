# DIARY

### 1. File origin
The files were downloaded from the [Portal da Transparência](http://www.portaldatransparencia.gov.br/downloads/mensal.asp?c=CPGF#meses04) website on 31/07/2017, 15:12.

### 2. Concatenation
All the .csv files were concatenated using a Python script, avaliable in the beginning of the following notebook.
There was a single bad row in the whole datasets: row 27388 of file 201010_CPGF.csv.
I manually corrected it. There was an extra separator in the last field.
After the concatenation process was done, I saved the merged database into a single file: 'CPGF_2010_to_2017_july.csv'

### 3. Data cleaning
During the analysis, I found that six instances of the date string were wrong. They were saying '2000' when they should say 2010. I corrected them. See the analysis notebook for details.

### 4. Editorial framing:
I choose to focus on three aspects: 
- Questionable expenses in 'churrasco' and beer as an interesting starting point; 
- Purchases may be violating bidding laws but nobody can really tell because they're secret
- Overall, 60% of all those payments are secret, be it for reasons of state or because the money was withdrew in cash from ATMs.

Nevertheless, there are other explorations in the analysis notebook: variation over time, for instance. Since there was not a clear change in trends, this facts did not make into the final story.
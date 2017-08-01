# DIARY

### 1. File origin
The files were downloaded from the [Portal da Transparência](http://www.portaldatransparencia.gov.br/downloads/mensal.asp?c=CPGF#meses04) website on 31/07/2017, 15:12.

### 2. Concatenation
All the .csv files were concatenated using a Python script, avaliable in the beginning of the following notebook.
There was a single bad row in the whole datasets: row 27388 of file 201010_CPGF.csv.
I manually corrected it. There was an extra separator in the last field.
After the concatenation process as done, I saved the merged database into a single file: 'CPGF_2010_to_2017_july.csv'

### 3. Data cleaning
During the analysis, I found that six instances of the date string were wrong. They were saying '2000' when they should say 2010. I corrected them. See the notebook for details.
moovgit
=======

Open source Tritium website html/pdf backups! Currently using http://pdfmyurl.com/ api to obtain pdf files of sites but open to more options.

To start using:

* In the beginning of your Tritium files for the site you wish to backup (.ts) add a first line of:

> <code>#URL=\<site-url\></code>

* To call backup:

> <code>./moovgit</code> instead of <code>git</code> 

i.e.: 
> <code>./moovgit commit -am "These changes are awesome!"<args></code>

Data Saved At:
--------------
> <code>\<project>/html-log/scripts/</code>

Data Saved for each .ts:
-------------------
pdf (current "mstage" to act as mockup)

html (current "www" source to diff)

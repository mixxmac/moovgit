moovgit
=======

Open source Tritium website html/pdf backups! Currently using http://pdfmyurl.com/ api to obtain pdf files of sites but open to more options.

To use:
In the beginning of your Tritium files for the site you wish to backup (.ts) add a first line of 
<code>#URL=\<site-url\></code>

To backup, use <code>moovgit</code> instead of <code>git</code> when calling <code>git commit \<args></code>

Data for each .ts:
=======
pdf (current "mstage" to act as mockup)

html (current "www" source to diff)

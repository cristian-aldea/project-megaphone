cd ng-project-megaphone/dist/ng-project-megaphone
ftp -inv $HOST <<EOF
user $SFTP_USER $SFTP_PASS
cd public_html
ls

mdelete index.html 3rdpartylicenses.txt main-* polyfills-* runtime-* styles*
mput index.html 3rdpartylicenses.txt main-* polyfills-* runtime-* styles*

ls
bye
EOF
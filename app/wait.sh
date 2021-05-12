#!/bin/sh

while ! nc -z mysql_server_test 3306 ; do
    echo "Waiting for the MySQL Server"
    sleep 3
done

node index.js

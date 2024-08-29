
curl -i http://localhost:3000/users

echo
echo
echo

curl \
    --silent \
    -i \
    -X POST \
    -d '{"name": "jenny", "age": 12, "email": "jenny@jenny.com" }' \
    http://localhost:3000/users

curl \
    --silent \
    -i \
    -X POST \
    -d '{"name"' \
    http://localhost:3000/users

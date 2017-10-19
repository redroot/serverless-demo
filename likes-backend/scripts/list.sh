# format
# serverless endpointer GET /todos/id ? data data
# serverless endpointer /todos/id # returns oh, there are two endpoints wih this page, did you mean
#    GET /todos/id
#    PUT /todos/id
# or pipe in URL somehow into curl e.g. echo "https://google.com" | xargs -n1 curl
# or serverless info | grep POST/dev/lines | trim | xargs -n1 curl

# serverless info

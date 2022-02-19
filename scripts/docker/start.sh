docker build -t craftworks-challenge-image .
docker run --name craftworks-challenge-container -d -p 8080:80 craftworks-challenge-image

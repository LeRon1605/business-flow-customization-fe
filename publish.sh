#!/bin/bash

docker build -t rubeha/business-flow-customization-web:latest -f dockerfile .

docker push rubeha/business-flow-customization-web:latest
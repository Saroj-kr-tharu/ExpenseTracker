FROM node:20-alpine
# from the base image node 

WORKDIR /developer/fortend
# working directory define 

# Copy the package to install 
COPY package* ./

#clean install 
RUN  npm ci 

#copy all the file for the host to working directory 
COPY . .

CMD [ "npm", "run", "dev" ]
# cmd when container is on 

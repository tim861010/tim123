#escape=`
FROM microsoft/aspnet:3.5

COPY setup_files /setup_files
COPY app /app
WORKDIR /setup_files

RUN node-v12.13.1-x64.msi /quiet

WORKDIR ../app
RUN npm install

EXPOSE 8081

ENTRYPOINT [ "powershell", "-Command", "npm start" ]
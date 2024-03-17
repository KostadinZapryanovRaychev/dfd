FROM node:18.4.0
ARG NPM_TOKEN

WORKDIR /opt/app

COPY ./ /opt/app

RUN touch /opt/app/.npmrc
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> /opt/app/.npmrc

RUN yarn
RUN rm /opt/app/.npmrc

EXPOSE 8080
CMD bash -C '/opt/app/run.sh'

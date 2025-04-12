FROM ruby:3.4.1

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

ENV BUNDLER_VERSION=2.4.12
ENV BUNDLE_PATH=/gems \
    BUNDLE_JOBS=4 \
    BUNDLE_RETRY=3

RUN gem install bundler:$BUNDLER_VERSION

ENV RAILS_ROOT /app
WORKDIR $RAILS_ROOT

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN gem install bundler:2.4.12
RUN bundle install --verbose

COPY . .

EXPOSE 80

CMD ["rails", "server", "-b", "0.0.0.0"]

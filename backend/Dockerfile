FROM ruby:3.4.1

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

ENV RAILS_ROOT /app
WORKDIR $RAILS_ROOT

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN gem install bundler:2.4.12
RUN bundle install --verbose

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

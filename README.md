# README

### Setup

* For development
```bash
docker build --build-arg RAILS_ENV=development --build-arg BUNDLE_DEPLOYMENT=0 --build-arg BUNDLE_WITHOUT="" .
```

* For production
```bash
docker build --build-arg RAILS_ENV=production --build-arg BUNDLE_DEPLOYMENT=1 --build-arg BUNDLE_WITHOUT="development:test" .
```